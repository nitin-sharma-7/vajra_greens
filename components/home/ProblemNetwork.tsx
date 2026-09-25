"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const steps = ["LOCATION", "CHARGER", "SOFTWARE", "OPERATIONS", "CUSTOMER", "NETWORK"];

export function ProblemNetwork() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { id: "problem-statement", trigger: ".problem", start: "top 72%", end: "bottom 45%", scrub: 0.5 } })
        .from(".problem-headline span", { yPercent: 110, stagger: 0.15, ease: "power2.out" })
        .from(".problem-answer", { opacity: 0, x: 80, ease: "none" }, 0.4);

      const nodes = gsap.utils.toArray<HTMLElement>(".network-node");
      gsap.timeline({ scrollTrigger: { id: "network-activation", trigger: ".network", start: "top 65%", end: "bottom 52%", scrub: 0.7 } })
        .to(".network-line-fill", { scaleX: 1, ease: "none" }, 0)
        .from(nodes, { opacity: 0.25, y: 24, stagger: 0.11, ease: "power2.out" }, 0.08)
        .to(".network-pulse", { scale: 1.5, opacity: 0.45, ease: "none" }, 0.5);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <section className="problem section-pad" aria-labelledby="problem-title">
        <div className="section-index"><span className="signal-dot" /> THE NEED <span>01 / 04</span></div>
        <div className="problem-grid">
          <div><p className="eyebrow">The question behind every journey</p><h2 className="problem-headline" id="problem-title"><span>Charging</span><span>should never</span><span>set the <em>limit.</em></span></h2></div>
          <div className="problem-side"><span className="crosshair" aria-hidden="true">＋</span><p>When access to charging is uncertain, movement becomes a calculation. Vajra Greens is building dependable fast-charging infrastructure around where demand, access, and everyday journeys meet.</p><div className="problem-answer">It should enable movement <span aria-hidden="true">↗</span></div></div>
        </div>
        <div className="problem-gridline" aria-hidden="true" />
      </section>
      <section className="network section-pad" aria-labelledby="network-title">
        <div className="section-index"><span className="signal-dot" /> THE SYSTEM <span>02 / 04</span></div>
        <div className="network-heading"><div><p className="eyebrow">More than a charger</p><h2 id="network-title">Every connection<br /><em>has a system behind it.</em></h2></div><p>From selecting a site to keeping it operational, the work is one connected chain.</p></div>
        <div className="network-diagram" role="img" aria-label="Vajra Greens operating flow: location, charger, software, operations, customer, network">
          <div className="network-line" aria-hidden="true"><span className="network-line-fill" /></div>
          {steps.map((step, index) => <div className="network-node" key={step}><span className="network-node-mark"><span className="network-pulse" /></span><small>0{index + 1}</small><strong>{step}</strong></div>)}
        </div>
        <div className="network-foot"><p>IDENTIFY <span>→</span> INSTALL <span>→</span> OPERATE <span>→</span> OPTIMISE</p><Link className="text-link" href="/network">Explore the network <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
