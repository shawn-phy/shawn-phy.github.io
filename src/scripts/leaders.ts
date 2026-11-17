// Leader lines from the hero's callout labels to the characters they name.
// Each label is placed beside its character and an ink line is drawn between them.
// The anchor points come from a provider: the drawn poster first, then the 3D scene.

export type Point = { x: number; y: number };
export type Provider = (id: string) => Point | null;

const IDS = ['ml', 'security', 'hardware'];
const GAP = 8;

export function createLeaders(stage: HTMLElement) {
  const svg = stage.querySelector<SVGSVGElement>('.stack__leaders');
  const items = IDS.map((id) => ({
    id,
    label: stage.querySelector<HTMLElement>(`.callout--${id}`),
    line: svg?.querySelector<SVGLineElement>(`[data-leader="${id}"] line`) ?? null,
    end: svg?.querySelector<SVGCircleElement>(`[data-leader="${id}"] circle`) ?? null,
  })).filter((item) => item.label);

  let provider: Provider | null = null;
  let last = '';

  function update(force = false) {
    if (!provider || !svg) return;
    const height = stage.clientHeight;
    const placed = items
      .map((item) => ({ item, at: provider!(item.id), h: item.label!.offsetHeight, top: 0 }))
      .filter((p): p is typeof p & { at: Point } => p.at !== null);
    if (!placed.length) return;

    const key = placed.map((p) => `${p.at.x | 0},${p.at.y | 0}`).join(';') + `|${height}`;
    if (!force && key === last) return;
    last = key;

    // Centre each label on its anchor, then push them apart so none overlap.
    placed.sort((a, b) => a.at.y - b.at.y);
    let floor = 0;
    for (const p of placed) {
      p.top = Math.max(p.at.y - p.h / 2, floor);
      floor = p.top + p.h + GAP;
    }
    let ceiling = height;
    for (let i = placed.length - 1; i >= 0; i--) {
      const p = placed[i];
      if (p.top + p.h > ceiling) p.top = ceiling - p.h;
      ceiling = p.top - GAP;
    }

    for (const p of placed) {
      const label = p.item.label!;
      label.style.top = `${Math.round(p.top)}px`;
      const startX = label.offsetLeft - 6;
      const startY = p.top + p.h / 2;
      p.item.line?.setAttribute('x1', `${startX}`);
      p.item.line?.setAttribute('y1', `${startY}`);
      p.item.line?.setAttribute('x2', `${p.at.x}`);
      p.item.line?.setAttribute('y2', `${p.at.y}`);
      p.item.end?.setAttribute('cx', `${p.at.x}`);
      p.item.end?.setAttribute('cy', `${p.at.y}`);
    }
    stage.classList.add('has-leaders');
  }

  return {
    use(next: Provider) {
      provider = next;
      last = '';
      update(true);
    },
    update,
  };
}
