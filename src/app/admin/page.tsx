"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RefreshCw, Trash2, Rss, FileText, Cpu, ShieldAlert,
  Terminal, CheckCircle2, XCircle, Activity,
} from "lucide-react";

interface FeedStatus {
  name: string;
  url: string;
  lastFetched: string;
  articleCount: number;
  status: "ok" | "error" | "stale";
  error?: string;
}

interface AdminStats {
  totalArticles: number;
  totalFeeds: number;
  averageAge: number;
  lastRefresh: string;
  feedStatus: FeedStatus[];
  recentArticles: { title: string; source: string; published: string; category: string }[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/news?action=status");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetch("/api/news?action=refresh");
      await fetchStats();
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-gray-400">
          <Activity className="h-4 w-4 animate-pulse" />
          <span className="text-sm">Loading admin panel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Feed management and system status</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white text-sm font-bold rounded transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Force Refresh
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white border border-gray-200 rounded">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <FileText className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Total Articles</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalArticles ?? 0}</p>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Rss className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Active Feeds</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalFeeds ?? 0}</p>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Cpu className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Avg. Article Age</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.averageAge ?? 0} days</p>
        </div>
      </div>

      {/* Feed status table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Feed Status</h2>
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Feed</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Articles</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Last Fetched</th>
              </tr>
            </thead>
            <tbody>
              {stats?.feedStatus.map((feed) => (
                <tr key={feed.name} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{feed.name}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{feed.url}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded ${
                      feed.status === "ok"
                        ? "bg-green-50 text-green-700"
                        : feed.status === "error"
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}>
                      {feed.status === "ok" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : feed.status === "error" ? (
                        <XCircle className="h-3 w-3" />
                      ) : (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {feed.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{feed.articleCount}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{feed.lastFetched}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent articles */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Articles</h2>
        <div className="bg-white border border-gray-200 rounded divide-y divide-gray-100">
          {stats?.recentArticles.map((article, i) => (
            <div key={i} className="px-4 py-3">
              <div className="font-semibold text-gray-900 text-sm">{article.title}</div>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span>{article.source}</span>
                <span>{article.category}</span>
                <span>{article.published}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
