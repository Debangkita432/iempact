import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const days = [
  { id: 1, date: 'March 15', day: 'Day 1' },
  { id: 2, date: 'March 16', day: 'Day 2' },
  { id: 3, date: 'March 17', day: 'Day 3' },
];

const scheduleData = {
  1: [
    { time: '9:00 AM', event: 'Opening Ceremony', venue: 'Main Stage', highlight: true },
    { time: '10:30 AM', event: 'Classical Dance Prelims', venue: 'Auditorium A' },
    { time: '12:00 PM', event: 'Hackathon Begins', venue: 'Tech Hub' },
    { time: '2:00 PM', event: 'Battle of Bands - Round 1', venue: 'Open Air Theater' },
    { time: '5:00 PM', event: 'Art Exhibition Opening', venue: 'Gallery Wing' },
    { time: '7:00 PM', event: 'DJ Night', venue: 'Main Stage', highlight: true },
  ],
  2: [
    { time: '9:00 AM', event: 'Photography Walk', venue: 'Campus Wide' },
    { time: '11:00 AM', event: 'Open Mic Prelims', venue: 'Acoustic Lounge' },
    { time: '1:00 PM', event: 'Classical Dance Finals', venue: 'Main Stage' },
    { time: '3:00 PM', event: 'Battle of Bands - Finals', venue: 'Open Air Theater', highlight: true },
    { time: '5:00 PM', event: 'Workshop: Digital Art', venue: 'Media Lab' },
    { time: '8:00 PM', event: 'Celebrity Performance', venue: 'Main Stage', highlight: true },
  ],
  3: [
    { time: '9:00 AM', event: 'Hackathon Presentations', venue: 'Tech Hub' },
    { time: '11:00 AM', event: 'Open Mic Finals', venue: 'Main Stage' },
    { time: '1:00 PM', event: 'Photography Awards', venue: 'Gallery Wing' },
    { time: '3:00 PM', event: 'Flash Mob', venue: 'Central Lawn', highlight: true },
    { time: '5:00 PM', event: 'Prize Distribution', venue: 'Main Stage', highlight: true },
    { time: '7:00 PM', event: 'Closing Ceremony & Fireworks', venue: 'Main Stage', highlight: true },
  ],
};

export function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section id="schedule" className="py-24 relative">
      <div className="absolute inset-0 folk-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-5xl md:text-7xl mb-4">
            Event <span className="text-gradient-accent">Schedule</span>
          </h2>
          <p className="font-poppins text-foreground/70 max-w-2xl mx-auto">
            Plan your festival experience with our detailed three-day schedule.
          </p>
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`px-6 py-4 rounded-xl transition-all duration-300 ${
                activeDay === day.id
                  ? 'bg-primary glow-red scale-105'
                  : 'bg-card/50 hover:bg-card'
              }`}
            >
              <span className="block font-bebas text-2xl">{day.day}</span>
              <span className="block font-poppins text-sm text-foreground/70">{day.date}</span>
            </button>
          ))}
        </motion.div>

        {/* Schedule Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

            {scheduleData[activeDay as keyof typeof scheduleData].map((item, index) => (
              <motion.div
                key={`${activeDay}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex items-center mb-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-accent z-10" />

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`p-4 rounded-xl ${
                    item.highlight 
                      ? 'bg-primary/20 border border-primary/50' 
                      : 'bg-card/30 border border-border/30'
                  } hover:scale-[1.02] transition-transform duration-300`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="font-poppins text-sm font-medium text-accent">{item.time}</span>
                      {item.highlight && (
                        <span className="px-2 py-0.5 rounded-full bg-accent/20 text-xs text-accent">Highlight</span>
                      )}
                    </div>
                    <h3 className="font-bebas text-xl mb-1">{item.event}</h3>
                    <div className="flex items-center gap-1 text-foreground/60">
                      <MapPin className="w-3 h-3" />
                      <span className="font-poppins text-xs">{item.venue}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
