import { currencyFaq } from "./currencyContent";
import { hotels as recommendedHotels } from "./hotels";
import { isGroupTourBookingPaused } from "./groupTourBookingPause";
import { customerTransportLabel, usesSharedTourTransport, type ServicePackage } from "./packageServiceDetails";

type Day = {
  day?: string;
  title?: string;
  overnightStay?: string;
  meals?: string;
  notes?: string[];
  optionalActivities?: string[];
  distance?: string;
  driveTime?: string;
  morning?: string[];
  evening?: string[];
};
type PackageCopy = ServicePackage & {
  title: string;
  destination: string;
  duration: string;
  highlights?: string[];
  itinerary?: Day[];
  hotels?: { name: string }[];
  meals?: string[];
  bestTime?: string;
  difficulty?: string;
  price?: number;
  displayPriceBasis?: string;
  priceBasis?: string;
  inclusions?: string[];
  exclusions?: string[];
  groupRates?: { sharingRates?: { type: string; price: number }[] };
};

const clean = (value: string = "") => value.replace(/\s+/g, " ").trim();
const money = (amount: number) => `INR ${amount.toLocaleString("en-IN")}`;
const unique = (items: string[]) => [...new Set(items.map(clean).filter(Boolean))];

export function buildCustomerOverview(pkg: PackageCopy): string {
  const highlights = unique(pkg.highlights ?? []).slice(0, 3);
  return `Explore ${clean(pkg.destination)} on this ${clean(pkg.duration)} tour.${highlights.length ? ` Highlights include ${highlights.join(", ")}.` : ""}`;
}

