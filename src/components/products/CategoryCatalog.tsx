import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Filter, X } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../../data/mockData';

interface CategoryCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, event?: React.MouseEvent) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product, event: React.MouseEvent) => void;
  onNotifyMe: (product: Product, event: React.MouseEvent) => void;
}

export const CategoryCatalog: React.FC<CategoryCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNotifyMe,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(1000);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'New Arrivals') {
            if (p.badge !== 'New Arrival') return false;
          } else if (selectedCategory === 'Sale / Discounts') {
            if (p.discountPercent <= 0) return false;
          } else if (p.category !== selectedCategory && p.department !== selectedCategory) {
            return false;
          }
        }

        // In-stock filter
        if (inStockOnly && p.stock <= 0) return false;

        // Price filter
        if (p.price > priceMax) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, inStockOnly, priceMax, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Category Pills Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {selectedCategory === 'All' ? 'All Curated Products' : selectedCategory}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {/* Horizontal Category Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          {/* In-Stock Filter Toggle */}
          <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded accent-blue-600 w-4 h-4 cursor-pointer"
            />
            <span>In-Stock Only</span>
          </label>

          {/* Price Range Slider */}
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-700">Max Price:</span>
            <input
              type="range"
              min="30"
              max="1000"
              step="10"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="accent-blue-600 cursor-pointer w-24 sm:w-32"
            />
            <span className="font-mono font-bold text-slate-900">${priceMax}</span>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 outline-none cursor-pointer"
          >
            <option value="featured">Featured & Curated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
              onNotifyMe={onNotifyMe}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
          <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No products match your current filters
          </h3>
          <p className="text-xs text-slate-500">
            Try adjusting your price ceiling or resetting the category filter.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              setInStockOnly(false);
              setPriceMax(1000);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
