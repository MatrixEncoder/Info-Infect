import Link from "next/link";
import { NewsletterBox } from "./newsletter-box";
import type { Article, ArticleCategory } from "@/lib/types";

interface SidebarProps {
  articles: Article[];
}

function getCatGradient(category: ArticleCategory) {
  return `cat-gradient-${category}`;
}

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
