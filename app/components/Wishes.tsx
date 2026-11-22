"use client";

import { useState } from "react";
import { wishes } from "../data";
import { useScrollProgress } from "./hooks";

// Points of a heart-shaped constellation (0–100 space)
const heart = Array.from({ length: 22 }, (_, i) => {
  const t = (i / 22) * Math.PI * 2;
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: 50 + x * 2.5, y: 46 - y * 2.5 };
});
const path = heart.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z";
const wishStars = [0, 4, 8, 11, 14, 18]; // which heart points hold a wish

export default function Wishes() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const [open, setOpen] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const draw = Math.min(1, Math.max(0, (progress - 0.2) / 0.4));

  const tap = (w: number) => {
    setActive(w);
    setOpen((o) => (o.includes(w) ? o : [...o, w]));
  };

  return (
    <section ref={ref} className="wishes section">
      <div className="section__head">
        <p className="eyebrow">part seven</p>
        <h2 className="title">
          Wishes in the <em>stars</em>
        </h2>
        <p className="section__sub">
          Tap the glowing stars. {open.length}/{wishes.length} found.
        </p>
      </div>
      <div className="sky">
        <svg viewBox="0 0 100 92" className="sky__svg">
          <path d={path} pathLength={1} className="sky__line" style={{ strokeDashoffset: 1 - draw }} />
          {heart.map((p, i) => {
            const w = wishStars.indexOf(i);
            if (w === -1) return <circle key={i} cx={p.x} cy={p.y} r={0.55} className="sky__dot" style={{ opacity: draw > i / 22 ? 1 : 0.15 }} />;
            return (
              <g key={i} className={`sky__wish ${open.includes(w) ? "is-open" : ""}`} onClick={() => tap(w)}>
                <circle cx={p.x} cy={p.y} r={4} className="sky__halo" />
                <circle cx={p.x} cy={p.y} r={1.3} className="sky__star" />
              </g>
            );
          })}
        </svg>
        <div className={`sky__msg ${active !== null ? "is-on" : ""}`} key={active ?? -1}>
          {active !== null ? (
            <>
              <span>wish no.{active + 1}</span>
              <p>{wishes[active]}</p>
            </>
          ) : (
            <p className="muted">✦</p>
          )}
        </div>
      </div>
    </section>
  );
}
