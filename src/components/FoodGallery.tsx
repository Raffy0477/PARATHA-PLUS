import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  X, 
  ZoomIn, 
  ShoppingBag, 
  MessageCircle 
} from 'lucide-react';
import { heroImg, signatureCheeseImg, nutellaImg, ambianceImg, RESTAURANT_INFO } from '../data/menuData';

interface GalleryItem {
  id: string;
  title: string;
  category: 'paratha' | 'rolls' | 'dessert' | 'ambiance';
  image: string;
  description: string;
}

export const FoodGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'paratha' | 'rolls' | 'dessert' | 'ambiance'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Flaky Golden Lachha Feast',
      category: 'paratha',
      image: heroImg,
      description: 'Multiple spiraled layers cooked to a golden crisp in pure desi ghee with mint raita and mixed pickles.',
    },
    {
      id: 'gal-2',
      title: 'Stuffed Chicken Cheese Tikka Burst',
      category: 'paratha',
      image: signatureCheeseImg,
      description: 'Hot melted mozzarella cheese pull with smoky tandoori chicken tikka cubes and roasted spices.',
    },
    {
      id: 'gal-3',
      title: 'Warm Nutella & Pistachio Paratha',
      category: 'dessert',
      image: nutellaImg,
      description: 'Decadent folded dessert paratha drizzled with hazelnut chocolate cream and crushed pistachios.',
    },
    {
      id: 'gal-4',
      title: 'Faisal Road Dine-In Ambiance',
      category: 'ambiance',
      image: ambianceImg,
      description: 'Comfortable family seating hall, warm ambient lighting, and welcoming hospitable staff.',
    },
    {
      id: 'gal-5',
      title: 'Smoky Bihari Kabab Paratha Roll',
      category: 'rolls',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      description: 'Charcoal-grilled bihari beef boti wrapped in crunchy lachha bread with ring onions and imli chutney.',
    },
    {
      id: 'gal-6',
      title: 'Special Karak Doodh Patti Chai',
      category: 'dessert',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      description: 'Boiled thick buffalo milk tea infused with cardamom and saffron in traditional earthen clay matkas.',
    },
    {
      id: 'gal-7',
      title: 'Spiced Aloo Cheese Burst Paratha',
      category: 'paratha',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      description: 'Desi spiced potato mash folded with mozzarella and grilled crisp on the cast-iron tawa.',
    },
    {
      id: 'gal-8',
      title: 'Crispy Chicken Garlic Mayo Roll',
      category: 'rolls',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
      description: 'Tossed chicken boti with house garlic cream, black pepper, and cheddar wrapped for takeaway.',
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <section id="gallery" className="py-20 bg-stone-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Camera className="w-3.5 h-3.5" />
            Visual Feast
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
            Food <span className="text-amber-500">Gallery</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Take a visual tour of our culinary creations, sizzling tawas, and inviting dining hall in Rahim Yar Khan.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { key: 'all', label: 'All Photos' },
              { key: 'paratha', label: '🫓 Stuffed Parathas' },
              { key: 'rolls', label: '🌯 Paratha Rolls' },
              { key: 'dessert', label: '☕ Chai & Meetha' },
              { key: 'ambiance', label: '✨ Ambiance' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === f.key
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/50 aspect-[4/3] cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">
                    {item.title}
                  </h4>
                  <div className="p-1.5 rounded-lg bg-amber-500 text-stone-950">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/80 text-white hover:bg-stone-900 transition-colors border border-stone-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-stone-900">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-serif-title">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {lightboxItem.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-semibold">
                    📍 Faisal Road, Rahim Yar Khan
                  </span>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Salam! I saw *${lightboxItem.title}* in your gallery and want to order it at Paratha Plus.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
