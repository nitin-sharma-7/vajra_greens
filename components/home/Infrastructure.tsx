"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FrameSequence, type FrameSequenceHandle } from "@/components/media/FrameSequence";
import sequences from "@/lib/sequence-manifest.json";

const capabilities = [
  { number: "01", title: "Charging infrastructure", description: "Site-specific fast-charging solutions for public, fleet, and commercial use.", href: "/charging" },
  { number: "02", title: "Network operations", description: "Software, monitoring, maintenance, and the operational detail that keeps chargers useful.", href: "/network" },
  { number: "03", title: "Commercial partnerships", description: "Charging solutions shaped around fleet demand, valuable locations, and long-term use.", href: "/partnerships" },
];

export function Infrastructure() {
  const root = useRef<HTMLDivElement>(null);
  const sequence = useRef<FrameSequenceHandle>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const playhead = { progress: 0 };
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        id: "infrastructure-film", trigger: ".chapter-system", start: "top top",
        end: () => `+=${window.innerHeight * 2.7}`, pin: true, scrub: .3, anticipatePin: 1, invalidateOnRefresh: true,
          onRefresh: (self) => { const el = self.trigger as HTMLElement; el.dataset.scrollStart = String(self.start); el.dataset.scrollEnd = String(self.end); },
      } })
        .to(".system-shutter-left", { xPercent: -101, duration: .23, ease: "power2.inOut" }, 0)
        .to(".system-shutter-right", { xPercent: 101, duration: .23, ease: "power2.inOut" }, 0)
        .fromTo(".system-overlay-text", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .17 }, .12)
        .to(".system-grid .grid-line", { scaleX: 1, stagger: .04, duration: .18 }, .14)
        .to(playhead, { progress: 1, duration: 1, onUpdate: () => sequence.current?.seek(playhead.progress) }, 0);
    });
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(".capability-row", { x: 90, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".capabilities", start: "top 65%", once: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <section className="chapter-system" aria-labelledby="system-title">
        <div className="system-media"><FrameSequence ref={sequence} sequence={sequences.system} name="system" label="Scroll-controlled close views of a charging connector and station" /><div className="system-media-shade" /></div>
        <div className="system-shutters" aria-hidden="true"><span className="system-shutter-left" /><span className="system-shutter-right" /></div>
        <div className="system-grid" aria-hidden="true"><span className="grid-line" /><span className="grid-line" /><span className="grid-line" /></div>
        <div className="system-top"><span>02 / THE SYSTEM</span><span>BUILT FOR USE · BUILT TO LAST</span></div>
        <div className="system-overlay-text"><span className="eyebrow">Behind the connection</span><h2 id="system-title">Precision<br /><em>in every</em><br />detail.</h2><p>Hardware is only the visible part. Reliability lives in site selection, software integration, monitoring, and care.</p></div>
        <div className="system-bottom"><span>CHARGER STATUS <i /> ACTIVE</span><span>OPERATIONS / MONITORING / MAINTENANCE</span></div>
      </section>
      <section className="capabilities section-pad" aria-labelledby="capabilities-title">
        <div className="section-index"><span className="signal-dot" /> WHAT WE BUILD <span>03 / 04</span></div>
        <div className="capabilities-intro"><p className="eyebrow">An infrastructure company, in motion</p><h2 id="capabilities-title">One ambition.<br /><em>Three connected disciplines.</em></h2></div>
        <div className="capability-list">
          {capabilities.map((capability) => <Link href={capability.href} className="capability-row" key={capability.number}><span className="capability-number">{capability.number}</span><span className="capability-main"><strong>{capability.title}</strong><small>{capability.description}</small></span><span className="capability-arrow" aria-hidden="true">↗</span></Link>)}
        </div>
      </section>
    </div>
  );
}
