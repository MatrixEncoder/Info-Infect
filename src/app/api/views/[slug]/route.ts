import { NextResponse } from "next/server";
import { getViews, incrementViews } from "@/lib/views";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return NextResponse.json({ views: getViews(slug) });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const views = incrementViews(slug);
  return NextResponse.json({ views });
}
