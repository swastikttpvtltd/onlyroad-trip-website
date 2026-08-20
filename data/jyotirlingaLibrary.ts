export type JyotirlingaTemple = {
  order: number;
  name: string;
  commonlyUsedName: string;
  location: string;
  state: string;
  region: string;
  bestSeason: string;
  nearbyHighlights: string[];
  planningNotes: string[];
};

export const jyotirlingaTemples: JyotirlingaTemple[] = [
  { order: 1, name: "Somnath Jyotirlinga", commonlyUsedName: "Somnath Temple", location: "Prabhas Patan, Veraval", state: "Gujarat", region: "West", bestSeason: "October–March", nearbyHighlights: ["Triveni Sangam", "Bhalka Tirth", "Somnath seafront", "Prabhas Patan"], planningNotes: ["Commonly paired with Nageshwar and Dwarka", "Allow buffer for darshan and evening temple programme"] },
  { order: 2, name: "Mallikarjuna Jyotirlinga", commonlyUsedName: "Srisailam Mallikarjuna", location: "Srisailam", state: "Andhra Pradesh", region: "South", bestSeason: "October–March", nearbyHighlights: ["Bhramaramba Devi Temple", "Krishna River", "Srisailam viewpoints", "Pataladhara"], planningNotes: ["A remote leg; pair with Hyderabad gateway", "Temple timings and crowd conditions can change"] },
  { order: 3, name: "Mahakaleshwar Jyotirlinga", commonlyUsedName: "Mahakal Temple", location: "Ujjain", state: "Madhya Pradesh", region: "Central", bestSeason: "October–March", nearbyHighlights: ["Mahakal Lok", "Ram Ghat", "Harsiddhi Temple", "Kal Bhairav Temple"], planningNotes: ["Bhasma Aarti requires advance official booking/eligibility", "Keep an early-morning buffer"] },
  { order: 4, name: "Omkareshwar Jyotirlinga", commonlyUsedName: "Omkareshwar Temple", location: "Mandhata Island, Khandwa", state: "Madhya Pradesh", region: "Central", bestSeason: "October–March", nearbyHighlights: ["Narmada Ghats", "Mamleshwar Temple", "Omkareshwar Parikrama", "Siddhanath Temple"], planningNotes: ["Often paired with Mahakaleshwar", "Allow time for island-side traffic and walking"] },
  { order: 5, name: "Kedarnath Jyotirlinga", commonlyUsedName: "Kedarnath Temple", location: "Kedarnath, Rudraprayag", state: "Uttarakhand", region: "North", bestSeason: "May–June and September–October, subject to opening/closing dates", nearbyHighlights: ["Kedarnath Valley", "Mandakini River", "Gaurikund", "Bhairavnath Temple"], planningNotes: ["High-altitude pilgrimage with trekking/helicopter logistics", "Weather can disrupt transfers and darshan"] },
  { order: 6, name: "Bhimashankar Jyotirlinga", commonlyUsedName: "Bhimashankar Temple", location: "Bhimashankar, Pune district", state: "Maharashtra", region: "West", bestSeason: "October–February", nearbyHighlights: ["Bhimashankar Wildlife Sanctuary", "Gupt Bhimashankar", "Forest trails", "Pune"], planningNotes: ["Road journey includes hilly sections", "Monsoon access can be slower"] },
  { order: 7, name: "Kashi Vishwanath Jyotirlinga", commonlyUsedName: "Kashi Vishwanath Temple", location: "Varanasi", state: "Uttar Pradesh", region: "North", bestSeason: "October–March", nearbyHighlights: ["Kashi Vishwanath Corridor", "Dashashwamedh Ghat", "Ganga Aarti", "Sarnath"], planningNotes: ["Darshan/aarati access is governed by official temple systems", "Build flexible time around old-city traffic"] },
  { order: 8, name: "Trimbakeshwar Jyotirlinga", commonlyUsedName: "Trimbakeshwar Temple", location: "Trimbak, Nashik district", state: "Maharashtra", region: "West", bestSeason: "October–February", nearbyHighlights: ["Kushavarta Kund", "Brahmagiri Hills", "Nashik Panchavati", "Godavari source region"], planningNotes: ["Easy to combine with Grishneshwar and Bhimashankar", "Temple queue times vary"] },
  { order: 9, name: "Baidyanath Jyotirlinga", commonlyUsedName: "Baba Baidyanath Dham", location: "Deoghar", state: "Jharkhand", region: "East", bestSeason: "October–March", nearbyHighlights: ["Baidyanath Temple complex", "Naulakha Temple", "Tapovan", "Trikut Hills"], planningNotes: ["Shravan season is exceptionally busy", "Deoghar airport/rail connectivity can be used depending on itinerary"] },
  { order: 10, name: "Nageshwar Jyotirlinga", commonlyUsedName: "Nageshwar Temple", location: "Near Dwarka", state: "Gujarat", region: "West", bestSeason: "October–March", nearbyHighlights: ["Dwarkadhish Temple", "Bet Dwarka", "Gopi Talav", "Rukmini Devi Temple"], planningNotes: ["Naturally pairs with Somnath and Dwarka", "Ferry/Bet Dwarka access depends on local operations and weather"] },
  { order: 11, name: "Rameshwaram Jyotirlinga", commonlyUsedName: "Ramanathaswamy Temple", location: "Rameswaram Island", state: "Tamil Nadu", region: "South", bestSeason: "October–March", nearbyHighlights: ["Ramanathaswamy Temple corridors", "Dhanushkodi", "Pamban Bridge", "Agni Theertham"], planningNotes: ["Long southern leg; Madurai is a practical gateway", "Temple rituals and bath points should be planned around official rules"] },
  { order: 12, name: "Grishneshwar Jyotirlinga", commonlyUsedName: "Grishneshwar Temple", location: "Verul, near Ellora", state: "Maharashtra", region: "West", bestSeason: "October–February", nearbyHighlights: ["Ellora Caves", "Kailasa Temple", "Daulatabad Fort", "Aurangabad"], planningNotes: ["Best combined with Ellora sightseeing", "Often paired with Trimbakeshwar and Bhimashankar"] },
];

