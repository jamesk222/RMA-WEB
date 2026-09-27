import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setPageView, navigateToProduct } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p: Product) => wishlist.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
          Save your favorite trending finds, fashion apparel, and tech accessories so you can easily revisit them later.
        </p>
        <button
          onClick={() => setPageView('shop')}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            My Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your saved items with real-time stock and price change tracking.
          </p>
        </div>

        <button
          onClick={() => setPageView('shop')}
          className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-slate-100 cursor-pointer" onClick={() => navigateToProduct(product)}>
              <img
                src={product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-2.5 right-2.5 p-2 bg-white/90 rounded-full text-rose-600 hover:bg-white shadow-xs"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] text-slate-400 capitalize">
                  {product.category.replace('-', ' ')}
                </p>
                <h3
                  onClick={() => navigateToProduct(product)}
                  className="font-bold text-xs text-slate-900 line-clamp-1 hover:text-sky-600 cursor-pointer mt-0.5"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bold text-sm text-slate-900 tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleMoveToCart(product)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
