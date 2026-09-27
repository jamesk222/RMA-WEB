import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Tag,
  ArrowLeft,
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    freeShippingProgress,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    calculatedShipping,
    finalTotal,
    setPageView,
    navigateToProduct,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-slate-900">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Looks like you haven't added anything to your cart yet. Discover trending styles, everyday tech accessories, and curated home organizers.
          </p>
        </div>
        <button
          onClick={() => setPageView('shop')}
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your selected items before proceeding to secure checkout.
          </p>
        </div>

        <button
          onClick={() => setPageView('shop')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
          <span className="flex items-center gap-1.5 text-slate-800">
            <Truck className="w-4 h-4 text-sky-600" />
            {amountNeededForFreeShipping > 0 ? (
              <span>
                Add <strong className="font-bold text-slate-900">${amountNeededForFreeShipping.toFixed(2)}</strong> more to unlock Free U.S. Domestic Shipping!
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold">
                Congratulations! You qualified for Free U.S. Domestic Shipping! 🎉
              </span>
            )}
          </span>
          <span className="text-slate-500 font-bold tabular-nums">
            {freeShippingProgress}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              freeShippingProgress >= 100 ? 'bg-emerald-500' : 'bg-slate-900'
            }`}
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
            <span>Product</span>
            <div className="flex gap-16 mr-4">
              <span>Qty</span>
              <span>Subtotal</span>
            </div>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                  onClick={() => navigateToProduct(item.product)}
                />
                <div className="min-w-0">
                  <h3
                    onClick={() => navigateToProduct(item.product)}
                    className="font-bold text-sm text-slate-900 hover:text-sky-600 cursor-pointer transition-colors truncate"
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Color: {item.selectedColor} · Size: {item.selectedSize}
                  </p>
                  <p className="text-xs font-medium text-slate-700 mt-1 tabular-nums">
                    ${item.unitPrice.toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                {/* Steppers */}
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-slate-500 hover:text-slate-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold tabular-nums text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-slate-500 hover:text-slate-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="font-bold text-sm text-slate-900 tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-slate-50 flex items-center justify-between">
            <button
              onClick={clearCart}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              Clear Entire Cart
            </button>
            <span className="text-xs text-slate-500">
              Direct dispatch from Sheridan, WY
            </span>
          </div>
        </div>

        {/* Right: Summary Box (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          {/* Promo code */}
          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  {appliedCoupon.code} (-${discountAmount.toFixed(2)})
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold underline text-emerald-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    if (promoError) setPromoError(null);
                  }}
                  placeholder="Coupon code (WELCOME10)"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg uppercase focus:outline-hidden focus:border-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && (
              <p className="text-xs text-rose-600 mt-1">{promoError}</p>
            )}
          </div>

          {/* Pricing lines */}
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Promotional Discount</span>
                <span className="font-semibold tabular-nums">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated U.S. Shipping</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {calculatedShipping === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${calculatedShipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Domestic Tax</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${(Math.max(0, cartSubtotal - discountAmount) * 0.065).toFixed(2)}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
              <span>Estimated Total</span>
              <span className="tabular-nums text-lg">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setPageView('checkout')}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe & Encrypted Transactions</span>
            </div>
            <p>
              Your payment information is tokenized using bank-grade 256-bit encryption. We never store raw card numbers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
