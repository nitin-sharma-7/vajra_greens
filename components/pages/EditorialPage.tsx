import Link from "next/link";

export type EditorialPageProps = {
  eyebrow: string;
  title: React.ReactNode;
  introduction: string;
  image: string;
  imageAlt: string;
  detailTitle: string;
  paragraphs: string[];
  points: string[];
  nextTitle: string;
  nextHref: string;
  nextLabel: string;
};

export function EditorialPage({ eyebrow, title, introduction, image, imageAlt, detailTitle, paragraphs, points, nextTitle, nextHref, nextLabel }: EditorialPageProps) {
  return (
    <main id="main" className="min-h-[75vh] px-[var(--page-gutter)] pb-24 pt-[var(--header-height)]">
      <span className="eyebrow block pt-6">{eyebrow}</span>
      <section className="grid grid-cols-1 gap-10 pb-16 pt-14 md:grid-cols-[minmax(0,1fr)_minmax(190px,280px)] md:gap-[6vw] md:pb-24 md:pt-16" aria-label={eyebrow}>
        <h1 className="text-[clamp(54px,12vw,86px)] leading-[.9] font-[530] tracking-[-.085em] md:text-[clamp(66px,9vw,145px)] [&_em]:text-vajra-blue">{title}</h1>
        <p className="self-end text-[13px] leading-[1.8] text-ink-soft md:text-[15px]">{introduction}</p>
      </section>
      <div className="h-[340px] overflow-hidden bg-paper-deep md:h-[clamp(330px,52vw,680px)]"><img className="h-full w-full object-cover" src={image} alt={imageAlt} /></div>
      <section className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[minmax(170px,.4fr)_1fr] md:gap-[7vw] md:pt-24 md:pb-12">
        <span className="eyebrow">THE APPROACH</span>
        <div className="grid max-w-[780px] gap-8">
          <h2 className="text-[clamp(37px,4.6vw,70px)] leading-[1.08] font-[550] tracking-[-.07em]">{detailTitle}</h2>
          {paragraphs.map((paragraph) => <p className="text-sm leading-[1.85] text-ink-soft md:text-[17px]" key={paragraph}>{paragraph}</p>)}
          <ul className="mt-5 border-t border-line">{points.map((point) => <li className="flex gap-5 border-b border-line py-[18px] text-base before:text-energy before:content-['↗']" key={point}>{point}</li>)}</ul>
        </div>
      </section>
      <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-line pt-6 md:mt-28 md:flex-row md:items-end"><p className="max-w-[390px] text-lg leading-normal">{nextTitle}</p><Link className="border-b border-ink pb-2 text-2xl font-semibold tracking-[-.04em] md:text-[27px]" href={nextHref}>{nextLabel} ↗</Link></div>
    </main>
  );
}
