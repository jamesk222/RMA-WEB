import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
  } = useShop();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0]?.colorName || ''
  );
  const [imageError, setImageError] = useState(false);

  const isFavorited = isWishlisted(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  const handleCardClick = () => {
    navigateToProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor, product.variants[0]?.size);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Unique color variations
  const uniqueColors = Array.from(
    new Set(product.variants.map((v) => v.colorName).filter(Boolean))
  );

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-lg border border-slate-200/80 overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer text-left"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <ShoppingBag className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
            <span className="text-xs font-medium text-slate-500 line-clamp-1">
              {product.name}
            </span>
          </div>
        ) : (
          <img
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            onMouseEnter={() => {
              if (product.images.length > 1) setCurrentImageIndex(1);
            }}
            onMouseLeave={() => setCurrentImageIndex(0)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Top Badges (Subtle, single badge per card) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-slate-900 bg-white/90 backdrop-blur-xs rounded shadow-2xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white bg-rose-600 rounded shadow-2xs">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick View Actions */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full transition-colors backdrop-blur-xs shadow-xs ${
              isFavorited
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/85 text-slate-700 hover:text-slate-950 hover:bg-white'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>

          <button
            onClick={handleQuickView}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/85 text-slate-700 hover:text-slate-950 hover:bg-white shadow-xs backdrop-blur-xs"
            aria-label="Quick preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Slide-up Quick Add button on desktop hover */}
        <div className="absolute bottom-2.5 inset-x-2.5 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata: Category & SKU */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[10px] text-slate-400">{product.sku}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-medium text-sm text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-700 tabular-nums">
              {product.rating}
            </span>
            <span className="text-[11px] text-slate-400 tabular-nums">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Variant Row */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Indicators */}
          {uniqueColors.length > 1 && (
            <div className="flex items-center gap-1">
              {uniqueColors.slice(0, 3).map((colName, idx) => {
                const variant = product.variants.find((v) => v.colorName === colName);
                return (
                  <span
                    key={idx}
                    title={colName}
                    style={{ backgroundColor: variant?.colorHex || '#ccc' }}
                    className="w-2.5 h-2.5 rounded-full border border-slate-300"
                  />
                );
              })}
              {uniqueColors.length > 3 && (
                <span className="text-[10px] text-slate-400 tabular-nums font-medium">
                  +{uniqueColors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <div className="mt-2.5 sm:hidden">
          <button
            onClick={handleQuickAdd}
            className="w-full py-1.5 px-3 bg-slate-900 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
