import Image from "next/image";
import { MapPin, Star, Heart } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function FeaturedDestinations() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="rounded-full bg-cyan-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Explore India</span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Popular Destinations</h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">Discover India&apos;s most loved travel destinations.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.13)]">
              <div className="relative h-60 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent" />
                <button className="absolute right-4 top-4 rounded-full bg-white/95 p-2 shadow-lg backdrop-blur transition hover:scale-105"><Heart size={18} /></button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <div className="flex shrink-0 items-center gap-1 text-amber-500"><Star size={17} fill="currentColor" /><span className="text-sm font-semibold">{item.rating}</span></div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} />{item.location}</div>
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                  <div><p className="text-xs font-medium uppercase tracking-wide text-slate-400">Starting From</p><p className="mt-1 text-xl font-bold text-[#0B3D91]">{item.price}</p></div>
                  <button className="rounded-xl bg-[#0B3D91] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}