import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Booking Policy | Only Road Trip", description: "Read the booking policy for Only Road Trip and Swastik Tour And Travels Private Limited, including advance payment, confirmation and amendments.", alternates: { canonical: "https://www.onlyroadtrip.com/booking-policy" } };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Booking Policy" path="booking-policy" />{children}</>; }
