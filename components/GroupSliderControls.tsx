"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { startVisibleAutoscroll } from "@/lib/visibleAutoscroll";

export default function GroupSliderControls({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return startVisibleAutoscroll(trackRef.current, () => scrollByCard(1), 4500);
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

  return (
        <div className="relative px-0 md:px-12">
          <button type="button" aria-label="Previous group tour" onClick={() => scrollByCard(-1)} className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.16)] transition hover:scale-105 hover:border-blue-700 hover:text-blue-800 md:flex"><ArrowLeft size={27} strokeWidth={2.5} /></button>
          <button type="button" aria-label="Next group tour" onClick={() => scrollByCard(1)} className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-blue-800 text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)] transition hover:scale-105 hover:bg-blue-900 md:flex"><ArrowRight size={27} strokeWidth={2.5} /></button>

          <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </div>

          <div className="mt-4 flex justify-between md:hidden"><button type="button" onClick={() => scrollByCard(-1)} aria-label="Previous group tour" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white shadow"><ArrowLeft size={21}/></button><button type="button" onClick={() => scrollByCard(1)} aria-label="Next group tour" className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-800 text-white shadow"><ArrowRight size={21}/></button></div>
        </div>
  );
}
