"use client";

import { useEffect, useRef, useState } from "react";
import { scratchPhoto } from "../data";

/** Scratch-off card hiding a photo and a little message. */
export default function Scratch() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);
  const checks = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const paint = () => {
      const r = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      const ctx = c.getContext("2d")!;
      ctx.scale(dpr, dpr);
      const g = ctx.createLinearGradient(0, 0, r.width, r.height);
      g.addColorStop(0, "#c9a35a");
      g.addColorStop(0.5, "#f3dca2");
      g.addColorStop(1, "#b0853c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, r.width, r.height);
      ctx.fillStyle = "rgba(80,50,10,.18)";
      for (let i = 0; i < 400; i++) ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1.5, 1.5);
      ctx.fillStyle = "#5a3d12";
      ctx.textAlign = "center";
      ctx.font = "600 13px system-ui, sans-serif";
      ctx.fillText("S C R A T C H   M E", r.width / 2, r.height / 2 - 6);
      ctx.font = "28px serif";
      ctx.fillText("♥", r.width / 2, r.height / 2 + 32);
    };
    paint();
  }, []);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || done) return;
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext("2d")!;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const from = last.current ?? { x, y };
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineWidth = 52;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x + 0.01, y);
    ctx.stroke();
    last.current = { x, y };
    if (++checks.current % 12 === 0) {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
      if (clear / (data.length / 64) > 0.5) setDone(true);
    }
  };

  return (
    <section className="scratch section">
      <div className="section__head">
        <p className="eyebrow">part eight</p>
        <h2 className="title">
          A little <em>surprise</em>
        </h2>
        <p className="section__sub">Use your finger or mouse to scratch the gold away.</p>
      </div>
      <div className={`ticket ${done ? "is-done" : ""}`}>
        <div className="ticket__under">
          <img src={scratchPhoto} alt="" loading="lazy" />
          <div className="ticket__msg">
            <span>you won</span>
            <strong>me. forever.</strong>
            <em>no refunds, no returns ♥</em>
          </div>
        </div>
        <canvas
          ref={canvas}
          className="ticket__foil"
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
          }}
        />
      </div>
    </section>
  );
}
