import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarClock, ArrowLeft, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

export default function Schedule() {
  return (
    <>
      <Helmet>
        <title>Schedule | IMPACT 2026</title>
        <meta
          name="description"
          content="The official schedule for IMPACT 2026 is coming soon. Stay tuned for dates and event details."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20 pb-20">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 mb-8"
              >
                <CalendarClock className="w-10 h-10 text-accent" />
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-5xl md:text-7xl font-bebas tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50"
                >
                  SCHEDULE REVEALING SOON
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-lg md:text-xl text-foreground/60 font-poppins max-w-xl mx-auto leading-relaxed"
                >
                  We are currently curating an electrifying lineup of sessions
                  for{" "}
                  <span className="text-accent font-semibold">
                    IEMPACT 2026
                  </span>
                  .
                </motion.p>
              </div>

              {/* Status Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                Work in Progress
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link
                  to="/"
                  className="group px-8 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>

                <button
                  className="px-8 py-3 rounded-lg border border-border/50 hover:bg-accent/5 hover:border-accent/50 text-foreground transition-all flex items-center gap-2"
                  onClick={() => alert("Notification feature coming soon!")}
                >
                  <Bell className="w-4 h-4" />
                  Notify Me
                </button>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
