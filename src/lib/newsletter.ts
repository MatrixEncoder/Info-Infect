import { fetchAllFeeds } from "./rss-feeds";

// ─── Buttondown Newsletter ───────────────────────────────────────
// Sends newsletters via Buttondown's email API (free tier: 100 emails/mo)

const BD_KEY = process.env.BUTTONDOWN_API_KEY;
const BD_API = "https://api.buttondown.email/v1";

// ─── Newsletter HTML Builder ─────────────────────────────────────

function buildNewsletterHtml(articles: Awaited<ReturnType<typeof fetchAllFeeds>>): string {
  const top = articles.slice(0, 8);

  const articleRows = top
    .map(
      (a) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
          <a href="https://infoinfect.dpdns.org/news/${a.slug}" style="text-decoration:none;color:#111215;">
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
              <a href="https://infoinfect.dpdns.org" style="display:inline-block;background:#111215;color:#ffffff;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">
                View All Stories →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <div style="font-size:11px;color:#9ca3af;text-align:center;line-height:1.6;">
                You're receiving this because you subscribed at infoinfect.dpdns.org<br>
                <a href="https://buttondown.com/unsubscribe" style="color:#6b7280;">Unsubscribe</a>
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

// ─── Send via Buttondown ─────────────────────────────────────────

export async function sendNewsletter(): Promise<{
  sent: number;
  failed: number;
  message: string;
}> {
  if (!BD_KEY) {
    return {
      sent: 0,
      failed: 0,
      message: "BUTTONDOWN_API_KEY not configured. Add it to .env.local.",
    };
  }

  const articles = await fetchAllFeeds();
  if (articles.length === 0) {
    return { sent: 0, failed: 0, message: "No articles to send." };
  }

  const html = buildNewsletterHtml(articles);
  const subject = `Intel Brief — ${new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} — ${articles.length} stories`;

  try {
    // Buttondown: create email as "sent" (broadcast to all subscribers)
    const res = await fetch(`${BD_API}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Token ${BD_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        body: html,
        status: "sent",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        sent: 1,
        failed: 0,
        message: `Newsletter sent via Buttondown! ID: ${data?.id || "unknown"}`,
      };
    }

    const err = await res.json().catch(() => ({}));
    return {
      sent: 0,
      failed: 1,
      message: `Buttondown error: ${err?.error || res.statusText}`,
    };
  } catch (err) {
    return {
      sent: 0,
      failed: 1,
      message: `Network error: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
}
