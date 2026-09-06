import type { Metadata } from "next";
import { notFound } from "next/navigation";

const capitalize = (str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase());
const baseUrl = "https://www.onlyroadtrip.com";

type Props = { params: Promise<{ city?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const safeCity = city?.trim() || "India";
  const cityName = capitalize(safeCity.replace(/-/g, " "));
  return {
    title: `Best Travel Agent in ${cityName} | Only Road Trip`,
    description: `Find a premium travel agent in ${cityName} for customized India tour packages, pilgrimage journeys, road trips, family holidays and corporate travel with Only Road Trip.`,
    keywords: [`travel agent in ${cityName}`, `travel agency in ${cityName}`, `tour operator in ${cityName}`, `India tour packages from ${cityName}`, "Only Road Trip"],
    alternates: { canonical: `${baseUrl}/travel-agent-in-${safeCity}` },
    openGraph: { title: `Best Travel Agent in ${cityName} | Only Road Trip`, description: `Customized India travel planning from ${cityName} with Only Road Trip.`, url: `${baseUrl}/travel-agent-in-${safeCity}`, siteName: "Only Road Trip", type: "website" },
    twitter: { card: "summary_large_image", title: `Best Travel Agent in ${cityName} | Only Road Trip`, description: `Customized India travel planning from ${cityName}.` },
    robots: { index: true, follow: true },
  };
}

export default async function DynamicCityPage({ params }: Props) {
  const { city } = await params;
  const safeCity = city?.trim() || "India";
  const cityName = capitalize(safeCity.replace(/-/g, " "));

  const localAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${baseUrl}/travel-agent-in-${safeCity}#travelagency`,
    "name": `Only Road Trip - ${cityName}`,
    "url": `${baseUrl}/travel-agent-in-${safeCity}`,
    "telephone": "+919211796168",
    "email": "info@onlyroadtrip.com",
    "areaServed": { "@type": "AdministrativeArea", "name": cityName },
    "parentOrganization": { "@type": "TravelAgency", "@id": `${baseUrl}/#organization`, "name": "Only Road Trip" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localAgencySchema) }} />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center py-8">
          <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Premium India Road Trips &amp; Pilgrimages</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mt-2">Best Premium Travel Agent in {cityName}</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-3xl mx-auto">Planning a custom journey? Only Road Trip (operated by Swastik Tour And Travels) helps travelers from <strong>{cityName}</strong> book premium, customized road trips, sacred pilgrimage tours, and luxurious corporate holidays across India with 24/7 on-road support.</p>
        </div>
      </main>
    </>
  );
}
