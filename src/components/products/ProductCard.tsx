import React from 'react';
import { Star, Heart, Plus, BellRing, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, event?: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, event: React.MouseEvent) => void;
  onNotifyMe: (product: Product, event: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onNotifyMe,
}) => {
  const isSoldOut = product.stock <= 0;

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Editor Choice':
        return 'bg-blue-600 text-white';
      case 'Best Seller':
        return 'bg-amber-500 text-white';
      case 'New Arrival':
        return 'bg-emerald-600 text-white';
      case 'Trending':
        return 'bg-orange-500 text-white';
      case 'Sold Out':
        return 'bg-rose-600 text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-3xl p-3.5 sm:p-4 border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-3.5 flex items-center justify-center">
        {/* Badge Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {isSoldOut ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-rose-600 text-white shadow-xs">
              Sold Out
            </span>
          ) : product.badge ? (
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>

        {/* Product Image with Fallback */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-106 transition-transform duration-300 ease-out ${
            isSoldOut ? 'opacity-70 grayscale-[30%]' : ''
          }`}
          loading="lazy"
          onError={(e) => {
            // Elegant styled SVG canvas fallback if offline
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Sold out overlay banner if stock is 0 */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-2">
            <span className="bg-white/95 text-rose-700 font-extrabold text-xs tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-1">
            {product.tagline}
          </p>

          {/* Color variation dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 pt-1">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-slate-300"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-slate-400 ml-0.5">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-[10px] font-bold text-amber-600 block">
                Only {product.stock} left!
              </span>
            )}
          </div>

          {/* Add to Cart or Sold Out Button */}
          {isSoldOut ? (
            <button
              type="button"
              onClick={(e) => onNotifyMe(product, e)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors cursor-pointer"
              title="Notify me when restocked"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Notify Me</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => onAddToCart(product, e)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer shadow-2xs group/btn"
              title="Add to shopping bag"
            >
              <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
