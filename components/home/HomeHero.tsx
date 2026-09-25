"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FrameSequence, type FrameSequenceHandle } from "@/components/media/FrameSequence";
import sequences from "@/lib/sequence-manifest.json";

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const sequence = useRef<FrameSequenceHandle>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const playhead = { progress: 0 };
      const desktop = matchMedia("(min-width: 1024px)").matches;
      // Entrance and scroll own different elements, so their transforms never compete.
      gsap.from(".hero-title span", { y: 32, autoAlpha: 0, stagger: .08, duration: .8, ease: "power3.out" });
      const scroll = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "hero-film-expansion",
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (desktop ? 3.2 : 2.5)}`,
          scrub: .3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => { const el = self.trigger as HTMLElement; el.dataset.scrollStart = String(self.start); el.dataset.scrollEnd = String(self.end); },
        },
      });
      scroll.to(".hero-title-wrap", { y: -65, autoAlpha: 0, duration: .16 }, 0)
        .to(".hero-kicker, .hero-rule, .hero-bottom", { autoAlpha: 0, duration: .1 }, 0)
        .to(".hero-shutter-top", { yPercent: -101, duration: .3, ease: "power2.inOut" }, .02)
        .to(".hero-shutter-bottom", { yPercent: 101, duration: .3, ease: "power2.inOut" }, .02)
        .to(".hero-shutter-side", { scaleX: 0, duration: .3, ease: "power2.inOut" }, .02)
        .to(".hero-film-shade", { opacity: 1, duration: .22 }, .12)
        .fromTo(".hero-film-caption", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .16 }, .25)
        .to(playhead, { progress: 1, duration: .86, onUpdate: () => sequence.current?.seek(playhead.progress) }, .14);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-title">
      <div className="hero-rule" aria-hidden="true"><i /></div>
      <div className="hero-topline hero-kicker"><span>VAJRA GREENS / NEW DELHI</span><span>THE INFRASTRUCTURE OF MOVEMENT</span></div>
      <div className="hero-title-wrap">
        <h1 className="hero-title" id="hero-title"><span>Energy</span><span><em>meets</em> mobility.</span></h1>
        <div className="hero-meta"><p>Building reliable charging infrastructure<br />for the places people need to move.</p><Link href="/charging" className="text-link">Discover our approach <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-film">
        <FrameSequence ref={sequence} sequence={sequences.charge} name="charge" eager label="Scroll-controlled sequence of a vehicle connecting to a Vajra Greens charging station" />
        <span className="hero-film-shade" aria-hidden="true" />
        <div className="hero-film-caption"><span>01 / THE CHARGE</span><span>A connection<br /><em>changes everything.</em></span></div>
      </div>
      <div className="hero-shutters" aria-hidden="true"><span className="hero-shutter-top" /><span className="hero-shutter-bottom" /><span className="hero-shutter-side hero-shutter-left" /><span className="hero-shutter-side hero-shutter-right" /></div>
      <div className="hero-bottom"><span>SCROLL TO FOLLOW THE ENERGY</span><span className="hero-bottom-line" aria-hidden="true" /><span>01 — 05</span></div>
    </section>
  );
}
