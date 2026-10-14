"use client";
import { useEffect, useState } from "react";

export type Currency = "INR" | "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "AED";
const currencies: Currency[] = ["INR", "USD", "EUR", "GBP", "CAD", "AUD", "AED"];
const key = "onlyroadtrip-currency";
const eventName = "onlyroadtrip-currency-change";
const ratesKey = "onlyroadtrip-inr-rates";
type Rates = Partial<Record<Currency, number>>;
let cached: Rates = { INR: 1 };
let loadedAt = 0;
let pending: Promise<void> | undefined;
function readCurrency(): Currency {
  if (typeof window === "undefined") return "INR";
  try { const value = localStorage.getItem(key) as Currency; return currencies.includes(value) ? value : "INR"; } catch { return "INR"; }
}
async function loadRates() {
  if (Date.now() - loadedAt < 24 * 60 * 60 * 1000) return;
  if (pending) return pending;
  pending = (async () => {
    try {
      const saved = JSON.parse(localStorage.getItem(ratesKey) || "null") as { at: number; rates: Rates } | null;
      if (saved?.rates?.INR === 1) { cached = saved.rates; loadedAt = saved.at; }
      if (Date.now() - loadedAt < 24 * 60 * 60 * 1000) return;
      const response = await fetch("https://open.er-api.com/v6/latest/INR", { cache: "no-store" });
      if (!response.ok) throw new Error("Rates unavailable");
      const data = await response.json() as { result?: string; rates?: Rates };
      if (data.result !== "success" || !data.rates?.USD) throw new Error("Invalid FX response");
      cached = { INR: 1, ...data.rates };
      loadedAt = Date.now();
      localStorage.setItem(ratesKey, JSON.stringify({ at: loadedAt, rates: cached }));
      window.dispatchEvent(new Event(eventName));
    } catch { /* Never display a guessed conversion when rates are unavailable. */ }
  })().finally(() => { pending = undefined; });
  return pending;
}
export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [rates, setRates] = useState<Rates>({ INR: 1 });
  useEffect(() => {
    const sync = () => { setCurrencyState(readCurrency()); setRates({ ...cached }); };
    sync();
    void loadRates();
    window.addEventListener("storage", sync);
    window.addEventListener(eventName, sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener(eventName, sync); };
  }, []);
  const setCurrency = (value: Currency) => {
    if (!currencies.includes(value)) return;
    try { localStorage.setItem(key, value); } catch {}
    window.dispatchEvent(new Event(eventName));
  };
  const format = (inr: number) => {
    const rate = rates[currency];
    if (currency !== "INR" && (!rate || !Number.isFinite(rate))) return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(inr);
    return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: currency === "INR" ? 0 : 2 }).format(inr * (rate || 1));
  };
  return { currency, setCurrency, format, rateAvailable: currency === "INR" || !!rates[currency] };
}
export function CurrencySelector({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  return <label className="inline-flex items-center gap-1.5 text-xs font-semibold">
    <span className="sr-only">Display currency</span>
    <select aria-label="Display currency" value={currency} onChange={e => setCurrency(e.target.value as Currency)} className={`rounded-lg border border-slate-300 bg-white px-2 py-2 text-slate-900 shadow-sm ${compact ? "max-w-24" : ""}`}>
      {currencies.map(value => <option key={value} value={value}>{value}</option>)}
    </select>
  </label>;
}
export function CurrencyPrice({ inr }: { inr: number }) {
  const { format, currency, rateAvailable } = useCurrency();
  return <span title={currency !== "INR" ? (rateAvailable ? "Indicative conversion; payment settled in INR" : "Rate unavailable; showing INR") : undefined}>{format(inr)}</span>;
}
