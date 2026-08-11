import ItineraryAccordion from "@/components/package/ItineraryAccordion";
import BackToPackagesButton from "@/components/BackToPackagesButton";
import PackageGallerySlider from "@/components/package/PackageGallerySlider";
import BookingSummaryCard from "@/components/package/BookingSummaryCard";
import InclusionsExclusions from "@/components/package/InclusionsExclusions";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";
import { getPackageMediaFallback, getPackagePrimaryImage } from "@/data/packageMediaFallback";

type PackageItem = (typeof packages)[number];
type PageProps = { params: Promise<{ slug: string }> };

const stateDetails: Record<string, { name: string; famousFor: string }> = {
  Gujarat: { name: "Gujarat", famousFor: "Gujarat is famous for the Rann of Kutch, Gir National Park, Dwarka and Somnath, its vibrant handicrafts, Gujarati cuisine and rich heritage." },
  Rajasthan: { name: "Rajasthan", famousFor: "Rajasthan is famous for royal forts and palaces, Jaipur, Udaipur, Jaisalmer, Jodhpur, desert landscapes, folk culture and colourful traditions." },
  Uttarakhand: { name: "Uttarakhand", famousFor: "Uttarakhand is famous for the Char Dham, Kedarnath and Badrinath, Himalayan landscapes, spiritual centres, rivers, trekking and adventure tourism." },
  "Uttar Pradesh": { name: "Uttar Pradesh", famousFor: "Uttar Pradesh is famous for the Taj Mahal, Ayodhya, Varanasi, Mathura-Vrindavan, historic cities, spiritual traditions and the Ganga." },
  Kashmir: { name: "Kashmir", famousFor: "Kashmir is famous for Srinagar, Dal Lake, Gulmarg, Pahalgam, Sonamarg, Himalayan scenery, houseboats, gardens and its distinctive local culture." },
  "Jammu & Kashmir": { name: "Jammu & Kashmir", famousFor: "Jammu & Kashmir is famous for the Himalayas, Kashmir Valley, Dal Lake, Gulmarg, Pahalgam, Vaishno Devi and spectacular mountain landscapes." },
  "Himachal Pradesh": { name: "Himachal Pradesh", famousFor: "Himachal Pradesh is famous for Shimla, Manali, Dharamshala, Dalhousie, snow-covered mountains, valleys, trekking and scenic road trips." },
  Ladakh: { name: "Ladakh", famousFor: "Ladakh is famous for Leh, high-altitude mountain passes, monasteries, Pangong Lake, Nubra Valley, dramatic landscapes and adventure road trips." },
  Punjab: { name: "Punjab", famousFor: "Punjab is famous for the Golden Temple in Amritsar, Sikh heritage, Punjabi cuisine, vibrant culture, historic sites and warm hospitality." },
  Kerala: { name: "Kerala", famousFor: "Kerala is famous for its backwaters, Munnar tea plantations, Alleppey houseboats, beaches, Ayurveda, lush landscapes and distinctive cuisine." },
  Goa: { name: "Goa", famousFor: "Goa is famous for its beaches, Portuguese heritage, churches, coastal villages, seafood, nightlife and relaxed tropical holidays." },
  Maharashtra: { name: "Maharashtra", famousFor: "Maharashtra is famous for Mumbai, hill stations such as Lonavala, historic forts, Ajanta-Ellora, Shirdi and diverse coastal and cultural experiences." },
  "Madhya Pradesh": { name: "Madhya Pradesh", famousFor: "Madhya Pradesh is famous for Khajuraho, Ujjain Mahakaleshwar, Sanchi, national parks, historic heritage and rich central Indian culture." },
  Sikkim: { name: "Sikkim", famousFor: "Sikkim is famous for Gangtok, Himalayan views, monasteries, high mountain landscapes, local culture and access to scenic North Sikkim." },
  "West Bengal": { name: "West Bengal", famousFor: "West Bengal is famous for Kolkata, Darjeeling, the Sundarbans, Bengali culture, colonial heritage, tea gardens and Himalayan scenery." },
  Assam: { name: "Assam", famousFor: "Assam is famous for Kaziranga National Park, tea gardens, the Brahmaputra, wildlife, Guwahati and the cultural heritage of Northeast India." },
  Meghalaya: { name: "Meghalaya", famousFor: "Meghalaya is famous for Shillong, Cherrapunji, waterfalls, living root bridges, caves, green hills and some of Northeast India's most dramatic landscapes." },
  Karnataka: { name: "Karnataka", famousFor: "Karnataka is famous for Bengaluru, Mysuru, Hampi, Coorg, heritage monuments, coffee plantations, temples and diverse South Indian landscapes." },
  "Tamil Nadu": { name: "Tamil Nadu", famousFor: "Tamil Nadu is famous for its ancient temples, Madurai, Rameswaram, Ooty, classical culture, heritage architecture and spiritual journeys." },
  "Andaman & Nicobar Islands": { name: "Andaman & Nicobar Islands", famousFor: "The Andaman & Nicobar Islands are famous for tropical beaches, coral reefs, marine life, island experiences, water sports and historic Port Blair." },
  "Andaman and Nicobar Islands": { name: "Andaman & Nicobar Islands", famousFor: "The Andaman & Nicobar Islands are famous for tropical beaches, coral reefs, marine life, island experiences, water sports and historic Port Blair." },
  "Andhra Pradesh": { name: "Andhra Pradesh", famousFor: "Andhra Pradesh is famous for Tirupati, temple heritage, Visakhapatnam, Araku Valley, beaches and rich South Indian culture." },
};

