"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = { image: string; alt?: string };

export default function PackageGallerySlider({
  gallery,
  title,
}: {
  gallery: GalleryItem[];
  title: string;
}) {
  // Every package slider uses one fixed 16:9 frame.
  // Maximum 10 photos per package.
  const slides = useMemo(() => gallery.slice(0, 10), [gallery]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;

    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      4200,
    );

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const move = (step: number) =>
    setActive((current) => (current + step + slides.length) % slides.length);

  return (
    <section className="bg-[#f6f6f6] px-5 pb-3 pt-7 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Fixed 16:9 slider frame for every package and every image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-[28px] bg-slate-900 shadow-xl">
          {slides.map((slide, index) => (
            <div
              key={`${slide.image}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt || `${title} gallery photo ${index + 1}`}
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
            </div>
          ))}

          {slides.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => move(-1)}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:bg-black/45"
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={() => move(1)}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:bg-black/45"
              >
                <ChevronRight />
              </button>

              <div className="absolute bottom-5 left-1/2 z-10 flex max-w-[80%] -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-black/20 px-3 py-2 backdrop-blur-md">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show photo ${index + 1}`}
                    onClick={() => setActive(index)}
                    className={`h-2 shrink-0 rounded-full transition-all ${
                      index === active ? "w-7 bg-white" : "w-2 bg-white/55"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
