import Link from "next/link";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { MOCK_CVE_DATA } from "@/lib/constants";
import { NewsletterBox } from "./newsletter-box";
import type { Article, ArticleCategory } from "@/lib/types";

interface SidebarProps {
  articles: Article[];
}

function getCatGradient(category: ArticleCategory) {
  return `cat-gradient-${category}`;
}

const SEVERITY_COLOR: Record<string, string> = {
  critical: "bg-red-600",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
};

const SEVERITY_TEXT: Record<string, string> = {
  critical: "text-red-700 bg-red-50 border-red-200",
  high: "text-orange-700 bg-orange-50 border-orange-200",
  medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
  low: "text-blue-700 bg-blue-50 border-blue-200",
};

export function Sidebar({ articles }: SidebarProps) {
  const topStories = articles.slice(0, 6);

  return (
    <aside className="space-y-8">

      {/* ── TOP STORIES ── */}
      <div>
        <h3 className="section-header">Top Stories</h3>
        <div className="divide-y divide-gray-100">
          {topStories.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex items-start gap-3 py-3.5 first:pt-0"
            >
              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[13.5px] font-bold leading-snug text-gray-900 article-title-hover group-hover:text-gray-500 line-clamp-3 mb-1">
                  {article.title}
                </h4>
                <span className="text-[11px] text-gray-400">
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Thumbnail */}
              <div
                className="relative w-[64px] h-[50px] shrink-0 overflow-hidden rounded-sm"
              >
                {article.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.thumbnail_url}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className={`absolute inset-0 ${getCatGradient(article.category)}`} />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CVE ALERTS ── */}
      <div>
        <h3
          className="font-heading font-black text-[1.05rem] uppercase tracking-[0.05em] text-red-600 pb-2 border-b-2 border-red-600 mb-4 inline-block"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CVE Alerts
        </h3>
        <div className="space-y-3">
          {MOCK_CVE_DATA.map((cve) => (
            <div
              key={cve.id}
              className="border-l-4 border-red-500 pl-3 py-1 bg-red-50/60 rounded-r-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold text-red-700 font-mono">
                  {cve.cve_id}
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-1.5 w-8 rounded-full ${SEVERITY_COLOR[cve.severity]}`}
                  />
                  <span
                    className={`text-[9.5px] font-black uppercase px-1.5 py-0.5 rounded border ${SEVERITY_TEXT[cve.severity]}`}
                  >
                    {cve.severity}
                  </span>
                </div>
              </div>
              <p className="text-[11.5px] text-gray-700 leading-snug line-clamp-2">
                {cve.description}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-gray-400 font-mono">
                  {cve.affected_software}
                </span>
                <span className="text-[10px] font-bold text-red-500">
                  CVSS {cve.cvss_score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <NewsletterBox />

      {/* ── TRENDING ── */}
      <div>
        <h3
          className="section-header"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Trending Now
        </h3>
        <div className="space-y-3">
          {articles.slice(7, 12).map((article, i) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex items-start gap-2.5"
            >
              <span className="text-2xl font-black text-gray-100 tabular-nums leading-none mt-0.5 select-none w-7 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h4 className="text-[12.5px] font-semibold leading-snug text-gray-900 article-title-hover group-hover:text-gray-500 line-clamp-2">
                  {article.title}
                </h4>
                <span className="text-[10.5px] text-gray-400 block mt-0.5">
                  {article.source_name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
