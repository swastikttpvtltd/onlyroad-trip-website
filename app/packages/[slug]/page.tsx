import ItineraryAccordion from "@/components/package/ItineraryAccordion";
import PackageGallerySlider from "@/components/package/PackageGallerySlider";
import BookingSummaryCard from "@/components/package/BookingSummaryCard";
import InclusionsExclusions from "@/components/package/InclusionsExclusions";
import HotelCard from "@/components/HotelCard";
import { hotels as recommendedHotels } from "@/data/hotels";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";
import { packageMedia } from "@/data/packageMedia";

type PackageItem = any;
type PageProps = { params: Promise<{ slug: string }> };
type StateDetails = { name: string; famousFor: string };

const baseUrl = "https://www.onlyroadtrip.com";

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
  return stateDetails[normalized] ?? { name: normalized || "India", famousFor: `${normalized || "This destination"} is known for its distinctive landscapes, culture, heritage, local cuisine and travel experiences.` };
}

function normalizeSlug(value: unknown): string {
  return String(value ?? "").trim().toLowerCase();
}

function heroImage(pkg: PackageItem): string {
  return String(pkg?.image ?? pkg?.hero?.image ?? "/images/package-placeholder.jpg");
}

function galleryImages(pkg: PackageItem) {
  if (Array.isArray(pkg.gallery) && pkg.gallery.length) return pkg.gallery;
  const slug = String(pkg?.slug ?? "").trim();
  const mediaEntry = Object.entries(packageMedia).find(([key]) => key.endsWith(`/${slug}`));
  if (mediaEntry && Array.isArray(mediaEntry[1]) && mediaEntry[1].length) {
    return mediaEntry[1].map((image, index) => ({ image, alt: `${pkg.title} – image ${index + 1}` }));
  }
  return [{ image: heroImage(pkg), alt: `${pkg.title} – image 1` }];
}

function numberField(pkg: PackageItem, key: "price" | "rating" | "reviews"): number | undefined {
  const value = pkg?.[key];
  return typeof value === "number" ? value : undefined;
}

