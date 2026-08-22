export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoPricing = {
  price: number;
  duration: string;
  destinations: string[];
};

export type SeoPageConfig = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  description?: string;
  focus: "destination" | "package" | "service" | "local";
  highlights: string[];
  keywords: string[];
  pricing?: SeoPricing;
  inclusions?: string[];
  exclusions?: string[];
  faqs?: SeoFaq[];
};

const withAiContent = (
  config: SeoPageConfig,
  pricing?: SeoPricing,
  inclusions?: string[],
  exclusions?: string[],
  faqs?: SeoFaq[]
): SeoPageConfig => ({
  ...config,
  pricing,
  inclusions,
  exclusions,
  faqs,
});

const destination = (slug: string, title: string, eyebrow: string, intro: string, highlights: string[], keywords: string[]): SeoPageConfig => ({ slug, title, eyebrow, intro, description: intro, focus: "destination", highlights, keywords });
const packagePage = (slug: string, title: string, eyebrow: string, intro: string, highlights: string[], keywords: string[]): SeoPageConfig => ({ slug, title, eyebrow, intro, description: intro, focus: "package", highlights, keywords });
const service = (slug: string, title: string, eyebrow: string, intro: string, highlights: string[], keywords: string[]): SeoPageConfig => ({ slug, title, eyebrow, intro, description: intro, focus: "service", highlights, keywords });
const local = (slug: string, title: string, eyebrow: string, intro: string, highlights: string[], keywords: string[]): SeoPageConfig => ({ slug, title, eyebrow, intro, description: intro, focus: "local", highlights, keywords });

const defaultInclusions = ["Accommodation as per selected package", "Meals as specified", "Sightseeing and transport coordination", "Travel assistance"];
const defaultExclusions = ["Personal expenses", "Airfare or train fare unless specified", "Adventure activities unless included", "Anything not listed in inclusions"];

const buildFaqs = (name: string): SeoFaq[] => [
  { question: `What is included in ${name}?`, answer: "The selected package or travel plan specifies accommodation, meals, transport, sightseeing and other inclusions. Please review the final inclusions before booking." },
  { question: `Can ${name} be customized?`, answer: "Yes. Travel dates, duration, accommodation category, transport, sightseeing and group requirements can be customized with Only Road Trip." },
  { question: `How do I choose the right ${name}?`, answer: "Choose based on your travel dates, preferred destinations, duration, group size, accommodation needs and budget. Our team can help tailor the itinerary." },
];

