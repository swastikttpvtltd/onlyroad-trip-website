import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage, { buildSeoMetadata } from "@/components/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";
import PackagePricingTable from "@/components/PackagePricingTable";
import InclusionsExclusionsTable from "@/components/InclusionsExclusionsTable";
import SemanticFAQ, { FAQSchema } from "@/components/SemanticFAQ";

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

export default async function SeoPage({ params }: Props) {
  const { slug } = await params;
  const config = seoPages[slug];
  if (!config) notFound();

  const hasAiContent = Boolean(
    config.pricing ||
      config.faqs?.length ||
      config.inclusions?.length ||
      config.exclusions?.length
  );

  return (
    <>
      {/* Main SEO landing page UI */}
      <SeoLandingPage config={config} />

      {/* Enriched SEO / AI-search content */}
      {hasAiContent && (
        <div className="mx-auto max-w-6xl border-t border-neutral-100 px-4 py-8">
          {config.pricing && (
            <PackagePricingTable
              packageName={config.title}
              startingPrice={config.pricing.price}
              duration={config.pricing.duration}
              destinations={config.pricing.destinations ?? []}
              itinerarySummary={config.description ?? config.intro}
            />
          )}

          {config.inclusions && config.exclusions && (
            <InclusionsExclusionsTable
              inclusions={config.inclusions}
              exclusions={config.exclusions}
            />
          )}

          {config.faqs && config.faqs.length > 0 && (
            <>
              <SemanticFAQ faqList={config.faqs} />
              <FAQSchema faqList={config.faqs} />
            </>
          )}
        </div>
      )}
    </>
  );
}
