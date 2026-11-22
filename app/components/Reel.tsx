"use client";

import { useEffect, useRef, useState } from "react";
import { reel } from "../data";
import { useScrollProgress } from "./hooks";
import { openLightbox } from "./Lightbox";

/** Pinned section: vertical scroll drives a horizontal ride through photos. */
export default function Reel() {
  const [ref, progress] = useScrollProgress<HTMLElement>(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setDistance(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={ref} className="reel" id="reel" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="reel__sticky">
        <div className="reel__head">
          <p className="eyebrow">part one</p>
          <h2 className="title">
            Our <em>highlight</em> reel
          </h2>
        </div>
        <div className="reel__track" ref={trackRef} style={{ transform: `translate3d(${-progress * distance}px,0,0)` }}>
          {reel.map((r, i) => {
            const local = progress * (reel.length + 1) - i;
            const tilt = Math.max(-1, Math.min(1, local - 1)) * -6;
            return (
              <figure
                key={r.src}
                className="reel__card"
                style={{ transform: `rotate(${tilt}deg) translateY(${i % 2 ? 40 : -10}px)` }}
                onClick={() => openLightbox({ src: r.src, caption: r.title })}
              >
                <span className="reel__index">{String(i + 1).padStart(2, "0")}</span>
                <div className="reel__img">
                  <img src={r.src} alt={r.title} loading="lazy" style={{ transform: `translateX(${(local - 1) * -6}%) scale(1.15)` }} />
                </div>
                <figcaption>
                  <strong>{r.title}</strong>
                  <span>{r.note}</span>
                </figcaption>
              </figure>
            );
          })}
          <div className="reel__end">
            <p>and a thousand more</p>
            <span>→ keep scrolling</span>
          </div>
        </div>
        <div className="reel__bar">
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
