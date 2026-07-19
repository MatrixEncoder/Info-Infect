import { NextResponse } from "next/server";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "@/lib/watchlist";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, type, value } = body;

    if (!email?.trim()) {
      return NextResponse.json({ ok: false, message: "Email is required." }, { status: 400 });
    }

    switch (action) {
      case "add": {
        if (!type || !value?.trim()) {
          return NextResponse.json({ ok: false, message: "Type and value are required." }, { status: 400 });
        }
        const result = addToWatchlist(email, type, value.trim());
        return NextResponse.json(result);
      }
      case "remove": {
        if (!type || !value?.trim()) {
          return NextResponse.json({ ok: false, message: "Type and value are required." }, { status: 400 });
        }
        const result = removeFromWatchlist(email, type, value.trim());
        return NextResponse.json(result);
      }
      case "get": {
        const entries = getWatchlist(email);
        return NextResponse.json({ ok: true, entries });
      }
      default:
        return NextResponse.json({ ok: false, message: "Unknown action." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ ok: false, message: "Email parameter required." }, { status: 400 });
  }
  const entries = getWatchlist(email);
  return NextResponse.json({ ok: true, entries });
}
