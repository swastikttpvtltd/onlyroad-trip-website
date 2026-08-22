import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage, { buildSeoMetadata } from "@/components/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = seoPages[slug];

  if (!config) return {};
  return buildSeoMetadata(config);
}

function PricingSection({ config }: { config: (typeof seoPages)[string] }) {
  if (!config.pricing) return null;

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
            Package Snapshot
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            {config.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            {config.description ?? config.intro}
          </p>
        </div>
        <div className="rounded-2xl bg-blue-50 px-5 py-4 text-left md:text-right">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
            Starting from
          </p>
          <p className="mt-1 text-2xl font-extrabold text-slate-950">
            ₹{config.pricing.price.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {config.pricing.duration}
          </p>
        </div>
      </div>

      {config.pricing.destinations.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {config.pricing.destinations.map((destination) => (
            <span
              key={destination}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {destination}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function InclusionsExclusionsSection({
  config,
}: {
  config: (typeof seoPages)[string];
}) {
  if (!config.inclusions?.length && !config.exclusions?.length) return null;

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2">
      {config.inclusions?.length ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Inclusions
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            What is included
          </h2>
          <ul className="mt-5 space-y-3">
            {config.inclusions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-1 text-emerald-700">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {config.exclusions?.length ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">
            Exclusions
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            What is not included
          </h2>
          <ul className="mt-5 space-y-3">
            {config.exclusions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-1 text-rose-700">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function FaqSection({ config }: { config: (typeof seoPages)[string] }) {
  if (!config.faqs?.length) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
        FAQs
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Frequently asked questions
      </h2>
      <div className="mt-5 divide-y divide-slate-200">
        {config.faqs.map((faq) => (
          <details key={faq.question} className="py-5">
            <summary className="cursor-pointer pr-8 text-base font-semibold text-slate-900">
              {faq.question}
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const config = seoPages[slug];

  if (!config) notFound();

  const hasEnrichedContent = Boolean(
    config.pricing || config.inclusions?.length || config.exclusions?.length || config.faqs?.length
  );

  return (
    <>
      <SeoLandingPage config={config} />

      {hasEnrichedContent && (
        <div className="mx-auto max-w-6xl px-4 pb-20">
          <PricingSection config={config} />
          <InclusionsExclusionsSection config={config} />
          <FaqSection config={config} />
        </div>
      )}
    </>
  );
}
