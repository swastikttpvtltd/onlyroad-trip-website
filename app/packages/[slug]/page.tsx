import ItineraryAccordion from "@/components/package/ItineraryAccordion";
import PackageGallerySlider from "@/components/package/PackageGallerySlider";
import BookingSummaryCard from "@/components/package/BookingSummaryCard";
import InclusionsExclusions from "@/components/package/InclusionsExclusions";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";

type PackageItem = any;
type PageProps = { params: Promise<{ slug: string }> };

type StateDetails = { name: string; famousFor: string };

const stateDetails: Record<string, StateDetails> = {
  Gujarat: { name: "Gujarat", famousFor: "Gujarat is famous for the Rann of Kutch, Gir National Park, Dwarka and Somnath, vibrant handicrafts, Gujarati cuisine and rich heritage." },
  Rajasthan: { name: "Rajasthan", famousFor: "Rajasthan is famous for royal forts and palaces, Jaipur, Udaipur, Jaisalmer, Jodhpur, desert landscapes, folk culture and colourful traditions." },
  Uttarakhand: { name: "Uttarakhand", famousFor: "Uttarakhand is famous for the Char Dham, Kedarnath and Badrinath, Himalayan landscapes, spiritual centres, rivers, trekking and adventure tourism." },
  "Uttar Pradesh": { name: "Uttar Pradesh", famousFor: "Uttar Pradesh is famous for the Taj Mahal, Ayodhya, Varanasi, Mathura-Vrindavan, historic cities, spiritual traditions and the Ganga." },
  Kashmir: { name: "Kashmir", famousFor: "Kashmir is famous for Srinagar, Dal Lake, Gulmarg, Pahalgam, Sonamarg, Himalayan scenery, houseboats and gardens." },
  "Jammu & Kashmir": { name: "Jammu & Kashmir", famousFor: "Jammu & Kashmir is famous for the Himalayas, Kashmir Valley, Dal Lake, Gulmarg, Pahalgam, Vaishno Devi and spectacular mountain landscapes." },
  "Himachal Pradesh": { name: "Himachal Pradesh", famousFor: "Himachal Pradesh is famous for Shimla, Manali, Dharamshala, Dalhousie, snow-covered mountains, valleys, trekking and scenic road trips." },
  Ladakh: { name: "Ladakh", famousFor: "Ladakh is famous for Leh, high-altitude mountain passes, monasteries, Pangong Lake, Nubra Valley, dramatic landscapes and adventure road trips." },
  Punjab: { name: "Punjab", famousFor: "Punjab is famous for the Golden Temple in Amritsar, Sikh heritage, Punjabi cuisine, vibrant culture and historic sites." },
  Kerala: { name: "Kerala", famousFor: "Kerala is famous for backwaters, Munnar tea plantations, Alleppey houseboats, beaches, Ayurveda, lush landscapes and distinctive cuisine." },
  Goa: { name: "Goa", famousFor: "Goa is famous for beaches, Portuguese heritage, churches, coastal villages, seafood, nightlife and relaxed tropical holidays." },
  Maharashtra: { name: "Maharashtra", famousFor: "Maharashtra is famous for Mumbai, Lonavala, historic forts, Ajanta-Ellora, Shirdi and diverse coastal and cultural experiences." },
  "Madhya Pradesh": { name: "Madhya Pradesh", famousFor: "Madhya Pradesh is famous for Khajuraho, Ujjain Mahakaleshwar, Sanchi, national parks and rich central Indian culture." },
  Sikkim: { name: "Sikkim", famousFor: "Sikkim is famous for Gangtok, Himalayan views, monasteries, high mountain landscapes and scenic North Sikkim." },
  "West Bengal": { name: "West Bengal", famousFor: "West Bengal is famous for Kolkata, Darjeeling, the Sundarbans, Bengali culture, colonial heritage and tea gardens." },
  Assam: { name: "Assam", famousFor: "Assam is famous for Kaziranga National Park, tea gardens, the Brahmaputra, wildlife, Guwahati and Northeast Indian culture." },
  Meghalaya: { name: "Meghalaya", famousFor: "Meghalaya is famous for Shillong, Cherrapunji, waterfalls, living root bridges, caves and green hills." },
  Karnataka: { name: "Karnataka", famousFor: "Karnataka is famous for Bengaluru, Mysuru, Hampi, Coorg, heritage monuments, coffee plantations and temples." },
  "Tamil Nadu": { name: "Tamil Nadu", famousFor: "Tamil Nadu is famous for ancient temples, Madurai, Rameswaram, Ooty, classical culture and heritage architecture." },
  "Andaman & Nicobar Islands": { name: "Andaman & Nicobar Islands", famousFor: "The Andaman & Nicobar Islands are famous for tropical beaches, coral reefs, marine life, island experiences and Port Blair." },
  "Andaman and Nicobar Islands": { name: "Andaman & Nicobar Islands", famousFor: "The Andaman & Nicobar Islands are famous for tropical beaches, coral reefs, marine life, island experiences and Port Blair." },
  "Andhra Pradesh": { name: "Andhra Pradesh", famousFor: "Andhra Pradesh is famous for Tirupati, temple heritage, Visakhapatnam, Araku Valley, beaches and South Indian culture." },
};

