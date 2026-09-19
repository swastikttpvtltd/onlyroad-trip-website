"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALE_COOKIE, LOCALE_INFO, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

function getStoredLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const cookie = document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(LOCALE_COOKIE + "="));
  const value = cookie?.split("=")[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(value || "") ? (value as Locale) : "en";
}

export default function LanguageSelector() {
  const [locale, setLocale] = useState<Locale>("en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredLocale();
    setLocale(stored);
    document.documentElement.lang = stored;
    document.documentElement.dir = LOCALE_INFO[stored].dir;
    const onOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const selectLocale = (next: Locale) => {
    setLocale(next);
    document.cookie = LOCALE_COOKIE + "=" + next + "; path=/; max-age=31536000; samesite=lax";
    document.documentElement.lang = next;
    document.documentElement.dir = LOCALE_INFO[next].dir;
    setOpen(false);
    window.dispatchEvent(new CustomEvent("onlyroadtrip:locale-change", { detail: next }));
  };

  const current = LOCALE_INFO[locale];
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-label={"Select language. Current language: " + current.name} onClick={() => setOpen((value) => !value)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/55 bg-white/15 px-3 text-sm font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white/25">
        <span aria-hidden="true" className="text-base">{current.flag}</span><span className="hidden sm:inline">{current.nativeName}</span><span aria-hidden="true" className="text-xs">⌄</span>
      </button>
      {open && <div role="listbox" aria-label="Website languages" className="absolute right-0 top-12 z-[100] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">
        <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">Choose language</div>
        <div className="grid max-h-[min(70vh,520px)] gap-1 overflow-y-auto">
          {SUPPORTED_LOCALES.map((item) => { const info = LOCALE_INFO[item]; const active = item === locale; return <button key={item} type="button" role="option" aria-selected={active} onClick={() => selectLocale(item)} className={"flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition " + (active ? "bg-blue-50 font-extrabold text-blue-700" : "font-semibold text-slate-700 hover:bg-slate-50")}><span className="text-lg" aria-hidden="true">{info.flag}</span><span className="flex-1"><span className="block">{info.nativeName}</span><span className="block text-[11px] font-medium text-slate-400">{info.name}</span></span>{active && <span className="text-blue-600">✓</span>}</button>; })}
        </div>
      </div>}
    </div>
  );
}
