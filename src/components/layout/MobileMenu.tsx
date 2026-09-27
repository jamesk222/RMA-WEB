import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCategory, PageView } from '../../types';
import { STORE_CONFIG } from '../../data/storeConfig';
import {
  X,
  ChevronDown,
  ChevronRight,
  User,
  Heart,
  Package,
  Phone,
  Mail,
  MapPin,
  Flame,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { setPageView, navigateToCategory, wishlist, user } = useShop();
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCat((prev) => (prev === id ? null : id));
  };

  const handleNav = (view: PageView) => {
    setPageView(view);
    onClose();
  };

  const handleCatClick = (catId: ProductCategory, subcat?: string) => {
    navigateToCategory(catId, subcat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white text-slate-900 shadow-2xl flex flex-col h-full z-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <span className="font-display font-bold text-base text-slate-900 uppercase tracking-tight">
            Browse Store
          </span>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick User Actions */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs font-medium">
          <button
            onClick={() => handleNav('account')}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-950"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>{user ? `Hi, ${user.firstName}` : 'Sign In / Account'}</span>
          </button>
          <button
            onClick={() => handleNav('wishlist')}
            className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* Navigation Categories Accordion */}
        <div className="flex-1 py-2 overflow-y-auto divide-y divide-slate-100">
          {/* Shop All and Deals Highlights */}
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => handleNav('shop')}
              className="w-full text-left py-2 font-semibold text-sm text-slate-900 flex items-center justify-between"
            >
              <span>Shop All Products</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleCatClick('deals')}
              className="w-full text-left py-2 font-semibold text-sm text-rose-600 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Trending Deals & Clearance
              </span>
              <ChevronRight className="w-4 h-4 text-rose-400" />
            </button>
          </div>

          {/* Department Categories */}
          <div className="py-2">
            <div className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Departments
            </div>
            {CATEGORIES.filter((c) => c.id !== 'deals').map((category) => {
              const isExpanded = expandedCat === category.id;
              return (
                <div key={category.id} className="border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <button
                      onClick={() => handleCatClick(category.id)}
                      className="text-sm font-medium text-slate-800 hover:text-slate-950 text-left flex-1"
                    >
                      {category.name}
                    </button>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      aria-label={`Toggle ${category.name} subcategories`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-slate-900' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-50/70 px-6 py-2 space-y-3">
                      {category.groups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1.5">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            {group.groupName}
                          </p>
                          <ul className="space-y-1 pl-2 border-l border-slate-200">
                            {group.items.map((item) => (
                              <li key={item.id}>
                                <button
                                  onClick={() => handleCatClick(category.id, item.slug)}
                                  className="text-xs text-slate-600 hover:text-slate-900 py-0.5 text-left block w-full"
                                >
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <button
                        onClick={() => handleCatClick(category.id)}
                        className="text-xs font-bold text-sky-600 hover:underline pt-1 block"
                      >
                        View All {category.name} →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help & Order Tracking */}
          <div className="px-4 py-3 space-y-2 text-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Customer Support
            </div>
            <button
              onClick={() => handleNav('order-tracking')}
              className="w-full text-left py-1.5 text-slate-700 hover:text-slate-900 flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-slate-400" />
              <span>Track Your Order</span>
            </button>
            <button
              onClick={() => handleNav('faq')}
              className="w-full text-left py-1.5 text-slate-700 hover:text-slate-900 block"
            >
              Frequently Asked Questions (FAQ)
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="w-full text-left py-1.5 text-slate-700 hover:text-slate-900 block"
            >
              Contact Us & Support
            </button>
            <button
              onClick={() => handleNav('about')}
              className="w-full text-left py-1.5 text-slate-700 hover:text-slate-900 block"
            >
              About RMA Commerce LLC
            </button>
          </div>
        </div>

        {/* Footer info inside mobile drawer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{STORE_CONFIG.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{STORE_CONFIG.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
