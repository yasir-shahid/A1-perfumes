import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Globe, Flame } from 'lucide-react';

export default function LuxuryStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yGlow = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const stats = [
    {
      icon: <Heart className="h-6 w-6 text-gold" />,
      number: '5,000+',
      label: 'Happy Patrons',
      description: 'Chosen by discerning fragrance lovers across the region.'
    },
    {
      icon: <Globe className="h-6 w-6 text-gold" />,
      number: '100%',
      label: 'Natural Absolutes',
      description: 'Pure concentrates crafted from finest hand-harvested ingredients.'
    },
    {
      icon: <Flame className="h-6 w-6 text-gold" />,
      number: 'Zero',
      label: 'Alcohol Fillers',
      description: 'Completely oil-based blends for an intimate, long-lasting aroma profile.'
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="py-16 bg-black border-t border-b border-gold/10 relative overflow-hidden"
    >
      {/* Background radial gold glow with parallax motion */}
      <motion.div
        style={{ y: yGlow, willChange: 'transform' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(214,175,55,0.04)_0,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-neutral-950/40 backdrop-blur-md border border-gold/10 p-6 flex flex-col items-center text-center relative group hover:border-gold/30 transition-colors"
            >
              {/* Outer corner details */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40 group-hover:border-gold transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40 group-hover:border-gold transition-colors"></div>

              <div className="p-3 border border-gold/15 bg-burgundy/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>

              <span className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold font-bold tracking-tight">
                {stat.number}
              </span>
              
              <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-white font-medium mt-2">
                {stat.label}
              </h4>
              
              <p className="text-cream/50 text-[11px] leading-relaxed font-light mt-2 max-w-[200px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