export const jyotirlingaPackages = {
  two: {
    name: "2 Jyotirlinga Yatra – Dwarka & Somnath",
    temples: ["Nageshwar Jyotirlinga", "Somnath Jyotirlinga"],
    duration: "3 Nights / 4 Days",
    route: "Ahmedabad → Dwarka → Nageshwar → Somnath → Ahmedabad",
    marketPosition: "Short, high-conversion western India circuit; current market examples commonly bundle Dwarka with the two Gujarat Jyotirlingas.",
  },
  four: {
    name: "4 Jyotirlinga Yatra – Gujarat & Madhya Pradesh",
    temples: ["Nageshwar Jyotirlinga", "Somnath Jyotirlinga", "Mahakaleshwar Jyotirlinga", "Omkareshwar Jyotirlinga"],
    duration: "7 Nights / 8 Days",
    route: "Ahmedabad → Dwarka → Somnath → Indore/Ujjain → Omkareshwar → Ahmedabad/Indore",
    marketPosition: "Compact west-central circuit; current operators market the same four-shrine combination with Gujarat and Madhya Pradesh legs.",
  },
  six: {
    name: "6 Jyotirlinga Yatra – West & Central India",
    temples: ["Mahakaleshwar Jyotirlinga", "Omkareshwar Jyotirlinga", "Nageshwar Jyotirlinga", "Somnath Jyotirlinga", "Trimbakeshwar Jyotirlinga", "Grishneshwar Jyotirlinga"],
    duration: "10 Nights / 11 Days",
    route: "Indore/Ujjain → Omkareshwar → Gujarat → Nashik → Grishneshwar",
    marketPosition: "A practical six-shrine circuit based on routes currently sold by rail/tour operators, with a strong west-central India product-market fit.",
  },
  twelve: {
    name: "12 Jyotirlinga Mahayatra – Complete India Circuit",
    temples: ["Somnath Jyotirlinga", "Mallikarjuna Jyotirlinga", "Mahakaleshwar Jyotirlinga", "Omkareshwar Jyotirlinga", "Kedarnath Jyotirlinga", "Bhimashankar Jyotirlinga", "Kashi Vishwanath Jyotirlinga", "Trimbakeshwar Jyotirlinga", "Baidyanath Jyotirlinga", "Nageshwar Jyotirlinga", "Rameshwaram Jyotirlinga", "Grishneshwar Jyotirlinga"],
    duration: "18 Nights / 19 Days",
    route: "Delhi → Somnath → Dwarka/Nageshwar → Maharashtra → South India → Varanasi → Deoghar → Kedarnath → Delhi",
    marketPosition: "Premium flagship product; current 2026 market examples range from roughly 17–23 days depending on flight/road/rail mix and Kedarnath handling.",
  },
} as const;

export const jyotirlingaResearchNotes = {
  currentMarketPatterns: [
    "2-shrine products are usually sold as Gujarat/Dwarka–Somnath circuits with 3–5 days.",
    "4-shrine products are commonly grouped geographically to reduce long backtracking; Gujarat + Madhya Pradesh is a strong example.",
    "6-shrine products frequently combine Mahakaleshwar, Omkareshwar, Nageshwar, Somnath, Trimbakeshwar and Grishneshwar.",
    "12-shrine products are premium long-haul circuits and commonly use a mix of flights, private road transfers and special handling for Kedarnath.",
    "Darshan timings, special aarti access, weather, temple rules, helicopter operations and local ferry operations must be presented as subject to official confirmation.",
  ],
  officialReference: "Government of India Ministry of Tourism recognises the Dwadasha Jyotirlinga circuit and lists the twelve shrines in its parliamentary response.",
};
