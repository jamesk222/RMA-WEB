import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { ProductCategory, CategoryMeta } from '../../types';
import { Logo } from '../common/Logo';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Flame,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    setPageView,
    navigateToCategory,
    cartCount,
    wishlist,
    user,
    setIsCartOpen,
    setIsSearchOpen,
  } = useShop();

  const [activeMegaCategory, setActiveMegaCategory] = useState<CategoryMeta | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'shop') => {
    setActiveMegaCategory(null);
    setPageView(view);
  };

  const handleCategoryHover = (catId: ProductCategory) => {
    const found = CATEGORIES.find((c) => c.id === catId);
    if (found) {
      setActiveMegaCategory(found);
    }
  };

  const handleCategoryClick = (catId: ProductCategory) => {
    setActiveMegaCategory(null);
    navigateToCategory(catId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        {/* Main top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Zone 1: Mobile Hamburger + Brand Wordmark Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleNavClick('home')}
                className="focus:outline-hidden text-left"
                aria-label="RMA Commerce LLC Home"
              >
                <Logo variant="full" />
              </button>
            </div>

            {/* Desktop Quick Search Bar in center */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-full transition-colors group cursor-text"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  <span className="text-slate-500 font-normal">
                    Search trending styles, tech, home, essentials...
                  </span>
                </span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Zone 3: Actions (Search Mobile, Account, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Search store"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              <button
                onClick={() => setPageView('account')}
                className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Customer Account"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline-block text-xs font-semibold max-w-[80px] truncate">
                  {user ? user.firstName : 'Sign In'}
                </span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setPageView('wishlist')}
                className="relative p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                aria-label={`Wishlist (${wishlist.length} items)`}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors shadow-2xs group"
                aria-label={`Shopping Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 text-slate-200 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold tabular-nums">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Category Navigation Bar (Desktop) */}
        <div className="hidden lg:block border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center justify-between text-xs font-semibold tracking-wide uppercase overflow-x-auto no-scrollbar py-2.5">
              <button
                onClick={() => handleNavClick('home')}
                className="text-slate-700 hover:text-slate-950 py-1 transition-colors whitespace-nowrap"
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('shop')}
                className="text-slate-700 hover:text-slate-950 py-1 transition-colors whitespace-nowrap"
              >
                Shop All
              </button>

              {/* Major categories with mega menu triggers */}
              {[
                { id: 'womens-fashion', label: 'Women' },
                { id: 'mens-fashion', label: 'Men' },
                { id: 'shoes', label: 'Shoes' },
                { id: 'bags-accessories', label: 'Bags & Accessories' },
                { id: 'jewelry', label: 'Jewelry' },
                { id: 'beauty-hair', label: 'Beauty & Hair' },
                { id: 'home-lifestyle', label: 'Home & Living' },
                { id: 'sports-fitness', label: 'Fitness' },
                { id: 'pet-supplies', label: 'Pet Supplies' },
                { id: 'electronics-accessories', label: 'Tech & Desk' },
                { id: 'kids-baby', label: 'Kids & Baby' },
              ].map((cat) => (
                <div
                  key={cat.id}
                  className="relative py-1"
                  onMouseEnter={() => handleCategoryHover(cat.id as ProductCategory)}
                >
                  <button
                    onClick={() => handleCategoryClick(cat.id as ProductCategory)}
                    className="flex items-center gap-1 text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap"
                  >
                    <span>{cat.label}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
                  </button>
                </div>
              ))}

              {/* Deals Highlight */}
              <button
                onClick={() => handleCategoryClick('deals')}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold py-1 transition-colors whitespace-nowrap"
              >
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Deals</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        {activeMegaCategory && (
          <MegaMenu
            category={activeMegaCategory}
            onClose={() => setActiveMegaCategory(null)}
          />
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
