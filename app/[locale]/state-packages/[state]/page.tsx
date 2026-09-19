import LegacyPage, { generateMetadata as legacyGenerateMetadata } from "@/app/state-packages/[state]/page";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; state: string }> };

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    ["andhra-pradesh","assam","goa","gujarat","himachal-pradesh","jammu-kashmir","karnataka","kerala","ladakh","madhya-pradesh","maharashtra","odisha","punjab","rajasthan","sikkim","tamil-nadu","uttar-pradesh","uttarakhand","west-bengal"].map((state) => ({ locale, state }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, state } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return { robots: "noindex" };
  const base = await legacyGenerateMetadata({ params: Promise.resolve({ state }) });
  const url = `https://www.onlyroadtrip.com/${locale}/state-packages/${state}`;
  return { ...base, alternates: { canonical: url }, openGraph: { ...(base.openGraph || {}), url } };
}

export default async function LocalizedStatePackagesPage({ params }: Props) {
  const { state } = await params;
  return <LegacyPage params={Promise.resolve({ state })} />;
}
