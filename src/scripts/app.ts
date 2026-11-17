// Page runtime: smooth scrolling, the hero pin, section seams, text effects, the hero
// leader lines and the 3D scene. Under reduced motion only the leaders run.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createLeaders, type Provider } from './leaders';
import { initTextFx } from './text-fx';
import { runEntrance } from './entrance';
import type { LayerId } from './scene';

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = matchMedia('(min-width: 56.01rem)').matches;
const header = document.querySelector<HTMLElement>('.bar');
const headerH = () => header?.offsetHeight ?? 0;

// ---- Smooth scrolling ----------------------------------------------------------
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis;
}

function go(target: HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: -headerH(),
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
  if (target.tabIndex >= 0 || target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
}

document.addEventListener('click', (ev) => {
  const link = (ev.target as Element).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
  if (!link) return;
  const id = link.getAttribute('href')!.split('#')[1];
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  ev.preventDefault();
  go(target);
  history.pushState(null, '', `#${id}`);
});

// ---- WebGL check ---------------------------------------------------------------
const canvas = document.querySelector<HTMLCanvasElement>('#scene');
const webgl = (() => {
  try {
    const probe = document.createElement('canvas');
    return !!(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
})();
const sceneOn = !reduced && webgl && !!canvas;

// ---- Hero pin: on wide screens the hero holds while the stack explodes -----------
const hero = document.querySelector<HTMLElement>('.hero');
let heroTrigger: ScrollTrigger | null = null;
if (sceneOn && desktop && hero) {
  heroTrigger = ScrollTrigger.create({
    trigger: hero,
    start: () => `top ${headerH()}px`,
    end: () => `+=${Math.round(window.innerHeight * 1.15)}`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });
}
const heroRange = () =>
  heroTrigger
    ? { start: heroTrigger.start, end: heroTrigger.end }
    : { start: 0, end: (hero?.offsetHeight ?? window.innerHeight) * 0.8 };

// ---- Seams: the halftone edge between sections settles as it arrives -------------
if (!reduced) {
  document.querySelectorAll<HTMLElement>('.seam').forEach((seam) => {
    gsap.fromTo(
      seam,
      { '--seam-shift': '-45%' },
      {
        '--seam-shift': '0%',
        ease: 'none',
        scrollTrigger: { trigger: seam, start: 'top bottom', end: 'top 40%', scrub: true },
      },
    );
  });
  initTextFx();
}

// ---- Hero leaders, first against the drawn poster ------------------------------
const stage = document.querySelector<HTMLElement>('[data-stack]');
const art = document.querySelector<HTMLElement>('.stack__art');
if (stage) {
  const leaders = createLeaders(stage);
  const poster = stage.querySelector<SVGSVGElement>('.stack__poster');
  const posterAnchors: Record<string, [number, number]> = {
    ml: [214, 112],
    security: [228, 196],
    hardware: [250, 286],
  };
  const fromPoster: Provider = (id) => {
    const matrix = poster?.getScreenCTM();
    const anchor = posterAnchors[id];
    if (!matrix || !anchor) return null;
    const point = new DOMPoint(anchor[0], anchor[1]).matrixTransform(matrix);
    const box = stage.getBoundingClientRect();
    return { x: point.x - box.left, y: point.y - box.top };
  };
  leaders.use(fromPoster);
  new ResizeObserver(() => leaders.update(true)).observe(stage);
  document.fonts?.ready.then(() => leaders.update(true));

  if (sceneOn && art && canvas) {
    const byLayer = (selector: (id: LayerId) => string) =>
      Object.fromEntries(
        (['hardware', 'security', 'ml'] as LayerId[]).map((id) => [
          id,
          document.querySelector<HTMLElement>(selector(id)),
        ]),
      ) as Record<LayerId, HTMLElement | null>;

    const start = () =>
      import('./scene')
        .then(({ mountScene }) => {
          mountScene({
            canvas,
            stage,
            art,
            leaders,
            slots: byLayer((id) => `[data-slot-for="${id}"]`),
            crew: byLayer((id) => `[data-crew="${id}"]`),
            perches: Object.fromEntries(
              (['hardware', 'security', 'ml'] as LayerId[]).map((id) => [
                id,
                [...document.querySelectorAll<HTMLElement>(`[data-perch-for="${id}"]`)],
              ]),
            ) as Record<LayerId, HTMLElement[]>,
            bands: byLayer((id) => `#${id}`),
            contact: document.querySelector<HTMLElement>('#contact'),
            heroRange,
            onPick: (id) => {
              const band = document.getElementById(id);
              if (band) window.setTimeout(() => go(band), 280);
            },
          });
        })
        .catch(() => {
          /* The drawn stand-ins stay in place when 3D cannot start. */
        });
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(start, { timeout: 900 });
    else setTimeout(start, 150);
  }
}

runEntrance();
window.addEventListener('load', () => ScrollTrigger.refresh());
