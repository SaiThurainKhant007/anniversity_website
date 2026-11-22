"use client";

import { useEffect, useState } from "react";
import { couple, photos, videos } from "../data";
import { elapsed, useInView, useNow } from "./hooks";

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 2000);
      setV(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{v.toLocaleString("en-US")}</>;
}

export default function Stats() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const now = useNow();
  const t = now ? elapsed(couple.since, now) : null;
  const days = t?.totalDays ?? 0;
  const items = [
    { n: days, label: "days together" },
    { n: days * 24, label: "hours of us" },
    { n: Math.round(days * 24 * 60 * 72), label: "heartbeats (give or take)" },
    { n: photos.length + videos.length, label: "memories on this page" },
  ];
  return (
    <section ref={ref} className="stats section">
      <p className="eyebrow">part six</p>
      <h2 className="title">
        Our year, <em>in numbers</em>
      </h2>
      <div className="stats__grid">
        {items.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat__n">
              <CountUp to={s.n} run={inView && !!t} />
            </span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
