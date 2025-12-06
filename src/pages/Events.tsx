"use client";

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import pactBg from "/pact.png";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type EventType = {
  title: string;
  desc: string;
  rules: string;
};

const Events = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggleCard = (key: string) => {
    setActiveCard(activeCard === key ? null : key);
  };

  return (
    <>
      <Helmet>
        <title>Events | IEMPACT 2026</title>
        <meta
          name="description"
          content="Explore all events of IEMPACT 2026 – music, dance, drama, esports, photography and more."
        />
      </Helmet>

      <div className="relative min-h-screen overflow-x-hidden text-yellow-200">
        {/* BACKGROUND */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url(${pactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        />

        <Navbar />

        <main className="container mx-auto px-4 pt-28 pb-24">
          <h1 className="font-samarkan text-5xl md:text-7xl text-center mb-24 text-yellow-300">
            ALL EVENTS
          </h1>

          {/* ================= MUSIC ================= */}
          <EventSection
            title="Music"
            activeCard={activeCard}
            toggleCard={toggleCard}
            events={[
              {
                title: "Westwood",
                desc: "Western Solo Singing",
                rules:
                  "Solo vocal competition. One accompanist allowed with guitar or light percussion. Karaoke tracks permitted if submitted earlier. Time limit: 3–4 minutes. No explicit lyrics.",
              },
              {
                title: "Raagify",
                desc: "Eastern Music",
                rules:
                  "Solo eastern vocal event. Classical, semi-classical, devotional, folk and Rabindra Sangeet allowed. Bollywood and western songs not allowed. Time limit: 3–4 minutes.",
              },
              {
                title: "Illusion Jam",
                desc: "Battle of Bands",
                rules:
                  "Bands of 4–7 members. Only live instruments allowed. No backing tracks. Time limit: 10–12 minutes including setup. Vulgar content not allowed.",
              },
              {
                title: "Instrumental Echoes",
                desc: "Battle of Instruments",
                rules:
                  "Solo instrumental event (Indian or Western). Backing track without layering allowed. Time limit: 4 minutes.",
              },
              {
                title: "Voxbox",
                desc: "Beatbox Battle",
                rules:
                  "Knockout battle format. Only vocal sounds allowed. No electronic assistance. Time limits announced during rounds.",
              },
            ]}
          />

          {/* ================= DANCE ================= */}
          <EventSection
            title="Dance"
            activeCard={activeCard}
            toggleCard={toggleCard}
            events={[
              {
                title: "Eastern Euphoria",
                desc: "Eastern Dance",
                rules:
                  "Solo, duo and group performances allowed. Group size: 6–10. Only eastern forms allowed. Time limit: 4–6 minutes.",
              },
              {
                title: "Step Up",
                desc: "Western Dance",
                rules:
                  "Solo, duo or group western styles. Props allowed with prior notice. Dangerous stunts prohibited.",
              },
              {
                title: "Street Dance Battle",
                desc: "Freestyle Battle",
                rules:
                  "One-on-one knockout freestyle battles. Music provided by organisers. Judged on originality and musicality.",
              },
            ]}
          />

          {/* ================= DRAMA ================= */}
          <EventSection
            title="Drama & Theatre"
            activeCard={activeCard}
            toggleCard={toggleCard}
            events={[
              {
                title: "Shrutirawngo",
                desc: "Audio Drama",
                rules:
                  "Voice-only drama event. Max team size: 8. No physical acting allowed. Time limit: 8–10 minutes.",
              },
              {
                title: "Halla Bol",
                desc: "Street Play",
                rules:
                  "Open-air performance. Max team size: 20. Live music allowed. Time limit: 10–12 minutes.",
              },
              {
                title: "Stand-Up Comedy",
                desc: "Solo Comedy Act",
                rules:
                  "Solo performance. Content must be original and non-vulgar. Time limit: 4 minutes.",
              },
            ]}
          />

          {/* ================= PHOTOGRAPHY ================= */}
          <EventSection
            title="Photography & Reels"
            activeCard={activeCard}
            toggleCard={toggleCard}
            events={[
              {
                title: "Vision Alchemy",
                desc: "Photography",
                rules:
                  "Photos must be taken within fest premises. DSLR & mobiles allowed. No watermarks.",
              },
              {
                title: "Reel-O-Mania",
                desc: "Reel Making",
                rules:
                  "Vertical reels (30–60 sec). Content must be fest-related. Max 2 submissions.",
              },
            ]}
          />

          {/* ================= GAMES ================= */}
          <EventSection
            title="Games & Skill Sports"
            activeCard={activeCard}
            toggleCard={toggleCard}
            events={[
              {
                title: "Quizzard",
                desc: "Quiz Competition",
                rules:
                  "Teams of 1–2 participants. Multiple rounds. No mobile phones allowed.",
              },
              {
                title: "Mind Over Moves",
                desc: "Chess",
                rules:
                  "Knockout format. Standard chess rules apply.",
              },
              {
                title: "IEM Panja Arena",
                desc: "Arm Wrestling",
                rules:
                  "Matches by weight category. Safety rules mandatory.",
              },
              {
                title: "Table Tennis",
                desc: "Singles & Doubles",
                rules:
                  "Knockout format. Standard rules apply.",
              },
              {
                title: "8-Ball Pool",
                desc: "Cue Sports",
                rules:
                  "Online 1v1 format. Stable internet required.",
              },
            ]}
          />

          {/* ================= ESPORTS ================= */}
          <EventSection
            title="E-Sports"
            activeCard={activeCard}
            toggleCard={toggleCard}
            events={[
              {
                title: "BGMI",
                desc: "Battle Royale",
                rules:
                  "Squad-based. No emulator allowed. POV recording may be required.",
              },
              {
                title: "Free Fire",
                desc: "Squad Battles",
                rules:
                  "Teams of four. Character skills disabled.",
              },
              {
                title: "E-Football",
                desc: "Virtual Football",
                rules:
                  "Online qualifiers and offline finals.",
              },
            ]}
          />
        </main>

        <Footer />

        {/* FLIP STYLES */}
        <style>{`
          .flip-card {
            perspective: 1400px;
            height: 420px;
          }
          .flip-inner {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.9s ease;
            position: relative;
          }
          .flip-hover:hover .flip-inner {
            transform: rotateY(180deg);
          }
          .flip-active {
            transform: rotateY(180deg);
          }
          .flip-front,
          .flip-back {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            border-radius: 1.25rem;
            display: flex;
            flex-direction: column;
          }
          .flip-back {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </>
  );
};

export default Events;

/* ================= SECTION ================= */

const EventSection = ({
  title,
  events,
  activeCard,
  toggleCard,
}: {
  title: string;
  events: EventType[];
  activeCard: string | null;
  toggleCard: (key: string) => void;
}) => (
  <section className="mb-32">
    <h2 className="font-samarkan text-5xl md:text-6xl text-center mb-16 text-yellow-300">
      {title}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {events.map((e) => {
        const isActive = activeCard === e.title;

        return (
          <div
            key={e.title}
            className="flip-card flip-hover cursor-pointer"
            onClick={() => toggleCard(e.title)}
          >
            <div className={`flip-inner ${isActive ? "flip-active" : ""}`}>
              {/* FRONT */}
              <div className="flip-front border border-yellow-300/40 bg-yellow-100/10 backdrop-blur-md">
                <div className="aspect-square bg-yellow-300/5 flex items-center justify-center text-yellow-400/60">
                  Image 1:1
                </div>
                <div className="flex-1 p-6 text-center flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-200">
                    {e.title}
                  </h3>
                  <p className="text-sm text-yellow-300/80">{e.desc}</p>
                </div>
              </div>

              {/* BACK */}
              <div className="flip-back border border-yellow-300/40 bg-gradient-to-br from-yellow-100 to-amber-200 p-6 flex items-center justify-center text-center text-sm text-[#7c2d12] font-medium leading-relaxed">
                {e.rules}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);
