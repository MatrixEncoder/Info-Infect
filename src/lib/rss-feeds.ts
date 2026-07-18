import { XMLParser } from "fast-xml-parser";
import type { Article, ArticleCategory } from "./types";
import { MOCK_ARTICLES } from "./constants";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => name === "media:thumbnail" || name === "media:content",
});

// ─── Feed Sources ───────────────────────────────────────────────
// 12 sources covering cybersecurity, tech, AI, and cloud security

interface FeedSource {
  name: string;
  url: string;
  category: ArticleCategory;
  enabled: boolean;
}

const FEEDS: FeedSource[] = [
  // ── Core Cybersecurity ──────────────────────────────────
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", category: "infosec", enabled: true },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/", category: "vulnerability", enabled: true },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", category: "infosec", enabled: true },
  { name: "Dark Reading", url: "https://www.darkreading.com/rss.xml", category: "infosec", enabled: true },
  { name: "SecurityWeek", url: "https://feeds.feedburner.com/securityweek", category: "vulnerability", enabled: true },
  { name: "The Record", url: "https://therecord.media/feed", category: "data-breach", enabled: true },
  { name: "SC Media", url: "https://www.scmagazine.com/feed", category: "infosec", enabled: true },
  { name: "CSO Online", url: "https://www.csoonline.com/feed/", category: "infosec", enabled: true },
  { name: "Threatpost", url: "https://threatpost.com/feed/", category: "infosec", enabled: true },
  { name: "Help Net Security", url: "https://www.helpnetsecurity.com/feed/", category: "infosec", enabled: true },
  { name: "Security Affairs", url: "https://securityaffairs.com/feed", category: "infosec", enabled: true },
  { name: "Tenable Blog", url: "https://www.tenable.com/blog/feed", category: "vulnerability", enabled: true },

  // ── Tech & Software ─────────────────────────────────────
  { name: "TechCrunch Security", url: "https://techcrunch.com/category/security/feed/", category: "infosec", enabled: true },
  { name: "Ars Technica Security", url: "https://feeds.arstechnica.com/arstechnica/security", category: "vulnerability", enabled: true },
  { name: "ZDNet Security", url: "https://www.zdnet.com/topic/security/rss.xml", category: "infosec", enabled: true },
  { name: "InfoWorld Security", url: "https://www.infoworld.com/category/security/index.rss", category: "infosec", enabled: true },
  { name: "The Register Security", url: "https://www.theregister.com/security/headlines.atom", category: "infosec", enabled: true },
  { name: "Wired Security", url: "https://www.wired.com/feed/category/security/latest/rss", category: "infosec", enabled: true },
  { name: "CNET Security", url: "https://www.cnet.com/rss/security/", category: "infosec", enabled: true },

  // ── AI & Innovation ─────────────────────────────────────
  { name: "MIT Tech Review AI", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", category: "ai-innovation", enabled: true },
  { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", category: "ai-innovation", enabled: true },
  { name: "The Verge AI", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", category: "ai-innovation", enabled: true },

  // ── Data Breaches & Privacy ─────────────────────────────
  { name: "DataBreaches.net", url: "https://www.databreaches.net/feed/", category: "data-breach", enabled: true },
  { name: "IAPP News", url: "https://iapp.org/news/rss/", category: "cyber-policy", enabled: true },

  // ── Cloud Security ──────────────────────────────────────
  { name: "AWS Security Blog", url: "https://aws.amazon.com/blogs/security/feed/", category: "cloud-security", enabled: true },
  { name: "Google Cloud Security", url: "https://cloud.google.com/blog/products/identity-security/rss", category: "cloud-security", enabled: true },
];

// ─── In-Memory Cache ────────────────────────────────────────────

let cachedArticles: Article[] = [];
let lastFetchTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// ─── Helpers ────────────────────────────────────────────────────

function categorizeTitle(title: string): ArticleCategory {
  const t = title.toLowerCase();
  if (t.includes("cve-") || t.includes("vulnerability") || t.includes("exploit") || t.includes("patch")) return "vulnerability";
  if (t.includes("malware") || t.includes("ransomware") || t.includes("trojan") || t.includes("backdoor")) return "malware";
  if (t.includes("breach") || t.includes("leak") || t.includes("exposed") || t.includes("stolen")) return "data-breach";
  if (t.includes("ai ") || t.includes("llm") || t.includes("gpt") || t.includes("machine learning") || t.includes("openai") || t.includes("anthropic")) return "ai-innovation";
  if (t.includes("cloud") || t.includes("aws") || t.includes("azure") || t.includes("gcp")) return "cloud-security";
  if (t.includes("zero-day") || t.includes("zeroday")) return "zero-day";
  if (t.includes("policy") || t.includes("regulation") || t.includes("compliance") || t.includes("ban")) return "cyber-policy";
  if (t.includes("research") || t.includes("study") || t.includes("analysis")) return "research";
  return "infosec";
}

function extractCves(text: string): string[] {
  const matches = text.match(/CVE-\d{4}-\d{4,}/g);
  return matches ? [...new Set(matches)] : [];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/-$/, "");
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractImageUrl(item: Record<string, unknown>): string | null {
  // 1. media:thumbnail
  const thumb = item["media:thumbnail"];
  if (Array.isArray(thumb) && thumb.length > 0) {
    const url = thumb[0]?.["@_url"];
    if (url) return String(url);
  } else if (thumb && typeof thumb === "object" && "@_url" in thumb) {
    return String((thumb as Record<string, string>)["@_url"]);
  }

  // 2. enclosure (image type)
  const enc = item.enclosure as Record<string, unknown> | undefined;
  if (enc?.["@_url"] && String(enc["@_type"] || "").startsWith("image/")) {
    return String(enc["@_url"]);
  }

  // 3. media:content
  const media = item["media:content"];
  if (Array.isArray(media) && media.length > 0) {
    for (const m of media) {
      if (m?.["@_medium"] === "image" && m?.["@_url"]) return String(m["@_url"]);
    }
    if (media[0]?.["@_url"]) return String(media[0]["@_url"]);
  } else if (media && typeof media === "object" && "@_url" in media) {
    return String((media as Record<string, string>)["@_url"]);
  }

  // 4. First <img> in content:encoded or description
  const content = String(item["content:encoded"] || item.description || "");
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return null;
}

// ─── og:image Fallback ───────────────────────────────────────────
// When no RSS image found, fetch the page and extract og:image

const ogImageCache = new Map<string, string | null>();
const OG_CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const ogCacheTimestamps = new Map<string, number>();

export async function fetchOgImage(url: string): Promise<string | null> {
  const now = Date.now();
  const cached = ogImageCache.get(url);
  const ts = ogCacheTimestamps.get(url) ?? 0;

  if (cached !== undefined && now - ts < OG_CACHE_TTL) {
    return cached;
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Info-Infect/1.0 (og:image fetcher)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });

    if (!res.ok) {
      ogImageCache.set(url, null);
      ogCacheTimestamps.set(url, now);
      return null;
    }

    const html = await res.text();
    // Extract og:image from meta tags
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
      || html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);

    const imgUrl = ogMatch ? ogMatch[1] : null;
    ogImageCache.set(url, imgUrl);
    ogCacheTimestamps.set(url, now);
    return imgUrl;
  } catch {
    ogImageCache.set(url, null);
    ogCacheTimestamps.set(url, now);
    return null;
  }
}

