import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Music2, Mic2, Brush, Camera, Code, Theater, Sparkles } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Battle of Bands',
    category: 'Music',
    icon: Music2,
    description: 'Rock the stage with your band and compete for the ultimate glory. Experience electrifying performances from the best bands across the region.',
    prize: '₹50,000',
    date: 'March 15',
    time: '2:00 PM',
    venue: 'Open Air Theater',
    color: 'from-primary to-orange',
    gradient: 'linear-gradient(135deg, #c62b2b 0%, #f78724 100%)',
  },
  {
    id: 2,
    title: 'Classical Dance',
    category: 'Dance',
    icon: Theater,
    description: 'Showcase traditional dance forms in this classical celebration. Witness the grace and beauty of Indian classical dance.',
    prize: '₹30,000',
    date: 'March 15',
    time: '10:30 AM',
    venue: 'Auditorium A',
    color: 'from-secondary to-accent',
    gradient: 'linear-gradient(135deg, #65caff 0%, #ffd25a 100%)',
  },
  {
    id: 3,
    title: 'Open Mic Night',
    category: 'Literary',
    icon: Mic2,
    description: 'Poetry, storytelling, or stand-up - take the mic and shine. Express yourself in this open platform for all artists.',
    prize: '₹15,000',
    date: 'March 16',
    time: '11:00 AM',
    venue: 'Acoustic Lounge',
    color: 'from-muted to-primary',
    gradient: 'linear-gradient(135deg, #8f5c2e 0%, #c62b2b 100%)',
  },
  {
    id: 4,
    title: 'Art Exhibition',
    category: 'Art',
    icon: Brush,
    description: 'Display your artistic creations and compete with the best. Explore a diverse collection of visual arts and paintings.',
    prize: '₹25,000',
    date: 'March 16',
    time: '5:00 PM',
    venue: 'Gallery Wing',
    color: 'from-accent to-orange',
    gradient: 'linear-gradient(135deg, #ffd25a 0%, #f78724 100%)',
  },
  {
    id: 5,
    title: 'Photography Walk',
    category: 'Art',
    icon: Camera,
    description: 'Capture the essence of the fest through your lens. Show your photography skills in this campus-wide competition.',
    prize: '₹20,000',
    date: 'March 17',
    time: '9:00 AM',
    venue: 'Campus Wide',
    color: 'from-orange to-primary',
    gradient: 'linear-gradient(135deg, #f78724 0%, #c62b2b 100%)',
  },
  {
    id: 6,
    title: 'Hackathon',
    category: 'Tech',
    icon: Code,
    description: '24-hour coding challenge to build innovative solutions. Code, create, and compete with the brightest minds.',
    prize: '₹1,00,000',
    date: 'March 15-16',
    time: '12:00 PM',
    venue: 'Tech Hub',
    color: 'from-secondary to-muted',
    gradient: 'linear-gradient(135deg, #65caff 0%, #8f5c2e 100%)',
  },
];

export function EventCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: true, margin: '-100px' });

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Carnival-themed decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-orange/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={carouselRef}>
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl mb-4">
            Featured <span className="text-gradient-cyan">Events</span>
          </h2>
          <p className="font-poppins text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            From high-energy competitions to creative showcases, experience the carnival of talents.
          </p>
        </motion.div>

        {/* Enhanced Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {events.map((event, index) => {
                const Icon = event.icon;
                return (
                  <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 100, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 100
                      }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="h-full"
                    >
                      <Card className="h-full border-2 border-border/30 hover:border-accent/50 transition-all duration-300 bg-card/50 backdrop-blur-sm overflow-hidden group">
                        {/* Gradient Header with Animated Sparkles */}
                        <div
                          className={`relative h-40 bg-gradient-to-br ${event.color} overflow-hidden`}
                          style={{ background: event.gradient }}
                        >
                          <div className="absolute inset-0 bg-background/20" />
                          
                          {/* Carnival lights effect */}
                          <div className="absolute inset-0">
                            <Sparkles className="w-6 h-6 text-white/30 absolute top-4 left-4 animate-pulse" />
                            <Sparkles className="w-5 h-5 text-white/40 absolute top-8 right-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <Sparkles className="w-4 h-4 text-white/30 absolute bottom-6 left-8 animate-pulse" style={{ animationDelay: '1s' }} />
                          </div>

                          {/* Icon */}
                          <div className="absolute bottom-4 left-4 transform transition-transform duration-300 group-hover:scale-110">
                            <div className="p-3 rounded-full bg-background/30 backdrop-blur-sm">
                              <Icon className="w-8 h-8 text-foreground" />
                            </div>
                          </div>

                          {/* Date badge */}
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/30 backdrop-blur-sm border border-white/20">
                            <span className="text-xs font-medium text-white">{event.date}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                              {event.category}
                            </span>
                            <span className="font-bebas text-xl text-secondary">{event.prize}</span>
                          </div>

                          <h3 className="font-bebas text-2xl mb-2 group-hover:text-accent transition-colors">
                            {event.title}
                          </h3>
                          <p className="font-poppins text-sm text-foreground/60 mb-4 line-clamp-3">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-2 mb-4 pb-4 border-b border-border/30">
                            <div className="flex items-center gap-2 text-xs text-foreground/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-foreground/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                              <span>{event.venue}</span>
                            </div>
                          </div>

                          <Link to={`/register?event=${encodeURIComponent(event.title)}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full group/btn hover:bg-accent/10 transition-all duration-300 hover:scale-105"
                            >
                              Register Now
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-card/80 backdrop-blur-sm hover:bg-accent border-accent/30" />
            <CarouselNext className="right-0 md:-right-12 bg-card/80 backdrop-blur-sm hover:bg-accent border-accent/30" />
          </Carousel>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link to="/events">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="lg"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">View All Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
