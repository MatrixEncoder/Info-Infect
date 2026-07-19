import { Metadata } from "next";
import { fetchAllFeeds } from "@/lib/rss-feeds";
import { fetchKevCatalog } from "@/lib/kev";
import { Shield, AlertTriangle, Clock, TrendingUp, Newspaper, Bug } from "lucide-react";
import Link from "next/link";
import type { ArticleCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Brief | Info-Infect",
  description: "Your daily cybersecurity intelligence summary — top threats, CVEs, and critical alerts.",
};

function getCatGradient(category: ArticleCategory) {
  return `cat-gradient-${category}`;
}

export default async function DailyBriefPage() {
  const [articles, kevEntries] = await Promise.all([fetchAllFeeds(), fetchKevCatalog()]);

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const yesterday = new Date(now.getTime() - 86400000).toISOString().split("T")[0];

  // Today's top stories
  const todayArticles = articles.filter((a) => {
    const d = new Date(a.published_at).toISOString().split("T")[0];
    return d >= yesterday;
  });

  const criticalArticles = todayArticles.filter(
    (a) => a.cves.length > 0 || a.category === "vulnerability" || a.category === "malware"
  );

  const breachArticles = todayArticles.filter(
    (a) => a.category === "data-breach"
  );

  const aiArticles = todayArticles.filter(
    (a) => a.category === "ai-innovation"
  );

  const recentKev = kevEntries
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 5);

  const categoryCounts = articles.reduce(
    (acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1
              className="text-2xl sm:text-3xl font-black text-gray-900"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Daily Intelligence Brief
            </h1>
            <p className="text-[13px] text-gray-500">
              {now.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-gray-400">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Auto-generated from 25+ live feeds
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Newspaper className="h-4 w-4 text-amber-600" />
            <span className="text-[11px] font-bold text-gray-500 uppercase">Today</span>
          </div>
          <span className="text-2xl font-black text-gray-900">{todayArticles.length}</span>
          <span className="text-[11px] text-gray-400 block">articles</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Bug className="h-4 w-4 text-red-600" />
            <span className="text-[11px] font-bold text-gray-500 uppercase">CVEs</span>
          </div>
          <span className="text-2xl font-black text-red-600">
            {criticalArticles.filter((a) => a.cves.length > 0).length}
          </span>
          <span className="text-[11px] text-gray-400 block">in headlines</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <span className="text-[11px] font-bold text-gray-500 uppercase">Breaches</span>
          </div>
          <span className="text-2xl font-black text-orange-600">{breachArticles.length}</span>
          <span className="text-[11px] text-gray-400 block">reports</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-[11px] font-bold text-gray-500 uppercase">AI Intel</span>
          </div>
          <span className="text-2xl font-black text-blue-600">{aiArticles.length}</span>
          <span className="text-[11px] text-gray-400 block">stories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
        {/* Main content */}
        <div>
          {/* Critical Alerts */}
          {criticalArticles.length > 0 && (
            <section className="mb-10">
              <h2
                className="font-heading font-black text-[1.1rem] uppercase tracking-[0.05em] text-red-600 pb-2 border-b-2 border-red-600 mb-4 inline-block"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Critical Alerts
              </h2>
              <div className="space-y-4">
                {criticalArticles.slice(0, 5).map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group flex gap-4 p-4 bg-red-50 border border-red-100 rounded-lg hover:border-red-200 transition-colors"
                  >
                    <div className="relative w-[100px] h-[72px] shrink-0 rounded-sm overflow-hidden">
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
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold leading-snug text-gray-900 line-clamp-2 mb-1 group-hover:text-red-700 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 flex-wrap">
                        <span className="font-semibold">{article.source_name}</span>
                        {article.cves.length > 0 && (
                          <>
                            <span>·</span>
                            <span className="font-mono font-bold text-red-600">
                              {article.cves[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All Today's Articles */}
          <section>
            <h2 className="section-header">All Headlines Today</h2>
            <div className="divide-y divide-gray-100">
              {(todayArticles.length > 0 ? todayArticles : articles).slice(0, 15).map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group flex items-start gap-4 py-4 first:pt-0"
                >
                  <div className="relative w-[90px] h-[68px] shrink-0 rounded-sm overflow-hidden">
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
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                      {article.category.replace("-", " ")}
                    </span>
                    <h3 className="text-[14px] font-bold leading-snug text-gray-900 line-clamp-2 mb-1 group-hover:text-gray-500 transition-colors">
                      {article.title}
                    </h3>
                    <span className="text-[11px] text-gray-400">
                      {article.source_name} · {new Date(article.published_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* KEV Updates */}
          <div>
            <h3
              className="font-heading font-black text-[1rem] uppercase tracking-[0.05em] text-red-600 pb-2 border-b-2 border-red-600 mb-4 inline-block"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              CISA KEV Updates
            </h3>
            <div className="space-y-3">
              {recentKev.map((kev) => (
                <div
                  key={kev.cveId}
                  className="border-l-4 border-red-500 pl-3 py-1 bg-red-50/60 rounded-r-sm"
                >
                  <span className="text-[11px] font-bold text-red-700 font-mono block">
                    {kev.cveId}
                  </span>
                  <p className="text-[11.5px] text-gray-700 leading-snug line-clamp-2 mt-0.5">
                    {kev.vulnerabilityName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400">{kev.vendor}</span>
                    {kev.knownRansomwareCampaignUse === "Known" && (
                      <span className="text-[9px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                        RANSOMWARE
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/exploits"
              className="mt-3 inline-block text-[12px] font-semibold text-amber-600 hover:text-amber-700"
            >
              View all exploits →
            </Link>
          </div>

          {/* Category Breakdown */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="section-header">Feed Categories</h3>
            <div className="space-y-2">
              {Object.entries(categoryCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between text-[12px]">
                    <span className="text-gray-600 capitalize">{cat.replace("-", " ")}</span>
                    <span className="font-bold text-gray-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
