import { Sparkles, MessageSquare, Phone, Instagram, Facebook, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gold/15 py-16 text-center relative overflow-hidden">
      {/* Absolute faint background line accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Brand identity */}
        <div className="flex flex-col items-center justify-center space-y-3.5">
          <div className="logo-wrapper">
            <img
              src="/images/aone_official_logo_1779446749622.png"
              alt="A ONE LUXURY FRAGRANCE"
              loading="lazy"
              className="logo-img"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.25em] text-white font-semibold">
              A-ONE
            </span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-gold font-medium font-mono">
              LUXURY FRAGRANCE
            </span>
          </div>
          <p className="text-cream/50 font-serif italic text-xs max-w-sm">
            "Experience Timeless Elegance in Every Drop."
          </p>
        </div>

        {/* Quick Social Anchors */}
        <div className="flex justify-center items-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
            className="p-2 border border-gold/10 hover:border-gold hover:bg-gold/10 text-cream hover:text-gold transition-all"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="p-2 border border-gold/10 hover:border-gold hover:bg-gold/10 text-cream hover:text-gold transition-all"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://wa.me/917799020387"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Hotline"
            className="p-2 border border-gold/10 hover:border-gold hover:bg-gold/10 text-cream hover:text-gold transition-all"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
          <a
            href="tel:+918142979518"
            aria-label="Phone Line 2"
            className="p-2 border border-gold/10 hover:border-gold hover:bg-gold/10 text-cream hover:text-gold transition-all"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>

        {/* Footer navigational map anchors for premium scrolling */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-mono tracking-widest uppercase text-cream/70">
          <a href="#home" className="hover:text-gold transition-colors">Home</a>
          <span>•</span>
          <a href="#about" className="hover:text-gold transition-colors">Heritage</a>
          <span>•</span>
          <a href="#quiz" className="hover:text-gold transition-colors">Scent Finder</a>
          <span>•</span>
          <a href="#collection" className="hover:text-gold transition-colors">Collection</a>
          <span>•</span>
          <a href="#guide" className="hover:text-gold transition-colors">Guide</a>
          <span>•</span>
          <a href="#order" className="hover:text-gold transition-colors">Booking Desk</a>
          <span>•</span>
          <a href="#contact" className="hover:text-gold transition-colors">Boutique Finder</a>
        </div>

        {/* Copyrights info with elegant attribution */}
        <div className="border-t border-gold/10 pt-8 text-center space-y-2">
          <p className="text-[10px] font-mono text-cream/40 uppercase tracking-widest">
            &copy; {currentYear} A-ONE LUXURY FRAGRANCE. All Rights Reserved.
          </p>
          <p className="text-[9px] text-gold/50 font-light tracking-wide italic">
             Traditional Attars of Indian Heritage • Base: A-1 Luxury Paints Store, MLG Road, Nalgonda - 508001
          </p>
        </div>

      </div>
    </footer>
  );
}