function getStateDetails(state: string): StateDetails {
  const normalized = String(state ?? "").trim();
  return stateDetails[normalized] ?? {
    name: normalized || "India",
    famousFor: `${normalized || "This destination"} is known for its distinctive landscapes, culture, heritage, local cuisine and travel experiences.`,
  };
}

function heroImage(pkg: PackageItem): string {
  return String(pkg?.image ?? pkg?.hero?.image ?? "/images/package-placeholder.jpg");
}

function galleryImages(pkg: PackageItem) {
  if (Array.isArray(pkg.gallery) && pkg.gallery.length) return pkg.gallery;
  return [{ image: heroImage(pkg), alt: `${pkg.title} – image 1` }];
}

function numberField(pkg: PackageItem, key: "price" | "rating" | "reviews"): number | undefined {
  const value = pkg?.[key];
  return typeof value === "number" ? value : undefined;
}

function destinationsFor(pkg: PackageItem) {
  return String(pkg.destination ?? "")
    .split(/[•,&/]/)
    .map((x: string) => x.trim())
    .filter(Boolean)
    .map((name: string) => ({
      name,
      famous: `${name} is an important stop on this ${String(pkg.category ?? "tour").toLowerCase()} journey, known for local attractions, culture and destination-specific experiences.`,
      experience: `This package covers ${name} according to the published day-wise itinerary, focusing on relevant sightseeing and route highlights.`,
    }));
}

function faqItems(pkg: PackageItem, state: StateDetails) {
  return [
    { question: `What can I expect from this ${pkg.title} itinerary?`, answer: `This ${pkg.duration} ${String(pkg.category ?? "tour").toLowerCase()} journey covers ${pkg.destination} according to the published day-wise itinerary, with the listed sightseeing, accommodation, meals and inclusions.` },
    { question: `What is ${state.name} famous for?`, answer: state.famousFor },
    { question: "Is this package suitable for families and groups?", answer: "The package is designed around the published group size, difficulty level and itinerary. Families and groups can request suitable customisation before confirming the booking." },
    { question: `Can I customise this ${state.name} tour package?`, answer: `Yes. You can discuss travel dates, group size, accommodation preference, sightseeing or route requirements with Only Road Trip before booking.` },
    { question: `What is the best time to travel to ${state.name}?`, answer: `The package's recommended travel period is shown in the Best Time field. Weather, road conditions, local events and seasonal closures can affect ideal dates.` },
    { question: "What is included in this tour package?", answer: "The exact inclusions and exclusions are listed in the Tour Inclusions & Exclusions section on this page." },
  ];
}

