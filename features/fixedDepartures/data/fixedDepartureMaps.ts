const routes: Record<string, string[]> = {
  "varanasi-prayagraj-ayodhya": ["Varanasi, Uttar Pradesh, India", "Triveni Sangam, Prayagraj, Uttar Pradesh, India", "Ayodhya, Uttar Pradesh, India", "Varanasi, Uttar Pradesh, India"],
  "varanasi-ayodhya-prayagraj-gaya-bodh-gaya": ["Varanasi, Uttar Pradesh, India", "Triveni Sangam, Prayagraj, Uttar Pradesh, India", "Ayodhya, Uttar Pradesh, India", "Varanasi, Uttar Pradesh, India", "Mahabodhi Temple, Bodh Gaya, Bihar, India", "Vishnupad Temple, Gaya, Bihar, India", "Varanasi, Uttar Pradesh, India"],
  "delhi-agra-jaipur-golden-triangle": ["New Delhi, Delhi, India", "Agra, Uttar Pradesh, India", "Jaipur, Rajasthan, India", "New Delhi, Delhi, India"],
  "gujarat-grand-tour": ["Ahmedabad, Gujarat, India", "Ekta Nagar, Gujarat, India", "Dwarka, Gujarat, India", "Porbandar, Gujarat, India", "Somnath, Gujarat, India", "Diu, India", "Sasan Gir, Gujarat, India", "Junagadh, Gujarat, India", "Ahmedabad, Gujarat, India"],
  "char-dham-yatra": ["Haridwar, Uttarakhand, India", "Barkot, Uttarakhand, India", "Janki Chatti, Uttarakhand, India", "Uttarkashi, Uttarakhand, India", "Gangotri, Uttarakhand, India", "Guptkashi, Uttarakhand, India", "Gaurikund, Uttarakhand, India", "Badrinath, Uttarakhand, India", "Rudraprayag, Uttarakhand, India", "Haridwar, Uttarakhand, India"],
  "amarnath-yatra-kashmir": ["Srinagar, Jammu and Kashmir, India", "Sonamarg, Jammu and Kashmir, India", "Baltal, Jammu and Kashmir, India", "Srinagar, Jammu and Kashmir, India"],
  "kashmir-4n5d-review": ["Srinagar, Jammu and Kashmir, India", "Gulmarg, Jammu and Kashmir, India", "Srinagar, Jammu and Kashmir, India", "Pahalgam, Jammu and Kashmir, India", "Srinagar, Jammu and Kashmir, India"],
};
export function getFixedDepartureMap(slug: string) {
  const stops = routes[slug];
  if (!stops) throw new Error("Missing itinerary map: " + slug);
  // Maps displays the road circuit; pilgrimage walking approaches remain in the day plan.
  return "https://www.google.com/maps/dir/?" + new URLSearchParams({ api: "1", origin: stops[0], destination: stops[stops.length-1], travelmode: "driving", waypoints: stops.slice(1,-1).join("|") }).toString();
}
