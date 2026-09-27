import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Truck, ShieldCheck, Tag, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { setPageView } = useShop();

  if (!isVisible) return null;

  return (
    <aside aria-label="Store announcement" className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left hint */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sheridan, WY Domestic Fulfillment</span>
        </div>

        {/* Center promotional message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center font-medium">
          <Truck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>
            <strong className="text-white font-semibold">Free U.S. Shipping</strong> on orders over $35 · 30-Day Hassle-Free Returns
          </span>
          <span className="hidden sm:inline-block text-slate-500 font-normal">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-amber-300 font-medium">
            <Tag className="w-3 h-3" />
            Use code <span className="underline font-bold tracking-wider">WELCOME10</span> for 10% Off
          </span>
        </div>

        {/* Right quick actions */}
        <div className="flex items-center gap-4 text-slate-400">
          <button
            onClick={() => setPageView('order-tracking')}
            className="hidden md:inline-block text-slate-300 hover:text-white transition-colors"
          >
            Track Order
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-0.5 rounded"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
