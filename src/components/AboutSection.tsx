import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  UtensilsCrossed, 
  Coffee, 
  MapPin, 
  MessageCircle,
  Clock
} from 'lucide-react';
import { ambianceImg, RESTAURANT_INFO } from '../data/menuData';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Hand-Rolled 32-Fold Lachha Technique',
      description: 'Each paratha is stretched, buttered with pure desi ghee, coiled, and griddled till the outer ring shatters with a satisfying crunch while the inner folds remain pillowy soft.',
      icon: UtensilsCrossed,
    },
    {
      title: 'Farm-Fresh Halal Poultry & Prime Meats',
      description: 'We source daily fresh cuts marinated in our secret 12-spice blend of roasted cumin, crushed pomegranate seeds, and fresh coriander for unbeatable depth of flavor.',
      icon: CheckCircle2,
    },
    {
      title: 'Authentic Karak Doodh Patti Chai',
      description: 'Slow-simmered rich buffalo milk infused with aromatic green cardamom pods and premium tea leaves, served piping hot in earthen clay matkas.',
      icon: Coffee,
    },
    {
      title: 'Hygienic Family Hall & Express Takeaway',
      description: 'Air-conditioned family seating on Faisal Road, spotless open viewing kitchen, and specialized heat-retention packaging for takeaway and doorstep delivery.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-20 bg-stone-900 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage & Craft
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
            About <span className="text-amber-500">PARATHA PLUS</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Born out of love for authentic Pakistani street gastronomy, right here on Faisal Road, Rahim Yar Khan.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Ambiance Story */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800 group">
              <img
                src={ambianceImg}
                alt="Paratha Plus Faisal Road Rahim Yar Khan ambiance and dining hall"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
              
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-amber-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    Faisal Road Branch • Rahim Yar Khan
                  </span>
                </div>
                <p className="text-white font-bold text-base sm:text-lg leading-snug">
                  “Taste That Brings You Back.”
                </p>
                <p className="text-stone-400 text-xs mt-1">
                  Serving families, students, doctors, and travelers passing through Rahim Yar Khan 7 days a week.
                </p>
              </div>
            </div>

            {/* Corner Decorative Badge */}
            <div className="absolute -top-4 -right-4 bg-amber-500 text-stone-950 font-black px-4 py-2.5 rounded-2xl shadow-xl transform rotate-3 text-xs tracking-wider uppercase">
              100% Desi Ghee
            </div>
          </div>

          {/* Right Column: Story & 4 Core Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-stone-300 leading-relaxed">
              <h3 className="text-2xl font-bold text-white font-serif-title">
                Redefining the Paratha Experience in Southern Punjab
              </h3>
              <p>
                At <strong className="text-amber-400">PARATHA PLUS</strong>, we believe a great paratha is more than just breakfast—it is a comforting emotion. Whether it’s 7:00 AM on a misty winter morning or 1:00 AM after a late hospital shift or road trip, our griddles sizzle non-stop with the finest ingredients.
              </p>
              <p>
                We took traditional Punjabi and Multani home recipes and combined them with contemporary favorites: molten cheeses, succulent chargrilled boti, and sweet hazelnut treats, pairing them with the city's thickest, cream-rich Karak Matka Chai.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/40 transition-colors space-y-2"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Location & Quick CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Salam! I want to visit or order from Paratha Plus Faisal Road.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="#location"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Find Us on Faisal Road</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