// ─── Fetch Single Feed ──────────────────────────────────────────

async function fetchFeed(source: FeedSource): Promise<Article[]> {
  try {
    const res = await fetch(source.url, {
      headers: {
        "User-Agent": "Info-Infect/1.0 (Cybersecurity News Aggregator; +https://info-infect.com)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const parsed = parser.parse(xml);

    const channel = parsed?.rss?.channel;
    if (!channel) return [];

    const items = Array.isArray(channel.item)
      ? channel.item
      : channel.item
        ? [channel.item]
        : [];

    return items.slice(0, 15).map((item: Record<string, unknown>) => {
      const title = String(item.title || "Untitled");
      const description = stripHtml(String(item.description || item["content:encoded"] || ""));
      const snippet = description.slice(0, 300);
      const fullContent = stripHtml(String(item["content:encoded"] || item.description || ""));
      const category = categorizeTitle(`${title} ${snippet}`);
      const cves = extractCves(`${title} ${snippet}`);

      return {
        id: `${source.name}-${slugify(title)}`,
        slug: slugify(title),
        title,
        excerpt: snippet || `Coverage from ${source.name}`,
        content: `## ${title}\n\n${fullContent || snippet}`,
        category,
        thumbnail_url: extractImageUrl(item),
        source_url: String(item.link || "#"),
        source_name: source.name,
        author: String(item["dc:creator"] || item.author || source.name),
        published_at: String(item.pubDate || item.isoDate || new Date().toISOString()),
        created_at: new Date().toISOString(),
        is_featured: false,
        cves,
        tags: [source.name.toLowerCase().replace(/\s+/g, "-"), category],
      } satisfies Article;
    });
  } catch {
    return [];
  }
}

// ─── Fetch All Feeds (with cache) ───────────────────────────────

export async function fetchAllFeeds(forceRefresh = false): Promise<Article[]> {
  const now = Date.now();

  // Always return cache if fresh enough (unless forced)
  if (!forceRefresh && cachedArticles.length > 0 && now - lastFetchTime < CACHE_DURATION_MS) {
    console.log(`[feeds] Cache HIT — ${cachedArticles.length} articles, age ${Math.round((now - lastFetchTime) / 1000)}s`);
    return cachedArticles;
  }

  console.log(`[feeds] Fetching fresh from ${FEEDS.filter(f => f.enabled).length} sources...`);

  const enabledFeeds = FEEDS.filter((f) => f.enabled);
  const results = await Promise.allSettled(enabledFeeds.map(fetchFeed));

  const articles = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => (r as PromiseFulfilledResult<Article[]>).value);

  // Deduplicate by slug
  const seen = new Set<string>();
  const unique = articles.filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });

  // Sort by date
  unique.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  // Apply og:image fallback to articles without thumbnails (top 40 only)
  const withoutImages = unique.filter((a) => !a.thumbnail_url).slice(0, 40);
  await Promise.allSettled(
    withoutImages.map(async (a) => {
      const og = await fetchOgImage(a.source_url);
      if (og) a.thumbnail_url = og;
    })
  );

  // If RSS failed completely, fall back to mock articles
  if (unique.length === 0 && cachedArticles.length === 0) {
    cachedArticles = MOCK_ARTICLES as Article[];
    lastFetchTime = now;
    return cachedArticles;
  }

  cachedArticles = unique;
  lastFetchTime = now;

  console.log(`[feeds] Fresh fetch complete — ${unique.length} articles, newest: ${unique[0]?.title?.slice(0, 60)}`);

  return unique;
}

