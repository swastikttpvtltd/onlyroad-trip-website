import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Uttar Pradesh Tour Packages | Only Road Trip", description: "Explore Uttar Pradesh tour packages for Varanasi, Ayodhya, Mathura, Vrindavan and Agra with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/uttar-pradesh" } };

export default function Page() { return <DestinationLandingPage title="Uttar Pradesh" eyebrow="Spiritual & Heritage Tours" description="Discover Varanasi, Ayodhya, Mathura, Vrindavan and Agra through spiritual, cultural and heritage journeys planned around your needs." state="Uttar Pradesh" matches={["varanasi", "kashi", "ayodhya", "mathura", "vrindavan", "agra", "taj mahal"]} />; }
