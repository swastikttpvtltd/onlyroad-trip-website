import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Privacy Policy | Only Road Trip", description: "Read the Only Road Trip privacy policy covering personal information, travel bookings, payments, cookies, security and customer rights.", alternates: { canonical: "https://www.onlyroadtrip.com/privacy-policy" } };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Privacy Policy" path="privacy-policy" />{children}</>; }
