import { currencies, type Currency } from "../lib/currency";
export const currencyNames: Record<Currency, string> = { INR: "Indian Rupee", USD: "US Dollar", EUR: "Euro", GBP: "British Pound", CAD: "Canadian Dollar", AUD: "Australian Dollar", AED: "UAE Dirham" };
export const currencyFaq = {
  question: "Can I view tour prices in USD, EUR and other currencies?",
  answer: `Yes. Use the display currency selector in the header or footer to view prices and booking totals in ${currencies.join(", ")}. Converted prices are indicative. Room sharing and traveller changes update the displayed total; checkout, confirmed payments and invoices remain in INR. During a rate-service outage, the last verified rates may be shown.`,
};
export const currencyGuideFaqs = [
  currencyFaq,
  { question: "Does selecting a currency change the language of the website?", answer: "No. The currency selector changes price displays. It does not translate the itinerary, booking terms or page language." },
  { question: "Why can the converted price change later?", answer: "Exchange rates can change. A refreshed indicative rate may change the displayed conversion. The package base price, booking calculations and amount payable are in INR." },
  { question: "Which amount should I check before paying?", answer: "Check the INR amount shown at secure checkout and review the confirmed quotation, taxes, inclusions and payment schedule before paying." },
];
