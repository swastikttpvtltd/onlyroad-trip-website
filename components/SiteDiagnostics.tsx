"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { usePathname } from "next/navigation";
import { isExcludedSeoPath } from "@/lib/seoWorkScope";
import { reportConversion } from "@/lib/conversionEvents";

const reportVitals: Parameters<typeof useReportWebVitals>[0] = metric => {
  if (isExcludedSeoPath(window.location.pathname)) return;
  // Local browser events only. No URL, customer identifier or network sender.
  window.dispatchEvent(new CustomEvent("ort:web-vital", {
    detail: { name: metric.name, value: metric.value },
  }));
};

export default function SiteDiagnostics() {
  const pathname = usePathname();
  useReportWebVitals(reportVitals);
  useEffect(() => {
    const view = () => {
      if (/^\/packages\/[a-z0-9-]+\/?$/.test(location.pathname)) reportConversion("view_item", "package-page");
    };
    view();
    const clicked = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!target) return;
      const url = new URL(target.getAttribute("href") || "", location.href);
      if (url.origin === location.origin && /^\/book\/[a-z0-9-]+\/?$/.test(url.pathname) && !isExcludedSeoPath(url.pathname)) {
        reportConversion("begin_checkout", "package-booking");
      }
    };
    document.addEventListener("click", clicked);
    return () => document.removeEventListener("click", clicked);
  }, [pathname]);
  return null;
}
