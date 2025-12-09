"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-120px",
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.9,          // ⏩ faster
        staggerChildren: 0.2,   // ⏩ faster
        ease: "easeOut",
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 28,                   // ⏩ less travel
      filter: "blur(6px)",     // ⏩ less blur
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,         // ⏩ much faster
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="pt-16 pb-28">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* ================= VIDEO HOLDER ================= */}
          <motion.div
            variants={item}
            className="
              relative max-w-md mx-auto
              rounded-2xl
              border border-white/30
              bg-black/80
              shadow-[0_20px_60px_rgba(0,0,0,0.7)]
              overflow-hidden
            "
          >
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-white tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC
            </div>

            <div className="aspect-[3/4] flex flex-col items-center justify-center text-center px-8">
              <p className="font-bebas text-4xl tracking-widest text-white mb-2">
                FLASHBACK
              </p>
              <p className="font-bebas text-3xl text-white mb-7">
                2025
              </p>

              <div className="w-16 h-16 rounded-full border border-white/90 flex items-center justify-center hover:scale-105 transition duration-300">
                <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[8px] border-y-transparent ml-1" />
              </div>
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}
          <div className="text-white">
            <motion.h2
              variants={item}
              className="
                font-samarkan
                text-5xl sm:text-6xl md:text-7xl
                mb-10
                tracking-wide
              "
            >
              About IEMPACT
            </motion.h2>

            <div
              className="
                space-y-5
                text-[1.05rem] sm:text-[1.1rem] md:text-[1.15rem]
                leading-[1.6]
                font-semibold
                text-white/95
                font-['Georgia']
              "
            >
              <motion.p variants={item}>
                IEMPACT, the flagship cultural festival of IEM Kolkata,
                marks its grand 35th edition with a vibrant legacy of
                talent, creativity, and unforgettable energy.
              </motion.p>

              <motion.p variants={item}>
                Attracting over{" "}
                <span className="text-yellow-300 font-semibold">
                  15,000+
                </span>{" "}
                attendees, the festival presents thrilling competitions,
                spectacular performances, and a dynamic platform for
                young voices to shine.
              </motion.p>

              <motion.p variants={item}>
                With strong media presence and prestigious brand collaborations,
                IEMPACT continues to stand tall as one of Eastern India’s
                most anticipated cultural celebrations.
              </motion.p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