function cleanText(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function metadataDescription(pkg: PackageItem, state: StateDetails): string {
  const overview = cleanText(pkg?.overview);
  const destination = cleanText(pkg?.destination);
  const duration = cleanText(pkg?.duration);
  const title = cleanText(pkg?.title);

  const source = overview || `Explore ${title || "this journey"} with Only Road Trip across ${destination || state.name}.`;
  const suffix = `${duration ? ` ${duration}.` : ""} Thoughtfully planned travel across India with Only Road Trip.`;
  const combined = `${source}${suffix}`;

  if (combined.length <= 160) return combined;
  const shortened = combined.slice(0, 157).replace(/\s+\S*$/, "").trim();
  return `${shortened}...`;
}

function travelPlanningNotes(state: StateDetails) {
  return [
    `Check the published duration, Best Time, difficulty and group-size information before choosing dates for this ${state.name} journey.`,
    "Use the day-wise itinerary as the primary route reference. Sightseeing order can change when local operating conditions require it.",
    "For families, senior travellers or larger groups, discuss vehicle, hotel and pacing requirements before booking.",
    "Before departure, reconfirm final inclusions, exclusions, hotel category, transfers and seasonal restrictions with the travel team.",
  ];
}

function relatedTravelLinks(pkg: PackageItem) {
  const category = cleanText(pkg?.category).toLowerCase();
  const title = cleanText(pkg?.title).toLowerCase();
  const links: { label: string; href: string }[] = [
    { label: "Explore India Tour Packages", href: "/packages" },
  ];

  if (
    category.includes("pilgrimage") ||
    category.includes("spiritual") ||
    title.includes("kedarnath") ||
    title.includes("char dham") ||
    title.includes("vaishno") ||
    title.includes("ayodhya") ||
    title.includes("varanasi")
  ) {
    links.push(
      { label: "Char Dham Yatra Packages", href: "/char-dham-yatra-package" },
      { label: "Kedarnath Yatra Packages", href: "/kedarnath-yatra-package" }
    );
  }

  if (category.includes("corporate") || category.includes("mice")) {
    links.push(
      { label: "Corporate Travel Management", href: "/corporate-travel" },
      { label: "Corporate MICE Travel", href: "/corporate-mice-travel" }
    );
  }

  if (category.includes("women") || title.includes("women")) {
    links.push({
      label: "Solo & Women Travel Packages",
      href: "/solo-women-travel-packages",
    });
  }

  return links;
}

function faqItems(pkg: PackageItem, state: StateDetails) {
  return [
    { question: `What is included in the ${pkg.title} package?`, answer: "The exact inclusions and exclusions are listed in the Tour Inclusions & Exclusions section on this page." },
    { question: `What is the best time to travel to ${state.name}?`, answer: `The recommended travel period is shown in the Best Time field above. Weather and local operating conditions can affect the ideal travel dates.` },
    { question: `Can this ${pkg.title} itinerary be customised?`, answer: "Yes. Travel dates, group size, accommodation preferences, sightseeing pace and other requirements can be discussed with Only Road Trip before booking." },
    { question: "Is this package suitable for families and groups?", answer: "Suitability depends on the published itinerary, walking requirements, travel duration and group needs. Families and groups can request suitable customisation before confirmation." },
    { question: "What should I check before booking?", answer: "Please review the day-wise itinerary, inclusions, exclusions, hotel category, meals, travel dates and any seasonal or local restrictions before confirming the booking." },
  ];
}

function packageStructuredData(
  pkg: PackageItem,
  state: StateDetails,
  slug: string
) {
  const baseUrl = "https://www.onlyroadtrip.com";
  const normalizedSlug = normalizeSlug(slug);
  const canonicalUrl = `${baseUrl}/packages/${encodeURIComponent(normalizedSlug)}`;
  const image = heroImage(pkg);

  const itineraryItems = Array.isArray(pkg.itinerary)
    ? pkg.itinerary.map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name:
          typeof item === "string"
            ? cleanText(item)
            : cleanText(
                item?.title ||
                  item?.heading ||
                  `Day ${index + 1}`
              ),
        description:
          typeof item === "object"
            ? cleanText(item?.description || item?.details || "")
            : undefined,
      }))
    : [];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${canonicalUrl}#tourist-trip`,
    name: cleanText(pkg.title),
    description: cleanText(pkg.overview),
    url: canonicalUrl,
    image: `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`,
    touristType: [
      "Pilgrimage",
      "Domestic Travel",
      "India Travel",
      "Senior Citizens",
      "Family",
      "Solo Travelers",
    ],
    provider: {
      "@type": "TravelAgency",
      "@id": `${baseUrl}/#organization`,
      name: "Only Road Trip",
      url: baseUrl,
    },
    itinerary: {
      "@type": "ItemList",
      name: `${cleanText(pkg.title)} Itinerary`,
      numberOfItems:
        itineraryItems.length > 0 ? itineraryItems.length : undefined,
      itemListElement:
        itineraryItems.length > 0 ? itineraryItems : undefined,
    },
    areaServed: {
      "@type": "State",
      name: cleanText(state.name),
    },
  };

  if (pkg.price) {
    const numericPrice = String(pkg.price).replace(/[^0-9.]/g, "");

    if (numericPrice) {
      schema.offers = {
        "@type": "Offer",
        priceCurrency: "INR",
        price: numericPrice,
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      };
    }
  }

  return schema;
}

