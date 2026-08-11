import type { Metadata } from "next";
import PlanYourTripClient from "../plan-your-trip/PlanYourTripClient";

export const metadata: Metadata = {
  title: "Contact Only Road Trip | Plan Your Trip & Travel Assistance",
  description: "Contact Only Road Trip and plan your customised domestic holiday, pilgrimage journey, road trip, honeymoon or group travel with our travel team.",
  keywords: [
    "contact Only Road Trip",
    "travel enquiry",
    "tour booking enquiry",
    "travel assistance",
    "travel agency Gurugram",
    "plan your trip",
    "customised tour packages",
  ],
  alternates: { canonical: "https://www.onlyroadtrip.com/contact" },
};

export default function ContactPage() {
  return <PlanYourTripClient />;
}
