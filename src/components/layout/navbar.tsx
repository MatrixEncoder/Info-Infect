"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Bell } from "lucide-react";

const primaryLinks = [
  { label: "DAILY BRIEF", href: "/daily-brief" },
  { label: "NEWS", href: "/?cat=infosec" },
  { label: "VULNS", href: "/?cat=vulnerability" },
  { label: "EXPLOITS", href: "/exploits" },
];

const secondaryLinks = [
  { label: "ACTORS", href: "/threat-actors" },
  { label: "MALWARE", href: "/malware" },
  { label: "AI", href: "/?cat=ai-innovation" },
  { label: "CLOUD", href: "/?cat=cloud-security" },
  { label: "TOOLS", href: "/tools" },
  { label: "WATCH", href: "/watchlist" },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white text-[10.5px] sm:text-[11px] font-bold tracking-[0.08em] px-2 sm:px-2.5 transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

function NavDivider() {
  return <span className="w-px h-3 bg-gray-700 mx-0.5 shrink-0" />;
}

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
      <div className="max-w-[1280px] mx-auto flex items-center h-[56px] sm:h-[64px] px-3 sm:px-5 gap-2 sm:gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-2 sm:mr-4">
          <div className="relative h-[36px] w-[36px] sm:h-[48px] sm:w-[48px] shrink-0 overflow-hidden rounded-lg">
            <Image src="/logo.png" alt="Info-Infect" fill sizes="48px" className="object-contain opacity-80" priority />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="text-white text-[15px] font-black tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              INFO-INFECT
            </span>
            <span className="text-amber-500 text-[9px] font-semibold tracking-[0.15em] uppercase">
              Cyber Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop nav — primary group */}
        <nav className="hidden lg:flex items-center flex-1 justify-center min-w-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center">
            {primaryLinks.map((cat, i) => (
              <span key={cat.label} className="flex items-center">
                {i > 0 && <NavDivider />}
                <NavLink href={cat.href}>{cat.label}</NavLink>
              </span>
            ))}

            {/* Group divider */}
            <span className="w-px h-4 bg-gray-600 mx-2 sm:mx-3 shrink-0" />

            {secondaryLinks.map((cat, i) => (
              <span key={cat.label} className="flex items-center">
                {i > 0 && <NavDivider />}
                <NavLink href={cat.href}>{cat.label}</NavLink>
              </span>
            ))}
          </div>
        </nav>

        {/* Right: search + subscribe */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
            suppressHydrationWarning
            className="text-gray-400 hover:text-white transition-colors p-1.5"
          >
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>

          <Link
            href="#newsletter"
            className="hidden sm:inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors tracking-wider"
          >
            <Bell className="h-3 w-3" />
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
            {allLinks.map((cat, i) => {
              const isNewGroup = i === primaryLinks.length;
              return (
                <span key={cat.label} className="contents">
                  {isNewGroup && (
                    <div className="col-span-2 border-t border-gray-800 my-1" />
                  )}
                  <Link
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-400 hover:text-white text-xs font-bold tracking-wide px-3 py-2.5 rounded hover:bg-gray-900 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </span>
              );
            })}
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
