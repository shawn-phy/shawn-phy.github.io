// Production export for the spot-colour illustrations in illustration-prompts.md.
// Generate and revise artwork with imagegen first. This only normalises the PNG
// canvas and snaps its generated colours to the seven specified printing inks.
import sharp from 'sharp';
import { basename, resolve } from 'node:path';

const [source, destination, widthArg, heightArg] = process.argv.slice(2);
const width = Number(widthArg);
const height = Number(heightArg);
if (!source || !destination || !Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
  throw new Error('Usage: node design/export-illustration.mjs SOURCE DESTINATION WIDTH HEIGHT');
}
if (resolve(source) === resolve(destination)) throw new Error('Keep the generation source intact.');

const inks = ['17130f', 'fffbf0', 'ffd23f', '6fd08c', 'ff6b9a', '5cc8f5', 'ff8fb0'];
const subjectInks = {
  'character-hardware': [0, 1, 3, 6],
  'character-security': [0, 1, 4, 6],
  'character-ml': [0, 1, 2, 5, 6],
  'figure-agents': [0, 1, 2, 4, 5, 6],
  'figure-car': [0, 1, 2, 3, 5, 6],
  'figure-atomio': [0, 1, 2, 3, 4, 5],
  'figure-greenhouse': [0, 1, 3],
};
const asset = basename(destination, '.png');
const selected = subjectInks[asset] ?? inks.map((_, i) => i);
const palette = selected.map(i => inks[i])
  .map(hex => [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16)));

const { data, info } = await sharp(source)
  .ensureAlpha()
  .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] < 8) {
    data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
    continue;
  }
  // Separate the greenhouse's pale green printing plate into matcha ink at
  // 38% coverage, keeping the RGB palette exact and the glass truly translucent.
  if (asset === 'figure-greenhouse' && data[i] > 132 && data[i + 1] - data[i] > 15 && data[i + 1] - data[i + 2] > 15) {
    data[i] = 111;
    data[i + 1] = 208;
    data[i + 2] = 140;
    data[i + 3] = data[i + 3] >= 32 ? 96 : Math.round(data[i + 3] * 0.38);
    continue;
  }
  let closest = palette[0];
  let distance = Infinity;
  // Antialiasing between ink and stock is a neutral ramp. A naive RGB snap can
  // choose pink for its middle greys, leaving coloured flecks around black dots.
  const neutral = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) < 40;
  for (const colour of neutral ? palette.slice(0, 2) : palette) {
    const delta = (data[i] - colour[0]) ** 2 + (data[i + 1] - colour[1]) ** 2 + (data[i + 2] - colour[2]) ** 2;
    if (delta < distance) {
      distance = delta;
      closest = colour;
    }
  }
  [data[i], data[i + 1], data[i + 2]] = closest;
  // Remove the generator's near-opaque wash; retain genuine translucent glass
  // and the coverage alpha of the exterior antialiased silhouette.
  if (data[i + 3] >= 240) data[i + 3] = 255;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(destination);
console.log(JSON.stringify({ destination, width: info.width, height: info.height, palette: palette.length }));
