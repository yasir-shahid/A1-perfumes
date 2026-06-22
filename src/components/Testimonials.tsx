import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-130, 130]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-luxury-black to-black border-t border-gold/15 relative overflow-hidden"
    >
      <motion.div 
        style={{ y: yBg, willChange: 'transform' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Connoisseur Reviews</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-wide">
            Words of Appreciation
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, indexSpecial) => {
            const yOffset = indexSpecial === 0 ? yCard1 : indexSpecial === 1 ? yCard2 : yCard3;
            return (
              <motion.div
                key={t.id}
                style={{ y: yOffset, willChange: 'transform' }}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black/60 border border-gold/15 p-8 flex flex-col justify-between relative group hover:border-gold/30 transition-colors"
              >
              {/* Corner Design touches */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/25 group-hover:border-gold transition-colors"></div>

              <div>
                {/* Stars container */}
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-burgundy opacity-40 mb-4" />

                {/* Feedback content */}
                <p className="text-cream/90 text-sm sm:text-base italic leading-relaxed font-light mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author metadata */}
              <div className="border-t border-gold/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-white font-medium tracking-wider text-sm">
                    {t.name}
                  </h4>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-gold mt-0.5">
                    {t.location}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-cream/40">{t.date}</span>
              </div>
            </motion.div>
          );
        })}
        </div>

        {/* Fine-print luxury footnote */}
        <div className="text-center mt-12">
          <p className="text-xs font-mono text-gold/60 uppercase tracking-widest max-w-md mx-auto">
            ✦ PROUDLY POURING PURE HAND-CRAFTED ATTARES SINCE INCEPTION ✦
          </p>
        </div>

      </div>
    </section>
  );
}
