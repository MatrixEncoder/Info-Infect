import { fetchAllFeeds } from "./rss-feeds";
import { getActiveSubscribers } from "./subscribers";

// ─── Newsletter Builder ───────────────────────────────────────────
// Builds the HTML email from top articles

function buildNewsletterHtml(articles: ReturnType<typeof fetchAllFeeds> extends Promise<infer R> ? R : never extends Promise<infer R> ? R : never): string {
  const top = articles.slice(0, 8);

  const articleRows = top
    .map(
      (a) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
          <a href="https://info-infect.com/news/${a.slug}" style="text-decoration:none;color:#111215;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#d97706;margin-bottom:4px;">
              ${a.category.replace(/-/g, " ")}
            </div>
            <div style="font-size:17px;font-weight:800;line-height:1.3;margin-bottom:6px;">
              ${a.title}
            </div>
            <div style="font-size:13px;color:#6b7280;line-height:1.5;margin-bottom:6px;">
              ${a.excerpt.slice(0, 180)}${a.excerpt.length > 180 ? "..." : ""}
            </div>
            <div style="font-size:11px;color:#9ca3af;">
              ${a.source_name} · ${new Date(a.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              ${a.cves.length > 0 ? ` · <span style="color:#dc2626;font-weight:700;">${a.cves[0]}</span>` : ""}
            </div>
          </a>
        </td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#111215;padding:28px 32px;">
              <div style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                INFO-INFECT
              </div>
              <div style="font-size:12px;color:#9ca3af;margin-top:2px;">
                Your daily cybersecurity intelligence briefing
              </div>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:28px 32px 0;">
              <div style="font-size:15px;color:#374151;line-height:1.6;">
                Here are today's top stories from 25+ cybersecurity sources:
              </div>
            </td>
          </tr>

          <!-- Articles -->
          <tr>
            <td style="padding:8px 32px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${articleRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:16px 32px 28px;" align="center">
              <a href="https://info-infect.com" style="display:inline-block;background:#111215;color:#ffffff;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">
                View All Stories →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <div style="font-size:11px;color:#9ca3af;text-align:center;line-height:1.6;">
                You're receiving this because you subscribed at info-infect.com<br>
                <a href="https://info-infect.com" style="color:#6b7280;">Unsubscribe</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Send Newsletter ──────────────────────────────────────────────
// Sends the daily digest to all active subscribers

export async function sendNewsletter(): Promise<{ sent: number; failed: number; message: string }> {
  const subscribers = getActiveSubscribers();
  if (subscribers.length === 0) {
    return { sent: 0, failed: 0, message: "No active subscribers." };
  }

  const articles = await fetchAllFeeds();
  if (articles.length === 0) {
    return { sent: 0, failed: 0, message: "No articles to send." };
  }

  const html = buildNewsletterHtml(articles);
  const subject = `Intel Brief — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} — ${articles.length} stories`;

  // Try Resend first, fall back to console logging
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    // Production: send via Resend
    let sent = 0;
    let failed = 0;

    // Send in batches of 50
    for (let i = 0; i < subscribers.length; i += 50) {
      const batch = subscribers.slice(i, i + 50);
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.NEWSLETTER_FROM || "Info-Infect <brief@info-infect.com>",
            to: batch.map((s) => s.email),
            subject,
            html,
          }),
        });
        if (res.ok) sent += batch.length;
        else failed += batch.length;
      } catch {
        failed += batch.length;
      }
    }

    return {
      sent,
      failed,
      message: `Sent to ${sent} subscribers${failed > 0 ? `, ${failed} failed` : ""}.`,
    };
  }

  // Development: log to console
  console.log("\n📧 NEWSLETTER DIGEST");
  console.log(`Subject: ${subject}`);
  console.log(`Recipients: ${subscribers.length}`);
  console.log(`Articles: ${articles.length}`);
  console.log("HTML length:", html.length, "chars");
  console.log("Set RESEND_API_KEY to send real emails.\n");

  return {
    sent: subscribers.length,
    failed: 0,
    message: `Logged to console (${subscribers.length} subscribers). Set RESEND_API_KEY to send real emails.`,
  };
}
