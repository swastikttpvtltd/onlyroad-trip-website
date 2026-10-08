"use client";
import { useEffect } from "react";
export default function InstagramTracking() {
 useEffect(() => {
  const onClick = (event: MouseEvent) => {
   const target = event.target;
   if (!(target instanceof Element)) return;
   const link = target.closest<HTMLAnchorElement>(".instagram-landing a[href]");
   if (!link) return;
   const url = new URL(link.href, window.location.origin);
   const kind = url.hostname === "wa.me" ? "whatsapp" : url.protocol === "tel:" ? "phone" : url.pathname.startsWith("/book/") ? "book_now" : url.pathname.startsWith("/packages/") ? "full_itinerary" : null;
   if (!kind) return;
   const analytics = window as Window & { dataLayer?: Record<string, unknown>[] };
   analytics.dataLayer = analytics.dataLayer || [];
   analytics.dataLayer.push({ event: "instagram_" + kind + "_click", page_path: "/instagram", package_slug: kind === "book_now" || kind === "full_itinerary" ? url.pathname.split("/")[2] : undefined });
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
 }, []);
 return null;
}
