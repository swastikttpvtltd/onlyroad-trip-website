import Link from "next/link";
import type { Metadata } from "next";

export type SeoPageConfig = { slug: string; title: string; eyebrow: string; intro: string; focus: "destination" | "package" | "service" | "local"; highlights: string[]; keywords: string[] };
const baseUrl = "https://www.onlyroadtrip.com";
export function buildSeoMetadata(config: SeoPageConfig): Metadata { const url = `${baseUrl}/${config.slug}`; return { title: config.title, description: config.intro, keywords: config.keywords, alternates: { canonical: url }, openGraph: { title: config.title, description: config.intro, url, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: "/images/logo/only-road-trip-logo.jpeg", alt: config.title }] }, twitter: { card: "summary_large_image", title: config.title, description: config.intro }, robots: { index: true, follow: true } }; }

function content(config: SeoPageConfig) {
  const isLocal = config.focus === "local";
  const isPackage = config.focus === "package";
  const isService = config.focus === "service";
  const services = isLocal ? [
    ["Customized trip planning", `Plan your ${config.eyebrow.replace("Travel Agent in ", "")} holiday around your dates, group size and budget.`],
    ["Domestic holidays", "Get help with family holidays, hill trips, beach holidays, road trips and destination packages across India."],
    ["Pilgrimage travel", "Coordinate practical pilgrimage journeys with transport, accommodation and itinerary support."],
    ["Group travel", "Arrange vehicles, hotels and sightseeing for families, friends, community groups and corporate teams."],
    ["Corporate travel", "Plan employee trips, offsites, meetings and group travel with one travel coordination point."],
    ["Travel support", "Discuss your requirements with the Only Road Trip team before confirming the arrangements you need."]
  ] : isPackage ? [
    ["Route planning", "Build a practical route around your departure city, travel dates, sightseeing priorities and available travel time."],
    ["Hotels and stays", "Compare suitable accommodation options based on location, comfort level, group size and budget."],
    ["Transport", "Choose private cars, SUVs, Tempo Travellers or group transport according to the itinerary and group size."],
    ["Flexible itinerary", "Adjust nights, sightseeing and stops around your priorities rather than following a rigid fixed plan."],
    ["Family and group options", "Coordinate travel for couples, families, friends and larger groups with suitable logistics."],
    ["Travel coordination", "Keep agreed bookings and journey arrangements organized before and during the planned trip."]
  ] : isService ? [
    ["Personalized planning", "Start with your dates, group size, destination preferences and budget so the itinerary matches your requirement."],
    ["Transport coordination", "Arrange suitable private or group transport based on the route, number of travelers and travel style."],
    ["Accommodation", "Discuss practical hotel categories and locations that fit the itinerary and comfort level you choose."],
    ["Group logistics", "Coordinate multiple travelers, rooms, transfers and sightseeing requirements through one travel plan."],
    ["Flexible options", "Adapt the plan when your destination, duration, budget or travel priorities change before confirmation."],
    ["End-to-end assistance", "Get a clear proposal and travel coordination for the arrangements handled by Only Road Trip."]
  ] : [
    ["Customized itineraries", `Plan your ${config.eyebrow.replace(" Tour Packages", "").replace(" Packages", "")} trip around your dates and travel style.`],
    ["Comfortable stays", "Choose accommodation options according to location, comfort level, group size and budget."],
    ["Private and group transport", "Coordinate cars, SUVs, Tempo Travellers or other suitable vehicles for your route."],
    ["Sightseeing planning", "Build a sensible sightseeing schedule with enough time for travel, rest and experiences."],
    ["Family and couple options", "Customize the trip for families, couples, friends or larger groups."],
    ["Travel support", "Get practical assistance with the agreed travel arrangements from planning through the journey."]
  ];
  const faqs = isLocal ? [
    [`Why choose a travel agent in this location?`, "A local-facing travel service can make it easier to discuss departure points, group size, budgets and customized itineraries before booking."],
    ["Can I book trips outside my city?", "Yes. Only Road Trip plans travel across India and can coordinate trips from the city or departure point that works for your itinerary."],
    ["Can you arrange family and group travel?", "Yes. Family, friends, community and corporate groups can request customized transport, stays and sightseeing."],
    ["How do I request a quote?", "Use the contact page to share your destination, dates, travelers and requirements. The travel team can then prepare suitable options."]
  ] : [
    [`Can I customize this ${isPackage ? "package" : "tour"}?`, "Yes. Dates, duration, hotels, transport, sightseeing and route details can be discussed according to your requirements."],
    ["Can you plan this trip from Delhi?", "Yes. Delhi can be used as a departure point for many domestic routes. Share your dates and group size so the route can be planned appropriately."],
    ["Do you offer private transport?", "Private cars, SUVs and larger vehicles can be discussed depending on the route, group size and availability."],
    ["How do I get a quote?", "Send your destination, dates, number of travelers, preferred hotel category and any special requirements through the contact page."]
  ];
  return { services, faqs };
}

