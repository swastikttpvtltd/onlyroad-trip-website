"use client";

import Image from "next/image";

export default function PackageCardImage({ src, fallback, title }: { src: string; fallback: string; title: string }) {
  return <Image src={src} alt={title} fill sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" onError={(event) => {
    const image = event.currentTarget;
    if (image.src.endsWith(src)) image.src = fallback;
  }} className="absolute inset-0 h-full w-full object-contain object-center" />;
}
