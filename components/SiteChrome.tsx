"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
export default function SiteChrome({ position }: { position: "header" | "footer" | "analytics-fallback" }) {
  const pathname = usePathname();
  if ((pathname === "/customer" || pathname.startsWith("/customer/")) && position === "analytics-fallback") return null;
  if (position === "analytics-fallback") return <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MX42J8KW" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>;
  return position === "header" ? <Header /> : <Footer />;
}
