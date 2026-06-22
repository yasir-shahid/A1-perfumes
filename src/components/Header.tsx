import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageSquare } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Heritage', href: '#about' },
    { name: 'Finder', href: '#quiz' },
    { name: 'The Collection', href: '#collection' },
    { name: 'Gift Sets', href: '#bundles' },
    { name: 'Scent Guide', href: '#guide' },
    { name: 'Book Session', href: '#order' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-black/95 backdrop-blur-md border-b border-gold/20 shadow-lg py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="header-logo-link"
            className="flex items-center space-x-3.5 group focus:outline-none"
          >
            <div className="logo-wrapper flex-shrink-0">
              <img
                src="/src/assets/images/aone_official_logo_1779446749622.png"
                alt="A ONE LUXURY FRAGRANCE"
                className="logo-img"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left pl-1">
              <span className="font-serif text-base tracking-[0.2em] text-white font-bold leading-tight group-hover:text-gold transition-colors">
                A-ONE
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-medium font-mono">
                LUXURY FRAGRANCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-widest uppercase text-cream/90 hover:text-gold hover:border-b hover:border-gold/30 pb-1 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call to Action WhatsApp */}
          <div className="hidden sm:flex items-center">
            <a
              href="https://wa.me/917799020387?text=Hello%20A%20ONE%20Luxury%20Fragrance%20team,%20I%20am%20interested%20in%20your%20attars."
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-cta"
              className="flex items-center space-x-2 px-4 py-2 border border-gold hover:bg-gold hover:text-black rounded-none text-xs uppercase tracking-widest text-gold transition-all duration-300 font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Contact Boutique</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-cream p-1 hover:text-gold focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-panel" className="lg:hidden bg-luxury-black/98 border-b border-gold/20">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-sm tracking-widest uppercase text-cream/80 hover:text-gold hover:bg-burgundy/20 transition-all font-light"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-4">
              <a
                href="https://wa.me/917799020387?text=Hello%20A%20ONE%20Luxury%20Fragrance,%20I%20would%20like%20to%20inquire%20about%20your%20premium%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-3 bg-gold hover:bg-gold-light text-black uppercase tracking-widest text-xs font-semibold transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
