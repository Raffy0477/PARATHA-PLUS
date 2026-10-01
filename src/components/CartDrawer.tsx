import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  FileText,
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { RESTAURANT_INFO } from '../data/menuData';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    generateWhatsAppLink 
  } = useCart();

  const { user, signInWithGoogle } = useAuth();
  const toast = useToast();

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine-in'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.displayName && !customerName) {
      setCustomerName(user.displayName);
    }
  }, [user]);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Missing Contact Details', 'Please enter your Name and Phone Number to verify your order.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Missing Delivery Address', 'Please provide your street or house address in Rahim Yar Khan.');
      return;
    }

    const waLink = generateWhatsAppLink({
      customerName,
      customerPhone,
      orderType,
      deliveryAddress,
      notes,
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
    });

    toast.success(
      'Order Dispatched to WhatsApp! 🛵🔥',
      `Salam ${customerName}! Your order of Rs. ${cartTotal} is ready for dispatch on Faisal Road.`
    );

    window.open(waLink, '_blank');
  };

  const handleSaveToFirestore = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setOrderError('Please provide your name and phone number.');
      toast.error('Missing Contact Details', 'Please enter your Name and Phone Number.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setOrderError('Please enter your delivery address in Rahim Yar Khan.');
      toast.error('Missing Delivery Address', 'Please specify your location in Rahim Yar Khan.');
      return;
    }

    if (!user) {
      try {
        await signInWithGoogle();
      } catch {
        return;
      }
    }

    setIsPlacingOrder(true);
    setOrderError(null);

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = `orders/${orderId}`;
    const docRef = doc(db, 'orders', orderId);

    try {
      const serializedItems = JSON.stringify(
        cart.map((ci) => ({
          id: ci.menuItem.id,
          name: ci.menuItem.name,
          price: ci.menuItem.price,
          quantity: ci.quantity,
          instructions: ci.specialInstructions || '',
        }))
      );

      await setDoc(docRef, {
        userId: user!.uid,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        deliveryAddress: deliveryAddress.trim() || 'Dine-in / Pickup counter',
        items: serializedItems,
        totalAmount: Number(cartTotal),
        status: 'pending',
        notes: notes.trim() || '',
        createdAt: serverTimestamp(),
      });

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });

      setOrderSuccess(orderId);
      clearCart();

      toast.success(
        'Order Successfully Saved! 🎉',
        `Order #${orderId.slice(-6).toUpperCase()} received. Track status live in your Order History!`
      );
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, path);
      setOrderError('Failed to record order. Please checkout via WhatsApp.');
      toast.error('Order Failed', 'Could not record order online. You can still order directly via WhatsApp.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-950 border-l border-stone-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white font-serif-title">
                  Your Order Cart
                </h3>
                <p className="text-[11px] text-stone-400">
                  Paratha Plus • Faisal Road RYK
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-900"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {orderSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  Order Successfully Saved!
                </h4>
                <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">
                  Your order has been recorded in our database. Our kitchen staff on Faisal Road has received the dispatch ticket.
                </p>
                <div className="p-3 bg-stone-900 rounded-xl text-xs font-mono text-amber-400">
                  Order Reference: #{orderSuccess.slice(-8).toUpperCase()}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-stone-300 font-semibold text-sm">Your cart is currently empty</p>
                <p className="text-stone-500 text-xs">
                  Add hot flaky parathas, rolls, or chai from the menu!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs font-bold text-amber-400 hover:underline"
                >
                  Browse Menu Now
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>{cart.length} Dish{cart.length > 1 ? 'es' : ''} Selected</span>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="p-3 bg-stone-900/80 rounded-2xl border border-stone-800/80 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.menuItem.name}
                        </h4>
                        <p className="text-amber-400 font-bold text-xs mt-0.5">
                          Rs. {item.menuItem.price * item.quantity}
                        </p>
                        {item.specialInstructions && (
                          <p className="text-[10px] text-stone-400 truncate italic">
                            Note: {item.specialInstructions}
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Information & Details */}
                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <h4 className="text-xs uppercase font-bold text-stone-300 tracking-wider">
                    Fulfillment & Delivery Details
                  </h4>

                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-stone-900 rounded-xl">
                    {[
                      { key: 'delivery', label: '🛵 Delivery' },
                      { key: 'takeaway', label: '🥡 Takeaway' },
                      { key: 'dine-in', label: '🍽️ Dine-In' },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setOrderType(t.key as any)}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                          orderType === t.key
                            ? 'bg-amber-500 text-stone-950 shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number *"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {orderType === 'delivery' ? (
                      <div>
                        <textarea
                          placeholder="Delivery Address (House/Street, Colony or Landmark in RYK) *"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          rows={2}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          placeholder={orderType === 'dine-in' ? 'Table Number (if seated)' : 'Pickup Time (e.g. In 20 mins)'}
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    )}

                    <div>
                      <input
                        type="text"
                        placeholder="Order Note (e.g. Extra mint raita, less spice)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {orderError && (
                    <div className="p-2.5 bg-red-950/70 border border-red-800 rounded-xl text-red-300 text-xs">
                      {orderError}
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

          {/* Footer & Checkout Buttons */}
          {cart.length > 0 && !orderSuccess && (
            <div className="p-5 border-t border-stone-800 bg-stone-950/95 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery in Rahim Yar Khan</span>
                  <span className="text-emerald-400 font-medium">
                    {orderType === 'delivery' ? 'Free / Standard' : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400 text-lg">Rs. {cartTotal}</span>
                </div>
              </div>

              {/* Primary Action 1: Instant WhatsApp Checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Send Order on WhatsApp</span>
              </button>

              {/* Action 2: Save to Firestore Database */}
              <button
                onClick={handleSaveToFirestore}
                disabled={isPlacingOrder}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Database className="w-4 h-4 text-amber-500" />
                <span>
                  {isPlacingOrder
                    ? 'Saving Order...'
                    : user
                    ? 'Save Order Online in Firestore'
                    : 'Sign in & Save Online'}
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
