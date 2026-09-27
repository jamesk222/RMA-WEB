import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { user, login, logout, orders, wishlist, setPageView, setActiveOrderId, showToast } =
    useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');

  // Auth form states if not logged in
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // New address modal
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: 'WY',
    zipCode: '',
    country: 'United States',
    isDefault: false,
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    login(emailInput, nameInput || undefined);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Reset Link Dispatched', `Password instructions sent to ${emailInput}`);
    setAuthMode('signin');
  };

  const handleTrackOrder = (orderId: string) => {
    setActiveOrderId(orderId);
    setPageView('order-tracking');
  };

  // If not logged in, display modern Sign In / Sign Up
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {authMode === 'signin' && 'Welcome to RMA Commerce'}
              {authMode === 'signup' && 'Create Your Account'}
              {authMode === 'forgot' && 'Reset Your Password'}
            </h1>
            <p className="text-xs text-slate-500">
              {authMode === 'signin' && 'Sign in to access your order history and saved addresses.'}
              {authMode === 'signup' && 'Track packages, save wishlist items, and unlock special promotions.'}
              {authMode === 'forgot' && 'Enter your email to receive recovery instructions.'}
            </p>
          </div>

          {authMode === 'forgot' ? (
            <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 text-white font-bold uppercase tracking-wider rounded-lg text-xs"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className="w-full text-center text-xs text-slate-600 hover:underline pt-2 block"
              >
                Back to Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              {authMode === 'signup' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Jessica Taylor"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="jessica.taylor@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Password</label>
                  {authMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-sky-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider rounded-lg text-xs shadow-sm transition-colors"
              >
                {authMode === 'signin' ? 'Sign In to Account' : 'Create Free Account'}
              </button>

              <div className="pt-2 text-center text-xs text-slate-600">
                {authMode === 'signin' ? (
                  <span>
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="font-bold text-slate-900 underline"
                    >
                      Create one
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="font-bold text-slate-900 underline"
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Quick Demo Access Helper */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 text-center">
            <span>Tip: Enter any email to explore the interactive customer dashboard.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-display text-xl font-bold">
            {user.firstName[0]}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 hover:text-rose-600 hover:border-rose-300 rounded-lg text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Tab Selector */}
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between p-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Order History</span>
            </span>
            <span className="text-[10px] tabular-nums font-bold">
              ({orders.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center justify-between p-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'addresses'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </span>
            <span className="text-[10px] tabular-nums font-bold">
              ({user.savedAddresses.length})
            </span>
          </button>

          <button
            onClick={() => setPageView('wishlist')}
            className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
            </span>
            <span className="text-[10px] tabular-nums font-bold">
              ({wishlist.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between p-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings & Privacy</span>
            </span>
          </button>
        </div>

        {/* Right: Tab Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Your Orders & Tracking
              </h2>

              {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
                  You haven't placed any orders yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100 text-xs"
                  >
                    <div className="p-4 bg-slate-50 flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{order.id}</span>
                        <p className="text-slate-500 mt-0.5">
                          Placed on {order.date} · {order.items.length} items
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-sm tabular-nums">
                          ${order.total.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-wider rounded"
                        >
                          Track Package
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.product.images[0]}
                              alt={it.product.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 object-cover rounded bg-slate-100 border border-slate-200"
                            />
                            <div>
                              <p className="font-semibold text-slate-900">{it.product.name}</p>
                              <p className="text-slate-500 text-[11px]">
                                {it.selectedColor} · {it.selectedSize} · Qty: {it.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-slate-800 tabular-nums">
                            ${(it.unitPrice * it.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Saved Shipping Addresses
                </h2>
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {user.savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 relative"
                  >
                    {addr.isDefault && (
                      <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded">
                        Default Address
                      </span>
                    )}
                    <p className="font-bold text-slate-900">
                      {addr.firstName} {addr.lastName}
                    </p>
                    <p className="text-slate-600">
                      {addr.street} {addr.apartment}
                    </p>
                    <p className="text-slate-600">
                      {addr.city}, {addr.state} {addr.zipCode}
                    </p>
                    <p className="text-slate-500">{addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6 text-xs max-w-xl">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Personal Information & Security
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.firstName}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Account Email
                  </label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user.email}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-2">
                    Change Password
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="New Secure Password"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showToast('Preferences Saved', 'Your account settings were updated.')}
                  className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-lg text-xs uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
