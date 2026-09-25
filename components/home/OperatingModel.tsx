"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const places = [
  { name: "HIGHWAYS", x: "16%", y: "32%", size: "large" },
  { name: "FLEET HUBS", x: "39%", y: "18%", size: "small" },
  { name: "BUSINESS PARKS", x: "66%", y: "26%", size: "medium" },
  { name: "HOTELS", x: "83%", y: "48%", size: "small" },
  { name: "MALLS", x: "56%", y: "59%", size: "large" },
  { name: "CORPORATE CAMPUSES", x: "23%", y: "70%", size: "medium" },
  { name: "TRANSPORT HUBS", x: "77%", y: "79%", size: "medium" },
];

const revenue = [
  ["Infrastructure sales", "Supply and installation of charging equipment."],
  ["Operations & maintenance", "Long-term operation, monitoring, and care."],
  ["Government opportunities", "Participation in public infrastructure programmes."],
  ["Fleet partnerships", "Dedicated charging shaped around high-use mobility."],
];

export function OperatingModel() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const dots = gsap.utils.toArray<HTMLElement>(".place-marker");
      gsap.timeline({ scrollTrigger: { id: "location-field", trigger: ".location-field", start: "top 75%", end: "bottom 42%", scrub: 0.8 } })
        .from(dots, { scale: 0.15, opacity: 0, stagger: { amount: 0.75, from: "center" }, ease: "power2.out" })
        .from(".location-route", { strokeDashoffset: 800, ease: "none" }, 0.1)
        .from(".place-name", { opacity: 0, y: 15, stagger: 0.09, ease: "none" }, 0.15);
      gsap.from(".business-row", { y: 32, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: ".business-model", start: "top 60%", once: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <section className="locations section-pad" aria-labelledby="locations-title">
        <div className="section-index"><span className="signal-dot" /> WHERE ENERGY LIVES <span>04 / 04</span></div>
        <div className="locations-heading"><h2 id="locations-title">The right place<br /><em>changes the journey.</em></h2><p>Demand, access, parking, traffic, grid feasibility, and commercial potential shape every location decision.</p></div>
        <div className="location-field">
          <div className="location-field-grid" aria-hidden="true" />
          <svg className="location-routes" viewBox="0 0 1000 550" preserveAspectRatio="none" aria-hidden="true"><path className="location-route" d="M160 176 C280 85 314 100 390 99 S580 115 660 143 S777 164 830 264 S690 337 560 325 S420 373 230 385 S640 412 770 434" /></svg>
          {places.map((place) => <div className={`place place-${place.size}`} style={{ left: place.x, top: place.y }} key={place.name}><span className="place-marker"><i /></span><span className="place-name">{place.name}</span></div>)}
          <div className="location-field-caption"><span>STRATEGIC SITING / 001</span><span>DESIGNED AROUND REAL MOVEMENT</span></div>
        </div>
        <div className="locations-foot"><span>PUBLIC · FLEET · COMMERCIAL</span><Link className="text-link" href="/network">How we choose locations <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="business-model section-pad" aria-labelledby="business-title">
        <div className="business-heading"><span className="eyebrow">The commercial engine</span><h2 id="business-title">Built to work<br /><em>in the real world.</em></h2><p>Charging is infrastructure. Its value depends on sound installation, dependable operations, and partnerships that make sustained use possible.</p></div>
        <div className="business-list">{revenue.map(([title, description], index) => <div className="business-row" key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{description}</p><i aria-hidden="true">↗</i></div>)}</div>
      </section>
    </div>
  );
}
