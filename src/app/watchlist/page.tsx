"use client";

import { useState } from "react";
import { Eye, Bell, Trash2, Plus } from "lucide-react";

interface WatchItem {
  type: "cve" | "vendor";
  value: string;
}

export default function WatchlistPage() {
  const [inputType, setInputType] = useState<"cve" | "vendor">("cve");
  const [inputValue, setInputValue] = useState("");
  const [watchlistItems, setWatchlistItems] = useState<WatchItem[]>([]);
  const [toastMsg, setToastMsg] = useState("");

  async function handleAdd() {
    if (!inputValue.trim()) return;
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          type: inputType,
          value: inputValue.trim(),
        }),
      });
      const data = await res.json();
      setToastMsg(data.message);
      if (data.ok) {
        setWatchlistItems((prev) => [
          ...prev,
          { type: inputType, value: inputValue.trim() },
        ]);
        setInputValue("");
      }
      setTimeout(() => setToastMsg(""), 3000);
    } catch {
      setToastMsg("Something went wrong.");
      setTimeout(() => setToastMsg(""), 3000);
    }
  }

  async function handleRemove(type: string, value: string) {
    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", type, value }),
      });
      setWatchlistItems((prev) =>
        prev.filter((item) => !(item.type === type && item.value === value))
      );
    } catch {}
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center">
            <Eye className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1
              className="text-3xl sm:text-4xl font-black text-gray-900"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Vulnerability Watchlist
            </h1>
            <p className="text-[13px] text-gray-500">
              Track CVEs and vendors. Get notified when new vulnerabilities drop.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Main */}
        <div>
          {/* Add form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="section-header">Add to Watchlist</h2>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setInputType("cve")}
                className={`px-4 py-2 text-[12px] font-bold rounded-sm transition-colors ${
                  inputType === "cve"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                CVE ID
              </button>
              <button
                onClick={() => setInputType("vendor")}
                className={`px-4 py-2 text-[12px] font-bold rounded-sm transition-colors ${
                  inputType === "vendor"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Vendor / Product
              </button>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder={
                  inputType === "cve"
                    ? "e.g. CVE-2026-3841"
                    : "e.g. Palo Alto Networks"
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-[12px] font-bold rounded-lg transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Watch
              </button>
            </div>
          </div>

          {/* Watchlist items */}
          {watchlistItems.length > 0 && (
            <div>
              <h2 className="section-header">Your Watchlist</h2>
              <div className="space-y-2">
                {watchlistItems.map((item, i) => (
                  <div
                    key={`${item.type}-${item.value}-${i}`}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          item.type === "cve"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="text-[13px] font-mono font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(item.type, item.value)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {watchlistItems.length === 0 && (
            <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-lg">
              <Eye className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-[14px] text-gray-500 mb-1">
                No items in your watchlist yet
              </p>
              <p className="text-[12px] text-gray-400">
                Add CVE IDs or vendor names above to start tracking
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h3
              className="font-heading font-black text-[1rem] uppercase tracking-[0.05em] text-amber-700 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How It Works
            </h3>
            <ul className="text-[13px] text-gray-700 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">1.</span>
                Add CVE IDs or vendor names
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">2.</span>
                We scan 25+ feeds for mentions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">3.</span>
                New matches surface in your feed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">4.</span>
                Email alerts coming soon
              </li>
            </ul>
          </div>

          {/* Popular watches */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="section-header">Trending Watches</h3>
            <div className="space-y-2">
              {[
                "CVE-2026-3841",
                "CVE-2024-3400",
                "CVE-2024-21762",
                "Palo Alto Networks",
                "OpenSSH",
                "Fortinet",
                "Ivanti",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const isCve = item.startsWith("CVE-");
                    setInputType(isCve ? "cve" : "vendor");
                    setInputValue(item);
                  }}
                  className="block w-full text-left text-[12px] text-gray-600 hover:text-amber-600 transition-colors py-1"
                >
                  {item.startsWith("CVE-") ? (
                    <span className="font-mono">{item}</span>
                  ) : (
                    <span>{item}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium z-[9999] shadow-lg">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
