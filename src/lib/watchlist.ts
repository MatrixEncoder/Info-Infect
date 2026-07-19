// ─── Vulnerability Watchlist ──────────────────────────────────────
// In-memory store — users can follow specific CVEs or vendors

export interface WatchlistEntry {
  id: string;
  email: string;
  type: "cve" | "vendor";
  value: string;
  createdAt: string;
}

const watchlist = new Map<string, WatchlistEntry[]>();
let nextId = 1;

export function addToWatchlist(
  email: string,
  type: "cve" | "vendor",
  value: string
): { ok: boolean; message: string } {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { ok: false, message: "Email is required." };

  const userEntries = watchlist.get(trimmed) || [];
  const duplicate = userEntries.find(
    (e) => e.type === type && e.value.toLowerCase() === value.toLowerCase()
  );
  if (duplicate) return { ok: false, message: `Already watching ${value}.` };

  const entry: WatchlistEntry = {
    id: String(nextId++),
    email: trimmed,
    type,
    value,
    createdAt: new Date().toISOString(),
  };

  userEntries.push(entry);
  watchlist.set(trimmed, userEntries);

  return { ok: true, message: `Now watching ${value}. You'll be notified of updates.` };
}

export function removeFromWatchlist(
  email: string,
  type: "cve" | "vendor",
  value: string
): { ok: boolean; message: string } {
  const trimmed = email.trim().toLowerCase();
  const userEntries = watchlist.get(trimmed) || [];
  const filtered = userEntries.filter(
    (e) => !(e.type === type && e.value.toLowerCase() === value.toLowerCase())
  );

  if (filtered.length === userEntries.length) {
    return { ok: false, message: `${value} not found in your watchlist.` };
  }

  watchlist.set(trimmed, filtered);
  return { ok: true, message: `Removed ${value} from your watchlist.` };
}

export function getWatchlist(email: string): WatchlistEntry[] {
  return watchlist.get(email.trim().toLowerCase()) || [];
}

export function getAllWatchlistEntries(): WatchlistEntry[] {
  return Array.from(watchlist.values()).flat();
}
