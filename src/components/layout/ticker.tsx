"use client";

import { useEffect, useRef, useState } from "react";

const HEADLINES = [
  "⚡ Critical OpenSSH RCE (CVE-2026-3841) under active exploitation — patch within 24hrs",
  "⚡ AWS S3 misconfiguration exposes 50M+ records at Fortune 500 company",
  "⚡ Google Project Zero discloses Windows kernel privilege escalation chain",
  "⚡ Supply chain attack hits npm package with 100k+ weekly downloads",
  "⚡ Cloudflare AI Gateway launches enterprise zero-trust security suite",
  "⚡ CISA adds 3 new vulnerabilities to Known Exploited Vulnerabilities catalog",
];

export function BreakingTicker() {
  const items = [...HEADLINES, ...HEADLINES]; // doubled for seamless loop

  return (
    <div className="bg-red-600 text-white text-[11px] font-semibold overflow-hidden h-7 flex items-center">
      <div className="shrink-0 bg-black text-white px-3 h-full flex items-center font-bold tracking-widest text-[10px] uppercase z-10">
        BREAKING
      </div>
      <div className="overflow-hidden flex-1 relative">
        <div className="ticker-track whitespace-nowrap">
          {items.map((headline, i) => (
            <span key={i} className="inline-block px-8">
              {headline}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
