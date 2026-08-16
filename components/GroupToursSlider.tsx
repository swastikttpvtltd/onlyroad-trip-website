"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Clock3, Heart, MapPin, Star } from "lucide-react";
import { packages } from "@/data/packages";
import { getGroupTourStartingPrice } from "@/data/groupTourPricing";

export default function GroupToursSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupPackages = packages.filter((pkg: any) => {
    const themes = Array.isArray(pkg.themes) ? pkg.themes.map((x: unknown) => String(x).toLowerCase()) : [];
    return themes.includes("group tour") || String(pkg.category ?? "").toLowerCase() === "weekend";
  });

  useEffect(() => {
    const timer = window.setInterval(() => scrollByCard(1), 4500);
    return () => window.clearInterval(timer);
  }, []);

  function scrollByCard(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-group-tour-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.85;
    const max = track.scrollWidth - track.clientWidth;
    const next = Math.max(0, Math.min(max, track.scrollLeft + amount * direction));
    if (direction < 0 && track.scrollLeft <= 5) track.scrollTo({ left: max, behavior: "smooth" });
    else if (direction > 0 && track.scrollLeft >= max - 5) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollTo({ left: next, behavior: "smooth" });
  }

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

        <div className="relative px-0 md:px-12">
          <button type="button" aria-label="Previous group tour" onClick={() => scrollByCard(-1)} className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.16)] transition hover:scale-105 hover:border-blue-700 hover:text-blue-800 md:flex"><ArrowLeft size={27} strokeWidth={2.5} /></button>
          <button type="button" aria-label="Next group tour" onClick={() => scrollByCard(1)} className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-blue-800 text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] transition hover:scale-105 hover:bg-blue-900 md:flex"><ArrowRight size={27} strokeWidth={2.5} /></button>

          <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {groupPackages.map((pkg: any) => (
              <article key={pkg.slug} data-group-tour-card className="group min-w-[86%] snap-start overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_7px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.13)] sm:min-w-[48%] lg:min-w-[calc((100%-40px)/3)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={pkg.image} alt={pkg.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50" />
                  <span className="absolute left-3 top-3 rounded-full bg-blue-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">{pkg.category}</span>
                  <button type="button" aria-label={`Add ${pkg.title} to wishlist`} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105"><Heart size={18} /></button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-lg"><Star size={14} fill="currentColor" className="text-amber-500" /><span className="text-xs font-bold text-slate-900">{pkg.rating}</span><span className="text-[11px] text-slate-500">({pkg.reviews})</span></div>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-[46px] text-[18px] font-bold leading-[1.25] text-slate-900 transition-colors group-hover:text-blue-800">{pkg.title}</h3>
                  <div className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-blue-700" /><span className="line-clamp-1">{pkg.destination}, {pkg.state}</span></div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-600"><span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5"><Clock3 size={13} className="text-blue-700" />{pkg.duration}</span><span className="rounded-full bg-slate-100 px-2.5 py-1.5">{pkg.groupSize}</span></div>
                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                    <div><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Starting From</p><p className="mt-0.5 text-xl font-extrabold text-blue-800">₹{getGroupTourStartingPrice(pkg).toLocaleString("en-IN")}</p><p className="text-[10px] text-slate-400">Per Person</p></div>
                    <div className="grid grid-cols-2 gap-2"><Link href={`/packages/${pkg.slug}`} className="inline-flex items-center justify-center rounded-lg border border-blue-700 px-3 py-2.5 text-xs font-bold text-blue-800 transition hover:bg-blue-50">View Tour</Link><Link href={`/book/${pkg.slug}`} className="inline-flex items-center justify-center rounded-lg bg-blue-800 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-900">Book Now</Link></div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex justify-between md:hidden"><button type="button" onClick={() => scrollByCard(-1)} aria-label="Previous group tour" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white shadow"><ArrowLeft size={21}/></button><button type="button" onClick={() => scrollByCard(1)} aria-label="Next group tour" className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-white shadow"><ArrowRight size={21}/></button></div>
        </div>
      </div>
    </section>
  );
}
