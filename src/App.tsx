import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SignatureParathas } from './components/SignatureParathas';
import { DealsSection } from './components/DealsSection';
import { FullMenu } from './components/FullMenu';
import { ReviewsSection } from './components/ReviewsSection';
import { FoodGallery } from './components/FoodGallery';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from './data/menuData';

export default function App() {
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
              
              {/* Top Navigation */}
              <Navbar onOpenOrders={() => setIsOrdersModalOpen(true)} />

              {/* Main Content Sections */}
              <main className="flex-1">
                <Hero />
                <AboutSection />
                <SignatureParathas />
                <DealsSection />
                <FullMenu />
                <ReviewsSection />
                <FoodGallery />
                <LocationContact />
              </main>

              {/* Footer */}
              <Footer />

              {/* Slide-over Cart & Order Drawer */}
              <CartDrawer />

              {/* User Order History Modal */}
              <OrderHistoryModal
                isOpen={isOrdersModalOpen}
                onClose={() => setIsOrdersModalOpen(false)}
              />

              {/* Floating Persistent WhatsApp Quick-Contact Button (Bottom Right) */}
              <aside 
                aria-label="Contact actions"
                className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5"
              >
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Salam Paratha Plus! I would like to order or inquire from your website.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-950/70 border border-emerald-400/30 transition-all hover:scale-105 active:scale-95"
                  title="Chat with Paratha Plus on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span className="text-xs font-bold hidden sm:inline-block">
                    Order on WhatsApp
                  </span>
                </a>
              </aside>

            </div>
          </FavoritesProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
