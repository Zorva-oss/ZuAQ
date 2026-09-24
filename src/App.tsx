/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { DepartmentShortcuts } from './components/home/DepartmentShortcuts';
import { FlashBundleBanner } from './components/home/FlashBundleBanner';
import { CuratedForYou } from './components/home/CuratedForYou';
import { VideoShowcase } from './components/home/VideoShowcase';
import { TrustGuarantees } from './components/home/TrustGuarantees';
import { CategoryCatalog } from './components/products/CategoryCatalog';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { WishlistModal } from './components/cart/WishlistModal';
import { NotifyMeModal } from './components/products/NotifyMeModal';
import { AskZuAQModal } from './components/ai/AskZuAQModal';
import { PrivacyControlsModal } from './components/ai/PrivacyControlsModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { AccountView } from './components/account/AccountView';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data/mockData';
import {
  Product,
  CartItem,
  Review,
  UserActivity,
  Order,
  StockNotification,
} from './types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  // Products catalog in state (supports admin modifications)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zuaq_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Persist products when edited
  useEffect(() => {
    localStorage.setItem('zuaq_products', JSON.stringify(products));
  }, [products]);

  // Navigation and active view
  const [currentTab, setCurrentTab] = useState<
    | 'home'
    | 'categories'
    | 'new-arrivals'
    | 'offers'
    | 'video-promos'
    | 'admin'
    | 'account'
  >('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zuaq_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zuaq_wishlist');
    return saved ? JSON.parse(saved) : ['beosound-horizon', 'pulsestream-boom'];
  });

  useEffect(() => {
    localStorage.setItem('zuaq_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('zuaq_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Promo code in effect
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');

  // User shopping activity tracking
  const [userActivity, setUserActivity] = useState<UserActivity>(() => {
    const saved = localStorage.getItem('zuaq_activity');
    return saved
      ? JSON.parse(saved)
      : {
          viewedProductIds: ['beosound-horizon'],
          searches: [],
          cartProductIds: [],
          wishlistProductIds: ['beosound-horizon'],
          preferredCategories: ['Audio & Gadgets', 'Modern Footwear'],
          trackingEnabled: true,
        };
  });

  useEffect(() => {
    localStorage.setItem('zuaq_activity', JSON.stringify(userActivity));
  }, [userActivity]);

  // AI Personalized recommendations state
  const [aiReasoning, setAiReasoning] = useState<string>(
    'Personalized picks based on trending design, audio aesthetics, and high user ratings.'
  );
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-init-1',
      orderNumber: 'ZU-849201',
      date: 'Sep 22, 2026',
      items: [
        {
          productId: 'beosound-horizon',
          name: 'BeoSound Horizon Max Wireless',
          color: 'Coral Blush',
          size: 'Standard Fit',
          quantity: 1,
          price: 289,
          image:
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
        },
      ],
      subtotal: 289,
      discount: 86.7,
      discountCode: 'ZUAQSUMMER',
      shipping: 0,
      tax: 16.18,
      total: 218.48,
      status: 'Shipped',
      customer: {
        fullName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '+1 555-234-5678',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        postalCode: '97477',
        country: 'United States',
      },
      paymentMethod: 'Credit Card',
      estimatedDelivery: 'Tomorrow, 2:00 PM',
    },
  ]);

  // Stock alerts registered
  const [stockAlerts, setStockAlerts] = useState<StockNotification[]>([
    {
      email: 'alex.rivera@example.com',
      productId: 'retrofilm-camera',
      productName: 'RetroFilm X-Compact Mirrorless',
      date: 'Sep 24, 2026',
    },
  ]);

  // Announcements
  const [topAnnouncement, setTopAnnouncement] = useState(
    '✨ DISCOVER NEW PRODUCTS & EXCLUSIVE DEALS ON ZUAQ — FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $75'
  );

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState<Product | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Fetch AI Personalization recommendations
  const refreshAiRecommendations = useCallback(async () => {
    if (!userActivity.trackingEnabled) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userActivity,
          catalogSummary: products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            department: p.department,
            price: p.price,
            rating: p.rating,
          })),
        }),
      });
      const data = await res.json();
      if (data.personalizedReason) {
        setAiReasoning(data.personalizedReason);
      }
    } catch (e) {
      console.error('Failed to fetch AI recommendations', e);
    } finally {
      setIsAiLoading(false);
    }
  }, [userActivity, products]);

  // Run on mount
  useEffect(() => {
    refreshAiRecommendations();
  }, []);

  // Track product view
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);

    if (userActivity.trackingEnabled) {
      setUserActivity((prev) => {
        const viewed = Array.from(
          new Set([product.id, ...prev.viewedProductIds])
        ).slice(0, 10);
        const categories = Array.from(
          new Set([product.department, product.category, ...prev.preferredCategories])
        ).slice(0, 6);
        return {
          ...prev,
          viewedProductIds: viewed,
          preferredCategories: categories,
        };
      });
    }
  };

  const handleSelectProductById = (id: string) => {
    const found = products.find((p) => p.id === id);
    if (found) {
      handleSelectProduct(found);
    }
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedColor?: string,
    selectedSize?: string,
    quantity: number = 1,
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.stopPropagation();
    }

    if (product.stock <= 0) {
      setNotifyProduct(product);
      return;
    }

    const color = selectedColor || product.colors[0]?.name || 'Standard';
    const size = selectedSize || product.sizes?.[0];
    const cartItemId = `${product.id}-${color}-${size || 'none'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          unitPrice: product.price,
        },
      ];
    });

    if (userActivity.trackingEnabled) {
      setUserActivity((prev) => ({
        ...prev,
        cartProductIds: Array.from(
          new Set([...prev.cartProductIds, product.id])
        ),
      }));
    }

    showToast(`Added ${quantity}x ${product.name} to cart!`);
  };

  const handleBuyNow = (
    product: Product,
    selectedColor?: string,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    handleAddToCart(product, selectedColor, selectedSize, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleSaveForLater = (item: CartItem) => {
    handleRemoveItem(item.id);
    setSavedForLater((prev) => [...prev, item]);
    showToast(`Moved ${item.product.name} to saved for later`);
  };

  const handleMoveToCart = (item: CartItem) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== item.id));
    setCartItems((prev) => [...prev, item]);
    showToast(`Moved ${item.product.name} back to cart`);
  };

  const handleRemoveSaved = (id: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== id));
  };

  // Wishlist handler
  const handleToggleWishlist = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist ❤️`);
        return [...prev, product.id];
      }
    });
  };

  // Notify Me handler
  const handleNotifyMe = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifyProduct(product);
  };

  const handleRegisterStockAlert = (email: string, product: Product) => {
    setStockAlerts((prev) => [
      ...prev,
      {
        email,
        productId: product.id,
        productName: product.name,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      },
    ]);
    showToast(`Alert registered! We'll email ${email} when restocked.`);
  };

  // Add review
  const handleAddReview = (
    newRev: Omit<Review, 'id' | 'date' | 'helpfulCount'>
  ) => {
    const created: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      helpfulCount: 0,
    };
    setReviews((prev) => ({
      ...prev,
      [newRev.productId]: [created, ...(prev[newRev.productId] || [])],
    }));
    showToast(`Thank you! Your verified review has been published.`);
  };

  // Privacy controls
  const handleToggleTracking = (enabled: boolean) => {
    setUserActivity((prev) => ({ ...prev, trackingEnabled: enabled }));
    showToast(
      enabled
        ? 'AI Personalization enabled'
        : 'AI Personalization paused (private mode)'
    );
  };

  const handleClearActivity = () => {
    setUserActivity({
      viewedProductIds: [],
      searches: [],
      cartProductIds: [],
      wishlistProductIds: [],
      preferredCategories: [],
      trackingEnabled: true,
    });
    showToast('Browsing history & personalization cache cleared');
  };

  // Admin updates
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast(`Updated product: ${updated.name}`);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added product: ${newProd.name}`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product deleted`);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    status: Order['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order status updated to ${status}`);
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const wishlistProducts = products.filter((p) =>
    wishlistIds.includes(p.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFD] text-slate-900 pb-16 lg:pb-0 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-slate-950/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-4 duration-200 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:text-slate-400 ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          if (query.trim() && currentTab !== 'categories') {
            setCurrentTab('categories');
          }
        }}
        searchQuery={searchQuery}
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroBanner
              onShopNow={() => {
                setCurrentTab('categories');
                setSelectedCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreCategories={() => {
                setCurrentTab('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProductById={handleSelectProductById}
            />

            {/* Popular Departments (Instant Filters) */}
            <DepartmentShortcuts
              selectedDepartment={selectedDepartment}
              onSelectDepartment={(dept) => {
                setSelectedDepartment(dept);
                setSelectedCategory(dept);
                setCurrentTab('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Flash Bundle Banner with live countdown */}
            <FlashBundleBanner
              onApplyPromoCode={(code) => {
                setAppliedPromoCode(code);
                showToast(
                  `Promo code ${code} activated! 30% discount applied at checkout.`
                );
              }}
            />

            {/* AI Curated For You flagship section */}
            <CuratedForYou
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p, e) => handleAddToCart(p, undefined, undefined, 1, e)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onNotifyMe={handleNotifyMe}
              onViewAll={() => {
                setCurrentTab('categories');
                setSelectedCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aiReasoning={aiReasoning}
              isAiLoading={isAiLoading}
            />

            {/* Pictures & Video Advertising Section */}
            <VideoShowcase
              onSelectProductById={handleSelectProductById}
              onAddToCartById={(id) => {
                const item = products.find((p) => p.id === id);
                if (item) handleAddToCart(item);
              }}
            />

            {/* Trust and Guarantees */}
            <TrustGuarantees />
          </div>
        )}

        {currentTab === 'categories' && (
          <CategoryCatalog
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, undefined, undefined, 1, e)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onNotifyMe={handleNotifyMe}
          />
        )}

        {currentTab === 'new-arrivals' && (
          <CategoryCatalog
            products={products}
            selectedCategory="New Arrivals"
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, undefined, undefined, 1, e)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onNotifyMe={handleNotifyMe}
          />
        )}

        {currentTab === 'offers' && (
          <div className="space-y-6">
            <FlashBundleBanner
              onApplyPromoCode={(code) => {
                setAppliedPromoCode(code);
                showToast(`Promo code ${code} activated! 30% discount applied.`);
              }}
            />
            <CategoryCatalog
              products={products}
              selectedCategory="Sale / Discounts"
              onSelectCategory={setSelectedCategory}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p, e) => handleAddToCart(p, undefined, undefined, 1, e)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onNotifyMe={handleNotifyMe}
            />
          </div>
        )}

        {currentTab === 'video-promos' && (
          <div className="pt-6">
            <VideoShowcase
              onSelectProductById={handleSelectProductById}
              onAddToCartById={(id) => {
                const item = products.find((p) => p.id === id);
                if (item) handleAddToCart(item);
              }}
            />
          </div>
        )}

        {currentTab === 'admin' && (
          <AdminPanel
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            stockAlerts={stockAlerts}
            topAnnouncement={topAnnouncement}
            onUpdateTopAnnouncement={setTopAnnouncement}
            onClose={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'account' && (
          <AccountView
            orders={orders}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenAdmin={() => setCurrentTab('admin')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentTab('categories');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenAdmin={() => {
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onNotifyMe={handleNotifyMe}
          allProducts={products}
          onSelectProduct={handleSelectProduct}
          reviews={reviews[selectedProduct.id] || []}
          onAddReview={handleAddReview}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        savedForLater={savedForLater}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onSaveForLater={handleSaveForLater}
        onMoveToCart={handleMoveToCart}
        onRemoveSaved={handleRemoveSaved}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={setAppliedPromoCode}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromoCode={appliedPromoCode}
        onOrderPlaced={(order) => {
          setOrders((prev) => [order, ...prev]);
          showToast(`Order #${order.orderNumber} placed successfully!`);
        }}
        onClearCart={() => setCartItems([])}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onAddToCart={(p) => handleAddToCart(p)}
        onRemoveFromWishlist={(p) => {
          setWishlistIds((prev) => prev.filter((id) => id !== p.id));
        }}
        onSelectProduct={handleSelectProduct}
      />

      {/* Sold-Out Notify Me Modal */}
      <NotifyMeModal
        product={notifyProduct}
        onClose={() => setNotifyProduct(null)}
        onRegisterAlert={handleRegisterStockAlert}
      />

      {/* Ask ZuAQ AI Shopping Stylist Modal */}
      <AskZuAQModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onAddToCart={(p) => handleAddToCart(p)}
        userActivity={userActivity}
      />

      {/* Privacy & Preference Controls Modal */}
      <PrivacyControlsModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        userActivity={userActivity}
        onToggleTracking={handleToggleTracking}
        onClearActivity={handleClearActivity}
      />
    </div>
  );
}
