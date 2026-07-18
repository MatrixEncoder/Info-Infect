"use client";

import { useEffect, useState, useCallback } from "react";
import { Eye, Share2, Check, Link as LinkIcon } from "lucide-react";

interface Props {
  slug: string;
  title: string;
}

export function ShareViewBar({ slug, title }: Props) {
  const [views, setViews] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.views))
      .catch(() => setViews(0));
  }, [slug]);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [title]);

  return (
    <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
      {/* Share */}
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-[12px] font-semibold rounded-sm transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Link Copied
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            Share
          </>
        )}
      </button>

      {/* Views */}
      <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500">
        <Eye className="h-4 w-4" />
        {views !== null ? views.toLocaleString() : "---"} views
      </span>
    </div>
  );
}
