// One 3D scene for the whole page. Three clay characters, one per layer of the work,
// tell the page's story as you scroll:
//   assembled   in the hero, stacked like a block diagram;
//   exploded    the hero pins and the stack separates into an exploded view while the
//               camera dolly-zooms, and the callouts follow the parts;
//   explained   each character flies off, then drops into its own section;
//   reassembled all three land together beside the closing email button.
// The canvas is fixed over the page and maps CSS pixels to the z = 0 plane, so each
// character can stand exactly where a placeholder element sits in the layout.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import gsap from 'gsap';
import type { Provider } from './leaders';

export type LayerId = 'hardware' | 'security' | 'ml';
const IDS: LayerId[] = ['hardware', 'security', 'ml'];

interface Leaders {
  use(provider: Provider): void;
  update(force?: boolean): void;
}

interface Pose {
  x: number; // CSS px, centre of the character's base
  y: number;
  s: number; // CSS px per model unit
  ry: number;
  rx: number;
}

interface Key {
  at: number; // scroll position
  pose: () => Pose;
  ease?: (t: number) => number;
  spin?: number; // full turns while arriving at this key
  arc?: number; // lift, as a fraction of the viewport height
  land?: boolean; // squash on arrival
}

export interface SceneOptions {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  art: HTMLElement;
  leaders?: Leaders;
  slots: Record<LayerId, HTMLElement | null>;
  crew: Record<LayerId, HTMLElement | null>;
  perches: Record<LayerId, HTMLElement[]>;
  bands: Record<LayerId, HTMLElement | null>;
  contact: HTMLElement | null;
  heroRange: () => { start: number; end: number };
  onPick: (id: LayerId) => void;
}

const INK = 0x17130f;
const STOCK = 0xfffbf0;
const YUZU = 0xffd23f;
const COLOR: Record<LayerId, number> = { hardware: 0x6fd08c, security: 0xff6b9a, ml: 0x5cc8f5 };

// Model sizes (base at y = 0) and their place in the assembled stack.
// Standalone silhouettes, with legs and shackle out, used to fit a character to its slot.
const SIZE: Record<LayerId, { w: number; h: number }> = {
  hardware: { w: 3.3, h: 1.55 },
  security: { w: 2.0, h: 2.3 },
  ml: { w: 1.9, h: 1.96 },
};
// Heights inside the assembled stack, where legs and shackle are tucked away.
const STACKED_H: Record<LayerId, number> = { hardware: 1.1, security: 1.3, ml: 1.96 };
const BASE: Record<LayerId, number> = { hardware: 0, security: 1.1, ml: 2.4 };
const LIFT: Record<LayerId, number> = { hardware: 0, security: 1.0, ml: 2.1 };
const STACK_H = 4.36;
const FAN: Record<LayerId, number> = { hardware: -0.32, security: 0.3, ml: 0.05 };
const K = 0.02; // world units per CSS pixel on the z = 0 plane

