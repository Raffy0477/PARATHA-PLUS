import React from 'react';
import { 
  Star, 
  Flame, 
  ShoppingBag, 
  Heart, 
  Clock, 
  Sparkles, 
  Check, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { MenuItem } from '../types';

export const SignatureParathas: React.FC = () => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const signatureItems = MENU_ITEMS.filter((item) => item.isSignature || item.isPopular).slice(0, 6);

  return (
    <section id="signatures" className="py-20 bg-stone-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Crowd Favorites
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
              Signature <span className="text-amber-500">Parathas</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl">
              Our iconic recipes that earned PARATHA PLUS the reputation of “Taste That Brings You Back.” Loaded with generous fillings and cooked golden crisp on the tawa.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 group"
          >
            <span>View All 35+ Items in Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureItems.map((item: MenuItem) => {
            const isFav = !!favorites[item.id];

            return (
              <div
                key={item.id}
                className="group relative bg-stone-900/90 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {item.badge && (
                      <span className="bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Spicy
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-red-400 backdrop-blur-md transition-all border border-stone-800"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    aria-label="Toggle favorite dish"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Prep time badge */}
                  {item.preparationTime && (
                    <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-md text-stone-300 text-[11px] px-2.5 py-1 rounded-lg border border-stone-800/80 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {item.preparationTime}
                    </div>
                  )}

                  {/* Rating badge */}
                  <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-stone-800/80 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating || 4.9}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      {item.urduName && (
                        <span className="text-xs text-amber-400/80 font-medium font-serif-title tracking-wider shrink-0">
                          {item.urduName}
                        </span>
                      )}
                    </div>
                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Price</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-amber-400">
                          Rs. {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-stone-500 line-through">
                            Rs. {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Direct WhatsApp Order */}
                      <a
                        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Salam Paratha Plus! I want to order 1x *${item.name}* (Rs. ${item.price}) right away to Faisal Road RYK area.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      {/* Add to Cart */}
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
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
