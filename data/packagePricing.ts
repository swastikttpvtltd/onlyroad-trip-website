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

const rateFor = (state: string, title: string, nights: number, pax: number) => {
  const multiplier = destinationMultiplier[state] ?? 1;
  const roomDiscount = pax <= 4 ? 1 : pax <= 6 ? 0.96 : pax <= 12 ? 0.91 : pax <= 20 ? 0.87 : 0.84;
  const hotel = nights * 3200 * multiplier * roomDiscount / 2;
  const days = nights + 1;
  const transportPool = days * (3900 * multiplier + 500);
  const vehicles = pax <= 4 ? 1 : pax <= 6 ? 1.15 : pax <= 12 ? 1.9 : pax <= 16 ? 2.25 : pax <= 20 ? 2.6 : pax <= 25 ? 3 : 3.35;
  const transport = transportPool * vehicles / pax;
  const estimatedCost = hotel + transport + specialCost(state, title, nights) + 650 + 120 * nights;
  return Math.ceil((estimatedCost / 0.82) / 500) * 500;
};

export const makePackageRates = (pkg: any) => {
  const state = String(pkg.state ?? "");
  const title = String(pkg.title ?? "");
  const nights = nightsFromDuration(pkg.duration);
  const rates = {
    2: rateFor(state, title, nights, 2),
    4: rateFor(state, title, nights, 4),
    6: rateFor(state, title, nights, 6),
    12: rateFor(state, title, nights, 12),
    16: rateFor(state, title, nights, 16),
    20: rateFor(state, title, nights, 20),
    25: rateFor(state, title, nights, 25),
    30: rateFor(state, title, nights, 30),
  };
  return { ...rates, "30+": Math.max(500, Math.floor(rates[30] * 0.96 / 500) * 500) };
};