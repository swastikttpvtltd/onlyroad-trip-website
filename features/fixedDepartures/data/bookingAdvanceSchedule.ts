export const bookingPolicyUrl = "https://www.onlyroadtrip.com/booking-policy";

export const bookingAdvanceSchedule = [
  "30 calendar days or more before departure: Pay 30% of the total package amount at booking. The remaining 70% is due by the date stated in your booking documents.",
  "Less than 30 calendar days before departure: Pay 100% of the total package amount at booking.",
  "Days are counted in IST, with the booking date as day zero. Any supplier-specific full-payment requirement will be disclosed before payment.",
];

export function usesWeekendAdvance(pkg: { slug?: string; state?: string; category?: string; themes?: string[] }) {
  return !/goa|lonavala/i.test([pkg.slug, pkg.state].join(" ")) &&
    /\bweekend\b/i.test([pkg.slug, pkg.category, ...(pkg.themes ?? [])].join(" "));
}

export const weekendBookingAdvanceSchedule = [
  "More than 15 calendar days before departure: Pay 30% at booking. The remaining 70% is due 7 days before departure.",
  "15 calendar days or fewer before departure: Pay 100% at booking.",
];
