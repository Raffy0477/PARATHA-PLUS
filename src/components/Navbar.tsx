import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  User as UserIcon, 
  LogOut, 
  Heart, 
  Package, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { RESTAURANT_INFO } from '../data/menuData';

interface NavbarProps {
  onOpenOrders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrders }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { user, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Signatures', href: '#signatures' },
    { name: 'Menu', href: '#menu' },
    { name: 'Deals & Combos', href: '#deals' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200/90 text-xs py-2 px-4 border-b border-amber-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Faisal Road, Rahim Yar Khan
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Open Daily: 6:00 AM – 2:00 AM (Hot Breakfast & Late Night)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${RESTAURANT_INFO.phoneCall}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              {RESTAURANT_INFO.phoneDisplay}
            </a>
            <span className="text-amber-700">|</span>
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp Direct: {RESTAURANT_INFO.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-stone-950/95 backdrop-blur-md shadow-2xl py-3 border-b border-amber-900/30' 
            : 'bg-stone-950/90 backdrop-blur-sm py-4 border-b border-amber-950/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Tagline */}
            <a href="#home" className="group flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-600/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-amber-400 font-extrabold text-xl tracking-tighter">
                  P+
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors">
                    PARATHA <span className="text-amber-500">PLUS</span>
                  </span>
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wide hidden sm:inline-block">
                    RYK
                  </span>
                </div>
                <span className="text-[11px] font-medium text-amber-200/70 tracking-tight italic">
                  “Taste That Brings You Back.”
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-stone-300 hover:text-amber-400 hover:bg-stone-900/80 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp Quick Order Action */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Salam Paratha Plus! I would like to check today\'s special menu and order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all hover:scale-105"
                title="Direct WhatsApp Order"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Order</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 hover:text-amber-400 hover:border-amber-500/50 transition-all hover:scale-105"
                aria-label="View Order Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Authentication & Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-900 border border-amber-500/30 hover:border-amber-500 transition-all"
                  >
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-lg object-cover border border-amber-500/50"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-xs font-medium text-stone-200 hidden md:block max-w-[90px] truncate">
                      {user.displayName?.split(' ')[0] || 'Account'}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {isUserDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl py-2 z-50 text-stone-200"
                      onMouseLeave={() => setIsUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-stone-800">
                        <p className="text-xs text-stone-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.displayName || user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onOpenOrders();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-stone-800 flex items-center gap-2.5 text-stone-300 hover:text-amber-400"
                      >
                        <Package className="w-4 h-4 text-amber-500" />
                        My Order History
                      </button>

                      <a
                        href="#reviews"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-stone-800 flex items-center gap-2.5 text-stone-300 hover:text-amber-400"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        Write Customer Review
                      </a>

                      <div className="border-t border-stone-800 my-1"></div>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-red-950/40 flex items-center gap-2.5 text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => signInWithGoogle()}
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-amber-950/40 transition-all hover:scale-105"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Google Sign In</span>
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-800 text-xs">
              <div className="text-stone-400">
                📍 Faisal Road, Rahim Yar Khan
              </div>
              <div className="text-right text-amber-400 font-medium">
                🕒 6:00 AM – 2:00 AM
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-stone-200 hover:bg-stone-900 hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-semibold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp ({RESTAURANT_INFO.whatsappDisplay})
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneCall}`}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 border border-stone-800 text-stone-200 py-2.5 rounded-xl font-semibold text-sm hover:border-amber-500"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                Call Restaurant Directly
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
