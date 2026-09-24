import React from 'react';
import { Home, Grid, Search, ShoppingBag, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAIStylist: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenAIStylist,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 flex items-center justify-around lg:hidden shadow-lg">
      {/* Home */}
      <button
        onClick={() => onSelectTab('home')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Categories */}
      <button
        onClick={() => onSelectTab('categories')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'categories'
            ? 'text-blue-600 font-bold'
            : 'text-slate-500'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">Categories</span>
      </button>

      {/* Search / AI */}
      <button
        onClick={onOpenAIStylist}
        className="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">Search</span>
      </button>

      {/* Cart */}
      <button
        onClick={onOpenCart}
        className="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer relative"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px]">Cart</span>
      </button>

      {/* Account / Admin */}
      <button
        onClick={() => onSelectTab('admin')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
          currentTab === 'admin' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Admin</span>
      </button>
    </nav>
  );
};
