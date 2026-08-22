import type { Metadata } from "next";
import { notFound } from "next/navigation";

const baseUrl = "https://www.onlyroadtrip.com";

const supportedCities = [
  "delhi",
  "gurgaon",
  "noida",
  "faridabad",
  "rohtak",
] as const;

type City = (typeof supportedCities)[number];

type PageProps = {
  params: Promise<{ city: string }>;
};

const cityData: Record<City, { name: string; region: string }> = {
  delhi: { name: "Delhi", region: "Delhi" },
  gurgaon: { name: "Gurgaon", region: "Haryana" },
  noida: { name: "Noida", region: "Uttar Pradesh" },
  faridabad: { name: "Faridabad", region: "Haryana" },
  rohtak: { name: "Rohtak", region: "Haryana" },
};

export function generateStaticParams() {
  return supportedCities.map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const normalizedCity = city.toLowerCase();
  const data = cityData[normalizedCity as City];

  if (!data) {
    return {
      title: "Travel Agent | Only Road Trip",
      robots: { index: false, follow: false },
    };
  }

  const title = `Travel Agent in ${data.name} | Only Road Trip`;
  const description = `Plan customized India holidays, pilgrimage tours, road trips, group travel and corporate travel with Only Road Trip from ${data.name}.`;
  const url = `${baseUrl}/travel-agent-in-${normalizedCity}`;

  return {
    title,
    description,
    keywords: [
      `Travel agent in ${data.name}`,
      `Travel agency ${data.name}`,
      `Tour operator ${data.name}`,
      `Tour packages from ${data.name}`,
      `India tour packages from ${data.name}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Only Road Trip",
      locale: "en_IN",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TravelAgentCityPage({ params }: PageProps) {
  const { city } = await params;
  const normalizedCity = city.toLowerCase();
  const data = cityData[normalizedCity as City];

  if (!data) notFound();

  const url = `${baseUrl}/travel-agent-in-${normalizedCity}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: `Travel Agent in ${data.name}`, item: url },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${url}#travel-agency`,
    name: "Only Road Trip",
    legalName: "Swastik Tour And Travels Private Limited",
    url: baseUrl,
    telephone: "+91-9211796168",
    email: "info@onlyroadtrip.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "F163, Phase-1 New Palam Vihar",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122001",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: data.name,
    },
    serviceType: [
      "Domestic Tour Packages",
      "Pilgrimage Tours",
      "Road Trips",
      "Group Tours",
      "Corporate Travel",
      "Customized Travel Packages",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Travel Agent Services in ${data.name}`,
    serviceType: "Travel Agency Services",
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: data.name,
    },
    url,
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
              Travel Agent in {data.name}
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.06] tracking-tight text-slate-950 md:text-6xl">
              Travel Agent in {data.name}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Plan customized domestic holidays, pilgrimage tours, road trips,
              group journeys and corporate travel from {data.name} with Only
              Road Trip.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Customized trip planning", `Plan your ${data.name} departure around your dates, group size and budget.`],
            ["Domestic holidays", "Explore family holidays, hill trips, beach holidays and destination packages across India."],
            ["Pilgrimage travel", "Coordinate pilgrimage journeys with practical transport, accommodation and itinerary support."],
            ["Group travel", "Arrange vehicles, hotels and sightseeing for families, friends, community and corporate groups."],
            ["Corporate travel", "Plan employee trips, offsites, meetings and group travel with one coordination point."],
            ["Travel support", "Discuss your requirements before confirming the travel arrangements you need."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-blue-800">01</p>
              <h2 className="mt-3 text-xl font-semibold">Share your plan</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">Tell us your destination, dates, travellers and preferences.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-blue-800">02</p>
              <h2 className="mt-3 text-xl font-semibold">Review options</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">Review itinerary, transport, accommodation and pricing options.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-blue-800">03</p>
              <h2 className="mt-3 text-xl font-semibold">Confirm and travel</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">Finalize the arrangements and get travel coordination from Only Road Trip.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
