import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { Order, CartItem } from '../types';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  ShoppingBag,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { orders, activeOrderId, setPageView, setActiveOrderId } = useShop();

  const currentOrder = orders.find((o: Order) => o.id === activeOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          No Recent Order Found
        </h2>
        <button
          onClick={() => setPageView('shop')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const handleTrackOrder = () => {
    setActiveOrderId(currentOrder.id);
    setPageView('order-tracking');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Success Hero Header */}
      <div className="text-center space-y-3 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Order Confirmed & Payment Authorized
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          We've sent a detailed receipt and tracking confirmation to{' '}
          <strong className="text-slate-900 font-semibold">{currentOrder.shippingAddress.email}</strong>.
        </p>

        <div className="inline-flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900">
          <span>Order Reference: {currentOrder.id}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleTrackOrder}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-2 transition-colors"
        >
          <Truck className="w-4 h-4" />
          <span>Track Delivery Status</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <button
          onClick={() => setPageView('shop')}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Itemized Order Receipt Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100 text-xs">
        {/* Top bar info */}
        <div className="p-6 bg-slate-50/80 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="font-bold text-slate-900 text-sm">RMA Commerce LLC Receipt</p>
            <p className="text-slate-500 mt-0.5">
              Placed on {currentOrder.date} · Fulfilled from Sheridan, WY
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
              Estimated U.S. Arrival
            </span>
            <span className="font-bold text-emerald-700 text-sm">
              {currentOrder.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* Shipping Destination & Carrier Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
              Shipping Address
            </h4>
            <p className="font-semibold text-slate-900">
              {currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}
            </p>
            <p className="text-slate-600">
              {currentOrder.shippingAddress.street}{' '}
              {currentOrder.shippingAddress.apartment}
            </p>
            <p className="text-slate-600">
              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
              {currentOrder.shippingAddress.zipCode}
            </p>
            <p className="text-slate-500">{currentOrder.shippingAddress.phone}</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
              Carrier & Tracking
            </h4>
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-sky-600" />
              <span>{currentOrder.carrier}</span>
            </p>
            <p className="font-mono text-slate-600">
              Tracking #: {currentOrder.trackingNumber}
            </p>
            <p className="text-emerald-600 font-medium">
              Status: {currentOrder.status}
            </p>
          </div>
        </div>

        {/* Item List */}
        <div className="p-6 space-y-4">
          <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
            Items Ordered
          </h4>
          <div className="divide-y divide-slate-100">
            {currentOrder.items.map((item: CartItem, idx: number) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-slate-100 border border-slate-200"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{item.product.name}</p>
                    <p className="text-slate-500 text-[11px]">
                      {item.selectedColor} · {item.selectedSize} · Qty: {item.quantity}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400">
                      SKU: {item.product.sku}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-slate-900 tabular-nums text-sm">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="p-6 bg-slate-50/60 space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              ${currentOrder.subtotal.toFixed(2)}
            </span>
          </div>

          {currentOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Promotional Discount ({currentOrder.couponCode})</span>
              <span className="font-semibold tabular-nums">
                -${currentOrder.discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {currentOrder.shippingFee === 0 ? 'FREE' : `$${currentOrder.shippingFee.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Estimated U.S. Domestic Tax</span>
            <span className="font-semibold text-slate-900 tabular-nums">
              ${currentOrder.tax.toFixed(2)}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-base text-slate-900">
            <span>Total Paid (USD)</span>
            <span className="tabular-nums text-lg">${currentOrder.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Support Info Box */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900">Need help with this order?</h4>
          <p className="text-slate-500 mt-0.5">
            Our domestic support team in Sheridan, WY is ready to assist you.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <a
            href={`mailto:${STORE_CONFIG.email}?subject=Question regarding Order ${currentOrder.id}`}
            className="flex items-center gap-1.5 text-slate-800 hover:text-sky-600"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{STORE_CONFIG.email}</span>
          </a>
          <a
            href={`tel:${STORE_CONFIG.phone}`}
            className="flex items-center gap-1.5 text-slate-800 hover:text-sky-600"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{STORE_CONFIG.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
