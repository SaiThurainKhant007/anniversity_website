import Chapters from "./components/Chapters";
import FilmStrip from "./components/FilmStrip";
import Finale from "./components/Finale";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Letter from "./components/Letter";
import Lightbox from "./components/Lightbox";
import Marquee from "./components/Marquee";
import Polaroids from "./components/Polaroids";
import Reasons from "./components/Reasons";
import Reel from "./components/Reel";
import Scratch from "./components/Scratch";
import ScrollHeart from "./components/ScrollHeart";
import Stats from "./components/Stats";
import Wishes from "./components/Wishes";

export default function Home() {
  return (
    <main className="site">
      <Intro />
      <ScrollHeart />
      <Lightbox />

      <Hero />
      <Marquee words={["every day with you", "my favourite person", "still falling", "365 days of us"]} />
      <Reel />
      <Chapters />
      <Marquee reverse offset={7} words={["press play", "our little movie", "scene by scene", "take two"]} />
      <FilmStrip />
      <Polaroids />
      <Reasons />
      <Stats />
      <Wishes />
      <Scratch />
      <Letter />
      <Finale />
      <footer className="footer">made with ♥, one memory at a time</footer>
    </main>
  );
}
