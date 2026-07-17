import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BreakingTicker } from "@/components/layout/ticker";
import { startBackgroundRefresh } from "@/lib/background-refresh";
import "./globals.css";

// Start background refresh on server startup
if (typeof window === "undefined") {
  startBackgroundRefresh();
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Info-Infect | Cybersecurity News & Intelligence",
  description:
    "Your MUCH needed INFECTION — real-time cybersecurity news, vulnerability tracking, threat intelligence and infosec research.",
  openGraph: {
    title: "Info-Infect | Cybersecurity News & Intelligence",
    description:
      "Real-time cybersecurity news, vulnerability tracking, and threat intelligence.",
    type: "website",
    siteName: "Info-Infect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Info-Infect | Cybersecurity News & Intelligence",
    description: "Real-time cybersecurity news and threat intelligence.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-white text-[#111215] font-sans antialiased">
        <BreakingTicker />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
