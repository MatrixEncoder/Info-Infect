import Link from "next/link";
import { Clock } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Article, ArticleCategory } from "@/lib/types";

interface HeroProps {
  articles: Article[];
}

function getCatGradient(category: ArticleCategory) {
  return `cat-gradient-${category}`;
}

function ArticleImage({
  article,
  className = "",
  children,
}: {
  article: Article;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {article.thumbnail_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.thumbnail_url}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 ${getCatGradient(article.category)}`}>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.07) 24px, rgba(255,255,255,0.07) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.07) 24px, rgba(255,255,255,0.07) 25px)",
            }}
          />
          <span className="absolute bottom-2 left-2 text-[10px] text-white/40 font-mono tracking-wider">
            {article.source_name}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

export function HeroSection({ articles }: HeroProps) {
  if (articles.length === 0) return null;

  const featured = articles[0];

  return (
    <section className="border-b border-gray-200 pb-8 mb-0">
      <Link href={`/news/${featured.slug}`} className="group block">
        <ArticleImage article={featured} className="aspect-[21/9] w-full rounded-sm mb-5">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            <span className="cat-pill">{CATEGORY_LABELS[featured.category]}</span>
            {featured.cves.length > 0 && (
              <span className="cat-pill !bg-red-700">CVE</span>
            )}
          </div>
        </ArticleImage>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black leading-tight text-gray-900 article-title-hover group-hover:text-gray-500 mb-3"
          style={{ fontFamily: "var(--font-heading)" }}>
          {featured.title}
        </h2>
        <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-2 mb-3 max-w-[800px]">
          {featured.excerpt}
        </p>
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
          <span className="font-medium text-gray-600">{featured.source_name}</span>
          <span>·</span>
          <Clock className="h-3 w-3 inline" />
          <span>
            {new Date(featured.published_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </Link>
    </section>
  );
}
