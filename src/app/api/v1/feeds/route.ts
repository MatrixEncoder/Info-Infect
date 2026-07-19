import { NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss-feeds";
import { fetchKevCatalog } from "@/lib/kev";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
  const source = url.searchParams.get("source");
  const format = url.searchParams.get("format") || "json";

  const [articles, kev] = await Promise.all([fetchAllFeeds(), fetchKevCatalog()]);

  let filtered = articles;

  if (category) {
    filtered = filtered.filter((a) => a.category === category);
  }
  if (source) {
    filtered = filtered.filter((a) =>
      a.source_name.toLowerCase().includes(source.toLowerCase())
    );
  }

  filtered = filtered.slice(0, limit);

  const response = {
    meta: {
      total: filtered.length,
      category: category || "all",
      source: source || "all",
      generated_at: new Date().toISOString(),
      api_version: "1.0",
    },
    articles: filtered.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      source: a.source_name,
      author: a.author,
      url: a.source_url,
      published_at: a.published_at,
      thumbnail: a.thumbnail_url,
      cves: a.cves,
      tags: a.tags,
    })),
    kev: {
      total: kev.length,
      recent: kev
        .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        .slice(0, 10)
        .map((k) => ({
          cve_id: k.cveId,
          vendor: k.vendor,
          product: k.product,
          name: k.vulnerabilityName,
          date_added: k.dateAdded,
          ransomware: k.knownRansomwareCampaignUse === "Known",
        })),
    },
  };

  return NextResponse.json(response, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
  });
}
