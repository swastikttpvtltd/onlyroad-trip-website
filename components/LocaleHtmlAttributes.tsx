"use client";

import { useEffect } from "react";
import { LOCALE_INFO, type Locale } from "@/lib/i18n";

export default function LocaleHtmlAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    const info = LOCALE_INFO[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = info.dir;
  }, [locale]);

  return null;
}
