import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { Order, CartItem } from '../types';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, activeOrderId, setActiveOrderId, showToast } = useShop();

  const [orderInput, setOrderInput] = useState(activeOrderId || 'RMA-US-784892');
  const [emailInput, setEmailInput] = useState('jessica.taylor@example.com');
  const [searchedOrder, setSearchedOrder] = useState<Order | undefined>(() => {
    return orders.find((o: Order) => o.id === (activeOrderId || 'RMA-US-784892')) || orders[0];
  });
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderInput.trim().toUpperCase();
    const cleanEmail = emailInput.trim().toLowerCase();

    const found = orders.find(
      (o: Order) =>
        o.id.toUpperCase() === cleanId ||
        o.shippingAddress.email.toLowerCase() === cleanEmail
    );

    if (found) {
      setSearchedOrder(found);
      setActiveOrderId(found.id);
      setHasSearched(true);
      showToast('Tracking Found', `Live updates for order ${found.id}`);
    } else {
      setSearchedOrder(undefined as any);
      setHasSearched(true);
      showToast('Order Not Found', 'Please check your order number or email', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          Domestic U.S. Shipment Tracking
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Track Your Package
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Enter your RMA Commerce LLC order number and email to check live carrier transit status and estimated arrival.
        </p>
      </div>

      {/* Tracking Search Input Box */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrackSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Order Number
              </label>
              <input
                type="text"
                required
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="e.g. RMA-US-784892"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Account / Order Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. jessica.taylor@example.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Live Tracking</span>
          </button>
        </form>
      </div>

      {/* Results View */}
      {hasSearched && searchedOrder ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100 text-xs">
          {/* Header row */}
          <div className="p-6 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-100 text-sky-800 font-bold text-xs rounded-full">
                <Truck className="w-3.5 h-3.5 text-sky-700" />
                <span>{searchedOrder.status}</span>
              </span>
              <p className="font-mono text-sm font-bold text-slate-900 pt-1">
                Order #{searchedOrder.id}
              </p>
              <p className="text-slate-500">
                Carrier: {searchedOrder.carrier} · Tracking: {searchedOrder.trackingNumber}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                Estimated Delivery
              </span>
              <span className="font-bold text-emerald-700 text-base">
                {searchedOrder.estimatedDelivery}
              </span>
              <p className="text-[11px] text-slate-400">
                Dispatched from Sheridan, WY
              </p>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="p-6 space-y-6">
            <h3 className="font-display text-base font-bold text-slate-900">
              Shipment Progress Timeline
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 ml-2">
              {searchedOrder.timeline.map((event: { status: string; timestamp: string; location: string; completed: boolean }, idx: number) => (
                <div key={idx} className="relative">
                  {/* Circle milestone */}
                  <div
                    className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      event.completed
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {event.completed && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>

                  <div>
                    <p
                      className={`font-semibold text-xs ${
                        event.completed ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {event.status}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {event.timestamp}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Contents */}
          <div className="p-6 space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
              Shipment Contents ({searchedOrder.items.length} items)
            </h3>
            <div className="divide-y divide-slate-100">
              {searchedOrder.items.map((item: CartItem, idx: number) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover bg-slate-100 border border-slate-200"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{item.product.name}</p>
                      <p className="text-slate-500 text-[11px]">
                        {item.selectedColor} · {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="p-8 bg-white rounded-xl border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">
            No matching order found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Please verify the order number (e.g., RMA-US-784892) and matching email address entered during checkout.
          </p>
        </div>
      ) : null}
    </div>
  );
};
