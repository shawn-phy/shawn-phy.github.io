# Illustration prompts

The site ships with hand-drawn SVG stand-ins. To replace one, generate an image from the prompts below, then save it as `src/assets/illustrations/<slot>.png`. The site picks it up on the next build; no code changes are needed.

The four `figure-*` slots matter most: they illustrate the project notes on every visit. The three `character-*` slots are only seen when the 3D scene cannot run, which happens under reduced motion or without WebGL. In every other case the clay characters are rendered live in 3D. Generate the characters to match those 3D models.

| Slot | Where it appears | Canvas |
| --- | --- | --- |
| `character-hardware` | Hardware band, closing section | 1024 × 1024, transparent |
| `character-security` | Security band, closing section | 1024 × 1024, transparent |
| `character-ml` | Machine learning band, closing section | 1024 × 1024, transparent |
| `figure-agents` | Typical applications, Fig. 3 | 1536 × 1024, transparent |
| `figure-car` | Typical applications, Fig. 4 | 1536 × 1024, transparent |
| `figure-atomio` | Typical applications, Fig. 5 | 1536 × 1024, transparent |
| `figure-greenhouse` | Typical applications, Fig. 6 | 1536 × 1024, transparent |

Generate all seven in one session, and give the model one finished image as a reference for the rest, so the set shares one hand.

## Style block

Paste this before every subject prompt.

```text
Pop-art print illustration for a personal engineering portfolio, like a panel from a 1960s comic or a vintage toy catalogue, with kawaii character design. Technical subject, playful treatment.

Line: one uniform, thick, warm-black outline (#17130F) around every shape, the same weight everywhere, about 2.5% of the canvas width. Rounded joins and caps. No sketchy, doubled, tapered or broken lines.

Colour: flat fills taken strictly from this palette and nothing else:
- warm black #17130F (outlines, eyes, mouths)
- off-white #FFFBF0 (highlights, pins, paper)
- yuzu yellow #FFD23F
- matcha green #6FD08C
- strawberry pink #FF6B9A
- ramune blue #5CC8F5
- blush pink #FF8FB0 (cheeks only)
Shading is printed, never painted: shadows are Ben-Day halftone dots in warm black (#17130F) on the shape's own colour, in a regular grid whose dots grow toward the shadow side. No gradients, glow, gloss, noise or soft airbrushed shading.

Faces: two solid oval eyes, each with one small round off-white glint in the upper right; two flat blush ovals; a small simple mouth. The face is placed low on the body. Eyes and blush are the same size and spacing in every character.

Light: a single light source from the upper left for every object.

Composition: one subject, centred, three-quarter front view, filling about 75% of the canvas. Fully transparent background. A small flat warm-black contact shadow directly below, offset slightly down and to the right. Nothing cropped by the canvas edge.

Do not include: text, letters, numbers, logos, watermarks or signatures; extra limbs, fingers or eyes; sparkles, stars, hearts, confetti or floating particles unless asked for below; photographic or 3D-rendered surfaces; lens blur, bokeh, depth of field or vignettes; background scenery; drop shadows other than the contact shadow.
```

## Subject prompts

### `character-hardware` (fallback only)

```text
A cheerful microchip character. Its body is a rounded-square chip in matcha green #6FD08C with four short off-white pins on each side, standing on two short warm-black legs with small rounded feet. A tiny off-white dot sits in the top-left corner of the chip, like the pin-1 marker on a real IC. Happy, slightly proud expression with a closed-curve smile.
```

### `character-security` (fallback only)

```text
A padlock character in strawberry pink #FF6B9A. A thick rounded off-white shackle arcs over a rounded body. The keyhole is the mouth: a small warm-black circle above a short tapered slot. Alert, watchful eyes with a hint of mischief. Two small off-white bolt heads, one on each side of the body.
```

### `character-ml` (fallback only)

```text
A soft round blob character in ramune blue #5CC8F5, slightly wider than it is tall, like a mochi. Two thin warm-black antennae rise from the top, each ending in a small yuzu-yellow bulb. Curious expression with a small round "o" mouth, as if it has just noticed something.
```

### `figure-agents`

```text
Three small robot heads in a row, each a rounded square with a single antenna and a happy face: ramune blue on the left, off-white in the middle, strawberry pink on the right. They pass a single off-white document card from left to right along a line of thick warm-black arrows. The document carries two short outlined bars in place of writing, and no letters. The scene reads as teamwork. Landscape composition.
```

### `figure-car`

```text
A small four-wheel-drive robot car seen from the front three-quarter view. An off-white rounded body with two round ramune-blue sensor "eyes" at the front that double as its face, a small smile below them, and a matcha-green circuit board on its back with a row of rounded dots. Four chunky warm-black wheels with yuzu-yellow hubs. It looks eager, as if about to drive off. Landscape composition.
```

### `figure-atomio`

```text
A browser window with an off-white frame and three small warm-black dots in its title bar. Inside, a stylised building under construction made of stacked rounded blocks in strawberry pink, ramune blue and matcha green, with a simple warm-black crane lifting one yuzu-yellow block into place. No text anywhere, including the address bar. Landscape composition.
```

### `figure-greenhouse`

```text
A small glass greenhouse with a peaked roof, its panes a very pale tint of matcha green with off-white glazing bars. Inside, a two-leaf matcha-green seedling grows out of a warm-black microchip that sits in the soil, with two tiny off-white dots on the chip. Calm, hopeful mood. Landscape composition.
```

## Before you save a file

Check each image against this list, and regenerate rather than patch when it fails:

- Every outline is one weight; none fade, double or break.
- Halftone dots sit on a regular grid; none are smeared, melted or randomly scattered.
- Only the palette above appears. Snap stray colours to the nearest palette colour.
- No text or pseudo-letters anywhere, including on screens, documents and chips.
- Counts are right: two eyes, four wheels, four pins a side, two antennae.
- Edges are clean on both a yellow and a black background, with no grey fringe or halo.
- The background is truly transparent, not white.
- The character's face matches the other two in eye size, glint position and blush.
- Light comes from the upper left.

Export as PNG at the canvas size in the table. Keep the prompt you used beside the file as `<slot>.prompt.txt`, so the source of every image is on record.
