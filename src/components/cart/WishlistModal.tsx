import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onAddToCart,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-slate-900">
              Saved Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">
                Your wishlist is empty
              </p>
              <p className="text-xs text-slate-400">
                Tap the heart on any product card to save it for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl border border-slate-200/80 flex items-center gap-3 bg-white hover:border-blue-300 transition-colors"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 cursor-pointer"
                />
                <div className="min-w-0 flex-1">
                  <h4
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="text-xs font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                  >
                    {p.name}
                  </h4>
                  <p className="text-xs font-black text-blue-600 mt-0.5">
                    ${p.price}
                  </p>
                  <span className="text-[10px] text-slate-400">
                    {p.stock > 0 ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.stock > 0 && (
                    <button
                      onClick={() => onAddToCart(p)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
