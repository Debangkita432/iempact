import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Navbar } from "@/components/Navbar";
import { EventsSection } from "@/components/EventsSection";
import { EventCarousel } from "@/components/EventCarousel";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Ticket, Sparkles, Music, Drama } from "lucide-react";

const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden py-4 bg-accent/10 border-y border-accent/20 backdrop-blur-sm -rotate-1 my-10 z-20">
      <div className="animate-marquee whitespace-nowrap flex gap-8">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-xl font-bebas tracking-widest text-accent/80"
          >
            <span className="text-foreground/40">✦</span> CARNIVAL OF TALENT{" "}
            <span className="text-foreground/40">✦</span> UNLEASH THE MAGIC
          </span>
        ))}
      </div>
    </div>
  );
};

const Events = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Events | IMPACT 2026 - The Grand Carnival</title>
        <meta
          name="description"
          content="Step into the Carnival! Explore 50+ spectacular events at IMPACT 2026."
        />
      </Helmet>

      <div
        ref={containerRef}
        className="relative min-h-screen bg-background text-foreground overflow-x-hidden"
      >
        <div className="fixed inset-0 z-0">
          <ThreeBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
        </div>

        <Navbar />

        <main className="relative z-10 pt-24 md:pt-32">
          {/* --- HERO --- */}
          <div className="container mx-auto px-4 mb-16 text-center relative">
            <motion.div
              style={{ y, opacity }}
              className="space-y-4 relative z-10"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md text-accent text-sm font-medium mb-4"
              >
                <Ticket className="w-4 h-4 rotate-[-10deg]" />
                <span>Admit One: The Grand Spectacle</span>
              </motion.div>

              <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
                  THE GRAND
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-400 to-yellow-400 drop-shadow-[0_0_15px_rgba(255,100,100,0.3)]">
                  CARNIVAL
                </span>
              </h1>
            </motion.div>
          </div>

          {/* --- CAROUSEL SECTION --- */}
          <section className="mb-20">
            {/* PARENT TITLE for Carousel */}
            <div className="container mx-auto px-4 mb-8 flex items-center justify-center gap-2 opacity-80">
              <Sparkles className="text-yellow-400 w-5 h-5" />
              <span className="font-bebas text-2xl tracking-wide">
                Featured Attractions
              </span>
              <Sparkles className="text-yellow-400 w-5 h-5" />
            </div>

            {/* The component (make sure you removed the title inside this file!) */}
            <EventCarousel />
          </section>

          <Marquee />

          {/* --- MAIN LIST SECTION --- */}
          <section className="container mx-auto px-4 pb-20 pt-10">
            {/* PARENT TITLE for List */}
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="font-bebas text-5xl md:text-6xl text-foreground mb-4">
                CHOOSE YOUR <span className="text-accent">STAGE</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mb-6" />
            </div>

            {/* The component (make sure you removed the title inside this file!) */}
            <EventsSection />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Events;
