import Link from "next/link";
import { packages } from "@/data/packages";
import { CurrencyPrice } from "@/components/CurrencySelector";

const weekendSlugs = ["jaipur-weekend-group-tour", "jibhi-weekend-group-tour", "kasol-weekend-group-tour", "kanatal-weekend-group-tour", "mcleodganj-weekend-group-tour"];
export default function RoadTripIdeas() {
  const routes = weekendSlugs.map(slug => packages.find(pkg => pkg.slug === slug)).filter(pkg => pkg !== undefined);
  return <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8"><h2 className="text-3xl font-extrabold text-slate-950">Road trip ideas for your next weekend</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Looking for road trip ideas near you? Compare these published routes, their travel time, itinerary and room-sharing prices. Travellers from Delhi, Gurugram, Noida and nearby cities should confirm the pickup point and departure arrangements with our team.</p><div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{routes.map(pkg => <article key={pkg.slug} className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-bold text-slate-950"><Link href={`/packages/${pkg.slug}`} className="hover:text-blue-800">{pkg.title}</Link></h3><p className="mt-3 text-sm leading-6 text-slate-600">{pkg.destination}</p><p className="mt-2 text-sm font-semibold">{pkg.duration}</p><p className="mt-4 font-extrabold text-blue-900"><CurrencyPrice inr={pkg.price} /><span className="ml-1 text-xs font-normal text-slate-500">per person</span></p><Link href={`/packages/${pkg.slug}`} className="mt-4 inline-flex text-sm font-bold text-blue-800">View itinerary and inclusions →</Link></article>)}</div></section>;
}
