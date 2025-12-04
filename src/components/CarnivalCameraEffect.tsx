import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music2, Camera, Ticket, Star } from 'lucide-react';

interface CarnivalItem {
  id: number;
  icon: typeof Sparkles;
  color: string;
  position: { x: number; y: number; z: number };
  size: number;
}

export function CarnivalCameraEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number>();

  // Carnival items with 3D positions
  const carnivalItems: CarnivalItem[] = useMemo(() => [
    { id: 1, icon: Sparkles, color: '#ffd25a', position: { x: -150, y: -100, z: -50 }, size: 60 },
    { id: 2, icon: Music2, color: '#c62b2b', position: { x: 150, y: -80, z: -30 }, size: 70 },
    { id: 3, icon: Camera, color: '#65caff', position: { x: -120, y: 100, z: -40 }, size: 65 },
    { id: 4, icon: Ticket, color: '#f78724', position: { x: 120, y: 120, z: -60 }, size: 55 },
    { id: 5, icon: Star, color: '#ffd25a', position: { x: 0, y: -150, z: -20 }, size: 80 },
    { id: 6, icon: Sparkles, color: '#c62b2b', position: { x: -80, y: 0, z: -70 }, size: 50 },
    { id: 7, icon: Music2, color: '#65caff', position: { x: 100, y: -50, z: -35 }, size: 60 },
    { id: 8, icon: Star, color: '#f78724', position: { x: -100, y: 150, z: -45 }, size: 70 },
    { id: 9, icon: Camera, color: '#ffd25a', position: { x: 80, y: 80, z: -55 }, size: 55 },
    { id: 10, icon: Ticket, color: '#c62b2b', position: { x: 0, y: 0, z: -25 }, size: 90 },
  ], []);

  // Mouse move handler for camera effect
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      targetX = (e.clientX - centerX) / rect.width;
      targetY = (e.clientY - centerY) / rect.height;
    };

    const animate = () => {
      // Smooth interpolation
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      // Update all items
      itemsRef.current.forEach((item, index) => {
        if (item && carnivalItems[index]) {
          const basePosition = carnivalItems[index];
          const rotateX = mouseY * 20;
          const rotateY = -mouseX * 20;
          const translateX = basePosition.position.x + mouseX * 50;
          const translateY = basePosition.position.y + mouseY * 50;
          const translateZ = basePosition.position.z + (mouseX * mouseX + mouseY * mouseY) * 30;
          const scale = 1 + Math.abs(mouseX * mouseY) * 0.3;
          
          item.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      animate();
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [carnivalItems]);

  // Initial animation on mount with CSS transitions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      itemsRef.current.forEach((item, index) => {
        if (item && carnivalItems[index]) {
          const basePosition = carnivalItems[index];
          
          // Set initial position
          item.style.transform = `translate3d(${basePosition.position.x}px, ${basePosition.position.y}px, ${basePosition.position.z}px) scale(0)`;
          item.style.opacity = '0';
          item.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1s ease-out';

          // Animate in with CSS
          setTimeout(() => {
            item.style.transform = `translate3d(${basePosition.position.x}px, ${basePosition.position.y}px, ${basePosition.position.z}px) scale(1)`;
            item.style.opacity = '1';
          }, index * 100);
        }
      });
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [carnivalItems]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl md:text-7xl mb-4">
            Experience the <span className="text-gradient-cyan">Carnival</span>
          </h2>
          <p className="font-poppins text-foreground/70 max-w-2xl mx-auto text-lg">
            Move your mouse to explore the carnival in 3D. Every element responds to your movement, 
            creating an immersive camera-like experience.
          </p>
        </div>

        {/* 3D Camera Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[600px] md:h-[700px] cursor-move"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Center reference point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full opacity-30" />
          
          {/* Carnival items in 3D space */}
          {carnivalItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <div
                  className="relative flex items-center justify-center rounded-full backdrop-blur-sm border-2 transition-all duration-300 hover:scale-110"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    backgroundColor: `${item.color}20`,
                    borderColor: item.color,
                    boxShadow: `0 0 ${item.size / 2}px ${item.color}40`,
                  }}
                >
                  <Icon
                    className="w-1/2 h-1/2"
                    style={{ color: item.color }}
                  />
                  
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      backgroundColor: item.color,
                      opacity: 0.2,
                      filter: 'blur(10px)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="font-poppins text-sm text-foreground/60 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
            Move your mouse to control the 3D camera perspective
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
