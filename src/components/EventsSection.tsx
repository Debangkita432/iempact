import { motion } from "framer-motion";

/* ✅ Final event data: Event Name + Subheading only */
const events = [
  {
    id: 1,
    title: "Westwood",
    subheading: "Western Solo Singing",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Raagify",
    subheading: "Eastern Music",
    image:
      "https://images.unsplash.com/photo-1519494080410-f9aa76f1fc1a?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Illusion Jam",
    subheading: "Battle of Bands",
    image:
      "https://images.unsplash.com/photo-1511379938547-9c258acb5a0c?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Eastern Euphoria",
    subheading: "Eastern Dance",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Step Up",
    subheading: "Western Dance",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Halla Bol",
    subheading: "Street Play",
    image:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&q=80",
  },
];

export function EventsSection() {
  return (
    <section className="w-full pt-10 pb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.6 }}
            className="
              group relative overflow-hidden rounded-2xl
              bg-black/60
              border border-white/15
              transition-all duration-300
              hover:shadow-[0_0_45px_rgba(255,210,90,0.18)]
              hover:border-yellow-300/70
            "
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 text-center">
              <h3
                className="
                  font-samarkan
                  text-[1.9rem] md:text-[2.1rem]
                  text-white mb-1
                  tracking-wide
                "
              >
                {event.title}
              </h3>

              <p
                className="
                  text-[0.7rem]
                  uppercase tracking-[0.25em]
                  text-white/70
                "
              >
                {event.subheading}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
