import { NextResponse } from "next/server";
import { fetchAllFeeds, getFeedStatus } from "@/lib/rss-feeds";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  // Force refresh
  if (action === "refresh") {
    try {
      const articles = await fetchAllFeeds(true);
      return NextResponse.json({ articles, count: articles.length, refreshed: true });
    } catch {
      return NextResponse.json({ error: "Refresh failed", articles: [], count: 0 }, { status: 500 });
    }
  }

  // Feed status
  if (action === "status") {
    return NextResponse.json({ feeds: getFeedStatus() });
  }

  // Default: fetch with cache
  try {
    const articles = await fetchAllFeeds();
    return NextResponse.json({ articles, count: articles.length });
  } catch {
    return NextResponse.json({ error: "Failed", articles: [], count: 0 }, { status: 500 });
  }
}
