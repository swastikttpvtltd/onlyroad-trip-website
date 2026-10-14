"use client";
import { useSyncExternalStore } from "react";
import { currencies, formatCurrency, RATE_TTL, validRates, type Currency, type Rates } from "@/lib/currency";
export type { Currency } from "@/lib/currency";

const key = "onlyroadtrip-currency";
const ratesKey = "onlyroadtrip-inr-rates";
type Snapshot = { currency: Currency; rates: Rates | null; at: number; status: "loading" | "ready" | "unavailable" | "stale" };
const initial: Snapshot = { currency: "INR", rates: null, at: 0, status: "loading" };
let snapshot = initial;
let started = false;
let pending: Promise<void> | undefined;
const listeners = new Set<() => void>();
function publish(next: Snapshot) { snapshot = next; listeners.forEach(listener => listener()); }
function readCurrency(): Currency {
  try { const value = localStorage.getItem(key); return currencies.includes(value as Currency) ? value as Currency : "INR"; } catch { return snapshot.currency; }
}
async function loadRates() {
  if (pending) return pending;
  if (snapshot.rates && Date.now() - snapshot.at < RATE_TTL) return;
  pending = (async () => {
    try {
      const response = await fetch("/api/currency-rates", { signal: AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error("Rates unavailable");
      const data = await response.json();
      if (!validRates(data.rates) || !Number.isFinite(data.at) || data.at <= 0 || data.at > Date.now() + 60000) throw new Error("Invalid rates");
      publish({ ...snapshot, rates: data.rates, at: data.at, status: data.stale ? "stale" : "ready" });
      // Storage is optional and must never prevent an in-memory update.
      try { localStorage.setItem(ratesKey, JSON.stringify({ at: data.at, rates: data.rates })); } catch {}
    } catch { publish({ ...snapshot, status: snapshot.rates ? "stale" : "unavailable" }); }
  })().finally(() => { pending = undefined; });
  return pending;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) {
    started = true;
    let saved: { at: number; rates: Rates } | null = null;
    try { saved = JSON.parse(localStorage.getItem(ratesKey) || "null"); } catch {}
    const usable = saved && validRates(saved.rates) && Number.isFinite(saved.at) && saved.at > 0 && saved.at <= Date.now() ? saved : null;
    publish({ ...snapshot, currency: readCurrency(), rates: usable?.rates ?? null, at: usable?.at ?? 0, status: usable ? (Date.now() - usable.at < RATE_TTL ? "ready" : "stale") : "loading" });
    window.addEventListener("storage", event => {
      if (event.key === key || event.key === null) publish({ ...snapshot, currency: readCurrency() });
    });
    window.addEventListener("online", () => { void loadRates(); });
    window.addEventListener("focus", () => { void loadRates(); });
    void loadRates();
  }
  return () => { listeners.delete(listener); };
}
function setCurrency(currency: Currency) {
  if (!currencies.includes(currency)) return;
  publish({ ...snapshot, currency });
  try { localStorage.setItem(key, currency); } catch {}
  void loadRates();
}
export function useCurrency() {
  const state = useSyncExternalStore(subscribe, () => snapshot, () => initial);
  return { ...state, setCurrency, format: (inr: number) => formatCurrency(inr, state.currency, state.rates), rateAvailable: state.currency === "INR" || !!state.rates };
}
export function CurrencySelector({ compact = false }: { compact?: boolean }) {
  const { currency, status, setCurrency } = useCurrency();
  return <label className="inline-flex flex-wrap items-center gap-1.5 text-xs font-semibold">
    <span className="sr-only">Display currency</span>
    <select aria-label="Display currency" value={currency} onChange={e => setCurrency(e.target.value as Currency)} className={`rounded-lg border border-slate-300 bg-white px-2 py-2 text-slate-900 shadow-sm ${compact ? "max-w-24" : ""}`}>
      {currencies.map(value => <option key={value} value={value}>{value}</option>)}
    </select>
    {currency !== "INR" && status !== "ready" && <span role="status">{status === "loading" ? "Loading rates…" : status === "stale" ? "Last available rates" : "Rates unavailable · INR shown"}</span>}
  </label>;
}
export function CurrencyPrice({ inr }: { inr: number }) {
  const { format, currency, rateAvailable, status } = useCurrency();
  return <span title={currency !== "INR" ? (rateAvailable ? `${status === "stale" ? "Last available rates; " : ""}Indicative conversion; payment settled in INR` : "Rate unavailable; showing INR") : undefined}>{format(inr)}</span>;
}
