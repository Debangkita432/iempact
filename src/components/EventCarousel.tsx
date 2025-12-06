import { ArrowRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

/* ===== EVENTS ===== */
const carouselEvents = [
  { title: "Westwood", sub: "Western Solo Singing" },
  { title: "Raagify", sub: "Eastern Music" },
  { title: "Illusion Jam", sub: "Battle of Bands" },
  { title: "Instrumental Echoes", sub: "Battle of Instruments" },
  { title: "Voxbox", sub: "Beatbox Battle" },

  { title: "Eastern Euphoria", sub: "Eastern Dance" },
  { title: "Step Up", sub: "Western Dance" },
  { title: "Street Dance Battle", sub: "Freestyle & Crew" },

  { title: "Shrutirawngo", sub: "Audio Drama" },
  { title: "Halla Bol", sub: "Street Play" },
  { title: "Stand-Up Comedy", sub: "Solo Acts" },

  { title: "Vision Alchemy", sub: "Photography" },
  { title: "Reel-O-Mania", sub: "Reel Making" },

  { title: "Quizzard", sub: "Quiz Competition" },
  { title: "Mind Over Moves", sub: "Chess" },
  { title: "IEM Panja Arena", sub: "Arm Wrestling" },
  { title: "Table Tennis", sub: "Singles & Doubles" },
  { title: "8-Ball Pool", sub: "Cue Sports" },

  { title: "BGMI", sub: "Battle Royale" },
  { title: "Free Fire", sub: "Squad Battles" },
  { title: "E-Football", sub: "Virtual Football" },
];

export function EventCarousel() {
  return (
    <section className="relative w-full px-6 py-16">
      {/* SECTION BORDER */}
      <div className="relative mx-auto max-w-[1600px] rounded-[28px] p-[2px] bg-gradient-to-br from-yellow-300/40 via-yellow-200/10 to-red-400/40">
        <div className="relative rounded-[26px] overflow-hidden py-8">
          {/* BACKGROUND LAYERS */}
          <div className="absolute inset-0 bg-red-900/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/10 to-yellow-500/20" />

          <Swiper
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            loop
            navigation
            autoplay={{ delay: 2600, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              depth: 260,
              modifier: 1.4,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="relative z-10"
          >
            {carouselEvents.map((event, i) => (
              <SwiperSlide
                key={i}
                className="w-[270px] md:w-[320px] h-[420px] flex justify-center"
              >
                {/* STALL */}
                <div className="group relative w-full mt-20">
                  {/* ROOF */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[118%] z-20">
                    <div className="h-14 rounded-t-md bg-[repeating-linear-gradient(90deg,#dc2626,#dc2626_30px,#fde68a_30px,#fde68a_60px)] shadow-xl" />
                    <div className="flex justify-around bg-red-700/95 py-2 backdrop-blur border-b-4 border-red-900">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <span
                          key={j}
                          className="w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,1)]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* MAIN STALL CARD */}
                  <div
                    className="
                      relative overflow-hidden rounded-xl
                      backdrop-blur-xl bg-yellow-100/45
                      border-[3px] border-red-900/80
                      shadow-[0_25px_50px_rgba(0,0,0,0.45)]
                      transition-all duration-500
                      group-hover:-translate-y-5 group-hover:scale-[1.04]
                      group-hover:shadow-[0_45px_90px_rgba(185,28,28,0.6)]
                    "
                  >
                    {/* CONTENT */}
                    <div className="p-8 text-center">
                      <h3 className="text-4xl font-samarkan text-red-800 mb-2 drop-shadow">
                        {event.title}
                      </h3>
                      <p className="text-sm text-red-900/70 tracking-wide">
                        {event.sub}
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div className="bg-yellow-300/85 backdrop-blur-md px-6 py-4 flex justify-center border-t-2 border-red-900/40">
                      <Link
                        to="/register"
                        className="
                          flex items-center gap-3
                          bg-red-600 hover:bg-red-500
                          text-white font-bold uppercase tracking-wide
                          px-6 py-2.5
                          shadow-[0_6px_0_#7f1d1d]
                          hover:-translate-y-1
                          hover:shadow-[0_14px_35px_rgba(220,38,38,0.6)]
                          transition-all
                        "
                        style={{
                          clipPath:
                            "polygon(12px 0,100% 0,100% 100%,12px 100%,0 50%)",
                        }}
                      >
                        <Ticket size={18} />
                        Join
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* BASE SHADOW */}
                  <div className="mx-auto mt-2 w-[80%] h-3 rounded-full bg-black/35 blur-lg" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
