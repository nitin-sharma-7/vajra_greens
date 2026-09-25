"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Lines } from "@/components/motion/Lines";
import { magnetize } from "@/lib/magnetic";
import { syncHeaderTheme } from "@/components/motion/ScrollSystem";

const pillars = [
  { number: "01", eyebrow: "Infrastructure", title: "Made for movement.", copy: "AC and fast DC charging configured around vehicle mix, grid feasibility, safety, and site demand." },
  { number: "02", eyebrow: "Operations", title: "Ready when needed.", copy: "Installation, operation, monitoring, maintenance, and business optimisation through one partner." },
  { number: "03", eyebrow: "Intelligence", title: "One connected system.", copy: "Hardware connected to the StatiQ ecosystem for sessions, access, transactions, visibility, and performance data." },
  { number: "04", eyebrow: "Partnerships", title: "Built around demand.", copy: "Commercial models for fleets, businesses, residential sites, hospitality, and high-demand locations." },
];

const deliverySteps = [
  { number: "01", title: "Identify", copy: "Find locations where EV demand, access, traffic, parking, and commercial potential align." },
  { number: "02", title: "Assess", copy: "Review grid feasibility, the expected vehicle mix, dwell time, and the operating needs of the site." },
  { number: "03", title: "Configure", copy: "Select suitable AC or fast DC hardware for speed, compatibility, safety, reliability, and demand." },
  { number: "04", title: "Connect", copy: "Install the station and integrate the software layer for customer access, sessions, and transactions." },
  { number: "05", title: "Operate", copy: "Monitor usage and performance, maintain the equipment, and keep the station ready for customers." },
];

const audiences = [
  { title: "Fleet operators", copy: "Cab and taxi fleets, logistics and delivery operators, corporate mobility, and other high-utilisation EV fleets.", link: "/partnerships" },
  { title: "Location partners", copy: "Commercial complexes, hotels, business parks, campuses, residential developments, fuel stations, and transport hubs.", link: "/network" },
  { title: "EV drivers", copy: "Private owners, daily commuters, intercity travellers, and commercial drivers who need dependable fast charging.", link: "/charging" },
];

const roadmap = [
  { year: "2023", title: "Company incorporated", copy: "Vajra Greens began its registered journey in New Delhi on 21 August 2023." },
  { year: "Today", title: "Operating in market", copy: "The company presentation reports two operational chargers and active fleet-operator partnerships." },
  { year: "2028", title: "Build regional density", copy: "Company goal: more than 50 stations and relationships with at least 10 B2B operators." },
  { year: "2030", title: "Scale the platform", copy: "Company goal: more than 200 stations with a customer application live." },
  { year: "2032", title: "Lead the region", copy: "Company ambition: more than 500 stations and a leading regional charging-point-operator position." },
];

const marqueeWords = [
  { word: "Energy", italic: false },
  { word: "meets", italic: true },
  { word: "mobility", italic: false },
  { word: "Charging", italic: false },
  { word: "connected", italic: true },
  { word: "Always ready", italic: false },
];

const accent = "font-display font-normal italic";
// Far enough (as a % of line height) to clear the padded line masks at tight 0.82 leading.
const LINE_TRAVEL = 165;

