"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/** Reads what sits under the header so it can switch to light-on-dark over footage and dark sections. */
export function syncHeaderTheme() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const probeY = (header?.offsetHeight ?? 80) / 2;
  const surface = document
    .elementsFromPoint(window.innerWidth / 2, probeY)
    .find((element) => !element.closest(".site-header"));
  document.body.classList.toggle("header-dark", Boolean(surface?.closest('[data-surface="dark"]')));
}

export function ScrollSystem() {
  const lineRef = useRef<HTMLSpanElement>(null);
  const chargeRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    let lastCharge = -1;
    const line = lineRef.current;
    const body = document.body;
    const trigger = ScrollTrigger.create({
      id: "site-energy-progress",
      trigger: document.documentElement,
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      // Refresh after every page trigger so pin spacing is included in the max scroll.
      refreshPriority: -10,
      onUpdate: (self) => {
        if (line) line.style.transform = `scaleY(${self.progress})`;
        const charge = Math.min(100, Math.floor(self.progress * 4.001) * 25);
        if (charge !== lastCharge && chargeRef.current) {
          chargeRef.current.textContent = String(charge).padStart(3, "0");
          lastCharge = charge;
        }
        const scrolled = self.scroll() > 40;
        body.classList.toggle("header-scrolled", scrolled);
        if (!body.classList.contains("menu-open")) {
          body.classList.toggle("header-hidden", scrolled && self.direction === 1 && self.scroll() > window.innerHeight * 0.6);
        }
        syncHeaderTheme();
      },
    });
    body.classList.remove("header-hidden");
    body.classList.toggle("header-scrolled", window.scrollY > 40);
    syncHeaderTheme();

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
        // A long, eased glide: heavier than native scrolling but never floaty.
        lenis = new Lenis({
          duration: 1.35,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.4,
          anchors: { offset: 0, duration: 1.6 },
          autoRaf: false,
        });
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
      if (active) refreshFrame = requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); syncHeaderTheme(); });
    });
    return () => {
      active = false;
      cancelAnimationFrame(refreshFrame);
      trigger.kill();
      mm.revert();
      body.classList.remove("header-hidden", "header-dark", "header-scrolled");
    };
  }, { dependencies: [pathname], revertOnUpdate: true });

  return (
    <aside className="scroll-system" aria-hidden="true">
      <span className="scroll-track"><span ref={lineRef} /></span>
      <span className="scroll-charge"><i /> SYSTEM <span ref={chargeRef}>000</span>%</span>
    </aside>
  );
}
