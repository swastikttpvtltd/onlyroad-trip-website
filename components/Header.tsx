"use client";

import { useEffect, useRef, useState } from "react";
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

function parseRgb(value: string) {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function visibleBackground(element: Element | null): string | null {
  let current: Element | null = element;
  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;
    if (bg && bg !== "transparent" && !bg.endsWith(", 0)")) return bg;
    current = current.parentElement;
  }
  return window.getComputedStyle(document.body).backgroundColor;
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [overLight, setOverLight] = useState(false);

  useEffect(() => {
    let frame = 0;
    const detectContrast = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        const x = Math.round(window.innerWidth / 2);
        const y = Math.min(window.innerHeight - 1, Math.max(1, Math.round(rect.top + rect.height / 2)));
        const oldPointer = headerRef.current.style.pointerEvents;
        headerRef.current.style.pointerEvents = "none";
        const underneath = document.elementFromPoint(x, y);
        headerRef.current.style.pointerEvents = oldPointer;
        const rgb = parseRgb(visibleBackground(underneath) || "");
        if (!rgb) return setOverLight(false);
        const [r, g, b] = rgb;
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        setOverLight(luminance > 0.68);
      });
    };
    detectContrast();
    window.addEventListener("scroll", detectContrast, { passive: true });
    window.addEventListener("resize", detectContrast);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", detectContrast);
      window.removeEventListener("resize", detectContrast);
    };
  }, []);

  const navLinkClass = `group relative text-[15px] font-bold tracking-[0.01em] transition-colors duration-300 ${overLight ? "text-slate-950 hover:text-blue-700" : "text-white hover:text-cyan-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"}`;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 px-4">
      <div className={`mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border px-4 shadow-[0_10px_35px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-all duration-300 sm:px-6 lg:px-8 ${overLight ? "border-slate-300/70 bg-white/55" : "border-white/35 bg-blue-950/30"}`}>
        <Link href="/" className="flex shrink-0 items-center -ml-4 lg:-ml-6">
          <Image src="/images/logo/only-road-trip-logo.jpeg" alt="Only Road Trip" width={185} height={55} priority className="h-[55px] w-auto object-contain transition-transform duration-300 hover:scale-105" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/" className={navLinkClass}>Home<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${overLight ? "bg-blue-700" : "bg-cyan-300"}`} /></Link>
          <Link href="/about" className={navLinkClass}>About Us<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${overLight ? "bg-blue-700" : "bg-cyan-300"}`} /></Link>
          <div className="group/experiences relative flex h-[72px] items-center">
            <Link href="/packages" className={`${navLinkClass} flex items-center gap-1.5`}>Experiences<svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/experiences:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg><span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover/experiences:w-full ${overLight ? "bg-blue-700" : "bg-cyan-300"}`} /></Link>
            <div className="invisible absolute left-1/2 top-[66px] w-[760px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover/experiences:visible group-hover/experiences:translate-y-0 group-hover/experiences:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="border-b border-blue-100 bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 text-white"><p className="text-lg font-bold">Explore by Experience</p><p className="mt-0.5 text-xs text-blue-50">Choose the way you want to travel</p></div>
                <div className="grid grid-cols-4 gap-2 p-4">{experienceThemes.map((theme)=><Link key={theme.name} href={`/packages?theme=${encodeURIComponent(theme.query)}`} className="rounded-xl border border-transparent p-3 transition hover:border-blue-100 hover:bg-blue-50"><span className="block text-sm font-bold text-slate-900">{theme.name}</span><span className="mt-1 block text-[11px] leading-4 text-slate-500">{theme.description}</span></Link>)}</div>
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3"><span className="text-xs text-slate-500">Find packages matched to your travel style</span><Link href="/packages" className="text-sm font-bold text-blue-700 hover:text-orange-600">View All Packages →</Link></div>
              </div>
            </div>
          </div>
          <Link href="/packages" className={navLinkClass}>Packages<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${overLight ? "bg-blue-700" : "bg-cyan-300"}`} /></Link>
          <Link href="/corporate-travel" className={navLinkClass}>Corporate Travel<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${overLight ? "bg-blue-700" : "bg-cyan-300"}`} /></Link>
          <Link href="/contact" className={navLinkClass}>Contact<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${overLight ? "bg-blue-700" : "bg-cyan-300"}`} /></Link>
        </nav>
        <Link href="/contact" className={`rounded-full border px-6 py-2.5 text-sm font-bold shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 ${overLight ? "border-slate-500/60 bg-white/50 text-slate-950 hover:bg-white/80" : "border-white/70 bg-white/20 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.65)] hover:bg-white/30"}`}>Plan Your Trip</Link>
      </div>
    </header>
  );
}