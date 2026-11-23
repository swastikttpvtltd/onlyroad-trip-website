import { buildWeeklyDates, todayPlusDays } from "@/features/fixedDepartures/data/departureCalendar";
export function kashmirDepartureDates() {
 const minimum = todayPlusDays(7);
 return [...buildWeeklyDates(minimum, 4, "2026-12-17"), "2026-12-23", ...buildWeeklyDates("2027-01-01", 4, "2027-12-31")].filter(date => date >= minimum);
}
export function getDepartureDecision(date: string, duration?: string) {
 void duration;
 const bookable = kashmirDepartureDates().includes(date);
 return {bookable, enquiryOnly: false, reason: bookable ? "Scheduled Kashmir departure." : "Select an available Kashmir departure date."};
}
