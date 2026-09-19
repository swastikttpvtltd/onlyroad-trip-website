"use client";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

type Props = Omit<LinkProps, "href"> & { href: string; children: ReactNode; className?: string };

export default function LocalizedLink({ href, children, ...props }: Props) {
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0];
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(first || "") ? first : "en";
  const target = href.startsWith("/") && !href.startsWith("//") ? "/" + locale + (href === "/" ? "" : href) : href;
  return <Link href={target} {...props}>{children}</Link>;
}
