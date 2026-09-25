import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Vajra Greens and Power Energy LLP, its registered enterprise profile, purpose, and New Delhi base.",
};

const registeredDetails = [
  { label: "Registered enterprise", value: "Vajra Greens and Power Energy LLP" },
  { label: "Udyam registration", value: "UDYAM-DL-10-0100149" },
  { label: "GST registration", value: "07AAXFV3458J1ZB" },
  { label: "Enterprise classification", value: "Micro · 2025–26" },
  { label: "Major activity", value: "Services" },
];

const dates = [
  { label: "Incorporated", value: "21 August 2023" },
  { label: "Business commenced", value: "21 August 2023" },
  { label: "Udyam registered", value: "22 September 2025" },
];

export default function AboutPage() {
  return (
    <main id="main" className="overflow-x-clip bg-paper text-ink">
      <section className="min-h-[88svh] px-[var(--page-gutter)] pb-20 pt-[var(--header-height)] md:pb-28">
        <div className="flex items-center justify-between pt-6 font-technical text-[9px] uppercase tracking-[.19em] text-ink-soft">
          <span>About Vajra Greens</span><span>New Delhi · India</span>
        </div>
        <div className="grid min-h-[68svh] items-center gap-14 py-16 lg:grid-cols-[1.35fr_.65fr]">
          <h1 className="max-w-6xl text-[clamp(4.2rem,10vw,11rem)] font-semibold leading-[.81] tracking-[-.09em]">Building the<br /><span className="font-display font-normal italic text-vajra-blue">infrastructure</span><br /><span className="text-energy [word-spacing:.13em]">of movement.</span></h1>
          <div className="self-end border-t border-line pt-7 lg:mb-7"><p className="font-technical text-[9px] uppercase tracking-[.19em] text-ink-soft">Who we are</p><p className="mt-7 text-base leading-8 text-ink-soft">Vajra Greens is a renewable-energy and clean-mobility company focused first on reliable, accessible, and commercially viable EV charging infrastructure across high-demand locations.</p></div>
        </div>
      </section>

      <section className="bg-paper-deep px-[var(--page-gutter)] py-24 md:py-36" aria-labelledby="registered-profile">
        <div className="flex items-center justify-between border-t border-line pt-4 font-technical text-[9px] uppercase tracking-[.19em] text-ink-soft"><span>01 / Registered profile</span><span>MSME · Government of India</span></div>
        <div className="grid gap-14 pt-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div><p className="eyebrow">The enterprise</p><h2 id="registered-profile" className="mt-5 text-[clamp(3rem,5.6vw,6rem)] font-semibold leading-[.9] tracking-[-.075em]">Registered.<br /><span className="font-display font-normal italic text-vajra-blue">Rooted.</span><br />Ready to build.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-ink-soft">The information here is drawn from the enterprise&apos;s Udyam Registration Certificate dated 22 September 2025.</p></div>
          <dl className="border-t border-line">{registeredDetails.map((detail, index) => <div key={detail.label} className="grid gap-3 border-b border-line py-7 md:grid-cols-[44px_1fr_1.2fr] md:items-baseline"><dt className="font-technical text-[9px] text-ink-soft">0{index + 1}</dt><dt className="text-xs font-semibold uppercase tracking-[.1em] text-ink-soft">{detail.label}</dt><dd className="text-xl font-semibold tracking-[-.035em] md:text-2xl">{detail.value}</dd></div>)}</dl>
        </div>
      </section>

      <section className="bg-[#09232d] px-[var(--page-gutter)] py-24 text-white md:py-36">
        <div className="flex items-center justify-between border-t border-white/20 pt-4 font-technical text-[9px] uppercase tracking-[.19em] text-white/55"><span>02 / Our foundation</span><span>Established 2023</span></div>
        <div className="grid gap-16 pt-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-24"><div><h2 className="text-[clamp(3.5rem,7.4vw,8rem)] font-semibold leading-[.96] tracking-[-.075em]"><span className="block">A young</span><span className="block">company</span><span className="block">with a</span><span className="mt-2 block font-display font-normal italic tracking-[-.045em] text-[#80e1bb]">long view.</span></h2><p className="mt-14 max-w-xl text-base leading-8 text-white/65">Our registered journey began in August 2023. Our mission is to develop and operate dependable fast-charging infrastructure that makes private and commercial EV use more convenient, accessible, and practical.</p></div><dl className="self-end border-t border-white/20">{dates.map((date) => <div key={date.label} className="flex items-end justify-between gap-6 border-b border-white/20 py-6"><dt className="font-technical text-[9px] uppercase tracking-[.17em] text-white/50">{date.label}</dt><dd className="text-right text-xl font-semibold tracking-[-.035em]">{date.value}</dd></div>)}</dl></div>
      </section>

      <section className="px-[var(--page-gutter)] py-24 md:py-36" aria-labelledby="co-founders">
        <div className="flex items-center justify-between border-t border-line pt-4 font-technical text-[9px] uppercase tracking-[.19em] text-ink-soft"><span>03 / Co-founders</span><span>Founder-led · New Delhi</span></div>
        <div className="grid gap-16 pt-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div><p className="eyebrow">The people behind Vajra</p><h2 id="co-founders" className="mt-6 text-[clamp(3.4rem,6.4vw,7rem)] font-semibold leading-[.9] tracking-[-.075em]">Built with<br /><span className="font-display font-normal italic text-vajra-blue">conviction.</span></h2><p className="mt-9 max-w-md text-base leading-8 text-ink-soft">Vajra Greens is led by co-founders Karan Rana and Akash Rana, building from an active operating base in Delhi-NCR.</p></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="flex min-h-80 flex-col justify-between bg-paper-deep p-8"><div className="flex items-center justify-between font-technical text-[9px] uppercase tracking-[.18em] text-ink-soft"><span>Co-founder</span><span>KR</span></div><div><h3 className="text-[clamp(2.4rem,4vw,4.5rem)] font-semibold leading-[.92] tracking-[-.065em]">Karan<br />Rana</h3><p className="mt-6 max-w-xs text-sm leading-7 text-ink-soft">University of Glasgow Honours graduate.</p></div></article>
            <article className="flex min-h-80 flex-col justify-between bg-[#dcece3] p-8"><div className="flex items-center justify-between font-technical text-[9px] uppercase tracking-[.18em] text-ink-soft"><span>Co-founder</span><span>AR</span></div><div><h3 className="text-[clamp(2.4rem,4vw,4.5rem)] font-semibold leading-[.92] tracking-[-.065em]">Akash<br />Rana</h3><p className="mt-6 max-w-xs text-sm leading-7 text-ink-soft">First Officer at Air India.</p></div></article>
            <div className="border-t border-line pt-6 sm:col-span-2"><p className="font-technical text-[9px] uppercase tracking-[.18em] text-ink-soft">Operating traction</p><p className="mt-5 max-w-2xl text-xl leading-9 tracking-[-.025em]">The company presentation reports two operational chargers and active fleet-operator partnerships.</p></div>
          </div>
        </div>
      </section>

      <section className="px-[var(--page-gutter)] py-24 md:py-36" aria-labelledby="registered-activity">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><div><p className="eyebrow">04 / Registered activity</p><h2 id="registered-activity" className="mt-7 text-[clamp(3rem,5.5vw,5.8rem)] font-semibold leading-[1.02] tracking-[-.065em]"><span className="block">Energy is in</span><span className="mt-2 block font-display font-normal italic tracking-[-.035em] text-vajra-blue">our foundation.</span></h2></div><div className="border-t border-line pt-8"><p className="max-w-2xl text-xl leading-9 tracking-[-.025em] md:text-2xl md:leading-10">The certificate lists electricity, gas, steam and air-conditioning supply under NIC division 35, with electric power generation, transmission and distribution under NIC 3510.</p><div className="mt-12 grid gap-5 sm:grid-cols-2"><div className="bg-paper-deep p-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-ink-soft">NIC code</span><strong className="mt-12 block text-4xl tracking-[-.055em]">35103</strong><p className="mt-3 text-sm leading-7 text-ink-soft">Electric power generation by non-coal based thermal sources, as listed on the certificate.</p></div><div className="bg-[#dcece3] p-7"><span className="font-technical text-[9px] uppercase tracking-[.18em] text-ink-soft">Activity on certificate</span><strong className="mt-12 block text-4xl tracking-[-.055em]">Manufacturing</strong><p className="mt-3 text-sm leading-7 text-ink-soft">The NIC activity classification shown in the statutory record.</p></div></div></div></div>
      </section>

      <section className="bg-[#dcece3] px-[var(--page-gutter)] py-24 md:py-36">
        <div className="flex items-center justify-between border-t border-[#adcbc0] pt-4 font-technical text-[9px] uppercase tracking-[.19em] text-ink-soft"><span>05 / Registered office</span><span>South West Delhi</span></div>
        <div className="grid gap-16 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24"><div><h2 className="text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[.86] tracking-[-.08em]">Find us in<br /><span className="font-display font-normal italic text-vajra-blue">New Delhi.</span></h2><address className="mt-9 max-w-lg not-italic text-lg leading-9 text-ink-soft">A-113, Vajra<br />A Block, Road No. 2<br />Mahipalpur, New Delhi<br />South West Delhi, Delhi 110037</address></div><div className="self-end border-t border-[#adcbc0] pt-7"><p className="font-technical text-[9px] uppercase tracking-[.19em] text-ink-soft">Official contact</p><a className="mt-8 block border-b border-[#adcbc0] pb-4 text-xl font-semibold tracking-[-.03em]" href="mailto:vajraagp@gmail.com">vajraagp@gmail.com <span className="float-right text-vajra-blue">↗</span></a><a className="block border-b border-[#adcbc0] py-4 text-xl font-semibold tracking-[-.03em]" href="tel:+919873700165">+91 98737 00165 <span className="float-right text-vajra-blue">↗</span></a><Link href="/contact" className="mt-10 inline-flex items-center gap-8 border-b border-ink pb-3 text-xs font-bold uppercase tracking-[.12em]">Start a conversation <span className="text-lg text-vajra-blue">↗</span></Link></div></div>
      </section>
    </main>
  );
}
