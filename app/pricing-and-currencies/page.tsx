import Link from "next/link";
import { CurrencyPrice } from "@/components/CurrencySelector";
import { currencies } from "@/lib/currency";
import { currencyGuideFaqs, currencyNames } from "@/data/currencyContent";
import { pageMetadata, serializeJsonLd, siteUrl } from "@/lib/siteSeo";

export const metadata = pageMetadata("Tour Prices, Display Currencies & INR Checkout", "View India tour prices in INR, USD, EUR, GBP, CAD, AUD or AED. Learn how indicative conversions work and why checkout and invoices remain in Indian Rupees.", "/pricing-and-currencies");

export default function CurrencyGuide() {
  const url = siteUrl + "/pricing-and-currencies";
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url + "#webpage", url, name: "Tour Prices, Display Currencies & INR Checkout", inLanguage: "en-IN", isPartOf: { "@id": siteUrl + "/#website" }, hasPart: { "@id": url + "#faqs" } },
    { "@type": "FAQPage", "@id": url + "#faqs", mainEntity: currencyGuideFaqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return <main className="min-h-screen bg-slate-50 px-6 pb-20 pt-32 text-slate-950">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <div className="mx-auto max-w-5xl"><p className="text-xs font-bold uppercase tracking-widest text-blue-700">Planning your India tour</p><h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Tour prices in your preferred currency</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Compare published package prices in a familiar currency, then review the Indian Rupee amount before paying. Changing the display currency updates package cards, room prices and booking totals together.</p>
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7"><h2 className="text-2xl font-bold">Seven supported display currencies</h2><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{currencies.map(code => <div key={code} className="rounded-xl bg-slate-50 p-4"><b className="text-blue-900">{code}</b><p className="mt-1 text-sm text-slate-600">{currencyNames[code]}</p></div>)}</div><p className="mt-6 text-sm leading-7 text-slate-600">Choose a currency from the header or footer. Your room-sharing choice and traveller count stay the same when you switch currency.</p></section>
      <section className="mt-6 grid gap-6 md:grid-cols-2"><div className="rounded-3xl border border-slate-200 bg-white p-7"><h2 className="text-xl font-bold">An indicative conversion example</h2><p className="mt-3 text-sm text-slate-600">Example base amount: INR 10,000. This is an illustration, not a tour quote.</p><p className="mt-4 text-3xl font-extrabold text-blue-900"><CurrencyPrice inr={10000} /></p><p className="mt-3 text-sm text-slate-600">Switch the display currency to see the example update.</p></div><div className="rounded-3xl bg-blue-950 p-7 text-white"><h2 className="text-xl font-bold">Checkout and invoices are in INR</h2><p className="mt-3 text-sm leading-7 text-blue-100">Display conversions help you compare prices. Your secure checkout amount, confirmed payment and invoice are in Indian Rupees. Rates can refresh, so review the INR amount and final quotation before payment.</p><Link href="/booking-policy" className="mt-4 inline-flex text-sm font-bold underline">Review booking and payment terms</Link></div></section>
      <section className="mt-10"><h2 className="text-2xl font-bold">Currency and pricing questions</h2><div className="mt-5 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6">{currencyGuideFaqs.map(faq => <details key={faq.question} className="py-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}</div></section>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/packages" className="rounded-full bg-blue-800 px-6 py-3 font-bold text-white">Compare tour packages</Link><Link href="/destinations" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-blue-800">Explore destinations</Link></div>
    </div>
  </main>;
}
