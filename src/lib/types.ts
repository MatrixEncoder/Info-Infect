export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  thumbnail_url: string | null;
  source_url: string;
  source_name: string;
  author: string | null;
  published_at: string;
  created_at: string;
  is_featured: boolean;
  cves: string[];
  tags: string[];
}

export type ArticleCategory =
  | "cloud-security"
  | "ai-innovation"
  | "zero-day"
  | "malware"
  | "data-breach"
  | "vulnerability"
  | "infosec"
  | "cyber-policy"
  | "research"
  | "industry";

export interface CveRecord {
  id: string;
  cve_id: string;
  description: string;
  cvss_score: number;
  severity: "critical" | "high" | "medium" | "low";
  affected_software: string;
  published_at: string;
  is_active: boolean;
}

export interface RssFeed {
  id: string;
  name: string;
  url: string;
  category: ArticleCategory;
  is_active: boolean;
  last_fetched_at: string | null;
  article_count: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export type FeedMetric = {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
};

export interface AdminStats {
  totalFeeds: number;
  articlesProcessed24h: number;
  aiTokenEfficiency: number;
  totalSubscribers: number;
  activeCves: number;
  lastSync: string | null;
}
