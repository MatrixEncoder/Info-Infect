import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BreakingTicker } from "@/components/layout/ticker";
import "./globals.css";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Info-Infect | Cybersecurity News & Intelligence",
  description:
    "Your MUCH needed INFECTION — real-time cybersecurity news, vulnerability tracking, threat intelligence and infosec research.",
  metadataBase: new URL("https://infoinfect.dpdns.org"),
  openGraph: {
    title: "Info-Infect | Cybersecurity News & Intelligence",
    description:
      "Real-time cybersecurity news, vulnerability tracking, and threat intelligence.",
    url: "https://infoinfect.dpdns.org",
    siteName: "Info-Infect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Info-Infect — Cybersecurity News & Intelligence",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Info-Infect | Cybersecurity News & Intelligence",
    description: "Real-time cybersecurity news and threat intelligence.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6330406392645959"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-B37LL8MX38"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B37LL8MX38');
        `}
      </Script>
      <body className="min-h-screen bg-white text-[#111215] font-sans antialiased">
        <BreakingTicker />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
