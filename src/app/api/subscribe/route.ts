import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BD_KEY = process.env.BUTTONDOWN_API_KEY;
const BD_API = "https://api.buttondown.email/v1";

async function bdFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BD_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Token ${BD_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return res;
}

// Subscribe via Buttondown
async function subscribe(email: string): Promise<{ ok: boolean; message: string }> {
  if (!BD_KEY) {
    return { ok: false, message: "Buttondown API key not configured." };
  }

  try {
    const res = await bdFetch("/subscribers", {
      method: "POST",
      body: JSON.stringify({
        email_address: email,
        type: "regular",
        notes: `Subscribed via infoinfect.dpdns.org`,
      }),
    });

    if (res.status === 201) {
      return { ok: true, message: "Subscribed! Check your inbox." };
    }

    const data = await res.json().catch(() => ({}));

    // Already subscribed
    if (res.status === 400 && JSON.stringify(data).includes("already")) {
      return { ok: true, message: "You're already subscribed!" };
    }

    return { ok: false, message: data?.error || "Subscription failed. Try again." };
  } catch {
    return { ok: false, message: "Network error. Try again." };
  }
}

// Unsubscribe via Buttondown
async function unsubscribe(email: string): Promise<{ ok: boolean; message: string }> {
  if (!BD_KEY) {
    return { ok: false, message: "Buttondown API key not configured." };
  }

  try {
    // Find subscriber by email first
    const listRes = await bdFetch(`/subscribers?email_address=${encodeURIComponent(email)}`);
    if (!listRes.ok) return { ok: false, message: "Subscriber not found." };

    const listData = await listRes.json();
    const subscriber = listData?.results?.[0];

    if (!subscriber?.id) {
      return { ok: false, message: "Subscriber not found." };
    }

    const res = await bdFetch(`/subscribers/${subscriber.id}`, {
      method: "DELETE",
    });

    if (res.ok || res.status === 204) {
      return { ok: true, message: "Unsubscribed successfully." };
    }

    return { ok: false, message: "Failed to unsubscribe." };
  } catch {
    return { ok: false, message: "Network error. Try again." };
  }
}

// Get subscriber count
async function getCount(): Promise<number> {
  if (!BD_KEY) return 0;

  try {
    const res = await bdFetch("/subscribers");
    if (!res.ok) return 0;
    const data = await res.json();
    return data?.count ?? data?.results?.length ?? 0;
  } catch {
    return 0;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email } = body;

    if (!email?.trim()) {
      return NextResponse.json({ ok: false, message: "Email is required." }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();

    if (action === "subscribe") {
      const result = await subscribe(trimmed);
      const count = await getCount();
      return NextResponse.json({ ...result, subscriberCount: count });
    }

    if (action === "unsubscribe") {
      const result = await unsubscribe(trimmed);
      const count = await getCount();
      return NextResponse.json({ ...result, subscriberCount: count });
    }

    return NextResponse.json({ ok: false, message: "Invalid action." }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, message: "Something went wrong." }, { status: 500 });
  }
}

export async function GET() {
  const count = await getCount();
  return NextResponse.json({ subscriberCount: count });
}
