import React, { useState } from 'react';
import { ZuAQLogo } from './ZuAQLogo';
import { Globe, Share2, Smartphone, MessageCircle, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <ZuAQLogo size="md" />
            <p className="text-slate-500 max-w-sm leading-relaxed text-xs">
              Pioneering intuitive, joyful commerce through intelligence, ultra-curated aesthetics, and frictionless delivery worldwide.
            </p>

            <div className="flex items-center gap-2 pt-2 text-slate-400">
              <button
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                title="Global Region"
                aria-label="Global Region"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                title="Share ZuAQ"
                aria-label="Share ZuAQ"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                title="Mobile App"
                aria-label="Mobile App"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenPrivacy}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                title="Privacy & AI Controls"
                aria-label="Privacy & AI Controls"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-xs">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('Electronics')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Electronics & Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Fashion')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Apparel & Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Home & Lifestyle')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Smart Living & Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Beauty')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Wellness & Grooming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Accessories')}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  Eco Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Col */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-xs">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#track" className="hover:text-blue-600 transition-colors">
                  Track Package
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-blue-600 transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-blue-600 transition-colors">
                  Shipping Rates
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-blue-600 transition-colors font-semibold text-slate-800"
                >
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe Col */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-xs">
              Subscribe & Receive 15% Off
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Join 240,000+ conscious trendsetters. Get exclusive product drops and AI recommendations right to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Subscribed! Use code WELCOME10 for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none text-xs focus:border-blue-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal Copyright Row */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 ZuAQ Commerce Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              Privacy Notice
            </button>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
