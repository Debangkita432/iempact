import { Navbar } from '@/components/Navbar';
import { ScheduleSection } from '@/components/ScheduleSection';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Schedule = () => {
  return (
    <>
      <Helmet>
        <title>Schedule | IMPACT 2026 College Cultural Fest</title>
        <meta name="description" content="View the complete 3-day schedule for IMPACT 2026. Plan your festival experience with our detailed event timeline." />
      </Helmet>
      
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20">
          <ScheduleSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Schedule;
