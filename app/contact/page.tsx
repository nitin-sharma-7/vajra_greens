import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with Vajra Greens about charging locations, fleets, and commercial partnerships." };

export default function ContactPage() {
  return (
    <main id="main" className="min-h-[87vh] px-[var(--page-gutter)] pb-24 pt-[var(--header-height)]">
      <span className="eyebrow block pt-6">05 / START A CONVERSATION</span>
      <section className="pb-16 pt-14 md:pb-24 md:pt-16">
        <h1 className="max-w-[1100px] text-[clamp(54px,12vw,86px)] leading-[.9] font-[530] tracking-[-.085em] md:text-[clamp(66px,9vw,145px)] [&_em]:text-vajra-blue">Let&apos;s move<br /><em>something forward.</em></h1>
        <p className="mt-32 max-w-[480px] text-[13px] leading-[1.8] text-ink-soft md:mt-28 md:text-[15px]">Tell us about the location, fleet, or opportunity you have in mind. We can explore whether there is a practical fit.</p>
      </section>
      <div className="mt-11 grid grid-cols-1 gap-12 border-t border-line pt-8 md:grid-cols-2">
        <div className="flex flex-col items-start gap-4"><span className="eyebrow">EMAIL</span><a className="border-b border-ink text-[clamp(22px,3vw,46px)] font-[550] tracking-[-.06em]" href="mailto:vajraagp@gmail.com?subject=Vajra%20Greens%20partnership%20enquiry">vajraagp@gmail.com ↗</a><p className="max-w-[300px] text-[17px] leading-[1.65]">For charging, location, fleet, and partnership conversations.</p></div>
        <div className="flex flex-col items-start gap-4"><span className="eyebrow">BASED IN</span><p className="max-w-[300px] text-[17px] leading-[1.65]">A-113, Road No. 2<br />Mahipalpur, New Delhi 110037<br />India</p></div>
      </div>
    </main>
  );
}
