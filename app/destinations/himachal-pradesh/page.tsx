import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Himachal Pradesh Tour Packages | Only Road Trip", description: "Explore Himachal Pradesh tour packages for Manali, Shimla, Dharamshala, Dalhousie and scenic mountain holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/himachal-pradesh" } };

export default function Page() { return <DestinationLandingPage title="Himachal Pradesh" eyebrow="Hills & Mountain Holidays" description="Plan a Himachal holiday across Manali, Shimla, Dharamshala and Dalhousie with scenic routes, comfortable stays and flexible itineraries." state="Himachal Pradesh" matches={["manali", "shimla", "dharamshala", "dharamsala", "dalhousie", "khajjiar"]} />; }
