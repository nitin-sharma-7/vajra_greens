import type { ReactNode } from "react";

/**
 * Renders each line inside an overflow mask so GSAP can slide `.line` in and out of view.
 * `inner` adds a nested `.line-inner`, letting a second animation (e.g. an intro) move the
 * line independently of a scroll-driven one without the two fighting over the same transform.
 */
export function Lines({ lines, inner = false }: { lines: ReactNode[]; inner?: boolean }) {
  return (
    <>
      {lines.map((line, index) => (
        <span className="line-mask" key={index}>
          <span className="line">{inner ? <span className="line-inner">{line}</span> : line}</span>
        </span>
      ))}
    </>
  );
}
