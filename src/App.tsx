/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
// CustomCursor disabled for performance optimization
// import CustomCursor from './components/CustomCursor';
import WhatsAppWidget from './components/WhatsAppWidget';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About'));
const LuxuryStats = lazy(() => import('./components/LuxuryStats'));
const ScentQuiz = lazy(() => import('./components/ScentQuiz'));
const AttarCollection = lazy(() => import('./components/AttarCollection'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ScentGuide = lazy(() => import('./components/ScentGuide'));
const OrderForm = lazy(() => import('./components/OrderForm'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [selectedAttarName, setSelectedAttarName] = useState<string>('');

  const handleSelectAttar = (name: string) => {
    setSelectedAttarName(name);
    // Smoothly scroll down to the order section
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="luxury-app-wrapper" className="min-h-screen bg-luxury-black text-cream selection:bg-gold selection:text-black antialiased">
      {/* Luxury Trailing Cursor for Desktop - DISABLED for performance */}
      {/* <CustomCursor /> */}

      {/* Cinematic animated logo reveal on first visit */}
      <LoadingScreen />

      {/* Dynamic Sticky Header */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="relative flex flex-col">
        {/* Cinematic Hero Header Block */}
        <Hero />

        {/* Brand Lore / About Indian Attars */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-gold">Loading...</div>}>
          <About />
        </Suspense>

        {/* Luxury Trust Indicators & Stat Counters */}
        <Suspense fallback={<div className="h-32 flex items-center justify-center text-gold">Loading...</div>}>
          <LuxuryStats />
        </Suspense>

        {/* Interactive Matchmaking Questionnaire */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-gold">Loading...</div>}>
          <ScentQuiz onSelectAttar={handleSelectAttar} />
        </Suspense>

        {/* Premium Products Showcase */}
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-gold">Loading...</div>}>
          <AttarCollection onSelectAttar={handleSelectAttar} />
        </Suspense>

        {/* Social Proof / Testimonials for luxury validity */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-gold">Loading...</div>}>
          <Testimonials />
        </Suspense>

        {/* Art of wearing, storage & perfume vs oil comparisons */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-gold">Loading...</div>}>
          <ScentGuide />
        </Suspense>

        {/* Highly Interactive Booking & Secure Validation Order Desk */}
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-gold">Loading...</div>}>
          <OrderForm
            selectedAttarName={selectedAttarName}
            setSelectedAttarName={setSelectedAttarName}
          />
        </Suspense>

        {/* Interactive Boutique contact cards and detailed map layout */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-gold">Loading...</div>}>
          <Contact />
        </Suspense>
      </main>

      {/* Elegant Copyright and Social Footer layout */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center text-gold">Loading...</div>}>
        <Footer />
      </Suspense>

      {/* Floating persistent support widget */}
      <WhatsAppWidget />
    </div>
  );
}
