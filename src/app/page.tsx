import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="bg-noise" />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
