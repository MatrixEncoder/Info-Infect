"use client";

import { useEffect } from "react";

export function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div id="reading-progress" style={{ width: "0%" }} />;
}
