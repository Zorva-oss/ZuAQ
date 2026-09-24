import React from 'react';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  CreditCard,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export const TrustGuarantees: React.FC = () => {
  return (
    <section className="py-10 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Primary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100/60 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Free Worldwide Express
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                On all qualifying orders over $75 with customs prepaid.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100/60 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                30-Day Hassle-Free
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Preprinted instant returns label included in every package.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100/60 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Bank-Grade Security
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Zero fraud liability with end-to-end encrypted checkouts.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100/60 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                24/7 Dedicated Care
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Real product stylists and concierge always one tap away.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Trust Line */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-800">24/7 Dedicated Support</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-800">30-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 text-xs text-slate-600">
            <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-800">Secured Payment Rails</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 text-xs text-slate-600">
            <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-800">100% Carbon Neutral</span>
          </div>
        </div>
      </div>
    </section>
  );
};
