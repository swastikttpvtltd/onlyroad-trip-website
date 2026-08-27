import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";

const STATES = [
  ["gujarat", "Gujarat"], ["rajasthan", "Rajasthan"], ["uttarakhand", "Uttarakhand"],
  ["uttar-pradesh", "Uttar Pradesh"], ["kashmir", "Kashmir"], ["himachal-pradesh", "Himachal Pradesh"],
  ["ladakh", "Ladakh"], ["punjab", "Punjab"], ["kerala", "Kerala"], ["goa", "Goa"],
  ["maharashtra", "Maharashtra"], ["madhya-pradesh", "Madhya Pradesh"], ["sikkim", "Sikkim"],
  ["west-bengal", "West Bengal"], ["assam", "Assam"], ["meghalaya", "Meghalaya"],
  ["karnataka", "Karnataka"], ["tamil-nadu", "Tamil Nadu"],
  ["andaman-nicobar", "Andaman & Nicobar Islands"], ["andhra-pradesh", "Andhra Pradesh"],
  ["multi-state", "Multi-State Tours"],
] as const;

type Params = { params: Promise<{ state: string }> };

export function generateStaticParams() {
  return STATES.map(([state]) => ({ state }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { state: slug } = await params;
  const state = STATES.find(([value]) => value === slug);
  if (!state) return {};
  return {
    title: `${state[1]} Tour Packages | Only Road Trip`,
    description: `Explore all live ${state[1]} tour packages by Only Road Trip. Compare itineraries, inclusions, prices and book your next trip.`,
    alternates: { canonical: `/packages/${state[0]}` },
    robots: { index: true, follow: true },
  };
}

export default async function StatePackagesPage({ params }: Params) {
  const { state: slug } = await params;
  const match = STATES.find(([value]) => value === slug);
  if (!match) notFound();
  const stateName = match[1];
  const statePackages = packages.filter((pkg) => {
    const value = String(pkg.state ?? "").trim().toLowerCase();
    if (slug === "multi-state") return value === "multi-state";
    if (slug === "kashmir") return value === "kashmir" || value === "jammu & kashmir";
    return value === stateName.toLowerCase();
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e3a8a] pb-14 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Only Road Trip Experiences</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{stateName} Tour Packages</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">Explore our live {stateName} packages with complete itineraries, inclusions, stays, pricing and booking options.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">{statePackages.length} Packages Available</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{stateName} Travel Packages</h2>
          </div>
          <Link href="/packages" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700">View All Packages</Link>
        </div>
        {statePackages.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">No live packages found for {stateName} yet.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {statePackages.map((pkg) => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
        )}
      </section>
    </main>
  );
}
