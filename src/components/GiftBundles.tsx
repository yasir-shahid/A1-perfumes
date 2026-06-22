import { useRef } from 'react';
import { Gift, Sparkles, CheckCircle, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface BundleProps {
  onSelectAttar: (name: string) => void;
}

export interface GiftBundleItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  included: string[];
  packaging: string;
  isFestivalSpecial?: boolean;
}

const BUNDLES: GiftBundleItem[] = [
  {
    id: 'b1',
    name: 'Royal Shahi Bouquet',
    price: 3499,
    originalPrice: 4098,
    description: 'A celestial combo capturing the absolute pinnacle of royal musks and night-blooming sacred florality. Highly requested for weddings, family blessings, and prestige corporate gifts.',
    included: ['Royal Musk Rijali (12ml)', 'Jannat-e-Zuhr (12ml)'],
    packaging: 'Luxury red velvet casket with gold brass roll-on decants',
    isFestivalSpecial: true
  },
  {
    id: 'b2',
    name: 'Duo Seduction (Couples Set)',
    price: 3199,
    originalPrice: 3698,
    description: 'The definitive romantic collection balancing warm, heavy femininity with athletic, clean, sporty masculinity. One is bold dry wood-spice, the other is rich saffron Damask Rose oud oil.',
    included: ['Arba Wardath (12ml)', 'CR-7 (12ml)'],
    packaging: 'Deep burgundy leather-finish gift box with silk line cushioning'
  },
  {
    id: 'b3',
    name: 'A-ONE Sovereign Trilogy Set',
    price: 5299,
    originalPrice: 6297,
    description: 'Our ultimate copper-extracted flagship discovery set matching raw wet earth petrichor, pristine white musk, and active modern magnetic spices for every setting in your lifestyle.',
    included: ['Ruh Khus (12ml)', 'Royal Musk Rijali (12ml)', 'CR-7 (12ml)'],
    packaging: 'Royal golden chest adorned with brass metal hinges'
  }
];

export default function GiftBundles({ onSelectAttar }: BundleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yGlow = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      id="bundles"
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-black via-luxury-black to-black border-t border-gold/10 relative overflow-hidden"
    >
      <motion.div 
        style={{ y: yGlow, willChange: 'transform' }}
        className="absolute bottom-0 right-[5%] w-80 h-80 rounded-full bg-burgundy/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Curated Devotions</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide">
            Gift Collections & Heritage Bundles
          </h2>
          <p className="text-cream/70 text-xs sm:text-sm mt-3 font-light">
            Celebrate weddings, festivals, and key family milestones with our custom-curated, non-alcoholic oil pairings. Packaged inside luxurious, hand-crafted caskets.
          </p>
          <div className="w-16 h-[1px] bg-gold/20 mx-auto mt-4"></div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {BUNDLES.map((b, idx) => {
            const yOffset = idx === 0 ? yCard1 : idx === 1 ? yCard2 : yCard3;
            
            return (
              <motion.div
                key={b.id}
                style={{ y: yOffset, willChange: 'transform' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-neutral-950/60 backdrop-blur-md border border-gold/15 hover:border-gold/35 p-6 sm:p-8 flex flex-col justify-between relative group transform transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.08)] rounded-none"
              >
              {b.isFestivalSpecial && (
                <div className="absolute -top-3 left-6 z-20 bg-burgundy border border-gold text-gold text-[8px] tracking-[0.25em] font-mono uppercase px-3 py-1 font-bold">
                  ★ Shahi Special
                </div>
              )}

              {/* Decorative design trim */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/20 group-hover:border-gold/60 transition-colors"></div>

              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-burgundy/10 border border-gold/15 group-hover:border-gold text-gold">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] line-through text-cream/40 font-mono">₹{b.originalPrice}</p>
                    <p className="text-xl font-mono text-gold font-bold">₹{b.price}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl text-white font-semibold">
                    {b.name}
                  </h3>
                  <div className="flex items-center space-x-1 font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]">
                    <Sparkles className="h-3 w-3" />
                    <span>Special Price Offer</span>
                  </div>
                </div>

                <p className="text-cream/70 text-xs font-light leading-relaxed">
                  {b.description}
                </p>

                {/* Included items */}
                <div className="space-y-2 pt-2 border-t border-gold/10">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37]/80 block">Included Elixirs:</span>
                  <ul className="space-y-1">
                    {b.included.map((inc, i) => (
                      <li key={i} className="text-xs text-cream/90 font-light flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-[#800020] border border-[#D4AF37]/50 rounded-none inline-block"></span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Packaging container */}
                <div className="pt-2 font-mono text-[9px] uppercase tracking-wider text-cream/50 space-y-1">
                  <span className="text-[#D4AF37]/80 block">Bespoke Casket:</span>
                  <p className="text-cream font-sans font-light normal-case text-xs leading-relaxed">{b.packaging}</p>
                </div>
              </div>

              {/* Interaction button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectAttar(`BUNDLE: ${b.name}`)}
                  id={`select-bundle-btn-${b.id}`}
                  className="w-full py-3 bg-transparent border border-gold hover:bg-gold text-gold hover:text-black font-semibold uppercase tracking-widest text-xs rounded-none transition-all duration-300 pointer-events-auto cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Gift className="h-3.5 w-3.5" />
                  <span>Acquire Heritage Bundle</span>
                </button>
              </div>

            </motion.div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
