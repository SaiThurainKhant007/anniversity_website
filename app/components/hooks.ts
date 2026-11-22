"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** 0 → 1 progress of an element scrolling through the viewport.
 *  0 when its top hits the bottom of the screen; 1 when its bottom leaves the top.
 *  With `pinned`, progress spans only the time the element is "stuck" (sticky sections). */
export function useScrollProgress<T extends HTMLElement>(pinned = false): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const value = pinned
        ? -r.top / Math.max(1, r.height - vh)
        : (vh - r.top) / (r.height + vh);
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pinned]);
  return [ref, progress];
}

/** true once the element has entered the viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.2, once = true): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, inView];
}

/** Ticking clock, updated every second (client only, avoids hydration mismatch). */
export function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2025-11-22T..." → "November 22, 2025" without timezone/locale drift. */
export function prettyDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function elapsed(since: string, now: number) {
  const start = new Date(since);
  const end = new Date(now);
  let years = end.getFullYear() - start.getFullYear();
  const anniv = new Date(start);
  anniv.setFullYear(start.getFullYear() + years);
  if (anniv > end) {
    years -= 1;
    anniv.setFullYear(start.getFullYear() + years);
  }
  let ms = end.getTime() - anniv.getTime();
  const days = Math.floor(ms / 86_400_000);
  ms -= days * 86_400_000;
  const hours = Math.floor(ms / 3_600_000);
  ms -= hours * 3_600_000;
  const minutes = Math.floor(ms / 60_000);
  ms -= minutes * 60_000;
  const seconds = Math.floor(ms / 1000);
  const totalDays = Math.floor((end.getTime() - start.getTime()) / 86_400_000);
  return { years, days, hours, minutes, seconds, totalDays, totalMs: end.getTime() - start.getTime() };
}
