import { addGSTToRate } from "./priceTax";

export type GroupSharingRate = {
  type: "Quad Sharing" | "Triple Sharing" | "Double Sharing";
  price: number;
};

export function isGroupTourPackage(pkg: any) {
  const text = `${pkg?.packageId ?? ""} ${pkg?.title ?? ""} ${pkg?.category ?? ""} ${pkg?.duration ?? ""} ${(pkg?.themes ?? []).join(" ")}`.toLowerCase();
  return text.includes("group tour") || text.includes("group-tour") || text.includes("group") || (text.includes("weekend") && text.includes("2 nights / 3 days"));
}

export function getGroupSharingRates(pkg: any): GroupSharingRate[] | null {
  if (!isGroupTourPackage(pkg)) return null;

  const text = `${pkg?.title ?? ""} ${pkg?.packageId ?? ""}`.toLowerCase();
  const state = String(pkg?.state ?? "").toLowerCase();

  if (text.includes("goa") || state === "goa") {
    return [
      { type: "Quad Sharing", price: addGSTToRate(9999) },
      { type: "Triple Sharing", price: addGSTToRate(11599) },
      { type: "Double Sharing", price: addGSTToRate(12599) },
    ];
  }

  if (text.includes("char-dham") || text.includes("char dham")) {
    return [
      { type: "Quad Sharing", price: addGSTToRate(25400) },
      { type: "Triple Sharing", price: addGSTToRate(29999) },
      { type: "Double Sharing", price: addGSTToRate(34500) },
    ];
  }

  if (text.includes("do-dham") || text.includes("do dham") || text.includes("kedarnath-badrinath")) {
    return [
      { type: "Quad Sharing", price: addGSTToRate(20500) },
      { type: "Triple Sharing", price: addGSTToRate(22999) },
      { type: "Double Sharing", price: addGSTToRate(29500) },
    ];
  }

  if ((state.includes("himachal") || state.includes("uttarakhand")) && /2 nights\s*\/\s*3 days/i.test(String(pkg?.duration ?? ""))) {
    return [
      { type: "Quad Sharing", price: addGSTToRate(7499) },
      { type: "Triple Sharing", price: addGSTToRate(7999) },
      { type: "Double Sharing", price: addGSTToRate(8499) },
    ];
  }

  // Kedarnath single-yatra rate has not been supplied yet.
  return null;
}

export function getGroupTourDisplayPrice(pkg: any): number | null {
  const rates = getGroupSharingRates(pkg);
  return rates ? Math.max(...rates.map((rate) => rate.price)) : null;
}

/**
 * Pilgrimage group-tour departure season requested for the website:
 * - Current season: from the current August 2026 calendar through 22 Oct 2026.
 * - Next season: starts May 2027 and closes before 25 Oct 2027.
 * Weekly departures are Fridays; 22 Oct 2026 is also kept as the requested
 * season-closing date, even though it falls on Thursday.
 */
export function getPilgrimageGroupTourDates() {
  const dates: string[] = [];

  const addFridays = (start: string, end: string) => {
    const cursor = new Date(`${start}T12:00:00`);
    const last = new Date(`${end}T12:00:00`);
    while (cursor <= last) {
      if (cursor.getDay() === 5) {
        dates.push(cursor.toISOString().slice(0, 10));
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  };

  addFridays("2026-08-21", "2026-10-22");
  if (!dates.includes("2026-10-22")) dates.push("2026-10-22");
  addFridays("2027-05-07", "2027-10-22");

  return dates.sort();
}
