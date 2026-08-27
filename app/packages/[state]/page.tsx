import { notFound } from "next/navigation";
import Link from "next/link";
import { rawPackages } from "@/data/packages";

const STATES = [
  { slug: "gujarat", name: "Gujarat" },
  { slug: "rajasthan", name: "Rajasthan" },
  { slug: "uttarakhand", name: "Uttarakhand" },
  { slug: "uttar-pradesh", name: "Uttar Pradesh" },
  { slug: "kashmir", name: "Kashmir" },
  { slug: "himachal-pradesh", name: "Himachal Pradesh" },
  { slug: "ladakh", name: "Ladakh" },
  { slug: "punjab", name: "Punjab" },
  { slug: "kerala", name: "Kerala" },
  { slug: "goa", name: "Goa" },
  { slug: "maharashtra", name: "Maharashtra" },
  { slug: "madhya-pradesh", name: "Madhya Pradesh" },
  { slug: "sikkim", name: "Sikkim" },
  { slug: "west-bengal", name: "West Bengal" },
  { slug: "assam", name: "Assam" },
  { slug: "meghalaya", name: "Meghalaya" },
  { slug: "karnataka", name: "Karnataka" },
  { slug: "tamil-nadu", name: "Tamil Nadu" },
  { slug: "andaman-nicobar", name: "Andaman & Nicobar Islands" },
  { slug: "andhra-pradesh", name: "Andhra Pradesh" },
  { slug: "multi-state", name: "Multi-State Tours" },
] as const;

export function generateStaticParams() {
  return STATES.map(({ slug }) => ({ state: slug }));
}

export function generateMetadata({ params }: { params: { state: string } }) {
  const state = STATES.find((item) => item.slug === params.state);
  if (!state) return {};
  return {
    title: `${state.name} Tour Packages | Only Road Trip`,
    description: `Explore all live ${state.name} tour packages by Only Road Trip. Compare itineraries, inclusions, prices and book your next trip.`,
  };
}

export default function StatePackagesPage({ params }: { params: { state: string } }) {
  const state = STATES.find((item) => item.slug === params.state);
  if (!state) notFound();

  const packages = rawPackages.filter((pkg: any) => {
    if (state.slug === "multi-state") return !pkg.state;
    const value = String(pkg.state ?? "").toLowerCase().trim();
    return value === state.name.toLowerCase() || (state.slug === "kashmir" && value === "jammu & kashmir");
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Only Road Trip</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{state.name} Tour Packages</h1>
          <p className="mt-3 max-w-3xl text-slate-600">Discover all currently available packages for {state.name}. Open any package to see the complete itinerary, inclusions, hotels, pricing and booking details.</p>
        </div>

        {packages.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 p-8 text-center text-slate-600">No live packages found for this destination yet.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg: any) => (
              <Link key={pkg.slug ?? pkg.id ?? pkg.title} href={`/packages/${pkg.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                {pkg.image && <img src={pkg.image} alt={pkg.title} className="h-52 w-full object-cover" />}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700">{pkg.title}</h2>
                  {pkg.destination && <p className="mt-1 text-sm text-slate-500">{pkg.destination}</p>}
                  {pkg.overview && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{pkg.overview}</p>}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">View Full Package</span>
                    <span aria-hidden className="text-blue-700">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
