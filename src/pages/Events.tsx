import { ThreeBackground } from '@/components/ThreeBackground';
import { Navbar } from '@/components/Navbar';
import { EventsSection } from '@/components/EventsSection';
import { EventCarousel } from '@/components/EventCarousel';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Events = () => {
  return (
    <>
      <Helmet>
        <title>Events | IMPACT 2026 College Cultural Fest</title>
        <meta name="description" content="Explore 50+ exciting events at IMPACT 2026 - Battle of Bands, Classical Dance, Hackathon, Art Exhibition, and more. Register now!" />
      </Helmet>
      
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <ThreeBackground />
        <Navbar />
        <main className="pt-20 relative z-10">
          <EventCarousel />
          <EventsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Events;
