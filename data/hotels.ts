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
    name: "3★ Recommended Hotel – Varanasi",
    city: "Varanasi, Uttar Pradesh",
    rating: 4.2,
    stars: 3,
    description: "Comfortable 3-star stay selected for convenient access to the city's major travel points.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=3%20star%20hotels%20Varanasi%20Uttar%20Pradesh",
  },
  ayodhya: {
    name: "3★ Recommended Hotel – Ayodhya",
    city: "Ayodhya, Uttar Pradesh",
    rating: 4.2,
    stars: 3,
    description: "Comfortable 3-star stay suitable for pilgrims and family travellers.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=3%20star%20hotels%20Ayodhya%20Uttar%20Pradesh",
  },
  prayagraj: {
    name: "3★ Recommended Hotel – Prayagraj",
    city: "Prayagraj, Uttar Pradesh",
    rating: 4.1,
    stars: 3,
    description: "Comfortable 3-star stay for an easy overnight halt during the yatra.",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=3%20star%20hotels%20Prayagraj%20Uttar%20Pradesh",
  },
};
