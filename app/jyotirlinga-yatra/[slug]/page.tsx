import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, Route, Sparkles } from "lucide-react";
import * as multiStateJyotirlingaModule from "@/data/packages/multi-state/jyotirlinga-packages";
import individualJyotirlingaPackages from "@/data/packages/multi-state/individual-jyotirlinga-packages";

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

// Some existing cards/links use a friendly "-yatra" suffix while the
// package library stores the canonical slug without it. Accept both forms
// so old links never become 404s.
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
  const params = allPackages.flatMap((pkg) => {
    const slug = String(pkg.slug);
    return [{ slug }, ...(slug.endsWith("-yatra") ? [] : [{ slug: `${slug}-yatra` }])];
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = findPackage(slug);
  return pkg ? { title: `${pkg.title} | Only Road Trip`, description: pkg.overview ?? pkg.short } : {};
}

export default async function JyotirlingaPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = findPackage(slug);
  if (!pkg) notFound();

  const heroImage = pkg.hero?.image ?? pkg.image ?? `/images/packages/multi-state/${pkg.slug}/hero.jpg`;
  const facts = pkg.quickFacts ?? {};
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-blue-800 hover:text-blue-950"><ArrowLeft size={17} /> Back to Only Road Trip</Link>
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
          <div className="relative h-[280px] overflow-hidden bg-slate-900 md:h-[390px]">
            <img src={heroImage} alt={pkg.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-blue-800 px-4 py-2 text-xs font-black tracking-wider text-white">JYOTIRLINGA YATRA</div>
            <div className="absolute bottom-6 left-5 right-5 md:left-8 md:right-8">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-200"><MapPin size={16} /> {pkg.destination}</p>
              <h1 className="max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl">{pkg.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200 md:text-base">{pkg.short ?? pkg.overview}</p>
            </div>
          </div>

          <div className="grid gap-3 border-b border-slate-200 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4"><Clock3 className="mb-2 text-blue-700" size={19} /><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Duration</p><p className="mt-1 font-extrabold">{pkg.duration}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><MapPin className="mb-2 text-blue-700" size={19} /><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pickup</p><p className="mt-1 font-extrabold">{facts.pickup ?? pkg.pickup ?? "As selected"}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><Route className="mb-2 text-blue-700" size={19} /><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transport</p><p className="mt-1 font-extrabold">{facts.transport ?? "Private AC Vehicle"}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><CalendarDays className="mb-2 text-blue-700" size={19} /><p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Best Time</p><p className="mt-1 font-extrabold">{facts.bestSeason ?? pkg.bestTime ?? "October – March"}</p></div>
          </div>
        </section>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="space-y-7">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex items-center gap-3"><Sparkles className="text-blue-700" size={22} /><h2 className="text-2xl font-black">Yatra Overview</h2></div>
              <p className="leading-7 text-slate-600">{pkg.overview ?? pkg.short}</p>
              {highlights.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">{highlights.map((item: string) => <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-700" />{item}</div>)}</div>}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-7"><p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">Day by Day</p><h2 className="mt-1 text-2xl font-black">Detailed Itinerary</h2></div>
              {itinerary.length > 0 ? <div className="space-y-5">{itinerary.map((day: any, index: number) => <article key={`${day.day}-${index}`} className="rounded-2xl border border-slate-200 p-5 md:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-800">{day.day}</span><h3 className="mt-3 text-xl font-black">{day.title}</h3></div>{day.distance && <div className="rounded-xl bg-slate-50 px-3 py-2 text-right text-xs text-slate-500"><b className="block text-slate-700">{day.distance}</b>{day.driveTime}</div>}</div><div className="mt-5 grid gap-4 md:grid-cols-3">{([['Morning', day.morning], ['Afternoon', day.afternoon], ['Evening', day.evening]] as const).map(([label, items]) => <div key={label}><p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><ul className="space-y-2">{(items ?? []).map((x: string) => <li key={x} className="text-sm leading-5 text-slate-600">• {x}</li>)}</ul></div>)}</div></article>)}</div> : <p className="text-slate-600">Detailed itinerary will be confirmed with the selected departure plan.</p>}
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <section className="rounded-3xl bg-blue-950 p-6 text-white shadow-xl"><p className="text-xs font-bold uppercase tracking-wider text-blue-200">Plan This Yatra</p><h2 className="mt-2 text-2xl font-black">Ready for Darshan?</h2><p className="mt-3 text-sm leading-6 text-blue-100">Get availability, hotel options, transport and a customised quotation for your Jyotirlinga journey.</p><Link href="/plan-your-trip" className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-blue-900 hover:bg-blue-50">Enquire Now</Link></section>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-lg font-black">Travel Information</h3><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Hotel</dt><dd className="text-right font-bold">{facts.hotelCategory ?? "3-Star / Similar"}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Meals</dt><dd className="text-right font-bold">{facts.meals ?? "Breakfast & Dinner"}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Group</dt><dd className="text-right font-bold">{pkg.groupSize ?? "2–12 Persons"}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Difficulty</dt><dd className="text-right font-bold">{pkg.difficulty ?? "Easy"}</dd></div></dl></section>
          </aside>
        </div>
      </div>
    </main>
  );
}
