import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Sparkles, ChevronLeft, ChevronRight, Droplet, ArrowRight, ShieldCheck } from 'lucide-react';

const PREMIUM_ATTARS_SHOWCASE = [
  {
    sNo: 3,
    id: 'bin-sheikh',
    name: 'BIN SHEIKH',
    category: 'Oud Collection',
    tagline: 'Deep Arabic Heritage',
    description: 'A majestic royal blend heavily enriched with premium deep agarwood resins, warm amber fusion, and rare spices. Loved for its exceptional dry-down and persistent spiritual appeal.',
    prices: { ml3: 130, ml6: 250, ml12: 500 },
    image: '/src/assets/images/ruh_khus_essence_1779296810684.png',
  },
  {
    sNo: 6,
    id: 'oud-kuwaiti',
    name: 'OUD KUWAITI',
    category: 'Oud Collection',
    tagline: 'Mysterious Rich Oasis',
    description: 'A deeply enchanting oriental leather-oud blend that reveals its multi-layered secrets over hours. Warm, majestic, and highly prestigious fragrance of Kuwaiti royal courts.',
    prices: { ml3: 200, ml6: 400, ml12: 800 },
    image: '/src/assets/images/hero_attar_perfume_1779296753194.png',
  },
  {
    sNo: 14,
    id: 'misk-rijali-super',
    name: 'MISK RIJALI SUPER',
    category: 'Musk Collection',
    tagline: 'The King of Creamy Musks',
    description: 'An elite, thick, creamy snow-white musk of supreme concentration. Radiating pure cleanliness, morning freshness, and soft sophisticated luxury that lingers indefinitely.',
    prices: { ml3: 150, ml6: 300, ml12: 600 },
    image: '/src/assets/images/royal_musk_rijali_1779296769471.png',
  },
  {
    sNo: 15,
    id: 'royal-woody',
    name: 'ROYAL WOODY',
    category: 'Special Collection',
    tagline: 'Prestige Sandalwood Symphony',
    description: 'A masterpiece compiling dry native woods, rich sandalwood sap, and luxurious cedarwood undertones. A commanding signature scent of high ambition and status.',
    prices: { ml3: 150, ml6: 300, ml12: 600 },
    image: '/src/assets/images/jannat_e_zuhr_1779296826760.png',
  },
  {
    sNo: 19,
    id: 'white-mushk-spl',
    name: 'WHITE MUSHK SPL',
    category: 'Musk Collection',
    tagline: 'Pristine Powdery Luxury',
    description: 'A delicate yet highly projecting special edition of our pure white musk. Infused with soft floral powdery accords that project an unmatched calming therapeutic aura.',
    prices: { ml3: 150, ml6: 300, ml12: 600 },
    image: '/src/assets/images/royal_musk_rijali_1779296769471.png', // Re-utilizing the premium white musk imagery
  },
  {
    sNo: 23,
    id: 'baccarat-540',
    name: 'BACCARAT 540',
    category: 'Special Collection',
    tagline: 'Bespoke Modern Extrait',
    description: 'A brilliant contemporary masterpiece blending sweet metallic saffron threads, fresh-cut cedar, and rich warm ambergris. The ultimate statement of high-end metropolitan charm.',
    prices: { ml3: 130, ml6: 250, ml12: 500 },
    image: '/src/assets/images/cr7_perfume_1779296789402.png', // Re-utilizing standard premium modern image
  },
  {
    sNo: 44,
    id: 'white-oud-super',
    name: 'WHITE OUD SUPER',
    category: 'Oud Collection',
    tagline: 'The Light Velvet Oud',
    description: 'An outstanding, rare distill combining the profound character of white agarwood with sweet, light undertones of fresh rose-wood. Perfectly clean, majestic and deep.',
    prices: { ml3: 150, ml6: 300, ml12: 600 },
    image: '/src/assets/images/arba_wardath_luxury_1779296847584.png', // Re-utilizing beautiful crystal display image
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Slideshow Active Index State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-sliding cycle
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PREMIUM_ATTARS_SHOWCASE.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const activeAttar = PREMIUM_ATTARS_SHOWCASE[activeIndex];

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % PREMIUM_ATTARS_SHOWCASE.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + PREMIUM_ATTARS_SHOWCASE.length) % PREMIUM_ATTARS_SHOWCASE.length);
  };

  const handleSelectIndex = (index: number) => {
    setIsAutoplay(false);
    setActiveIndex(index);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 lg:pb-0 overflow-hidden bg-gradient-to-b from-black via-luxury-black to-black"
    >
      {/* Cinematic Golden Ornaments & Light Shrines - Parallax Layer */}
      <motion.div 
        style={{ y: yBg1, opacity: opacityFade, willChange: 'transform' }}
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-color-dodge"
      >
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,175,55,0.15)_0,transparent_75%)] blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(128,0,32,0.15)_0,transparent_75%)] blur-3xl"></div>
      </motion.div>

      {/* Floating Sparkles & Gold Dust Particles System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: '110vh', 
              x: `${Math.random() * 100}%`,
              scale: Math.random() * 0.4 + 0.3
            }}
            animate={{ 
              opacity: [0, 0.45, 0.45, 0],
              y: '-10vh',
              x: [
                `${Math.random() * 100}%`, 
                `${Math.random() * 100 + (Math.random() * 10 - 5)}%`,
                `${Math.random() * 100 + (Math.random() * 20 - 10)}%`
              ]
            }}
            transition={{
              duration: Math.random() * 18 + 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -15
            }}
            className="absolute w-1.5 h-1.5 bg-gradient-to-tr from-gold to-cream rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(214,175,55,0.8)]"
          />
        ))}
      </div>

      {/* Floating background texture */}
      <motion.div
        style={{ y: yBg2, opacity: opacityFade, willChange: 'transform' }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
      >
        <div className="absolute top-[30%] right-[15%] w-72 h-72 border border-gold/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 border border-burgundy/15 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: yText, willChange: 'transform' }}
            className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center lg:justify-start space-x-2 text-gold tracking-[0.25em] text-xs uppercase"
            >
              <Sparkles className="h-4 w-4 text-gold animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-mono">Purity • Legacy • Opulence</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-white tracking-wide">
                A-ONE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-cream to-gold">
                  LUXURY FRAGRANCE
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-serif italic text-base sm:text-lg text-cream/95 font-light"
            >
              "Experience Timeless Elegance in Every Drop"
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-cream/70 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm leading-relaxed font-light"
            >
              Discover elite, hand-crafted rich traditional Indian Attars and premium designer-inspired perfume sprays (10ml & 30ml). Highly concentrated pure oils and long-lasting alternative sprays meticulously curated to wrap you in a royal aura.
            </motion.p>

            {/* Featured Premium Attar Mini Stats Banner */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="p-4 bg-neutral-950/60 backdrop-blur-md border border-gold/15 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between max-w-xl mx-auto lg:mx-0 rounded-none shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
            >
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">Live Premium Spotlight</span>
                <span className="font-serif font-medium text-white text-base tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center font-mono text-[9px] border border-gold/20 font-bold">
                    {String(activeAttar.sNo).padStart(2, '0')}
                  </span>
                  {activeAttar.name}
                </span>
                <span className="text-[10px] text-cream/50 block font-mono mt-0.5">{activeAttar.tagline}</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-gold/15 pt-2.5 sm:pt-0 sm:pl-4 flex flex-col justify-center items-start sm:items-end w-full sm:w-auto">
                <span className="text-[10px] text-gold font-mono font-medium">₹{activeAttar.prices.ml3} <span className="text-cream/40 text-[9px]">/3ml</span></span>
                <span className="text-[9px] text-[#D4AF37]/80 font-mono">₹{activeAttar.prices.ml12} <span className="text-cream/40 text-[9px]">/12ml</span></span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <a
                href="#collection"
                id="hero-explore-btn"
                className="px-8 py-4 bg-gradient-to-r from-burgundy to-burgundy-light hover:from-burgundy-light hover:to-burgundy border border-gold/30 text-white font-medium text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-[0_4px_20px_rgba(128,0,32,0.3)] hover:shadow-gold/20 flex items-center justify-center gap-2"
              >
                <span>View Full 44 Price List</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#order"
                id="hero-order-btn"
                className="px-8 py-4 bg-transparent hover:bg-gold/10 border border-gold text-gold font-medium text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 flex items-center justify-center"
              >
                Book Session
              </a>
            </motion.div>
          </motion.div>

          {/* Interactive Premium Attar Showcase Box */}
          <motion.div 
            style={{ y: yImage, willChange: 'transform' }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative w-full"
          >
            {/* The Main Showcase Card */}
            <div className="relative aspect-square max-w-[390px] xs:max-w-[420px] w-full border border-gold/20 p-2.5 bg-[#121212]/90 shadow-[0_15px_50px_rgba(0,0,0,0.85)] group rounded-none">
              
              {/* Gold Corner Badges */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold"></div>

              {/* Dynamic Slideshow Panel */}
              <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 z-10">
                
                {/* Active Image Container with transition */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeAttar.id}
                      src={activeAttar.image}
                      alt={activeAttar.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none"></div>
                </div>

                {/* Card Header Content */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-[10px] tracking-[0.25em] font-mono text-gold bg-black/60 border border-gold/20 px-2.5 py-1">
                    #{String(activeAttar.sNo).padStart(2, '0')} PREMIUM
                  </span>
                  <span className="text-[9px] tracking-widest font-mono text-cream/70 bg-burgundy/40 border border-gold/10 px-2.5 py-1">
                    {activeAttar.category}
                  </span>
                </div>

                {/* Overlaid Navigation Arrows */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 md:p-2 bg-black/80 hover:bg-gold/20 border border-gold/20 text-gold hover:text-white rounded-none pointer-events-auto transition-all cursor-pointer backdrop-blur-xs"
                    aria-label="Previous Premium Attar"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 md:p-2 bg-black/80 hover:bg-gold/20 border border-gold/20 text-gold hover:text-white rounded-none pointer-events-auto transition-all cursor-pointer backdrop-blur-xs"
                    aria-label="Next Premium Attar"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Card Bottom Meta */}
                <div className="relative z-10 mt-auto bg-black/85 backdrop-blur-xs border border-gold/15 p-4 text-left">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] block mb-0.5">
                    {activeAttar.tagline}
                  </span>
                  
                  <h3 className="font-serif text-xl text-white font-medium tracking-wide leading-tight mb-2 uppercase">
                    {activeAttar.name}
                  </h3>
                  
                  <p className="text-cream/80 text-[11px] leading-relaxed font-light mb-3">
                    {activeAttar.description}
                  </p>

                  <div className="h-[1px] bg-gold/10 my-2.5" />

                  {/* Pricing Matrix row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gold/90 font-mono text-[10px]">
                      <Droplet className="h-3.5 w-3.5 text-gold fill-gold/20" />
                      <span>3ML: <strong className="text-white">₹{activeAttar.prices.ml3}</strong></span>
                      <span className="text-gold/20">|</span>
                      <span>6ML: <strong className="text-white">₹{activeAttar.prices.ml6}</strong></span>
                      <span className="text-gold/20">|</span>
                      <span>12ML: <strong className="text-white">₹{activeAttar.prices.ml12}</strong></span>
                    </div>

                    <a
                      href="#order"
                      className="text-[9px] font-mono tracking-wider font-semibold text-gold hover:text-white flex items-center gap-1 uppercase transition-colors"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Horizontal Dock Navigation circles representing 7 premium attars */}
            <div className="flex items-center justify-center gap-2 mt-4 z-10">
              {PREMIUM_ATTARS_SHOWCASE.map((attar, i) => (
                <button
                  key={attar.sNo}
                  onClick={() => handleSelectIndex(i)}
                  className={`relative w-8 h-8 rounded-full border flex items-center justify-center font-mono text-[9px] transition-all cursor-pointer ${
                    activeIndex === i
                      ? 'bg-gold border-gold text-black font-bold scale-110 shadow-[0_0_12px_rgba(214,175,55,0.4)]'
                      : 'bg-black/60 border-gold/20 hover:border-gold/60 text-cream/60 hover:text-gold'
                  }`}
                  aria-label={`View Premium Attar Serial ${attar.sNo}`}
                >
                  {String(attar.sNo).padStart(2, '0')}
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Scroll Down Arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-1">
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40 font-mono">Scroll Down</span>
        <a href="#about" id="hero-arrow-down" className="text-gold animate-bounce p-1 hover:text-white transition-colors">
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