function travelPlanningNotes(state: StateDetails) {
  return [
    `Check the published duration, Best Time, difficulty and group-size information before choosing dates for this ${state.name} journey.`,
    "Use the day-wise itinerary as the primary route reference. Sightseeing order can change when local operating conditions require it.",
    "For families, senior travellers or larger groups, discuss vehicle, hotel and pacing requirements before booking.",
    "Before departure, reconfirm final inclusions, exclusions, hotel category, transfers and seasonal restrictions with the travel team.",
  ];
}

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: String(pkg.slug) })).filter((item) => item.slug);
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug) as PackageItem | undefined;
  if (!pkg) return { title: "Package Not Found | Only Road Trip", robots: "noindex" };

  const seoKeywords: string[] = Array.isArray(pkg.seoKeywords)
    ? pkg.seoKeywords.map((value: unknown) => String(value))
    : [pkg.title, pkg.destination, pkg.state].filter(Boolean).map(String);
  const aliasText = seoKeywords.slice(0, 4).join(", ");

  return {
    title: `${pkg.title} | Only Road Trip`,
    description: `${pkg.overview} Search for this journey as ${aliasText}.`,
    keywords: seoKeywords,
    alternates: { canonical: `https://www.onlyroadtrip.com/packages/${slug}` },
    openGraph: {
      title: `${pkg.title} | Only Road Trip`,
      description: `${pkg.overview} Explore ${aliasText}.`,
      url: `https://www.onlyroadtrip.com/packages/${slug}`,
      siteName: "Only Road Trip",
      locale: "en_IN",
      type: "website",
      images: [{ url: heroImage(pkg), alt: pkg.title }],
    },
  };
}

