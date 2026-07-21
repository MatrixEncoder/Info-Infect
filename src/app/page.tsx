import { HeroSection } from "@/components/home/hero-section";
import { ArticleList } from "@/components/home/article-list";
import { Sidebar } from "@/components/home/sidebar";
import { CveAlerts } from "@/components/home/cve-alerts";
import { ParallaxSection } from "@/components/home/parallax-section";
import { fetchAllFeeds } from "@/lib/rss-feeds";
import { Activity, Shield, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Info-Infect | Cybersecurity News & Intelligence",
  description:
    "Your MUCH needed INFECTION — real-time cybersecurity news, vulnerability tracking, and threat intelligence.",
};

function FeedLoading() {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_300px] pb-16">
      <div className="max-w-[980px] px-4 sm:px-6 lg:px-0 lg:ml-auto lg:mr-0 lg:pr-8">
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-5 py-5 border-b border-gray-100 animate-pulse">
              <div className="flex-1 space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-3 w-1/3 bg-gray-100 rounded" />
              </div>
              <div className="w-[130px] h-[90px] bg-gray-200 rounded-sm shrink-0" />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block pr-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function FeedContent({ cat }: { cat?: string }) {
  const allArticles = await fetchAllFeeds();
  const filtered = cat
    ? allArticles.filter((a) => a.category === cat)
    : allArticles;
  const articles = filtered.slice(0, 12);

  return (
    <>
      <ParallaxSection
        left={
          <>
            <div className="py-6">
              <HeroSection articles={articles} />
            </div>

            <div className="border-y border-gray-100 py-3 mb-8">
              <div className="flex items-center gap-3 sm:gap-6 text-[10.5px] sm:text-[11.5px] text-gray-500 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <Activity className="h-3.5 w-3.5 text-green-600" />
                  <span className="font-semibold text-gray-700">25 feeds live</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-amber-600" />
                  <span>
                    <span className="font-semibold text-gray-700">{allArticles.length}</span> articles
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  <span>
                    <span className="font-semibold text-red-600">
                      {allArticles.filter((a) => a.cves.length > 0).length}
                    </span>{" "}
                    CVEs
                  </span>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="text-[10.5px] text-gray-400">
                    Updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <CveAlerts />

            <ArticleList articles={articles} />
          </>
        }
        right={<Sidebar articles={articles} />}
      />
    </>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;

  return (
    <Suspense fallback={<FeedLoading />}>
      <FeedContent cat={cat} />
    </Suspense>
  );
}
