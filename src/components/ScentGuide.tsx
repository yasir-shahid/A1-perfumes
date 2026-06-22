import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, Compass, Award, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ScentGuide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const steps = [
    {
      title: 'Art of Application',
      points: [
        'Apply 1-2 concentrated swipes of Attar oil onto your inner wrists which are key warm pulse points.',
        'Gently rub wrists together to activate the botanical molecules without hard friction.',
        'Slightly tab on your neck joints, back of ears, or chest collars to anchor the intimate sillage.',
        'For unmatched multi-day longevity, swipe onto cotton kurtas, woollen coats, or silk apparel.'
      ]
    },
    {
      title: 'Optimal Storage Tactics',
      points: [
        'Store your glass vials inside custom boxes away from strong direct sunlight which alters volatile top notes.',
        'Ensure the alloy metal screw-caps or glass stoppers are sealed tight after each application.',
        'Ideal ambient temperature is between 18°C and 25°C. Strictly avoid excessively humid bathrooms.'
      ]
    },
    {
      title: 'Attar vs. Premium Spray',
      points: [
        'Traditional pure Attars contain 100% concentrated alcohol-free oil that sits intimately on warm pulse points.',
        'Our custom Perfume Sprays (10ml & 30ml) offer amazing sillage and dynamic projection for outer clothing.',
        'Whether you prefer the slow-releasing depth of oil or the instant magnificent trail of sprays, we serve both in-store.'
      ]
    }
  ];

  return (
    <section
      id="guide"
      ref={containerRef}
      className="py-24 bg-luxury-black border-t border-gold/10 relative overflow-hidden"
    >
      {/* Drifting background glows */}
      <motion.div 
        style={{ y: yBg, willChange: 'transform' }}
        className="absolute top-10 right-10 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [60, -60]), willChange: 'transform' }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Artisanship Education</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide">
            Before You Buy: The Connoisseurs Manual
          </h2>
          <p className="text-cream/70 text-xs sm:text-sm mt-3 font-light">
            Pure botanical oils behave completely differently than alcohol-heavy spray vials. Learn how to wear, store, and understand your aromatic investements.
          </p>
          <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4"></div>
        </div>

        {/* Dynamic educational columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const yOffset = idx === 0 ? yCard1 : idx === 1 ? yCard2 : yCard3;
            
            return (
              <motion.div
                key={idx}
                style={{ y: yOffset, willChange: 'transform' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-black/50 border border-gold/15 p-6 sm:p-8 flex flex-col space-y-5 relative group hover:border-gold/30 transition-colors"
              >
              {/* Corner design touch */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/20 group-hover:border-gold transition-colors"></div>

              <div className="flex items-center space-x-3 pb-3 border-b border-gold/10">
                <BookOpen className="h-4 w-4 text-gold" />
                <h3 className="font-serif text-lg text-white font-semibold uppercase tracking-wider">{step.title}</h3>
              </div>

              <ul className="space-y-4 flex-grow">
                {step.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs sm:text-sm text-cream/80 font-light leading-relaxed flex items-start space-x-3">
                    <span className="text-gold font-mono text-xs select-none pt-0.5">{pIdx + 1}.</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
