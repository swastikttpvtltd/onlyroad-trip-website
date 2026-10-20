"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export default function InstagramSafeLink(props: Props) {
 // The Instagram page is deployed separately; use full navigation into the original website.
 return usePathname() === "/instagram" ? <a {...props}/> : <Link {...props}/>;
}
