import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCategory, Product, CategoryMeta, ProductVariant, SubCategory, CategoryGroup } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    setPageView,
  } = useShop();

  // Filters state
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Category Meta
  const activeCategoryMeta = CATEGORIES.find((c: CategoryMeta) => c.id === selectedCategory);

  // Gather unique available colors from catalog
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p: Product) => {
      p.variants.forEach((v: ProductVariant) => {
        if (v.colorName) set.add(v.colorName);
      });
    });
    return Array.from(set);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'deals') {
        if (product.category !== selectedCategory) return false;
      }

      // Deals filter
      if (selectedCategory === 'deals') {
        if (selectedPriceTier === 'under-15') {
          if (product.price >= 15) return false;
        } else if (selectedPriceTier === 'under-25') {
          if (product.price >= 25) return false;
        } else {
          // General deals condition: compareAtPrice exists or badge is SALE/TRENDING
          if (!product.compareAtPrice && product.badge !== 'SALE' && product.badge !== 'TRENDING') {
            return false;
          }
        }
      }

      // Subcategory filter
      if (selectedSubcategory && selectedSubcategory !== 'all') {
        if (product.subcategory !== selectedSubcategory) return false;
      }

      // Price Tier filter
      if (selectedPriceTier === 'under-15' && product.price >= 15) return false;
      if (selectedPriceTier === '15-25' && (product.price < 15 || product.price > 25)) return false;
      if (selectedPriceTier === '25-40' && (product.price < 25 || product.price > 40)) return false;
      if (selectedPriceTier === 'over-40' && product.price <= 40) return false;

      // Rating filter
      if (selectedRating > 0 && product.rating < selectedRating) return false;

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = product.variants.some((v: ProductVariant) => v.colorName?.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      // In stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a: Product, b: Product) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // featured default
    });
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedPriceTier,
    selectedRating,
    selectedColor,
    inStockOnly,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedPriceTier('all');
    setSelectedRating(0);
    setSelectedColor('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedSubcategory !== null ||
    selectedPriceTier !== 'all' ||
    selectedRating > 0 ||
    selectedColor !== 'all' ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => setPageView('home')}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </button>
        <span aria-hidden="true">/</span>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
          }}
          className={`${!selectedCategory ? 'font-semibold text-slate-900' : 'hover:text-slate-900'} transition-colors`}
        >
          Catalog
        </button>
        {activeCategoryMeta && (
          <>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900">
              {activeCategoryMeta.name}
            </span>
          </>
        )}
        {selectedSubcategory && (
          <>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-slate-900 capitalize">
              {selectedSubcategory.replace('-', ' ')}
            </span>
          </>
        )}
      </nav>

      {/* Category Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white/10 rounded text-[11px] font-semibold text-sky-300">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>US Warehouse Direct Fulfillment</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {activeCategoryMeta ? activeCategoryMeta.name : 'All Products & Departments'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeCategoryMeta
              ? activeCategoryMeta.tagline
              : 'Explore our complete catalog of curated, high-demand everyday essentials, fashion, tech, and home organization.'}
          </p>
        </div>

        {/* Quick Department pills */}
        <div className="flex flex-wrap gap-1.5 md:max-w-md justify-start md:justify-end">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              selectedCategory === null
                ? 'bg-white text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {CATEGORIES.slice(0, 6).map((c: CategoryMeta) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCategory(c.id);
                setSelectedSubcategory(null);
              }}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                selectedCategory === c.id
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block space-y-6 text-xs">
          {/* Header & Reset */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <span>Filters</span>
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Department Selection */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Categories
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className={`w-full text-left py-1 px-2 rounded font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                All Departments ({PRODUCTS.length})
              </button>

              {CATEGORIES.map((cat: CategoryMeta) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory(null);
                  }}
                  className={`w-full text-left py-1 px-2 rounded font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">
                    {PRODUCTS.filter((p: Product) => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (if a category with groups is selected) */}
          {activeCategoryMeta && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Subcategories
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pl-1">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`w-full text-left py-1 px-2 rounded transition-colors ${
                    selectedSubcategory === null
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All {activeCategoryMeta.name}
                </button>
                {activeCategoryMeta.groups.flatMap((g: CategoryGroup) => g.items).map((item: SubCategory) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSubcategory(item.slug)}
                    className={`w-full text-left py-1 px-2 rounded transition-colors ${
                      selectedSubcategory === item.slug
                        ? 'bg-slate-200 text-slate-900 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Tiers */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Price
            </h4>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-15', label: 'Under $15' },
                { id: '15-25', label: '$15 to $25' },
                { id: '25-40', label: '$25 to $40' },
                { id: 'over-40', label: 'Over $40' },
              ].map((tier) => (
                <label
                  key={tier.id}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 py-0.5"
                >
                  <input
                    type="radio"
                    name="price_tier"
                    checked={selectedPriceTier === tier.id}
                    onChange={() => setSelectedPriceTier(tier.id)}
                    className="accent-slate-900"
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Color
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedColor('all')}
                className={`px-2 py-1 rounded text-[11px] border font-medium ${
                  selectedColor === 'all'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                All
              </button>
              {availableColors.slice(0, 10).map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-2 py-1 rounded text-[11px] border font-medium ${
                    selectedColor.toLowerCase() === col.toLowerCase()
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Customer Rating
            </h4>
            <div className="space-y-1">
              {[
                { stars: 0, label: 'All Ratings' },
                { stars: 4.8, label: '★ 4.8 & Above' },
                { stars: 4.5, label: '★ 4.5 & Above' },
              ].map((rate) => (
                <label
                  key={rate.stars}
                  className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 py-0.5"
                >
                  <input
                    type="radio"
                    name="rating_filter"
                    checked={selectedRating === rate.stars}
                    onChange={() => setSelectedRating(rate.stars)}
                    className="accent-slate-900"
                  />
                  <span>{rate.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-slate-900"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
              </button>

              <span className="text-slate-500">
                Showing{' '}
                <strong className="text-slate-900 font-semibold tabular-nums">
                  {filteredProducts.length}
                </strong>{' '}
                products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded font-medium text-slate-800 focus:outline-hidden focus:border-slate-900"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Active:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium">
                  Category: {selectedCategory}
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium">
                  Sub: {selectedSubcategory}
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedPriceTier !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium">
                  Price: {selectedPriceTier}
                  <button
                    onClick={() => setSelectedPriceTier('all')}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedColor !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium">
                  Color: {selectedColor}
                  <button
                    onClick={() => setSelectedColor('all')}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-1"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-xl bg-slate-50 border border-slate-200 p-8 space-y-4">
              <h3 className="font-display font-bold text-xl text-slate-800">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn't find any products matching your specific combination of filters. Try clearing or relaxing some filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 text-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold uppercase tracking-wider text-slate-900 text-sm">
                  Filter Catalog
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Tiers */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase">Price Range</h4>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-15', label: 'Under $15' },
                    { id: '15-25', label: '$15 to $25' },
                    { id: '25-40', label: '$25 to $40' },
                    { id: 'over-40', label: 'Over $40' },
                  ].map((tier) => (
                    <label key={tier.id} className="flex items-center gap-2 py-1">
                      <input
                        type="radio"
                        name="mob_price"
                        checked={selectedPriceTier === tier.id}
                        onChange={() => setSelectedPriceTier(tier.id)}
                      />
                      <span>{tier.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 py-1 font-semibold">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-slate-900 text-white font-bold rounded uppercase tracking-wider text-xs"
              >
                Apply & View ({filteredProducts.length})
              </button>
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 text-slate-600 hover:text-slate-900 font-semibold"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
