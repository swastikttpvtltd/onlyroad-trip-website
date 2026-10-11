import { addGSTToRate } from "./priceTax";
import { GROUP_SIZES, type PackageGroupRates } from "./groupRateMatrix";
import { getGroupSharingRates } from "./groupTourPricing";

const destinationMultiplier: Record<string, number> = {
  Gujarat: 1,
  Rajasthan: 1.03,
  Uttarakhand: 1.02,
  "Uttar Pradesh": 0.95,
  "Multi-State": 1.08,
  Kashmir: 1.28,
  "Himachal Pradesh": 1.12,
  Ladakh: 1.48,
  Punjab: 0.92,
  Kerala: 1.18,
  Goa: 1.05,
  Maharashtra: 1.05,
  "Madhya Pradesh": 1,
  Sikkim: 1.2,
  "West Bengal": 1.02,
  "Assam & Meghalaya": 1.2,
  Karnataka: 1.08,
  "Tamil Nadu": 1.02,
  "Andaman & Nicobar Islands": 1.48,
};

const nightsFromDuration = (duration: unknown) => {
  const match = String(duration ?? "").match(/(\d+)\s*Nights?/i);
  return match ? Number(match[1]) : 0;
};

const isFixedWeekendGroup = (pkg: any) => {
  const duration = String(pkg?.duration ?? "").toLowerCase();
  const title = String(pkg?.title ?? "").toLowerCase();
  const category = String(pkg?.category ?? "").toLowerCase();
  const themes = Array.isArray(pkg?.themes) ? pkg.themes.map((x: unknown) => String(x).toLowerCase()) : [];
  const is2N3D = /2\s*nights?\s*\/\s*3\s*days?/.test(duration);
  const isWeekendOrGroup = category.includes("weekend") || category.includes("group") || themes.some((x: string) => x.includes("weekend") || x.includes("group tour")) || title.includes("weekend") || title.includes("group");
  return is2N3D && isWeekendOrGroup;
};

const specialCost = (state: string, title: string, nights: number) => {
  const text = title.toLowerCase();
  let cost = 0;
  if (text.includes("wildlife") || text.includes("corbett") || text.includes("gir ") || text.includes("kaziranga")) cost += 1800;
  if (text.includes("andaman")) cost += 6000 + 900 * nights;
  if (state === "Ladakh") cost += 1800;
  if (text.includes("amarnath")) cost += 1200;
  if (text.includes("char dham") || text.includes("do dham") || text.includes("kedarnath")) cost += 900;
  if (text.includes("bike")) cost += 6500;
  if (text.includes("corporate")) cost += 1200;
  return cost;
};

// Reuse the existing transport estimates, adding enough vehicles for every group.
const vehicleOptions = [
  { seats: 4, factor: 1 }, { seats: 6, factor: 1.15 },
  { seats: 12, factor: 1.9 }, { seats: 16, factor: 2.25 },
  { seats: 20, factor: 2.6 }, { seats: 25, factor: 3 },
  { seats: 30, factor: 3.35 },
];
// All packages use the same capacity estimates. Extend this cache once per worker,
// rather than rebuilding the fleet calculation for every package and every tier.
const transportCosts = [0];
export function transportFactorFor(pax: number) {
  const target = Math.ceil(pax);
  for (let count = transportCosts.length; count <= target; count++) {
    transportCosts[count] = Math.min(...vehicleOptions.map(({ seats, factor }) =>
      factor + transportCosts[Math.max(0, count - seats)]));
  }
  return transportCosts[target];
}

export const TARGET_MARGIN = 0.18;
// User's approved ₹32,000 → ₹25,000 boundary is a total reduction, never compounded.
export const MAX_GROUP_DISCOUNT = 7 / 32;

export function estimatedCostFor(state: string, title: string, nights: number, pax: number) {
  const multiplier = destinationMultiplier[state] ?? 1;
  const roomDiscount = pax <= 4 ? 1 : pax <= 6 ? 0.96 : pax <= 12 ? 0.91 : pax <= 20 ? 0.87 : 0.84;
  const hotel = nights * 3200 * multiplier * roomDiscount / 2;
  const transportPool = (nights + 1) * (3900 * multiplier + 500);
  const transport = transportPool * transportFactorFor(pax) / pax;
  return hotel + transport + specialCost(state, title, nights) + 650 + 120 * nights;
}

export const makePackageRates = (pkg: any): PackageGroupRates => {
  // Published sharing cards remain fixed rates; do not invent supplier costs for them.
  const sharingRates = getGroupSharingRates(pkg) ?? (
    isFixedWeekendGroup(pkg)
      ? (String(pkg?.state ?? "").toLowerCase() === "goa" || /goa/i.test(String(pkg?.title ?? ""))
          ? [{ type: "Quad Sharing", price: 9999 }, { type: "Triple Sharing", price: 11599 }, { type: "Double Sharing", price: 12599 }]
          : [{ type: "Quad Sharing", price: 7499 }, { type: "Triple Sharing", price: 7999 }, { type: "Double Sharing", price: 8499 }])
        .map((rate) => ({ ...rate, price: addGSTToRate(rate.price) }))
      : []);
  if (sharingRates.length) {
    // The group matrix uses double sharing, consistent with the displayed package price.
    const fixedRate = sharingRates.find((rate) => rate.type === "Double Sharing")?.price
      ?? Math.max(...sharingRates.map((rate) => rate.price));
    return { ...Object.fromEntries(GROUP_SIZES.map((pax) => [pax, fixedRate])), sharingRates };
  }

  const state = String(pkg.state ?? "");
  const title = String(pkg.title ?? "");
  const nights = nightsFromDuration(pkg.duration);
  const baseCost = estimatedCostFor(state, title, nights, 2);
  const baseBeforeGST = String(pkg.slug ?? "") === "varanasi-prayagraj-ayodhya"
    ? 28571 : Math.ceil(baseCost / (1 - TARGET_MARGIN) / 500) * 500;
  // Preserve existing 2-person prices. Carry their rounding/override allowance into every tier.
  const allowance = Math.max(0, baseBeforeGST * (1 - TARGET_MARGIN) - baseCost);
  const rates = Object.fromEntries(GROUP_SIZES.map((pax) => {
    const cost = estimatedCostFor(state, title, nights, pax) + allowance;
    const beforeGST = pax === 2 ? baseBeforeGST : Math.ceil(cost / (1 - TARGET_MARGIN) / 500) * 500;
    const minimumPublishedRate = Math.ceil(addGSTToRate(baseBeforeGST) * (1 - MAX_GROUP_DISCOUNT));
    return [pax, Math.max(minimumPublishedRate, addGSTToRate(beforeGST))];
  }));
  return { ...rates, sharingRates: [] };
};
