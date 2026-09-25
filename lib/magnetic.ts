import gsap from "gsap";

/**
 * Pulls an element (and its `.magnetic-inner`, a little further) toward the pointer,
 * then springs it back on leave. Returns a cleanup that removes the listeners.
 */
export function magnetize(element: HTMLElement): () => void {
  const inner = element.querySelector(".magnetic-inner");
  const ease = { duration: 0.9, ease: "elastic.out(1, 0.4)" };
  const xTo = gsap.quickTo(element, "x", ease);
  const yTo = gsap.quickTo(element, "y", ease);
  const innerX = inner ? gsap.quickTo(inner, "x", ease) : undefined;
  const innerY = inner ? gsap.quickTo(inner, "y", ease) : undefined;

  const move = (event: PointerEvent) => {
    const bounds = element.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    xTo(dx * 0.32);
    yTo(dy * 0.4);
    innerX?.(dx * 0.14);
    innerY?.(dy * 0.18);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
    innerX?.(0);
    innerY?.(0);
  };

  element.addEventListener("pointermove", move);
  element.addEventListener("pointerleave", leave);
  return () => {
    element.removeEventListener("pointermove", move);
    element.removeEventListener("pointerleave", leave);
  };
}
