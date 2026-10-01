import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  Star, 
  ChevronRight, 
  ShieldCheck, 
  Award,
  MessageCircle
} from 'lucide-react';
import { heroImg, signatureCheeseImg, RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';

export const Hero: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <section id="home" className="relative overflow-hidden bg-stone-950 text-white pt-8 pb-16 lg:py-20">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      
      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand & Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Brand Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                Rahim Yar Khan's #1 Paratha House
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 border border-stone-800 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Faisal Road
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Crispy. Flaky.{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  Stuffed to Perfection.
                </span>
              </h1>
              
              {/* Prominent Brand & Tagline */}
              <div className="pt-2">
                <p className="text-lg sm:text-xl font-bold tracking-wide text-amber-400 uppercase font-serif-title">
                  PARATHA PLUS
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-tight font-serif-title">
                  “Taste That Brings You Back.”
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience the authentic warmth of Pakistan’s favorite culinary tradition. Hand-rolled multi-layered lachha parathas, sizzling chicken cheese tikka bursts, slow-cooked Mughlai keema, and piping hot clay-cup doodh patti chai on Faisal Road.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* Direct WhatsApp Order CTA */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Salam Paratha Plus! I want to order parathas for delivery/takeaway.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Explore Menu CTA */}
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-base px-6 py-3.5 rounded-2xl shadow-xl shadow-amber-950/40 transition-all hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Explore Full Menu</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </a>

              {/* View Deals */}
              <a
                href="#deals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-800 hover:border-amber-500/40 font-semibold text-base px-5 py-3.5 rounded-2xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Special Deals</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Pure Desi Ghee & Fresh Meat
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-amber-400" />
                4.9 Google Rated in RYK
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-400" />
                Fast 20-30 Min Delivery
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual & Floating Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Glow Rim */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/40 via-amber-600/20 to-transparent shadow-2xl">
                <div className="relative rounded-[22px] overflow-hidden bg-stone-900 aspect-[4/3] sm:aspect-square">
                  <img
                    src={heroImg}
                    alt="Paratha Plus Feast spread on rustic table"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                  
                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                        Signature Feast
                      </p>
                      <h4 className="text-white font-extrabold text-base sm:text-lg">
                        Golden Lachha & Stuffed Tikka
                      </h4>
                      <p className="text-stone-400 text-xs">
                        Served with Mint Chutney & Karak Chai
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 line-through">Rs. 550</span>
                      <p className="text-amber-400 font-extrabold text-xl">Rs. 490</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Customer Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-stone-900/95 backdrop-blur-md border border-amber-500/40 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black">
                  <Star className="w-5 h-5 fill-stone-950 text-stone-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-black">
                    <span>4.9 / 5.0</span>
                    <span className="text-stone-400 font-normal text-xs">(850+ Reviews)</span>
                  </div>
                  <p className="text-[11px] text-stone-300 font-medium">
                    Rahim Yar Khan Favorite
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Open Late Night */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-stone-900/95 backdrop-blur-md border border-stone-800 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Midnight Chai & Paratha</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">Open till 2:00 AM Daily</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Statistics Ribbon */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {RESTAURANT_INFO.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800/50 hover:border-amber-500/30 transition-colors">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-stone-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
