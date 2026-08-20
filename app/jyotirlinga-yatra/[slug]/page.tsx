import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, CheckCircle2, ChevronDown, Clock3, MapPin, Route, Sparkles } from "lucide-react";
import * as multiStateJyotirlingaModule from "@/data/packages/multi-state/jyotirlinga-packages";
import individualJyotirlingaPackages from "@/data/packages/multi-state/individual-jyotirlinga-packages";
import ItineraryAccordion from "@/components/package/ItineraryAccordion";
import PackageGallerySlider from "@/components/package/PackageGallerySlider";
import InclusionsExclusions from "@/components/package/InclusionsExclusions";

type PackageLike = any;

const multiStatePackages: PackageLike[] = Object.values(multiStateJyotirlingaModule).flatMap((value: any) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && Array.isArray(value.jyotirlingaPackages)) return value.jyotirlingaPackages;
  return [];
});

const allPackages: PackageLike[] = [
  ...multiStatePackages,
  ...(Array.isArray(individualJyotirlingaPackages) ? individualJyotirlingaPackages : []),
];

function canonicalSlug(slug: string) {
  return decodeURIComponent(slug).replace(/-yatra$/, "");
}

function findPackage(slug: string) {
  const requested = decodeURIComponent(slug);
  const canonical = canonicalSlug(requested);
  return allPackages.find((item) => {
    const itemSlug = String(item?.slug ?? "");
    return itemSlug === requested || itemSlug === canonical || `${itemSlug}-yatra` === requested;
  });
}

