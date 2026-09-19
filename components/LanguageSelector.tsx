"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  LOCALE_COOKIE,
  LOCALE_INFO,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n";

export default function LanguageSelector({ overLight = false }: { overLight?: boolean }) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    const detected = (SUPPORTED_LOCALES as readonly string[]).includes(firstSegment || "")
      ? (firstSegment as Locale)
      : "en";
    setLocale(detected);

    const onOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [pathname]);

  const selectLocale = (next: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = segments.length > 0 &&
      (SUPPORTED_LOCALES as readonly string[]).includes(segments[0]);

    const targetPath = hasLocalePrefix
      ? "/" + [next, ...segments.slice(1)].join("/")
      : "/" + next;

    document.cookie =
      LOCALE_COOKIE + "=" + next + "; path=/; max-age=31536000; samesite=lax";

    setLocale(next);
    setOpen(false);
    router.push(targetPath);
  };

  const current = LOCALE_INFO[locale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("chooseLanguage") + ". " + current.name}
        onClick={() => setOpen((value) => !value)}
        className={
          "inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-sm font-bold shadow-sm backdrop-blur-md transition " +
          (overLight
            ? "border-slate-400 bg-white/70 text-slate-900 hover:bg-white"
            : "border-white/55 bg-white/15 text-white hover:bg-white/25")
        }
      >
        <span aria-hidden="true" className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeName}</span>
        <span aria-hidden="true" className="text-xs">⌄</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Website languages"
          className="absolute right-0 top-12 z-[100] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl"
        >
          <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
            Choose language
          </div>

          <div className="grid max-h-[min(70vh,520px)] gap-1 overflow-y-auto">
            {SUPPORTED_LOCALES.map((item) => {
              const info = LOCALE_INFO[item];
              const active = item === locale;

              return (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectLocale(item)}
                  className={
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition " +
                    (active
                      ? "bg-blue-50 font-extrabold text-blue-700"
                      : "font-semibold text-slate-700 hover:bg-slate-50")
                  }
                >
                  <span className="text-lg" aria-hidden="true">{info.flag}</span>
                  <span className="flex-1">
                    <span className="block">{info.nativeName}</span>
                    <span className="block text-[11px] font-medium text-slate-400">
                      {info.name}
                    </span>
                  </span>
                  {active && <span className="text-blue-600">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
