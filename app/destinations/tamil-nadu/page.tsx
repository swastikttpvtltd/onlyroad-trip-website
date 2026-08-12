import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Tamil Nadu Tour Packages | Only Road Trip", description: "Explore Tamil Nadu tour packages for Chennai, Madurai, Rameswaram, Ooty and South India pilgrimage journeys with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/tamil-nadu" } };

export default function Page() { return <DestinationLandingPage title="Tamil Nadu" eyebrow="Temple & South India Tours" description="Experience Tamil Nadu's temples, hill stations and coastal cities through carefully planned cultural and pilgrimage itineraries." state="Tamil Nadu" matches={["rameswaram", "madurai", "ooty", "kodaikanal", "chennai", "tamil nadu"]} />; }
