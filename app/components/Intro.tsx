"use client";

import { useEffect, useState } from "react";
import { couple } from "../data";

/** Old-film "leader" countdown that opens the site. */
export default function Intro() {
  const [count, setCount] = useState(3);
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(id);
          setReady(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const start = () => {
    setGone(true);
    document.documentElement.style.overflow = "";
    window.scrollTo({ top: 0 });
    setTimeout(() => setHidden(true), 1400);
  };

  if (hidden) return null;

  return (
    <div className={`intro ${gone ? "intro--gone" : ""}`} aria-hidden={gone}>
      <div className="intro__grain" />
      <div className="intro__lines" />
      {!ready ? (
        <div className="leader">
          <div className="leader__sweep" key={count} />
          <div className="leader__ring" />
          <div className="leader__cross" />
          <span className="leader__num">{count}</span>
        </div>
      ) : (
        <div className="intro__title">
          <p className="eyebrow">now showing</p>
          <h1 className="intro__names">
            {couple.him} <span className="amp">&amp;</span> {couple.her}
          </h1>
          <p className="intro__sub">{couple.tagline}</p>
          <button className="btn-glow" onClick={start}>
            <span>▶</span> Play our story
          </button>
        </div>
      )}
      <button className="intro__skip" onClick={start}>
        skip
      </button>
    </div>
  );
}
