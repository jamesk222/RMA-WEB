import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const { setPageView } = useShop();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
        <ShoppingBag className="w-10 h-10 stroke-1 text-slate-500" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
          404 Error · Page Not Found
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          LOOKS LIKE THIS PAGE WENT SHOPPING.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          The link you followed may be broken, or the product or category page may have been relocated. Discover our newest trending collections below.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => setPageView('shop')}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md inline-flex items-center gap-2 transition-colors"
        >
          <span>CONTINUE SHOPPING</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
