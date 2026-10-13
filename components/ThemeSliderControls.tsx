"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { startVisibleAutoscroll } from "@/lib/visibleAutoscroll";

export default function ThemeSliderControls({ title, count, index, children }: { title: string; count: number; index: number; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  function move(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-theme-card]");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const visibleCards = Math.max(1, Math.round((track.clientWidth + gap) / (card.offsetWidth + gap)));
    const amount = (card.offsetWidth + gap) * visibleCards;
    const end = track.scrollWidth - track.clientWidth;
    const next = track.scrollLeft + direction * amount;
    track.scrollTo({ left: next > end + 2 ? 0 : next < -2 ? end : Math.max(0, Math.min(end, next)), behavior: "smooth" });
  }

  useEffect(() => {
    if (paused || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return startVisibleAutoscroll(trackRef.current, () => move(1), 5000 + index * 350);
  }, [paused, count, index]);

  return (
      <div className="relative md:px-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
        {count > 1 && <><button type="button" aria-label={`Previous ${title} packages`} onClick={() => move(-1)} className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-lg transition hover:border-blue-700 hover:text-blue-800 md:flex"><ArrowLeft size={27} /></button><button type="button" aria-label={`Next ${title} packages`} onClick={() => move(1)} className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-blue-800 text-white shadow-lg transition hover:bg-blue-900 md:flex"><ArrowRight size={27} /></button></>}
        <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
        {count > 1 && <div className="mt-4 flex justify-between md:hidden"><button type="button" onClick={() => move(-1)} aria-label={`Previous ${title} packages`} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white shadow"><ArrowLeft size={21} /></button><button type="button" onClick={() => move(1)} aria-label={`Next ${title} packages`} className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-white shadow"><ArrowRight size={21} /></button></div>}
      </div>
  );
}
