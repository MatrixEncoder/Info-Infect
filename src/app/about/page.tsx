import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Info-Infect",
  description: "Info-Infect is a real-time cybersecurity news aggregator powered by AI, delivering curated threat intelligence from 25+ trusted sources.",
};

const stats = [
  {
    value: "25+",
    text: "RSS feeds aggregated in real-time from trusted cybersecurity sources worldwide",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=85",
    clipPath: "polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)",
    textPos: "left-6 right-6 bottom-6",
    maxW: "max-w-[66%]",
    offset: false,
  },
  {
    value: "500+",
    text: "articles processed weekly across vulnerability, malware, and breach categories",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&q=85",
    clipPath: "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))",
    textPos: "left-6 bottom-20",
    maxW: "max-w-[66%]",
    offset: true,
  },
  {
    value: "10+",
    text: "threat categories tracked including zero-days, CVEs, and AI security",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&q=85",
    clipPath: "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))",
    textPos: "left-6 right-28 bottom-6",
    maxW: "max-w-[66%]",
    offset: false,
  },
];

export default function AboutPage() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-20 sm:py-28 px-6 sm:px-10"
      style={{ backgroundColor: "#F0F5F7" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">
          {/* Left: heading */}
          <h2
            className="font-firs font-semibold uppercase tracking-tight leading-[0.95] text-[36px] sm:text-[48px] lg:text-[54px]"
            style={{ color: "#154359" }}
          >
            About
            <br />
            the founders
          </h2>

          {/* Right: description */}
          <div className="flex flex-col max-w-xl">
            <div className="text-[17px] sm:text-[18px] leading-[1.5]" style={{ color: "#154359" }}>
              <p>
                Info-Infect is a real-time cybersecurity intelligence platform that aggregates
                threat data from 25+ trusted sources, delivering curated alerts and vulnerability
                tracking to security teams worldwide.
              </p>
              <p className="mt-4">
                Info-Infect&apos;s mission is to close the gap between threat disclosure and
                response — surfacing critical intelligence the moment it&apos;s published, so
                defenders can act before attackers do.
              </p>
            </div>
            <a
              href="/"
              className="group inline-flex items-center gap-4 mt-6 text-[14px] font-medium"
              style={{ color: "#154359" }}
            >
              Info-Infect homepage
              <span
                className="flex items-center justify-center w-8 h-8 border transition-transform group-hover:-translate-y-0.5"
                style={{
                  borderColor: "#154359",
                  clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </span>
            </a>
          </div>
        </div>

        {/* Stats cards grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((card, i) => (
            <div
              key={i}
              className={`relative w-full h-[280px] sm:h-[340px] ${card.offset ? "lg:mt-24" : ""}`}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "1.5px",
                clipPath: card.clipPath,
              }}
            >
              {/* Inner card with image */}
              <div
                className="relative w-full h-full overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.image})`,
                  clipPath: card.clipPath,
                }}
              />

              {/* Text overlay */}
              <div className={`absolute ${card.textPos} ${card.maxW}`}>
                <div
                  className="font-firs font-semibold uppercase leading-none text-[36px] sm:text-[52px]"
                  style={{
                    background: "linear-gradient(294deg, #185B7B 20%, #4BBDF0)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {card.value}
                </div>
                <p className="mt-3 text-[14px] leading-[1.4]" style={{ color: "#154359" }}>
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(240, 245, 247, 0) 0%, rgba(240, 245, 247, 0.7) 60%, #F0F5F7 100%)",
        }}
      />
    </section>
  );
}
