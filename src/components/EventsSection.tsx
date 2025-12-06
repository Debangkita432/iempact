import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

// Sample data - Replace with your actual events list
const events = [
  {
    id: 1,
    title: "Code Warriors",
    category: "Technical",
    date: "Day 1",
    venue: "Lab 201",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Dance Duel",
    category: "Cultural",
    date: "Day 2",
    venue: "Main Stage",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Robo Soccer",
    category: "Technical",
    date: "Day 1",
    venue: "Arena",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Voice of Impact",
    category: "Music",
    date: "Day 3",
    venue: "Auditorium",
    image:
      "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80",
  },
];

export function EventsSection() {
  return (
    <div className="w-full">
      {/* ❌ HEADER REMOVED FROM HERE */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 z-20">
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded border border-white/10">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bebas text-white mb-3 group-hover:text-accent transition-colors">
                {event.title}
              </h3>

              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-accent" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Register soon
                </span>
                <button className="text-xs font-bold text-accent uppercase tracking-wider hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
