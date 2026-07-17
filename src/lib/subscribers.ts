import type { NewsletterSubscriber } from "./types";

// ─── In-Memory Subscriber Store ───────────────────────────────────
// Replace with Supabase/DB in production

let subscribers: NewsletterSubscriber[] = [];
let nextId = 1;

export function addSubscriber(email: string): { ok: boolean; message: string } {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, message: "Invalid email address." };
  }

  const existing = subscribers.find((s) => s.email === trimmed && s.is_active);
  if (existing) {
    return { ok: false, message: "You're already subscribed!" };
  }

  // Reactivate if previously unsubscribed
  const inactive = subscribers.find((s) => s.email === trimmed && !s.is_active);
  if (inactive) {
    inactive.is_active = true;
    inactive.subscribed_at = new Date().toISOString();
    return { ok: true, message: "Welcome back! You're subscribed again." };
  }

  subscribers.push({
    id: String(nextId++),
    email: trimmed,
    subscribed_at: new Date().toISOString(),
    is_active: true,
  });

  return { ok: true, message: "You're in! Welcome to the Intel Brief." };
}

export function removeSubscriber(email: string): { ok: boolean; message: string } {
  const trimmed = email.trim().toLowerCase();
  const sub = subscribers.find((s) => s.email === trimmed);
  if (!sub) {
    return { ok: false, message: "Email not found." };
  }
  sub.is_active = false;
  return { ok: true, message: "You've been unsubscribed." };
}

export function getActiveSubscribers(): NewsletterSubscriber[] {
  return subscribers.filter((s) => s.is_active);
}

export function getSubscriberCount(): number {
  return subscribers.filter((s) => s.is_active).length;
}
