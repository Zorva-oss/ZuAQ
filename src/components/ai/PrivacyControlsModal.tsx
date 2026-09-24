import React from 'react';
import { X, ShieldCheck, Trash2, Eye, Sliders, Check } from 'lucide-react';
import { UserActivity } from '../../types';

interface PrivacyControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userActivity: UserActivity;
  onToggleTracking: (enabled: boolean) => void;
  onClearActivity: () => void;
}

export const PrivacyControlsModal: React.FC<PrivacyControlsModalProps> = ({
  isOpen,
  onClose,
  userActivity,
  onToggleTracking,
  onClearActivity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              ZuAQ AI Privacy & Preference Controls
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 pt-4 text-xs">
          {/* Tracking Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5 max-w-xs">
              <span className="font-bold text-slate-900 block text-sm">
                On-Site AI Personalization
              </span>
              <p className="text-slate-500 leading-relaxed">
                Uses in-session browsing to recommend relevant products. Data never leaves your private session.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={userActivity.trackingEnabled}
                onChange={(e) => onToggleTracking(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Current Inferred Preferences */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Current Session Data
            </h4>
            <div className="p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Products Explored:</span>
                <span className="font-bold text-slate-800">
                  {userActivity.viewedProductIds.length} items
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Search Queries:</span>
                <span className="font-bold text-slate-800">
                  {userActivity.searches.length > 0
                    ? userActivity.searches.join(', ')
                    : 'None yet'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inferred Interests:</span>
                <span className="font-bold text-blue-600">
                  {userActivity.preferredCategories.join(', ') || 'General Lifestyle'}
                </span>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Statement */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-emerald-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Zero 3rd-Party Tracking Guarantee</span>
            </p>
            <p className="text-emerald-700 text-[11px] leading-relaxed">
              ZuAQ avoids collecting unnecessary personal data. No invasive ad networks, no data brokers, and complete compliance with global privacy standards.
            </p>
          </div>

          {/* Clear Activity Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onClearActivity}
              className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset & Clear History</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
