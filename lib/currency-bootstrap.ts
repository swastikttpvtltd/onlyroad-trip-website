import type { Rates } from "./currency";

// Last verified response from the production FX endpoint, 14 October 2026.
// This is an indicative fallback, never a checkout/payment exchange rate.
export const bootstrapRates: { at: number; rates: Rates } = {
  at: 1791980042218,
  rates: { INR: 1, USD: 0.010491, EUR: 0.00938, GBP: 0.007924, CAD: 0.014939, AUD: 0.015032, AED: 0.038531 },
};