export function generateStaticParams() {
  return packages
    .map((pkg) => ({ slug: normalizeSlug(pkg.slug) }))
    .filter((item) => item.slug);
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const pkg = packages.find((item) => normalizeSlug(item.slug) === normalizedSlug) as PackageItem | undefined;

  if (!pkg) {
    return {
      title: "Package Not Found | Only Road Trip",
      robots: { index: false, follow: false },
    };
  }

  const title = cleanText(pkg.title) || "India Tour Package";
  const state = getStateDetails(cleanText(pkg.state));
  const description = metadataDescription(pkg, state);
  const canonicalPath = `/packages/${encodeURIComponent(normalizedSlug)}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const image = heroImage(pkg);
  const seoKeywords: string[] = Array.isArray(pkg.seoKeywords)
    ? pkg.seoKeywords.map((value: unknown) => cleanText(value)).filter(Boolean)
    : [title, cleanText(pkg.destination), cleanText(pkg.state)].filter(Boolean);

  return {
    title,
    description,
    keywords: seoKeywords.length ? seoKeywords : undefined,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: "Only Road Trip",
      title: `${title} | Only Road Trip`,
      description,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Only Road Trip`,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export default async function PackageDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);
  const pkg = packages.find((item) => normalizeSlug(item.slug) === normalizedSlug) as PackageItem | undefined;

  if (!pkg) notFound();

  const state = getStateDetails(cleanText(pkg.state));
  const gallery = galleryImages(pkg);
  const price = numberField(pkg, "price");
  const rating = numberField(pkg, "rating");
  const reviews = numberField(pkg, "reviews");
  const faqs = faqItems(pkg, state);
  const planningNotes = travelPlanningNotes(state);
  const relatedLinks = relatedTravelLinks(pkg);
  const isSpiritualTriangle = /kashi|varanasi/i.test(cleanText(pkg.title)) && /ayodhya|prayagraj|allahabad/i.test(cleanText(pkg.destination));

  const structuredData = packageStructuredData(pkg, state, normalizedSlug);
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <section className="relative h-[430px] overflow-hidden"><Image src={heroImage(pkg)} alt={pkg.title} fill priority sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" /><div className="absolute inset-0 mx-auto max-w-7xl px-5 md:px-8"><div className="flex h-full items-end pb-10 sm:pb-12"><div className="max-w-4xl text-white"><div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide"><span className="rounded bg-orange-500 px-3 py-1.5">{pkg.category}</span><span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">{state.name}</span><span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">Package ID: {pkg.packageId}</span></div><p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{state.name}</p><h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{pkg.title}</h1><p className="mt-4 max-w-4xl text-base leading-7 text-white/90 md:text-lg">{pkg.vibeHook ?? state.famousFor}</p><p className="mt-3 text-sm font-semibold text-white/75">{pkg.duration} • {pkg.destination}</p></div></div></div></section>
      <div className="sticky top-0 z-30 border-b bg-white shadow-sm"><div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold md:px-8">{[['overview', 'Overview'], ['gallery', 'Gallery'], ['itinerary', 'Itinerary'], ['inclusions', 'Inclusions'], ['hotels', 'Stay & Meals'], ['faqs', 'FAQ']].map(([id, label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>)}</div></div>
      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-8 md:px-8 lg:grid-cols-[1fr_350px]"><div className="space-y-7">
        <section className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-4"><Fact label="Package ID" value={String(pkg.packageId ?? "—")} /><Fact label="Duration" value={String(pkg.duration ?? "—")} /><Fact label="Destination" value={String(pkg.destination ?? "—")} /><Fact label="Best Time" value={String(pkg.bestTime ?? "—")} /></section>
        <ContentCard id="overview" title="Tour Overview"><p className="leading-8 text-slate-600">{pkg.overview}</p><div className="mt-6 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5"><h3 className="font-bold">About {state.name}</h3><p className="mt-2 leading-7 text-slate-600">{state.famousFor}</p></div><h3 className="mt-7 text-xl font-bold">Tour Highlights</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{(Array.isArray(pkg.highlights) ? pkg.highlights : []).map((x: string) => <div key={x} className="flex gap-3 rounded-lg bg-slate-50 p-4"><span className="text-orange-500">✓</span><span>{x}</span></div>)}</div></ContentCard>
        <ContentCard id="gallery" title="Tour Gallery"><PackageGallerySlider gallery={gallery} title={pkg.title} /></ContentCard>
        <ContentCard id="itinerary" title="Day-wise Itinerary"><ItineraryAccordion itinerary={Array.isArray(pkg.itinerary) ? pkg.itinerary : []} destination={String(pkg.destination ?? "")} category={String(pkg.category ?? "Tour")} vibeHook={pkg.vibeHook} packageTitle={String(pkg.title ?? "")} packageId={String(pkg.packageId ?? "")} duration={String(pkg.duration ?? "")} overview={String(pkg.overview ?? "")} highlights={Array.isArray(pkg.highlights) ? pkg.highlights : []} inclusions={Array.isArray(pkg.inclusions) ? pkg.inclusions : []} exclusions={Array.isArray(pkg.exclusions) ? pkg.exclusions : []} groupRates={pkg.groupRates} sharingRates={Array.isArray(pkg.groupRates?.sharingRates) ? pkg.groupRates.sharingRates : []} bestTime={String(pkg.bestTime ?? "")} hotels={Array.isArray(pkg.hotels) ? pkg.hotels : []} meals={Array.isArray(pkg.meals) ? pkg.meals : []} /></ContentCard>
        {isSpiritualTriangle ? <ContentCard id="recommended-stays" title="Recommended 3★ Night Stays"><p className="mb-5 text-sm leading-6 text-slate-600">Recommended stay options are shown for the overnight destinations in this itinerary. Final hotel allocation remains subject to availability and confirmation.</p><div className="grid gap-6 md:grid-cols-2"><HotelCard {...recommendedHotels.varanasi} /><HotelCard {...recommendedHotels.prayagraj} /><HotelCard {...recommendedHotels.ayodhya} /></div></ContentCard> : null}
        <ContentCard id="inclusions" title="Tour Inclusions & Exclusions"><InclusionsExclusions inclusions={Array.isArray(pkg.inclusions) ? pkg.inclusions : []} exclusions={Array.isArray(pkg.exclusions) ? pkg.exclusions : []} /></ContentCard>
        <ContentCard id="hotels" title="Stay & Meals"><div className="grid gap-6 md:grid-cols-2"><InfoColumn title="Hotels">{Array.isArray(pkg.hotels) && pkg.hotels.length ? pkg.hotels.map((hotel: any) => <div key={hotel.name} className="rounded-xl bg-slate-50 p-4"><p className="font-bold">{hotel.name}</p><p className="mt-1 text-sm text-slate-500">{hotel.category}</p></div>) : <p className="text-sm text-slate-500">Accommodation details will be confirmed before booking.</p>}</InfoColumn><InfoColumn title="Meals">{Array.isArray(pkg.meals) && pkg.meals.length ? pkg.meals.map((meal: string) => <div key={meal} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{meal}</div>) : <p className="text-sm text-slate-500">Meal plan is as per the selected package.</p>}</InfoColumn></div></ContentCard>
        <ContentCard id="faqs" title="Frequently Asked Questions"><div className="space-y-3">{faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-bold text-slate-900">{faq.question}</summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</div></ContentCard>
        <ContentCard title="Travel Planning Notes"><div className="space-y-3">{planningNotes.map((note) => <div key={note} className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{note}</div>)}</div></ContentCard>
        {relatedLinks.length > 0 ? <ContentCard title="Explore Related Travel"><div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold"><span className="text-slate-500">Related journeys:</span>{relatedLinks.map((link) => <Link key={link.href} href={link.href} className="text-blue-800 hover:text-orange-600 hover:underline">{link.label}</Link>)}</div></ContentCard> : null}
      </div><aside className="lg:sticky lg:top-24 lg:h-fit"><BookingSummaryCard pkg={pkg} price={price} /></aside></section>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 font-bold text-slate-900">{value}</p></div>;
}

function ContentCard({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return <section id={id} className="rounded-2xl bg-white p-6 shadow-sm md:p-7"><h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2><div className="mt-5">{children}</div></section>;
}

function InfoColumn({ title, children }: { title: string; children: ReactNode }) {
  return <div><h3 className="mb-3 text-lg font-bold text-slate-900">{title}</h3><div className="space-y-3">{children}</div></div>;
}
