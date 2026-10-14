import { CurrencyPrice } from "@/components/CurrencySelector";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Heart, MapPin } from "lucide-react";
import type { PackageCardSummary } from "@/lib/packageCardSummary";
import GroupSliderControls from "./GroupSliderControls";

import { isGroupTourBookingPaused } from "@/data/groupTourBookingPause";

export default function GroupToursSlider({ packages }: { packages: PackageCardSummary[] }) {
  const groupPackages = packages.filter((pkg) => {
    const themes = Array.isArray(pkg.themes) ? pkg.themes.map((x: unknown) => String(x).toLowerCase()) : [];
    return themes.includes("group tour") || String(pkg.category ?? "").toLowerCase() === "weekend";
  });

  if (!groupPackages.length) return null;

  return (
    <section className="border-y border-blue-100 bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4 md:mb-8">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-800">Only Road Trip</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Group Tours</h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">Fixed per-person rates • Friday departures • 5% GST included.</p>
          </div>
        </div>

        <GroupSliderControls>
            {groupPackages.map((pkg) => {
              const displayPrice = pkg.price;
              return <article key={pkg.slug} data-group-tour-card className="group min-w-[86%] snap-start overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.13)] sm:min-w-[48%] lg:min-w-[calc((100%-40px)/3)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 33vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50" />
                  <span className="absolute left-3 top-3 rounded-full bg-blue-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">{pkg.category}</span>
                  <button type="button" aria-label={`Add ${pkg.title} to wishlist`} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105"><Heart size={18} /></button>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-[46px] text-[18px] font-bold leading-[1.25] text-slate-900 transition-colors group-hover:text-blue-800">{pkg.title}</h3>
                  <div className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-blue-700" /><span className="line-clamp-1">{pkg.destination}, {pkg.state}</span></div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-600"><span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5"><Clock3 size={13} className="text-blue-700" />{pkg.duration}</span><span className="rounded-full bg-slate-100 px-2.5 py-1.5">2–100+ Persons</span></div>
                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                    <div><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Price incl. 5% GST</p><p className="mt-0.5 text-xl font-extrabold text-blue-800"><CurrencyPrice inr={displayPrice}/></p><p className="text-[10px] text-slate-400">Per Person</p></div>
                    <div className="grid grid-cols-2 gap-2"><Link href={`/packages/${pkg.slug}`} className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-blue-700 px-2 py-2.5 text-xs font-bold text-blue-800 transition hover:bg-blue-50">View Tour</Link>{isGroupTourBookingPaused(pkg.slug) ? <button type="button" disabled aria-label="Booking paused" title="Online booking is temporarily unavailable" className="inline-flex cursor-not-allowed items-center justify-center whitespace-nowrap rounded-lg bg-slate-300 px-2 py-2.5 text-xs font-bold text-slate-600">Paused</button> : <Link href={`/book/${pkg.slug}`} className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-blue-800 px-2 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-900">Book Now</Link>}</div>
                  </div>
                </div>
              </article>;
            })}
        </GroupSliderControls>
      </div>
    </section>
  );
}
