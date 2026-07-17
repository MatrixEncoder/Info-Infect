"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Bell } from "lucide-react";

const categories = [
  { label: "NEWS", href: "/?cat=infosec" },
  { label: "VULNERABILITIES", href: "/?cat=vulnerability" },
  { label: "MALWARE", href: "/?cat=malware" },
  { label: "AI SECURITY", href: "/?cat=ai-innovation" },
  { label: "CLOUD", href: "/?cat=cloud-security" },
  { label: "DATA BREACH", href: "/?cat=data-breach" },
  { label: "POLICY", href: "/?cat=cyber-policy" },
  { label: "RESEARCH", href: "/?cat=research" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-black transition-shadow duration-200 ${scrolled ? "shadow-lg" : ""}`}
    >
      {/* ── Main bar ── */}
      <div className="max-w-[1280px] mx-auto flex items-center h-[80px] px-4 sm:px-6 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 mr-6">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg">
            <Image src="/logo.png" alt="Info-Infect" fill sizes="72px" className="object-contain opacity-80" priority />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="text-white text-[18px] font-black tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              INFO-INFECT
            </span>
            <span className="text-amber-500 text-[10px] font-semibold tracking-widest uppercase">
              Cyber Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="text-gray-300 hover:text-white text-[11.5px] font-bold tracking-wider px-3 py-1 transition-colors whitespace-nowrap"
            >
              {cat.label}
            </Link>
          ))}
          <span className="text-gray-600 mx-1 select-none">||</span>
        </nav>

        {/* Right: search + subscribe */}
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
            suppressHydrationWarning
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <Link
            href="#newsletter"
            className="hidden md:inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold px-4 py-1.5 rounded transition-colors tracking-wide"
          >
            <Bell className="h-3.5 w-3.5" />
            SUBSCRIBE
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            suppressHydrationWarning
            className="lg:hidden text-gray-400 hover:text-white p-1 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Search dropdown ── */}
      {searchOpen && (
        <div className="search-overlay border-t border-gray-800 bg-black px-4 sm:px-6 py-3">
          <div className="max-w-[1280px] mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search cybersecurity news, CVEs, threats..."
              suppressHydrationWarning
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 pl-10 pr-4 py-2.5 text-sm rounded-md focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-black">
          <nav className="max-w-[1280px] mx-auto px-4 py-4 grid grid-cols-2 gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white text-xs font-bold tracking-wide px-3 py-2.5 rounded hover:bg-gray-900 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-4">
            <Link
              href="#newsletter"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-2.5 rounded transition-colors"
            >
              <Bell className="h-3.5 w-3.5" />
              SUBSCRIBE TO INTEL BRIEF
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
