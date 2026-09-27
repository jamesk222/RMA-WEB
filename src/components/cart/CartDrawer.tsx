import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { STORE_CONFIG } from '../../data/storeConfig';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
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
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
  };

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

  const handleCheckoutClick = () => {
    handleClose();
    setPageView('checkout');
  };

  const handleViewCartClick = () => {
    handleClose();
    setPageView('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white text-slate-900 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            <span className="font-display font-bold text-base uppercase tracking-tight">
              Your Shopping Bag
            </span>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              ({cart.length} items)
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Truck className="w-4 h-4 text-sky-600" />
              {amountNeededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-slate-900 font-bold">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free U.S. Shipping
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  You unlocked Free Domestic Shipping! 🎉
                </span>
              )}
            </span>
            <span className="text-slate-400 font-semibold tabular-nums text-[11px]">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                freeShippingProgress >= 100 ? 'bg-emerald-500' : 'bg-slate-900'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Your bag is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Explore our curated collections of everyday essentials, apparel, and trending finds.
              </p>
              <button
                onClick={() => {
                  handleClose();
                  setPageView('shop');
                }}
                className="mt-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Discover Trending Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-3.5 flex gap-3.5">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 rounded-md object-cover bg-slate-100 border border-slate-200/60 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.selectedColor} · {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Steppers */}
                    <div className="flex items-center border border-slate-200 rounded">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold tabular-nums text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer calculations & checkout actions */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    Code {appliedCoupon.code} applied (-${discountAmount.toFixed(2)})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-emerald-700 hover:text-emerald-950 font-bold underline"
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
                    placeholder="Promo code (WELCOME10)"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-hidden focus:border-slate-900 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-200 hover:bg-slate-300 rounded transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
              )}
            </div>

            {/* Price lines */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
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

              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                <span>Estimated Total</span>
                <span className="tabular-nums text-base">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-center">
                <button
                  onClick={handleViewCartClick}
                  className="py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 border border-slate-300 rounded transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleClose}
                  className="py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 border border-slate-300 rounded transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct fulfillment from Sheridan, WY · 30-Day Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
