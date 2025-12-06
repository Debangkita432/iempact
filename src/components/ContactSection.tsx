import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  subject: z.string().trim().min(2, 'Subject must be at least 2 characters').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000),
});

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        });

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative bg-gradient-dark">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl mb-4 md:mb-6">
              Get In <span className="text-gradient-accent">Touch</span>
            </h2>
            <p className="font-poppins text-foreground/70 mb-6 md:mb-8 text-sm md:text-base">
              Have questions about IMPACT 2026? Want to sponsor or participate? 
              Reach out to us and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-4 mb-6 md:mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <span className="block font-poppins text-xs md:text-sm text-foreground/60">Email</span>
                  <a href="mailto:impact@college.edu" className="font-poppins text-sm md:text-base font-medium hover:text-accent transition-colors">
                    impact@college.edu
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                </div>
                <div>
                  <span className="block font-poppins text-xs md:text-sm text-foreground/60">Phone</span>
                  <a href="tel:+911234567890" className="font-poppins text-sm md:text-base font-medium hover:text-accent transition-colors">
                    +91 123 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <div>
                  <span className="block font-poppins text-xs md:text-sm text-foreground/60">Location</span>
                  <span className="font-poppins text-sm md:text-base font-medium">Main Campus, College Name</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30">
              <h3 className="font-bebas text-2xl md:text-3xl mb-4 md:mb-6">Send a Message</h3>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-poppins text-xs md:text-sm text-foreground/70 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-poppins text-xs md:text-sm text-foreground/70 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-poppins text-xs md:text-sm text-foreground/70 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block font-poppins text-xs md:text-sm text-foreground/70 mb-2">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
