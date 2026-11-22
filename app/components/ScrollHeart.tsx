"use client";

import { useEffect, useState } from "react";

/** A heart in the corner that fills up as you scroll down the page. */
export default function ScrollHeart() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a href="#top" className="scroll-heart" aria-label="Back to top">
      <svg viewBox="0 0 32 30">
        <defs>
          <clipPath id="hc">
            <path d="M16 29S1 19.5 1 9.5A7.5 7.5 0 0 1 16 6a7.5 7.5 0 0 1 15 3.5C31 19.5 16 29 16 29z" />
          </clipPath>
        </defs>
        <g clipPath="url(#hc)">
          <rect width="32" height="30" fill="rgba(255,255,255,.08)" />
          <rect y={30 - 30 * p} width="32" height="30" fill="url(#hg)" />
        </g>
        <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8fab" />
          <stop offset="1" stopColor="#e0446a" />
        </linearGradient>
        <path d="M16 29S1 19.5 1 9.5A7.5 7.5 0 0 1 16 6a7.5 7.5 0 0 1 15 3.5C31 19.5 16 29 16 29z" fill="none" stroke="rgba(255,200,210,.6)" />
      </svg>
      <span>{Math.round(p * 100)}%</span>
    </a>
  );
}
