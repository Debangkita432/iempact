import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Music2, Mic2, Brush, Camera, Code, Theater } from 'lucide-react';

const categories = ['All', 'Music', 'Dance', 'Art', 'Tech', 'Literary'];

const events = [
  {
    id: 1,
    title: 'Battle of Bands',
    category: 'Music',
    icon: Music2,
    description: 'Rock the stage with your band and compete for the ultimate glory.',
    prize: '₹50,000',
    date: 'March 15',
    color: 'from-primary to-orange',
  },
  {
    id: 2,
    title: 'Classical Dance',
    category: 'Dance',
    icon: Theater,
    description: 'Showcase traditional dance forms in this classical celebration.',
    prize: '₹30,000',
    date: 'March 15',
    color: 'from-secondary to-accent',
  },
  {
    id: 3,
    title: 'Open Mic Night',
    category: 'Literary',
    icon: Mic2,
    description: 'Poetry, storytelling, or stand-up - take the mic and shine.',
    prize: '₹15,000',
    date: 'March 16',
    color: 'from-muted to-primary',
  },
  {
    id: 4,
    title: 'Art Exhibition',
    category: 'Art',
    icon: Brush,
    description: 'Display your artistic creations and compete with the best.',
    prize: '₹25,000',
    date: 'March 16',
    color: 'from-accent to-orange',
  },
  {
    id: 5,
    title: 'Photography Walk',
    category: 'Art',
    icon: Camera,
    description: 'Capture the essence of the fest through your lens.',
    prize: '₹20,000',
    date: 'March 17',
    color: 'from-orange to-primary',
  },
  {
    id: 6,
    title: 'Hackathon',
    category: 'Tech',
    icon: Code,
    description: '24-hour coding challenge to build innovative solutions.',
    prize: '₹1,00,000',
    date: 'March 15-16',
    color: 'from-secondary to-muted',
  },
];

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <section className="py-16 md:py-24 relative bg-gradient-dark">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl mb-4">
            Featured <span className="text-gradient-cyan">Events</span>
          </h2>
          <p className="font-poppins text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            From high-energy competitions to creative showcases, there's something for everyone.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-5 py-2 rounded-full font-poppins text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card/50 text-foreground/70 hover:bg-card hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
              className="group"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm border border-border/30 hover:border-accent/50 transition-all duration-500 hover:scale-[1.02]">
                {/* Gradient Header */}
                <div className={`h-28 md:h-32 bg-gradient-to-br ${event.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-background/20" />
                  <div className="absolute bottom-4 left-4">
                    <event.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground/90" />
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/30 backdrop-blur-sm">
                    <span className="text-xs font-medium">{event.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/20 text-accent">
                      {event.category}
                    </span>
                    <span className="font-bebas text-lg md:text-xl text-secondary">{event.prize}</span>
                  </div>
                  
                  <h3 className="font-bebas text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-poppins text-xs md:text-sm text-foreground/60 mb-4">
                    {event.description}
                  </p>

                  <Link to={`/register?event=${encodeURIComponent(event.title)}`}>
                    <Button variant="ghost" size="sm" className="group/btn p-0">
                      Register Now 
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Register for Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
