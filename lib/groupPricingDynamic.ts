/**
 * Group pricing calculation for normal (non-fixed, non-weekend) tours.
 * Server and client must import this same module.
 * IMPORTANT: Do not activate checkout until boundary anomalies are approved.
 */
export const GROUP_PRICING_SLABS = [
  [2,4,10],[5,8,11.5],[9,12,13],[13,16,14.5],[17,20,16],
  [21,24,17.5],[25,28,19],[29,32,20.5],[33,36,22],[37,40,23.5],
  [41,44,25],[45,48,26.5],[49,52,28],[53,56,29.5],[57,60,31],
  [61,64,32.5],[65,68,34],[69,72,35.5],[73,76,37],[77,80,38.5],
  [81,84,40],[85,88,41.5],[89,92,43],[93,96,44],[97,100,45.5],
] as const;

export type GroupPricingQuote = {
  travellers: number;
  originalPricePerPerson: number;
  discountPercent: number;
  discountPerPerson: number;
  finalPricePerPerson: number;
  originalTotal: number;
  savingsTotal: number;
  finalTotal: number;
};

/** Integer paise calculation avoids floating point price discrepancies. */
export function calculateGroupPricing(basePriceInr: number, travellers: number): GroupPricingQuote {
  if (!Number.isSafeInteger(basePriceInr) || basePriceInr <= 0)
    throw new RangeError("Base price must be a positive whole number of INR");
  if (!Number.isInteger(travellers) || travellers < 2 || travellers > 100)
    throw new RangeError("Travellers must be a whole number between 2 and 100");
  const slab = GROUP_PRICING_SLABS.find(([min,max]) => travellers >= min && travellers <= max);
  if (!slab) throw new Error("Missing group pricing slab");
  const discountPercent = slab[2];
  const originalPaise = basePriceInr * 100;
  const finalPaise = Math.round(originalPaise * (1000 - Math.round(discountPercent * 10)) / 1000);
  const finalPricePerPerson = finalPaise / 100;
  const originalTotal = basePriceInr * travellers;
  const finalTotal = (finalPaise * travellers) / 100;
  return {
    travellers, originalPricePerPerson: basePriceInr, discountPercent,
    discountPerPerson: (originalPaise - finalPaise) / 100,
    finalPricePerPerson, originalTotal,
    savingsTotal: originalTotal - finalTotal, finalTotal,
  };
}

export function findGroupPricingBoundaryAnomalies(basePriceInr: number) {
  const anomalies: { previousTravellers: number; travellers: number; previousTotal: number; newTotal: number }[] = [];
  for (let travellers = 3; travellers <= 100; travellers++) {
    const previousTotal = calculateGroupPricing(basePriceInr, travellers - 1).finalTotal;
    const newTotal = calculateGroupPricing(basePriceInr, travellers).finalTotal;
    if (newTotal < previousTotal) anomalies.push({previousTravellers:travellers-1, travellers, previousTotal, newTotal});
  }
  return anomalies;
}

/** Strict gate: approved slab anomalies must be resolved before payment activation. */
export function assertGroupPricingCommerciallySafe(basePriceInr: number) {
  const anomalies = findGroupPricingBoundaryAnomalies(basePriceInr);
  if (anomalies.length) throw new Error(`Group pricing blocked: ${anomalies.length} total-price drop boundaries require approval`);
}