function routeConfirmationFaq(pkg: PackageCopy, practical: { question: string; answer: string }) {
  // Match the actual route, not incidental mentions in shared boilerplate notes.
  const route = `${pkg.slug ?? ""} ${pkg.title} ${pkg.destination}`.toLowerCase();
  if (/kedarnath|char.dham|badrinath|vaishno|amarnath|yamunotri|gangotri/.test(route)) {
    return { question: "Are yatra registration, darshan and trek transport included?", answer: "Temple access, registration and permitted travel dates depend on the relevant authorities. Ask for the required documents, who arranges registration, and any charges before payment. Ordinary darshan does not promise a priority slot. Pony, palki, porter and helicopter services are not included unless expressly listed in your confirmed inclusions; availability and weather restrictions apply." };
  }
  if (/ladakh|leh|sikkim/.test(route)) {
    return { question: "What should I confirm about permits and high-altitude travel?", answer: "Confirm the exact route, permit eligibility, document requirements, permit charges and acclimatisation stops before payment. Restricted-area access depends on current permissions and traveller eligibility. Oxygen, a medical escort or a specific support vehicle must not be assumed included; request and confirm any required assistance separately." };
  }
  if (/andaman|havelock|swaraj dweep|shaheed dweep|neil island|alleppey|alappuzha|houseboat/.test(route)) {
    return { question: "How are ferry, boat or houseboat arrangements confirmed?", answer: "Ask which ferry or boat legs are included, the service category, luggage limits, connection times and any separately charged transfers. For a houseboat stay, confirm the room, private/shared basis, meals and AC operating hours. Sailing and sightseeing depend on weather and local permissions; obtain the applicable alternative and cancellation terms before payment." };
  }
  if (/gir-national|corbett|kaziranga|ranthambore|kanha|bandhavgarh|safari|wildlife/.test(route)) {
    return { question: "Is the safari permit, vehicle and guide included?", answer: "A destination visit does not by itself confirm a safari slot. Check the Inclusions & Exclusions for this package and request written confirmation of the permit, zone, date, safari vehicle, guide and any extra charges before payment. Availability depends on the park operator; wildlife sightings are not guaranteed. Confirm the applicable alternative if the requested slot cannot be obtained." };
  }
  if (/varanasi|kashi|prayagraj|allahabad/.test(route)) {
    const included = (pkg.inclusions ?? []).filter((line) => /boat-ride charges/i.test(line));
    return { question: "Are boat rides and special darshan arrangements included?", answer: `${included.length ? included.join(" ") : "Boat rides are included only where expressly listed in this package's Inclusions."} Confirm the boarding point, shared/private basis and ride duration before payment. Special darshan, ritual or guide services must be expressly confirmed; temple queues and river permissions can affect the itinerary. Request the applicable alternative if an included ride cannot operate.` };
  }
  return practical;
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
  // The day-wise meal field avoids implying breakfast on arrival or dinner after departure.
  const mealSchedule = days.filter((day) => clean(day.meals)).map((day, index) => `${clean(day.day) || `Itinerary day ${index + 1}`}: ${clean(day.meals)}`).join("; ");
  const hotelMeals = unique(pkg.meals ?? []).join("; ");
  const notes = unique(days.flatMap((day) => day.notes ?? []));
  const condition = notes.find((note) => !/^(Visits follow temple opening|Rides, boat services|Carry valid government|Sightseeing depends on arrival|Road conditions may affect|Walking or trail sections|Paid activities|Special arrangements)/i.test(note));
  const optional = unique(days.flatMap((day) => day.optionalActivities ?? []));
  const firstSentence = (text: string) => text.split(/\.\s+/)[0].replace(/\.$/, "");
  const arrival = days[0]?.morning?.[0] || days[0]?.evening?.[0] || days[0]?.title || pkg.destination;
  const practicalFaq = optional.length
    ? { question: "Which experiences need separate confirmation?", answer: `${firstSentence(optional[0])}. Confirm availability and charges before payment; an optional experience is not an included reservation.` }
    : condition
      ? { question: "What should I confirm for this itinerary?", answer: clean(condition) }
      : { question: "How does this tour start?", answer: `${firstSentence(clean(arrival))}. Confirm the reporting location and time before arranging onward travel.` };
  const hotels = unique((pkg.hotels ?? []).map((hotel) => hotel.name));
  const sharing = unique((pkg.groupRates?.sharingRates ?? []).map((rate) => rate.type));
  const excluded = unique(pkg.exclusions ?? []);
  const transport = customerTransportLabel(pkg);
  const pickup = clean(pkg.quickFacts?.pickup);
  const drop = clean(pkg.quickFacts?.drop);

  const starts = unique([...(days[0]?.morning ?? []), ...(days[0]?.evening ?? [])])
    .filter((line) => /pickup|pick.up|report|boarding|arrival|arrive|meet/i.test(line)).slice(0, 2);
  const lastDay = days[days.length - 1];
  const ends = unique([...(lastDay?.morning ?? []), ...(lastDay?.evening ?? [])])
    .filter((line) => /drop|depart|airport|railway|station|tour concludes|return/i.test(line)).slice(0, 2);
  const arrivalDetails = [...(starts.length ? [`Arrival instructions: ${starts.join("; ")}`] : []), ...(ends.length ? [`Departure instructions: ${ends.join("; ")}`] : [])].join(". ");
  const longestDrive = days.map((day) => ({ day, hours: Math.max(0, ...(day.driveTime?.match(/\d+(?:\.\d+)?/g) ?? []).map(Number)) }))
    .filter(({ day, hours }) => Boolean(day.driveTime) && hours > 0 && hours <= 24)
    .sort((a, b) => b.hours - a.hours)[0]?.day;
  const drivingDetails = longestDrive
    ? `One of the longest published driving segments is ${clean(longestDrive.day) || clean(longestDrive.title)}: ${clean(longestDrive.driveTime)}${longestDrive.distance ? ` (${clean(longestDrive.distance)})` : ""}. These are itinerary estimates, not fixed arrival times.`
    : "The itinerary does not provide a numeric driving-time estimate for every segment; obtain the travel-time and walking plan for your chosen route.";
  const recommended = /kashi|varanasi/i.test(pkg.title) && /ayodhya|prayagraj|allahabad/i.test(pkg.destination)
    ? [recommendedHotels.varanasi, recommendedHotels.ayodhya].filter((hotel) => hotel.name && pkg.destination.toLowerCase().includes(hotel.city.split(",")[0].toLowerCase())) : [];
  const hotelOptions = recommended.length
    ? ` Recommended options already shown on this page: ${recommended.map((hotel) => `${hotel.city.split(",")[0]} — ${hotel.name}`).join("; ")}. These are recommendations, not confirmed allocations.` : " No named hotel is allocated by the category label alone.";
  const sharingDetails = sharing.length
    ? (pkg.groupRates?.sharingRates ?? []).map((rate) => `${rate.type}: ${money(rate.price)} per person`).join("; ")
    : "";
  const priceDetails = Number.isFinite(pkg.price) && Number(pkg.price) > 0
    ? `Displayed package rate: ${money(Number(pkg.price))} per person${pkg.displayPriceBasis ? ` (${pkg.displayPriceBasis === "2 Travellers" ? "two travellers, double sharing" : clean(pkg.displayPriceBasis)})` : ""}.`
    : "The current package rate needs a written quotation.";
  const taxDetails = /5% GST Included/i.test(pkg.priceBasis ?? "") || (pkg.inclusions ?? []).some((line) => /5% GST included/i.test(line))
    ? " The published rate includes 5% GST." : " Check the tax basis in the final quotation.";
  const exclusionPriorities = [/(?:entrance|entry|admission|monument)/i, /lunch/i, ...(/yatra|kedarnath|badrinath|char.dham|vaishno|amarnath/i.test(`${pkg.slug} ${pkg.title}`) ? [/(?:horse|helicopter|doli|chopper)/i] : []), /(?:optional|add.on)/i, /individual.*transfer/i];
  const relevantExclusions = unique(exclusionPriorities.flatMap((pattern) => excluded.find((line) => pattern.test(line)) ?? [])).slice(0, 4);
  const paused = Boolean(pkg.slug && isGroupTourBookingPaused(pkg.slug));


  return [
    { question: `Which places does ${clean(pkg.title)} cover?`, answer: `${clean(pkg.duration)} covering ${clean(pkg.destination)}.${pkg.highlights?.length ? ` Main visits include ${unique(pkg.highlights).slice(0, 4).join(", ")}.` : ""} Use the day-wise itinerary for the planned route and daily travel.` },
    { question: "Where are the overnight stays, and are any nights spent travelling?", answer: `${accommodation || "Stays follow the night-wise locations listed in the itinerary"}.${journeyNights ? ` ${journeyNights} ${journeyNights === 1 ? "night is" : "nights are"} spent on an overnight road journey, separate from accommodation nights.` : ""}${[...stays.keys()].some((city) => /\/|as booked|confirmed/i.test(city)) ? " Alternative stay locations require confirmation for your booking." : ""} Hotel check-in/check-out times and any early check-in or extra night must be confirmed separately.` },
    { question: "Which hotel and room will I receive?", answer: `Published accommodation: ${hotels.join("; ") || "property details await confirmation"}. ${hotelOptions} The final hotel name, room category and any substitution need written confirmation for your dates before payment. Lift access, heating, hot water and accessible bathrooms require property-specific confirmation.` },
    { question: "Which meals are included on each day?", answer: `${mealSchedule || hotelMeals || "Request the day-wise meal plan before payment"}. Meals outside the published plan, including journey meals or arrival/departure meals not listed, are not automatically included. Buffet service depends on the hotel's service format and occupancy. Confirm vegetarian/Jain food, allergies and any special meal charges in advance.` },
    { question: "Is transport private or shared, and which vehicle will be used?", answer: `${transport ? `Published transport: ${transport}.` : "The vehicle arrangement needs confirmation before payment."} ${usesSharedTourTransport(pkg) ? "Transport is shared with tour participants; a dedicated vehicle per booking or a particular seat/model is not promised." : "Where private transport is listed, it is for your booked party on the scheduled itinerary; a specific model is not promised unless confirmed."} Confirm vehicle category, capacity, luggage allowance, AC restrictions and any chargeable local transport. Scheduled transport does not mean unrestricted 24-hour vehicle use.` },
    { question: "Where do pickup and drop happen? Are airport or station transfers included?", answer: `${pickup ? `Published pickup: ${pickup}.` : "Pickup location needs confirmation."} ${drop ? `Published drop: ${drop}.` : "Drop location needs confirmation."} ${arrivalDetails ? `${arrivalDetails}.` : "The itinerary does not provide an exact reporting address or time."} Only the pickup/drop arrangements expressly included in the confirmed itinerary are included; individual transfers outside that scope may cost extra. Confirm the exact meeting point, reporting time, arrival cutoff, late-arrival plan and any extra transfer charge before payment. Allow a road-traffic buffer when booking flights or trains.` },
    { question: "What does room sharing mean, and what about children or a single room?", answer: `${sharing.length ? `Available sharing rates: ${sharingDetails}. These are per-person rates for the selected sharing type, not the total room price.` : "The standard inclusion specifies twin sharing; request a separate quotation for a different occupancy."} Confirm actual beds, extra mattress/bed, child age and meal entitlement, and any single-room supplement before payment. Sharing labels alone do not confirm the bedding arrangement or an accessible room.` },
    { question: "What is the price basis, and which charges are extra?", answer: `${priceDetails}${taxDetails} ${excluded.length ? `Examples of published exclusions: ${(relevantExclusions.length ? relevantExclusions : excluded.slice(0, 3)).join("; ")}.` : "Request an itemised inclusion/exclusion list before payment."} Read the full Inclusions & Exclusions on this page for the remaining items. Ask for an itemised quote for required permits, local taxis, tickets and activities; a sightseeing place appearing in the itinerary does not itself include its admission fee. Add-ons need a separately agreed price.` },
    { question: `When is the best time for ${clean(pkg.title)}, and does a selectable date confirm availability?`, answer: `${paused ? "Online booking is currently paused for this package; contact the team about your dates before making payment. " : ""}${clean(pkg.bestTime) || "Confirm the operating season for this route"}. Best Time is planning guidance. A date shown in the calendar does not itself confirm hotel, transport, permit or activity inventory; arrangements need separate written confirmation.` },
    routeConfirmationFaq(pkg, practicalFaq),
    { question: "Is this trip suitable for seniors, children or travellers needing assistance?", answer: `${pkg.difficulty ? `Published difficulty: ${clean(pkg.difficulty)}. ` : ""}${drivingDetails} Tell the team about mobility needs, wheelchair size, children’s ages and required assistance before payment. Actual walking distances, stairs, accessible bathrooms and vehicle access need route/property-specific confirmation. An “Easy” label alone does not mean step-free access. Wheelchair support, a medical escort or specialist equipment is included only if expressly agreed, with any extra cost disclosed.` },
    { question: "What happens if weather, closures or traffic change the plan?", answer: "Sightseeing order, access and travel time may change with weather, road conditions, authority restrictions or attraction operations. Ask how route-specific alternatives, extra nights, local transport and any unused service are treated under the confirmed booking terms. A replacement, extra charge or refund must not be assumed without checking the applicable terms. For a booking-specific issue, contact Only Road Trip at +91 92117 96168 or info@onlyroadtrip.com with your booking reference." },
    { question: "What are the cancellation charges, date-change rules and refund timeline?", answer: "The published indicative package-cancellation table is: 30+ days before departure — 10%; 15–29 days — 25%; 7–14 days — 50%; 3–6 days — 75%; less than 72 hours or no-show — 100% of the total booking amount. These are cancellation charges, not refund percentages. Supplier, hotel, seasonal and package-specific terms may differ, so read the full Cancellation Policy and retain the terms accepted for your booking. Submit cancellation in writing; the policy bases the effective date on the company’s acknowledgement. A date change is not automatically free. The Refund Policy specifies credit within 24–48 hours after refund approval, not after the initial request; applicable deductions and supplier terms govern eligibility. For an approved refund not received within 48 hours, email info@onlyroadtrip.com with your booking reference." },
    { question: "How much do I pay, and when is my booking finally confirmed?", answer: "The current checkout rule is 30% advance when departure is 30 or more calendar days away, and 100% payment when it is less than 30 calendar days away; calendar days are counted in IST with today as day zero. Check the actual INR amount and any expressly agreed supplier-specific requirement before paying. Payment alone is not final booking confirmation. Obtain separate written confirmation identifying the itinerary, dates, travellers, hotel/room arrangement, transport, inclusions and agreed extras. Check the Booking Policy and the payment amount shown at checkout before paying; resolve any mismatch with the team first. Retain both the payment receipt and the written booking confirmation." },
    currencyFaq,
  ].map((faq) => ({ ...faq, question: clean(faq.question), answer: clean(faq.answer) }));
}
