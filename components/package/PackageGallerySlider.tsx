"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = { image: string; alt?: string };

function buildImageAlt(title: string, image: string, index: number) {
  const cleanTitle = title.replace(/\s+/g, " ").trim();
  const fileName = image.split("/").pop()?.split(".")[0]?.replace(/[-_]+/g, " ").trim();

  if (fileName && fileName.toLowerCase() !== "hero" && !/^gallery\d+$/i.test(fileName)) {
    return `${cleanTitle} – ${fileName} travel experience`;
  }

  return `${cleanTitle} – travel package experience photo ${index + 1}`;
}

function toThumbnailPath(image: string) {
  if (!image.startsWith("/images/packages/")) return image;
  return image
    .replace(/^\/images\/packages\//, "/images/package-thumbnails/")
    .replace(/\.[^.]+$/, ".webp");
}

export default function PackageGallerySlider({
  gallery,
  title,
}: {
  gallery: GalleryItem[];
  title: string;
}) {
  // No artificial limit: every gallery item supplied by the package is displayed.
  // Generated thumbnails are preferred, with the original image as an automatic fallback.
  const slides = useMemo(
    () => gallery.filter((item) => typeof item?.image === "string" && item.image.trim()),
    [gallery],
  );
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
        <div className="relative aspect-video w-full overflow-hidden rounded-[28px] bg-slate-950 shadow-xl">
          {slides.map((slide, index) => {
            const sourceImage = slide.image;
            const thumbnailImage = toThumbnailPath(sourceImage);

            return (
              <div
                key={`${slide.image}-${index}`}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                  index === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <img
                  src={thumbnailImage}
                  alt={slide.alt || buildImageAlt(title, sourceImage, index)}
                  className="block h-full w-full object-contain object-center"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.src !== new URL(sourceImage, window.location.origin).href) {
                      image.src = sourceImage;
                    }
                  }}
                />
              </div>
            );
          })}

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
