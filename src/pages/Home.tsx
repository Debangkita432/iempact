import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EventCarousel } from "@/components/EventCarousel";
import { StatsCharts } from "@/components/StatsCharts";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

import pactBg from "/pact.png";

const Home = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white px-6">
        <h1 className="text-3xl font-bold mb-3">Error loading page</h1>
        <p className="text-lg opacity-70">
          Please check the console for errors.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          IMPACT 2026 - College Cultural Fest | Where Tradition Meets Innovation
        </title>
        <meta
          name="description"
          content="Experience IMPACT 2026, the largest college cultural fest featuring live performances, competitions, workshops, and more. March 15-17, 2026."
        />
      </Helmet>

      <div
        className="relative w-full overflow-x-hidden"
        style={{ backgroundColor: "#0d0d0d", color: "#ffffff" }}
      >
        {/* --- LAYER 1: BACKGROUND IMAGE --- */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${pactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.35)",
          }}
        />

        {/* --- LAYER 2: RADIAL + GRADIENT OVERLAY FOR DEPTH --- */}
        <div
          className="pointer-events-none"
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.09), transparent 70%)",
            zIndex: 1,
          }}
        />
        <div
          className="pointer-events-none"
          style={{
            position: "fixed",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.9))",
            zIndex: 2,
          }}
        />

        {/* --- LAYER 3: CONTENT --- */}
        <div className="relative z-20 min-h-screen backdrop-blur-[1px]">
          <Navbar />

          <main className="relative space-y-24">
            <section className="animate-fadeInSlow">
              <HeroSection />
            </section>

            <section className="animate-slideUpDelay">
              <EventCarousel />
            </section>

            <section className="animate-slideUpDelay">
              <StatsCharts />
            </section>

            <section className="animate-slideUpDelay">
              <AboutSection />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
