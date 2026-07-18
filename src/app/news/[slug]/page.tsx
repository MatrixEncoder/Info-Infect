import Link from "next/link";
import { Clock, ExternalLink, ArrowLeft, AlertTriangle } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/constants";
import { fetchAllFeeds } from "@/lib/rss-feeds";
import { renderMarkdown } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/article/reading-progress";
import { ShareViewBar } from "@/components/article/share-view-bar";
import type { Metadata } from "next";
import type { ArticleCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

function getCatGradient(category: ArticleCategory) {
  return `cat-gradient-${category}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = await fetchAllFeeds();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} | Info-Infect`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articles = await fetchAllFeeds();
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 4);

  const topStories = articles.filter((a) => a.id !== article.id).slice(0, 6);

  return (
    <>
      <ReadingProgress />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Article body ── */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Home
              </Link>
              <span>/</span>
              <span className="text-amber-600 font-semibold">
                {CATEGORY_LABELS[article.category]}
              </span>
            </div>

            {/* Title header */}
            <header className="mb-6">
              {/* Category tags — TheTechPortal style */}
              <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-3 flex-wrap">
                <span className="font-semibold text-amber-600 hover:text-amber-700 cursor-pointer transition-colors">
                  {CATEGORY_LABELS[article.category]}
                </span>
                {article.cves.length > 0 && (
                  <>
                    <span>,</span>
                    <span className="font-semibold text-red-600">CVE</span>
                  </>
                )}
              </div>

              <h1
                className="text-[1.6rem] sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black leading-tight text-gray-900 mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-3 text-[13px] text-gray-500 flex-wrap">
                <span className="font-semibold text-gray-700">
                  {article.source_name}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </header>

            {/* Hero image */}
            <div
              className={`aspect-[16/9] w-full overflow-hidden rounded-sm mb-7 relative`}
            >
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
                        "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.05) 30px, rgba(255,255,255,0.05) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.05) 30px, rgba(255,255,255,0.05) 31px)",
                    }}
                  />
                </div>
              )}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="cat-pill">{CATEGORY_LABELS[article.category]}</span>
                <span className="cat-pill">{article.source_name}</span>
              </div>
            </div>

            {/* Article body */}
            <div
              className="article-prose mb-8"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
            />

            {/* Source attribution */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Originally published by {article.source_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(article.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {article.author && article.author !== article.source_name && (
                      <> · By {article.author}</>
                    )}
                  </p>
                </div>
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-semibold rounded-lg transition-colors shrink-0 sm:w-auto w-full"
                >
                  Read on {article.source_name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* CVE badges */}
            {article.cves.length > 0 && (
              <div className="border border-red-200 bg-red-50 rounded-sm p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <h3 className="text-[12px] font-bold text-red-700 uppercase tracking-wider">
                    Related Vulnerabilities
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.cves.map((cve) => (
                    <span
                      key={cve}
                      className="px-2.5 py-1 bg-white border border-red-200 text-red-700 text-[11px] font-mono font-bold rounded-sm"
                    >
                      {cve}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-semibold rounded-sm uppercase tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share + Views + CTA */}
            <ShareViewBar slug={article.slug} title={article.title} />
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-[12.5px] font-bold rounded-sm transition-colors"
              >
                Read Full Article
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-[11.5px] text-gray-400">
                Original source: {article.source_name}
              </span>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h2 className="section-header">Related Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/news/${rel.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="relative w-[80px] h-[62px] shrink-0 rounded-sm overflow-hidden">
                        {rel.thumbnail_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={rel.thumbnail_url}
                            alt={rel.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`absolute inset-0 ${getCatGradient(rel.category)}`} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                          {CATEGORY_LABELS[rel.category]}
                        </span>
                        <h3 className="text-[13px] font-bold leading-snug text-gray-900 article-title-hover group-hover:text-gray-500 line-clamp-3">
                          {rel.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
            <div className="sticky top-[100px] space-y-8">
              <div>
                <h3 className="section-header">Top Stories</h3>
                <div className="divide-y divide-gray-100">
                  {topStories.map((a) => (
                    <Link
                      key={a.id}
                      href={`/news/${a.slug}`}
                      className="group flex items-start gap-3 py-3.5 first:pt-0"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold leading-snug text-gray-900 article-title-hover group-hover:text-gray-500 line-clamp-3 mb-1">
                          {a.title}
                        </h4>
                        <span className="text-[11px] text-gray-400">
                          {new Date(a.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="relative w-[60px] h-[48px] shrink-0 rounded-sm overflow-hidden">
                        {a.thumbnail_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.thumbnail_url}
                            alt={a.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`absolute inset-0 ${getCatGradient(a.category)}`} />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
