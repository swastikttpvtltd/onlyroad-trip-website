import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Uttarakhand Tour Packages | Only Road Trip", description: "Explore Uttarakhand tour packages for Kedarnath, Badrinath, Rishikesh, Haridwar and Himalayan holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/uttarakhand" } };

export default function Page() { return <DestinationLandingPage title="Uttarakhand" eyebrow="Himalayan & Pilgrimage Tours" description="Plan Uttarakhand journeys covering Kedarnath, Badrinath, Haridwar, Rishikesh and scenic mountain destinations with personalised support." state="Uttarakhand" matches={["kedarnath", "badrinath", "rishikesh", "haridwar", "uttarakhand", "chopta"]} />; }
