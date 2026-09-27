import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setPageView } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-800">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          Our Company & Mission
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
          About RMA Commerce LLC
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A modern U.S. online retail store dedicated to bringing customers a carefully selected range of useful, stylish, practical, and affordable products for everyday life.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Our Core Retail Approach
        </h2>
        <p>
          At RMA Commerce LLC, we believe that modern retail should be straightforward, dependable, and accessible. In an era where online marketplaces are crowded with low-quality novelties and inconsistent shipping, we take a different path: rigorous curation.
        </p>
        <p>
          We source and evaluate products across everyday fashion, tech and workspace accessories, home organization, beauty and hair tools, fitness, and lifestyle essentials. Our merchandising focus emphasizes products that are trending, visually clean, compact, lightweight, durable, and priced fairly—generally within the $15 to $50 range.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-xs">Carefully Selected</h3>
            <p className="text-xs text-slate-600">
              Every SKU is evaluated for real-world functionality, durability, and customer satisfaction before being added to our storefront.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-xs">U.S. Fulfillment</h3>
            <p className="text-xs text-slate-600">
              Orders dispatch promptly from our domestic operations hub at 30 N Could St in Sheridan, Wyoming, ensuring fast and traceable transit.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-xs">Customer Protection</h3>
            <p className="text-xs text-slate-600">
              We stand behind our catalog with 30-day hassle-free returns and responsive domestic email and telephone support.
            </p>
          </div>
        </div>
      </div>

      {/* Official Business Information Box */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg space-y-4">
        <h2 className="font-display text-xl font-bold text-white">
          Company Registration & Registered Office
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              Legal Business Entity
            </span>
            <p className="font-bold text-white text-sm">RMA COMMERCE LLC</p>
            <p className="text-slate-400">Wyoming Limited Liability Company</p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              Principal Address
            </span>
            <p className="font-bold text-white">30 N COULD ST 7848</p>
            <p className="text-slate-400">SHERIDAN, WY 82801, USA</p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              Direct Contact
            </span>
            <p className="text-white font-medium">{STORE_CONFIG.email}</p>
            <p className="text-white font-medium">{STORE_CONFIG.phone}</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <button
          onClick={() => setPageView('shop')}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Our Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
