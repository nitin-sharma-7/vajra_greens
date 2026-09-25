"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function ScrollSystem() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const chargeRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    let lastCharge = -1;
    const line = lineRef.current;
    const trigger = ScrollTrigger.create({
      id: "site-energy-progress",
      trigger: document.documentElement,
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        if (line) line.style.transform = `scaleY(${self.progress})`;
        const charge = Math.min(100, Math.floor(self.progress * 4.001) * 25);
        if (charge !== lastCharge && chargeRef.current) {
          chargeRef.current.textContent = String(charge).padStart(3, "0");
          lastCharge = charge;
        }
      },
    });
    let active = true;
    let refreshFrame = 0;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      let alive = true;
      let lenis: import("lenis").default | undefined;
      let ticker: ((time: number) => void) | undefined;
      let observer: MutationObserver | undefined;
      import("lenis").then(({ default: Lenis }) => {
        if (!alive) return;
        lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: true });
        lenis.on("scroll", ScrollTrigger.update);
        ticker = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
        const syncMenu = () => document.body.classList.contains("menu-open") ? lenis?.stop() : lenis?.start();
        observer = new MutationObserver(syncMenu);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        syncMenu();
      }).catch(() => undefined);
      return () => {
        alive = false;
        observer?.disconnect();
        if (ticker) gsap.ticker.remove(ticker);
        lenis?.destroy();
      };
    });
    document.fonts.ready.then(() => {
      if (active) refreshFrame = requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
    });
    return () => {
      active = false;
      cancelAnimationFrame(refreshFrame);
      trigger.kill();
      mm.revert();
    };
  }, { dependencies: [pathname], revertOnUpdate: true });

  return (
    <aside className="scroll-system" aria-hidden="true">
      <span className="scroll-track"><span ref={lineRef} /></span>
      <span className="scroll-charge"><i /> SYSTEM <span ref={chargeRef}>000</span>%</span>
    </aside>
  );
}
