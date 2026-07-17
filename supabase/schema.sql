-- Info-Infect: Cybersecurity & Tech News Curation Platform
-- Supabase PostgreSQL Schema

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ARTICLES TABLE
-- ============================================
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN (
      'cloud-security', 'ai-innovation', 'zero-day', 'malware',
      'data-breach', 'vulnerability', 'infosec', 'cyber-policy',
      'research', 'industry'
    )
  ),
  thumbnail_url TEXT,
  source_url TEXT NOT NULL,
  source_name TEXT NOT NULL,
  author TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  cves TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}'
);

CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_is_featured ON articles(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_cves ON articles USING GIN(cves);

-- ============================================
-- RSS FEEDS TABLE
-- ============================================
CREATE TABLE rss_feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN (
      'cloud-security', 'ai-innovation', 'zero-day', 'malware',
      'data-breach', 'vulnerability', 'infosec', 'cyber-policy',
      'research', 'industry'
    )
  ),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_fetched_at TIMESTAMPTZ,
  fetch_interval_minutes INTEGER NOT NULL DEFAULT 15,
  article_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rss_feeds_active ON rss_feeds(is_active) WHERE is_active = TRUE;

-- ============================================
-- CVE RECORDS TABLE
-- ============================================
CREATE TABLE cve_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cve_id TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  cvss_score NUMERIC(3,1) NOT NULL CHECK (cvss_score >= 0 AND cvss_score <= 10),
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low', 'none')),
  affected_software TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  source_url TEXT,
  article_id UUID REFERENCES articles(id) ON DELETE SET NULL
);

CREATE INDEX idx_cves_severity ON cve_records(severity);
CREATE INDEX idx_cves_is_active ON cve_records(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_cves_cvss ON cve_records(cvss_score DESC);

-- ============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  source TEXT DEFAULT 'web',
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active) WHERE is_active = TRUE;

-- ============================================
-- CRAWLER LOG TABLE
-- ============================================
CREATE TABLE crawler_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feed_id UUID REFERENCES rss_feeds(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'partial')),
  articles_found INTEGER NOT NULL DEFAULT 0,
  articles_imported INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  token_usage INTEGER,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_crawler_logs_created ON crawler_logs(created_at DESC);
CREATE INDEX idx_crawler_logs_feed ON crawler_logs(feed_id);

-- ============================================
-- ANALYTICS / METRICS TABLE
-- ============================================
CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,
  articles_processed INTEGER NOT NULL DEFAULT 0,
  articles_published INTEGER NOT NULL DEFAULT 0,
  cves_tracked INTEGER NOT NULL DEFAULT 0,
  feeds_active INTEGER NOT NULL DEFAULT 0,
  subscribers_added INTEGER NOT NULL DEFAULT 0,
  ai_tokens_used INTEGER NOT NULL DEFAULT 0,
  ai_token_efficiency NUMERIC(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_daily_metrics_date ON daily_metrics(date DESC);

-- ============================================
-- AUTOMATED FUNCTIONS
-- ============================================

-- Update updated_at timestamp on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rss_feeds_updated_at
  BEFORE UPDATE ON rss_feeds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cve_records_updated_at
  BEFORE UPDATE ON cve_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE cve_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawler_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (is_published = TRUE);

-- Authenticated users can manage feeds
CREATE POLICY "Authenticated users can manage feeds"
  ON rss_feeds FOR ALL
  USING (auth.role() = 'authenticated');

-- Public read access for active CVEs
CREATE POLICY "Public can view active CVEs"
  ON cve_records FOR SELECT
  USING (is_active = TRUE);

-- Public can insert into newsletter (subscription)
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view subscriber data
CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');
