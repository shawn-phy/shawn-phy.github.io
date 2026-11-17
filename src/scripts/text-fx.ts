// Text effects, each tied to what its words are about. They run once, when the
// text first comes into view, and never under reduced motion.
//   power     hardware heading: letters switch on in sequence, like LEDs on a board
//   decrypt   security heading: letters resolve out of hex bytes, like a memory dump
//   generate  ML heading: the words arrive token by token behind a caret
//   wave      closing heading: a single wave as the characters land
//   data-flap dates: digits roll like a split-flap board before they settle

const GLYPHS = '0123456789ABCDEF';
const TOKENS = [3, 2, 4, 3, 2, 3];

const letters = (el: Element) => [...el.querySelectorAll<HTMLElement>('.bt__l')];

function power(el: HTMLElement) {
  letters(el).forEach((l, i) => {
    l.animate(
      [
        { opacity: 0.18 },
        { opacity: 1, offset: 0.25 },
        { opacity: 0.35, offset: 0.4 },
        { opacity: 1 },
      ],
      { duration: 340, delay: i * 42, easing: 'steps(6, end)', fill: 'both' },
    );
  });
}

function decrypt(el: HTMLElement) {
  const ls = letters(el);
  const original = ls.map((l) => l.textContent ?? '');
  // Hold each letter's width so the scramble never shifts the line.
  ls.forEach((l) => {
    l.style.minWidth = `${l.getBoundingClientRect().width}px`;
    l.style.textAlign = 'center';
  });
  el.classList.add('fx-on');
  let tick = 0;
  const timer = window.setInterval(() => {
    tick++;
    const solved = Math.floor(tick / 2);
    ls.forEach((l, i) => {
      l.textContent = i < solved ? original[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    });
    if (solved >= ls.length) window.clearInterval(timer);
  }, 42);
}

function generate(el: HTMLElement) {
  const ls = letters(el);
  el.classList.add('fx-on');
  ls.forEach((l) => (l.style.opacity = '0'));
  const caret = document.createElement('span');
  caret.className = 'fx-caret';
  caret.setAttribute('aria-hidden', 'true');
  el.append(caret);
  let i = 0;
  let n = 0;
  const step = () => {
    const size = TOKENS[n++ % TOKENS.length];
    const chunk = ls.slice(i, i + size);
    chunk.forEach((l) => {
      l.style.opacity = '';
      l.animate([{ opacity: 0, translate: '0 6px' }, { opacity: 1, translate: '0 0' }], {
        duration: 220,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
    });
    i += size;
    chunk.at(-1)?.after(caret);
    if (i < ls.length) window.setTimeout(step, 85);
    else window.setTimeout(() => caret.remove(), 1400);
  };
  step();
}

function wave(el: HTMLElement) {
  letters(el).forEach((l, i) => {
    l.animate(
      [{ translate: '0 0' }, { translate: '0 -0.28em' }, { translate: '0 0.04em' }, { translate: '0 0' }],
      { duration: 620, delay: i * 30, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    );
  });
}

function flap(el: HTMLElement) {
  const target = el.textContent ?? '';
  if (!/\d/.test(target)) return;
  let tick = 0;
  const digits = [...target].map((ch, i) => ({ ch, i })).filter((d) => /\d/.test(d.ch));
  const timer = window.setInterval(() => {
    tick++;
    const chars = [...target];
    digits.forEach((d, k) => {
      if (tick < 3 + k * 1.5) chars[d.i] = String((Math.random() * 10) | 0);
    });
    el.textContent = chars.join('');
    if (tick >= 3 + digits.length * 1.5) {
      el.textContent = target;
      window.clearInterval(timer);
    }
  }, 45);
}

const RUN: Record<string, (el: HTMLElement) => void> = { power, decrypt, generate, wave };

export function initTextFx() {
  document.documentElement.classList.add('fx-armed');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        if (el.hasAttribute('data-flap')) flap(el);
        else RUN[el.dataset.fx ?? '']?.(el);
      }
    },
    { rootMargin: '0px 0px -18% 0px' },
  );
  document.querySelectorAll('[data-fx], [data-flap]').forEach((el) => io.observe(el));
}
