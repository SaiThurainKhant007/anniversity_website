"use client";

import { useState } from "react";
import { reasons } from "../data";

/** A deck of cards — tap the top one to fling it away and reveal the next reason. */
export default function Reasons() {
  const [top, setTop] = useState(0);
  const [flying, setFlying] = useState<number | null>(null);

  const next = () => {
    if (flying !== null) return;
    setFlying(top);
    setTimeout(() => {
      setTop((t) => (t + 1) % reasons.length);
      setFlying(null);
    }, 550);
  };

  return (
    <section className="reasons section">
      <div className="reasons__grid">
        <div className="reasons__copy">
          <p className="eyebrow">part five</p>
          <h2 className="title">
            Reasons I <em>love</em> you
          </h2>
          <p className="section__sub">
            Reason {top + 1} of {reasons.length} — and counting. Tap the card.
          </p>
          <div className="reasons__dots">
            {reasons.map((_, i) => (
              <i key={i} className={i === top ? "on" : ""} />
            ))}
          </div>
        </div>
        <div className="deck" onClick={next} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && next()}>
          {reasons.map((r, i) => {
            const depth = (i - top + reasons.length) % reasons.length;
            if (depth > 3) return null;
            const isFlying = flying === i;
            return (
              <div
                key={r.src}
                className={`card ${isFlying ? "card--fly" : ""}`}
                style={{
                  zIndex: 10 - depth,
                  transform: isFlying
                    ? undefined
                    : `translateY(${depth * 18}px) scale(${1 - depth * 0.05}) rotate(${depth * (depth % 2 ? 3 : -3)}deg)`,
                  opacity: depth === 3 ? 0 : 1,
                }}
              >
                <img src={r.src} alt="" loading="lazy" />
                <div className="card__shade" />
                <p className="card__no">#{String(i + 1).padStart(2, "0")}</p>
                <p className="card__text">{r.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
