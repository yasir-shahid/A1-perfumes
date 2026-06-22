import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yLeftCol = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yRightCol = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const storeInfo = {
    name: 'A-ONE LUXURY FRAGRANCE',
    address: 'A-1 Luxury Paints Store, MLG Road, Nalgonda - 508001, Telangana, India',
    phone: '+91 77990 20387',
    email: 'info@aoneluxuryfragrance.com',
    hours: '11:00 AM - 10:30 PM (Daily)',
  };

  return (
    <section id="contact" ref={containerRef} className="py-24 bg-luxury-black border-t border-gold/15 relative overflow-hidden">
      {/* Drifting background glow */}
      <motion.div 
        style={{ y: yBg, willChange: 'transform' }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [60, -60]), willChange: 'transform' }}
        className="absolute top-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Boutique Location</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-wide">
            Visit Our Fragrance House
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Card left: details */}
          <motion.div 
            style={{ y: yLeftCol, willChange: 'transform' }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-black/50 border border-gold/15 p-8 sm:p-10 relative"
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold"></div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-white font-semibold tracking-wide">
                A-ONE Boutique
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed font-light">
                Step into an atmosphere of sensory magic. Experience raw essence testing, consultation on dry-downs, and find the perfect match curated for your aura.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-burgundy/20 border border-gold/20 text-gold mt-1">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">Address</h4>
                  <p className="text-cream/90 text-sm mt-1 font-light leading-relaxed">
                    {storeInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-burgundy/20 border border-gold/20 text-gold mt-1">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">Phone & WhatsApp</h4>
                  <p className="text-white text-sm mt-1 font-mono hover:text-gold transition-colors">
                    <a href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`}>{storeInfo.phone}</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-burgundy/20 border border-gold/20 text-gold mt-1">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">Inquiries</h4>
                  <p className="text-white text-sm mt-1 font-mono hover:text-gold transition-colors">
                    <a href={`mailto:${storeInfo.email}`}>{storeInfo.email}</a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-burgundy/20 border border-gold/20 text-gold mt-1">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">Salon Hours</h4>
                  <p className="text-cream text-sm mt-1 font-mono">
                    {storeInfo.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Live Chat triggers */}
            <div className="pt-6 border-t border-gold/10">
              <a
                href="https://wa.me/917799020387?text=Hello!%20I%20am%20calling%20from%20A-ONE%20Luxury%20Fragrance%20website%20and%20want%20to%20visit%20your%20store."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-xs tracking-widest uppercase py-3 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Instant Store WhatsApp Chat</span>
              </a>
            </div>
          </motion.div>

          {/* Card right: Google Map Embed / Interactive Map */}
          <motion.div 
            style={{ y: yRightCol, willChange: 'transform' }}
            className="lg:col-span-7 flex flex-col bg-black/50 border border-gold/15 p-4 relative min-h-[500px]"
          >
            {/* Elegant outer grid corner details */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold"></div>

            <div className="flex-grow w-full h-full relative group overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 border border-gold/5 flex flex-col justify-between p-5 space-y-4">
              
              {/* Map Title/Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold">Nalgonda Boutique Map</span>
                  <p className="text-white font-serif text-lg font-semibold mt-0.5">MLG Road Terminal</p>
                </div>
                <div className="text-right text-[10px] font-mono text-cream/40 uppercase tracking-wider">
                  <span>Lat: 17.0426° N</span>
                  <br />
                  <span>Long: 79.2625° E</span>
                </div>
              </div>

              {/* Live Google Maps Interactive Iframe */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:flex-grow border border-gold/20 bg-black overflow-hidden">
                {/* Visual loading mask with golden hint */}
                <div className="absolute inset-0 bg-neutral-950 -z-10 animate-pulse"></div>
                
                <iframe
                  title="A-ONE Luxury Fragrance Store Location"
                  className="w-full h-full filter grayscale contrast-115 brightness-95 opacity-80 hover:opacity-100 hover:filter-none transition-all duration-700"
                  src="https://maps.google.com/maps?q=A-1%20Luxury%20Paints,%20MLG%20Road,%20Nalgonda&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Ultra-luxury golden corner accents inside map */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold/40 pointer-events-none"></div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/40 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/40 pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold/40 pointer-events-none"></div>
              </div>

              {/* Real Google Maps Direct Navigation Link */}
              <div className="relative z-10 border-t border-gold/10 pt-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <span className="text-cream/50 font-mono tracking-widest uppercase text-[10px]">Click below for real-time mobile navigation</span>
                <a
                  href="https://maps.app.goo.gl/ipv7VreFV4A2xAHq6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 py-2 px-4 bg-gold hover:bg-gold-light text-black font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] duration-300"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Get Open Directions</span>
                </a>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
