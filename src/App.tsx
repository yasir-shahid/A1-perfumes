/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import LuxuryStats from './components/LuxuryStats';
import ScentQuiz from './components/ScentQuiz';
import AttarCollection from './components/AttarCollection';
import GiftBundles from './components/GiftBundles';
import Testimonials from './components/Testimonials';
import ScentGuide from './components/ScentGuide';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import WhatsAppWidget from './components/WhatsAppWidget';

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
      {/* Luxury Trailing Cursor for Desktop */}
      <CustomCursor />

      {/* Cinematic animated logo reveal on first visit */}
      <LoadingScreen />

      {/* Dynamic Sticky Header */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="relative flex flex-col">
        {/* Cinematic Hero Header Block */}
        <Hero />

        {/* Brand Lore / About Indian Attars */}
        <About />

        {/* Luxury Trust Indicators & Stat Counters */}
        <LuxuryStats />

        {/* Interactive Matchmaking Questionnaire */}
        <ScentQuiz onSelectAttar={handleSelectAttar} />

        {/* Premium Products Showcase */}
        <AttarCollection onSelectAttar={handleSelectAttar} />

        {/* Curated Gifting Box Bundles */}
        <GiftBundles onSelectAttar={handleSelectAttar} />

        {/* Social Proof / Testimonials for luxury validity */}
        <Testimonials />

        {/* Art of wearing, storage & perfume vs oil comparisons */}
        <ScentGuide />

        {/* Highly Interactive Booking & Secure Validation Order Desk */}
        <OrderForm
          selectedAttarName={selectedAttarName}
          setSelectedAttarName={setSelectedAttarName}
        />

        {/* Interactive Boutique contact cards and detailed map layout */}
        <Contact />
      </main>

      {/* Elegant Copyright and Social Footer layout */}
      <Footer />

      {/* Floating persistent support widget */}
      <WhatsAppWidget />
    </div>
  );
}
