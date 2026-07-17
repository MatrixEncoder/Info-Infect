import { NextResponse } from "next/server";
import { sendNewsletter } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

// POST /api/newsletter — send newsletter to all subscribers
// Call from cron or admin panel

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret") || "";

  // Auth check
  const expected = process.env.CRON_SECRET;
  if (expected && secret !== expected) {
    // Also check body for non-GET requests
    try {
      const body = await request.json();
      if (body.secret !== expected) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await sendNewsletter();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

// GET /api/newsletter — check subscriber count
export async function GET() {
  const { getSubscriberCount } = await import("@/lib/subscribers");
  return NextResponse.json({ subscriberCount: getSubscriberCount() });
}