function getStateDetails(state: string) {
  const normalized = state.trim();
  return stateDetails[normalized] ?? {
    name: normalized || "India",
    famousFor: `${normalized || "This destination"} is known for its distinctive landscapes, culture, heritage, local cuisine and destination-specific travel experiences.`,
  };
}

function heroImage(pkg: PackageItem) {
  return getPackagePrimaryImage(pkg);
}

function galleryImages(pkg: PackageItem) {
  if (pkg.gallery?.length) return pkg.gallery;

  return getPackageMediaFallback(pkg).map((image, index) => ({
    image,
    alt: `${pkg.title} – image ${index + 1}`,
  }));
}

function shortDescription(pkg: PackageItem) {
  if ("hero" in pkg && pkg.hero?.shortDescription) return pkg.hero.shortDescription;
  return pkg.overview;
}

function numberField(pkg: PackageItem, key: "price" | "rating" | "reviews") {
  if (key in pkg && typeof pkg[key] === "number") return pkg[key];
  return undefined;
}

function destinationsFor(pkg: PackageItem) {
  const names = pkg.destination.split(/[•,&/]/).map((x) => x.trim()).filter(Boolean);
  return names.map((name) => ({
    name,
    famous: `${name} is an important stop on this ${pkg.category.toLowerCase()} journey, known for its local attractions, culture and destination-specific experiences.`,
    experience: `This package covers ${name} according to the published day-wise itinerary, focusing on the relevant sightseeing and route highlights.`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((item) => item.slug === slug);
  if (!pkg) return { title: "Package Not Found | Only Road Trip", robots: "noindex" };

  const seoKeywords = Array.isArray(pkg.seoKeywords) ? pkg.seoKeywords : [pkg.title, pkg.destination, pkg.state];
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
  const pkg = packages.find((item) => item.slug === slug);
  if (!pkg) notFound();

  const image = heroImage(pkg);
  const gallery = galleryImages(pkg);
  const price = numberField(pkg, "price");
  const places = destinationsFor(pkg);
  const state = getStateDetails(pkg.state);

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-slate-800">
      <section className="relative h-[430px] overflow-hidden">
        <Image src={image} alt={pkg.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 mx-auto max-w-7xl px-5 md:px-8">
          <div className="absolute top-6 z-10 sm:top-8"><BackToPackagesButton /></div>
          <div className="flex h-full items-end pb-10 sm:pb-12">
            <div className="max-w-4xl text-white">
              <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                <span className="rounded bg-orange-500 px-3 py-1.5">{pkg.category}</span>
                <span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">{state.name}</span>
                <span className="rounded bg-white/20 px-3 py-1.5 backdrop-blur">Package ID: {pkg.packageId}</span>
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{state.name}</p>
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{state.name}</h1>
              <p className="mt-4 max-w-4xl text-base leading-7 text-white/90 md:text-lg">{state.famousFor}</p>
              <p className="mt-3 text-sm font-semibold text-white/75">Package: {pkg.title}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold md:px-8">
          {[['overview', 'Overview'], ['gallery', 'Gallery'], ['itinerary', 'Itinerary'], ['places', 'Places Covered'], ['inclusions', 'Inclusions'], ['hotels', 'Stay & Meals']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-8 md:px-8 lg:grid-cols-[1fr_350px]">
        <div className="space-y-7">
          <section className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-4">
            <Fact label="Package ID" value={pkg.packageId} />
            <Fact label="Duration" value={pkg.duration} />
            <Fact label="Destination" value={pkg.destination} />
            <Fact label="Best Time" value={pkg.bestTime} />
          </section>

          <ContentCard id="overview" title="Tour Overview">
            <p className="leading-8 text-slate-600">{pkg.overview}</p>
            <div className="mt-6 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5">
              <h3 className="font-bold">About {state.name}</h3>
              <p className="mt-2 leading-7 text-slate-600">{state.famousFor}</p>
            </div>
            <div className="mt-6 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5">
              <h3 className="font-bold">Package Theme</h3>
              <p className="mt-2 leading-7 text-slate-600">Designed as a {pkg.category.toLowerCase()} journey through {pkg.destination}. The route prioritises the package highlights with comfortable transfers, sightseeing time and destination-appropriate experiences.</p>
            </div>
            <h3 className="mt-7 text-xl font-bold">Tour Highlights</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {pkg.highlights.map((x) => <div key={x} className="flex gap-3 rounded-lg bg-slate-50 p-4"><span className="text-orange-500">✓</span><span>{x}</span></div>)}
            </div>
          </ContentCard>

          <ContentCard id="places" title="Places Covered & What They Are Famous For">
            <p className="mb-5 leading-7 text-slate-600">Every stop below is explained according to this package route.</p>
            <div className="space-y-4">
              {places.map((p, i) => (
                <div key={`${p.name}-${i}`} className="rounded-xl border p-5">
                  <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold text-white">{i + 1}</span><h3 className="text-xl font-bold">{p.name}</h3></div>
                  <p className="mt-4 text-sm font-bold text-slate-900">Famous for</p>
                  <p className="mt-1 leading-7 text-slate-600">{p.famous}</p>
                  <p className="mt-3 text-sm font-bold text-slate-900">What we cover</p>
                  <p className="mt-1 leading-7 text-slate-600">{p.experience}</p>
                </div>
              ))}
            </div>
          </ContentCard>

          <div id="gallery" className="scroll-mt-24"><PackageGallerySlider gallery={gallery} title={pkg.title} /></div>

          <ContentCard id="itinerary" title="Day-wise Tour Itinerary">
            <p className="mb-5 text-sm leading-6 text-slate-500">Click + to open the day schedule, Today&apos;s Experience and what that specific day is known for.</p>
            <ItineraryAccordion itinerary={pkg.itinerary} destination={pkg.destination} category={pkg.category} />
          </ContentCard>

          <ContentCard id="inclusions" title="Tour Inclusions & Exclusions">
            <InclusionsExclusions inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
          </ContentCard>

          <ContentCard id="hotels" title="Stay, Meals & Travel Information">
            <div className="grid gap-4 md:grid-cols-3">
              <InfoColumn title="Suggested Hotels / Similar">
                <div className="space-y-3">
                  {pkg.hotels.map((h, i) => {
                    const hotel = h as { name: string; category?: string; star?: string };
                    return (
                      <div key={`${hotel.name}-${i}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-bold text-slate-900">{hotel.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{hotel.star ?? hotel.category ?? "Comfort Stay"}</p>
                      </div>
                    );
                  })}
                </div>
              </InfoColumn>

              <InfoColumn title="Meals">
                <div className="space-y-2.5">
                  {pkg.meals.map((x) => (
                    <p key={x} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm leading-6 text-slate-700">🍽 {x}</p>
                  ))}
                </div>
              </InfoColumn>

              <InfoColumn title="Travel Information">
                <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  <p><b>Difficulty:</b> {pkg.difficulty}</p>
                  <p><b>Best Time:</b> {pkg.bestTime}</p>
                  <p><b>Group:</b> {pkg.groupSize}</p>
                </div>
              </InfoColumn>
            </div>
          </ContentCard>
        </div>

        <aside className="h-fit lg:sticky lg:top-20">
          <BookingSummaryCard slug={pkg.slug} title={pkg.title} price={price} duration={pkg.duration} destination={pkg.destination} />
        </aside>
      </section>
    </main>
  );
}

function InfoColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="mb-3 text-base font-bold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

function ContentCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm md:p-7"><h2 className="border-b pb-4 text-2xl font-extrabold text-[#153e75]">{title}</h2><div className="pt-5">{children}</div></section>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-r last:border-0"><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>;
}
