"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ScrollBackLink({ href, children }: { href: string; children: string }) {
  const anchor = useRef<HTMLDivElement>(null);
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    let previous = Math.max(0, window.scrollY);
    function onScroll() {
      const current = Math.max(0, window.scrollY);
      if (current !== previous) {
        setFloating(current < previous && (anchor.current?.getBoundingClientRect().bottom ?? 0) < 0);
      }
      previous = current;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={anchor} className="h-11">
    <Link href={href} className={`${floating ? "fixed left-4 top-36 z-40 md:left-8" : ""} inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}>
      <ArrowLeft size={17} aria-hidden="true" />{children}
    </Link>
  </div>;
}
