import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Heart,
  Plus,
  Minus,
  Play,
  Film,
  Sparkles,
  BellRing,
  Send,
  MessageSquare,
} from 'lucide-react';
import { Product, Review } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedColor: string,
    selectedSize?: string,
    quantity?: number
  ) => void;
  onBuyNow: (
    product: Product,
    selectedColor: string,
    selectedSize?: string,
    quantity?: number
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, event: React.MouseEvent) => void;
  onNotifyMe: (product: Product, event: React.MouseEvent) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onNotifyMe,
  allProducts,
  onSelectProduct,
  reviews,
  onAddReview,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'video' | 'reviews'>('overview');

  // Review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const isSoldOut = product.stock <= 0;

  // Similar and AI alternatives
  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.department === product.department))
    .slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    onAddReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Great product',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
    });

    setReviewSuccess(true);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Sticky Header with Close and Share */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {product.department} / {product.category}
            </span>
            {isSoldOut ? (
              <span className="bg-rose-100 text-rose-700 font-extrabold text-[11px] px-2 py-0.5 rounded-full uppercase">
                Sold Out
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-700 font-semibold text-[11px] px-2 py-0.5 rounded-full">
                In Stock ({product.stock} units)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleWishlist(product, e)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'text-slate-400 hover:text-rose-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={isWishlisted ? 'Saved' : 'Save'}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-rose-600' : ''
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Media Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Active Image / Video */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                {activeTab === 'video' && product.videoUrl ? (
                  <video
                    src={product.videoUrl}
                    poster={product.videoPoster || product.images[0]}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}

                {isSoldOut && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                    <span className="bg-rose-600 text-white font-extrabold text-sm uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      if (activeTab === 'video') setActiveTab('overview');
                    }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx && activeTab !== 'video'
                        ? 'border-blue-600 shadow-sm scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

                {product.videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`w-16 h-16 rounded-xl bg-slate-900 border-2 shrink-0 flex flex-col items-center justify-center text-white transition-all cursor-pointer ${
                      activeTab === 'video'
                        ? 'border-blue-600 shadow-sm scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                    title="Watch Demonstration Video"
                  >
                    <Film className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] font-bold mt-0.5">Video Demo</span>
                  </button>
                )}
              </div>

              {/* Trust Badges Adjacency */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs text-slate-600">
                <div className="p-2 rounded-xl bg-slate-50">
                  <Truck className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-800 block text-[11px]">Free Shipping</span>
                  <span className="text-[10px] text-slate-400">Over $75</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <RotateCcw className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                  <span className="font-semibold text-slate-800 block text-[11px]">30-Day Returns</span>
                  <span className="text-[10px] text-slate-400">Prepaid label</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                  <span className="font-semibold text-slate-800 block text-[11px]">100% Authentic</span>
                  <span className="text-[10px] text-slate-400">ZuAQ Verified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="lg:col-span-6 space-y-6">
              {/* Product Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-900">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    • {product.reviewCount} customer reviews
                  </span>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs font-semibold text-blue-600 hover:underline ml-auto cursor-pointer"
                  >
                    Read Reviews
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing & Savings */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 tabular-nums">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-base text-slate-400 line-through tabular-nums">
                        ${product.originalPrice}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="bg-rose-50 text-rose-600 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                        Save {product.discountPercent}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Tax included. Eligible for 30% bundle savings with code <span className="font-bold text-slate-800">ZUAQSUMMER</span>.
                  </p>
                </div>

                {isSoldOut ? (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {product.stock <= 5 ? `Only ${product.stock} remaining` : 'Ready to ship'}
                  </span>
                )}
              </div>

              {/* Color Variation Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Selected Color:</span>
                    <span className="font-medium text-slate-900">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-200'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size / Specs Variation Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Size / Option:</span>
                    <span className="font-medium text-slate-900">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Buy Action Buttons */}
              <div className="space-y-3 pt-2">
                {!isSoldOut ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-700">Quantity:</span>
                      <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-xs font-bold text-slate-900 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                          className="p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          onAddToCart(product, selectedColor, selectedSize, quantity)
                        }
                        className="py-3.5 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border border-blue-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onBuyNow(product, selectedColor, selectedSize, quantity)
                        }
                        className="py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                    <div className="flex items-center gap-2 text-rose-700">
                      <BellRing className="w-5 h-5 animate-bounce" />
                      <div>
                        <h4 className="text-sm font-bold">This item is currently SOLD OUT</h4>
                        <p className="text-xs text-rose-600">
                          We restock limited editions frequently. Get alerted the moment it arrives.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => onNotifyMe(product, e)}
                      className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <BellRing className="w-4 h-4" />
                      <span>Notify Me When Available</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Tab Navigation: Overview, Specs, Reviews */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Reviews ({reviews.length})
                  </button>
                </div>

                {/* Tab 1: Overview Content */}
                {activeTab === 'overview' && (
                  <div className="pt-4 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                    {product.features && product.features.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-xs font-bold text-slate-800">
                          Highlights:
                        </span>
                        <ul className="space-y-1">
                          {product.features.map((feat, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-600 flex items-start gap-2"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Specs */}
                {activeTab === 'specs' && (
                  <div className="pt-4 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs || {}).map(([key, val]) => (
                        <div
                          key={key}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            {key}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Reviews */}
                {activeTab === 'reviews' && (
                  <div className="pt-4 space-y-4">
                    {/* Add Review Form */}
                    <form
                      onSubmit={handleReviewSubmit}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Write a Customer Review
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="cursor-pointer"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= reviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Headline (e.g. Loved the fit!)"
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-blue-500"
                        />
                      </div>

                      <textarea
                        required
                        rows={2}
                        placeholder="Write your honest review..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-blue-500"
                      />

                      <div className="flex items-center justify-between">
                        {reviewSuccess && (
                          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Review submitted!
                          </span>
                        )}
                        <button
                          type="submit"
                          className="ml-auto px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Review</span>
                        </button>
                      </div>
                    </form>

                    {/* Reviews List */}
                    <div className="space-y-3">
                      {reviews.length > 0 ? (
                        reviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="p-3.5 rounded-2xl border border-slate-100 bg-white space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">
                                  {rev.author}
                                </span>
                                {rev.verifiedPurchase && (
                                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">
                                    Verified Buyer
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-amber-400">
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3 fill-amber-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs font-semibold text-slate-800">
                              {rev.title}
                            </p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {rev.comment}
                            </p>
                            <span className="text-[10px] text-slate-400 block pt-1">
                              {rev.date}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-4">
                          Be the first to review this product!
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Recommended Alternatives & Similar Section */}
          {similarProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    AI-Recommended Alternatives
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Because you viewed {product.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProducts.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      onSelectProduct(sim);
                      setSelectedImageIndex(0);
                    }}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-3 bg-white"
                  >
                    <img
                      src={sim.images[0]}
                      alt={sim.name}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {sim.name}
                      </p>
                      <p className="text-xs text-blue-600 font-black mt-0.5">
                        ${sim.price}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        ★ {sim.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
