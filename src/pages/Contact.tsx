import { Navbar } from '@/components/Navbar';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | IMPACT 2026 College Cultural Fest</title>
        <meta name="description" content="Get in touch with the IMPACT 2026 team. Questions about events, sponsorship, or participation? Reach out to us!" />
      </Helmet>
      
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
