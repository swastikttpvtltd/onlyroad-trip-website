"use client";

import { ExternalLink, MapPin, Star } from "lucide-react";

type HotelCardProps = {
  name: string;
  city: string;
  rating?: number;
  stars?: number;
  description?: string;
  makemytripUrl?: string;
  googleMapsUrl?: string;
};

export default function HotelCard({
  name,
  city,
  rating = 4.2,
  stars = 3,
  description = "Comfortable recommended stay for your journey.",
  makemytripUrl,
  googleMapsUrl,
}: HotelCardProps) {
  // Some itineraries include a destination for sightseeing/transfer but not for an overnight stay.
  // In that case the data intentionally uses an empty hotel placeholder, so no card is rendered.
  if (!name.trim()) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 px-5 py-4 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">Recommended Stay</p>
        <h3 className="mt-1 text-xl font-extrabold">{name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1 font-bold">{"★".repeat(Math.min(stars, 5))} <span className="text-blue-100">3★ Hotel</span></span>
          <span className="inline-flex items-center gap-1"><Star size={14} fill="currentColor" /> {rating.toFixed(1)}/5</span>
        </div>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-slate-700"><MapPin size={16} className="text-blue-700" /> {city}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {makemytripUrl ? <a href={makemytripUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-800 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-900">MakeMyTrip <ExternalLink size={15} /></a> : <span className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400">MakeMyTrip link pending</span>}
          {googleMapsUrl ? <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50">Google Maps <ExternalLink size={15} /></a> : <span className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400">Google link pending</span>}
        </div>
      </div>
    </div>
  );
}