export default async function PackageDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug) as PackageItem | undefined;
  if (!pkg) notFound();

  const image = heroImage(pkg);
  const gallery = galleryImages(pkg);
  const price = numberField(pkg, "price");
  const places = destinationsFor(pkg);
  const state = getStateDetails(pkg.state);
  const faqs = faqItems(pkg, state);
  const planningNotes = travelPlanningNotes(state);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative h-[430px] overflow-hidden">
        <Image src={image} alt={pkg.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 mx-auto max-w-7xl px-5 md:px-8"><div className="flex h-full items-end pb-10 sm:pb-12"><div className="max-w-4xl text-white">
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide"><span className="rounded bg-orange-500 px-3 py-1.5">{pkg.category}</span><span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">{state.name}</span><span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">Package ID: {pkg.packageId}</span></div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{state.name}</p><h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{state.name}</h1><p className="mt-4 max-w-4xl text-base leading-7 text-white/90 md:text-lg">{state.famousFor}</p><p className="mt-3 text-sm font-semibold text-white/75">Package: {pkg.title}</p>
        </div></div></div>
      </section>
      <div className="sticky top-0 z-30 border-b bg-white shadow-sm"><div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold md:px-8">{[['overview', 'Overview'], ['gallery', 'Gallery'], ['itinerary', 'Itinerary'], ['places', 'Places Covered'], ['inclusions', 'Inclusions'], ['hotels', 'Stay & Meals'], ['faqs', 'FAQs']].map(([id, label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>)}</div></div>
      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-8 md:px-8 lg:grid-cols-[1fr_350px]"><div className="space-y-7">
        <section className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-4"><Fact label="Package ID" value={String(pkg.packageId ?? "—")} /><Fact label="Duration" value={String(pkg.duration ?? "—")} /><Fact label="Destination" value={String(pkg.destination ?? "—")} /><Fact label="Best Time" value={String(pkg.bestTime ?? "—")} /></section>
        <ContentCard id="overview" title="Tour Overview"><p className="leading-8 text-slate-600">{pkg.overview}</p><div className="mt-6 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5"><h3 className="font-bold">About {state.name}</h3><p className="mt-2 leading-7 text-slate-600">{state.famousFor}</p></div><h3 className="mt-7 text-xl font-bold">Tour Highlights</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{(Array.isArray(pkg.highlights) ? pkg.highlights : []).map((x: string) => <div key={x} className="flex gap-3 rounded-lg bg-slate-50 p-4"><span className="text-orange-500">✓</span><span>{x}</span></div>)}</div></ContentCard>
        <ContentCard id="gallery" title="Tour Gallery"><PackageGallerySlider images={gallery} /></ContentCard>
        <ContentCard id="itinerary" title="Day-wise Itinerary"><ItineraryAccordion itinerary={Array.isArray(pkg.itinerary) ? pkg.itinerary : []} destination={String(pkg.destination ?? "")} category={String(pkg.category ?? "Tour")} /></ContentCard>
        <ContentCard id="places" title="Places Covered & What They Are Famous For"><div className="space-y-4">{places.map((place) => <div key={place.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-extrabold text-slate-900">{place.name}</h3><p className="mt-2 text-sm leading-7 text-slate-600"><strong>Famous for:</strong> {place.famous}</p><p className="mt-2 text-sm leading-7 text-slate-600"><strong>Experience:</strong> {place.experience}</p></div>)}</div></ContentCard>
        <ContentCard id="inclusions" title="Tour Inclusions & Exclusions"><InclusionsExclusions inclusions={Array.isArray(pkg.inclusions) ? pkg.inclusions : []} exclusions={Array.isArray(pkg.exclusions) ? pkg.exclusions : []} /></ContentCard>
        <ContentCard id="hotels" title="Stay & Meals"><div className="grid gap-6 md:grid-cols-2"><InfoColumn title="Hotels">{Array.isArray(pkg.hotels) && pkg.hotels.length ? <ul className="space-y-2 text-slate-600">{pkg.hotels.map((hotel: any, index: number) => <li key={`${hotel?.name ?? "hotel"}-${index}`}>• {hotel?.name ?? "3-Star Hotel / Similar"}</li>)}</ul> : <p className="text-slate-600">3-Star Hotel / Similar</p>}</InfoColumn><InfoColumn title="Meals">{Array.isArray(pkg.meals) && pkg.meals.length ? <ul className="space-y-2 text-slate-600">{pkg.meals.map((meal: string, index: number) => <li key={`${meal}-${index}`}>• {meal}</li>)}</ul> : <p className="text-slate-600">Breakfast and Dinner</p>}</InfoColumn></div></ContentCard>
        <ContentCard id="faqs" title="Frequently Asked Questions"><div className="space-y-3">{faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer list-none pr-6 font-bold text-slate-900 marker:hidden"><span className="flex items-center justify-between gap-4">{faq.question}<span className="text-xl text-blue-700 transition group-open:rotate-45">+</span></span></summary><p className="mt-4 leading-7 text-slate-600">{faq.answer}</p></details>)}</div></ContentCard>
        <ContentCard id="travel-planning" title={`Planning Your ${state.name} Trip`}><div className="grid gap-3 md:grid-cols-2">{planningNotes.map((note) => <div key={note} className="rounded-xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-700">{note}</div>)}</div></ContentCard>
      </div><aside className="h-fit lg:sticky lg:top-20"><BookingSummaryCard slug={String(pkg.slug)} title={String(pkg.title)} price={price} duration={String(pkg.duration ?? "")} destination={String(pkg.destination ?? "")} /></aside></section>
    </main>
  );
}

function InfoColumn({ title, children }: { title: string; children: ReactNode }) { return <div className="min-w-0"><h3 className="mb-3 text-base font-bold text-slate-900">{title}</h3>{children}</div>; }
function ContentCard({ id, title, children }: { id: string; title: string; children: ReactNode }) { return <section id={id} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm md:p-7"><h2 className="border-b pb-4 text-2xl font-extrabold text-[#153e75]">{title}</h2><div className="pt-5">{children}</div></section>; }
function Fact({ label, value }: { label: string; value: string }) { return <div className="border-r last:border-0"><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>; }
