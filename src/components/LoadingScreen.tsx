import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="global-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-6 selection:bg-transparent"
        >
          {/* Symmetrical luxury frames */}
          <div className="absolute inset-8 border border-gold/10 pointer-events-none"></div>
          <div className="absolute inset-10 border border-gold/5 pointer-events-none"></div>

          <div className="space-y-6 max-w-md z-10">
            {/* Spinning Laurel representation or logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="flex justify-center"
            >
              <div className="loader-logo-wrapper">
                <img
                  src="/src/assets/images/aone_official_logo_1779446749622.png"
                  alt="A ONE LUXURY FRAGRANCE"
                  className="loader-logo-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-3"
            >
              <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.3em] font-semibold text-white">
                A ONE
              </h1>
              <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
              <h2 className="text-[10px] tracking-[0.4em] uppercase text-gold font-mono">
                LUXURY FRAGRANCE
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-[10px] tracking-[0.15em] uppercase text-cream/80 font-mono italic"
            >
              Distilling Timeless Elegance
            </motion.p>
          </div>

          <div className="absolute bottom-12 text-[9px] font-mono tracking-widest text-[#D4AF37]/40 uppercase pointer-events-none">
            A-1 Luxury Paints Store, MLG Road, Nalgonda
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
