// ─────────────────────────────────────────────────────────────
//  EDIT ME — everything personal about the site lives here.
// ─────────────────────────────────────────────────────────────

export const couple = {
  him: "You",
  her: "Me",
  since: "2024-04-22T00:00:00",
  tagline: "A little film about the two of us",
};

const img = (name: string) => `/image/${encodeURIComponent(name)}`;

/** Every photo in /public/image, in the order they were taken. */
const raw = [
  "IMAGE 2026-11-22 09:11:21.jpg",
  "IMAGE 2026-11-22 09:11:38.jpg",
  "IMAGE 2026-11-22 09:12:13.jpg",
  "IMAGE 2026-11-22 09:12:17.jpg",
  "IMAGE 2026-11-22 09:12:19.jpg",
  "IMAGE 2026-11-22 09:12:21.jpg",
  "IMAGE 2026-11-22 09:12:23.jpg",
  "IMAGE 2026-11-22 09:12:26.jpg",
  "IMAGE 2026-11-22 09:12:28.jpg",
  "IMAGE 2026-11-22 09:12:30.jpg",
  "IMAGE 2026-11-22 09:13:02.jpg",
  "IMAGE 2026-11-22 09:13:04.jpg",
  "IMAGE 2026-11-22 09:13:10.jpg",
  "IMAGE 2026-11-22 09:13:12.jpg",
  "IMAGE 2026-11-22 09:13:14.jpg",
  "IMAGE 2026-11-22 09:13:21.jpg",
  "IMAGE 2026-11-22 09:13:24.jpg",
  "IMAGE 2026-11-22 09:13:27.jpg",
  "IMAGE 2026-11-22 09:13:31.jpg",
  "IMAGE 2026-11-22 09:14:03.jpg",
  "IMAGE 2026-11-22 09:14:17.jpg",
  "IMAGE 2026-11-22 09:14:29.jpg",
  "IMAGE 2026-11-22 09:14:32.jpg",
  "IMAGE 2026-11-22 09:14:35.jpg",
  "IMAGE 2026-11-22 09:14:40.jpg",
  "IMAGE 2026-11-22 09:14:45.jpg",
  "IMAGE 2026-11-22 09:14:47.jpg",
  "IMAGE 2026-11-22 09:14:50.jpg",
  "IMAGE 2026-11-22 09:14:54.jpg",
  "IMAGE 2026-11-22 09:14:56.jpg",
];
export const photos = raw.map(img);
const p = (n: number) => photos[n - 1];

const rawVideos = [
  "FILE 2026-11-22 09:11:16.mp4",
  "FILE 2026-11-22 09:11:25.mp4",
  "FILE 2026-11-22 09:11:28.mp4",
  "FILE 2026-11-22 09:11:31.mp4",
  "FILE 2026-11-22 09:11:35.mp4",
  "FILE 2026-11-22 09:12:46.mp4",
  "FILE 2026-11-22 09:12:48.mp4",
  "FILE 2026-11-22 09:12:51.mp4",
  "FILE 2026-11-22 09:12:55.mp4",
  "FILE 2026-11-22 09:12:57.mp4",
  "FILE 2026-11-22 09:13:07.mp4",
  "FILE 2026-11-22 09:13:34.mp4",
  "FILE 2026-11-22 09:13:39.mp4",
  "FILE 2026-11-22 09:13:42.mp4",
  "FILE 2026-11-22 09:13:45.mp4",
  "FILE 2026-11-22 09:13:49.mp4",
  "FILE 2026-11-22 09:14:14.mp4",
  "FILE 2026-11-22 09:14:20.mp4",
  "FILE 2026-11-22 09:14:38.mp4",
];
export const videos = rawVideos.map(img);

/* ── Section content (photos are picked by number, 1–30) ── */

export const heroPhotos = [p(15), p(1), p(21), p(13), p(25), p(19)];

export const reel = [
  { src: p(1), title: "Official one year anniversary", note: "Celebrating a year of memories." },
  { src: p(11), title: "Little moments", note: "The ones nobody else noticed." },
  { src: p(12), title: "Wide awake", note: "Every frame is better with you in it." },
  { src: p(14), title: "Just us", note: "No plans. Exactly the plan." },
  { src: p(16), title: "Golden hours", note: "The light always finds you." },
  { src: p(17), title: "Side by side", note: "My favourite place to stand." },
  { src: p(18), title: "Out of town", note: "Somewhere new, someone familiar." },
  { src: p(20), title: "Soft days", note: "Quiet ones count the most." },
];

export const chapters = [
  { src: p(2), label: "Chapter I", title: "Hello, stranger", text: "Before the jokes and the late-night calls, there was a first look — and I kept coming back to it." },
  { src: p(5), label: "Chapter II", title: "Roses on the keys", text: "A bouquet, a piano, and the feeling that something real had started." },
  { src: p(15), label: "Chapter III", title: "Room 1", text: "A silly hat, a mirror, and you laughing at me. Still one of my favourite photos." },
  { src: p(22), label: "Chapter IV", title: "Our usual", text: "The places that became ours just because we kept going back together." },
  { src: p(24), label: "Chapter V", title: "Over the city", text: "Watching the sun go down and thinking: I want every evening to look like this." },
  { src: p(28), label: "Chapter VI", title: "One year in", text: "Three hundred and sixty-five days, and I'd choose you on every one of them." },
];

export const polaroids = [
  { src: p(3), caption: "save this one" },
  { src: p(4), caption: "us, again" },
  { src: p(6), caption: "remember?" },
  { src: p(7), caption: "♡" },
  { src: p(8), caption: "best day" },
  { src: p(9), caption: "late night" },
  { src: p(10), caption: "my view" },
  { src: p(23), caption: "always" },
];

export const reasons = [
  { src: p(13), text: "The way you laugh before you finish the joke." },
  { src: p(19), text: "You make ordinary days feel like a trip." },
  { src: p(26), text: "You remember the tiny things I say." },
  { src: p(27), text: "You're patient with me, even when I'm not." },
  { src: p(29), text: "Your hand fits mine like it was made to." },
  { src: p(21), text: "You are my calm and my chaos at once." },
  { src: p(25), text: "Because it's you. It was always going to be you." },
];

export const wishes = [
  "More sunsets like that one.",
  "A trip somewhere neither of us has been.",
  "Cooking badly together, every Sunday.",
  "Growing old and still being silly.",
  "Never going to sleep angry.",
  "Another year. Then another. Then all of them.",
];

export const scratchPhoto = p(30);
export const finalePhoto = p(24);

export const letter = `My love,

A year ago I didn't know how much one person could change the way everything looks.
Coffee tastes better. Bad days are shorter. Songs mean things now.

Thank you for your patience, for your laugh, for every "text me when you get home."
Thank you for choosing me on the easy days and the hard ones.

This little website is just a small piece of how I feel —
the rest I'll keep showing you, one day at a time.

Happy anniversary.
Forever yours.`;
