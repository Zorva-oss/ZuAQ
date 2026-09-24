import React from 'react';
import { ArrowRight, Sparkles, Shield, Truck, Star, Zap, Flame, Compass } from 'lucide-react';
import { Product } from '../../types';

interface HeroBannerProps {
  onShopNow: () => void;
  onExploreCategories: () => void;
  onSelectProductById: (productId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopNow,
  onExploreCategories,
  onSelectProductById,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="tracking-wide uppercase text-[11px] font-bold">ZuAQ Summer Drops Live</span>
              <span className="text-blue-400">•</span>
              <span className="text-blue-600 font-normal">New Tech & Fits</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Discover{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
                What You
              </span>{' '}
              Love
              <span className="text-amber-500">.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Explore trending products, new varieties, and personalized recommendations curated just for your lifestyle with real-time AI styling.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreCategories}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Explore Categories</span>
              </button>
            </div>

            {/* Proof Metrics & Adjacency Trust Row */}
            <div className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1 text-slate-700">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">4.9/5</span>
                <span>(120k+ Shoppers)</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Same Day Dispatch</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Replicating uploaded mockup & image 1) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-white/90 via-sky-50/40 to-amber-50/40 border border-slate-200/80 shadow-xl overflow-hidden group">
              {/* Inner ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/20 rounded-full blur-2xl pointer-events-none" />

              {/* Floating Top Floating Badges */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-amber-700 text-xs font-bold border border-amber-200/80 shadow-xs backdrop-blur-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Trending Now <span className="text-emerald-600">+48% this week</span></span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI PICK FOR YOU</span>
                </div>
              </div>

              {/* Central Floating Composition Visual */}
              <div className="relative min-h-[300px] sm:min-h-[360px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100/70 to-slate-200/50 flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
                  alt="ZuAQ curated summer collection floating audio, footwear and wearables"
                  className="w-full h-full object-cover rounded-xl shadow-inner group-hover:scale-103 transition-transform duration-500 ease-out"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 rounded-xl pointer-events-none" />

                {/* Interactive Hotspot Pills on the Hero Card */}
                <div className="absolute top-6 left-6 z-20">
                  <button
                    onClick={() => onSelectProductById('beosound-horizon')}
                    className="group/tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-white/60"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 group-hover/tag:bg-white animate-ping"></span>
                    <span>BeoSound ANC • $289</span>
                  </button>
                </div>

                <div className="absolute bottom-16 right-6 z-20">
                  <button
                    onClick={() => onSelectProductById('cloudstrider-runner')}
                    className="group/tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-white/60"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover/tag:bg-white"></span>
                    <span>CloudStrider V3 • $145</span>
                  </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 hidden sm:block">
                  <button
                    onClick={() => onSelectProductById('apex-chrono')}
                    className="group/tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-white/60"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 group-hover/tag:bg-white"></span>
                    <span>Apex Titanium • $420</span>
                  </button>
                </div>

                {/* Bottom Left Offer Pill */}
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      <Zap className="w-4 h-4 fill-orange-500 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">Flash 40% Off</p>
                      <p className="text-[10px] text-slate-500">Flagship Tech Deals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
