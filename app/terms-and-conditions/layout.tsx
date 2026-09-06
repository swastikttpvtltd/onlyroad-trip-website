import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Terms & Conditions | Only Road Trip", description: "Read the terms and conditions governing Only Road Trip bookings, travel services, payments, amendments and customer responsibilities.", alternates: { canonical: "https://www.onlyroadtrip.com/terms-and-conditions" } };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Terms & Conditions" path="terms-and-conditions" />{children}</>; }
