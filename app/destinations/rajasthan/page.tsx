import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Rajasthan Tour Packages | Only Road Trip", description: "Explore Rajasthan tour packages for Jaipur, Udaipur, Jaisalmer and Jodhpur with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/rajasthan" } };

export default function Page() { return <DestinationLandingPage title="Rajasthan" eyebrow="Heritage & Desert Holidays" description="Explore Jaipur, Udaipur, Jaisalmer and Jodhpur through heritage, desert and cultural journeys designed around your travel dates." state="Rajasthan" matches={["jaipur", "udaipur", "jaisalmer", "jodhpur", "rajasthan"]} />; }
