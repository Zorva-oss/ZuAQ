import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, Film } from 'lucide-react';
import { VIDEO_PROMOTIONS } from '../../data/mockData';
import { VideoPromotion, Product } from '../../types';

interface VideoShowcaseProps {
  onSelectProductById: (productId: string) => void;
  onAddToCartById: (productId: string) => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  onSelectProductById,
  onAddToCartById,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activePromo = VIDEO_PROMOTIONS[activeVideoIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSelectVideo = (idx: number) => {
    setActiveVideoIndex(idx);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-100 mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Pictures & Video Advertising 🎥</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ZuAQ Spotlight Campaigns
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Watch real product demonstrations, studio builds, and seasonal fashion drops in action.
            </p>
          </div>
        </div>

        {/* Video Player + Campaign Reel Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Video Stage */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-slate-950 aspect-video shadow-2xl border border-slate-800 group">
            <video
              ref={videoRef}
              src={activePromo.videoUrl}
              poster={activePromo.poster}
              muted={isMuted}
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex flex-col justify-between p-4 sm:p-6">
              {/* Top Controls */}
              <div className="flex items-center justify-between">
                <span className="bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Shoppable Ad Reel
                </span>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Center Big Play Button (shows when paused) */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="self-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 hover:bg-white text-blue-600 hover:scale-108 transition-all flex items-center justify-center shadow-xl cursor-pointer"
                  title="Play product demonstration"
                >
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-blue-600 translate-x-0.5" />
                </button>
              )}

              {/* Bottom Card Overlay: Product Callout & Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/20">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {activePromo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {activePromo.subtitle}
                  </p>
                </div>

                {/* Shoppable Product Pill */}
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/40 shrink-0">
                  <img
                    src={activePromo.product.image}
                    alt={activePromo.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                  />
                  <div className="pr-2">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {activePromo.product.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-black text-blue-600">
                        ${activePromo.product.price}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">
                        {activePromo.product.discount}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectProductById(activePromo.product.id)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Campaign Cards Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Featured Spotlights ({VIDEO_PROMOTIONS.length})
            </h4>

            {VIDEO_PROMOTIONS.map((promo, idx) => {
              const isSelected = activeVideoIndex === idx;
              return (
                <div
                  key={promo.id}
                  onClick={() => handleSelectVideo(idx)}
                  className={`p-3 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-100'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={promo.poster}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-blue-600 shadow-xs">
                        <Play className="w-3 h-3 fill-blue-600 translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                      {promo.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${
                        isSelected ? 'text-blue-600' : 'text-slate-900'
                      }`}
                    >
                      {promo.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {promo.subtitle}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-600 mt-1">
                      Featured: {promo.product.name}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Banner Ad Promo Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ZuAQ Creator Collective</span>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed mb-3">
                Tag #ZuAQStyle with your unboxing video to be featured on our official commercial reel and win $500 monthly store credit!
              </p>
              <button
                onClick={() => onAddToCartById('beosound-horizon')}
                className="w-full py-2 bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
              >
                Join the Summer Drop
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