// ─── Feed Status ────────────────────────────────────────────────

export function getFeedStatus() {
  return FEEDS.map((f) => ({
    name: f.name,
    url: f.url,
    category: f.category,
    enabled: f.enabled,
  }));
}

// ─── Full Article Scraper ────────────────────────────────────────
// Fetches the source page and extracts the main article body as clean text.
// Returns null if scraping fails.

const fullArticleCache = new Map<string, string | null>();
const FULL_CACHE_TTL = 60 * 60 * 1000; // 1 hour
const fullCacheTimestamps = new Map<string, number>();

function stripAllTags(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractArticleBody(html: string): string | null {
  // Try common article selectors
  const selectors = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<div[^>]+class=["'][^"']*(?:article[_-]?body|post[_-]?content|entry[_-]?content|story[_-]?body|article[_-]?content)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+itemprop=["']articleBody["'][^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const regex of selectors) {
    const match = html.match(regex);
    if (match) {
      let cleaned = stripAllTags(match[1]);
      cleaned = cleanArticleText(cleaned);
      if (cleaned.length > 200) return cleaned;
    }
  }

  // Fallback: find the largest text block in <p> tags
  const paragraphs = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  if (paragraphs && paragraphs.length >= 3) {
    const texts = paragraphs
      .map((p) => cleanArticleText(stripAllTags(p)))
      .filter((t) => t.length > 50);
    if (texts.length >= 3) {
      return texts.join("\n\n");
    }
  }

  return null;
}

function cleanArticleText(text: string): string {
  return text
    // Remove common UI junk patterns
    .replace(/^[\s\S]{0,200}(?:Comment\s*Loader|Save\s*Story|Save\s*this\s*story|Share\s*this|Read\s*more|Subscribe|Sign\s*up|Newsletter|Advertisement|Sponsored|Loading\.\.\.)[\s\S]{0,100}/gi, "")
    .replace(/(?:Comment\s*Loader|Save\s*Story|Save\s*this\s*story|Share\s*this|Read\s*more|Subscribe|Sign\s*up|Newsletter|Advertisement|Sponsored|Loading\.\.\.)[\s\S]{0,100}/gi, "")
    // Remove share/social UI text
    .replace(/\b(Share|Tweet|Pin|Email|Print|Copy link|Comments?\s*\(\d*\))\b/gi, "")
    // Remove repeated short words from UI (e.g. "Save Save Save")
    .replace(/\b(\w{2,8})\s+\1\s+\1(?:\s+\1)*/g, "$1")
    // Clean up extra whitespace
    .replace(/\s{3,}/g, "  ")
    .trim();
}

export async function fetchFullArticle(url: string): Promise<string | null> {
  const now = Date.now();
  const cached = fullArticleCache.get(url);
  const ts = fullCacheTimestamps.get(url) ?? 0;

  if (cached !== undefined && now - ts < FULL_CACHE_TTL) {
    return cached;
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Info-Infect/1.0 (full article fetcher)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      fullArticleCache.set(url, null);
      fullCacheTimestamps.set(url, now);
      return null;
    }

    const html = await res.text();
    const body = extractArticleBody(html);

    fullArticleCache.set(url, body);
    fullCacheTimestamps.set(url, now);
    return body;
  } catch {
    fullArticleCache.set(url, null);
    fullCacheTimestamps.set(url, now);
    return null;
  }
}
