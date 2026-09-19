import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import * as d0 from "@/app/destinations/andaman-nicobar/page";
import * as d1 from "@/app/destinations/andhra-pradesh/page";
import * as d2 from "@/app/destinations/assam/page";
import * as d3 from "@/app/destinations/goa/page";
import * as d4 from "@/app/destinations/gujarat/page";
import * as d5 from "@/app/destinations/himachal-pradesh/page";
import * as d6 from "@/app/destinations/jammu-kashmir/page";
import * as d7 from "@/app/destinations/karnataka/page";
import * as d8 from "@/app/destinations/kedarnath/page";
import * as d9 from "@/app/destinations/kerala/page";
import * as d10 from "@/app/destinations/ladakh/page";
import * as d11 from "@/app/destinations/lakshadweep/page";
import * as d12 from "@/app/destinations/madhya-pradesh/page";
import * as d13 from "@/app/destinations/maharashtra/page";
import * as d14 from "@/app/destinations/meghalaya/page";
import * as d15 from "@/app/destinations/odisha/page";
import * as d16 from "@/app/destinations/punjab/page";
import * as d17 from "@/app/destinations/rajasthan/page";
import * as d18 from "@/app/destinations/sikkim/page";
import * as d19 from "@/app/destinations/tamil-nadu/page";
import * as d20 from "@/app/destinations/uttar-pradesh/page";
import * as d21 from "@/app/destinations/uttarakhand/page";
import * as d22 from "@/app/destinations/west-bengal/page";

type Props = { params: Promise<{ locale: string; slug: string }> };
const pages: Record<string, any> = {
  "andaman-nicobar": d0,
  "andhra-pradesh": d1,
  "assam": d2,
  "goa": d3,
  "gujarat": d4,
  "himachal-pradesh": d5,
  "jammu-kashmir": d6,
  "karnataka": d7,
  "kedarnath": d8,
  "kerala": d9,
  "ladakh": d10,
  "lakshadweep": d11,
  "madhya-pradesh": d12,
  "maharashtra": d13,
  "meghalaya": d14,
  "odisha": d15,
  "punjab": d16,
  "rajasthan": d17,
  "sikkim": d18,
  "tamil-nadu": d19,
  "uttar-pradesh": d20,
  "uttarakhand": d21,
  "west-bengal": d22,
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => Object.keys(pages).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return { robots: "noindex" };
  const page = pages[slug];
  if (!page) return { robots: "noindex" };
  const base = page.metadata ?? {};
  const url = `https://www.onlyroadtrip.com/${locale}/destinations/${slug}`;
  return { ...base, alternates: { canonical: url }, openGraph: { ...(base.openGraph || {}), url } };
}

export default async function LocalizedDestinationPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const page = pages[slug];
  if (!page?.default) notFound();
  const Page = page.default;
  return <Page />;
}
