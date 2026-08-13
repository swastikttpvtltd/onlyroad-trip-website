import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage, { buildSeoMetadata } from "@/components/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return Object.keys(seoPages).map((slug) => ({ slug })); }

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
  return <SeoLandingPage config={config} />;
}