export function generateStaticParams() {
  return allPackages.flatMap((pkg) => {
    const slug = String(pkg.slug);
    return [{ slug }, ...(slug.endsWith("-yatra") ? [] : [{ slug: `${slug}-yatra` }])];
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = findPackage(slug);
  if (!pkg) return { title: "Jyotirlinga Yatra | Only Road Trip", robots: "noindex" };
  return {
    title: `${pkg.title} | Only Road Trip`,
    description: pkg.overview ?? pkg.short ?? `${pkg.title} with Only Road Trip.`,
    keywords: [pkg.title, "Jyotirlinga Yatra", "Jyotirlinga tour package", pkg.destination, pkg.state].filter(Boolean),
  };
}

const defaultInclusions = [
  "Accommodation in 3-Star hotels or similar as per the confirmed itinerary",
  "Daily breakfast and dinner as mentioned in the package",
  "Private AC vehicle for sightseeing and transfers as per itinerary",
  "Driver allowance, tolls, parking and applicable vehicle charges",
  "All sightseeing and temple visits mentioned in the published itinerary",
  "Pickup and drop as mentioned in the confirmed package",
];

const defaultExclusions = [
  "Airfare, train tickets or personal travel to the pickup point",
  "Temple special darshan, VIP darshan, pooja, donation or ritual charges unless specifically included",
  "Personal expenses, shopping, laundry, room service and beverages",
  "Lunches unless specifically mentioned in the confirmed quotation",
  "Travel insurance and medical expenses",
  "Anything not specifically mentioned under inclusions",
];

function faqItems(pkg: PackageLike) {
  const destination = String(pkg.destination ?? "this Jyotirlinga circuit");
  return [
    { question: `What is included in the ${pkg.title} package?`, answer: "Accommodation, meals, vehicle and sightseeing are provided as specifically listed under Tour Inclusions. Special darshan or paid temple services are not assumed unless mentioned in the confirmed quotation." },
    { question: `What is the best time for ${destination}?`, answer: `The recommended travel season is ${pkg.bestTime ?? pkg.quickFacts?.bestSeason ?? "October to March"}. Temple opening dates, weather and local operating conditions should be reconfirmed before travel.` },
    { question: "Can this Jyotirlinga itinerary be customised?", answer: "Yes. Pickup city, hotel category, room sharing, vehicle type, travel dates, darshan preferences and sightseeing pace can be customised subject to availability." },
    { question: "Is this package suitable for senior citizens?", answer: "The itinerary is designed for a comfortable pilgrimage pace, but walking, stairs, queues and temple access can vary. Senior travellers should discuss mobility requirements before booking." },
    { question: "Are special or VIP darshan charges included?", answer: "No special/VIP darshan is included unless it is explicitly mentioned in the confirmed quotation. Temple rules and availability can change by date." },
    { question: "What should I carry for the yatra?", answer: "Carry valid photo ID, comfortable footwear, weather-appropriate clothing, required medicines, a small day bag and any documents required for confirmed temple or travel services." },
  ];
}

function faqSchema(faqs: ReturnType<typeof faqItems>) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}

export default async function JyotirlingaPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = findPackage(slug);
  if (!pkg) notFound();

  const heroImage = String(pkg.hero?.image ?? pkg.image ?? "/images/package-placeholder.jpg");
  const facts = pkg.quickFacts ?? {};
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];
  const inclusions = Array.isArray(pkg.inclusions) && pkg.inclusions.length ? pkg.inclusions : defaultInclusions;
  const exclusions = Array.isArray(pkg.exclusions) && pkg.exclusions.length ? pkg.exclusions : defaultExclusions;
  const faqs = faqItems(pkg);
  const gallery = Array.isArray(pkg.gallery) && pkg.gallery.length
    ? pkg.gallery
    : [{ image: heroImage, alt: `${pkg.title} – Jyotirlinga Yatra` }];
  const hotels = Array.isArray(pkg.hotels) ? pkg.hotels : [{ name: facts.hotelCategory ?? "3-Star Hotel / Similar" }];
  const meals = Array.isArray(pkg.meals) ? pkg.meals : [String(facts.meals ?? "Breakfast & Dinner")];

  return (
    <main className="min-h-screen bg-[#f5f7fb] pb-16 pt-24 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link href="/" className="text-sm font-bold text-blue-800 hover:text-blue-950">← Back to Only Road Trip</Link>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-800">Jyotirlinga Experience</span>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
          <div className="relative h-[300px] overflow-hidden md:h-[430px]">
            <img src={heroImage} alt={pkg.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-blue-800 px-4 py-2 text-[11px] font-black tracking-[0.16em] text-white">JYOTIRLINGA YATRA</div>
            <div className="absolute bottom-7 left-5 right-5 md:left-9 md:right-9">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-200"><MapPin size={16} /> {pkg.destination}</p>
              <h1 className="max-w-5xl text-3xl font-black leading-tight text-white md:text-5xl">{pkg.title}</h1>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-200 md:text-base">{pkg.short ?? pkg.overview}</p>
            </div>
          </div>

          <div className="grid gap-3 border-b border-slate-200 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <Fact icon={<Clock3 size={18} />} label="Duration" value={String(pkg.duration ?? "—")} />
            <Fact icon={<MapPin size={18} />} label="Pickup / Drop" value={`${facts.pickup ?? pkg.pickup ?? "As selected"} → ${facts.drop ?? pkg.drop ?? "As selected"}`} />
            <Fact icon={<Route size={18} />} label="Transport" value={String(facts.transport ?? "Private AC Vehicle")} />
            <Fact icon={<CalendarDays size={18} />} label="Best Time" value={String(facts.bestSeason ?? pkg.bestTime ?? "October – March")} />
          </div>
        </section>

        <div className="sticky top-0 z-30 mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <nav className="flex min-w-max gap-6 px-5 py-3 text-sm font-black text-slate-600">
            {[["overview","Overview"],["gallery","Gallery"],["itinerary","Itinerary"],["inclusions","Inclusions"],["stay","Stay & Meals"],["faqs","FAQs"]].map(([id,label]) => <a key={id} href={`#${id}`} className="hover:text-blue-800">{label}</a>)}
          </nav>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-7">
            <section id="overview" className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex items-center gap-3"><Sparkles className="text-blue-700" size={22} /><h2 className="text-2xl font-black">Yatra Overview</h2></div>
              <p className="leading-8 text-slate-600">{pkg.overview ?? pkg.short}</p>
              {highlights.length > 0 && <div className="mt-7 grid gap-3 sm:grid-cols-2">{highlights.map((item: string) => <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-700" />{item}</div>)}</div>}
            </section>

            <section id="gallery" className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Visual Journey" title="Yatra Gallery" />
              <PackageGallerySlider gallery={gallery} title={String(pkg.title)} />
            </section>

            <section id="itinerary" className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Day by Day" title="Detailed Itinerary" />
              <p className="mb-5 text-sm leading-6 text-slate-500">Tap any day to expand or collapse the full morning, afternoon and evening plan. The same premium accordion used across the main package experience is used here.</p>
              <ItineraryAccordion
                itinerary={itinerary}
                destination={String(pkg.destination ?? "")}
                category={String(pkg.category ?? "Pilgrimage")}
                packageTitle={String(pkg.title ?? "")}
                packageId={String(pkg.id ?? pkg.packageId ?? "")}
                duration={String(pkg.duration ?? "")}
                overview={String(pkg.overview ?? pkg.short ?? "")}
                highlights={highlights}
                inclusions={inclusions}
                exclusions={exclusions}
                bestTime={String(pkg.bestTime ?? facts.bestSeason ?? "")}
                hotels={hotels}
                meals={meals}
                groupRates={pkg.groupRates}
                sharingRates={Array.isArray(pkg.groupRates?.sharingRates) ? pkg.groupRates.sharingRates : []}
              />
            </section>

            <section id="inclusions" className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Know Before You Book" title="Tour Inclusions & Exclusions" />
              <InclusionsExclusions inclusions={inclusions} exclusions={exclusions} />
            </section>

            <section id="stay" className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Comfort & Dining" title="Stay & Meals" />
              <div className="grid gap-4 md:grid-cols-2">
                <InfoBox title="Accommodation">{hotels.map((hotel: any, i: number) => <div key={`${hotel.name}-${i}`} className="rounded-xl bg-slate-50 p-4"><p className="font-bold">{hotel.name ?? "3-Star Hotel / Similar"}</p>{hotel.category && <p className="mt-1 text-xs text-slate-500">{hotel.category}</p>}</div>)}</InfoBox>
                <InfoBox title="Meals">{meals.map((meal: string, i: number) => <div key={`${meal}-${i}`} className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">{meal}</div>)}</InfoBox>
              </div>
            </section>

            <section id="faqs" className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionHeading eyebrow="Need To Know" title="Frequently Asked Questions" />
              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
                {faqs.map((faq, index) => <details key={faq.question} className="group p-5" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-slate-800"><span>{faq.question}</span><ChevronDown size={19} className="shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-4xl pr-8 text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <section className="rounded-[24px] bg-blue-950 p-6 text-white shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Plan This Yatra</p>
              <h2 className="mt-2 text-2xl font-black">Ready for Darshan?</h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">Get availability, hotel options, transport and a customised quotation for your Jyotirlinga journey.</p>
              <Link href="/plan-your-trip" className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-blue-900 hover:bg-blue-50">Enquire Now</Link>
            </section>
            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black">Travel Information</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <InfoRow label="Hotel" value={String(facts.hotelCategory ?? "3-Star / Similar")} />
                <InfoRow label="Meals" value={String(facts.meals ?? "Breakfast & Dinner")} />
                <InfoRow label="Group" value={String(pkg.groupSize ?? "2–12 Persons")} />
                <InfoRow label="Difficulty" value={String(pkg.difficulty ?? "Easy")} />
              </dl>
            </section>
            <section className="rounded-[24px] border border-blue-100 bg-blue-50 p-6">
              <h3 className="font-black text-blue-950">Temple & Darshan Note</h3>
              <p className="mt-2 text-sm leading-6 text-blue-900/80">Temple queues, darshan timings, rituals and local access rules can change. Special/VIP darshan is included only when specifically stated in the confirmed quotation.</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">{eyebrow}</p><h2 className="mt-1 text-2xl font-black">{title}</h2></div>;
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><div className="mb-2 text-blue-700">{icon}</div><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-extrabold leading-5">{value}</p></div>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0"><dt className="text-slate-500">{label}</dt><dd className="max-w-[190px] text-right font-bold">{value}</dd></div>;
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="mb-3 font-black">{title}</h3><div className="space-y-2">{children}</div></div>;
}
