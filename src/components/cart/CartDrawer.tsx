import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Bookmark,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Ticket,
  Check,
} from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  savedForLater: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onSaveForLater: (item: CartItem) => void;
  onMoveToCart: (item: CartItem) => void;
  onRemoveSaved: (cartItemId: string) => void;
  appliedPromoCode: string;
  onApplyPromoCode: (code: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  savedForLater,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
  onMoveToCart,
  onRemoveSaved,
  appliedPromoCode,
  onApplyPromoCode,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState(appliedPromoCode || '');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(
    appliedPromoCode ? 'Promo code active' : ''
  );

  const subtotal = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  // Promo code calculation
  let discountAmount = 0;
  if (appliedPromoCode === 'ZUAQSUMMER') {
    discountAmount = subtotal * 0.3;
  } else if (appliedPromoCode === 'WELCOME10') {
    discountAmount = subtotal * 0.1;
  }

  const shippingThreshold = 75;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingFee = freeShipping || items.length === 0 ? 0 : 9.99;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / shippingThreshold) * 100)
  );
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'ZUAQSUMMER') {
      onApplyPromoCode('ZUAQSUMMER');
      setPromoSuccess('30% Summer Flash discount applied!');
      setPromoError('');
    } else if (clean === 'WELCOME10') {
      onApplyPromoCode('WELCOME10');
      setPromoSuccess('10% Welcome discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try ZUAQSUMMER');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close cart"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1 text-blue-700">
              <Truck className="w-4 h-4" />
              {freeShipping
                ? 'You unlocked FREE Worldwide Express Shipping!'
                : `Add $${(shippingThreshold - subtotal).toFixed(
                    2
                  )} more for FREE Express Shipping`}
            </span>
            <span className="text-blue-700 font-bold">{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-blue-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our curated drops and add something you love to get started!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-slate-200/80 flex items-start gap-3 bg-white"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.selectedColor}
                      {item.selectedSize ? ` • ${item.selectedSize}` : ''}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-slate-900 tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2 mt-1 border-t border-slate-100 text-[11px] text-slate-400">
                      <button
                        onClick={() => onSaveForLater(item)}
                        className="hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save for later</span>
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Saved for Later ({savedForLater.length})
              </h4>
              <div className="space-y-2">
                {savedForLater.map((saved) => (
                  <div
                    key={saved.id}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={saved.product.images[0]}
                        alt={saved.product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 truncate">
                          {saved.product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ${saved.unitPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onMoveToCart(saved)}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-bold text-[11px] hover:bg-blue-700 cursor-pointer"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => onRemoveSaved(saved.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 bg-slate-50/90 border-t border-slate-200 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Ticket className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Code (Try ZUAQSUMMER)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono uppercase tracking-wider outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoSuccess && (
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> {promoSuccess}
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-600 font-semibold">
                {promoError}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Discount ({appliedPromoCode}):</span>
                  <span className="tabular-nums">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping:</span>
                <span className="font-semibold tabular-nums">
                  {freeShipping ? (
                    <span className="text-emerald-600 uppercase font-bold">
                      FREE
                    </span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                <span>Total:</span>
                <span className="text-base text-blue-600 tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Encrypted 256-Bit SSL Checkout • 30-Day Money Back</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
