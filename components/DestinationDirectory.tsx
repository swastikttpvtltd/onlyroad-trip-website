import Link from "next/link";
import { destinationGuides } from "@/data/destinationGuides";
import { packages } from "@/data/packages";
import { getDestinationPackages } from "@/lib/destinationPackages";
import { seoPages } from "@/data/seo-pages";

export default function DestinationDirectory() {
  return <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 md:p-8" aria-label="Browse destination guides">
    <h2 className="text-2xl font-extrabold text-slate-950">Explore India by state and destination</h2>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Choose a destination to compare its published routes, itineraries and prices. For destinations without a published package, ask our team about a customised itinerary.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{destinationGuides.map(guide => {
      const count = getDestinationPackages(packages, guide).length;
      return <Link key={guide.path} href={guide.path} className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50"><h3 className="font-bold text-blue-900">{guide.title}</h3><p className="mt-1 text-xs text-slate-500">{count ? `${count} published routes` : "Custom itinerary enquiry"}</p></Link>;
    })}</div>
    <h3 className="mt-8 font-bold text-slate-950">Travel planning from Delhi NCR</h3>
    <p className="mt-2 text-sm text-slate-600">Discuss pickup and departure arrangements with our Gurugram team before booking.</p>
    <div className="mt-4 flex flex-wrap gap-2">{Object.values(seoPages).filter(page => page.focus === "local").map(page => <Link key={page.slug} href={`/${page.slug}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">{page.title}</Link>)}</div>
  </section>;
}
