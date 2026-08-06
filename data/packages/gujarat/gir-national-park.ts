import type { Package } from "@/data/packageTypes";

const packageData: Package = {
  id: 1002,

  slug: "gir-national-park",

  title: "Gir National Park Wildlife Tour",

  destination: "Gir",

  state: "Gujarat",

  category: "Wildlife",

  hero: {
    image: "/images/packages/gujarat/gir-national-park/hero.jpg",
    shortDescription:
      "Experience the thrill of Gir National Park with exciting jeep safaris, Asiatic lion sightings, and a comfortable wildlife holiday.",
  },

  image: "/images/packages/gujarat/gir-national-park/hero.jpg",

  gallery: [
    {
      image: "/images/packages/gujarat/gir-national-park/hero.jpg",
      alt: "Gir National Park",
    },
  ],

  duration: "3 Nights / 4 Days",

  price: 19999,

  rating: 4.7,

  reviews: 78,

  overview:
    "Explore Gir National Park with wildlife safaris, Jeep tours, and comfortable stays.",

  highlights: [
    "Jeep Safari",
    "Lion Sightings",
    "Sasan Gir",
    "Devaliya Safari Park",
  ],

  itinerary: [
    {
      day: 1,
      title: "Arrival at Gir",

      morning: ["Arrival and hotel check-in"],

      afternoon: ["Lunch and leisure time"],

      evening: ["Welcome dinner and trip briefing"],
    },

    {
      day: 2,
      title: "Gir Jungle Safari",

      morning: ["Early morning Jeep Safari"],

      afternoon: ["Visit Devaliya Safari Park"],

      evening: ["Relax at resort"],
    },

    {
      day: 3,
      title: "Explore Gir",

      morning: ["Bird watching"],

      afternoon: ["Visit local attractions"],

      evening: ["Free time"],
    },

    {
      day: 4,
      title: "Departure",

      morning: ["Breakfast"],

      afternoon: ["Check-out"],

      evening: ["Return journey"],
    },
  ],

  hotels: [
    {
      name: "Premium Wildlife Resort",
      category: "4 Star",
      location: "Sasan Gir",
    },
  ],

  meals: ["Breakfast", "Dinner"],

  inclusions: [],

  exclusions: [],

  bestTime: "October – March",

  groupSize: "2-8 Persons",

  difficulty: "Moderate",
};

export default packageData;