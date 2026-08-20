"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, MapPin, Star } from "lucide-react";
import { useRef } from "react";
import { jyotirlingaPackages } from "@/data/packages/jyotirlinga-packages";

const cards = [
  { ...jyotirlingaPackages[0], price: 10500, image: "/images/packages/gujarat/dwarka-somnath/hero.avif" },
  { ...jyotirlingaPackages[1], price: 29999, image: "/images/packages/gujarat/dwarka-somnath/hero.avif" },
  { ...jyotirlingaPackages[2], price: 41570, image: "/images/packages/maharashtra/shirdi-nashik/hero.jpg" },
  { ...jyotirlingaPackages[3], price: 85500, image: "/images/package-placeholder.jpg" },
];

export default function JyotirlingaSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-jyotirlinga-card]");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="border-y border-slate-200 bg-white py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Experiences</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">Jyotirlinga Yatra</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">Choose your scale of Shiv Yatra — 2, 4, 6 or all 12 Jyotirlingas.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button type="button" aria-label="Previous Jyotirlinga package" onClick={() => scroll(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-700 hover:text-blue-700"><ArrowLeft size={20} /></button>
            <button type="button" aria-label="Next Jyotirlinga package" onClick={() => scroll(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-white shadow-sm hover:bg-blue-900"><ArrowRight size={20} /></button>
          </div>
        </div>

        <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cards.map((pkg: any) => (
            <article key={pkg.slug} data-jyotirlinga-card className="group min-w-[86%] snap-start overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:min-w-[48%] lg:min-w-[31%]">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img src={pkg.image} alt={pkg.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <div className="absolute left-3 top-3 rounded-full bg-blue-800 px-3 py-1 text-[10px] font-black text-white">{pkg.title.match(/^\d+/)?.[0] ?? ""} JYOTIRLINGAS</div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg"><Star size={13} fill="currentColor" className="text-amber-500" />4.8 <span className="font-normal text-slate-500">Premium Yatra</span></div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 min-h-[48px] text-lg font-extrabold leading-tight text-slate-950 group-hover:text-blue-800">{pkg.title}</h3>
                <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-blue-700" />{pkg.destination}</div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600"><span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5"><Clock3 size={13} className="text-blue-700" />{pkg.duration}</span></div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Starting From</p><p className="text-xl font-extrabold text-blue-800">₹{Number(pkg.price).toLocaleString("en-IN")}</p><p className="text-[10px] text-slate-400">Per Person*</p></div>
                  <Link href={`/jyotirlinga-yatra/${pkg.slug}`} className="rounded-lg bg-blue-800 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-900">View Yatra</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex justify-between md:hidden"><button type="button" aria-label="Previous Jyotirlinga package" onClick={() => scroll(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300"><ArrowLeft size={19} /></button><button type="button" aria-label="Next Jyotirlinga package" onClick={() => scroll(1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white"><ArrowRight size={19} /></button></div>
      </div>
    </section>
  );
}
