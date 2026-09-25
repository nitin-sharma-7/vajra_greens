"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FrameSequence, type FrameSequenceHandle } from "@/components/media/FrameSequence";
import sequences from "@/lib/sequence-manifest.json";

const milestones = [
  { year: "2026", number: "FOUNDATION", note: "Strengthen the charging network and fleet relationships." },
  { year: "2028", number: "50+", note: "Target charging stations and a growing B2B network." },
  { year: "2030", number: "200+", note: "Target stations with a planned digital platform." },
  { year: "2032", number: "500+", note: "Target stations and wider regional reach." },
];

export function FutureRoadmap() {
  const root = useRef<HTMLDivElement>(null);
  const sequence = useRef<FrameSequenceHandle>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const playhead = { progress: 0 };
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        id: "future-film", trigger: ".future-film", start: "top top", end: () => `+=${window.innerHeight * 2.8}`,
        scrub: .3, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          onRefresh: (self) => { const el = self.trigger as HTMLElement; el.dataset.scrollStart = String(self.start); el.dataset.scrollEnd = String(self.end); },
      } })
        .to(".horizon-shutter", { scaleY: 0, duration: .26, ease: "power2.inOut" }, 0)
        .fromTo(".future-word", { y: 35, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .045, duration: .16 }, .16)
        .to(playhead, { progress: 1, duration: 1, onUpdate: () => sequence.current?.seek(playhead.progress) }, 0);
    });
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".roadmap-track-fill", { scaleX: 1, ease: "none", scrollTrigger: { id: "roadmap-route", trigger: ".roadmap", start: "top 65%", end: "bottom 60%", scrub: 0.5 } });
      gsap.from(".milestone", { opacity: 0, y: 60, stagger: 0.16, ease: "power3.out", scrollTrigger: { trigger: ".roadmap", start: "top 58%", once: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <section className="future-film" aria-labelledby="future-title">
        <div className="future-media"><FrameSequence ref={sequence} sequence={sequences.horizon} name="horizon" label="Scroll-controlled journey from a Vajra Greens station to an aerial view of its city" /><span className="future-shade" /></div>
        <div className="horizon-shutters" aria-hidden="true"><span className="horizon-shutter horizon-shutter-top" /><span className="horizon-shutter horizon-shutter-bottom" /></div>
        <div className="future-top"><span>03 / THE HORIZON</span><span>FROM A POINT OF CHARGE TO A CITY IN MOTION</span></div>
        <h2 id="future-title"><span className="future-word">From charging.</span><span className="future-word"><em>To possibility.</em></span></h2>
        <div className="future-bottom"><p>Our first focus is EV charging. Our wider ambition reaches into renewable energy, clean mobility, and the infrastructure that connects them.</p><span>ENERGY MEETS MOBILITY</span></div>
      </section>
      <section className="roadmap section-pad" aria-labelledby="roadmap-title">
        <div className="section-index"><span className="signal-dot" /> THE ROAD AHEAD <span>PROPOSED TARGETS</span></div>
        <div className="roadmap-heading"><h2 id="roadmap-title">A network is built<br /><em>one connection at a time.</em></h2><p>Our company presentation sets out a phased ambition for a broader charging network. These are targets, not current operating counts.</p></div>
        <div className="roadmap-track"><span className="roadmap-track-fill" /></div>
        <div className="milestones">{milestones.map((milestone) => <div className="milestone" key={milestone.year}><span className="milestone-year">{milestone.year}</span><strong>{milestone.number}</strong><p>{milestone.note}</p></div>)}</div>
        <p className="roadmap-disclaimer">Source: Vajra Greens company presentation. Targets are aspirational and subject to execution.</p>
      </section>
      <section className="closing" aria-labelledby="closing-title">
        <div className="closing-upper"><span className="eyebrow">The next chapter is being built</span><span>NEW DELHI · INDIA</span></div>
        <h2 id="closing-title">The future<br />needs <em>somewhere</em><br />to charge.</h2>
        <div className="closing-bottom"><p>Have a location, a fleet, or an idea that could move clean mobility forward?</p><Link href="/contact" className="closing-cta">Build with Vajra <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
