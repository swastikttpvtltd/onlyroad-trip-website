"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bus,
  Camera,
  Clock3,
  Heart,
  MapPin,
  Sparkles,
  Star,
  Utensils,
  Users,
} from "lucide-react";
import type { Package } from "@/data/packagesTypes";
import { getPackagePrimaryImage } from "@/data/packageMediaFallback";
import { getGroupTourStartingPrice } from "@/data/groupTourPricing";

interface Props { pkg: Package; }

function getThumbnailSrc(image: string | undefined) {
  if (!image) return "/images/placeholder.jpg";
  return image.replace(/^\/images\/packages\//, "/images/package-thumbnails/").replace(/\.[^.]+$/, ".webp");
}

export default function PackageCard({ pkg }: Props) {
  const mapQuery = encodeURIComponent(`${pkg.destination}, ${pkg.state}`);
  const inclusionText = pkg.inclusions.join(" ").toLowerCase();
  const hasTransport = /transport|transfer|vehicle|cab|bus|car/.test(inclusionText);
  const hasMeals = pkg.meals.length > 0 || /meal|breakfast|lunch|dinner/.test(inclusionText);
  const hasSightseeing = pkg.highlights.length > 0;
  const primaryImage = getPackagePrimaryImage(pkg);
  const thumbnailSrc = getThumbnailSrc(primaryImage);
  const groupStartingPrice = getGroupTourStartingPrice(pkg);
  const isGroup = groupStartingPrice !== null;
  const displayPrice = groupStartingPrice ?? (pkg.price != null ? Number(pkg.price) : null);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_38px_rgba(15,23,42,0.12)]">
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-slate-100 sm:h-[230px]">
        <img src={primaryImage} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl" />
        <div className="absolute inset-0 bg-slate-900/5" />
        <img src={thumbnailSrc} alt={pkg.title} loading="lazy" decoding="async" onError={(event) => { const image = event.currentTarget; if (image.src.endsWith(thumbnailSrc)) image.src = primaryImage; }} className="absolute inset-0 h-full w-full object-contain object-center" />
        <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2"><span className="inline-flex max-w-[78%] rounded-full bg-blue-800 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">{pkg.category}</span><button type="button" aria-label="Add to Wishlist" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:scale-105 hover:text-blue-800"><Heart className="h-5 w-5 stroke-[1.8]" /></button></div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2"><div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /><span className="text-sm font-bold text-slate-900">{pkg.rating}</span><span className="text-xs text-slate-500">({pkg.reviews})</span></div><span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-md"><Sparkles className="h-3.5 w-3.5" /> Bestseller</span></div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        <p className="mb-1 text-xs font-medium text-slate-500">{pkg.category}</p>
        <h3 className="line-clamp-2 min-h-[48px] text-[19px] font-bold leading-[1.18] text-slate-950">{pkg.title}</h3>
        <div className="mt-2 flex items-start gap-1.5 text-[13px] leading-5 text-slate-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" /><span className="line-clamp-2">{pkg.destination} • {pkg.state}</span></div>
        <div className="mt-3 flex items-center justify-between text-[12px]"><Link href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="font-medium text-slate-700 underline underline-offset-2 hover:text-blue-700">View Map</Link><Link href={`/packages/${pkg.slug}#highlights`} className="font-medium text-slate-700 underline underline-offset-2 hover:text-blue-700">Highlights</Link></div>
        <div className="mt-4 border-t border-slate-100 pt-3"><p className="mb-2 text-sm font-semibold text-slate-800">Tour Includes</p><div className="flex items-center gap-4 text-blue-700"><span title="Accommodation" aria-label="Accommodation" className="text-base">▰</span>{hasMeals && <Utensils className="h-4 w-4" aria-label="Meals included" />}{hasSightseeing && <Camera className="h-4 w-4" aria-label="Sightseeing included" />}{hasTransport && <Bus className="h-4 w-4" aria-label="Transport included" />}</div></div>
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3"><p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{isGroup ? "Group Tour price starts" : "All inclusive price starts"}</p><div className="mt-1 flex items-end justify-between gap-3"><div>{displayPrice !== null ? <><h2 className="text-[25px] font-extrabold leading-none text-slate-950">₹{displayPrice.toLocaleString("en-IN")}<span className="text-lg">*</span></h2><p className="mt-1 text-[11px] text-slate-500">Per Person</p></> : <><h2 className="text-[22px] font-extrabold leading-none text-slate-950">Rate Soon</h2><p className="mt-1 text-[11px] text-slate-500">Quad / Triple / Double</p></>}</div><div className="text-right text-[11px] text-blue-700"><p className="font-bold">Flexible payment</p><p className="text-slate-500">options available</p></div></div><div className="mt-3 grid grid-cols-2 gap-2"><Link href={`/packages/${pkg.slug}`} className="inline-flex h-10 items-center justify-center rounded-lg border border-blue-700 px-3 text-sm font-bold text-blue-800 transition hover:bg-blue-50">View Tour</Link><Link href={`/book/${pkg.slug}`} className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-800 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-900">Book Online</Link></div></div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[12px]"><Link href="https://wa.me/?text=I%20want%20to%20enquire%20about%20this%20tour" target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 hover:underline">WhatsApp Enquiry</Link><Link href={`/packages/${pkg.slug}#itinerary`} className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-700">Get Itinerary <ArrowRight className="h-3.5 w-3.5" /></Link></div>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500"><span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1"><Clock3 className="h-3.5 w-3.5 text-blue-700" /> {pkg.duration}</span><span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1"><Users className="h-3.5 w-3.5 text-blue-700" /> {pkg.groupSize}</span></div>
      </div>
    </article>
  );
}