export const seoPages: Record<string, SeoPageConfig> = {
  "kashmir-tour": withAiContent(destination("kashmir-tour", "Kashmir Tour Packages", "Kashmir Tour Packages", "Plan a customized Kashmir holiday with scenic stays, private transport and flexible itineraries for families, couples and groups.", ["Customized itineraries", "Hotels and transport", "Family and couple options"], ["Kashmir tour packages", "Kashmir tour package", "Kashmir holiday package"]), { price: 18500, duration: "4N/5D", destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg"] }, defaultInclusions, defaultExclusions, buildFaqs("Kashmir tour packages")),
  "manali-tour": withAiContent(destination("manali-tour", "Manali Tour Packages", "Manali Tour Packages", "Book a customized Manali tour with comfortable transport, hotel options and sightseeing planned around your dates.", ["Delhi departure options", "Private transport", "Flexible sightseeing"], ["Manali tour packages", "Manali tour package", "Manali trip"]), { price: 7499, duration: "2N/3D", destinations: ["Manali", "Solang Valley"] }, defaultInclusions, defaultExclusions, buildFaqs("Manali tour packages")),
  "leh-ladakh-tour": destination("leh-ladakh-tour", "Leh Ladakh Tour Packages", "Leh Ladakh Tour Packages", "Plan a Leh Ladakh road trip with route planning, stays, transport and practical travel coordination from Only Road Trip.", ["Road-trip planning", "Route and stay coordination", "Group options"], ["Leh Ladakh tour packages", "Ladakh road trip", "Leh Ladakh package"]),
  "himachal-tour": destination("himachal-tour", "Himachal Tour Packages", "Himachal Pradesh Tour Packages", "Explore Himachal with customized holiday packages covering Manali, Shimla, Dharamshala and other popular destinations.", ["Multiple hill destinations", "Family holidays", "Private and group travel"], ["Himachal tour packages", "Himachal Pradesh tour", "Himachal holiday package"]),
  "uttarakhand-tour": destination("uttarakhand-tour", "Uttarakhand Tour Packages", "Uttarakhand Tour Packages", "Discover Uttarakhand with customized hill holidays, pilgrimage journeys, road trips and family tour packages.", ["Hill holidays", "Pilgrimage routes", "Customized road trips"], ["Uttarakhand tour packages", "Uttarakhand holiday", "Uttarakhand tour"]),
  "rajasthan-tour": destination("rajasthan-tour", "Rajasthan Tour Packages", "Rajasthan Tour Packages", "Explore Rajasthan with customized Jaipur, Udaipur, Jaisalmer, Jodhpur and heritage tour packages.", ["Jaipur and Udaipur", "Jaisalmer and Jodhpur", "Heritage experiences"], ["Rajasthan tour packages", "Rajasthan tour", "Rajasthan holiday package"]),
  "kerala-tour": destination("kerala-tour", "Kerala Tour Packages", "Kerala Tour Packages", "Plan a customized Kerala holiday with backwaters, hill stations, beaches, stays and private transport.", ["Backwaters", "Hill stations and beaches", "Customized stays"], ["Kerala tour packages", "Kerala tour package", "Kerala holiday"]),
  "goa-tour": destination("goa-tour", "Goa Tour Packages", "Goa Tour Packages", "Book a customized Goa holiday with flexible stays, sightseeing and private or group transport options.", ["Beach holidays", "Couples and families", "Flexible stays"], ["Goa tour packages", "Goa tour package", "Goa holiday"]),
  "sikkim-tour": destination("sikkim-tour", "Sikkim Tour Packages", "Sikkim Tour Packages", "Explore Sikkim with customized itineraries covering Gangtok, North Sikkim and scenic Himalayan experiences.", ["Gangtok", "North Sikkim", "Himalayan sightseeing"], ["Sikkim tour packages", "Sikkim tour", "Gangtok tour package"]),
  "darjeeling-tour": destination("darjeeling-tour", "Darjeeling Tour Packages", "Darjeeling Tour Packages", "Plan a customized Darjeeling holiday with comfortable stays, sightseeing and transport coordination.", ["Tea gardens", "Mountain views", "Customized transport"], ["Darjeeling tour packages", "Darjeeling tour", "Darjeeling holiday package"]),
  "kedarnath-yatra-from-delhi": packagePage("kedarnath-yatra-from-delhi", "Kedarnath Yatra from Delhi", "Kedarnath Yatra from Delhi", "Plan a Kedarnath Yatra from Delhi with practical route planning, accommodation coordination and comfortable transport options.", ["Delhi departure", "Route planning", "Family and group options"], ["Kedarnath Yatra from Delhi", "Kedarnath package from Delhi", "Kedarnath tour package"]),
  "kedarnath-badrinath-yatra-from-delhi": packagePage("kedarnath-badrinath-yatra-from-delhi", "Kedarnath Badrinath Yatra from Delhi", "Kedarnath Badrinath Yatra from Delhi", "Plan a combined Kedarnath and Badrinath Yatra from Delhi with customized routes, stays and transport coordination.", ["Combined yatra", "Delhi departure", "Customized itinerary"], ["Kedarnath Badrinath Yatra from Delhi", "Kedarnath Badrinath package", "Badrinath Kedarnath tour"]),
  "char-dham-yatra-from-delhi": packagePage("char-dham-yatra-from-delhi", "Char Dham Yatra from Delhi", "Char Dham Yatra from Delhi", "Plan a customized Char Dham Yatra from Delhi with route, hotel and vehicle coordination for families and groups.", ["Delhi departure", "Complete route planning", "Family and group support"], ["Char Dham Yatra from Delhi", "Char Dham package from Delhi", "Char Dham tour"]),
  "ayodhya-varanasi-tour": packagePage("ayodhya-varanasi-tour", "Ayodhya Varanasi Tour", "Ayodhya Varanasi Tour Package", "Combine Ayodhya and Varanasi in a customized spiritual tour with comfortable transport, stays and flexible sightseeing.", ["Ayodhya", "Varanasi", "Customized spiritual itinerary"], ["Ayodhya Varanasi tour", "Ayodhya Varanasi package", "Varanasi Ayodhya tour"]),
  "varanasi-ayodhya-prayagraj-tour": packagePage("varanasi-ayodhya-prayagraj-tour", "Varanasi Ayodhya Prayagraj Tour", "Varanasi Ayodhya Prayagraj Tour Package", "Explore Varanasi, Ayodhya and Prayagraj in one customized spiritual journey with transport and hotel coordination.", ["Varanasi", "Ayodhya", "Prayagraj"], ["Varanasi Ayodhya Prayagraj tour", "UP pilgrimage tour", "Ayodhya Varanasi Prayagraj package"]),
  "kashmir-tour-from-delhi": packagePage("kashmir-tour-from-delhi", "Kashmir Tour from Delhi", "Kashmir Tour Package from Delhi", "Plan a Kashmir tour from Delhi with customized stays, transport and sightseeing for families, couples and groups.", ["Delhi departure", "Private transport", "Flexible itinerary"], ["Kashmir tour package from Delhi", "Kashmir from Delhi", "Kashmir holiday package"]),
  "manali-tour-from-delhi": packagePage("manali-tour-from-delhi", "Manali Tour from Delhi", "Manali Tour Package from Delhi", "Book a customized Manali tour from Delhi with comfortable transport, stays and sightseeing around your travel dates.", ["Delhi departure", "Private vehicle", "Custom itinerary"], ["Manali tour package from Delhi", "Manali from Delhi", "Manali holiday package"]),
  "leh-ladakh-tour-from-delhi": packagePage("leh-ladakh-tour-from-delhi", "Leh Ladakh Tour from Delhi", "Leh Ladakh Tour Package from Delhi", "Plan a Leh Ladakh trip from Delhi with route planning, accommodation and practical road-trip coordination.", ["Delhi departure", "Road-trip planning", "Route and stay support"], ["Leh Ladakh tour package from Delhi", "Ladakh from Delhi", "Ladakh road trip"]),
  "rajasthan-tour-from-delhi": packagePage("rajasthan-tour-from-delhi", "Rajasthan Tour from Delhi", "Rajasthan Tour Package from Delhi", "Explore Rajasthan from Delhi with customized Jaipur, Udaipur, Jodhpur and Jaisalmer tour options.", ["Delhi departure", "Multiple cities", "Private and group options"], ["Rajasthan tour package from Delhi", "Rajasthan from Delhi", "Rajasthan holiday package"]),
  "corporate-tour-packages": service("corporate-tour-packages", "Corporate Tour Packages", "Corporate Tour Packages in India", "Plan corporate tours, employee trips and company offsites with hotels, group transport and itinerary coordination.", ["Employee group travel", "Corporate offsites", "Travel coordination"], ["Corporate tour packages", "Corporate travel India", "Company tour packages"]),
  "group-tour-packages": service("group-tour-packages", "Group Tour Packages", "Group Tour Packages in India", "Customize group tours across India with coordinated transport, hotels, sightseeing and travel support.", ["Family and friends", "Group transport", "Hotel coordination"], ["Group tour packages", "Group travel India", "India group tours"]),
  "family-tour-packages": service("family-tour-packages", "Family Tour Packages", "Family Tour Packages in India", "Plan comfortable family holidays across India with customized itineraries, stays and transport.", ["Family-friendly planning", "Comfortable stays", "Private transport"], ["Family tour packages", "Family holiday India", "Family travel packages"]),
  "senior-citizen-tour-packages": service("senior-citizen-tour-packages", "Senior Citizen Tour Packages", "Senior Citizen Tour Packages", "Plan comfortable senior-friendly holidays and pilgrimage tours with practical itineraries, rest time and transport options.", ["Comfort-focused planning", "Rest-friendly itineraries", "Pilgrimage options"], ["Senior citizen tour packages", "Senior friendly tours India", "Senior citizen pilgrimage tour"]),
  "customized-tour-packages": service("customized-tour-packages", "Customized Tour Packages", "Customized Tour Packages in India", "Build a personalized India holiday around your dates, budget, destinations, hotels and preferred travel style.", ["Your dates", "Your budget", "Your itinerary"], ["Customized tour packages", "Custom holiday India", "Personalized travel packages"]),
  "luxury-tour-packages": service("luxury-tour-packages", "Luxury Tour Packages", "Luxury Tour Packages in India", "Create premium India holidays with upgraded stays, private transport, curated experiences and personalized service.", ["Premium stays", "Private transport", "Curated experiences"], ["Luxury tour packages India", "Luxury holidays India", "Premium travel packages"]),
  "road-trip-packages": service("road-trip-packages", "Road Trip Packages", "Road Trip Packages in India", "Explore India by road with customized routes, private vehicles, stays and flexible road-trip itineraries.", ["Scenic routes", "Private vehicles", "Flexible stops"], ["Road trip packages India", "India road trips", "Customized road trip"]),
  "pilgrimage-tour-packages": service("pilgrimage-tour-packages", "Pilgrimage Tour Packages", "Pilgrimage Tour Packages in India", "Plan customized pilgrimage tours across India with transport, accommodation and itinerary coordination.", ["Major pilgrimage destinations", "Transport coordination", "Family and group options"], ["Pilgrimage tour packages", "India pilgrimage tours", "Spiritual tour packages"]),
  "travel-agent-in-delhi": local("travel-agent-in-delhi", "Travel Agent in Delhi", "Travel Agent in Delhi", "Only Road Trip helps Delhi travelers plan customized domestic holidays, pilgrimage tours, road trips and corporate travel.", ["Delhi-based assistance", "Customized holidays", "Pilgrimage and corporate travel"], ["Travel agent in Delhi", "Travel agency Delhi", "Tour operator Delhi"]),
  "travel-agent-in-gurgaon": local("travel-agent-in-gurgaon", "Travel Agent in Gurgaon", "Travel Agent in Gurgaon", "Plan holidays, pilgrimage journeys, road trips and corporate travel from Gurgaon with customized travel assistance.", ["Gurgaon travel support", "Customized trips", "Corporate travel"], ["Travel agent in Gurgaon", "Travel agency Gurgaon", "Tour operator Gurgaon"]),
  "travel-agent-in-noida": local("travel-agent-in-noida", "Travel Agent in Noida", "Travel Agent in Noida", "Book customized holidays, pilgrimage tours, road trips and group travel from Noida with Only Road Trip.", ["Noida travel support", "Group tours", "Pilgrimage travel"], ["Travel agent in Noida", "Travel agency Noida", "Tour operator Noida"]),
  "travel-agent-in-faridabad": local("travel-agent-in-faridabad", "Travel Agent in Faridabad", "Travel Agent in Faridabad", "Plan customized India tours, pilgrimages, family holidays and corporate travel from Faridabad.", ["Faridabad travel support", "Family holidays", "Corporate travel"], ["Travel agent in Faridabad", "Travel agency Faridabad", "Tour operator Faridabad"]),
  "travel-agent-in-rohtak": local("travel-agent-in-rohtak", "Travel Agent in Rohtak", "Travel Agent in Rohtak", "Plan customized holidays, pilgrimage tours and road trips from Rohtak with transport, stays and itinerary support.", ["Rohtak travel support", "Pilgrimage tours", "Road trips"], ["Travel agent in Rohtak", "Travel agency Rohtak", "Tour operator Rohtak"]),
};