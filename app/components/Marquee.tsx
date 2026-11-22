import { photos } from "../data";

export default function Marquee({ words, reverse = false, offset = 0 }: { words: string[]; reverse?: boolean; offset?: number }) {
  const items = words.flatMap((w, i) => [
    <span key={`w${i}`} className="marquee__word">
      {w}
    </span>,
    <img key={`p${i}`} className="marquee__img" src={photos[(i * 3 + offset) % photos.length]} alt="" loading="lazy" />,
  ]);
  return (
    <div className={`marquee ${reverse ? "marquee--rev" : ""}`} aria-hidden>
      <div className="marquee__track">
        {items}
        {items}
      </div>
    </div>
  );
}
