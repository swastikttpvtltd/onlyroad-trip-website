import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LocaleHtmlAttributes from "@/components/LocaleHtmlAttributes";
import { LOCALE_INFO, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

const baseUrl = "https://www.onlyroadtrip.com";
const socialImage = "/images/logo/only-road-trip-logo.jpeg";

const titles: Record<Locale, string> = {
  en: "Only Road Trip | India Tour Packages & Travel",
  hi: "Only Road Trip | भारत टूर पैकेज और यात्रा",
  zh: "Only Road Trip | 印度旅游套餐与旅行",
  es: "Only Road Trip | Paquetes turísticos por India",
  ar: "Only Road Trip | رحلات وباقات سياحية في الهند",
  fr: "Only Road Trip | Circuits et voyages en Inde",
  bn: "Only Road Trip | ভারত ভ্রমণ প্যাকেজ ও ট্যুর",
  ja: "Only Road Trip | インド旅行・ツアーパッケージ",
  ko: "Only Road Trip | 인도 여행 패키지",
  ru: "Only Road Trip | Туры и путешествия по Индии",
  pt: "Only Road Trip | Pacotes de viagem pela Índia",
  de: "Only Road Trip | Indien-Reisepakete & Rundreisen",
};

const descriptions: Record<Locale, string> = {
  en: "Explore India with Only Road Trip through pilgrimage tours, domestic holidays, road trips, family vacations and customized travel packages.",
  hi: "Only Road Trip के साथ भारत के तीर्थ, घरेलू छुट्टियों, रोड ट्रिप और कस्टमाइज्ड टूर पैकेज की योजना बनाएं।",
  zh: "通过 Only Road Trip 探索印度，体验朝圣之旅、国内度假、家庭旅行和定制旅游套餐。",
  es: "Explora India con Only Road Trip mediante circuitos de peregrinación, vacaciones y paquetes personalizados.",
  ar: "اكتشف الهند مع Only Road Trip من خلال رحلات الحج والعطلات والجولات البرية والباقات السياحية المخصصة.",
  fr: "Découvrez l'Inde avec Only Road Trip grâce à nos circuits spirituels, vacances et voyages personnalisés.",
  bn: "Only Road Trip-এর সঙ্গে তীর্থযাত্রা, ছুটি, রোড ট্রিপ এবং কাস্টমাইজড ভারত ভ্রমণ প্যাকেজ উপভোগ করুন।",
  ja: "Only Road Tripで、巡礼旅行、国内休暇、ロードトリップ、家族旅行、カスタムツアーでインドを楽しみましょう。",
  ko: "Only Road Trip과 함께 순례 여행, 국내 휴가, 로드트립, 가족 여행 및 맞춤형 인도 투어를 만나보세요.",
  ru: "Исследуйте Индию с Only Road Trip: паломнические туры, отдых, автопутешествия и индивидуальные программы.",
  pt: "Explore a Índia com a Only Road Trip através de peregrinações, férias, road trips e pacotes personalizados.",
  de: "Entdecken Sie Indien mit Only Road Trip – Pilgerreisen, Rundreisen, Familienurlaub und individuelle Reisepakete.",
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!SUPPORTED_LOCALES.includes(rawLocale as Locale)) return {};

  const locale = rawLocale as Locale;
  const localizedUrl = baseUrl + "/" + locale;
  const languages: Record<string, string> = Object.fromEntries(
    SUPPORTED_LOCALES.map((item) => [item, baseUrl + "/" + item])
  );
  languages["x-default"] = baseUrl + "/en";

  return {
    title: titles[locale],
    description: descriptions[locale],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: localizedUrl, languages },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: localizedUrl,
      siteName: "Only Road Trip",
      locale: locale === "en" ? "en_IN" : locale,
      type: "website",
      images: [{ url: socialImage, alt: "Only Road Trip" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;

  if (!SUPPORTED_LOCALES.includes(rawLocale as Locale)) notFound();

  const locale = rawLocale as Locale;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlAttributes locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
