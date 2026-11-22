"use client";

import { chapters } from "../data";
import { useInView, useScrollProgress } from "./hooks";
import { openLightbox } from "./Lightbox";

function Chapter({ c, i }: { c: (typeof chapters)[number]; i: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`chapter ${i % 2 ? "chapter--right" : ""} ${inView ? "is-in" : ""}`}>
      <button className="chapter__img" onClick={() => openLightbox({ src: c.src, caption: c.title })}>
        <img src={c.src} alt={c.title} loading="lazy" />
      </button>
      <div className="chapter__dot" />
      <div className="chapter__text">
        <span className="chapter__label">{c.label}</span>
        <h3>{c.title}</h3>
        <p>{c.text}</p>
      </div>
    </div>
  );
}

export default function Chapters() {
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const draw = Math.min(1, Math.max(0, (progress - 0.15) / 0.7));
  return (
    <section ref={ref} className="chapters section">
      <div className="section__head">
        <p className="eyebrow">part two</p>
        <h2 className="title">
          The <em>chapters</em> of us
        </h2>
      </div>
      <div className="chapters__list">
        <div className="chapters__line">
          <i style={{ transform: `scaleY(${draw})` }} />
        </div>
        {chapters.map((c, i) => (
          <Chapter key={c.title} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}
