import detailedItineraries from "./detailedItineraries.json";
import { formatItineraryDay } from "./itineraryDay";

export type DetailedItineraryDay = {
  day: string | number;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  description?: string;
  attractions?: string[];
  optionalActivities?: string[];
  overnightStay?: string;
  meals?: string;
  distance?: string;
  driveTime?: string;
  notes?: string[];
  itineraryId?: string;
};

type ItineraryEntry = { sources: string[]; itinerary: DetailedItineraryDay[] };
const entries = detailedItineraries as Record<string, ItineraryEntry>;

export function getDetailedItinerary(slug: string, packageId: string, fallback: DetailedItineraryDay[]) {
  return (entries[slug]?.itinerary ?? fallback).map((day, index) => {
    const label = formatItineraryDay(day.day, index + 1);
    // Somnath's Triveni Sangam is distinct from the Prayagraj confluence.
    const correctedDay = ["dwarka-somnath", "gujarat-grand-tour"].includes(slug)
      ? { ...day, morning: day.morning.map(text => text.replace("Visit Bhalka Tirth and Triveni Sangam. Allow time to experience the river confluence area in Prayagraj;", "Visit Bhalka Tirth and Triveni Sangam in Somnath. Allow time to experience the river confluence area;")) }
      : day;
    return { ...correctedDay, day: label, itineraryId: `${packageId}-D${label.replace(/^Day\s+/i, "")}` };
  });
}
