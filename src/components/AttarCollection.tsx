import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Search, Compass, MessageSquare, Droplet, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import { FULL_CATALOG_ATTARS } from '../data';
import { FullCatalogAttar } from '../types';

interface CollectionProps {
  onSelectAttar: (name: string) => void;
}

type CategoryType = 'All' | 'Oud Collection' | 'Musk Collection' | 'Floral' | 'Special Collection';

export default function AttarCollection({ onSelectAttar }: CollectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const categories: CategoryType[] = ['All', 'Oud Collection', 'Musk Collection', 'Floral', 'Special Collection'];

  // Clear query helper
  const handleClear = () => {
    setSearchQuery('');
  };

  // Filter items based on Category + Real-time search string
  const filteredAttars = FULL_CATALOG_ATTARS.filter((attar) => {
    const matchesSearch = attar.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || attar.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation Variants for dynamic grid stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14
      }
    }
  };

  return (
    <section
      id="collection"
      ref={containerRef}
      className="py-24 bg-black border-t border-gold/15 relative overflow-hidden"
    >
      {/* Visual Ambient Parallax Lights */}
      <motion.div 
        style={{ y: yBg1, willChange: 'transform' }}
        className="absolute top-1/4 -right-10 w-96 h-96 rounded-full bg-burgundy/5 blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: yBg2, willChange: 'transform' }}
        className="absolute bottom-1/4 -left-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Pricing Catalog</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-wide">
            Our Complete Attar Collection
          </h2>
          <p className="text-cream/70 text-xs sm:text-sm mt-4 font-light leading-relaxed">
            Visit our boutique to experience each fragrance personally
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </div>

        {/* 1. HEADER BANNER ABOVE PRICE LIST */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative p-[1px] overflow-hidden rounded-none bg-gradient-to-r from-gold/10 via-gold/45 to-gold/10">
            <div className="bg-neutral-950/95 py-5 px-6 text-center select-none backdrop-blur-sm">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#D4AF37] block font-bold leading-relaxed">
                ✦ 44 PREMIUM ATTARS & INSPIRED PERFUME SPRAYS (10ML / 30ML) AVAILABLE EXCLUSIVELY IN-STORE ✦
              </span>
              <span className="text-[10px] sm:text-xs font-light text-cream/70 tracking-wider block mt-1.5 leading-relaxed">
                Experience world-class concentrated fragrance oils & daily designer inspired spray alternatives at our Nalgonda counter.
              </span>
            </div>
          </div>
        </div>

        {/* 2. SEARCH & FILTER CONTROLS */}
        <div className="max-w-5xl mx-auto mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input Box */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gold/60" />
              </div>
              <input
                type="text"
                placeholder="Search attar by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950/80 border border-gold/20 focus:border-gold/60 py-3.5 pl-11 pr-10 text-sm text-cream placeholder-cream/30 focus:outline-none focus:ring-1 focus:ring-gold/30 rounded-none transition-all duration-300 font-light backdrop-blur-md"
              />
              {searchQuery && (
                <button 
                  onClick={handleClear}
                  className="absolute inset-y-0 right-3 flex items-center px-1 text-cream/40 hover:text-gold text-xs transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pill-Shaped Buttons */}
            <div className="md:col-span-7 flex flex-wrap gap-2 items-center justify-start md:justify-end">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cream/40 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gold text-black font-semibold border border-gold hover:opacity-90'
                      : 'bg-transparent border border-gold/15 text-cream/60 hover:text-white hover:border-gold/40'
                  }`}
                >
                  {cat.replace(' Collection', '')}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 3. GRID OF PREMIUM CARDS */}
        <AnimatePresence mode="wait">
          {filteredAttars.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {filteredAttars.map((attar: FullCatalogAttar) => (
                <motion.div
                  key={attar.id}
                  variants={itemVariants}
                  className="bg-[#1A1A1A]/80 backdrop-blur-md border border-gold/15 hover:border-gold/40 p-6 sm:p-7 flex flex-col justify-between relative group rounded-none text-left overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(214,175,55,0.12)]"
                >
                  
                  {/* Subtle CSS glass reflection & Shimmer sweep */}
                  <div className="absolute top-0 -left-[100%] w-full h-[300%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[150%] pointer-events-none" />

                  {/* Ornate corner markers */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/30"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/30"></div>
                  
                  <div>
                    {/* Header: S.NO Badge & Category */}
                    <div className="flex items-center justify-between mb-4">
                      {/* S.NO custom gold badge */}
                      <div className="w-8 h-8 rounded-full border border-gold/30 group-hover:border-gold flex items-center justify-center font-mono text-center text-[10px] text-gold font-bold transition-colors">
                        {String(attar.sNo).padStart(2, '0')}
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-[#D4AF37]/80 uppercase px-2 py-0.5 bg-burgundy/10 border border-gold/10">
                        {attar.category}
                      </span>
                    </div>

                    {/* Attar Name */}
                    <h3 className="font-serif text-2xl text-gold group-hover:text-white transition-colors tracking-wide leading-tight mb-6">
                      {attar.name}
                    </h3>

                    {/* Price Badge Rows */}
                    <div className="space-y-3.5">
                      {/* 3 ML Row */}
                      <div className="flex items-center justify-between border-b border-gold/5 pb-2.5 px-1 py-1 hover:bg-gold/5 group/row1 transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-cream">
                            <Droplet className="w-3.5 h-3.5 text-gold/70 fill-gold/10 group-hover/row1:fill-gold/40 transition-all duration-300" />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-cream/80 group-hover/row1:text-white">3 ML Volume</span>
                        </div>
                        <span className="text-gold font-mono font-semibold text-xs tracking-wider transition-all duration-300 group-hover/row1:scale-105">
                          ₹{attar.prices.ml3}
                        </span>
                      </div>

                      {/* 6 ML Row */}
                      <div className="flex items-center justify-between border-b border-gold/5 pb-2.5 px-1 py-1 hover:bg-gold/5 group/row2 transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-[-4px] text-cream">
                            <Droplet className="w-3.5 h-3.5 text-gold/70 fill-gold/10 group-hover/row2:fill-gold/40 transition-all duration-300" />
                            <Droplet className="w-3.5 h-3.5 text-gold/80 fill-gold/10 group-hover/row2:fill-gold/40 transition-all duration-300" />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-cream/80 group-hover/row2:text-white">6 ML Volume</span>
                        </div>
                        <span className="text-gold font-mono font-semibold text-xs tracking-wider transition-all duration-300 group-hover/row2:scale-105">
                          ₹{attar.prices.ml6}
                        </span>
                      </div>

                      {/* 12 ML Row */}
                      <div className="flex items-center justify-between border-b border-gold/5 pb-2.5 px-1 py-1 hover:bg-gold/5 group/row3 transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-[-6px] text-cream">
                            <Droplet className="w-3.5 h-3.5 text-gold/70 fill-gold/10 group-hover/row3:fill-gold/40 transition-all duration-300" />
                            <Droplet className="w-3.5 h-3.5 text-gold/80 fill-gold/10 group-hover/row3:fill-gold/40 transition-all duration-300" />
                            <Droplet className="w-3.5 h-3.5 text-gold/90 fill-gold/10 group-hover/row3:fill-gold/40 transition-all duration-300" />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-cream/80 group-hover/row3:text-white">12 ML Volume</span>
                        </div>
                        <span className="text-gold font-mono font-semibold text-xs tracking-wider transition-all duration-300 group-hover/row3:scale-105">
                          ₹{attar.prices.ml12}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Link Option */}
                  <div className="mt-8 space-y-3">
                    <button
                      onClick={() => onSelectAttar(attar.name)}
                      className="w-full bg-transparent hover:bg-gold border border-gold/30 hover:border-gold text-gold hover:text-black py-3 px-4 rounded-none text-[9px] tracking-[0.25em] font-mono uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Compass className="h-3.5 w-3.5" />
                      <span>BUY NOW</span>
                    </button>
                    <p className="text-center text-[10px] text-cream/50 font-light leading-relaxed">
                      Place your order via WhatsApp Live Chat or book a personalized perfume consultation with our experts.
                    </p>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* 4. Elegant No Matches Fallback */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 border border-gold/10 bg-neutral-950/40 backdrop-blur-md max-w-xl mx-auto"
            >
              <Sparkles className="h-10 w-10 text-gold/40 mx-auto mb-4 animate-pulse" />
              <h4 className="font-serif text-lg text-white font-medium uppercase tracking-wider">No Fragrances Found</h4>
              <p className="text-cream/50 text-xs mt-2 max-w-sm mx-auto font-light leading-relaxed">
                We couldn't find any premium attars matching "{searchQuery}" in our {selectedCategory !== 'All' ? selectedCategory : 'complete catalog'}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-6 px-5 py-2 border border-gold/30 text-gold hover:text-black hover:bg-gold font-mono text-[9px] uppercase tracking-widest transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. PRICE DISCLAIMER FOOTER */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-cream/40 text-[10px] leading-relaxed font-light tracking-wide italic">
            * Prices are per bottle. All attars are 100% pure oils. Visit our store for the complete collection and personalized fragrance consultation.
          </p>
        </div>

      </div>
    </section>
  );
}
