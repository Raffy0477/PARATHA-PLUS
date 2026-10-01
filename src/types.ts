export type MenuCategory = 
  | 'all'
  | 'signature'
  | 'stuffed'
  | 'rolls'
  | 'sweet'
  | 'deals'
  | 'sides';

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: MenuCategory;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isSignature?: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isSweet?: boolean;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  calories?: string;
  preparationTime?: string;
}

export interface DealItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  itemsIncluded: string[];
  serves: string;
  image: string;
  badge: string;
  tag: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedVariant?: string;
  specialInstructions?: string;
}

export interface CustomerReview {
  id?: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  favoriteDish?: string;
  createdAt: any; // Firestore Timestamp or ISO string
  verifiedVisit?: boolean;
}

export interface CustomerOrder {
  id?: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'delivery' | 'takeaway' | 'dine-in';
  deliveryAddress?: string;
  items: string; // JSON string of items ordered
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: any;
}

export interface UserFavorite {
  id?: string;
  userId: string;
  menuItemId: string;
  menuItemName: string;
  price: number;
  category?: string;
  addedAt: any;
}