// Survives client-side navigation but resets on a full page load, so the loader plays once per visit.
let introPlayed = false;

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  const root = useRef<HTMLElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const systemVideo = useRef<HTMLVideoElement>(null);
  const horizonVideo = useRef<HTMLVideoElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(root);
    const cleanups: Array<() => void> = [];
    const videos = [systemVideo.current, horizonVideo.current].filter(Boolean) as HTMLVideoElement[];
    const playVideosInView = () => videos.map((video) => ScrollTrigger.create({
      trigger: video.closest("section"),
      start: "top bottom",
      end: "bottom top",
      refreshPriority: -1,
      onEnter: () => void video.play().catch(() => undefined),
      onEnterBack: () => void video.play().catch(() => undefined),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause(),
    }));

    if (reduceMotion) {
      gsap.set(loader.current, { display: "none" });
      playVideosInView();
      return () => videos.forEach((video) => video.pause());
    }

    /* ---------- Shared reveal helpers ---------- */
    const revealLines = (selector: string, start = "top 86%") => q(selector).forEach((element) => {
      gsap.from(element.querySelectorAll(".line"), {
        yPercent: LINE_TRAVEL,
        rotate: 2.5,
        stagger: 0.09,
        duration: 1.35,
        ease: "expo.out",
        scrollTrigger: { trigger: element, start, once: true },
      });
    });
    const fadeUp = (selector: string, stagger = 0.1) => {
      const items = q(selector);
      if (!items.length) return;
      gsap.set(items, { autoAlpha: 0, y: 48 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger, duration: 1.3, ease: "expo.out", overwrite: true }),
      });
    };

    /* ---------- Intro: loader curtain, then the hero film settles in ---------- */
    const firstVisit = !introPlayed;
    const intro = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => { introPlayed = true; } });
    if (firstVisit) {
      const counter = q(".loader-count")[0];
      const status = q(".loader-status")[0];
      const cells = q(".loader-cell");
      const statuses = ["Mapping demand", "Checking grid capacity", "Connecting stations", "Fully charged"];
      let lastStatus = 0;
      const charge = { value: 0 };
      intro
        .fromTo(".loader-logo", { clipPath: "inset(100% 0% 0% 0%)", yPercent: 14 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.3 }, 0)
        .from(".loader-ui", { autoAlpha: 0, y: 14, stagger: 0.1, duration: 1.1 }, 0.15)
        .from(cells, { scaleY: 0, stagger: 0.03, duration: 0.7, ease: "power3.out" }, 0.3)
        .to(charge, {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.round(charge.value)).padStart(3, "0");
            const lit = Math.round((charge.value / 100) * cells.length);
            cells.forEach((cell, index) => cell.classList.toggle("is-lit", index < lit));
            const next = charge.value >= 100 ? 3 : Math.min(2, Math.floor(charge.value / 34));
            if (next !== lastStatus) {
              lastStatus = next;
              status.textContent = statuses[next];
              gsap.fromTo(status, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
            }
          },
        }, 0.5)
        .to(".loader-logo", { scale: 1.04, duration: 0.45, ease: "power2.out" })
        .to([".loader-logo", ".loader-cells", ".loader-ui"], { autoAlpha: 0, y: -26, stagger: 0.04, duration: 0.5, ease: "power3.in" }, ">")
        // A charging "portal" opens from the centre, its edge glowing green, revealing the film beneath.
        .fromTo(loader.current, { "--hole": "0vmax", "--rim": "0px" }, { "--hole": "150vmax", "--rim": "18px", duration: 1.4, ease: "expo.inOut" }, "-=0.2")
        .addLabel("reveal", "-=0.95")
        .set(loader.current, { display: "none" })
        // The header last saw the light loader; re-read the surface now the dark film is beneath it.
        .call(syncHeaderTheme)
        .from(document.querySelectorAll(".site-header > .brand, .site-header > .desktop-nav, .site-header > .header-actions"), { autoAlpha: 0, y: -18, stagger: 0.07, duration: 1.2, clearProps: "all" }, "reveal+=0.45");
    } else {
      gsap.set(loader.current, { display: "none" });
      intro.addLabel("reveal", 0);
    }
    intro
      .from(".system-video", { scale: 1.3, duration: 2.6 }, "reveal")
      .from(".hero-beat-1 .line-inner", { yPercent: LINE_TRAVEL, rotate: 2.5, stagger: 0.08, duration: 1.6 }, "reveal+=0.2")
      .from(".hero-chrome", { autoAlpha: 0, y: 18, stagger: 0.08, duration: 1.3 }, "reveal+=0.6");

    /* ---------- 01 Hero film: three beats, then the frame shrinks into the page ---------- */
    gsap.set(".beat-later", { autoAlpha: 1 });
    gsap.set(".hero-beat-2 .line, .hero-beat-3 .line", { yPercent: LINE_TRAVEL });
    const heroInset = () => {
      const x = Math.max(14, window.innerWidth * 0.035);
      const y = Math.max(14, window.innerHeight * 0.055);
      return `inset(${y}px ${x}px ${y}px ${x}px round 22px)`;
    };
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "home-system-film",
        trigger: ".home-system",
        start: "top top",
        end: () => `+=${window.innerHeight * 3.6}`,
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .fromTo(".system-video-layer", { scale: 1 }, { scale: 1.12, duration: 1 }, 0)
      .to(".system-shade", { opacity: 0.3, duration: 0.3 }, 0)
      .to(".hero-beat-1 .line", { yPercent: -LINE_TRAVEL, stagger: 0.012, duration: 0.12, ease: "power2.in" }, 0.14)
      .to(".hero-beat-2 .line", { yPercent: 0, stagger: 0.016, duration: 0.14, ease: "power2.out" }, 0.24)
      .to(".hero-beat-2 .line", { yPercent: -LINE_TRAVEL, stagger: 0.012, duration: 0.12, ease: "power2.in" }, 0.45)
      .to(".hero-beat-3 .line", { yPercent: 0, stagger: 0.016, duration: 0.14, ease: "power2.out" }, 0.55)
      .to(".hero-progress-fill", { scaleX: 1, duration: 0.76 }, 0)
      .to(".hero-chrome", { autoAlpha: 0, duration: 0.08 }, 0.76)
      .fromTo(".system-frame", { clipPath: "inset(0px 0px 0px 0px round 0px)" }, { clipPath: heroInset, duration: 0.24, ease: "power2.inOut" }, 0.76)
      .to(".hero-beat-3", { scale: 0.93, duration: 0.24, ease: "power2.inOut" }, 0.76);

    /* ---------- Movement intro: headline, then the paragraph lights up word by word ---------- */
    revealLines(".movement-intro h2");
    gsap.from(".movement-rule", { scaleX: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".movement-rule", start: "top 88%", once: true } });
    SplitText.create(q(".movement-copy"), {
      type: "words",
      onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.14 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: self.elements[0], start: "top 82%", end: "bottom 48%", scrub: true },
      }),
    });
    fadeUp(".movement-stat", 0.12);

    /* ---------- Marquee: drifts on its own, surges and skews with scroll velocity ---------- */
    const marquee = q(".marquee-track")[0];
    if (marquee) {
      let wrap = gsap.utils.wrap(-marquee.scrollWidth / 2, 0);
      let x = 0;
      let boost = 0;
      let direction = 1;
      const setX = gsap.quickSetter(marquee, "x", "px");
      const setSkew = gsap.quickSetter(marquee, "skewX", "deg");
      const tick = (_time: number, deltaTime: number) => {
        const step = Math.min(deltaTime, 50) / 16.67;
        x = wrap(x - direction * (0.9 + boost) * step);
        boost *= 0.92;
        setX(x);
        setSkew(gsap.utils.clamp(-9, 9, -direction * boost * 0.5));
      };
      ScrollTrigger.create({
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick),
        onUpdate: (self) => {
          direction = self.direction;
          boost = Math.min(Math.abs(self.getVelocity()) / 140, 16);
        },
        onRefresh: () => { wrap = gsap.utils.wrap(-marquee.scrollWidth / 2, 0); },
      });
      cleanups.push(() => gsap.ticker.remove(tick));
    }

    /* ---------- 02 Operating model: a free horizontal rail (page scroll is never hijacked) ---------- */
    revealLines(".operating-model h2");
    fadeUp(".operating-aside");
    gsap.from(q(".rail-card"), {
      x: 120,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: { trigger: ".rail-track", start: "top 82%", once: true },
    });
    const rail = track.current;
    if (rail) {
      const cards = q(".rail-card");
      const counter = q(".rail-count")[0];
      const fill = q(".rail-progress-fill")[0];
      const prev = q(".rail-prev")[0] as HTMLButtonElement;
      const next = q(".rail-next")[0] as HTMLButtonElement;
      const nums = cards.map((card) => gsap.quickSetter(card.querySelector(".card-num"), "x", "px"));
      const setFill = gsap.quickSetter(fill, "scaleX");
      const maxScroll = () => rail.scrollWidth - rail.clientWidth;
      const cardStarts = () => {
        const inset = parseFloat(getComputedStyle(rail).paddingLeft);
        return cards.map((card) => card.offsetLeft - rail.offsetLeft - inset);
      };
      let glide: gsap.core.Tween | undefined;

      const sync = () => {
        const max = maxScroll();
        const progress = max > 0 ? rail.scrollLeft / max : 0;
        setFill(progress);
        const starts = cardStarts();
        const active = starts.reduce((best, start, index) => Math.abs(start - rail.scrollLeft) < Math.abs(starts[best] - rail.scrollLeft) ? index : best, 0);
        counter.textContent = `0${progress > 0.98 ? cards.length : active + 1}`;
        prev.disabled = rail.scrollLeft < 4;
        next.disabled = rail.scrollLeft > max - 4;
        // The outlined numerals drift against the scroll direction for a little depth.
        const center = rail.clientWidth / 2;
        cards.forEach((card, index) => {
          const offset = card.offsetLeft - rail.offsetLeft - rail.scrollLeft + card.offsetWidth / 2 - center;
          nums[index](gsap.utils.clamp(-36, 36, offset * -0.05));
        });
      };
      const glideTo = (left: number) => {
        glide?.kill();
        glide = gsap.to(rail, { scrollLeft: gsap.utils.clamp(0, maxScroll(), left), duration: 1, ease: "expo.out", onUpdate: sync });
      };
      const nearestStart = (left: number) => cardStarts().reduce((best, start) => Math.abs(start - left) < Math.abs(best - left) ? start : best, 0);
      const step = (direction: 1 | -1) => {
        const starts = cardStarts();
        const current = rail.scrollLeft;
        const target = direction === 1 ? starts.find((start) => start > current + 8) : [...starts].reverse().find((start) => start < current - 8);
        glideTo(target ?? (direction === 1 ? maxScroll() : 0));
      };
      const onPrev = () => step(-1);
      const onNext = () => step(1);
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      };

      // Mouse drag with momentum, settling on the nearest card. Touch and trackpads scroll natively.
      let dragging = false;
      let moved = false;
      let startX = 0;
      let startLeft = 0;
      let lastX = 0;
      let lastTime = 0;
      let velocity = 0;
      const onDown = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        glide?.kill();
        dragging = true;
        moved = false;
        startX = lastX = event.clientX;
        startLeft = rail.scrollLeft;
        lastTime = performance.now();
        velocity = 0;
      };
      const onMove = (event: PointerEvent) => {
        if (!dragging) return;
        const dx = event.clientX - startX;
        if (!moved && Math.abs(dx) > 4) {
          moved = true;
          rail.classList.add("is-dragging");
          rail.setPointerCapture(event.pointerId);
        }
        if (!moved) return;
        const now = performance.now();
        velocity = (event.clientX - lastX) / Math.max(1, now - lastTime);
        lastX = event.clientX;
        lastTime = now;
        rail.scrollLeft = startLeft - dx;
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        rail.classList.remove("is-dragging");
        if (moved) glideTo(nearestStart(rail.scrollLeft - velocity * 420));
      };
      // A drag that ends over a link must not also count as a click.
      const onClick = (event: MouseEvent) => {
        if (moved) { event.preventDefault(); event.stopPropagation(); moved = false; }
      };

      rail.addEventListener("scroll", sync, { passive: true });
      rail.addEventListener("pointerdown", onDown);
      rail.addEventListener("pointermove", onMove);
      rail.addEventListener("pointerup", onUp);
      rail.addEventListener("pointercancel", onUp);
      rail.addEventListener("click", onClick, true);
      rail.addEventListener("keydown", onKey);
      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
      window.addEventListener("resize", sync);
      sync();
      cleanups.push(() => {
        glide?.kill();
        rail.removeEventListener("scroll", sync);
        rail.removeEventListener("pointerdown", onDown);
        rail.removeEventListener("pointermove", onMove);
        rail.removeEventListener("pointerup", onUp);
        rail.removeEventListener("pointercancel", onUp);
        rail.removeEventListener("click", onClick, true);
        rail.removeEventListener("keydown", onKey);
        prev.removeEventListener("click", onPrev);
        next.removeEventListener("click", onNext);
        window.removeEventListener("resize", sync);
      });
    }

    /* ---------- 03 Process: the line draws down and lights each step as it passes ---------- */
    revealLines(".process-section h2");
    fadeUp(".process-fade");
    gsap.fromTo(".process-line-fill", { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: ".process-list", start: "top 60%", end: "bottom 60%", scrub: 0.6 },
    });
    q(".process-step").forEach((step) => {
      const dot = step.querySelector<HTMLElement>(".process-dot");
      ScrollTrigger.create({
        trigger: step,
        start: () => `top+=${(dot?.offsetTop ?? 0) + 6} 60%`,
        onEnter: () => step.classList.add("is-lit"),
        onLeaveBack: () => step.classList.remove("is-lit"),
      });
    });
    fadeUp(".process-body");

    /* ---------- 04 Audiences ---------- */
    revealLines(".audience-section h2");
    fadeUp(".audience-fade");
    fadeUp(".audience-card", 0.14);

    /* ---------- 05 Technology ---------- */
    revealLines(".tech-section h2");
    fadeUp(".tech-fade");
    fadeUp(".tech-row", 0.12);

    /* ---------- 06 Horizon: a card that opens into full-bleed footage, then pins ---------- */
    const horizonInset = () => {
      const x = Math.max(16, window.innerWidth * 0.12);
      const y = Math.max(16, window.innerHeight * 0.1);
      return `inset(${y}px ${x}px ${y}px ${x}px round 28px)`;
    };
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: ".home-horizon", start: "top bottom", end: "top top", scrub: 0.6, invalidateOnRefresh: true },
    })
      .fromTo(".horizon-frame", { clipPath: horizonInset }, { clipPath: "inset(0px 0px 0px 0px round 0px)" }, 0)
      .fromTo(".horizon-video", { scale: 1.35 }, { scale: 1 }, 0);
    gsap.set(".horizon-copy-2 .line", { yPercent: LINE_TRAVEL });
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "home-horizon-film",
        trigger: ".home-horizon",
        start: "top top",
        end: () => `+=${window.innerHeight * 2.6}`,
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .fromTo(".horizon-video-layer", { scale: 1 }, { scale: 1.1, duration: 1 }, 0)
      .to(".horizon-shade", { opacity: 0.38, duration: 0.35 }, 0)
      .from(".horizon-copy-1 .line", { yPercent: LINE_TRAVEL, stagger: 0.02, duration: 0.16, ease: "power2.out" }, 0)
      .to(".horizon-copy-1 .line", { yPercent: -LINE_TRAVEL, stagger: 0.014, duration: 0.13, ease: "power2.in" }, 0.42)
      .to(".horizon-copy-2 .line", { yPercent: 0, stagger: 0.02, duration: 0.16, ease: "power2.out" }, 0.54)
      .to(".horizon-rule-fill", { scaleX: 1, duration: 1 }, 0);

    /* ---------- 07 Roadmap: each rule draws itself, then the entry rises ---------- */
    revealLines(".roadmap-section h2");
    fadeUp(".roadmap-fade");
    q(".roadmap-row").forEach((row) => {
      gsap.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: row, start: "top 88%", once: true } })
        .from(row.querySelector(".row-rule"), { scaleX: 0, duration: 1.8 })
        .from(row.querySelectorAll(".row-fade"), { y: 40, autoAlpha: 0, stagger: 0.09, duration: 1.3 }, 0.12);
    });

    /* ---------- 08 Finale: character cascade and a magnetic call to action ---------- */
    const finalHeading = q(".final-heading")[0];
    if (finalHeading) {
      SplitText.create(finalHeading.querySelectorAll(".line"), {
        type: "words,chars",
        onSplit: (self) => gsap.from(self.chars, {
          yPercent: 120,
          rotate: 8,
          stagger: 0.022,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: finalHeading, start: "top 76%", once: true },
        }),
      });
    }
    fadeUp(".final-fade", 0.12);

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      q(".magnetic").forEach((element) => cleanups.push(magnetize(element)));
    }

    playVideosInView();
    document.fonts.ready.then(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      videos.forEach((video) => video.pause());
    };
  }, { scope: root });

  return (
    <main id="main" ref={root} className="overflow-x-clip bg-[#f7f7f3] text-[#17272b]">
      <div ref={loader} className="intro-loader" aria-hidden="true">
        <div className="loader-grid" />
        <div className="loader-ui absolute inset-x-[var(--page-gutter)] top-[var(--page-gutter)] flex justify-between gap-6 font-technical text-[10px] uppercase tracking-[.2em] text-[#5d6968]">
          <span>Vajra Greens / EV charging network</span><span className="hidden sm:inline">New Delhi · 28.61°N 77.21°E</span>
        </div>
        <div className="relative flex w-[clamp(240px,34vw,480px)] flex-col items-center">
          <img className="loader-logo h-auto w-full" src="/media/vajra-logo-transparent.png" alt="" width="1448" height="659" />
          <div className="loader-cells mt-[clamp(28px,6vh,60px)] flex w-full gap-[5px]">
            {Array.from({ length: 12 }, (_, index) => <span key={index} className="loader-cell" style={{ "--i": index / 11 } as React.CSSProperties} />)}
          </div>
        </div>
        <div className="loader-ui absolute inset-x-[var(--page-gutter)] bottom-[var(--page-gutter)] flex items-end justify-between gap-6">
          <p className="flex items-center gap-3 overflow-hidden font-technical text-[10px] uppercase tracking-[.2em] text-[#5d6968]"><span className="footer-pulse" /><span className="loader-status inline-block">Mapping demand</span></p>
          <p className="flex items-start gap-2 text-[#17272b]"><span className="loader-count text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[.8] tracking-[-.07em] tabular-nums">000</span><span className="mt-2 font-technical text-[11px] text-[#45b98d]">%</span></p>
        </div>
      </div>

      <section id="top" className="home-system relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-[#f7f7f3] text-white">
        <div className="system-frame absolute inset-0 overflow-hidden bg-[#061923]" data-surface="dark">
          <div className="system-video-layer absolute inset-0 will-change-transform">
            <video ref={systemVideo} className="system-video h-full w-full object-cover" muted loop playsInline autoPlay preload="auto" aria-label="Vajra Greens EV charging system">
              <source src="/media/system.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="system-shade absolute inset-0 bg-[#03131f]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03131f]/80 via-[#03131f]/25 to-[#03131f]/10" />
          <div className="absolute inset-x-[var(--page-gutter)] top-1/2 z-10 -translate-y-1/2">
            <div className="hero-beat hero-beat-1 max-w-[1100px]">
              <p className="mb-8 font-technical text-[10px] uppercase tracking-[.24em] text-[#54d7ba]"><Lines lines={["01 / The infrastructure of movement"]} inner /></p>
              <h1 className="text-[clamp(3.7rem,8.5vw,9rem)] font-semibold leading-[.82] tracking-[-.085em]"><Lines lines={["Powering", <span className={`${accent} text-[#80e1bb]`}>what moves</span>, "next."]} inner /></h1>
            </div>
            <div className="hero-beat hero-beat-2 beat-later absolute left-0 top-1/2 max-w-[1050px] -translate-y-1/2">
              <p className="mb-8 font-technical text-[10px] uppercase tracking-[.24em] text-[#54d7ba]"><Lines lines={["Hardware is only the beginning"]} /></p>
              <h2 className="text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.08em]"><Lines lines={["Reliability lives", <>in the <span className={`${accent} text-[#80e1bb]`}>details.</span></>]} /></h2>
            </div>
            <div className="hero-beat hero-beat-3 beat-later absolute left-0 top-1/2 max-w-[1100px] -translate-y-1/2">
              <p className="mb-8 font-technical text-[10px] uppercase tracking-[.24em] text-[#54d7ba]"><Lines lines={["Charging, connected"]} /></p>
              <h2 className="text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.08em]"><Lines lines={["One system.", <span className={`${accent} text-[#80e1bb]`}>Always ready.</span>]} /></h2>
            </div>
          </div>
          <div className="hero-chrome absolute bottom-8 left-[var(--page-gutter)] right-[var(--page-gutter)] z-10 flex items-end gap-6">
            <p className="max-w-sm text-xs leading-6 text-white/70">Charging infrastructure designed around dependable access, thoughtful locations, and the journeys people make every day.</p>
            <div className="ml-auto flex items-end gap-5">
              <span className="scroll-cue" aria-hidden="true" />
              <div className="w-32"><div className="h-px bg-white/25"><span className="hero-progress-fill block h-full origin-left scale-x-0 bg-[#54d7ba]" /></div><p className="mt-3 font-technical text-[8px] uppercase tracking-[.18em] text-white/55">Scroll to explore</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="movement-intro grid gap-16 px-[var(--page-gutter)] py-24 md:min-h-[90svh] md:grid-cols-[1.25fr_.75fr] md:items-center md:py-36">
        <div>
          <p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">Built for real journeys</p>
          <h2 className="mt-7 max-w-5xl text-[clamp(3.5rem,7.4vw,8rem)] font-semibold leading-[.88] tracking-[-.08em]"><Lines lines={["Charging should", "enable", <span className={`${accent} text-[#104975]`}>movement.</span>]} /></h2>
        </div>
        <div className="self-end pt-7 md:self-center">
          <span className="movement-rule block h-px origin-left bg-[#bcc8c1]" />
          <p className="movement-copy mt-7 text-lg leading-9 text-[#17272b] md:text-xl md:leading-10">Vajra Greens develops and operates charging infrastructure that addresses a practical barrier to EV adoption: knowing a reliable charger will be available when it is needed.</p>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#bcc8c1] pt-6">
            <div className="movement-stat"><strong className="block text-5xl font-semibold tracking-[-.06em] text-[#104975]">2</strong><span className="mt-2 block text-xs leading-5 text-[#5d6968]">Operational chargers reported in the company presentation</span></div>
            <div className="movement-stat"><strong className="block text-5xl font-semibold tracking-[-.06em] text-[#104975]">2023</strong><span className="mt-2 block text-xs leading-5 text-[#5d6968]">Incorporated and headquartered in New Delhi</span></div>
          </div>
        </div>
      </section>

      <section className="marquee relative overflow-hidden border-y border-[#d5dcd6] py-8 md:py-10" aria-label="Energy meets mobility. Charging, connected. Always ready.">
        <div className="marquee-track flex w-max will-change-transform" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeWords.map((item) => (
                <span key={item.word} className="flex items-center gap-[3.5vw] pr-[3.5vw] text-[clamp(3rem,7.5vw,8rem)] font-semibold leading-[1.05] tracking-[-.07em]">
                  <span className={item.italic ? `${accent} text-[#104975]` : ""}>{item.word}</span>
                  <Spark className="h-[.34em] w-[.34em] text-[#45b98d]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="operating-model relative overflow-hidden bg-[#e9eee9] py-24 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-10 px-[var(--page-gutter)] md:mb-14">
          <div><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">02 / The Vajra system</p><h2 className="mt-4 text-[clamp(2.8rem,5.2vw,5.8rem)] font-semibold leading-[.92] tracking-[-.07em]"><Lines lines={["Everything works", <span className={`${accent} text-[#104975]`}>together.</span>]} /></h2></div>
          <div className="operating-aside w-full max-w-xs">
            <p className="hidden text-sm leading-7 text-[#5d6968] md:block">Four disciplines. One operating system for dependable charging.</p>
            <div className="mt-6 flex items-center gap-4 font-technical text-[10px] tracking-[.16em] text-[#5d6968]"><span className="rail-count w-5 text-[#17272b]">01</span><span className="h-px flex-1 bg-[#bcc8c1]"><span className="rail-progress-fill block h-full origin-left scale-x-0 bg-[#104975]" /></span><span>0{pillars.length}</span></div>
            <div className="mt-6 flex items-center gap-3">
              <button type="button" className="rail-prev rail-button" aria-label="Previous card"><span aria-hidden="true">←</span></button>
              <button type="button" className="rail-next rail-button" aria-label="Next card"><span aria-hidden="true">→</span></button>
              <span className="ml-3 font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">Drag or swipe</span>
            </div>
          </div>
        </div>
        <div ref={track} className="rail-track flex gap-5 overflow-x-auto" data-lenis-prevent-horizontal tabIndex={0} role="region" aria-label="The Vajra system: four disciplines">
          {pillars.map((pillar, index) => (
            <article key={pillar.number} className={`rail-card relative flex h-[clamp(380px,56vh,460px)] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[4px] p-8 sm:w-[58vw] md:w-[44vw] md:max-w-[560px] md:p-10 ${index % 2 ? "bg-[#104975] text-white [--num-stroke:rgba(255,255,255,.34)]" : "bg-[#f7f7f3] text-[#17272b] [--num-stroke:rgba(23,39,43,.26)]"}`}>
              <span className="card-num pointer-events-none absolute right-6 top-5 select-none text-[clamp(5.5rem,9vw,9rem)] font-semibold leading-none tracking-[-.08em] md:right-9 md:top-7" aria-hidden="true">{pillar.number}</span>
              <div className="relative font-technical text-[9px] uppercase tracking-[.19em] opacity-65">{pillar.number} / {pillar.eyebrow}</div>
              <div className="relative"><span className="mb-7 block h-2 w-2 rounded-full bg-[#45b98d]" /><h3 className="text-[clamp(2.4rem,4.6vw,5rem)] font-semibold leading-[.9] tracking-[-.07em]">{pillar.title}</h3><p className="mt-6 max-w-sm text-sm leading-7 opacity-70">{pillar.copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section bg-[#09232d] px-[var(--page-gutter)] py-24 text-white md:py-36" data-surface="dark">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+48px)] lg:self-start">
            <p className="font-technical text-[9px] uppercase tracking-[.2em] text-white/50">03 / End-to-end delivery</p>
            <h2 className="mt-7 text-[clamp(3.3rem,6vw,6.8rem)] font-semibold leading-[.9] tracking-[-.075em]"><Lines lines={["One partner.", <span className={`${accent} text-[#80e1bb]`}>Every step.</span>]} /></h2>
            <p className="process-fade mt-9 max-w-md text-base leading-8 text-white/60">From the first location review to daily station performance, Vajra Greens brings the physical, digital, and operating layers together.</p>
            <Link href="/charging" className="process-fade arrow-link mt-10 inline-flex items-center gap-8 border-b border-white/50 pb-3 text-xs font-semibold uppercase tracking-[.1em]">Explore charging <span className="text-[#80e1bb]">↗</span></Link>
          </div>
          <div className="process-list relative border-t border-white/20">
            <span className="absolute bottom-0 left-[13px] top-0 w-px bg-white/15" aria-hidden="true"><span className="process-line-fill block h-full w-full origin-top bg-[#54d7ba]" /></span>
            {deliverySteps.map((step) => (
              <article key={step.number} className="process-step relative grid gap-5 border-b border-white/20 py-9 pl-14 md:grid-cols-[100px_1fr] md:py-12">
                <span className="process-dot absolute left-2 top-[43px] h-3 w-3 rounded-full border border-[#80e1bb] bg-[#09232d] md:top-[55px]" />
                <span className="process-num font-technical text-[9px] uppercase tracking-[.2em] text-white/45">{step.number}</span>
                <div className="process-body"><h3 className="text-[clamp(2rem,3.5vw,3.6rem)] font-semibold leading-none tracking-[-.055em]">{step.title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base md:leading-8">{step.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section px-[var(--page-gutter)] py-24 md:py-36">
        <div className="grid gap-12 border-b border-[#bcc8c1] pb-14 md:grid-cols-[1fr_.65fr] md:items-end"><div><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">04 / Who we serve</p><h2 className="mt-7 text-[clamp(3.5rem,7vw,7.6rem)] font-semibold leading-[.88] tracking-[-.08em]"><Lines lines={["Built around", <span className={`${accent} text-[#104975]`}>how you move.</span>]} /></h2></div><p className="audience-fade max-w-lg text-base leading-8 text-[#5d6968]">Different users bring different charging rhythms. The infrastructure, operating model, and commercial arrangement should reflect them.</p></div>
        <div className="grid md:grid-cols-3">
          {audiences.map((audience, index) => (
            <Link key={audience.title} href={audience.link} className={`audience-card group relative flex min-h-[380px] flex-col justify-between overflow-hidden border-b border-[#bcc8c1] py-9 md:min-h-[460px] md:px-8 md:py-10 ${index > 0 ? "md:border-l" : ""}`}>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#104975] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" aria-hidden="true" />
              <span className="relative flex items-center justify-between font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968] transition-colors duration-500 group-hover:text-white/60">0{index + 1}<span className="grid h-11 w-11 place-items-center rounded-full border border-current text-base transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-45 group-hover:text-[#80e1bb]">↗</span></span>
              <div className="relative transition-colors duration-500 group-hover:text-white"><h3 className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-[.92] tracking-[-.065em]">{audience.title}</h3><p className="mt-7 max-w-sm text-sm leading-7 text-[#5d6968] transition-colors duration-500 group-hover:text-white/70">{audience.copy}</p><span className="mt-9 inline-flex border-b border-current pb-2 text-xs font-semibold uppercase tracking-[.1em]">Learn more</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="tech-section bg-[#dcece3] px-[var(--page-gutter)] py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">05 / Technology and hardware</p><h2 className="mt-7 text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[.88] tracking-[-.08em]"><Lines lines={["The station is", <>only the <span className={`${accent} text-[#104975]`}>beginning.</span></>]} /></h2><p className="tech-fade mt-10 max-w-xl text-base leading-8 text-[#5d6968]">Vajra Greens combines established charging hardware with a connected software and operating layer. The goal is one dependable experience for the driver and one visible system for the operator.</p></div>
          <div className="self-end border-t border-[#adcbc0]">
            <div className="tech-row grid grid-cols-[110px_1fr] gap-6 border-b border-[#adcbc0] py-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-[#5d6968]">Hardware</span><div><strong className="text-2xl tracking-[-.04em]">Delta Electronics · Exicom</strong><p className="mt-3 text-sm leading-7 text-[#5d6968]">Established equipment suppliers identified in the company brief.</p></div></div>
            <div className="tech-row grid grid-cols-[110px_1fr] gap-6 border-b border-[#adcbc0] py-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-[#5d6968]">Software</span><div><strong className="text-2xl tracking-[-.04em]">StatiQ ecosystem</strong><p className="mt-3 text-sm leading-7 text-[#5d6968]">Sessions, customer access, transactions, station visibility, monitoring, and performance data.</p></div></div>
            <div className="tech-row grid grid-cols-[110px_1fr] gap-6 py-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-[#5d6968]">Operations</span><div><strong className="text-2xl tracking-[-.04em]">Managed end to end</strong><p className="mt-3 text-sm leading-7 text-[#5d6968]">Installation, daily operation, maintenance, and commercial optimisation.</p></div></div>
          </div>
        </div>
      </section>

      <section className="home-horizon relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-[#dcece3] text-white">
        <div className="horizon-frame absolute inset-0 overflow-hidden bg-[#051b26]" data-surface="dark">
          <div className="horizon-video-layer absolute inset-0 will-change-transform"><video ref={horizonVideo} className="horizon-video h-full w-full object-cover" muted loop playsInline preload="auto" aria-label="Vajra Greens charging station and connected city"><source src="/media/horizon.mp4" type="video/mp4" /></video></div>
          <div className="horizon-shade absolute inset-0 bg-[#03131f]/62" /><div className="absolute inset-0 bg-gradient-to-t from-[#03131f]/80 via-transparent to-[#03131f]/25" />
          <div className="absolute left-[var(--page-gutter)] right-[var(--page-gutter)] top-[calc(var(--header-height)+32px)] z-10 flex justify-between font-technical text-[9px] uppercase tracking-[.19em] text-white/65"><span>06 / The horizon</span><span>From access to possibility</span></div>
          <div className="absolute inset-x-[var(--page-gutter)] top-1/2 z-10 -translate-y-1/2">
            <div className="horizon-copy-1"><h2 className="max-w-5xl text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.085em]"><Lines lines={["A point of charge", <>becomes a <span className={`${accent} text-[#80e1bb]`}>network.</span></>]} /></h2></div>
            <div className="horizon-copy-2 beat-later absolute left-0 top-1/2 max-w-5xl -translate-y-1/2"><h2 className="text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.085em]"><Lines lines={["A network becomes", <span className={`${accent} text-[#80e1bb]`}>momentum.</span>]} /></h2></div>
          </div>
          <div className="absolute bottom-8 left-[var(--page-gutter)] right-[var(--page-gutter)] z-10"><div className="h-px bg-white/25"><span className="horizon-rule-fill block h-full origin-left scale-x-0 bg-[#54d7ba]" /></div><div className="mt-4 flex justify-between font-technical text-[8px] uppercase tracking-[.18em] text-white/55"><span>Charging / Software / Operations</span><span>Clean mobility in motion</span></div></div>
        </div>
      </section>

      <section className="roadmap-section bg-[#e9eee9] px-[var(--page-gutter)] py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+48px)] lg:self-start"><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">07 / The road ahead</p><h2 className="mt-7 text-[clamp(3.5rem,6.5vw,7rem)] font-semibold leading-[.89] tracking-[-.075em]"><Lines lines={["Grow the", <span className={`${accent} text-[#104975]`}>network.</span>]} /></h2><p className="roadmap-fade mt-9 max-w-sm text-sm leading-7 text-[#5d6968]">Future figures are company goals from the supplied presentation and remain subject to execution, funding, policy, and market conditions.</p></div>
          <div className="border-t border-[#bcc8c1]">
            {roadmap.map((item, index) => (
              <article key={item.year} className="roadmap-row relative grid gap-5 py-9 md:grid-cols-[110px_1fr] md:py-11">
                <span className="row-rule absolute bottom-0 left-0 right-0 h-px origin-left bg-[#bcc8c1]" aria-hidden="true" />
                <span className={`row-fade font-technical text-[10px] uppercase tracking-[.18em] ${index < 2 ? "text-[#104975]" : "text-[#45a67f]"}`}>{item.year}</span>
                <div className="row-fade"><h3 className="text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[.95] tracking-[-.06em]">{item.title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-[#5d6968] md:text-base md:leading-8">{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-final px-[var(--page-gutter)] py-28 md:py-44">
        <div className="border-t border-[#bcc8c1] pt-7">
          <div className="final-fade flex justify-between font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]"><span>08 / Build the next connection</span><span>New Delhi · India</span></div>
          <h2 className="final-heading mt-20 max-w-6xl text-[clamp(4rem,9.5vw,10rem)] font-semibold leading-[.82] tracking-[-.09em]"><Lines lines={["The future", <>needs <span className={`${accent} text-[#104975]`}>somewhere</span></>, <span className="text-[#45b98d]">to charge.</span>]} /></h2>
          <div className="mt-20 flex flex-col items-start justify-between gap-10 border-t border-[#bcc8c1] pt-7 md:flex-row md:items-end">
            <p className="final-fade max-w-md text-base leading-8 text-[#5d6968]">Have a location, a fleet, or an idea that can move clean mobility forward?</p>
            <div className="final-fade">
              <Link href="/contact" className="magnetic cta-pill group relative inline-flex items-center gap-8 overflow-hidden rounded-full bg-[#17272b] py-5 pl-9 pr-5 text-lg font-semibold">
                <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-[#104975] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" aria-hidden="true" />
                <span className="magnetic-inner relative flex items-center gap-8 text-white">Build with Vajra <span className="grid h-11 w-11 place-items-center rounded-full bg-[#80e1bb] text-xl text-[#17272b] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-45">↗</span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
