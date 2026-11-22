"use client";

import { useEffect, useRef, useState } from "react";
import { couple, heroPhotos } from "../data";
import { elapsed, prettyDate, useNow, useScrollProgress } from "./hooks";
import { openLightbox } from "./Lightbox";

const spots = [
  { x: 6, y: 14, r: -9, w: 15, d: 0.6 },
  { x: 78, y: 8, r: 7, w: 16, d: 1.1 },
  { x: 2, y: 58, r: 6, w: 13, d: 1.4 },
  { x: 82, y: 56, r: -6, w: 14, d: 0.8 },
  { x: 22, y: 76, r: -3, w: 11, d: 1.8 },
  { x: 66, y: 78, r: 10, w: 11, d: 1.25 },
];

export default function Hero() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const now = useNow();
  const t = now ? elapsed(couple.since, now) : null;
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) =>
      setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const lift = Math.max(0, progress - 0.5) * 2; // 0 while in place, grows as it leaves

  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero__glow" />
      <div className="stars" />
      <div className="hero__stage" ref={stageRef}>
        {heroPhotos.map((src, i) => {
          const s = spots[i];
          const tx = mouse.x * 40 * s.d;
          const ty = mouse.y * 30 * s.d - lift * 260 * s.d;
          return (
            <button
              key={src}
              className="hero__photo"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.w}vw`,
                transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${s.r + mouse.x * 6}deg)`,
                animationDelay: `${0.3 + i * 0.15}s`,
              }}
              onClick={() => openLightbox({ src })}
              aria-label="Open photo"
            >
              <img src={src} alt="" loading="eager" />
            </button>
          );
        })}
      </div>

      <div className="hero__content" style={{ transform: `translateY(${lift * -80}px)`, opacity: 1 - lift * 1.3 }}>
        <p className="eyebrow">happy anniversary</p>
        <h1 className="hero__names">
          <span className="hero__name">{couple.him}</span>
          <span className="hero__heart">♥</span>
          <span className="hero__name">{couple.her}</span>
        </h1>
        <p className="hero__since">
          together since{" "}
          {prettyDate(couple.since)}
        </p>

        <div className="clock">
          {[
            ["years", t?.years],
            ["days", t?.days],
            ["hours", t?.hours],
            ["minutes", t?.minutes],
            ["seconds", t?.seconds],
          ].map(([label, v]) => (
            <div className="clock__cell" key={label as string}>
              <span className="clock__num" key={String(v)}>
                {v === undefined ? "––" : String(v).padStart(2, "0")}
              </span>
              <span className="clock__label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#reel" className="scroll-cue">
        <span>scroll</span>
        <i />
      </a>
    </section>
  );
}