const ease = {
  inOut: gsap.parseEase('power2.inOut'),
  in: gsap.parseEase('power3.in'),
  fall: gsap.parseEase('power2.in'),
  none: (t: number) => t,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function mountScene(o: SceneOptions): boolean {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: o.canvas, antialias: true, alpha: true });
  } catch {
    return false;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);

  // Clay wants soft, warm light: a broad sky, a key from the upper left and a rim.
  scene.add(new THREE.HemisphereLight(0xfff7e8, 0xffd9a8, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(-5, 8, 9);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffe2f0, 1.1);
  rim.position.set(6, 3, -6);
  scene.add(rim);

  const clay = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.74, metalness: 0 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.18 });
  const glintMat = new THREE.MeshBasicMaterial({ color: STOCK });
  const eyeGeo = new THREE.SphereGeometry(0.1, 24, 16);
  const glintGeo = new THREE.SphereGeometry(0.032, 10, 8);
  const cheekGeo = new THREE.SphereGeometry(0.12, 18, 12);

  // A soft contact shadow, drawn once into a texture.
  const shadowTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d')!;
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, 'rgba(23,19,15,0.42)');
    grad.addColorStop(1, 'rgba(23,19,15,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();

  interface Rig {
    root: THREE.Group;
    squash: THREE.Group;
    shadow: THREE.Mesh;
    eyes: THREE.Object3D[];
    pick: THREE.Mesh[];
    shackle?: THREE.Object3D;
    legs?: THREE.Object3D;
    lift?: THREE.Object3D;
  }

  function face(
    parent: THREE.Object3D,
    eyes: THREE.Object3D[],
    f: { x: number; y: number; z: number; mouth: 'smile' | 'keyhole' | 'o'; blush: number; cheekZ?: number },
  ) {
    for (const side of [-1, 1]) {
      const eye = new THREE.Group();
      const ball = new THREE.Mesh(eyeGeo, eyeMat);
      ball.scale.set(1, 1.22, 0.5);
      const glint = new THREE.Mesh(glintGeo, glintMat);
      glint.position.set(0.035, 0.055, 0.045);
      eye.add(ball, glint);
      eye.position.set(side * f.x, f.y, f.z);
      eyes.push(eye);
      const cheek = new THREE.Mesh(cheekGeo, clay(f.blush));
      cheek.scale.set(1.25, 0.7, 0.25);
      cheek.position.set(side * (f.x + 0.26), f.y - 0.2, f.cheekZ ?? f.z - 0.02);
      parent.add(eye, cheek);
    }
    if (f.mouth === 'smile') {
      const smile = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.028, 10, 24, Math.PI), eyeMat);
      smile.rotation.z = Math.PI;
      smile.position.set(0, f.y - 0.15, f.z + 0.01);
      parent.add(smile);
    } else if (f.mouth === 'keyhole') {
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.05, 24), eyeMat);
      hole.rotation.x = Math.PI / 2;
      hole.position.set(0, f.y - 0.21, f.z);
      const stem = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.18, 0.05, 2, 0.02), eyeMat);
      stem.position.set(0, f.y - 0.32, f.z);
      parent.add(hole, stem);
    } else {
      const mouth = new THREE.Mesh(eyeGeo, eyeMat);
      mouth.scale.set(0.6, 0.78, 0.4);
      mouth.position.set(0, f.y - 0.2, f.z + 0.02);
      parent.add(mouth);
    }
  }

  function makeRig(id: LayerId): Rig {
    const root = new THREE.Group();
    const squash = new THREE.Group();
    root.add(squash);
    const eyes: THREE.Object3D[] = [];
    let main: THREE.Mesh;
    let shackle: THREE.Object3D | undefined;
    let legs: THREE.Object3D | undefined;
    let lift: THREE.Object3D | undefined;

    if (id === 'hardware') {
      lift = new THREE.Group();
      squash.add(lift);
      main = new THREE.Mesh(new RoundedBoxGeometry(2.6, 1.1, 1.9, 8, 0.34), clay(COLOR.hardware));
      main.position.y = 0.55;
      lift.add(main);
      const pinGeo = new RoundedBoxGeometry(0.38, 0.16, 0.24, 4, 0.07);
      const pinMat = clay(0xf4efe2);
      for (const side of [-1, 1]) {
        for (let i = 0; i < 4; i++) {
          const pin = new THREE.Mesh(pinGeo, pinMat);
          pin.position.set(side * 1.42, 0.32, -0.63 + i * 0.42);
          lift.add(pin);
        }
      }
      const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 24), clay(0xf4efe2));
      dot.position.set(-0.92, 1.105, 0.62);
      lift.add(dot);
      legs = new THREE.Group();
      const legMat = clay(INK);
      for (const side of [-1, 1]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.42, 16), legMat);
        leg.position.set(side * 0.55, 0.25, 0.15);
        const foot = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.14, 0.56, 4, 0.06), legMat);
        foot.position.set(side * 0.55, 0.07, 0.25);
        legs.add(leg, foot);
      }
      legs.scale.y = 0.001;
      squash.add(legs);
      face(main, eyes, { x: 0.42, y: 0.0, z: 0.96, mouth: 'smile', blush: 0xff8fb0 });
    } else if (id === 'security') {
      main = new THREE.Mesh(new RoundedBoxGeometry(1.8, 1.3, 1.35, 8, 0.38), clay(COLOR.security));
      main.position.y = 0.65;
      squash.add(main);
      const boltGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.06, 24);
      const boltMat = clay(0xf4efe2);
      for (const side of [-1, 1]) {
        const bolt = new THREE.Mesh(boltGeo, boltMat);
        bolt.rotation.x = Math.PI / 2;
        bolt.position.set(side * 0.62, 1.07, 0.68);
        squash.add(bolt);
      }
      face(main, eyes, { x: 0.32, y: 0.05, z: 0.69, mouth: 'keyhole', blush: 0xffd6e3 });
      shackle = new THREE.Group();
      const shackleMat = clay(0xe7e1d5);
      const arc = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.14, 18, 40, Math.PI), shackleMat);
      arc.position.y = 0.42;
      const postGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.44, 18);
      for (const side of [-1, 1]) {
        const post = new THREE.Mesh(postGeo, shackleMat);
        post.position.set(side * 0.5, 0.2, 0);
        shackle.add(post);
      }
      shackle.add(arc);
      shackle.position.y = 1.24;
      shackle.scale.y = 0.001;
      squash.add(shackle);
    } else {
      main = new THREE.Mesh(new THREE.SphereGeometry(0.86, 48, 32), clay(COLOR.ml));
      main.scale.y = 0.86;
      main.position.y = 0.74;
      squash.add(main);
      for (const side of [-1, 1]) {
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.48, 10), eyeMat);
        stalk.position.set(side * 0.3, 1.6, 0);
        stalk.rotation.z = -side * 0.32;
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 22, 16), clay(YUZU));
        bulb.position.set(side * 0.39, 1.84, 0);
        squash.add(stalk, bulb);
      }
      const faceRoot = new THREE.Group();
      faceRoot.position.y = 0.74;
      squash.add(faceRoot);
      // On a sphere the face sits on the curved surface: eyes near the front, cheeks
      // further round where the surface has fallen back.
      face(faceRoot, eyes, { x: 0.27, y: 0.08, z: 0.8, mouth: 'o', blush: 0xff8fb0, cheekZ: 0.66 });
    }
    main.userData.layer = id;

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    shadow.scale.set(SIZE[id].w * 1.25, 2.4, 1);
    root.add(shadow);

    scene.add(root);
    return { root, squash, shadow, eyes, pick: [main], shackle, legs, lift };
  }

  const rigs = {} as Record<LayerId, Rig>;
  for (const id of IDS) rigs[id] = makeRig(id);
  const pickables = IDS.map((id) => rigs[id].pick[0]);

  // ---- Interaction state -------------------------------------------------------
  const spin = { v: 0 }; // drag rotation of the assembled stack
  const intro = {} as Record<LayerId, { y: number }>;
  const gaze = {} as Record<LayerId, { x: number; y: number }>;
  const landed = {} as Record<LayerId, number>;
  for (const id of IDS) {
    intro[id] = { y: 0 };
    gaze[id] = { x: 0, y: 0 };
    landed[id] = -1;
  }
  const pointer = { x: -1, y: -1, active: false };
  let W = window.innerWidth;
  let H = window.innerHeight;

  function pop(id: LayerId, hop = 0) {
    const s = rigs[id].squash;
    gsap.killTweensOf(s.scale);
    gsap
      .timeline()
      .to(s.scale, { x: 1.12, y: 0.85, z: 1.12, duration: 0.09, ease: 'power2.out' })
      .to(s.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'expo.out' });
    if (hop) {
      gsap.killTweensOf(s.position);
      gsap
        .timeline()
        .to(s.position, { y: hop, duration: 0.24, ease: 'power2.out' })
        .to(s.position, { y: 0, duration: 0.26, ease: 'power2.in', onComplete: () => pop(id) });
    }
  }

  // Each character blinks on its own irregular rhythm, as people do.
  function scheduleBlink(id: LayerId) {
    gsap.delayedCall(2.4 + Math.random() * 3.8, () => {
      const eyes = rigs[id].eyes.map((e) => e.scale);
      gsap
        .timeline({ onComplete: () => scheduleBlink(id) })
        .to(eyes, { y: 0.12, duration: 0.07, ease: 'power1.in' })
        .to(eyes, { y: 1, duration: 0.12, ease: 'power1.out' });
    });
  }
  IDS.forEach(scheduleBlink);

  // ---- Poses -------------------------------------------------------------------
  function stackPose(id: LayerId, e: number): Pose {
    const r = o.art.getBoundingClientRect();
    const total = STACK_H + LIFT.ml * e;
    const s = Math.min((r.height * 0.84) / total, (r.width * 0.86) / 3.5);
    const lift = (BASE[id] + LIFT[id] * e) * s;
    return {
      // The exploded view steps each part sideways, as an isometric drawing does.
      x: r.left + r.width / 2 + LIFT[id] * e * s * 0.32,
      y: r.top + r.height * 0.93 - lift + intro[id].y,
      s,
      ry: -0.45 + spin.v + e * 0.35,
      rx: 0.16 + 0.3 * e,
    };
  }

  function slotPose(id: LayerId, el: HTMLElement): Pose {
    const r = el.getBoundingClientRect();
    const s = Math.min((r.height * 0.8) / SIZE[id].h, (r.width * 0.8) / SIZE[id].w);
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 + (SIZE[id].h * s) / 2, s, ry: -0.35, rx: 0.12 };
  }

  const above = (id: LayerId, p: Pose): Pose => ({ ...p, y: -SIZE[id].h * p.s - 90 });

  function keys(id: LayerId, sy: number): Key[] {
    const { start: A, end: C } = o.heroRange();
    const B = A + (C - A) * 0.5;
    const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + sy;
    const list: Key[] = [
      { at: A, pose: () => stackPose(id, 0) },
      { at: B, pose: () => stackPose(id, 1), ease: ease.inOut },
      {
        at: C,
        pose: () => {
          const p = stackPose(id, 1);
          return { ...above(id, p), x: p.x + FAN[id] * W };
        },
        ease: ease.in,
        spin: 1,
      },
    ];
    // Stations in page order: its own band, any project figures it perches on, then
    // the closing reunion. It drops into each from above, and rides each one out of
    // view as the page scrolls on.
    const stations: { el: HTMLElement; land: number }[] = [];
    const band = o.bands[id];
    const slot = o.slots[id];
    if (band && slot) stations.push({ el: slot, land: docTop(band) - H * 0.28 });
    for (const el of o.perches[id]) stations.push({ el, land: docTop(el) - H * 0.62 });
    const crewEl = o.crew[id];
    if (o.contact && crewEl) {
      stations.push({ el: crewEl, land: docTop(o.contact) - H * 0.32 + IDS.indexOf(id) * H * 0.05 });
    }
    let held: (() => Pose) | null = null;
    for (const st of stations) {
      if (held) list.push({ at: st.land - H * 0.56, pose: held, ease: ease.none });
      list.push({ at: st.land - H * 0.55, pose: () => above(id, slotPose(id, st.el)), ease: ease.none });
      list.push({ at: st.land, pose: () => slotPose(id, st.el), ease: ease.fall, land: true });
      held = () => slotPose(id, st.el);
    }
    for (let i = 1; i < list.length; i++) {
      if (list[i].at <= list[i - 1].at) list[i].at = list[i - 1].at + 1;
    }
    return list;
  }

  function evaluate(id: LayerId, sy: number): Pose {
    const list = keys(id, sy);
    let k = -1;
    for (let i = 0; i < list.length; i++) if (list[i].at <= sy) k = i;
    if (k < 0) return list[0].pose();
    if (k === list.length - 1) return list[k].pose();
    const a = list[k];
    const b = list[k + 1];
    const t = clamp01((sy - a.at) / (b.at - a.at));
    const te = (b.ease ?? ease.inOut)(t);
    const pa = a.pose();
    const pb = b.pose();
    const pose: Pose = {
      x: lerp(pa.x, pb.x, te),
      y: lerp(pa.y, pb.y, te) - (b.arc ?? 0) * Math.sin(Math.PI * t) * H,
      s: lerp(pa.s, pb.s, te),
      ry: lerp(pa.ry, pb.ry, te) + (b.spin ?? 0) * Math.PI * 2 * te,
      rx: lerp(pa.rx, pb.rx, te),
    };
    if (b.land) {
      if (t > 0.985 && landed[id] !== k) {
        landed[id] = k;
        pop(id);
      } else if (t < 0.85 && landed[id] === k) {
        landed[id] = -1;
      }
    }
    return pose;
  }

  // ---- Leaders: callouts follow the parts while the stack is in the hero ---------
  const current = {} as Record<LayerId, Pose>;
  let inHero = true;
  const leaderProvider: Provider = (id) => {
    const p = current[id as LayerId];
    if (!p || !inHero) return null;
    const r = o.stage.getBoundingClientRect();
    const w = SIZE[id as LayerId].w;
    const h = STACKED_H[id as LayerId];
    return { x: p.x + w * p.s * 0.42 - r.left, y: p.y - h * p.s * 0.5 - r.top };
  };

  // ---- Picking -------------------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function pickAt(cx: number, cy: number): LayerId | null {
    ndc.set((cx / W) * 2 - 1, -(cy / H) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    return (hit?.object.userData.layer as LayerId | undefined) ?? null;
  }

  const callouts = new Map<LayerId, HTMLElement>();
  o.stage.querySelectorAll<HTMLElement>('[data-callout]').forEach((el) => {
    const id = el.dataset.callout as LayerId;
    callouts.set(id, el);
    el.addEventListener('pointerenter', () => pop(id));
    el.addEventListener('focus', () => pop(id));
  });

  let hovered: LayerId | null = null;
  function setHovered(id: LayerId | null) {
    if (id === hovered) return;
    if (hovered) callouts.get(hovered)?.classList.remove('is-hot');
    hovered = id;
    if (id) {
      callouts.get(id)?.classList.add('is-hot');
      pop(id);
    }
    o.stage.style.cursor = id ? 'pointer' : '';
  }

  // Drag the stack to turn it; let go and it springs back to face you.
  let dragging = false;
  let travelled = 0;
  let lastX = 0;
  o.stage.addEventListener('pointerdown', (ev) => {
    if ((ev.target as Element).closest('a')) return;
    dragging = true;
    travelled = 0;
    lastX = ev.clientX;
    gsap.killTweensOf(spin);
    o.stage.setPointerCapture(ev.pointerId);
  });
  o.stage.addEventListener('pointermove', (ev) => {
    if (dragging) {
      const dx = ev.clientX - lastX;
      lastX = ev.clientX;
      travelled += Math.abs(dx);
      spin.v += dx * 0.012;
    } else if (ev.pointerType === 'mouse' && inHero) {
      setHovered(pickAt(ev.clientX, ev.clientY));
    }
  });
  const release = (ev: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    if (travelled < 6) {
      const id = pickAt(ev.clientX, ev.clientY);
      if (id) {
        pop(id, 0.6);
        o.onPick(id);
      }
    }
    gsap.to(spin, { v: 0, duration: 1.6, ease: 'elastic.out(1, 0.42)' });
  };
  o.stage.addEventListener('pointerup', release);
  o.stage.addEventListener('pointercancel', release);
  o.stage.addEventListener('pointerleave', () => setHovered(null));

  window.addEventListener(
    'pointermove',
    (ev) => {
      pointer.x = ev.clientX;
      pointer.y = ev.clientY;
      pointer.active = ev.pointerType === 'mouse';
    },
    { passive: true },
  );

  // ---- Frame -------------------------------------------------------------------
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    renderer.setSize(W, H, false);
  }
  window.addEventListener('resize', resize);
  resize();

  let cleared = false;
  function frame() {
    const sy = window.scrollY;
    const { start: A, end: C } = o.heroRange();
    const B = A + (C - A) * 0.5;
    const e = clamp01((sy - A) / Math.max(1, B - A));
    const away = clamp01((sy - B) / Math.max(1, C - B));
    inHero = away < 0.12;
    o.stage.classList.toggle('is-away', !inHero);
    // The anime beat: focus lines build as the parts separate and clear as they fly off;
    // the impact lettering lands at the moment of full separation.
    const burst = clamp01((e - 0.25) / 0.4) * (1 - clamp01(away / 0.5));
    const sfx = clamp01((e - 0.62) / 0.25) * (1 - clamp01(away / 0.35));
    o.stage.style.setProperty('--burst', burst.toFixed(3));
    o.stage.style.setProperty('--sfx', sfx.toFixed(3));

    // Dolly zoom: widen the lens while pulling in, so the layout plane holds still
    // and only the depth of the characters stretches.
    const zoom = e < 1 ? ease.inOut(e) : 1 - ease.inOut(away);
    camera.fov = 30 + 20 * zoom;
    camera.aspect = W / H;
    camera.position.set(0, 0, (H * K) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    let visible = false;
    for (const id of IDS) {
      const p = evaluate(id, sy);
      current[id] = p;
      const rig = rigs[id];
      const h = SIZE[id].h * p.s;
      // Characters turn a little to look at the cursor.
      const g = gaze[id];
      const tx = pointer.active ? Math.max(-0.28, Math.min(0.28, ((pointer.x - p.x) / W) * 0.9)) : 0;
      const ty = pointer.active ? Math.max(-0.22, Math.min(0.22, ((pointer.y - (p.y - h / 2)) / H) * 0.5)) : 0;
      g.x += (tx - g.x) * 0.07;
      g.y += (ty - g.y) * 0.07;
      rig.root.position.set((p.x - W / 2) * K, (H / 2 - p.y) * K, 0);
      rig.root.scale.setScalar(p.s * K);
      // Turn toward the lens from wherever the character stands, so a character at the
      // edge of the screen is not seen side-on through the perspective camera.
      const toLens = Math.atan2((W / 2 - p.x) * K, camera.position.z);
      rig.root.rotation.set(p.rx + g.y, p.ry + g.x + toLens, 0);
      // Upper parts of the stack only cast a shadow once they lift off.
      const stacked = id !== 'hardware' && inHero ? e : 1;
      (rig.shadow.material as THREE.MeshBasicMaterial).opacity = stacked;
      const out = inHero ? Math.max(0.001, e) : 1;
      if (rig.shackle) {
        rig.shackle.scale.y += (out - rig.shackle.scale.y) * 0.18;
        rig.shackle.visible = rig.shackle.scale.y > 0.02;
      }
      if (rig.legs && rig.lift) {
        rig.legs.scale.y += (out - rig.legs.scale.y) * 0.18;
        rig.legs.visible = rig.legs.scale.y > 0.02;
        rig.lift.position.y = 0.4 * rig.legs.scale.y;
      }
      if (p.y > -40 && p.y - h < H + 40) visible = true;
    }

    if (visible || !cleared) {
      renderer.render(scene, camera);
      cleared = !visible;
    }
    o.leaders?.update();
  }

  gsap.ticker.add(frame);
  frame();
  document.documentElement.classList.add('scene-live');
  o.leaders?.use(leaderProvider);

  // Opening: the three characters drop onto each other, bottom first.
  IDS.forEach((id, i) => {
    intro[id].y = -H * 1.1;
    gsap.to(intro[id], {
      y: 0,
      duration: 0.62,
      delay: 0.25 + i * 0.22,
      ease: 'power2.in',
      onComplete: () => pop(id),
    });
  });

  return true;
}
