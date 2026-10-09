type Day = {
  title?: string;
  overnightStay?: string;
  meals?: string;
  notes?: string[];
  optionalActivities?: string[];
  morning?: string[];
  evening?: string[];
};
type PackageCopy = {
  title: string;
  destination: string;
  duration: string;
  highlights?: string[];
  itinerary?: Day[];
  meals?: string[];
  bestTime?: string;
};

const clean = (value: string = "") => value.replace(/\s+/g, " ").trim();
const unique = (items: string[]) => [...new Set(items.map(clean).filter(Boolean))];

export function buildCustomerOverview(pkg: PackageCopy): string {
  const highlights = unique(pkg.highlights ?? []).slice(0, 3);
  return `Explore ${clean(pkg.destination)} on this ${clean(pkg.duration)} tour.${highlights.length ? ` Highlights include ${highlights.join(", ")}.` : ""}`;
}

export function buildPackageFaqs(pkg: PackageCopy) {
  const days = pkg.itinerary ?? [];
  const stays = new Map<string, number>();
  let journeyNights = 0;
  for (const day of days) {
    const raw = clean(day.overnightStay);
    if (!raw || /^No (?:hotel|overnight)/i.test(raw)) continue;
    if (/overnight (?:road )?journey|journey in the vehicle/i.test(raw)) { journeyNights++; continue; }
    const city = raw.replace(/^Night\s*\d+:\s*/i, "").replace(/\s*—.*$/, "");
    stays.set(city, (stays.get(city) ?? 0) + 1);
  }
  const accommodation = [...stays].map(([city, nights]) => `${city}: ${nights} ${nights === 1 ? "night" : "nights"}`).join("; ");
  const firstMeal = clean(days[0]?.meals);
  const hotelMeals = unique(pkg.meals ?? []).map((meal) => meal.replace(/^Buffet /i, "").replace(/\s*\(subject to.*$/i, ""));
  const notes = unique(days.flatMap((day) => day.notes ?? []));
  const condition = notes.find((note) => !/^(Visits follow temple opening|Rides, boat services|Carry valid government|Sightseeing depends on arrival|Road conditions may affect|Walking or trail sections|Paid activities|Special arrangements)/i.test(note));
  const optional = unique(days.flatMap((day) => day.optionalActivities ?? []));
  const firstSentence = (text: string) => text.split(/\.\s+/)[0].replace(/\.$/, "");
  const arrival = days[0]?.morning?.[0] || days[0]?.evening?.[0] || days[0]?.title || pkg.destination;
  const practicalFaq = optional.length
    ? { question: "Which experiences need separate confirmation?", answer: `${firstSentence(optional[0])}. Confirm availability and charges before booking.` }
    : condition
      ? { question: "What should I confirm for this itinerary?", answer: clean(condition) }
      : { question: "How does this tour start?", answer: `${firstSentence(clean(arrival))}.` };
  const meals = journeyNights
    ? `${hotelMeals.join("; ")}. Arrival breakfast, lunches and journey meals are not included unless stated in your booking.`
    : `${hotelMeals.join("; ")}.${firstMeal ? ` Arrival-day meal plan: ${firstMeal}` : ""} Lunch is not included unless explicitly listed.`;

  return [
    { question: `Which places does ${clean(pkg.title)} cover?`, answer: `${clean(pkg.duration)} covering ${clean(pkg.destination)}. Main visits include ${unique(pkg.highlights ?? []).slice(0, 4).join(", ")}.` },
    { question: "Where are the overnight stays?", answer: `${accommodation || "Accommodation follows the stays listed in the itinerary"}.${journeyNights ? ` ${journeyNights} ${journeyNights === 1 ? "night is" : "nights are"} spent on the outbound road journey, separate from accommodation nights.` : ""}${[...stays.keys()].some((city) => /\/|as booked|confirmed/i.test(city)) ? " Alternative stay locations follow the confirmed booking." : ""}` },
    { question: "Which meals are included?", answer: meals },
    { question: `When is the best time for ${clean(pkg.title)}?`, answer: clean(pkg.bestTime) || "Confirm the travel season for this route before choosing dates." },
    practicalFaq,
  ];
}
