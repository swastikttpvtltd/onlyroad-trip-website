import { defineRouting } from "next-intl/routing";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES as readonly Locale[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});
