import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";

interface Props {
  state: string;
}

export default function StatePackagesLanding({ state }: Props) {
  const statePackages = packages.filter((pkg) => {
    const value = String(pkg.state ?? "").trim().toLowerCase();
    if (state === "Multi-State Tours") return value === "multi-state";
    if (state === "Kashmir") return value === "kashmir" || value === "jammu & kashmir";
    return value === state.toLowerCase();
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Keep the state landing page visually consistent with the existing Packages page. */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e3a8a] pb-14 pt-32 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Only Road Trip Experiences
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {state} Tour Packages
            </h1>
            <p className="text-lg leading-8 text-slate-200">
              Explore our live {state} packages and open any package to see the same complete
              package details, itinerary, inclusions, stays, pricing and booking options used
              throughout the website.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
              {statePackages.length} Packages Available
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              {state} Travel Packages
            </h2>
          </div>
          <Link
            href="/packages"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-700"
          >
            View All Packages
          </Link>
        </div>

        {statePackages.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">
            No live packages found for {state} yet.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {statePackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
