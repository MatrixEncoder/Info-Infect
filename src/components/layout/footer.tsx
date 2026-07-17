"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const socials = [
  {
    label: "Discord",
    path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495a18.433 18.433 0 00-5.4876 0 12.46 12.46 0 00-.6154-1.2495.0771.0771 0 00-.0785-.0371 19.7366 19.7366 0 00-4.8853 1.5152.0616.0616 0 00-.028.0261C1.0762 8.2156.6735 11.9143.858 15.561a.0768.0768 0 00.0307.0541A19.772 19.772 0 006.7235 18.8a.0762.0762 0 00.0776-.0206 14.75 14.75 0 001.0689-1.7931.0774.0774 0 00-.0392-.1062 13.255 13.255 0 01-1.6741-.8153.0774.0774 0 01-.0128-.1284c.1125-.0846.2248-.1721.3312-.2627a.0747.0747 0 01.0746-.0147c3.5211 1.5409 7.3383 1.5409 10.8162 0a.0744.0744 0 01.0746.0147c.1059.0898.2186.1785.3315.2632a.0775.0775 0 01-.0128.1284 12.654 12.654 0 01-1.6741.8149.0772.0772 0 00-.0392.1062 14.87 14.87 0 001.0691 1.7932.0764.0764 0 00.0776.0206 19.724 19.724 0 005.8356-3.185.0773.0773 0 00.0307-.054c.219-4.167-1.089-7.823-3.739-11.1707a.0654.0654 0 00-.0288-.0278zM8.5023 13.199c-.8648 0-1.5744-.7925-1.5744-1.7673 0-.9747.7007-1.7672 1.5744-1.7672.8738 0 1.5745.7925 1.5745 1.7672 0 .9748-.7007 1.7673-1.5745 1.7673zm6.9955 0c-.8648 0-1.5744-.7925-1.5744-1.7673 0-.9747.7007-1.7672 1.5744-1.7672.8738 0 1.5744.7925 1.5744 1.7672 0 .9748-.7006 1.7673-1.5744 1.7673z",
  },
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "GitHub",
    path: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
  },
];

const navColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Threat Feed", href: "/?cat=infosec" },
      { label: "CVE Tracker", href: "/?cat=vulnerability" },
      { label: "Data Breaches", href: "/?cat=data-breach" },
      { label: "Categories", href: "/?cat=ai-innovation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    function fitWatermark() {
      const svg = svgRef.current;
      const text = textRef.current;
      if (!svg || !text) return;
      try {
        const bbox = text.getBBox();
        svg.setAttribute(
          "viewBox",
          `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
        );
      } catch (_) {}
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(fitWatermark);
    } else {
      window.addEventListener("load", fitWatermark);
    }
    window.addEventListener("resize", fitWatermark);
    return () => window.removeEventListener("resize", fitWatermark);
  }, []);

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "subscribe", email: trimmed }),
      });
      const data = await res.json();
      setToastMsg(data.ok ? `\u2713 ${data.message}` : `\u2717 ${data.message}`);
    } catch {
      setToastMsg("\u2717 Something went wrong. Try again.");
    }

    setToastVisible(true);
    setEmail("");
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <footer className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-10 mt-12">

      {/* ── Grid wrapper ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4 items-stretch"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* ── Left Card ── */}
        <div
          className="relative flex flex-col justify-between overflow-hidden"
          style={{
            minHeight: 400,
            borderRadius: 28,
            padding: 32,
            boxShadow: "0 12px 40px rgba(21,76,189,0.25)",
            background: "#1e4fc0",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ objectFit: "cover", zIndex: 0 }}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
              type="video/mp4"
            />
          </video>

          {/* Logo */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="relative w-full h-[280px] overflow-hidden rounded-2xl">
              <Image src="/logo_foot.png" alt="Info-Infect" fill sizes="350px" className="object-contain opacity-90" />
            </div>
          </div>

          {/* Tagline */}
          <div style={{ marginTop: "auto", marginBottom: 28, position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#fff", lineHeight: 1.5 }}>
              Real-time cyber intel,<br />
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 17 }}>powered by AI.</span>
            </div>
          </div>

          {/* Social row */}
          <div
            className="flex items-center justify-between gap-3"
            style={{ position: "relative", zIndex: 1 }}
          >
            <span
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: 17,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.3px",
              }}
            >
              Stay in touch!
            </span>
            <div className="flex gap-1.5">
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  suppressHydrationWarning
                  className="cursor-pointer flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: "#0e1014",
                    border: "none",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2)",
                    transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#000";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 24px rgba(0,0,0,0.45), 0 4px 10px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0e1014";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2)";
                  }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: "#fff" }}>
                    <path d={s.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Card ── */}
        <div
          className="relative flex flex-col justify-between"
          style={{
            background: "#f0f1f5",
            borderRadius: 28,
            padding: 40,
            overflow: "visible",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          {/* Floating LinkedIn */}
          <div
            className="linkedin-badge"
            style={{
              position: "absolute",
              top: -36,
              right: 40,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <a
              href="https://www.linkedin.com/in/suryansh-srivastava-746113292"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 96,
                height: 96,
                borderRadius: 22,
                transform: "rotate(-10deg)",
                background: "linear-gradient(135deg, #0077b5 0%, #005e93 55%, #004578 100%)",
                boxShadow:
                  "inset 3px 3px 8px rgba(255,255,255,0.25), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(0,94,147,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(-10deg) translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "inset 3px 3px 8px rgba(255,255,255,0.25), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 18px 36px rgba(0,94,147,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(-10deg)";
                e.currentTarget.style.boxShadow =
                  "inset 3px 3px 8px rgba(255,255,255,0.25), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(0,94,147,0.35)";
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#fff"
                style={{ width: 40, height: 40, transform: "rotate(10deg)" }}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/suryansh-srivastava-746113292"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
              style={{ transform: "rotate(-4deg)", marginTop: 4, textDecoration: "none" }}
            >
              <span style={{ width: 22, height: 22, color: "#9ca3af" }}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 20 C 6 14, 10 9, 18 5" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 5 L 12 5" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 5 L 18 11" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#9ca3af",
                  whiteSpace: "nowrap",
                }}
              >
                Connect on LinkedIn
              </span>
            </a>
          </div>

          {/* Nav columns */}
          <div style={{ paddingTop: 8 }}>
            <div className="flex flex-row" style={{ gap: 72 }}>
              {navColumns.map((col) => (
                <div key={col.title}>
                  <div
                    style={{
                      fontFamily: "var(--font-caveat), cursive",
                      fontSize: 24,
                      fontWeight: 600,
                      fontStyle: "italic",
                      color: "#9ca3af",
                      marginBottom: 18,
                    }}
                  >
                    {col.title}
                  </div>
                  {col.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block cursor-pointer"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#111827",
                          marginBottom: 14,
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#1f65d6")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
                      >
                        {link.label}
                      </a>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div
            className="footer-bottom-row flex flex-row items-end justify-between"
            style={{ marginTop: 48 }}
          >
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#9ca3af" }}>
              &copy; 2026 Info-Infect. All rights reserved.
            </span>
            <div className="flex flex-col" style={{ gap: 14 }} id="newsletter">
              <h4 style={{ fontSize: 15, fontWeight: 400, color: "#6b7280", lineHeight: 1.45 }}>
                AI moves fast.
                <strong style={{ display: "block", fontSize: 19, fontWeight: 700, color: "#111827" }}>
                  Stay ahead with Info-Infect.
                </strong>
              </h4>
              <div
                className="subscribe-row flex flex-row"
                style={{
                  width: 310,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 5,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  suppressHydrationWarning
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{
                    padding: "11px 14px",
                    fontSize: 13.5,
                    color: "#111827",
                    outline: emailError ? "2px solid #ef4444" : "none",
                    outlineOffset: -1,
                  }}
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  suppressHydrationWarning
                  className="inline-flex items-center gap-[7px] cursor-pointer whitespace-nowrap border-none"
                  style={{
                    padding: "11px 22px",
                    background: "#111214",
                    color: "#fff",
                    fontSize: 13.5,
                    fontWeight: 600,
                    borderRadius: 8,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.15)",
                    transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#000";
                    e.currentTarget.style.boxShadow =
                      "0 10px 28px rgba(0,0,0,0.38), 0 4px 12px rgba(0,0,0,0.22)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#111214";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 14, height: 14 }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Watermark ── */}
      <div
        aria-hidden="true"
        style={{
          maxWidth: 1150,
          margin: "-60px auto 0",
          pointerEvents: "none",
          userSelect: "none",
          position: "relative",
          zIndex: 0,
          lineHeight: 0,
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
        >
          <text
            ref={textRef}
            x="500"
            y="180"
            textAnchor="middle"
            fontSize="240"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              fill: "rgba(0,0,0,0.04)",
            }}
          >
            Info-Infect
          </text>
        </svg>
      </div>

      {/* ── Toast ── */}
      <div
        className="fixed bottom-6 left-1/2 z-[9999] px-7 py-3.5 rounded-xl text-sm font-medium pointer-events-none"
        style={{
          background: "#111214",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: toastVisible ? 1 : 0,
          transform: toastVisible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(80px)",
        }}
      >
        {toastMsg || "\u2713 You\u2019re subscribed to the Intel Brief!"}
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 860px) {
          .linkedin-badge { right: 12px !important; top: -28px !important; }
        }
        @media (max-width: 560px) {
          .linkedin-badge > a:first-child { width: 72px !important; height: 72px !important; }
          .linkedin-badge > a:first-child svg { width: 30px !important; height: 30px !important; }
          .footer-bottom-row { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
          .subscribe-row { width: 100% !important; }
        }
      `}</style>

    </footer>
  );
}
