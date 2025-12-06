import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Music, Palette, Trophy } from 'lucide-react';

const features = [
  {
    icon: Music,
    title: 'Live Performances',
    description: 'Experience electrifying performances from renowned artists and talented students.',
    color: 'text-primary',
  },
  {
    icon: Palette,
    title: 'Cultural Events',
    description: 'Celebrate diversity through traditional dance, art exhibitions, and cultural showcases.',
    color: 'text-accent',
  },
  {
    icon: Trophy,
    title: 'Competitions',
    description: 'Compete in exciting events and win amazing prizes across various categories.',
    color: 'text-secondary',
  },
  {
    icon: Sparkles,
    title: 'Workshops',
    description: 'Learn from industry experts through interactive workshops and masterclasses.',
    color: 'text-orange',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 folk-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-5xl md:text-7xl mb-4">
            <span className="text-gradient-accent">About</span> The Fest
          </h2>
          <p className="font-poppins text-foreground/70 max-w-2xl mx-auto text-lg">
            IMPACT 2026 brings together the best of culture, creativity, and competition 
            in a three-day celebration that transforms our campus into a vibrant carnival.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-background/50 flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                
                {/* Content */}
                <h3 className="font-bebas text-2xl mb-2 text-foreground group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="font-poppins text-sm text-foreground/60">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent transform rotate-45 translate-x-16 -translate-y-16" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50+', label: 'Events' },
            { value: '100+', label: 'Colleges' },
            { value: '₹5L+', label: 'Prize Pool' },
            { value: '3', label: 'Days' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-bebas text-5xl md:text-6xl text-gradient-accent mb-2">
                {stat.value}
              </div>
              <div className="font-poppins text-sm text-foreground/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
