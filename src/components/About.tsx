import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Award, ShieldCheck, Flame, Compass } from 'lucide-react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Elegantly drift elements
  const yBg = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yLeftCol = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yRightCol = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const values = [
    {
      icon: <Award className="h-6 w-6 text-gold" />,
      title: 'Legacy Copper Distillation',
      description: 'Extracted using the age-old hydro-distillation method in copper stills (degs). This raw, patient, manual heat capture retains the deep complex molecular notes of standard botanical botanical ingredients.',
    },
    {
      icon: <Flame className="h-6 w-6 text-gold" />,
      title: 'Zero Alcohol Base',
      description: 'Our attars are 100% oil-based, meaning they will not evaporate quickly or cause skin dryness. Every drop is dense, evolving elegantly as it warms with your natural skin temperature.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-gold" />,
      title: 'Absolute Purity Integrity',
      description: 'Free from synthetic fillers, DEP, or modern mineral oil diluters. We prioritize genuine flower blossoms, organic woods, and natural resins to preserve pure botanical essences.',
    },
    {
      icon: <Compass className="h-6 w-6 text-gold" />,
      title: 'Premium Perfume Sprays',
      description: 'Alongside pure oils, we craft long-lasting inspired perfume sprays (10ml & 30ml). These designer alternatives provide a comfortable, magnificent projection for your daily lifestyle.',
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-black to-luxury-black border-t border-gold/10 relative overflow-hidden"
    >
      {/* Dynamic drifting ambient background glows */}
      <motion.div
        style={{ y: yBg, willChange: 'transform' }}
        className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-burgundy/10 border border-gold/5 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]), willChange: 'transform' }}
        className="absolute -left-20 bottom-1/4 w-96 h-96 rounded-full bg-gold/5 border border-burgundy/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Our Indian Heritage</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-wide">
            The Noble Art of Traditional Indian Perfumery
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </div>

        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div 
            style={{ y: yLeftCol, willChange: 'transform' }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-serif italic text-2xl text-cream">
              "An ancient legacy distilled for the refined modern taste."
            </h3>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-light">
              Attar, or Ittar, represents the pinnacle of pure botanical perfume oils, a historic tradition cherished by royalty for centuries. Originated in ancient India, these precious concentrates are compiled through intense natural extraction, preserving the true soul of wood, earth, and flower petals.
            </p>
            <p className="text-cream/70 text-sm sm:text-base leading-relaxed font-light">
              At <strong className="text-gold font-medium">A-ONE LUXURY FRAGRANCE</strong>, based in Nalgonda, we bridge the sacred gap between pristine legacy distillation and modern charisma. We source from the finest traditional extraction centers to ensure that each drop of our premium oil delivers an immersive royal narrative.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: yRightCol, willChange: 'transform' }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-black/40 border border-gold/10 hover:border-gold/30 p-6 flex flex-col space-y-3 hover:translate-y-[-4px] transition-all duration-300 rounded-none group"
              >
                <div className="p-2 border border-gold/20 bg-burgundy/10 w-fit group-hover:bg-burgundy/30 group-hover:border-gold transition-all">
                  {v.icon}
                </div>
                <h4 className="font-serif text-lg text-white font-medium tracking-wide mt-2">
                  {v.title}
                </h4>
                <p className="text-cream/60 text-xs leading-relaxed font-light">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
