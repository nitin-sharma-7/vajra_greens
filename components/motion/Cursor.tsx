"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cursor = ref.current;
      if (!cursor) return;
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
      let visible = false;

      const move = (event: PointerEvent) => {
        if (!visible) {
          gsap.set(cursor, { x: event.clientX, y: event.clientY });
          cursor.classList.add("is-visible");
          visible = true;
        }
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const over = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target : null;
        cursor.classList.toggle("is-hover", Boolean(target?.closest("a, button, [data-cursor]")));
      };
      const leave = () => {
        cursor.classList.remove("is-visible");
        visible = false;
      };

      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerover", over, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
