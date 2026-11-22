"use client";

import { useState } from "react";
import { couple, finalePhoto } from "../data";
import { useScrollProgress } from "./hooks";

type Burst = { id: number; x: number; y: number };

/** Pinned closing scene: the photo opens up from a small window to full screen. */
export default function Finale() {
  const [ref, progress] = useScrollProgress<HTMLElement>(true);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const k = Math.min(1, progress / 0.6);
  const inset = (1 - k) * 28; // % clip from each side
  const radius = (1 - k) * 400;
  const textIn = Math.max(0, (progress - 0.55) / 0.3);

  const pop = (e: React.MouseEvent) => {
    const id = Date.now();
    setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setBursts((b) => b.filter((v) => v.id !== id)), 1600);
  };

  return (
    <section ref={ref} className="finale">
      <div className="finale__sticky" onClick={pop}>
        <div
          className="finale__img"
          style={{ clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)` }}
        >
          <img src={finalePhoto} alt="" style={{ transform: `scale(${1.35 - k * 0.35})` }} />
          <div className="finale__shade" style={{ opacity: textIn * 0.8 }} />
        </div>
        <div className="finale__text" style={{ opacity: textIn, transform: `translateY(${(1 - textIn) * 40}px)` }}>
          <p className="eyebrow">the end of year one</p>
          <h2>
            and the beginning
            <br />
            of <em>forever</em>
          </h2>
          <p className="finale__names">
            {couple.him} &amp; {couple.her}
          </p>
          <span className="finale__hint">tap anywhere ♥</span>
          <a className="btn-glow" href="#top" onClick={(e) => e.stopPropagation()}>
            ↺ watch again
          </a>
        </div>
        {bursts.map((b) => (
          <div key={b.id} className="burst" style={{ left: b.x, top: b.y }}>
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ "--a": `${i * 30}deg`, "--d": `${60 + (i % 3) * 30}px` } as React.CSSProperties}>
                ♥
              </i>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
