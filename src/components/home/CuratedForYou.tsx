import React from 'react';
import { Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface CuratedForYouProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, event?: React.MouseEvent) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product, event: React.MouseEvent) => void;
  onNotifyMe: (product: Product, event: React.MouseEvent) => void;
  onViewAll: () => void;
  aiReasoning?: string;
  isAiLoading?: boolean;
}

export const CuratedForYou: React.FC<CuratedForYouProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNotifyMe,
  onViewAll,
  aiReasoning,
  isAiLoading,
}) => {
  // Take top 4 curated products
  const curatedPicks = products.slice(0, 4);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with AI Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span>Powered by ZuAQ AI Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Curated For You
            </h2>

            <p className="text-sm text-slate-600 max-w-2xl">
              {aiReasoning ||
                'Personalized picks based on trending design, audio aesthetics, and high user ratings.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAiLoading && (
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full animate-pulse">
                <BrainCircuit className="w-3.5 h-3.5" />
                Refining recommendations...
              </span>
            )}

            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
            >
              <span>View Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 Flagship Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {curatedPicks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onNotifyMe={onNotifyMe}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
