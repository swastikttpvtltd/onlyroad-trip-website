"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = { image: string; alt?: string };

function buildAlt(title: string, image: string, index: number) {
  const file = image.split("/").pop()?.split(".")[0]?.replace(/[-_]+/g, " ").trim();
  return file && file.toLowerCase() !== "hero" ? `${title} – ${file} travel experience` : `${title} – travel package photo ${index + 1}`;
}

function folderFromImage(image: string) {
  const marker = "/images/";
  const start = image.indexOf(marker);
  if (start < 0) return "";
  const relative = image.slice(start + marker.length);
  const slash = relative.lastIndexOf("/");
  return slash > 0 ? relative.slice(0, slash) : "";
}

export default function PackageGallerySliderFixed({ gallery, title }: { gallery: GalleryItem[]; title: string }) {
  const [slides, setSlides] = useState<GalleryItem[]>(gallery);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setSlides(gallery);
    setActive(0);
    const folder = folderFromImage(gallery[0]?.image ?? "");
    if (!folder) return;
    let cancelled = false;
    fetch(`/api/package-images?folder=${encodeURIComponent(folder)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { images?: string[] } | null) => {
        if (!cancelled && data?.images?.length) {
          setSlides(data.images.map((image, index) => ({ image, alt: buildAlt(title, image, index) })));
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [gallery, title]);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 4200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;
  const move = (step: number) => setActive((i) => (i + step + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-xl">
      <div className="relative aspect-video w-full">
        {slides.map((slide, index) => (
          <img key={`${slide.image}-${index}`} src={slide.image} alt={slide.alt || buildAlt(title, slide.image, index)} loading={index === 0 ? "eager" : "lazy"} className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`} />
        ))}
        {slides.length > 1 && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => move(-1)} className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"><ChevronLeft /></button>
            <button type="button" aria-label="Next photo" onClick={() => move(1)} className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"><ChevronRight /></button>
            <div className="absolute bottom-4 left-1/2 z-10 flex max-w-[80%] -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-black/30 px-3 py-2 backdrop-blur-md">
              {slides.map((_, index) => <button key={index} type="button" aria-label={`Show photo ${index + 1}`} onClick={() => setActive(index)} className={`h-2 shrink-0 rounded-full ${index === active ? "w-7 bg-white" : "w-2 bg-white/60"}`} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
