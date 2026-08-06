"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const experienceThemes = [
  { name: "Spiritual", query: "Spiritual", description: "Sacred journeys & peaceful escapes" },
  { name: "Pilgrimage", query: "Pilgrimage", description: "Temples, dhams & holy circuits" },
  { name: "Trekking", query: "Trekking", description: "Trails, peaks & Himalayan walks" },
  { name: "Adventure", query: "Adventure", description: "Thrilling outdoor journeys" },
  { name: "Women Special", query: "Women", description: "Curated journeys for women" },
  { name: "Senior Citizen", query: "Senior", description: "Comfort-first relaxed holidays" },
  { name: "Honeymoon", query: "Honeymoon", description: "Romantic couple getaways" },
  { name: "Family", query: "Family", description: "Memorable holidays together" },
  { name: "Wildlife", query: "Wildlife", description: "Safaris, forests & nature" },
  { name: "Beach & Island", query: "Beach", description: "Coasts, islands & lagoons" },
  { name: "Heritage & Culture", query: "Heritage", description: "Forts, palaces & traditions" },
  { name: "Hill Stations", query: "Hill", description: "Mountains & scenic retreats" },
  { name: "Weekend Getaways", query: "Weekend", description: "Quick refreshing escapes" },
  { name: "Road Trips", query: "Road", description: "Iconic routes & driving holidays" },
  { name: "Corporate & MICE", query: "Corporate", description: "Offsites, incentives & groups" },
  { name: "Nature", query: "Nature", description: "Valleys, lakes & landscapes" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = "group relative text-[15px] font-medium text-white drop-shadow-sm transition-all duration-300 hover:text-cyan-200";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? "top-3 mx-auto max-w-7xl rounded-2xl border border-white/30 bg-blue-950/35 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.18)]" : "border-b border-white/20 bg-gradient-to-r from-blue-950/25 via-slate-900/20 to-blue-950/25 backdrop-blur-xl"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center shrink-0 -ml-4 lg:-ml-6">
          <Image src="/images/logo/only-road-trip-logo.jpeg" alt="Only Road Trip" width={185} height={55} priority className="h-[55px] w-auto object-contain transition-transform duration-300 hover:scale-105" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={navLinkClass}>Home<span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" /></Link>
          <Link href="/about" className={navLinkClass}>About Us<span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" /></Link>

          <div className="group/experiences relative flex h-[72px] items-center">
            <Link href="/packages" className={`${navLinkClass} flex items-center gap-1.5`}>
              Experiences
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/experiences:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover/experiences:w-full" />
            </Link>

            <div className="invisible absolute left-1/2 top-[66px] w-[760px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover/experiences:visible group-hover/experiences:translate-y-0 group-hover/experiences:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="border-b border-blue-100 bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 text-white">
                  <p className="text-lg font-bold">Explore by Experience</p>
                  <p className="mt-0.5 text-xs text-blue-50">Choose the way you want to travel</p>
                </div>
                <div className="grid grid-cols-4 gap-2 p-4">
                  {experienceThemes.map((theme) => (
                    <Link key={theme.name} href={`/packages?theme=${encodeURIComponent(theme.query)}`} className="rounded-xl border border-transparent p-3 transition hover:border-blue-100 hover:bg-blue-50">
                      <span className="block text-sm font-bold text-slate-900">{theme.name}</span>
                      <span className="mt-1 block text-[11px] leading-4 text-slate-500">{theme.description}</span>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3">
                  <span className="text-xs text-slate-500">Find packages matched to your travel style</span>
                  <Link href="/packages" className="text-sm font-bold text-blue-700 hover:text-orange-600">View All Packages →</Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/packages" className={navLinkClass}>Packages<span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" /></Link>
          <Link href="/corporate-travel" className={navLinkClass}>Corporate Travel<span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" /></Link>
          <Link href="/contact" className={navLinkClass}>Contact<span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" /></Link>
        </nav>

        <Link href="/contact" className="rounded-full border border-white/35 bg-white/15 backdrop-blur-md px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-500/80 hover:shadow-cyan-500/30">Plan Your Trip</Link>
      </div>
    </header>
  );
}