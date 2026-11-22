"use client";

import { useRef, useState } from "react";
import { polaroids } from "../data";
import { useInView } from "./hooks";
import { openLightbox } from "./Lightbox";

const start = [
  { x: 4, y: 10, r: -12 },
  { x: 22, y: 30, r: 8 },
  { x: 40, y: 6, r: -4 },
  { x: 58, y: 28, r: 11 },
  { x: 74, y: 8, r: -8 },
  { x: 12, y: 52, r: 5 },
  { x: 46, y: 50, r: -10 },
  { x: 70, y: 50, r: 6 },
];

/** A table of polaroids you can pick up and throw around. */
export default function Polaroids() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const [pos, setPos] = useState(start.map(() => ({ dx: 0, dy: 0 })));
  const [order, setOrder] = useState(polaroids.map((_, i) => i));
  const drag = useRef<{ i: number; x: number; y: number; moved: boolean } | null>(null);

  const down = (i: number) => (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { i, x: e.clientX - pos[i].dx, y: e.clientY - pos[i].dy, moved: false };
    setOrder((o) => [...o.filter((n) => n !== i), i]);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx - pos[d.i].dx) + Math.abs(dy - pos[d.i].dy) > 3) d.moved = true;
    setPos((p) => p.map((v, j) => (j === d.i ? { dx, dy } : v)));
  };
  const up = () => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) openLightbox({ src: polaroids[d.i].src, caption: polaroids[d.i].caption });
  };

  return (
    <section ref={ref} className={`table section ${inView ? "is-in" : ""}`}>
      <div className="section__head">
        <p className="eyebrow">part four</p>
        <h2 className="title">
          The <em>darkroom</em> table
        </h2>
        <p className="section__sub">Drag the photos around. Tap one to look closer.</p>
      </div>
      <div className="table__surface" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        {polaroids.map((p, i) => {
          const s = start[i];
          const z = order.indexOf(i) + 1;
          return (
            <div
              key={p.src}
              className="polaroid"
              onPointerDown={down(i)}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                zIndex: z,
                transform: `translate(${pos[i].dx}px, ${pos[i].dy}px) rotate(${s.r}deg)`,
                transitionDelay: inView ? `${i * 0.08}s` : "0s",
              }}
            >
              <img src={p.src} alt="" draggable={false} loading="lazy" />
              <span>{p.caption}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
