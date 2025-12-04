import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { EventCarousel } from '@/components/EventCarousel';
import { StatsCharts } from '@/components/StatsCharts';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

import pactBg from '/pact.png';

const Home = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  if (hasError) {
    return (
      <div
        style={{
          padding: '40px',
          color: 'white',
          background: '#0d0d0d',
          minHeight: '100vh',
        }}
      >
        <h1>Error loading page</h1>
        <p>Please check the console for errors.</p>
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
        className="relative min-h-screen w-full overflow-x-hidden"
        style={{ backgroundColor: '#0d0d0d', color: '#ffffff' }}
      >
        {/* --- ONLY BACKGROUND IMAGE --- */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${pactBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.45)', // adjust as needed
          }}
        />

        {/* --- CONTENT LAYER --- */}
        <div
          className="relative"
          style={{ zIndex: 10, minHeight: '100vh' }}
        >
          <Navbar />

          <main className="relative">
            <HeroSection />
            <EventCarousel />
            <StatsCharts />
            <AboutSection />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
