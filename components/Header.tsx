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

function parseColor(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])];
}

function findSolidBackground(element: Element | null): [number, number, number] | null {
  let current = element;
  while (current && current !== document.documentElement) {
    const color = parseColor(window.getComputedStyle(current).backgroundColor);
    if (color && color[3] > 0.15) return [color[0], color[1], color[2]];
    current = current.parentElement;
  }
  const body = parseColor(window.getComputedStyle(document.body).backgroundColor);
  return body ? [body[0], body[1], body[2]] : null;
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
        const y = Math.max(1, Math.min(window.innerHeight - 1, Math.round(rect.top + rect.height / 2)));
        const xs = [0.34, 0.5, 0.66].map((ratio) => Math.round(window.innerWidth * ratio));

        const previousVisibility = headerRef.current.style.visibility;
        headerRef.current.style.visibility = "hidden";
        const colors = xs.map((x) => findSolidBackground(document.elementFromPoint(x, y))).filter(Boolean) as [number, number, number][];
        headerRef.current.style.visibility = previousVisibility;

        if (!colors.length) return;
        const luminance = colors.reduce((total, [r, g, b]) => total + (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255, 0) / colors.length;
        setOverLight(luminance >= 0.62);
      });
    };

    detectContrast();
    const timer = window.setTimeout(detectContrast, 300);
    window.addEventListener("scroll", detectContrast, { passive: true });
    window.addEventListener("resize", detectContrast);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", detectContrast);
      window.removeEventListener("resize", detectContrast);
    };
  }, []);

  const navLinkClass = `group relative text-[15px] font-bold tracking-[0.01em] transition-colors duration-300 ${overLight ? "text-slate-950 hover:text-blue-700" : "text-white hover:text-cyan-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]"}`;
  const underlineClass = overLight ? "bg-blue-700" : "bg-cyan-300";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 px-4">
      <div className={`mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border px-4 shadow-[0_10px_35px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-all duration-300 sm:px-6 lg:px-8 ${overLight ? "border-slate-300/80 bg-white/65" : "border-white/45 bg-slate-950/35"}`}>
        <Link href="/" className="flex shrink-0 items-center -ml-4 lg:-ml-6"><Image src="/images/logo/only-road-trip-logo.jpeg" alt="Only Road Trip" width={185} height={55} priority className="h-[55px] w-auto object-contain transition-transform duration-300 hover:scale-105" /></Link>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/" className={navLinkClass}>Home<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`} /></Link>
          <Link href="/about" className={navLinkClass}>About Us<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`} /></Link>
          <div className="group/experiences relative flex h-[72px] items-center">
            <Link href="/packages" className={`${navLinkClass} flex items-center gap-1.5`}>Experiences<svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/experiences:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg><span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover/experiences:w-full ${underlineClass}`} /></Link>
            <div className="invisible absolute left-1/2 top-[66px] w-[760px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover/experiences:visible group-hover/experiences:translate-y-0 group-hover/experiences:opacity-100"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"><div className="border-b border-blue-100 bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 text-white"><p className="text-lg font-bold">Explore by Experience</p><p className="mt-0.5 text-xs text-blue-50">Choose the way you want to travel</p></div><div className="grid grid-cols-4 gap-2 p-4">{experienceThemes.map((theme)=><Link key={theme.name} href={`/packages?theme=${encodeURIComponent(theme.query)}`} className="rounded-xl border border-transparent p-3 transition hover:border-blue-100 hover:bg-blue-50"><span className="block text-sm font-bold text-slate-900">{theme.name}</span><span className="mt-1 block text-[11px] leading-4 text-slate-500">{theme.description}</span></Link>)}</div><div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3"><span className="text-xs text-slate-500">Find packages matched to your travel style</span><Link href="/packages" className="text-sm font-bold text-blue-700 hover:text-orange-600">View All Packages →</Link></div></div></div>
          </div>
          <Link href="/packages" className={navLinkClass}>Packages<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`} /></Link>
          <Link href="/corporate-travel" className={navLinkClass}>Corporate Travel<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`} /></Link>
          <Link href="/contact" className={navLinkClass}>Contact<span className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`} /></Link>
        </nav>
        <Link href="/contact" className={`rounded-full border px-6 py-2.5 text-sm font-bold shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 ${overLight ? "border-slate-500/70 bg-white/55 text-slate-950 hover:bg-white/90" : "border-white/80 bg-white/15 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] hover:bg-white/25"}`}>Plan Your Trip</Link>
      </div>
    </header>
  );
}