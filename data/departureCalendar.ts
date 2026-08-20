export type Holiday = { date: string; name: string };

// Central/national holiday dates used for the travel-booking blackout policy.
// Lunar dates follow the published government calendars and can be adjusted here if an official notice changes them.
export const TRAVEL_HOLIDAYS: Holiday[] = [
  { date: "2026-08-15", name: "Independence Day" },
  { date: "2026-08-26", name: "Milad-un-Nabi / Id-e-Milad" },
  { date: "2026-08-28", name: "Raksha Bandhan" },
  { date: "2026-09-04", name: "Janmashtami" },
  { date: "2026-10-02", name: "Mahatma Gandhi Jayanti" },
  { date: "2026-10-18", name: "Dussehra Saptami" },
  { date: "2026-10-19", name: "Dussehra Mahashtami" },
  { date: "2026-10-20", name: "Dussehra / Vijay Dashmi" },
  { date: "2026-10-26", name: "Maharishi Valmiki Jayanti" },
  { date: "2026-11-08", name: "Diwali / Deepavali" },
  { date: "2026-11-09", name: "Govardhan Puja" },
  { date: "2026-11-11", name: "Bhai Dooj" },
  { date: "2026-11-15", name: "Chhath Puja" },
  { date: "2026-11-24", name: "Guru Nanak Jayanti" },
  { date: "2026-12-25", name: "Christmas Day" },
  { date: "2027-01-26", name: "Republic Day" },
  { date: "2027-03-10", name: "Id-ul-Fitr" },
  { date: "2027-03-23", name: "Holi" },
  { date: "2027-03-26", name: "Good Friday" },
  { date: "2027-04-14", name: "Dr. B. R. Ambedkar Jayanti" },
  { date: "2027-04-15", name: "Ram Navami" },
  { date: "2027-04-19", name: "Mahavir Jayanti" },
  { date: "2027-05-01", name: "Buddha Purnima / May Day" },
  { date: "2027-05-17", name: "Id-ul-Zuha / Bakrid" },
  { date: "2027-05-20", name: "Buddha Purnima" },
  { date: "2027-06-16", name: "Muharram" },
  { date: "2027-08-15", name: "Independence Day / Milad-un-Nabi" },
  { date: "2027-08-25", name: "Janmashtami" },
  { date: "2027-10-02", name: "Mahatma Gandhi Jayanti" },
  { date: "2027-10-09", name: "Dussehra / Vijay Dashmi" },
  { date: "2027-10-29", name: "Diwali / Deepavali" },
  { date: "2027-11-14", name: "Guru Nanak Jayanti" },
  { date: "2027-12-25", name: "Christmas Day" },
];

const holidayMap = new Map(TRAVEL_HOLIDAYS.map((holiday) => [holiday.date, holiday.name]));

export function isoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function addDays(value: string | Date, days: number): Date {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : new Date(value);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

export function todayPlusDays(days: number): string {
  return isoDate(addDays(new Date(), days));
}

export function parseDurationNights(duration?: string): number {
  const nights = Number(String(duration ?? "").match(/(\d+)\s*Nights?/i)?.[1]);
  if (Number.isFinite(nights) && nights >= 0) return nights;
  const days = Number(String(duration ?? "").match(/(\d+)\s*Days?/i)?.[1]);
  return Number.isFinite(days) && days > 0 ? Math.max(0, days - 1) : 0;
}

export function arrivalDateFor(departureDate: string, duration?: string): string {
  return isoDate(addDays(departureDate, parseDurationNights(duration)));
}

export function getHolidayOverlap(departureDate: string, duration?: string): Holiday | null {
  if (!departureDate) return null;
  const end = arrivalDateFor(departureDate, duration);
  let cursor = new Date(`${departureDate}T12:00:00`);
  const last = new Date(`${end}T12:00:00`);
  while (cursor <= last) {
    const date = isoDate(cursor);
    const name = holidayMap.get(date);
    if (name) return { date, name };
    cursor = addDays(cursor, 1);
  }
  return null;
}

export function getDepartureDecision(departureDate: string, duration?: string) {
  if (!departureDate) return { bookable: false, enquiryOnly: false, reason: "Select a travel date." };
  const minDate = todayPlusDays(7);
  if (departureDate < minDate) {
    return { bookable: false, enquiryOnly: true, reason: "Online booking requires at least 7 clear days before travel." };
  }
  const holiday = getHolidayOverlap(departureDate, duration);
  if (holiday) {
    return { bookable: false, enquiryOnly: true, reason: `${holiday.name} falls during this trip (${holiday.date}).` };
  }
  return { bookable: true, enquiryOnly: false, reason: "Online booking available." };
}

export function isTravelHoliday(date: string): boolean {
  return holidayMap.has(date);
}

export function holidayName(date: string): string | undefined {
  return holidayMap.get(date);
}

export function buildFridayDates(startDate: string, endDate = "2027-12-31"): string[] {
  const result: string[] = [];
  let cursor = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  while (cursor <= end) {
    if (cursor.getDay() === 5) result.push(isoDate(cursor));
    cursor = addDays(cursor, 1);
  }
  return result;
}
