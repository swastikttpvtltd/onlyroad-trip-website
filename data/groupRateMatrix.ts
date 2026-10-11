export const GROUP_SIZES = Array.from({ length: 50 }, (_, index) => (index + 1) * 2);
export type SharingRate = { type: string; price: number };
export type PackageGroupRates = { [pax: number]: number; sharingRates: SharingRate[] };

export function groupRateRows(rates?: { [pax: number]: number }) {
  return GROUP_SIZES.flatMap((pax) => {
    const price = rates?.[pax];
    return typeof price === "number" && Number.isFinite(price) && price > 0
      ? [{ pax, price }] : [];
  });
}

// Odd headcounts use the preceding even tier, rather than an unfilled larger group discount.
export function rateForTravellerCount(rates: { [pax: number]: unknown } | undefined, pax: number) {
  if (!rates || !Number.isInteger(pax) || pax < 1 || pax > 100) return 0;
  const tier = Math.max(2, Math.floor(pax / 2) * 2);
  const price = rates[tier];
  return typeof price === "number" && Number.isFinite(price) && price > 0 ? price : 0;
}
