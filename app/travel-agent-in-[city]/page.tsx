import { notFound } from "next/navigation";

const capitalize = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

type Props = {
  params: Promise<{ city: string }>;
};

export default async function DynamicCityPage({ params }: Props) {
  const { city } = await params;
  const cityName = capitalize(city.replace(/-/g, " "));

  const localAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `https://www.onlyroadtrip.com/travel-agent-in-${city}#travelagency`,
    "name": `Only Road Trip - ${cityName}`,
    "url": `https://www.onlyroadtrip.com/travel-agent-in-${city}`,
    "telephone": "+919211796168",
    "email": "info@onlyroadtrip.com",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": cityName,
    },
    "parentOrganization": {
      "@type": "TravelAgency",
      "@id": "https://www.onlyroadtrip.com/#travelagency",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localAgencySchema),
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center py-8">
          <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">
            Premium India Road Trips &amp; Pilgrimages
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mt-2">
            Best Premium Travel Agent in {cityName}
          </h1>

          <p className="text-lg text-neutral-600 mt-4 max-w-3xl mx-auto">
            Planning a custom journey? Only Road Trip (operated by Swastik Tour And Travels) helps travelers from <strong>{cityName}</strong> book premium, customized road trips, sacred pilgrimage tours, and luxurious corporate holidays across India with 24/7 on-road support.
          </p>
        </div>
      </main>
    </>
  );
}
