import React, { useState } from 'react';
import { X, BellRing, Check, Mail, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface NotifyMeModalProps {
  product: Product | null;
  onClose: () => void;
  onRegisterAlert: (email: string, product: Product) => void;
}

export const NotifyMeModal: React.FC<NotifyMeModalProps> = ({
  product,
  onClose,
  onRegisterAlert,
}) => {
  if (!product) return null;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    onRegisterAlert(email.trim(), product);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              You're on the VIP Waitlist!
            </h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              We've registered{' '}
              <span className="font-semibold text-slate-900">{email}</span>. You'll
              be the first to know the exact minute{' '}
              <span className="font-bold text-slate-900">{product.name}</span> is
              restocked.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <BellRing className="w-6 h-6" />
            </div>

            <div>
              <div className="inline-block bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded mb-1">
                Sold Out Alert
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Notify Me When Available
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your email below to get an instant alert with an exclusive 10% restock privilege for:
              </p>
            </div>

            {/* Product Card Snippet */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 rounded-xl object-cover bg-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-slate-500">
                  ${product.price} • {product.category}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Notify Me on Restock
              </button>
            </form>

            <p className="text-[10px] text-center text-slate-400">
              We respect your privacy. Zero spam, unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
