import React, { useState, useRef, useEffect } from 'react';
import { ZuAQLogo } from './ZuAQLogo';
import {
  Search,
  ShoppingBag,
  Heart,
  Sparkles,
  Mic,
  Camera,
  X,
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Product } from '../../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIStylist: () => void;
  onOpenPrivacy: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAIStylist,
  onOpenPrivacy,
  onSearch,
  searchQuery,
  products,
  onSelectProduct,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [topBannerDismissed, setTopBannerDismissed] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  const suggestedQueries = [
    'Wireless ANC Headphones',
    'Pastel Runners',
    'Waterproof Speaker',
    'Titanium Smartwatch',
    'Everyday Sling Bag',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-xs">
      {/* Top Notification Announcement Banner */}
      {!topBannerDismissed && (
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-xs font-semibold py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 mx-auto text-center truncate">
              <span className="animate-spin text-sm">✨</span>
              <span className="tracking-wide">
                DISCOVER NEW PRODUCTS & EXCLUSIVE DEALS ON ZUAQ — FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $75
              </span>
            </div>
            <button
              onClick={() => setTopBannerDismissed(true)}
              className="text-white/80 hover:text-white p-0.5 ml-2 cursor-pointer transition-colors"
              title="Dismiss banner"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-8 shrink-0">
            <button
              onClick={() => onSelectTab('home')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <ZuAQLogo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <button
                onClick={() => onSelectTab('home')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  currentTab === 'home'
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onSelectTab('categories')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  currentTab === 'categories'
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => onSelectTab('new-arrivals')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  currentTab === 'new-arrivals'
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => onSelectTab('offers')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                  currentTab === 'offers'
                    ? 'text-orange-600 bg-orange-50 font-semibold'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/60'
                }`}
              >
                Offers
                <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider uppercase">
                  Hot
                </span>
              </button>
              <button
                onClick={() => onSelectTab('video-promos')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  currentTab === 'video-promos'
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Video Ads 🎥
              </button>
              <button
                onClick={() => onSelectTab('admin')}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  currentTab === 'admin'
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50'
                }`}
              >
                Store Admin
              </button>
            </nav>
          </div>

          {/* AI Search Bar */}
          <div
            ref={searchContainerRef}
            className="flex-1 max-w-lg relative hidden md:block"
          >
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-blue-600 flex items-center pointer-events-none">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Ask ZuAQ... Wireless ANC, Summer Fits, Minimal Gear"
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 pl-10 pr-20 py-2.5 rounded-full text-sm border border-transparent focus:border-blue-500/50 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 shadow-inner"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5 text-slate-400">
                <button
                  type="button"
                  onClick={onOpenAIStylist}
                  title="Voice Search / AI Assistant"
                  className="p-1 hover:text-blue-600 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onOpenAIStylist}
                  title="Visual Lens Search"
                  className="p-1 hover:text-blue-600 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      onSearch('');
                      setShowSearchDropdown(false);
                    }}
                    className="p-1 hover:text-slate-600 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Search className="w-4 h-4 mr-1 text-slate-400" />
                )}
              </div>
            </div>

            {/* Live Search Autocomplete & AI Suggestions Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() ? (
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Matching Products ({searchResults.length})</span>
                      <span className="text-[11px] text-blue-600 font-normal">
                        Powered by ZuAQ AI
                      </span>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              onSelectProduct(product);
                              setShowSearchDropdown(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-11 h-11 rounded-lg object-cover bg-slate-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-slate-500 truncate">
                                {product.category} • ${product.price}
                                {product.stock === 0 && (
                                  <span className="ml-2 text-rose-600 font-medium">
                                    Sold Out
                                  </span>
                                )}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-blue-600 hover:underline">
                              View
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-slate-500">
                          No direct matches for "{searchQuery}".
                        </p>
                        <button
                          onClick={() => {
                            setShowSearchDropdown(false);
                            onOpenAIStylist();
                          }}
                          className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Ask AI Stylist to find alternatives
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                      <span>Trending Searches</span>
                      <button
                        onClick={onOpenPrivacy}
                        className="text-[11px] text-slate-400 hover:text-blue-600 transition-colors normal-case font-normal"
                      >
                        Privacy Controls
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedQueries.map((query) => (
                        <button
                          key={query}
                          onClick={() => {
                            onSearch(query);
                            setShowSearchDropdown(true);
                          }}
                          className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          {query}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Need gift or outfit suggestions?</span>
                      </div>
                      <button
                        onClick={() => {
                          setShowSearchDropdown(false);
                          onOpenAIStylist();
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Ask ZuAQ AI &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: AI Stylist, Wishlist, Cart, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Ask ZuAQ AI Stylist Button */}
            <button
              onClick={onOpenAIStylist}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white rounded-full text-xs font-semibold shadow-xs hover:shadow-md hover:scale-102 transition-all cursor-pointer"
              title="Open AI Shopping Stylist & Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Ask ZuAQ</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Saved Wishlist"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <div className="relative group pl-1">
              <button
                onClick={() => onSelectTab('account')}
                className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all cursor-pointer"
                title="Account Settings & Orders"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
