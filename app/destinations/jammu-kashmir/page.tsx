import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Jammu Kashmir Tour Packages | Only Road Trip", description: "Explore Kashmir and Jammu tour packages covering Srinagar, Gulmarg, Pahalgam, Sonamarg and Vaishno Devi journeys with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/jammu-kashmir" } };

export default function Page() { return <DestinationLandingPage title="Jammu & Kashmir" eyebrow="Kashmir & Pilgrimage Tours" description="Discover Srinagar, Gulmarg, Pahalgam, Sonamarg and Jammu pilgrimage experiences with carefully planned stays and transport." state="Jammu & Kashmir" matches={["kashmir", "srinagar", "gulmarg", "pahalgam", "sonamarg", "vaishno devi", "katra"]} />; }
