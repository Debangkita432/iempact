import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Contact', href: '/contact' },
  { name: 'Register', href: '/register' },
];

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bebas text-2xl md:text-3xl text-gradient-accent">IMPACT</span>
              <span className="font-bebas text-2xl md:text-3xl text-secondary">2026</span>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-poppins text-xs md:text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-poppins text-xs md:text-sm text-foreground/50 text-center md:text-right">
            © 2026 IMPACT. All rights reserved.
          </p>
        </div>

        {/* Decorative element */}
        <div className="mt-6 md:mt-8 text-center overflow-hidden">
          <span className="font-bebas text-4xl sm:text-6xl md:text-8xl text-foreground/5 whitespace-nowrap">
            WHERE TRADITION MEETS INNOVATION
          </span>
        </div>
      </div>
    </footer>
  );
}
