export type Hotel = {
  name: string;
  city: string;
  rating: number;
  stars: 3;
  description: string;
  makemytripUrl?: string;
  googleMapsUrl?: string;
};

export const hotels: Record<string, Hotel> = {
  varanasi: {
    name: "Hotel Hari Vilaas or Similar",
    city: "Varanasi, Uttar Pradesh",
    rating: 4.3,
    stars: 3,
    description: "3-star hotel in Jahumandi, with convenient access to Kashi Vishwanath Temple and a strong guest rating.",
    makemytripUrl: "https://www.makemytrip.com/hotels/three_star-hotels-varanasi.html",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel%20Hari%20Vilaas%20Varanasi",
  },
  ayodhya: {
    name: "GOLDEN PALACE 200 METER FROM RAM JANMBHOOMI or Similar",
    city: "Ayodhya, Uttar Pradesh",
    rating: 4.5,
    stars: 3,
    description: "3-star hotel in New Colony, around a 3-minute walk from Shree Ramjanmbhumi Temple.",
    makemytripUrl: "https://www.makemytrip.com/hotels/golden_palace-details-ayodhya.html",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Golden%20Palace%20Dant%20Dhawan%20Kund%20Ayodhya",
  },
  // No overnight stay in Prayagraj in this itinerary; HotelCard will not render this placeholder.
  prayagraj: {
    name: "",
    city: "",
    rating: 0,
    stars: 3,
    description: "",
  },
};
