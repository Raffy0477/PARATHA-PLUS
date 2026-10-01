import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  ShoppingBag, 
  Heart, 
  Star, 
  Sparkles, 
  Coffee, 
  Check, 
  X,
  MessageCircle,
  Filter
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { MenuItem, MenuCategory } from '../types';

export const FullMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'spicy' | 'veg' | 'sweet'>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [specialNote, setSpecialNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const categories: { key: MenuCategory; label: string; icon?: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'signature', label: '🔥 Signatures' },
    { key: 'stuffed', label: '🫓 Stuffed & Savory' },
    { key: 'rolls', label: '🌯 Paratha Rolls' },
    { key: 'sweet', label: '🍫 Sweet & Meetha' },
    { key: 'sides', label: '☕ Chai & Sides' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(item.urduName && item.urduName.includes(searchQuery))
      ) {
        return false;
      }
      // Dietary filter
      if (selectedDiet === 'spicy' && !item.isSpicy) return false;
      if (selectedDiet === 'veg' && !item.isVegetarian) return false;
      if (selectedDiet === 'sweet' && !item.isSweet) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, selectedDiet]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSpecialNote('');
    setQuantity(1);
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;
    addToCart(customizingItem, quantity, specialNote);
    setCustomizingItem(null);
  };

  return (
    <section id="menu" className="py-20 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            Fresh From The Tawa
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
            Our Complete <span className="text-amber-500">Menu</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Prepared to order using pure ingredients, authentic seasonings, and golden desi ghee.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Search & Quick Diet Chips */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search paratha, roll, chai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-stone-400 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                Filter:
              </span>
              {[
                { key: 'all', label: 'All' },
                { key: 'spicy', label: '🌶️ Spicy' },
                { key: 'veg', label: '🥗 Vegetarian' },
                { key: 'sweet', label: '🍯 Sweet' },
              ].map((diet) => (
                <button
                  key={diet.key}
                  onClick={() => setSelectedDiet(diet.key as any)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedDiet === diet.key
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-500'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40'
                    : 'bg-stone-950/70 text-stone-300 hover:bg-stone-800 hover:text-amber-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-950/50 rounded-3xl border border-stone-800">
            <p className="text-stone-400 text-base">No items match your search or filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedDiet('all');
              }}
              className="mt-4 text-xs font-bold text-amber-400 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isFav = !!favorites[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-stone-950/80 rounded-2xl overflow-hidden border border-stone-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20"></div>

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      {item.badge && (
                        <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          🌶️
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-red-400 backdrop-blur-sm transition-all"
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Rating */}
                    <div className="absolute bottom-2 right-2 bg-stone-950/80 backdrop-blur-sm text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {item.rating || 4.8}
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                      </div>
                      {item.urduName && (
                        <p className="text-[11px] text-amber-300/70 font-medium font-serif-title">
                          {item.urduName}
                        </p>
                      )}
                      <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-stone-400 text-[10px] block">Price</span>
                        <span className="text-base font-black text-amber-400">
                          Rs. {item.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenCustomize(item)}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs border border-stone-800 hover:border-stone-700 transition-colors"
                          title="Special instructions / Customize"
                        >
                          Custom
                        </button>

                        <button
                          onClick={() => addToCart(item, 1)}
                          className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all shadow-md active:scale-95"
                          title="Add to cart"
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Customize & Cooking Instructions */}
        {customizingItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-md w-full p-6 space-y-5 text-white shadow-2xl relative">
              <button
                onClick={() => setCustomizingItem(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-amber-500/30"
                />
                <div>
                  <h3 className="font-bold text-base text-white">
                    {customizingItem.name}
                  </h3>
                  <p className="text-amber-400 font-extrabold text-sm">
                    Rs. {customizingItem.price}
                  </p>
                  <p className="text-stone-400 text-xs">
                    Faisal Road Paratha Plus Kitchen
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center font-bold text-stone-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center font-bold text-stone-300 hover:text-white"
                  >
                    +
                  </button>
                  <span className="text-xs text-stone-400 ml-auto">
                    Subtotal: <strong className="text-amber-400">Rs. {customizingItem.price * quantity}</strong>
                  </span>
                </div>
              </div>

              {/* Cooking Instructions input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Special Cooking Instructions (Optional)
                </label>
                <textarea
                  placeholder="e.g. Extra crispy on the tawa, less green chilies, packing raita separately..."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  maxLength={200}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none h-20"
                />
                <span className="text-[10px] text-stone-500 block text-right">
                  {specialNote.length}/200
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomizedToCart}
                  className="w-1/2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md"
                >
                  Add to Cart (Rs. {customizingItem.price * quantity})
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
