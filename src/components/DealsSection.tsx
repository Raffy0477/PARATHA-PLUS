import React from 'react';
import { 
  Sparkles, 
  Users, 
  CheckCircle, 
  ShoppingBag, 
  Flame, 
  Tag, 
  MessageCircle,
  Clock
} from 'lucide-react';
import { SPECIAL_DEALS, RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { DealItem, MenuItem } from '../types';

export const DealsSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddDealToCart = (deal: DealItem) => {
    // Convert Deal into MenuItem format for cart
    const dealMenuItem: MenuItem = {
      id: deal.id,
      name: deal.title,
      category: 'deals',
      price: deal.price,
      originalPrice: deal.originalPrice,
      description: `${deal.subtitle} (${deal.itemsIncluded.join(', ')})`,
      image: deal.image,
      badge: deal.badge,
    };
    addToCart(dealMenuItem, 1);
  };

  return (
    <section id="deals" className="py-20 bg-stone-950 text-white relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-400">
            <Flame className="w-3.5 h-3.5" />
            Unbeatable Value
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
            Special Deals & <span className="text-amber-500">Combos</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Carefully curated sets for midnight cravings, student budgets, and family weekend feasts in Rahim Yar Khan.
          </p>
        </div>

        {/* Deals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPECIAL_DEALS.map((deal) => {
            return (
              <div
                key={deal.id}
                className="bg-stone-900/90 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl group"
              >
                {/* Image and Top info */}
                <div className="relative aspect-[16/9] overflow-hidden bg-stone-950">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      SAVE {deal.discountPercentage}%
                    </span>
                    <span className="bg-stone-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-stone-800">
                      {deal.badge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md text-stone-200 text-xs font-medium px-3 py-1 rounded-full border border-stone-800 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    {deal.serves}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                      {deal.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {deal.title}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm">
                      {deal.subtitle}
                    </p>
                  </div>
                </div>

                {/* Deal Items Breakdown */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs uppercase font-bold text-stone-400 tracking-wider">
                      Included in this Combo:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {deal.itemsIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-200">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Order Action */}
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-amber-400">
                          Rs. {deal.price}
                        </span>
                        <span className="text-sm text-stone-500 line-through">
                          Rs. {deal.originalPrice}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-semibold block">
                        Net Savings: Rs. {deal.originalPrice - deal.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* WhatsApp direct order */}
                      <a
                        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Salam Paratha Plus! I want to order the combo deal: *${deal.title}* (Rs. ${deal.price}) for delivery/takeaway in Rahim Yar Khan.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all"
                        title="Order combo via WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>

                      <button
                        onClick={() => handleAddDealToCart(deal)}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-lg transition-all active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Deal</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
