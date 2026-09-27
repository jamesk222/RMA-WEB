import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Package,
  RotateCcw,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast, setPageView } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState('Order Status / Tracking');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Incomplete Form', 'Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Message Sent', 'Our customer support team will reply within 24 hours.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          We Are Here To Help
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Contact RMA Commerce LLC
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Have a question regarding an order, product specifications, or returns? Reach out to our customer care team in Sheridan, Wyoming.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Support Quick Links (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700">
            <h2 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Direct Contact Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">Registered Address</h3>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {STORE_CONFIG.legalName}
                    <br />
                    {STORE_CONFIG.address.street}
                    <br />
                    {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} {STORE_CONFIG.address.zip}
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">Email Inquiries</h3>
                  <a
                    href={`mailto:${STORE_CONFIG.email}`}
                    className="text-sky-600 hover:underline font-semibold block mt-0.5"
                  >
                    {STORE_CONFIG.email}
                  </a>
                  <p className="text-slate-400 text-[11px]">
                    Responses typically delivered within 12–24 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">Telephone Support</h3>
                  <a
                    href={`tel:${STORE_CONFIG.phone}`}
                    className="text-slate-900 font-semibold block mt-0.5"
                  >
                    {STORE_CONFIG.phone}
                  </a>
                  <p className="text-slate-400 text-[11px]">
                    Monday – Friday: 9:00 AM – 5:00 PM (Mountain Time)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">Warehouse Dispatch Hours</h3>
                  <p className="text-slate-600 mt-0.5">
                    Orders process Monday through Saturday with 24-hour turnaround.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Resolution Shortcuts */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Need Quick Help?
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setPageView('order-tracking')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 font-semibold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-sky-600" />
                  <span>Check Package Tracking</span>
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => setPageView('faq')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 font-semibold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Read Frequently Asked Questions</span>
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => setPageView('returns-policy')}
                className="w-full flex items-center justify-between p-2.5 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 font-semibold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Returns Policy & Instructions</span>
                </span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Message Received!
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting RMA Commerce LLC. A member of our support team will review your inquiry and respond to <strong className="text-slate-900">{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-1">
                Send Us a Direct Message
              </h2>
              <p className="text-slate-500 mb-4">
                Please complete the form below and we will respond as soon as possible.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jessica Taylor"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica.taylor@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Order Number (optional)
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. RMA-US-784892"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subject Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  >
                    <option value="Order Status / Tracking">Order Status / Tracking</option>
                    <option value="Product Sizing & Information">Product Sizing & Information</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Damaged / Defective Item">Damaged / Defective Item</option>
                    <option value="General Retail Inquiry">General Retail Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today? Please include any relevant details..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider rounded-lg text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
