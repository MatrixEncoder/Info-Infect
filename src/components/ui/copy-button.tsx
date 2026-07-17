"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-all",
        "border border-border-subtle bg-white text-muted hover:bg-surface-hover hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-gold" />
          <span className="text-gold">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
