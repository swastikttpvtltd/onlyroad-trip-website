"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
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
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
    if (direction > 0 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  if (!groupPackages.length) return null;

  return (
    <section className="border-y border-blue-100 bg-gradient-to-r from-[#f8fbff] via-white to-[#f8fbff] py-7">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-800">Only Road Trip</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Group Tours</h2>
            <p className="mt-1 text-sm text-slate-600">Fixed per-person rates • Friday departures • 5% GST included</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label="Previous group tours" onClick={() => scrollByCard(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm transition hover:border-blue-700 hover:text-blue-700"><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Next group tours" onClick={() => scrollByCard(1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white shadow-sm transition hover:bg-blue-900"><ArrowRight size={18} /></button>
          </div>
        </div>

        <div ref={trackRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groupPackages.map((pkg: any) => (
            <article key={pkg.slug} data-group-tour-card className="min-w-[86%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:min-w-[48%] lg:min-w-[32%]">
              <div className="flex items-center gap-4 p-4">
                <img src={pkg.image} alt={pkg.title} loading="lazy" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1"><span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">{pkg.category}</span><h3 className="mt-1 line-clamp-2 text-base font-extrabold text-slate-900">{pkg.title}</h3><div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500"><MapPin size={12} className="text-blue-700" />{pkg.destination}</div></div>
              </div>
              <div className="grid grid-cols-3 border-t border-slate-100 text-[11px] text-slate-600"><span className="flex items-center gap-1 px-3 py-2"><CalendarDays size={13} className="text-blue-700" />{pkg.duration}</span><span className="flex items-center gap-1 border-x border-slate-100 px-3 py-2"><Users size={13} className="text-blue-700" />{pkg.groupSize}</span><span className="px-3 py-2 text-right font-extrabold text-blue-800">₹{getGroupTourStartingPrice(pkg).toLocaleString("en-IN")}</span></div>
              <div className="flex gap-2 border-t border-slate-100 p-3"><Link href={`/packages/${pkg.slug}`} className="flex-1 rounded-lg border border-blue-700 px-3 py-2 text-center text-xs font-bold text-blue-800">View Tour</Link><Link href={`/book/${pkg.slug}`} className="flex-1 rounded-lg bg-blue-800 px-3 py-2 text-center text-xs font-bold text-white">Book Now</Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
