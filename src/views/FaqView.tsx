import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ChevronDown, HelpCircle, Package, Truck, RotateCcw, CreditCard } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'orders' | 'shipping' | 'returns' | 'payment';
}

const FAQS: FaqItem[] = [
  {
    category: 'shipping',
    q: 'How long does domestic U.S. shipping take?',
    a: 'Standard U.S. delivery via USPS Priority Mail typically arrives within 3 to 5 business days from dispatch. Expedited UPS Ground delivery arrives within 1 to 2 business days. All orders dispatch from our Sheridan, WY facility within 24 hours of placement.',
  },
  {
    category: 'shipping',
    q: 'What are the shipping costs?',
    a: 'We offer Free Standard U.S. Shipping on all orders of $35 or more! For orders under $35, standard domestic delivery is a flat $4.99. Expedited express delivery is available for $9.99.',
  },
  {
    category: 'shipping',
    q: 'Where do your products ship from?',
    a: 'Every item in our store is stored, quality inspected, and dispatched directly from our domestic operations center at 30 N Could St in Sheridan, Wyoming, USA.',
  },
  {
    category: 'returns',
    q: 'What is your return and refund policy?',
    a: 'We offer a 30-day hassle-free return window. If you are not satisfied with your purchase, you may initiate a return within 30 days of package delivery for a full refund or exchange, provided the item is in unused condition with original packaging.',
  },
  {
    category: 'returns',
    q: 'How do I initiate a return?',
    a: 'Simply visit our Contact page or email info@rmacommercellc.com with your order number. Our support team will issue a prepaid return shipping label and return authorization instructions.',
  },
  {
    category: 'orders',
    q: 'How can I track my order?',
    a: 'Once your order is processed, you will receive an email with your official USPS or UPS tracking number. You can also track your shipment anytime on our Order Tracking page by entering your order number (e.g., RMA-US-784892) and email.',
  },
  {
    category: 'payment',
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are encrypted and tokenized with 256-bit bank-grade SSL security.',
  },
  {
    category: 'orders',
    q: 'Are your products suitable for marketplace cross-listing?',
    a: 'Yes, RMA Commerce LLC sources and curates retail products designed for multi-channel commerce, complying with UPC/GTIN standards suitable for Walmart Marketplace, TikTok Shop, and Poshmark.',
  },
];

export const FaqView: React.FC = () => {
  const { setPageView } = useShop();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCat = selectedCat === 'all' || f.category === selectedCat;
    const matchesSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          Knowledge Base & Help Center
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Find fast answers regarding orders, domestic shipping times, returns, payment security, and our Sheridan, WY operations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search question or topic (e.g. shipping, return, tracking)..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-slate-900 shadow-2xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
        {[
          { id: 'all', label: 'All FAQs' },
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'returns', label: 'Returns & Refunds' },
          { id: 'orders', label: 'Orders & Tracking' },
          { id: 'payment', label: 'Payments & Security' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCat(tab.id)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCat === tab.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No matching questions found for "{search}". Please contact us for assistance.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help CTA */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-xs space-y-2">
        <p className="font-bold text-slate-900 text-sm">Still have questions?</p>
        <p className="text-slate-500">
          Our customer service team is ready to help you with personalized answers.
        </p>
        <button
          onClick={() => setPageView('contact')}
          className="mt-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold uppercase tracking-wider text-xs"
        >
          Contact Support Team
        </button>
      </div>
    </div>
  );
};
