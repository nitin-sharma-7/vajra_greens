"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { magnetize } from "@/lib/magnetic";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/charging", label: "Charging" },
  { href: "/network", label: "Network" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/vision", label: "Vision" },
];

const workWithUs = [
  { href: "/partnerships", label: "Fleet operators" },
  { href: "/network", label: "Location partners" },
  { href: "/charging", label: "EV drivers" },
  { href: "/contact", label: "Start a project" },
];

const delhiTime = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });

/** Link whose label rolls up and is replaced by a copy from below on hover. */
function RollLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("mailto:");
  const content = <span className="roll" data-text={children}><span>{children}</span></span>;
  return external
    ? <a className="footer-link" href={href}>{content}</a>
    : <Link className="footer-link" href={href}>{content}</Link>;
}

export function SiteFooter() {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);

  // Rendered client-side only so the server and browser never disagree about the minute.
  useEffect(() => {
    const tick = () => setTime(delhiTime.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 15_000);
    return () => window.clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const footer = root.current;
    if (!footer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = gsap.utils.selector(footer);

    // The content drifts up slower than the page, so the footer feels revealed rather than scrolled to.
    gsap.fromTo(q(".footer-inner"), { yPercent: -18 }, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true, refreshPriority: -1 },
    });

    gsap.from(q(".footer-statement .line"), {
      yPercent: 165,
      rotate: 2.5,
      stagger: 0.1,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: q(".footer-statement")[0], start: "top 88%", once: true, refreshPriority: -1 },
    });

    gsap.set(q(".footer-rise"), { autoAlpha: 0, y: 44 });
    ScrollTrigger.batch(q(".footer-rise"), {
      start: "top 94%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.3, ease: "expo.out", overwrite: true }),
    });

    gsap.from(q(".footer-rule"), {
      scaleX: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.15,
      scrollTrigger: { trigger: q(".footer-grid")[0], start: "top 95%", once: true, refreshPriority: -1 },
    });

    // The logo plate opens out from a narrow band, the logo settling inside it.
    const plate = q(".footer-logo-plate")[0];
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom bottom", scrub: 0.8, refreshPriority: -1 },
    })
      .fromTo(plate, { clipPath: "inset(18% 12% 18% 12% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)" }, 0)
      .fromTo(q(".footer-logo"), { scale: 0.86, autoAlpha: 0.2 }, { scale: 1, autoAlpha: 1 }, 0);

    const cleanups: Array<() => void> = [];
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      q(".magnetic").forEach((element) => cleanups.push(magnetize(element)));
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, { scope: root, dependencies: [pathname], revertOnUpdate: true });

  return (
    <footer ref={root} className="site-footer relative overflow-hidden bg-[#061923] text-white" data-surface="dark">
      <div className="footer-glow pointer-events-none absolute inset-x-0 top-0 h-[70%]" aria-hidden="true" />
      <div className="footer-inner relative px-[var(--page-gutter)] pt-[clamp(72px,11vw,160px)]">
        <div className="footer-rise flex flex-wrap items-center justify-between gap-4 font-technical text-[10px] uppercase tracking-[.18em] text-white/55">
          <span className="flex items-center gap-3"><span className="footer-pulse" aria-hidden="true" />Open to partnerships</span>
          <span>New Delhi · <span className="text-white tabular-nums">{time ?? "--:--"}</span> IST</span>
        </div>

        <div className="mt-[clamp(40px,6vw,88px)] grid gap-12 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
          <h2 className="footer-statement text-[clamp(3.2rem,7.6vw,8.4rem)] font-semibold leading-[.86] tracking-[-.08em]">
            <span className="line-mask"><span className="line">Let&apos;s build</span></span>
            <span className="line-mask"><span className="line"><span className="font-display font-normal italic text-[#80e1bb]">what moves next.</span></span></span>
          </h2>
          <div className="footer-rise lg:justify-self-end">
            <p className="max-w-sm text-base leading-8 text-white/60">Have a location, a fleet, or an idea that can move clean mobility forward? We&apos;d like to hear it.</p>
            <Link href="/contact" className="magnetic group relative mt-8 inline-flex items-center overflow-hidden rounded-full bg-[#80e1bb] py-4 pl-8 pr-4 text-base font-semibold">
              <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-white transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" aria-hidden="true" />
              <span className="magnetic-inner relative flex items-center gap-7 text-[#061923]">Start a conversation <span className="grid h-10 w-10 place-items-center rounded-full bg-[#061923] text-lg text-[#80e1bb] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-45">↗</span></span>
            </Link>
          </div>
        </div>

        <span className="footer-rule mt-[clamp(56px,8vw,112px)] block h-px origin-left bg-white/15" aria-hidden="true" />

        <div className="footer-grid grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="footer-rise col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block rounded-2xl bg-[#f7f7f3] px-5 py-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1" aria-label="Vajra Greens home">
              <img src="/media/vajra-logo-transparent.png" alt="Vajra Greens Power and Energy LLP — Energy Meets Mobility" width="1448" height="659" className="h-auto w-[210px]" />
            </Link>
            <p className="mt-6 max-w-[17rem] text-sm leading-7 text-white/55">Building access to energy for a world in motion. EV charging infrastructure, operated end to end.</p>
          </div>
          <nav className="footer-rise" aria-label="Footer navigation">
            <p className="font-technical text-[9px] uppercase tracking-[.2em] text-white/40">Explore</p>
            <ul className="mt-6 grid gap-3 text-[15px]">{explore.map((link) => <li key={link.href}><RollLink href={link.href}>{link.label}</RollLink></li>)}</ul>
          </nav>
          <div className="footer-rise">
            <p className="font-technical text-[9px] uppercase tracking-[.2em] text-white/40">Work with us</p>
            <ul className="mt-6 grid gap-3 text-[15px]">{workWithUs.map((link) => <li key={link.label}><RollLink href={link.href}>{link.label}</RollLink></li>)}</ul>
          </div>
          <div className="footer-rise col-span-2 lg:col-span-1">
            <p className="font-technical text-[9px] uppercase tracking-[.2em] text-white/40">Connect</p>
            <div className="mt-6 grid gap-3 text-[15px]">
              <RollLink href="mailto:vajraagp@gmail.com">vajraagp@gmail.com</RollLink>
              <span className="text-white/55">New Delhi, India</span>
            </div>
            <p className="mt-8 font-technical text-[9px] uppercase leading-5 tracking-[.18em] text-white/35">Vajra Greens Power &amp; Energy LLP<br />Incorporated 21 August 2023</p>
          </div>
        </div>

        <div className="footer-logo-plate grid place-items-center rounded-[28px] bg-[#f7f7f3] px-6 py-[clamp(28px,5vw,72px)]">
          <img className="footer-logo h-auto w-[clamp(240px,42vw,640px)]" src="/media/vajra-logo-transparent.png" alt="Vajra Greens Power and Energy LLP — Energy Meets Mobility" width="1448" height="659" />
        </div>

        <div className="mt-[clamp(28px,4vw,48px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/15 py-6 font-technical text-[9px] uppercase tracking-[.16em] text-white/45">
          <span>© {new Date().getFullYear()} Vajra Greens Power &amp; Energy LLP</span>
          <span className="hidden md:inline">Energy meets mobility</span>
          <a href="#top" className="group inline-flex items-center gap-3 text-white">Back to top <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
