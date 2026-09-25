"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

export default function HomePage() {
  const root = useRef<HTMLElement>(null);
  const systemVideo = useRef<HTMLVideoElement>(null);
  const horizonVideo = useRef<HTMLVideoElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videos = [systemVideo.current, horizonVideo.current].filter(Boolean) as HTMLVideoElement[];
    const mediaTriggers = videos.map((video) => ScrollTrigger.create({
      trigger: video.closest("section"),
      start: "top bottom",
      end: "bottom top",
      onEnter: () => void video.play().catch(() => undefined),
      onEnterBack: () => void video.play().catch(() => undefined),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause(),
    }));
    if (reduceMotion) return () => mediaTriggers.forEach((trigger) => trigger.kill());

    gsap.set(".hero-beat:not(.hero-beat-1)", { autoAlpha: 0, y: 56 });
    gsap.set(".horizon-copy-2", { autoAlpha: 0, y: 50 });

    const hero = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "home-system-film",
        trigger: ".home-system",
        start: "top top",
        end: () => `+=${window.innerHeight * 3.2}`,
        scrub: 0.55,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    hero.to(".system-video-layer", { scale: 1.09, duration: 1 }, 0)
      .to(".system-shade", { opacity: 0.25, duration: 0.3 }, 0)
      .to(".hero-beat-1", { y: -70, autoAlpha: 0, duration: 0.16 }, 0.18)
      .to(".hero-beat-2", { y: 0, autoAlpha: 1, duration: 0.17 }, 0.28)
      .to(".hero-beat-2", { y: -70, autoAlpha: 0, duration: 0.16 }, 0.55)
      .to(".hero-beat-3", { y: 0, autoAlpha: 1, duration: 0.17 }, 0.65)
      .to(".hero-progress-fill", { scaleX: 1, duration: 1 }, 0);

    const movement = gsap.timeline({
      defaults: { ease: "none", immediateRender: false },
      scrollTrigger: {
        id: "home-movement-intro",
        trigger: ".movement-intro",
        start: "top 84%",
        end: "top 16%",
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    });
    movement
      .from(".movement-line", { yPercent: 105, stagger: 0.1, duration: 0.72 }, 0)
      .from(".movement-rule", { scaleX: 0.12, duration: 0.65 }, 0.08)
      .from(".movement-copy", { y: 48, opacity: 0.3, duration: 0.62 }, 0.12)
      .from(".movement-stat", { y: 34, opacity: 0.3, stagger: 0.1, duration: 0.5 }, 0.28);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const rail = track.current;
      if (!rail) return;
      gsap.to(rail, {
        x: () => -(rail.scrollWidth - window.innerWidth + 64),
        ease: "none",
        scrollTrigger: {
          id: "home-operating-rail",
          trigger: ".operating-model",
          start: "top top",
          end: () => `+=${Math.max(window.innerWidth * 2.2, rail.scrollWidth)}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    gsap.fromTo(".process-line-fill", { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 68%",
        end: "bottom 42%",
        scrub: 0.45,
      },
    });

    const horizon = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "home-horizon-film",
        trigger: ".home-horizon",
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        scrub: 0.55,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    horizon.to(".horizon-video-layer", { scale: 1.1, duration: 1 }, 0)
      .to(".horizon-shade", { opacity: 0.38, duration: 0.35 }, 0)
      .to(".horizon-copy-1", { y: -55, autoAlpha: 0, duration: 0.2 }, 0.32)
      .to(".horizon-copy-2", { y: 0, autoAlpha: 1, duration: 0.22 }, 0.48)
      .to(".horizon-rule-fill", { scaleX: 1, duration: 1 }, 0);

    gsap.from(".final-word", {
      y: 70,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ".home-final", start: "top 68%", once: true },
    });

    document.fonts.ready.then(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    return () => {
      mediaTriggers.forEach((trigger) => trigger.kill());
      mm.revert();
      videos.forEach((video) => video.pause());
    };
  }, { scope: root });

  return (
    <main id="main" ref={root} className="overflow-x-clip bg-[#f7f7f3] text-[#17272b]">
      <section id="top" className="home-system relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-[#061923] text-white">
        <div className="system-video-layer absolute inset-0 will-change-transform">
          <video ref={systemVideo} className="h-full w-full object-cover" muted loop playsInline autoPlay preload="auto" aria-label="Vajra Greens EV charging system">
            <source src="/media/system.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="system-shade absolute inset-0 bg-[#03131f]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03131f]/80 via-[#03131f]/25 to-[#03131f]/10" />
        <div className="absolute left-[var(--page-gutter)] right-[var(--page-gutter)] top-[calc(var(--header-height)+34px)] z-10 flex items-center justify-between pt-4 font-technical text-[9px] uppercase tracking-[.18em] text-white/70">
          <span>Vajra Greens / New Delhi</span><span>Energy meets mobility</span>
        </div>
        <div className="absolute inset-x-[var(--page-gutter)] top-1/2 z-10 -translate-y-1/2">
          <div className="hero-beat hero-beat-1 max-w-[1100px]"><p className="mb-5 font-technical text-[10px] uppercase tracking-[.24em] text-[#54d7ba]">01 / The infrastructure of movement</p><h1 className="text-[clamp(3.7rem,8.5vw,9rem)] font-semibold leading-[.82] tracking-[-.085em]"><span className="block">Powering</span><span className="block font-display font-normal italic text-[#80e1bb]">what moves</span><span className="block">next.</span></h1></div>
          <div className="hero-beat hero-beat-2 absolute left-0 top-1/2 max-w-[1050px] -translate-y-1/2"><p className="mb-5 font-technical text-[10px] uppercase tracking-[.24em] text-[#54d7ba]">Hardware is only the beginning</p><h2 className="text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.08em]">Reliability lives<br />in the <span className="font-display font-normal italic text-[#80e1bb]">details.</span></h2></div>
          <div className="hero-beat hero-beat-3 absolute left-0 top-1/2 max-w-[1100px] -translate-y-1/2"><p className="mb-5 font-technical text-[10px] uppercase tracking-[.24em] text-[#54d7ba]">Charging, connected</p><h2 className="text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.08em]">One system.<br /><span className="font-display font-normal italic text-[#80e1bb]">Always ready.</span></h2></div>
        </div>
        <div className="absolute bottom-8 left-[var(--page-gutter)] right-[var(--page-gutter)] z-10 flex items-end gap-6"><p className="max-w-sm text-xs leading-6 text-white/70">Charging infrastructure designed around dependable access, thoughtful locations, and the journeys people make every day.</p><div className="ml-auto w-32"><div className="h-px bg-white/25"><span className="hero-progress-fill block h-full origin-left scale-x-0 bg-[#54d7ba]" /></div><p className="mt-3 font-technical text-[8px] uppercase tracking-[.18em] text-white/55">Scroll to explore</p></div></div>
      </section>

      <section className="movement-intro grid gap-16 px-[var(--page-gutter)] py-24 md:min-h-[90svh] md:grid-cols-[1.25fr_.75fr] md:items-center md:py-36">
        <div>
          <p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">Built for real journeys</p>
          <h2 className="mt-7 max-w-5xl text-[clamp(3.5rem,7.4vw,8rem)] font-semibold leading-[.88] tracking-[-.08em]"><span className="block overflow-hidden pb-[.08em]"><span className="movement-line block will-change-transform">Charging should</span></span><span className="block overflow-hidden pb-[.08em]"><span className="movement-line block will-change-transform">enable</span></span><span className="block overflow-hidden pb-[.16em]"><span className="movement-line block font-display font-normal italic text-[#104975] will-change-transform">movement.</span></span></h2>
        </div>
        <div className="self-end pt-7 md:self-center">
          <span className="movement-rule block h-px origin-left bg-[#bcc8c1] will-change-transform" />
          <p className="movement-copy mt-7 text-lg leading-9 text-[#5d6968] will-change-transform">Vajra Greens develops and operates charging infrastructure that addresses a practical barrier to EV adoption: knowing a reliable charger will be available when it is needed.</p>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#bcc8c1] pt-6">
            <div className="movement-stat will-change-transform"><strong className="block text-4xl font-semibold tracking-[-.06em] text-[#104975]">2</strong><span className="mt-2 block text-xs leading-5 text-[#5d6968]">Operational chargers reported in the company presentation</span></div>
            <div className="movement-stat will-change-transform"><strong className="block text-4xl font-semibold tracking-[-.06em] text-[#104975]">2023</strong><span className="mt-2 block text-xs leading-5 text-[#5d6968]">Incorporated and headquartered in New Delhi</span></div>
          </div>
        </div>
      </section>

      <section className="operating-model relative overflow-hidden bg-[#e9eee9] px-[var(--page-gutter)] py-[calc(var(--header-height)+38px)] md:h-[100svh] md:min-h-[680px]">
        <div className="mb-12 flex items-end justify-between"><div><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">02 / The Vajra system</p><h2 className="mt-4 text-[clamp(2.8rem,5.2vw,5.8rem)] font-semibold leading-[.92] tracking-[-.07em]">Everything works<br /><span className="font-display font-normal italic text-[#104975]">together.</span></h2></div><p className="hidden max-w-xs text-sm leading-7 text-[#5d6968] md:block">Four disciplines. One operating system for dependable charging.</p></div>
        <div ref={track} className="flex w-full flex-col gap-5 md:w-max md:flex-row md:will-change-transform">
          {pillars.map((pillar, index) => <article key={pillar.number} className={`flex min-h-[360px] w-full shrink-0 flex-col justify-between rounded-[3px] p-8 md:h-[430px] md:w-[44vw] md:max-w-[560px] md:p-10 ${index % 2 ? "bg-[#104975] text-white" : "bg-[#f7f7f3] text-[#17272b]"}`}><div className="flex justify-between font-technical text-[9px] uppercase tracking-[.19em] opacity-65"><span>{pillar.number}</span><span>{pillar.eyebrow}</span></div><div><span className="mb-7 block h-2 w-2 rounded-full bg-[#45b98d]" /><h3 className="text-[clamp(2.6rem,4.6vw,5rem)] font-semibold leading-[.9] tracking-[-.07em]">{pillar.title}</h3><p className="mt-6 max-w-sm text-sm leading-7 opacity-70">{pillar.copy}</p></div></article>)}
        </div>
      </section>

      <section className="process-section bg-[#09232d] px-[var(--page-gutter)] py-24 text-white md:py-36">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+48px)] lg:self-start">
            <p className="font-technical text-[9px] uppercase tracking-[.2em] text-white/50">03 / End-to-end delivery</p>
            <h2 className="mt-7 text-[clamp(3.3rem,6vw,6.8rem)] font-semibold leading-[.9] tracking-[-.075em]">One partner.<br /><span className="font-display font-normal italic text-[#80e1bb]">Every step.</span></h2>
            <p className="mt-9 max-w-md text-base leading-8 text-white/60">From the first location review to daily station performance, Vajra Greens brings the physical, digital, and operating layers together.</p>
            <Link href="/charging" className="mt-10 inline-flex items-center gap-8 border-b border-white/50 pb-3 text-xs font-semibold uppercase tracking-[.1em]">Explore charging <span className="text-[#80e1bb]">↗</span></Link>
          </div>
          <div className="relative border-t border-white/20">
            <span className="absolute bottom-0 left-[13px] top-0 w-px bg-white/15" aria-hidden="true"><span className="process-line-fill block h-full w-full origin-top bg-[#54d7ba]" /></span>
            {deliverySteps.map((step) => <article key={step.number} className="relative grid gap-5 border-b border-white/20 py-9 pl-14 md:grid-cols-[100px_1fr] md:py-12"><span className="absolute left-2 top-[43px] h-3 w-3 rounded-full border border-[#80e1bb] bg-[#09232d] md:top-[55px]" /><span className="font-technical text-[9px] uppercase tracking-[.2em] text-white/45">{step.number}</span><div><h3 className="text-[clamp(2rem,3.5vw,3.6rem)] font-semibold leading-none tracking-[-.055em]">{step.title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base md:leading-8">{step.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="px-[var(--page-gutter)] py-24 md:py-36">
        <div className="grid gap-12 border-b border-[#bcc8c1] pb-14 md:grid-cols-[1fr_.65fr] md:items-end"><div><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">04 / Who we serve</p><h2 className="mt-7 text-[clamp(3.5rem,7vw,7.6rem)] font-semibold leading-[.88] tracking-[-.08em]">Built around<br /><span className="font-display font-normal italic text-[#104975]">how you move.</span></h2></div><p className="max-w-lg text-base leading-8 text-[#5d6968]">Different users bring different charging rhythms. The infrastructure, operating model, and commercial arrangement should reflect them.</p></div>
        <div className="grid md:grid-cols-3">
          {audiences.map((audience, index) => <article key={audience.title} className={`flex min-h-[380px] flex-col justify-between border-b border-[#bcc8c1] py-9 md:min-h-[440px] md:px-8 md:py-10 ${index > 0 ? "md:border-l" : ""}`}><span className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">0{index + 1}</span><div><h3 className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-[.92] tracking-[-.065em]">{audience.title}</h3><p className="mt-7 max-w-sm text-sm leading-7 text-[#5d6968]">{audience.copy}</p><Link href={audience.link} className="mt-9 inline-flex border-b border-[#17272b] pb-2 text-xs font-semibold uppercase tracking-[.1em]">Learn more</Link></div></article>)}
        </div>
      </section>

      <section className="bg-[#dcece3] px-[var(--page-gutter)] py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">05 / Technology and hardware</p><h2 className="mt-7 text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[.88] tracking-[-.08em]">The station is<br />only the <span className="font-display font-normal italic text-[#104975]">beginning.</span></h2><p className="mt-10 max-w-xl text-base leading-8 text-[#5d6968]">Vajra Greens combines established charging hardware with a connected software and operating layer. The goal is one dependable experience for the driver and one visible system for the operator.</p></div>
          <div className="self-end border-t border-[#adcbc0]">
            <div className="grid grid-cols-[110px_1fr] gap-6 border-b border-[#adcbc0] py-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-[#5d6968]">Hardware</span><div><strong className="text-2xl tracking-[-.04em]">Delta Electronics · Exicom</strong><p className="mt-3 text-sm leading-7 text-[#5d6968]">Established equipment suppliers identified in the company brief.</p></div></div>
            <div className="grid grid-cols-[110px_1fr] gap-6 border-b border-[#adcbc0] py-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-[#5d6968]">Software</span><div><strong className="text-2xl tracking-[-.04em]">StatiQ ecosystem</strong><p className="mt-3 text-sm leading-7 text-[#5d6968]">Sessions, customer access, transactions, station visibility, monitoring, and performance data.</p></div></div>
            <div className="grid grid-cols-[110px_1fr] gap-6 py-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-[#5d6968]">Operations</span><div><strong className="text-2xl tracking-[-.04em]">Managed end to end</strong><p className="mt-3 text-sm leading-7 text-[#5d6968]">Installation, daily operation, maintenance, and commercial optimisation.</p></div></div>
          </div>
        </div>
      </section>

      <section className="home-horizon relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-[#051b26] text-white">
        <div className="horizon-video-layer absolute inset-0 will-change-transform"><video ref={horizonVideo} className="h-full w-full object-cover" muted loop playsInline preload="auto" aria-label="Vajra Greens charging station and connected city"><source src="/media/horizon.mp4" type="video/mp4" /></video></div>
        <div className="horizon-shade absolute inset-0 bg-[#03131f]/62" /><div className="absolute inset-0 bg-gradient-to-t from-[#03131f]/80 via-transparent to-[#03131f]/25" />
        <div className="absolute left-[var(--page-gutter)] right-[var(--page-gutter)] top-[calc(var(--header-height)+32px)] z-10 flex justify-between font-technical text-[9px] uppercase tracking-[.19em] text-white/65"><span>06 / The horizon</span><span>From access to possibility</span></div>
        <div className="absolute inset-x-[var(--page-gutter)] top-1/2 z-10 -translate-y-1/2"><div className="horizon-copy-1"><h2 className="max-w-5xl text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.085em]">A point of charge<br />becomes a <span className="font-display font-normal italic text-[#80e1bb]">network.</span></h2></div><div className="horizon-copy-2 absolute left-0 top-1/2 max-w-5xl -translate-y-1/2"><h2 className="text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.84] tracking-[-.085em]">A network becomes<br /><span className="font-display font-normal italic text-[#80e1bb]">momentum.</span></h2></div></div>
        <div className="absolute bottom-8 left-[var(--page-gutter)] right-[var(--page-gutter)] z-10"><div className="h-px bg-white/25"><span className="horizon-rule-fill block h-full origin-left scale-x-0 bg-[#54d7ba]" /></div><div className="mt-4 flex justify-between font-technical text-[8px] uppercase tracking-[.18em] text-white/55"><span>Charging / Software / Operations</span><span>Clean mobility in motion</span></div></div>
      </section>

      <section className="bg-[#e9eee9] px-[var(--page-gutter)] py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+48px)] lg:self-start"><p className="font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]">07 / The road ahead</p><h2 className="mt-7 text-[clamp(3.5rem,6.5vw,7rem)] font-semibold leading-[.89] tracking-[-.075em]">Grow the<br /><span className="font-display font-normal italic text-[#104975]">network.</span></h2><p className="mt-9 max-w-sm text-sm leading-7 text-[#5d6968]">Future figures are company goals from the supplied presentation and remain subject to execution, funding, policy, and market conditions.</p></div>
          <div className="border-t border-[#bcc8c1]">{roadmap.map((item, index) => <article key={item.year} className="grid gap-5 border-b border-[#bcc8c1] py-9 md:grid-cols-[110px_1fr] md:py-11"><span className={`font-technical text-[10px] uppercase tracking-[.18em] ${index < 2 ? "text-[#104975]" : "text-[#45a67f]"}`}>{item.year}</span><div><h3 className="text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[.95] tracking-[-.06em]">{item.title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-[#5d6968] md:text-base md:leading-8">{item.copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="home-final px-[var(--page-gutter)] py-28 md:py-44"><div className="border-t border-[#bcc8c1] pt-7"><div className="flex justify-between font-technical text-[9px] uppercase tracking-[.2em] text-[#5d6968]"><span>08 / Build the next connection</span><span>New Delhi · India</span></div><h2 className="mt-20 max-w-6xl text-[clamp(4rem,9.5vw,10rem)] font-semibold leading-[.82] tracking-[-.09em]"><span className="final-word block">The future</span><span className="final-word block">needs <span className="font-display font-normal italic text-[#104975]">somewhere</span></span><span className="final-word block text-[#45b98d]">to charge.</span></h2><div className="mt-20 flex flex-col items-start justify-between gap-10 border-t border-[#bcc8c1] pt-7 md:flex-row md:items-end"><p className="max-w-md text-base leading-8 text-[#5d6968]">Have a location, a fleet, or an idea that can move clean mobility forward?</p><Link href="/contact" className="inline-flex min-w-64 items-center justify-between border-b border-[#17272b] pb-4 text-lg font-semibold">Build with Vajra <span className="text-2xl text-[#104975]">↗</span></Link></div></div></section>
    </main>
  );
}