export default function SeoLandingPage({ config }: { config: SeoPageConfig }) {
  const url = `${baseUrl}/${config.slug}`; const { services, faqs } = content(config);
  const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: config.eyebrow, item: url }] }, { "@type": "Service", "@id": `${url}#service`, name: config.eyebrow, serviceType: config.eyebrow, provider: { "@type": "TravelAgency", name: "Only Road Trip", url: baseUrl }, areaServed: { "@type": "Country", name: "India" }, url }] };
  return <main className="min-h-screen bg-white text-slate-900"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="relative overflow-hidden border-b border-slate-100 bg-white"><div className="absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-blue-50 blur-3xl" /><div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-slate-100 blur-3xl" /><div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40"><div className="max-w-4xl"><div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-800">{config.eyebrow}</div><h1 className="mt-7 text-5xl font-semibold leading-[1.06] tracking-tight text-slate-950 md:text-6xl">{config.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">{config.intro}</p><div className="mt-8 flex flex-wrap gap-3">{config.highlights.map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">✓ {item}</span>)}</div><div className="mt-9 flex flex-wrap gap-4"><Link href="/contact" className="rounded-full bg-blue-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:bg-blue-900">Get a Free Quote</Link><Link href="/packages" className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 hover:border-blue-300 hover:text-blue-800">Explore Packages</Link></div></div></div></section>
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">Only Road Trip</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Travel planning built around your actual requirements.</h2><p className="mt-5 text-base leading-8 text-slate-600">Tell us your dates, group size, preferred comfort level and budget. We can shape the itinerary, transport and accommodation around your trip instead of forcing you into a one-size-fits-all plan.</p></div><div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map(([title,text]) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><h3 className="text-xl font-semibold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></section>
    <section className="bg-slate-50"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">How it works</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Simple process. Clear communication.</h2><p className="mt-4 text-slate-600">Share your requirements, review the proposed plan and confirm the arrangements you want.</p></div><div className="grid gap-5 sm:grid-cols-3">{[["01","Share your plan"],["02","Review the itinerary"],["03","Confirm and travel"]].map(([n,t]) => <div key={n} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-sm font-bold text-blue-800">{n}</span><h3 className="mt-3 font-semibold text-slate-950">{t}</h3></div>)}</div></div></div></section>
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">FAQs</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Frequently asked questions</h2><div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6">{faqs.map(([q,a]) => <details key={q} className="group py-6"><summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-900">{q}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{a}</p></details>)}</div></section>
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8"><div className="rounded-[2rem] bg-blue-900 px-8 py-12 text-white md:px-12"><h2 className="text-3xl font-semibold">Ready to plan your journey?</h2><p className="mt-3 max-w-2xl text-blue-100">Get a customized proposal from Only Road Trip based on your dates, group size and travel preferences.</p><Link href="/contact" className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-900 hover:bg-blue-50">Talk to Our Travel Team</Link></div></section>
  </main>;
}
