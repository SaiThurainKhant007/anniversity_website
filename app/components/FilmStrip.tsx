"use client";

import { useEffect, useRef } from "react";
import { videos } from "../data";
import { openLightbox } from "./Lightbox";

function Clip({ src, i }: { src: string; i: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <button className="clip" onClick={() => openLightbox({ src, video: true })} aria-label={`Play clip ${i + 1}`}>
      <video ref={ref} src={`${src}#t=0.1`} muted loop playsInline preload="metadata" />
      <span className="clip__no">{String(i + 1).padStart(2, "0")}</span>
      <span className="clip__play">▶</span>
    </button>
  );
}

/** Videos on two film strips that drift in opposite directions. */
export default function FilmStrip() {
  const half = Math.ceil(videos.length / 2);
  const rows = [videos.slice(0, half), videos.slice(half)];
  return (
    <section className="film section">
      <div className="section__head">
        <p className="eyebrow">part three</p>
        <h2 className="title">
          Moving <em>pictures</em>
        </h2>
        <p className="section__sub">Tap any frame to watch it with sound.</p>
      </div>
      {rows.map((row, r) => (
        <div key={r} className={`film__strip ${r ? "film__strip--rev" : ""}`}>
          <div className="film__track">
            {[...row, ...row].map((src, i) => (
              <Clip key={`${src}-${i}`} src={src} i={(r ? half : 0) + (i % row.length)} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
