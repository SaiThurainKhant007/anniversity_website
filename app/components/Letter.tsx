"use client";

import { useEffect, useState } from "react";
import { letter } from "../data";
import { useInView } from "./hooks";

/** A letter that types itself out once you reach it. */
export default function Letter() {
  const [ref, inView] = useInView<HTMLElement>(0.35);
  const [n, setN] = useState(0);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setOpened(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (!opened || n >= letter.length) return;
    const ch = letter[n];
    const delay = ch === "\n" ? 260 : ch === "." || ch === "," ? 140 : 26;
    const t = setTimeout(() => setN((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [opened, n]);

  return (
    <section ref={ref} className="letter section">
      <div className="section__head">
        <p className="eyebrow">part nine</p>
        <h2 className="title">
          A letter, <em>for you</em>
        </h2>
      </div>
      <div className={`envelope ${opened ? "is-open" : ""}`}>
        <div className="envelope__flap" />
        <div className="paper">
          <p className="paper__text">
            {letter.slice(0, n)}
            <span className="caret" />
          </p>
          {n < letter.length && opened && (
            <button className="paper__skip" onClick={() => setN(letter.length)}>
              show all
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
