export const currencies = ["INR", "USD", "EUR", "GBP", "CAD", "AUD", "AED"] as const;
export type Currency = typeof currencies[number];
export type Rates = Record<Currency, number>;
export const RATE_TTL = 24 * 60 * 60 * 1000;
const formatters = new Map<Currency, Intl.NumberFormat>();
export function validRates(value: unknown): value is Rates {
  if (!value || typeof value !== "object") return false;
  const rates = value as Rates;
  return rates.INR === 1 && currencies.every(code => typeof rates[code] === "number" && Number.isFinite(rates[code]) && rates[code] > 0);
}
export function formatCurrency(inr: number, currency: Currency, rates?: Rates | null) {
  const display = currency === "INR" || rates ? currency : "INR";
  let formatter = formatters.get(display);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: display, maximumFractionDigits: display === "INR" ? 0 : 2 });
    formatters.set(display, formatter);
  }
  return formatter.format(inr * (rates?.[display] ?? 1));
}
