import React from 'react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/storeConfig';
import { ProductCategory, PageView } from '../../types';
import { Logo } from '../common/Logo';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPageView, navigateToCategory } = useShop();

  const handleCategory = (id: ProductCategory) => {
    navigateToCategory(id);
  };

  const handlePage = (view: PageView) => {
    setPageView(view);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      {/* Trust bar before footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-900 rounded-lg text-sky-400 shrink-0 border border-slate-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free U.S. Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Complimentary standard delivery on all qualifying domestic orders over $35.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-900 rounded-lg text-emerald-400 shrink-0 border border-slate-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Hassle-free return policy with prepaid shipping labels for eligible items.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-900 rounded-lg text-amber-400 shrink-0 border border-slate-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">256-Bit SSL Checkout</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Bank-grade tokenized payments with zero raw card storage on server.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-slate-900 rounded-lg text-purple-400 shrink-0 border border-slate-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Sheridan, WY Operations</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Registered U.S. retail business dedicated to verified quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 5-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile & Address */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" theme="dark" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              RMA Commerce LLC is an independent modern multi-category retailer based in Sheridan, Wyoming. We curate trending, lightweight, high-utility lifestyle products across fashion, home, fitness, beauty, and tech accessories.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  {STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} {STORE_CONFIG.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`tel:${STORE_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {STORE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`mailto:${STORE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {STORE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Shop Departments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategory('womens-fashion')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Women's Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('mens-fashion')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Men's Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('shoes')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Shoes & Slides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('bags-accessories')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Bags & Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('jewelry')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Jewelry & Gold Vermeil
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('beauty-hair')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Beauty & Hair Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('home-lifestyle')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Home & Organization
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('sports-fitness')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Sports & Fitness
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('electronics-accessories')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Tech & Desk Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('deals')}
                  className="text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                >
                  Trending Deals & Steals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handlePage('order-tracking')}
                  className="hover:text-white transition-colors text-slate-400 flex items-center gap-1.5"
                >
                  <span>Track Your Package</span>
                  <span className="text-[10px] bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded">USPS/UPS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('contact')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('faq')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('shipping-policy')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('returns-policy')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('account')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  My Customer Account
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handlePage('about')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  About RMA Commerce
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('privacy-policy')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Privacy Policy (CCPA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('terms')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('accessibility')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Accessibility Statement
                </button>
              </li>
              <li>
                <span className="text-slate-500 text-[11px] block pt-2 leading-relaxed">
                  Marketplace ready for Walmart, TikTok Shop & Poshmark cross-listing.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Payment Methods, Secure Seals, Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © {new Date().getFullYear()} RMA COMMERCE LLC. All rights reserved. 30 N COULD ST 7848, SHERIDAN, WY 82801.
            </p>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Accepted Payment:</span>
            {['VISA', 'Mastercard', 'AMEX', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'].map(
              (method) => (
                <span
                  key={method}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300 rounded shadow-2xs"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
