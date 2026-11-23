import { departureStartingPrices } from "@/features/fixedDepartures/data/fixedDeparturePresentation";
export const departureCities = ["Delhi", "Mumbai", "Chennai", "Hyderabad", "Bengaluru"];
// Package-specific blackout policy: do not inherit general holiday restrictions.
// Diwali: 8 Nov 2026, with a 6–11 Nov operating buffer.
// Dev Deepawali: 24 Nov 2026, with a 23–25 Nov operating buffer.
// Holika Dahan/Holi: 22–23 Mar 2027, retained from the owner's earlier instruction.
// Christmas, New Year and other general holidays are permitted.
export const blackoutRanges = [
  ["2026-11-06", "2026-11-11"],
  ["2026-11-23", "2026-11-25"],
  ["2027-03-22", "2027-03-23"],
] as const;
export function addScheduleDays(value: string, days: number) { const date = new Date(value + "T12:00:00Z"); date.setUTCDate(date.getUTCDate() + days); return date.toISOString().slice(0, 10); }
export function festivalDuringTrip(start: string, nights: number) {
  const end = addScheduleDays(start, nights);
  return blackoutRanges.some(([a,b]) => start <= b && end >= a);
}
export function getVaranasiDepartures(nights: number) {
  const result: { date: string; returnDate: string; startingPrice: number }[] = [];
  for (let date = "2026-11-01"; date <= "2027-03-31"; date = addScheduleDays(date, 4)) {
    if (addScheduleDays(date, nights) <= "2027-03-31" && !festivalDuringTrip(date, nights)) result.push({ date, returnDate: addScheduleDays(date,nights), startingPrice: departureStartingPrices[nights === 5 ? "varanasi-ayodhya-prayagraj-gaya-bodh-gaya" : "varanasi-prayagraj-ayodhya"] });
  }
  return result;
}

// Proposed commercial starting-price adjustments, not live airline quotations.
export const varanasiCityAdjustments: Record<string, number> = { Delhi: 0, Mumbai: 1000, Hyderabad: 2000, Bengaluru: 3000, Chennai: 3000 };
export function getVaranasiStartingPrice(nights: number, city: string) {
  const base = departureStartingPrices[nights === 5 ? "varanasi-ayodhya-prayagraj-gaya-bodh-gaya" : "varanasi-prayagraj-ayodhya"];
  if (city === "All Departures") return base;
  const adjustment = varanasiCityAdjustments[city];
  if (adjustment === undefined) throw new Error("Unknown departure city");
  return base + adjustment;
}
