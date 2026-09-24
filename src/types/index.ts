export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  category: string;
  department: string;
  tags: string[];
  badge?: 'Editor Choice' | 'Best Seller' | 'New Arrival' | 'Trending' | 'Sold Out' | 'Flash Sale';
  colors: { name: string; hex: string; previewClass?: string }[];
  sizes?: string[];
  stock: number;
  images: string[];
  videoUrl?: string;
  videoPoster?: string;
  features: string[];
  specs: Record<string, string>;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface UserActivity {
  viewedProductIds: string[];
  searches: string[];
  cartProductIds: string[];
  wishlistProductIds: string[];
  preferredCategories: string[];
  trackingEnabled: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  color: string;
  size?: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Cash on Delivery';
  estimatedDelivery: string;
}

export interface VideoPromotion {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  poster: string;
  duration: string;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: string;
    image: string;
  };
}

export interface StockNotification {
  email: string;
  productId: string;
  productName: string;
  date: string;
}
