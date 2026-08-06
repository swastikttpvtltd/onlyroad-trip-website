"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "top-3 mx-auto max-w-7xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          : "border-b border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 -ml-4 lg:-ml-6"
        >
          <Image
            src="/images/logo/only-road-trip-logo.jpeg"
            alt="Only Road Trip"
            width={185}
            height={55}
            priority
            className="h-[55px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
            { name: "Destinations", href: "/destinations" },
            { name: "Packages", href: "/packages" },
            { name: "Corporate Travel", href: "/corporate-travel" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative text-[15px] font-medium text-white transition-all duration-300 hover:text-cyan-300"
            >
              {item.name}

              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500 hover:shadow-cyan-500/40"
        >
          Plan Your Trip
        </Link>
      </div>
    </header>
  );
}