import { MessageSquare } from 'lucide-react';

export default function WhatsAppWidget() {
  const handleSendMessage = () => {
    const text = "Hi! I want to visit your store and enquire about attars";
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918142979518?text=${encoded}`, '_blank');
  };

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-6 right-6 z-[45] font-sans pointer-events-none">
      {/* Floating Toggle Button - Always Visible */}
      <button
        onClick={handleSendMessage}
        id="whatsapp-widget-toggle-btn"
        className="px-5 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_40px_rgba(214,175,55,0.4)] transition-all duration-300 flex items-center space-x-2.5 relative cursor-pointer group pointer-events-auto border border-gold/40 hover:scale-105 active:scale-95"
        aria-label="Direct WhatsApp Live Chat"
      >
        <MessageSquare className="h-5 w-5 text-white animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide font-sans whitespace-nowrap">
          WhatsApp Live Chat
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border border-white"></span>
      </button>
    </div>
  );
}

