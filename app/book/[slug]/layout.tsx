import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Booking | Only Road Trip",
  robots: { index: false, follow: false },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) { return children; }
