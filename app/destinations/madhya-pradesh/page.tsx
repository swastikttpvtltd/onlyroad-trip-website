import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Madhya Pradesh Tour Packages | Only Road Trip", description: "Explore Madhya Pradesh tour packages for Ujjain, Omkareshwar, Khajuraho and wildlife holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/madhya-pradesh" } };

export default function Page() { return <DestinationLandingPage title="Madhya Pradesh" eyebrow="Heritage, Pilgrimage & Wildlife" description="Explore Ujjain, Omkareshwar, Khajuraho and Madhya Pradesh wildlife experiences through flexible travel packages." state="Madhya Pradesh" matches={["ujjain", "mahakal", "omkareshwar", "khajuraho", "kanha", "bandhavgarh"]} />; }
