import React, { useState, useEffect } from 'react';
import { Clock, Ticket, Check, Sparkles } from 'lucide-react';

interface FlashBundleBannerProps {
  onApplyPromoCode: (code: string) => void;
}

export const FlashBundleBanner: React.FC<FlashBundleBannerProps> = ({
  onApplyPromoCode,
}) => {
  const [copied, setCopied] = useState(false);
  // Countdown timer state initialized to 4h 32m 12s
  const [secondsRemaining, setSecondsRemaining] = useState(4 * 3600 + 32 * 60 + 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const handleClaim = () => {
    onApplyPromoCode('ZUAQSUMMER');
    navigator.clipboard?.writeText('ZUAQSUMMER');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 p-6 sm:p-8 shadow-lg">
          {/* Subtle geometric background patterns */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-48 h-48 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left Content */}
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-amber-900 text-xs font-bold shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                <span>Limited Summer Rush</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Exclusive 30% Flash Bundle Event
              </h2>

              <p className="text-sm sm:text-base text-slate-900 font-medium">
                Apply code{' '}
                <span className="bg-slate-900 text-white font-mono font-bold px-2 py-0.5 rounded-md text-xs sm:text-sm tracking-wider">
                  ZUAQSUMMER
                </span>{' '}
                at checkout on all smart wearables & studio audio gear.
              </p>
            </div>

            {/* Right: Countdown & CTA */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
              {/* Digit Boxes */}
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-4 py-2.5 rounded-2xl shadow-inner border border-amber-200/60 font-mono">
                <div className="text-center">
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">
                    {pad(hours)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Hrs
                  </span>
                </div>
                <span className="text-slate-400 font-bold text-lg -mt-3">:</span>
                <div className="text-center">
                  <span className="block text-xl sm:text-2xl font-black text-slate-900 leading-none">
                    {pad(minutes)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Min
                  </span>
                </div>
                <span className="text-slate-400 font-bold text-lg -mt-3">:</span>
                <div className="text-center">
                  <span className="block text-xl sm:text-2xl font-black text-rose-600 leading-none">
                    {pad(seconds)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Sec
                  </span>
                </div>
              </div>

              {/* Claim Discount Button */}
              <button
                onClick={handleClaim}
                className="px-5 py-3.5 bg-slate-950 hover:bg-slate-800 active:bg-black text-white font-semibold text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer hover:scale-102 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Applied 30% Off!</span>
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>Claim Discount</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
