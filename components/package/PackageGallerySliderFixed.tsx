"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = { image: string; alt?: string };

function normalizeImage(image: string) {
  return image.replace(/^\/images\/packages\/lakshadweep\//, "/images/lakshadweep/");
}

function buildAlt(title: string, image: string, index: number) {
  const file = image.split("/").pop()?.split(".")[0]?.replace(/[-_]+/g, " ").trim();
  return file && file.toLowerCase() !== "hero"
    ? `${title} – ${file} travel experience`
    : `${title} – travel package photo ${index + 1}`;
}

export default function PackageGallerySliderFixed({ gallery, title }: { gallery: GalleryItem[]; title: string }) {
  const normalizedGallery = gallery
    .map((item) => ({ ...item, image: normalizeImage(item.image) }))
    .filter((item) => Boolean(item.image));

  const [active, setActive] = useState(0);
  const slides = normalizedGallery;

  useEffect(() => {
    setActive(0);
  }, [gallery]);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 4200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-[28px] bg-slate-100 text-sm font-medium text-slate-500">
        Gallery photos will appear here.
      </div>
    );
  }

  const move = (step: number) => setActive((index) => (index + step + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-xl">
      <div className="relative aspect-video w-full">
        {slides.map((slide, index) => (
          <img
            key={`${slide.image}-${index}`}
            src={slide.image}
            alt={slide.alt || buildAlt(title, slide.image, index)}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          />
        ))}

        {slides.length > 1 && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => move(-1)} className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:bg-black/70">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => move(1)} className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:bg-black/70">
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-10 flex max-w-[80%] -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-black/35 px-3 py-2 backdrop-blur-md">
              {slides.map((_, index) => (
                <button key={index} type="button" aria-label={`Show photo ${index + 1}`} onClick={() => setActive(index)} className={`h-2 shrink-0 rounded-full transition-all ${index === active ? "w-7 bg-white" : "w-2 bg-white/60"}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
