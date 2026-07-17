"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

export function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe() {
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "subscribe", email }),
      });
      const data = await res.json();
      setStatus(data.ok ? "success" : "error");
      setMessage(data.message);
      if (data.ok) setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div id="newsletter" className="border border-gray-200 rounded-sm p-5 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="h-4 w-4 text-amber-600" />
        <h4 className="text-[14px] font-extrabold text-gray-900"
          style={{ fontFamily: "var(--font-heading)" }}>
          The Intel Brief
        </h4>
      </div>
      <p className="text-[12.5px] text-gray-500 mb-4 leading-relaxed">
        Daily cybersecurity intelligence, CVE alerts, and threat analysis — delivered to your inbox every morning.
      </p>

      {status === "success" ? (
        <div className="text-center py-3">
          <p className="text-sm font-semibold text-green-700">{message}</p>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            className="h-10 w-full rounded-sm border border-gray-200 bg-white px-3 text-sm mb-2.5 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            onClick={handleSubscribe}
            disabled={status === "loading"}
            className="w-full h-10 rounded-sm bg-amber-600 hover:bg-amber-500 text-white text-[12px] font-bold tracking-wider transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE FREE"}
          </button>
          {status === "error" && (
            <p className="text-[11px] text-red-500 mt-2 text-center">{message}</p>
          )}
        </>
      )}

      <p className="text-[10.5px] text-gray-400 mt-2 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
