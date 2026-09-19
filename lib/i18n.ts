export const SUPPORTED_LOCALES = [
  "en", "hi", "zh", "es", "ar", "fr", "bn", "ja", "ko", "ru", "pt", "de",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_INFO: Record<Locale, { name: string; nativeName: string; flag: string; dir: "ltr" | "rtl" }> = {
  en: { name: "English", nativeName: "English", flag: "🇬🇧", dir: "ltr" },
  hi: { name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  zh: { name: "Mandarin Chinese", nativeName: "简体中文", flag: "🇨🇳", dir: "ltr" },
  es: { name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
  ar: { name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  fr: { name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr" },
  bn: { name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", dir: "ltr" },
  ja: { name: "Japanese", nativeName: "日本語", flag: "🇯🇵", dir: "ltr" },
  ko: { name: "Korean", nativeName: "한국어", flag: "🇰🇷", dir: "ltr" },
  ru: { name: "Russian", nativeName: "Русский", flag: "🇷🇺", dir: "ltr" },
  pt: { name: "Portuguese", nativeName: "Português", flag: "🇵🇹", dir: "ltr" },
  de: { name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr" },
};

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "onlyroadtrip_locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
