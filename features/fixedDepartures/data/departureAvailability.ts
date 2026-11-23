export const GROUP_CAPACITY = 45;
export function getDepartureAvailability(remainingSeats: number | null) {
  if (remainingSeats === null) return { label: "On request", className: "bg-slate-100 text-slate-600", bookable: false };
  if (!Number.isInteger(remainingSeats) || remainingSeats < 0 || remainingSeats > GROUP_CAPACITY) throw new Error("Invalid departure seat count");
  if (remainingSeats === 0) return { label: "Housefull", className: "bg-red-50 text-red-700", bookable: false };
  if (remainingSeats <= 3) return { label: "Filling Fast · " + remainingSeats + (remainingSeats === 1 ? " seat" : " seats"), className: "bg-amber-50 text-amber-800", bookable: true };
  return { label: remainingSeats > 8 ? "8+ seats" : remainingSeats + " seats", className: "bg-emerald-50 text-emerald-700", bookable: true };
}
