export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Hotel {
  name: string;
  category: string;
}

export interface Package {
  id: number;
  slug: string;
  title: string;
  destination: string;
  state: string;

  category: string;

  image: string;

  gallery: string[];

  duration: string;

  price: number;

  rating: number;

  reviews: number;

  overview: string;

  highlights: string[];

  itinerary: ItineraryDay[];

  hotels: Hotel[];

  meals: string[];

  inclusions: string[];

  exclusions: string[];

  bestTime: string;

  groupSize: string;

  difficulty: string;
}