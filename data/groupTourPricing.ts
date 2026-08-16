export type GroupSharingRate = { type: "Quad Sharing" | "Triple Sharing" | "Double Sharing"; price: number };

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
      { type: "Quad Sharing", price: 9999 },
      { type: "Triple Sharing", price: 11599 },
      { type: "Double Sharing", price: 12599 },
    ];
  }
  if ((state.includes("himachal") || state.includes("uttarakhand")) && /2 nights\s*\/\s*3 days/i.test(String(pkg?.duration ?? ""))) {
    return [
      { type: "Quad Sharing", price: 7499 },
      { type: "Triple Sharing", price: 7999 },
      { type: "Double Sharing", price: 8499 },
    ];
  }
  return null;
}

export function getGroupTourStartingPrice(pkg: any) {
  return getGroupSharingRates(pkg)?.[0]?.price ?? Number(pkg?.price ?? 0);
}
