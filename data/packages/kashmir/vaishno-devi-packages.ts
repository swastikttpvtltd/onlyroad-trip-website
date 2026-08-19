const stay = "3-Star Hotels / Similar";
const meals = "Breakfast & Dinner";

const day = (
  dayNumber: string,
  title: string,
  morning: string[],
  afternoon: string[],
  evening: string[]
) => ({
  day: `Day ${dayNumber}`,
  title,
  morning,
  afternoon,
  evening,
});

const make = (x: any) => ({
  ...x,
  state: "Jammu & Kashmir",
  hero: {
    image: `/images/packages/kashmir/${x.slug}/hero.jpg`,
    shortDescription: x.short,
  },
  gallery: [1, 2, 3, 4, 5].map((n) => ({
    image: `/images/packages/kashmir/${x.slug}/gallery${n}.jpg`,
    alt: `${x.title} – image ${n}`,
  })),
  quickFacts: {
    pickup: "Delhi",
    drop: "Delhi",
    transport: "Group AC Vehicle",
    meals,
    hotelCategory: stay,
    bestSeason: x.bestTime,
  },
  hotels: [{ name: stay, category: "3-Star", star: "3-Star Hotel" }],
  meals: ["Breakfast", "Dinner"],
  inclusions: [
    "Delhi–Katra–Delhi group transportation",
    "2 Nights accommodation in Katra",
    "2 Breakfast",
    "2 Dinner",
    "Group tour coordinator",
    "Basic Vaishno Devi Yatra guidance",
    "Hotel check-in/check-out assistance",
    "Driver, fuel, toll and parking charges as applicable",
  ],
  exclusions: [
    "Pony / horse charges",
    "Helicopter tickets",
    "Battery car charges",
    "Other paid Yatra transportation",
    "Personal expenses",
    "Travel insurance",
    "Personal medical expenses",
    "Any service not specifically mentioned in inclusions",
  ],
  groupSize: "10–30 Persons",
  difficulty: "Easy to Moderate",
});

export const vaishnoDevi = make({
  id: "jk-vaishno-devi-2n3d-group",
  slug: "vaishno-devi-group-yatra",
  title: "Vaishno Devi Group Yatra",
  duration: "2 Nights / 3 Days",
  destination: "Delhi • Katra • Mata Vaishno Devi Bhawan • Katra • Delhi",
  category: "Pilgrimage",
  themes: ["Pilgrimage", "Spiritual", "Group Tour", "Senior Citizen Friendly"],
  pickup: "Delhi",
  drop: "Delhi",
  vibeHook: "Vaishno Devi Calling. Your Journey to Maa Begins Here.",
  short: "A comfortable 2 Nights / 3 Days group pilgrimage from Delhi with two nights in Katra and Mata Vaishno Devi Darshan.",
  overview:
    "A thoughtfully planned group pilgrimage from Delhi to Katra, featuring two comfortable nights in Katra, a dedicated day for Mata Vaishno Devi Darshan and optional Bhairon Ji Darshan, followed by a coordinated return to Delhi.",
  highlights: [
    "Mata Vaishno Devi Darshan",
    "2 Nights stay in Katra",
    "Delhi–Katra–Delhi group travel",
    "Dedicated group coordinator",
    "Optional Bhairon Ji Darshan",
    "Trikuta Hills pilgrimage experience",
    "Senior-citizen-friendly travel guidance",
    "Organised group pilgrimage experience",
  ],
  bestTime: "March – June & September – November",
  itinerary: [
    day(
      "1",
      "Delhi → Katra – The Journey Towards Maa Begins",
      [
        "Group reporting and boarding at the designated Delhi departure point",
        "Tour coordinator introduction, attendance and journey briefing",
        "Begin the comfortable group journey towards Katra",
      ],
      [
        "Continue towards Katra with planned rest / refreshment halt",
        "General travel assistance for group members and senior citizens",
        "Enjoy the changing landscape as the journey approaches Jammu region",
      ],
      [
        "Arrive in Katra as per the operational journey schedule",
        "Hotel check-in and room allocation",
        "Freshen up, relax and attend the next-day Yatra briefing",
        "Dinner at hotel",
        "Night Stay 1 – Katra",
      ]
    ),
    day(
      "2",
      "Mata Vaishno Devi Darshan – The Spiritual Day",
      [
        "Breakfast at the hotel",
        "Prepare for the main Mata Vaishno Devi Yatra",
        "Coordinator briefing regarding meeting points and return coordination",
        "Proceed from Katra towards the Bhawan route",
      ],
      [
        "Continue the approximately 12–13 km traditional pilgrimage route towards Mata Vaishno Devi Bhawan",
        "Complete Darshan according to prevailing Shrine Board arrangements and crowd conditions",
        "Spend devotional time at the holy Bhawan",
        "Optional Bhairon Ji Darshan according to fitness, time and operational conditions",
      ],
      [
        "Begin return journey towards Katra after Darshan",
        "Return to hotel and freshen up",
        "Relax after the day's pilgrimage",
        "Dinner at hotel",
        "Night Stay 2 – Katra",
      ]
    ),
    day(
      "3",
      "Katra → Delhi – Taking Maa's Blessings Back Home",
      [
        "Breakfast at the hotel",
        "Complete hotel check-out",
        "Assemble at the designated group reporting point",
      ],
      [
        "Begin the return group journey from Katra to Delhi",
        "En-route rest / refreshment halt as required",
        "Coordinator continues group and journey assistance",
      ],
      [
        "Continue towards Delhi",
        "Arrival in Delhi according to traffic, road and operational conditions",
        "Tour concludes with the blessings and memories of Mata Vaishno Devi",
      ]
    ),
  ],
});

export default [vaishnoDevi];
