import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { internationalMarkets, internationalMarketSlugs, isInternationalMarketSlug } from "@/data/internationalMarkets";
import { siteUrl, serializeJsonLd } from "@/lib/siteSeo";

type Props = { params: Promise<{ country: string }> };
export function generateStaticParams() { return internationalMarketSlugs.map(country => ({ country })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isInternationalMarketSlug(country)) return {};
  const market = internationalMarkets[country];
  const title = `India Tours from ${market.country} | Only Road Trip`;
  const description = `Explore private India tours, pilgrimage journeys and customized travel planning for visitors from ${market.country}. Confirm dates, itinerary and pricing directly with Only Road Trip.`;
  const url = `${siteUrl}/india-tours-from/${country}`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, siteName: "Only Road Trip", locale: market.locale.replace("-", "_") },
    twitter: { card: "summary_large_image", title, description },
  };
}
export default async function InternationalMarketPage({ params }: Props) {
  const { country } = await params;
  if (!isInternationalMarketSlug(country)) notFound();
  const market = internationalMarkets[country];
  const url = `${siteUrl}/india-tours-from/${country}`;
  const schema = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`,
    url, name: `India Tours from ${market.country}`, inLanguage: market.locale,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
  };
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <h1 className="text-3xl font-bold tracking-tight">India Tours from {market.country}</h1>
      <p className="mt-5 text-lg leading-relaxed">Planning a trip to India from {market.country}? Only Road Trip offers personalized India tour planning, including heritage journeys, pilgrimage itineraries, family holidays and private road trips. Share your travel dates, preferred destinations and requirements to request a tailored itinerary.</p>
      <h2 className="mt-10 text-2xl font-semibold">Explore your India travel options</h2>
      <p className="mt-3 leading-relaxed">Browse published tour packages and destinations. Package details, availability, accessibility arrangements, pickup services and final prices must be confirmed for your particular booking. International flights and visa arrangements are not automatically included.</p>
      <nav aria-label="India travel planning" className="mt-6 flex flex-wrap gap-4">
        <Link className="underline" href="/packages">Browse India tour packages</Link>
        <Link className="underline" href="/destinations">Explore destinations</Link>
        <Link className="underline" href="/plan-your-trip">Request a customized itinerary</Link>
        <Link className="underline" href="/contact">Contact Only Road Trip</Link>
      </nav>
      <h2 className="mt-10 text-2xl font-semibold">Frequently asked questions</h2>
      <h3 className="mt-5 font-semibold">Can I request a private India tour from {market.country}?</h3>
      <p className="mt-2">Yes. Send your intended India arrival city, dates, number of travellers and preferred destinations to request a customized proposal.</p>
      <h3 className="mt-5 font-semibold">Are flights, visas and currency conversion included?</h3>
      <p className="mt-2">Do not assume they are included. Review the specific quotation for inclusions, exclusions, applicable taxes and payment currency before booking.</p>
    </section>
  );
}
