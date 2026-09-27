import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Search, X, Star, ArrowRight, Tag, Clock } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const POPULAR_SEARCHES = [
    'Everyday Cardigan',
    'Everywhere Belt Bag',
    'Cloud Slides',
    '3-in-1 MagSafe Charger',
    'Pet Grooming Brush',
    '40oz Straw Tumbler',
    '18K Gold Necklace',
    'Heatless Hair Curler',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global keydown listener for Escape and Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search filter
  const matchingProducts: Product[] = cleanQuery
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.subcategory.toLowerCase().includes(cleanQuery) ||
          p.sku.toLowerCase().includes(cleanQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanQuery)) ||
          p.shortDescription.toLowerCase().includes(cleanQuery)
        );
      })
    : [];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    navigateToProduct(product);
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, category, SKU, or keyword..."
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-900 rounded"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!cleanQuery ? (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSuggestionClick(item)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Trending Categories
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => handleSuggestionClick('Cardigan')}
                    className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded text-slate-700"
                  >
                    Women's Knitwear
                  </button>
                  <button
                    onClick={() => handleSuggestionClick('Slides')}
                    className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded text-slate-700"
                  >
                    Cloud Pillow Slides
                  </button>
                  <button
                    onClick={() => handleSuggestionClick('Charging')}
                    className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded text-slate-700"
                  >
                    MagSafe Chargers
                  </button>
                  <button
                    onClick={() => handleSuggestionClick('Pet')}
                    className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded text-slate-700"
                  >
                    Pet Grooming
                  </button>
                </div>
              </div>
            </div>
          ) : matchingProducts.length === 0 ? (
            <div className="py-8 text-center text-slate-500 space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                No matching products found for "{query}"
              </p>
              <p className="text-xs text-slate-400">
                Try searching for broader keywords like "bag", "shoes", "jacket", or "fitness".
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Found {matchingProducts.length} Products
              </div>
              <div className="divide-y divide-slate-100">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="py-2.5 px-2 flex items-center gap-3.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded bg-slate-100 shrink-0 border border-slate-200/60"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-mono">
                        <span>{p.sku}</span>
                        <span>·</span>
                        <span className="capitalize font-sans">{p.category.replace('-', ' ')}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ${p.price.toFixed(2)}
                        </span>
                        {p.compareAtPrice && (
                          <span className="text-[11px] text-slate-400 line-through tabular-nums">
                            ${p.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          {p.rating}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search RMA Commerce catalog</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
              ESC
            </kbd>{' '}
            to close
          </span>
        </div>
      </div>
    </div>
  );
};
