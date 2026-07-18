import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Article, ArticleCategory } from "@/lib/types";

interface ArticleListProps {
  articles: Article[];
}

function getCatGradient(category: ArticleCategory) {
  return `cat-gradient-${category}`;
}

export function ArticleList({ articles }: ArticleListProps) {
  // Skip articles already used in hero section, show max 5
  const usedInHero = 7;
  const listArticles = articles.length > usedInHero
    ? articles.slice(usedInHero, usedInHero + 5)
    : articles.slice(-5);

  return (
    <div>
      {/* Section header */}
      <h2 className="section-header">Latest Intel</h2>

      <div className="divide-y divide-gray-100">
        {listArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="group flex items-start gap-5 py-5 first:pt-0"
          >
            {/* Left: text content */}
            <div className="flex-1 min-w-0">
              {/* Category tag */}
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-600 mb-1 block">
                {CATEGORY_LABELS[article.category]}
              </span>

              {/* Title */}
              <h3 className="text-[15px] sm:text-[17px] font-extrabold leading-snug text-gray-900 article-title-hover group-hover:text-gray-500 mb-2 line-clamp-2"
                style={{ fontFamily: "var(--font-heading)" }}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[13.5px] text-gray-500 leading-relaxed line-clamp-2 mb-2.5">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 text-[11.5px] text-gray-400 flex-wrap">
                <span className="font-medium text-gray-500">{article.source_name}</span>
                <span>·</span>
                <span>
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {article.cves.length > 0 && (
                  <>
                    <span>·</span>
                    <span className="font-mono font-bold text-red-600 text-[10.5px]">
                      {article.cves[0]}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right: thumbnail */}
            <div className={`relative w-[110px] sm:w-[130px] h-[80px] sm:h-[90px] shrink-0 overflow-hidden rounded-sm`}>
              {article.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.thumbnail_url}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 ${getCatGradient(article.category)} flex items-end p-2`}>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(255,255,255,0.05) 12px, rgba(255,255,255,0.05) 13px)",
                    }}
                  />
                  <div className="absolute top-1.5 left-1.5 flex gap-1 flex-wrap">
                    <span className="cat-pill text-[8px] !px-1.5 !py-[1px]">
                      {CATEGORY_LABELS[article.category]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
