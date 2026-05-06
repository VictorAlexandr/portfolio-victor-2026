import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Experience } from "@/components/experience";
import { Console } from "@/components/console";
import { Work } from "@/components/work";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="grain" aria-hidden />
      <Navbar />
      <Hero />
      <Marquee />
      <Experience />
      <Console />
      <Work />
      <Education />
      <Footer />
    </main>
  );
}
