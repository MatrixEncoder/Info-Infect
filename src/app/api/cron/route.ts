import { NextResponse } from "next/server";
import { fetchAllFeeds, getFeedStatus } from "@/lib/rss-feeds";

export const dynamic = "force-dynamic";

// GET /api/cron — call this periodically to refresh the feed cache
// Set up a cron job (e.g., Vercel Cron, cron-job.org, GitHub Actions) to hit this endpoint every 5–15 minutes
// Example: */10 * * * * → https://your-domain.com/api/cron

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  // Simple shared-secret auth (set CRON_SECRET in .env.local)
  const expected = process.env.CRON_SECRET;
  if (expected && secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();

  try {
    const articles = await fetchAllFeeds(true);
    const elapsed = Date.now() - start;

    const feedStatus = getFeedStatus();
    const withImages = articles.filter((a) => a.thumbnail_url).length;

    return NextResponse.json({
      ok: true,
      refreshed_at: new Date().toISOString(),
      elapsed_ms: elapsed,
      stats: {
        total_articles: articles.length,
        with_images: withImages,
        without_images: articles.length - withImages,
        feeds_configured: feedStatus.length,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
