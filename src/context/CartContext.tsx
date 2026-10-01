import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, instructions?: string, openDrawer?: boolean) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppLink: (orderInfo: {
    customerName: string;
    customerPhone: string;
    orderType: 'delivery' | 'takeaway' | 'dine-in';
    deliveryAddress?: string;
    notes?: string;
  }) => string;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  generateWhatsAppLink: () => '',
});

const CART_STORAGE_KEY = 'paratha_plus_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (item: MenuItem, quantity = 1, instructions = '', openDrawer = false) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          specialInstructions: instructions || updated[existingIndex].specialInstructions,
        };
        return updated;
      }
      return [...prev, { menuItem: item, quantity, specialInstructions: instructions }];
    });

    // Fire Toast Notification with item details and "View Cart" action
    toast.success(
      `Added to Cart! (${quantity}x)`,
      `${item.name} • Rs. ${item.price * quantity}`,
      {
        label: 'View Cart',
        onClick: () => setIsCartOpen(true),
      },
      item.image
    );

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((ci) => ci.menuItem.id === itemId);
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
    if (item) {
      toast.info('Item Removed', `${item.menuItem.name} was removed from your cart.`);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.menuItem.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  const generateWhatsAppLink = (orderInfo: {
    customerName: string;
    customerPhone: string;
    orderType: 'delivery' | 'takeaway' | 'dine-in';
    deliveryAddress?: string;
    notes?: string;
  }) => {
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.menuItem.name}* x ${item.quantity} = Rs. ${item.menuItem.price * item.quantity}` +
          (item.specialInstructions ? ` _(Note: ${item.specialInstructions})_` : '')
      )
      .join('\n');

    const messageText = `*Salam! I would like to order from PARATHA PLUS (Faisal Road, RYK)* 🫓🔥

*Order Type:* ${orderInfo.orderType.toUpperCase()}
*Customer Name:* ${orderInfo.customerName}
*Phone Number:* ${orderInfo.customerPhone}
${orderInfo.deliveryAddress ? `*Delivery / Table Address:* ${orderInfo.deliveryAddress}\n` : ''}
*Order Items:*
${itemsList}

*Grand Total:* *Rs. ${cartTotal}*
${orderInfo.notes ? `\n*Special Instructions:* ${orderInfo.notes}` : ''}

_Please confirm my order and let me know the estimated delivery/prep time. Shukriya!_`;

    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedText}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
