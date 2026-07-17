import { NextResponse } from "next/server";
import { addSubscriber, removeSubscriber, getSubscriberCount } from "@/lib/subscribers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email } = body;

    if (action === "subscribe") {
      const result = addSubscriber(email);
      return NextResponse.json({
        ...result,
        subscriberCount: getSubscriberCount(),
      });
    }

    if (action === "unsubscribe") {
      const result = removeSubscriber(email);
      return NextResponse.json(result);
    }

    return NextResponse.json({ ok: false, message: "Invalid action." }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, message: "Something went wrong." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    subscriberCount: getSubscriberCount(),
  });
}
