// The opening: each letter of the name falls onto its baseline and squashes once on
// contact, in step with the three characters dropping onto each other.
import gsap from 'gsap';

export function runEntrance() {
  if (!document.documentElement.classList.contains('will-animate')) return;
  const letters = document.querySelectorAll<HTMLElement>('.bop__l');
  const tl = gsap.timeline({ delay: 0.15 });
  letters.forEach((letter, i) => {
    const at = i * 0.045;
    tl.fromTo(
      letter,
      { opacity: 0, y: -70 },
      { opacity: 1, y: 0, duration: 0.34, ease: 'power2.in' },
      at,
    )
      .to(letter, { scaleX: 1.12, scaleY: 0.85, duration: 0.07, ease: 'power2.out' }, at + 0.34)
      .to(letter, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'expo.out' }, at + 0.41);
  });
}
