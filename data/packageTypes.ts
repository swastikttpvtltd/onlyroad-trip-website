export interface GalleryImage {
  image: string;
  alt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  notes?: string[];
}

export interface Hotel {
  name: string;
  category: string;
  location?: string;
  star?: string;
}

export interface HeroSection {
  image: string;
  shortDescription: string;
}

export interface Package {
  id: number;

  slug: string;

  title: string;

  destination: string;

  state: string;

  category: string;

  hero?: HeroSection;

  image: string;

  gallery: GalleryImage[];

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