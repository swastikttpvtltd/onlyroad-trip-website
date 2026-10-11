import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/siteSeo";
export const metadata = pageMetadata("Disclaimer", "Travel information, availability and website disclaimer for Only Road Trip.", "/disclaimer");
export default function Layout({ children }: { children: ReactNode }) { return children; }
