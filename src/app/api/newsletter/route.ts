import { NextResponse } from "next/server";
import { sendNewsletter } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

const BD_KEY = process.env.BUTTONDOWN_API_KEY;
const BD_API = "https://api.buttondown.email/v1";

async function getSubscriberCount(): Promise<number> {
  if (!BD_KEY) return 0;
  try {
    const res = await fetch(`${BD_API}/subscribers`, {
      headers: { Authorization: `Token ${BD_KEY}` },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data?.count ?? data?.results?.length ?? 0;
  } catch {
    return 0;
  }
}

// POST /api/newsletter — send newsletter to all subscribers
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret") || "";

  const expected = process.env.CRON_SECRET;
  if (expected && secret !== expected) {
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

// GET /api/newsletter — subscriber count from Buttondown
export async function GET() {
  const count = await getSubscriberCount();
  return NextResponse.json({ subscriberCount: count });
}
