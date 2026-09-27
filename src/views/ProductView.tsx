import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Product, ProductVariant, ProductReview } from '../types';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Check,
  ShoppingBag,
  CreditCard,
  Plus,
  Minus,
  CheckCircle2,
  Package,
} from 'lucide-react';

export const ProductView: React.FC = () => {
  const {
    activeProduct,
    setPageView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    showToast,
  } = useShop();

  const product = activeProduct || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0]?.colorName || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants[0]?.size || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');

  const isFavorited = isWishlisted(product.id);

  // Delivery estimation (current date + 3 to 5 business days)
  const today = new Date();
  const estMin = new Date(today);
  estMin.setDate(today.getDate() + 3);
  const estMax = new Date(today);
  estMax.setDate(today.getDate() + 5);

  const formattedEstMin = estMin.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedEstMax = estMax.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p: Product) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Bundle product
  const bundleAddon = PRODUCTS.find((p: Product) => p.id !== product.id) || PRODUCTS[1];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setPageView('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to your clipboard!');
    } else {
      showToast('Share Link', window.location.href);
    }
  };

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor, selectedSize);
    addToCart(bundleAddon, 1);
    showToast('Bundle Added!', `Added ${product.name} and ${bundleAddon.name} to your bag.`);
  };

  const uniqueColors: string[] = Array.from(
    new Set(product.variants.map((v: ProductVariant) => v.colorName).filter((c): c is string => Boolean(c)))
  );
  const uniqueSizes: string[] = Array.from(
    new Set(product.variants.map((v: ProductVariant) => v.size).filter((s): s is string => Boolean(s)))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
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
          onClick={() => setPageView('shop')}
          className="hover:text-slate-900 transition-colors"
        >
          Shop
        </button>
        <span aria-hidden="true">/</span>
        <span className="capitalize text-slate-600">
          {product.category.replace('-', ' ')}
        </span>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-slate-900 truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left + Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-slate-900 text-xs font-bold uppercase tracking-wider rounded shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors bg-slate-100 ${
                    selectedImageIndex === idx
                      ? 'border-slate-900 shadow-xs'
                      : 'border-transparent opacity-75 hover:opacity-100'
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

        {/* Right: Sticky Contiguous Purchase Module (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200/90 shadow-sm space-y-6">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="capitalize font-medium">
                {product.category.replace('-', ' ')}
              </span>
              <span className="font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Ratings and Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800 tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                · {product.reviewCount} verified reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2 border-t border-slate-100">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-slate-400 line-through tabular-nums">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            {product.compareAtPrice && (
              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 font-bold text-xs rounded border border-rose-100">
                Save ${(product.compareAtPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color Selection */}
          {uniqueColors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider">
                  Color:
                </span>
                <span className="text-slate-600 font-medium">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map((colorName: string) => {
                  const variant = product.variants.find((v: ProductVariant) => v.colorName === colorName);
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName || '')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <span
                        style={{ backgroundColor: variant?.colorHex || '#ccc' }}
                        className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      />
                      <span>{colorName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size / Option Selection */}
          {uniqueSizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider">
                  Size / Option:
                </span>
                <span className="text-slate-600 font-medium">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((size: string) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size || '')}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Stock Status */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider">
                Quantity:
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" />
                In Stock ({product.stockCount} available)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 hover:text-slate-950 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-xs font-bold tabular-nums text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-600 hover:text-slate-950 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Wishlist & Share row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-1.5 font-semibold transition-colors ${
                isFavorited ? 'text-rose-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Product</span>
            </button>
          </div>

          {/* Delivery & Shipping estimate card */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">
                  Estimated Delivery: {formattedEstMin} – {formattedEstMax}
                </p>
                <p className="text-[11px] text-slate-500">
                  Dispatches within 24 hours directly from Sheridan, WY warehouse via USPS Priority Mail.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">30-Day Hassle-Free Returns</p>
                <p className="text-[11px] text-slate-500">
                  Full refund or exchange if you are not 100% satisfied.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Accordions for In-Depth Info */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'desc', label: 'Description & Features' },
            { id: 'specs', label: 'Specifications & Materials' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-6 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900 bg-slate-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Product Overview
              </h3>
              <p>{product.description}</p>
              <div className="pt-2">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">
                  Key Benefits & Highlights
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-600">
                  <li>Quality tested for modern U.S. consumer lifestyle demands.</li>
                  <li>Lightweight and compact design engineered for longevity and portability.</li>
                  <li>Zero toxic chemicals, hypoallergenic where applicable, and eco-conscious construction.</li>
                  <li>Cross-listed on authorized marketplace channels with verified inventory integrity.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Technical Specifications
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                <div className="flex p-3 bg-slate-50">
                  <span className="w-1/3 font-semibold text-slate-600">Product SKU</span>
                  <span className="w-2/3 font-mono font-medium text-slate-900">{product.sku}</span>
                </div>
                {product.specifications.material && (
                  <div className="flex p-3">
                    <span className="w-1/3 font-semibold text-slate-600">Material</span>
                    <span className="w-2/3 text-slate-900">{product.specifications.material}</span>
                  </div>
                )}
                {product.specifications.weight && (
                  <div className="flex p-3 bg-slate-50">
                    <span className="w-1/3 font-semibold text-slate-600">Shipping Weight</span>
                    <span className="w-2/3 text-slate-900">{product.specifications.weight}</span>
                  </div>
                )}
                {product.specifications.dimensions && (
                  <div className="flex p-3">
                    <span className="w-1/3 font-semibold text-slate-600">Dimensions</span>
                    <span className="w-2/3 text-slate-900">{product.specifications.dimensions}</span>
                  </div>
                )}
                {product.specifications.care && (
                  <div className="flex p-3 bg-slate-50">
                    <span className="w-1/3 font-semibold text-slate-600">Care Instructions</span>
                    <span className="w-2/3 text-slate-900">{product.specifications.care}</span>
                  </div>
                )}
                <div className="flex p-3">
                  <span className="w-1/3 font-semibold text-slate-600">Marketplace GTIN</span>
                  <span className="w-2/3 font-mono text-slate-900">
                    {product.marketplace.gtin || '840192837401'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Domestic U.S. Shipping Policy
              </h3>
              <p>
                All orders are processed and packed at our operations center in Sheridan, WY. Standard shipping takes 3–5 business days within the contiguous United States. Expedited shipping is available at checkout for 1–2 business day transit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Standard U.S. Shipping</h4>
                  <p className="text-xs text-slate-600">
                    Complimentary on all orders $35+ ($4.99 on orders under $35).
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Priority Expedited</h4>
                  <p className="text-xs text-slate-600">
                    $9.99 flat-rate with guaranteed UPS / USPS Priority express delivery.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Customer Testimonials
                  </h3>
                  <p className="text-xs text-slate-500">
                    Showing verified customer reviews for {product.name}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    {product.rating} / 5.0
                  </span>
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-4 divide-y divide-slate-100">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev: ProductReview) => (
                    <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{rev.author}</span>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h4 className="font-semibold text-slate-800 text-xs">{rev.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="pt-2 space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Sarah M.</span>
                        <span className="text-xs text-slate-400">Sep 2026</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">
                        Extremely happy with this purchase. High quality finish, feels much more expensive than it is. Arrived in neat packaging from Sheridan, WY.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frequently Bought Together Bundle Module */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200">
        <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
          Frequently Bought Together
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-lg object-cover bg-white border border-slate-200 shadow-2xs"
            />
            <span className="text-xl font-bold text-slate-400">+</span>
            <img
              src={bundleAddon.images[0]}
              alt={bundleAddon.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-lg object-cover bg-white border border-slate-200 shadow-2xs"
            />
          </div>

          <div className="flex-1 space-y-1 text-xs">
            <p className="font-semibold text-slate-900">
              Bundle: {product.name} + {bundleAddon.name}
            </p>
            <p className="text-slate-500">
              Buy both items together and qualify for immediate Free Domestic U.S. Shipping!
            </p>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                ${(product.price + bundleAddon.price).toFixed(2)}
              </span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Free Shipping Qualified
              </span>
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            className="w-full md:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors shrink-0"
          >
            Add Both to Bag
          </button>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-slate-900">
              You May Also Like
            </h3>
            <button
              onClick={() => setPageView('shop')}
              className="text-xs font-bold text-slate-900 hover:text-sky-600 uppercase tracking-wider"
            >
              Explore Collection →
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
