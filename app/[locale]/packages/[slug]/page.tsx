import type { Metadata } from "next";
import LegacyPage, { generateMetadata as legacyGenerateMetadata } from "@/app/packages/[slug]/page";
import { packages } from "@/data/packages";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    packages.map((pkg) => ({ locale, slug: String(pkg.slug) }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return { robots: "noindex" };
  const base = await legacyGenerateMetadata({ params: Promise.resolve({ slug }) });
  const url = `https://www.onlyroadtrip.com/${locale}/packages/${slug}`;
  return {
    ...base,
    alternates: { canonical: url },
    openGraph: { ...(base.openGraph || {}), url },
  };
}

export default async function LocalizedPackagePage({ params }: Props) {
  const { slug } = await params;
  return <LegacyPage params={Promise.resolve({ slug })} />;
}
