import { Navbar } from '@/components/Navbar';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About IMPACT 2026 | College Cultural Fest</title>
        <meta name="description" content="Learn about IMPACT 2026 - the largest college cultural fest celebrating art, music, dance, and creativity. 50+ events, 100+ colleges, ₹5L+ prize pool." />
      </Helmet>
      
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
