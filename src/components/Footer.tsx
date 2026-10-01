import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-stone-950 font-black text-xl">
                P+
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wider font-serif-title uppercase">
                  PARATHA <span className="text-amber-500">PLUS</span>
                </span>
                <p className="text-xs text-amber-400/90 font-medium italic">
                  “Taste That Brings You Back.”
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Rahim Yar Khan's benchmark for authentic stuffed parathas, crisp lachha dough, melt-in-mouth kebab rolls, and traditional clay-cup Karak Doodh Patti Chai. Made with love and 100% pure desi ghee.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 hover:border-blue-500/50 flex items-center justify-center text-stone-300 hover:text-blue-400 transition-colors text-xs font-bold"
              >
                FB
              </a>
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 hover:border-pink-500/50 flex items-center justify-center text-stone-300 hover:text-pink-400 transition-colors text-xs font-bold"
              >
                IG
              </a>
              <a
                href={RESTAURANT_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 hover:border-white/50 flex items-center justify-center text-stone-300 hover:text-white transition-colors text-xs font-bold"
              >
                TT
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold"
              >
                WA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">Our Story & Craft</a>
              </li>
              <li>
                <a href="#signatures" className="hover:text-amber-400 transition-colors">Signature Parathas</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">Full Food Menu</a>
              </li>
              <li>
                <a href="#deals" className="hover:text-amber-400 transition-colors">Special Deals & Combos</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">Food Gallery</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">Location & Timings</a>
              </li>
            </ul>
          </div>

          {/* Location & Timings */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Rahim Yar Khan Outlet
            </h4>
            
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Open 7 Days: 6:00 AM – 2:00 AM</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Hotline: {RESTAURANT_INFO.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {RESTAURANT_INFO.whatsappDisplay}</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Salam Paratha Plus! I would like to order parathas.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp Now</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-stone-500 text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-stone-300">PARATHA PLUS</strong> (Faisal Road, Rahim Yar Khan). All rights reserved. “Taste That Brings You Back.”
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors p-2 rounded-lg hover:bg-stone-900"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
