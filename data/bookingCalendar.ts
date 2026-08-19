export type BookingHoliday = { date: string; name: string; kind?: "major" | "festival" };

// Major India travel-impact holidays/festivals for the 2026-27 booking calendar.
// 2026 dates follow the Central Government holiday list; 2027 dates use the
// published 2027 holiday calendars available at implementation time.
export const BOOKING_HOLIDAYS: BookingHoliday[] = [
  // 2026
  { date: "2026-08-15", name: "Independence Day", kind: "major" },
  { date: "2026-08-26", name: "Milad-un-Nabi", kind: "major" },
  { date: "2026-08-28", name: "Raksha Bandhan", kind: "festival" },
  { date: "2026-09-04", name: "Janmashtami", kind: "major" },
  { date: "2026-10-02", name: "Gandhi Jayanti", kind: "major" },
  { date: "2026-10-20", name: "Dussehra", kind: "major" },
  { date: "2026-11-08", name: "Diwali", kind: "major" },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", kind: "major" },
  { date: "2026-12-25", name: "Christmas", kind: "major" },

  // 2027
  { date: "2027-01-26", name: "Republic Day", kind: "major" },
  { date: "2027-03-06", name: "Maha Shivratri", kind: "festival" },
  { date: "2027-03-10", name: "Eid-ul-Fitr", kind: "major" },
  { date: "2027-03-22", name: "Holi", kind: "major" },
  { date: "2027-04-02", name: "Good Friday", kind: "major" },
  { date: "2027-04-15", name: "Ram Navami", kind: "major" },
  { date: "2027-04-19", name: "Mahavir Jayanti", kind: "major" },
  { date: "2027-05-01", name: "Buddha Purnima", kind: "major" },
  { date: "2027-05-17", name: "Eid-ul-Zuha (Bakrid)", kind: "major" },
  { date: "2027-06-15", name: "Muharram", kind: "major" },
  { date: "2027-08-15", name: "Independence Day", kind: "major" },
  { date: "2027-08-17", name: "Raksha Bandhan", kind: "festival" },
  { date: "2027-08-25", name: "Janmashtami", kind: "major" },
  { date: "2027-09-14", name: "Milad-un-Nabi", kind: "major" },
  { date: "2027-10-02", name: "Gandhi Jayanti", kind: "major" },
  { date: "2027-10-08", name: "Dussehra", kind: "major" },
  { date: "2027-10-29", name: "Diwali", kind: "major" },
  { date: "2027-11-14", name: "Guru Nanak Jayanti", kind: "major" },
  { date: "2027-12-25", name: "Christmas", kind: "major" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(value: string) {
  return new Date(`${value}T12:00:00`);
}

export function addDaysISO(value: string | Date, days: number) {
  const date = typeof value === "string" ? parseISODate(value) : new Date(value);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function daysBetween(from: string, to: string) {
  return Math.round((parseISODate(to).getTime() - parseISODate(from).getTime()) / 86400000);
}

export function getHoliday(value: string) {
  return BOOKING_HOLIDAYS.find((holiday) => holiday.date === value);
}

export function getDurationNights(duration?: string) {
  const text = String(duration ?? "");
  const longMatch = text.match(/(\d+)\s*Nights?/i);
  if (longMatch) return Number(longMatch[1]);
  const shortMatch = text.match(/(\d+)\s*N\b/i);
  return Number(shortMatch?.[1] ?? 0);
}

export function getDurationDays(duration?: string) {
  const nights = getDurationNights(duration);
  if (nights > 0) return nights + 1;
  const dayMatch = String(duration ?? "").match(/(\d+)\s*Days?/i);
  return Number(dayMatch?.[1] ?? 1);
}

// Returns a holiday occurring on the departure date or on any day during
// the trip. This is the key rule used to cancel an online departure slot.
export function getTripHoliday(departure: string, duration?: string) {
  const nights = getDurationNights(duration);
  for (let offset = 0; offset <= Math.max(nights, 0); offset += 1) {
    const holiday = getHoliday(addDaysISO(departure, offset));
    if (holiday) return holiday;
  }
  return undefined;
}

export function isBookingLeadEligible(departure: string, today = toISODate(new Date())) {
  return daysBetween(today, departure) >= 7;
}

export function isPastDate(value: string, today = toISODate(new Date())) {
  return daysBetween(today, value) < 0;
}

export function buildFridays(from: string, monthsAhead = 18) {
  const start = parseISODate(from);
  const end = new Date(start);
  end.setMonth(end.getMonth() + monthsAhead);
  const cursor = new Date(start);
  while (cursor.getDay() !== 5) cursor.setDate(cursor.getDate() + 1);
  const dates: string[] = [];
  while (cursor <= end) {
    dates.push(toISODate(cursor));
    cursor.setDate(cursor.getDate() + 7);
  }
  return dates;
}

export function monthLabel(value: string) {
  return parseISODate(`${value.slice(0, 7)}-01`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function formatBookingDate(value: string) {
  return parseISODate(value).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}
