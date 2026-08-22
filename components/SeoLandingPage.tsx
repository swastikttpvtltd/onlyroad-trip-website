import Link from "next/link";
import type { Metadata } from "next";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoPricing = {
  price: number;
  duration: string;
  destinations: string[];
};

export type SeoPageConfig = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  description?: string;
  focus: "destination" | "package" | "service" | "local";
  highlights: string[];
  keywords: string[];
  pricing?: SeoPricing;
  inclusions?: string[];
  exclusions?: string[];
  faqs?: SeoFaq[];
};

const baseUrl = "https://www.onlyroadtrip.com";

export function buildSeoMetadata(config: SeoPageConfig): Metadata {
  const url = `${baseUrl}/${config.slug}`;
  return {
    title: config.title,
    description: config.description ?? config.intro,
    keywords: config.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: config.title,
      description: config.description ?? config.intro,
      url,
      siteName: "Only Road Trip",
      locale: "en_IN",
      type: "website",
      images: [{ url: "/images/logo/only-road-trip-logo.jpeg", alt: config.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description ?? config.intro,
    },
    robots: { index: true, follow: true },
  };
}

function content(config: SeoPageConfig) {
  const isLocal = config.focus === "local";
  const isPackage = config.focus === "package";
  const isService = config.focus === "service";

  const services = isLocal
    ? [
        ["Customized trip planning", `Plan your ${config.eyebrow.replace("Travel Agent in ", "")} holiday around your dates, group size and budget.`],
        ["Domestic holidays", "Get help with family holidays, hill trips, beach holidays, road trips and destination packages across India."],
        ["Pilgrimage travel", "Coordinate practical pilgrimage journeys with transport, accommodation and itinerary support."],
        ["Group travel", "Arrange vehicles, hotels and sightseeing for families, friends, community groups and corporate teams."],
        ["Corporate travel", "Plan employee trips, offsites, meetings and group travel with one travel coordination point."],
        ["Travel support", "Discuss your requirements with the Only Road Trip team before confirming the arrangements you need."],
      ]
    : isPackage
      ? [
          ["Route planning", "Build a practical route around your departure city, travel dates, sightseeing priorities and available travel time."],
          ["Hotels and stays", "Compare suitable accommodation options based on location, comfort level, group size and budget."],
          ["Transport", "Choose private cars, SUVs, Tempo Travellers or group transport according to the itinerary and group size."],
          ["Flexible itinerary", "Adjust nights, sightseeing and stops around your priorities rather than following a rigid fixed plan."],
          ["Family and group options", "Coordinate travel for couples, families, friends and larger groups with suitable logistics."],
          ["Travel coordination", "Keep agreed bookings and journey arrangements organized before and during the planned trip."],
        ]
      : isService
        ? [
            ["Personalized planning", "Start with your dates, group size, destination preferences and budget so the itinerary matches your requirement."],
            ["Transport coordination", "Arrange suitable private or group transport based on the route, number of travelers and travel style."],
            ["Accommodation", "Discuss practical hotel categories and locations that fit the itinerary and comfort level you choose."],
            ["Group logistics", "Coordinate multiple travelers, rooms, transfers and sightseeing requirements through one travel plan."],
            ["Flexible options", "Adapt the plan when your destination, duration, budget or travel priorities change before confirmation."],
            ["End-to-end assistance", "Get a clear proposal and travel coordination for the arrangements handled by Only Road Trip."],
          ]
        : [
            ["Customized itineraries", `Plan your ${config.eyebrow.replace(" Tour Packages", "").replace(" Packages", "")} trip around your dates and travel style.`],
            ["Comfortable stays", "Choose accommodation options according to location, comfort level, group size and budget."],
            ["Private and group transport", "Coordinate cars, SUVs, Tempo Travellers or other suitable vehicles for your route."],
            ["Sightseeing planning", "Build a sensible sightseeing schedule with enough time for travel, rest and experiences."],
            ["Family and couple options", "Customize the trip for families, couples, friends or larger groups."],
            ["Travel support", "Get practical assistance with the agreed travel arrangements from planning through the journey."],
          ];

  const defaultFaqs: SeoFaq[] = isLocal
    ? [
        { question: "Why choose a travel agent in this location?", answer: "A local-facing travel service can make it easier to discuss departure points, group size, budgets and customized itineraries before booking." },
        { question: "Can I book trips outside my city?", answer: "Yes. Only Road Trip plans travel across India and can coordinate trips from the city or departure point that works for your itinerary." },
        { question: "Can you arrange family and group travel?", answer: "Yes. Family, friends, community and corporate groups can request customized transport, stays and sightseeing." },
        { question: "How do I request a quote?", answer: "Use the contact page to share your destination, dates, travelers and requirements. The travel team can then prepare suitable options." },
      ]
    : [
        { question: `Can I customize this ${isPackage ? "package" : "tour"}?`, answer: "Yes. Dates, duration, hotels, transport, sightseeing and route details can be discussed according to your requirements." },
        { question: "Can you plan this trip from Delhi?", answer: "Yes. Delhi can be used as a departure point for many domestic routes. Share your dates and group size so the route can be planned appropriately." },
        { question: "Do you offer private transport?", answer: "Private cars, SUVs and larger vehicles can be discussed depending on the route, group size and availability." },
        { question: "How do I get a quote?", answer: "Send your destination, dates, number of travelers, preferred hotel category and any special requirements through the contact page." },
      ];

  return {
    services,
    faqs: config.faqs?.length ? config.faqs : defaultFaqs,
  };
}

function buildPageSchema(config: SeoPageConfig, url: string, faqs: SeoFaq[]) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: config.eyebrow, item: url },
      ],
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: config.eyebrow,
      serviceType: config.eyebrow,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      url,
    },
  ];

  if (config.pricing) {
    graph.push({
      "@type": "Offer",
      "@id": `${url}#offer`,
      name: config.title,
      url,
      price: config.pricing.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${baseUrl}/#organization` },
    });
  }

  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default function SeoLandingPage({ config }: { config: SeoPageConfig }) {
  const url = `${baseUrl}/${config.slug}`;
  const { services, faqs } = content(config);
  const pageSchema = buildPageSchema(config, url, faqs);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
              {config.eyebrow}
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.06] tracking-tight text-slate-950 md:text-6xl">
              {config.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              {config.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {config.highlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                  ✓ {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-blue-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-blue-900">
                Get a Free Quote
              </Link>
              <Link href="/packages" className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 hover:border-blue-300 hover:text-blue-800">
                Explore Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {config.pricing && (
        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">Package Snapshot</p>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Starting Price</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-950">₹{config.pricing.price.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</p>
                <p className="mt-2 text-xl font-bold text-slate-950">{config.pricing.duration}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Destinations</p>
                <p className="mt-2 text-base font-semibold text-slate-950">{config.pricing.destinations.join(" • ")}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">Only Road Trip</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Travel planning built around your actual requirements.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{config.description ?? "Tell us your dates, group size, preferred comfort level and budget. We can shape the itinerary, transport and accommodation around your trip instead of forcing you into a one-size-fits-all plan."}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {(config.inclusions?.length || config.exclusions?.length) && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {config.inclusions?.length ? (
                <div className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-950">Tour Inclusions</h2>
                  <div className="mt-5 space-y-3">
                    {config.inclusions.map((item) => <div key={item} className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">✓ {item}</div>)}
                  </div>
                </div>
              ) : null}
              {config.exclusions?.length ? (
                <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-950">Tour Exclusions</h2>
                  <div className="mt-5 space-y-3">
                    {config.exclusions.map((item) => <div key={item} className="rounded-xl bg-rose-50 p-4 text-sm text-slate-700">• {item}</div>)}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Simple process. Clear communication.</h2>
              <p className="mt-4 text-slate-600">Share your requirements, review the proposed plan and confirm the arrangements you want.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[["01", "Share your plan"], ["02", "Review the itinerary"], ["03", "Confirm and travel"]].map(([n, t]) => (
                <div key={n} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <span className="text-sm font-bold text-blue-800">{n}</span>
                  <h3 className="mt-3 font-semibold text-slate-950">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">FAQs</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-900">{faq.question}</summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-blue-900 px-8 py-12 text-white md:px-12">
          <h2 className="text-3xl font-semibold">Ready to plan your journey?</h2>
          <p className="mt-3 max-w-2xl text-blue-100">Get a customized proposal from Only Road Trip based on your dates, group size and travel preferences.</p>
          <Link href="/contact" className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-900 hover:bg-blue-50">Talk to Our Travel Team</Link>
        </div>
      </section>
    </main>
  );
}
