import { fetchAllFeeds } from "./rss-feeds";

// ─── Background Refresher ────────────────────────────────────────
// Periodically refreshes the feed cache in the background.
// Call `startBackgroundRefresh()` once at app startup.
// Runs every REFRESH_INTERVAL_MS (default 10 minutes).

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
let refreshTimer: ReturnType<typeof setInterval> | null = null;
let isRefreshing = false;

async function refreshInBackground() {
  if (isRefreshing) return;
  isRefreshing = true;
  try {
    await fetchAllFeeds(true);
  } catch {
    // Silently retry on next interval
  } finally {
    isRefreshing = false;
  }
}

export function startBackgroundRefresh() {
  if (refreshTimer) return; // Already running

  // Initial refresh on startup
  refreshInBackground();

  // Then refresh every REFRESH_INTERVAL_MS
  refreshTimer = setInterval(refreshInBackground, REFRESH_INTERVAL_MS);

  // Allow the process to exit even if the timer is running
  if (refreshTimer.unref) {
    refreshTimer.unref();
  }
}

export function stopBackgroundRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}
