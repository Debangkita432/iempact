import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import impactLogo from "@/assets/impact-logo.jpg";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* Yellow gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/20 via-yellow-400/30 to-background z-10" />

      <div
        className="container mx-auto px-4 relative z-20"
        style={{ position: "relative", zIndex: 20, color: "#ffffff" }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6 md:mb-8"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-400 shadow-[0_0_50px_#FFD700]">
              <img
                src={impactLogo}
                alt="IMPACT 2026 Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Yellow Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/40 animate-spin-slow" />
            <div
              className="absolute -inset-4 rounded-full border border-yellow-300/30 animate-spin-slow"
              style={{ animationDirection: "reverse" }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-bebas text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-none mb-4"
          >
            <span className="text-yellow-400 drop-shadow-[0_0_10px_#FFD700]">
              IMPACT
            </span>
            <span className="text-yellow-300"> 2026</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-poppins text-base sm:text-lg md:text-xl text-yellow-200/90 max-w-2xl mb-6 md:mb-8 px-4"
          >
            Where Tradition Meets Innovation. Experience the largest cultural
            extravaganza that celebrates art, music, dance, and creativity.
          </motion.p>

          {/* Event Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-10"
          >
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/40">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium text-yellow-200">
                March 15-17, 2026
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-500/40">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium text-yellow-200">
                Main Campus Ground
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-yellow-300/20 border border-yellow-300/40">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium text-yellow-200">
                10,000+ Attendees
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4"
          >
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                variant="hero"
                size="xl"
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black"
              >
                Register Now
              </Button>
            </Link>

            <Link to="/events" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black"
              >
                Explore Events
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-yellow-400 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-yellow-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
