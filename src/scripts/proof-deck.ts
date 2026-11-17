// Proof decks: each project's drawing sits on a small deck of real proof (live sites,
// build photographs, report diagrams). Every card is a plate of the same
// construction; the cards behind peek out with labelled tabs, so there is visibly more.
//
// With motion allowed, the drawing starts on top. When the project scrolls into view,
// the first proof card knocks twice from behind the drawing, then pulls out, lands on
// top and develops from a coarse halftone into the full image, like a print coming up.
//
// Under reduced motion, or without scripts, the page is rendered with the proof
// already on top; nothing moves, and the switch and the peeking cards still change
// the card instantly.
import gsap from 'gsap';

export function initDecks(reduced: boolean) {
  document.documentElement.classList.add('js-decks');

  for (const deck of document.querySelectorAll<HTMLElement>('[data-deck]')) {
    const cards = [...deck.querySelectorAll<HTMLElement>('[data-card]')];
    const buttons = [...deck.querySelectorAll<HTMLButtonElement>('[data-show]')];
    const order = cards.map((card) => card.dataset.card!);
    const cardFor = (key: string) => cards.find((card) => card.dataset.card === key)!;
    let front = deck.dataset.front ?? order[0];
    let busy = false;

    // Depth 0 is the top card; the rest keep their deck order behind it.
    function layout(next: string) {
      const rest = order.filter((key) => key !== next);
      for (const card of cards) {
        const key = card.dataset.card!;
        const depth = key === next ? 0 : rest.indexOf(key) + 1;
        card.style.setProperty('--depth', String(depth));
        card.dataset.depth = String(depth);
        if (depth > 0) card.setAttribute('aria-hidden', 'true');
        else card.removeAttribute('aria-hidden');
        for (const link of card.querySelectorAll<HTMLElement>('a, button')) {
          if (depth > 0) link.setAttribute('tabindex', '-1');
          else link.removeAttribute('tabindex');
        }
      }
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.show === next));
      }
      deck.dataset.front = next;
      front = next;
    }

    // A proof card comes out of the deck as a blank print, and comes up once it is on
    // top: dots grow on a fixed grid until they merge into the image.
    const mediaOf = (card: HTMLElement) => card.querySelector<HTMLElement>('.deck__media');

    function blank(card: HTMLElement) {
      const media = mediaOf(card);
      if (!media) return;
      gsap.killTweensOf(media);
      gsap.set(media, { '--grain': '1px' });
      media.classList.add('is-developing');
    }

    function develop(card: HTMLElement) {
      const media = mediaOf(card);
      if (!media) return;
      gsap.to(media, {
        '--grain': '9px',
        duration: 1.15,
        ease: 'power1.in',
        onComplete: () => media.classList.remove('is-developing'),
      });
    }

    // The pull is two custom properties added to the card's CSS translate and rotate,
    // so the depth layout and the hand movement never fight over one property.
    const pull = (card: HTMLElement, x: number, r: number, duration: number, ease: string) =>
      gsap.to(card, { '--pull-x': `${x}px`, '--pull-r': `${r}deg`, duration, ease });

    // A card is pulled out sideways from behind, then laid on top: once released,
    // the CSS transition carries it from the pulled position to the top of the deck.
    function show(next: string, animate: boolean) {
      if (next === front || busy) return;
      const card = cardFor(next);
      if (!animate || reduced) {
        layout(next);
        return;
      }
      busy = true;
      blank(card);
      card.classList.add('is-pulled');
      pull(card, card.offsetWidth * 0.26, 5, 0.3, 'power2.out').then(() => {
        card.classList.remove('is-pulled');
        gsap.set(card, { '--pull-x': '0px', '--pull-r': '0deg' });
        layout(next);
        develop(card);
        window.setTimeout(() => (busy = false), 600);
      });
    }

    for (const button of buttons) {
      button.addEventListener('click', () => show(button.dataset.show!, true));
    }
    // A peeking card can be pulled to the top directly.
    for (const card of cards) {
      card.addEventListener('click', () => {
        if (card.dataset.depth !== '0') show(card.dataset.card!, true);
      });
    }

    if (reduced) {
      layout(front);
      continue;
    }

    // Motion allowed: start on the drawing, without animating the switch.
    deck.classList.add('is-settling');
    layout('drawing');
    requestAnimationFrame(() => deck.classList.remove('is-settling'));

    const first = order.find((key) => key !== 'drawing');
    if (!first) continue;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Two knocks from behind the drawing: there is more here. Then it comes out.
        const card = cardFor(first);
        const w = card.offsetWidth;
        busy = true;
        card.classList.add('is-pulled');
        gsap
          .timeline({
            delay: 0.3,
            onComplete: () => {
              card.classList.remove('is-pulled');
              busy = false;
              show(first, true);
            },
          })
          .to(card, { '--pull-x': `${w * 0.08}px`, '--pull-r': '2.5deg', duration: 0.2, ease: 'power2.out' })
          .to(card, { '--pull-x': '0px', '--pull-r': '0deg', duration: 0.18, ease: 'power2.in' })
          .to(card, { '--pull-x': `${w * 0.11}px`, '--pull-r': '3.5deg', duration: 0.22, ease: 'power2.out' }, '+=0.1')
          .to(card, { '--pull-x': '0px', '--pull-r': '0deg', duration: 0.18, ease: 'power2.in' })
          .to({}, { duration: 0.12 });
      },
      { threshold: 0.45 },
    );
    io.observe(deck);
  }
}
