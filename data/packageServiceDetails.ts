/** Customer-facing descriptions only; never use these helpers for availability or pricing. */
export type ServicePackage = {
  slug?: string;
  category?: string;
  themes?: string[];
  quickFacts?: { pickup?: string; drop?: string; transport?: string };
};

export function usesSharedTourTransport(pkg: ServicePackage): boolean {
  // Match the shared-transport terms already displayed on the package page.
  return /shared|\bgroup\b/i.test(pkg.quickFacts?.transport ?? "")
    || (pkg.themes ?? []).some((theme) => theme.toLowerCase() === "group tour")
    || String(pkg.category ?? "").toLowerCase() === "weekend";
}

export function customerTransportLabel(pkg: ServicePackage): string {
  const published = String(pkg.quickFacts?.transport ?? "").trim();
  if (!usesSharedTourTransport(pkg)) return published;
  // Keep specific operational qualifications such as AC restrictions on hill sections.
  if (/shared|\bgroup\b/i.test(published)) return published;
  return "Shared group AC vehicle; type and capacity depend on the confirmed group size";
}

export function clarifyServiceInclusions(pkg: ServicePackage, inclusions: string[], hasSharingOptions: boolean): string[] {
  return inclusions.map((item) => {
    if (usesSharedTourTransport(pkg) && item.startsWith("Complete transfers and daily sightseeing by a private air-conditioned vehicle.")) {
      return "Scheduled transfers and sightseeing in a vehicle shared with tour participants. Vehicle type and capacity depend on the confirmed group size and route; a separate vehicle for each booking is not included.";
    }
    if (hasSharingOptions && item === "Accommodation on twin sharing basis for the duration of the tour in the itinerary.") {
      return "Accommodation in the room-sharing option selected for your booking. Confirm room occupancy, bedding and any single-room supplement before payment.";
    }
    return item;
  });
}
