import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, Check, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateToProduct,
  } = useShop();

  const product = quickViewProduct;

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.variants[0]?.colorName || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.variants[0]?.size || ''
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    handleClose();
  };

  const handleFullDetail = () => {
    navigateToProduct(product);
    handleClose();
  };

  const uniqueColors = Array.from(
    new Set(product.variants.map((v) => v.colorName).filter(Boolean))
  );
  const uniqueSizes = Array.from(
    new Set(product.variants.map((v) => v.size).filter(Boolean))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-900 bg-white/80 hover:bg-white shadow-xs z-20 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 bg-slate-50 p-6 flex flex-col justify-between">
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-md overflow-hidden border-2 shrink-0 transition-colors ${
                    selectedImage === idx
                      ? 'border-slate-900'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="capitalize">{product.category.replace('-', ' ')}</span>
              <span>·</span>
              <span className="font-mono text-slate-400">{product.sku}</span>
            </div>

            <h2 className="font-display text-xl font-bold text-slate-900 leading-tight mb-2">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-800 tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ${(product.compareAtPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {product.shortDescription}
            </p>

            {/* Color selection */}
            {uniqueColors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Color: <span className="text-slate-900 font-normal">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {uniqueColors.map((colorName) => {
                    const variant = product.variants.find((v) => v.colorName === colorName);
                    const isSelected = selectedColor === colorName;
                    return (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName || '')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: variant?.colorHex || '#bbb' }}
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                        />
                        <span>{colorName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size / Option selection */}
            {uniqueSizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Size / Option: <span className="text-slate-900 font-normal">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {uniqueSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size || '')}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                        selectedSize === size
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium mb-4">
              <Check className="w-3.5 h-3.5" />
              <span>In Stock — Dispatches within 24h from Sheridan, WY</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-200 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-2 text-slate-600 hover:text-slate-900 text-sm font-semibold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold tabular-nums text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-2 text-slate-600 hover:text-slate-900 text-sm font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

            <button
              onClick={handleFullDetail}
              className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-950 py-1 transition-colors flex items-center justify-center gap-1"
            >
              <span>View Full Product Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
