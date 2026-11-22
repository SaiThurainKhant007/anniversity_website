"use client";

import { useEffect, useState } from "react";

type Item = { src: string; video?: boolean; caption?: string };

export function openLightbox(item: Item) {
  window.dispatchEvent(new CustomEvent<Item>("lightbox", { detail: item }));
}

export default function Lightbox() {
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => setItem((e as CustomEvent<Item>).detail);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setItem(null);
    window.addEventListener("lightbox", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("lightbox", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!item) return null;
  return (
    <div className="lightbox" onClick={() => setItem(null)} role="dialog" aria-modal="true">
      <figure className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
        {item.video ? (
          <video src={item.src} controls autoPlay playsInline />
        ) : (
          <img src={item.src} alt={item.caption ?? ""} />
        )}
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>
      <button className="lightbox__close" onClick={() => setItem(null)} aria-label="Close">
        ✕
      </button>
    </div>
  );
}
