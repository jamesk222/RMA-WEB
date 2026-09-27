import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { ShieldCheck, Truck, RotateCcw, Lock, CheckCircle2 } from 'lucide-react';

export const ShippingPolicyView: React.FC = () => {
  const { setPageView } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          Customer Service
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">
          Domestic U.S. Shipping Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Effective Date: {new Date().getFullYear()} · RMA Commerce LLC
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">1. Dispatch Location & Fulfillment</h2>
          <p>
            All retail products sold on rmacommercellc.com are processed, inspected, and shipped directly from our primary domestic fulfillment facility located at:
            <br />
            <strong>RMA COMMERCE LLC</strong>, 30 N Could St 7848, Sheridan, WY 82801, United States.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">2. Order Processing Timelines</h2>
          <p>
            Orders received Monday through Friday before 2:00 PM Mountain Time (MT) are packed and dispatched on the same business day. Orders placed after 2:00 PM MT or over the weekend will dispatch on the following business day. Standard fulfillment handling time is 24 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">3. Shipping Rates & Transit Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 mt-2">
              <thead className="bg-slate-50 font-bold text-slate-800 text-xs">
                <tr>
                  <th className="p-3 border border-slate-200">Shipping Method</th>
                  <th className="p-3 border border-slate-200">Estimated Transit</th>
                  <th className="p-3 border border-slate-200">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Standard Domestic (USPS Priority Mail)</td>
                  <td className="p-3 border border-slate-200">3 – 5 Business Days</td>
                  <td className="p-3 border border-slate-200 font-bold text-emerald-700">FREE on orders $35+ ($4.99 under $35)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Expedited Priority (UPS Ground Express)</td>
                  <td className="p-3 border border-slate-200">1 – 2 Business Days</td>
                  <td className="p-3 border border-slate-200 font-bold">$9.99 Flat Rate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">4. Real-Time Tracking</h2>
          <p>
            As soon as your shipping label is generated, an automated email containing an official carrier tracking link (USPS or UPS) will be transmitted to the email address provided during checkout. You can also monitor real-time checkpoints anytime on our <button onClick={() => setPageView('order-tracking')} className="text-sky-600 font-bold underline">Order Tracking Page</button>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ReturnsPolicyView: React.FC = () => {
  const { setPageView } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Customer Satisfaction Guarantee
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">
          30-Day Returns & Refund Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          RMA Commerce LLC · Transparent & Hassle-Free Returns
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">1. 30-Day Return Window</h2>
          <p>
            We want you to be completely delighted with your purchase. You may return any eligible product within <strong>30 calendar days</strong> from the date of confirmed package delivery for a full refund back to your original payment method or store exchange.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">2. Item Condition Requirements</h2>
          <p>
            To qualify for a full refund, items must be returned in good, undamaged condition, with all original tags, accessories, cords, and packaging intact. We do not charge restocking fees on approved customer returns.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">3. Damaged, Defective or Incorrect Items</h2>
          <p>
            If your package arrives with shipping damage or manufacturing defects, contact us within 7 days at <a href={`mailto:${STORE_CONFIG.email}`} className="text-sky-600 underline font-semibold">{STORE_CONFIG.email}</a> with photos. We will immediately dispatch a replacement at zero charge or issue an immediate refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">4. How to Return Your Item</h2>
          <ol className="list-decimal list-inside space-y-1.5 pl-2">
            <li>Contact our support team via <button onClick={() => setPageView('contact')} className="text-sky-600 underline font-bold">Contact Us</button> or email info@rmacommercellc.com.</li>
            <li>Receive your prepaid domestic return shipping label and RMA Return Authorization slip.</li>
            <li>Drop off the package at any authorized USPS or UPS drop-off location.</li>
            <li>Upon arrival at our Sheridan, WY warehouse, our team will inspect and issue your refund within 2 business days.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Legal & Compliance
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">
          Privacy Policy (CCPA Compliant)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Last Updated: September 2026 · RMA COMMERCE LLC
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
        <p>
          RMA Commerce LLC ("we", "us", or "our") respects your personal privacy. This Privacy Policy discloses our information gathering and dissemination practices for our website at www.rmacommercellc.com.
        </p>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">1. Information We Collect</h2>
          <p>
            When you place an order or create an account, we collect necessary contact information (name, shipping address, billing address, phone number, and email address). We use this information solely to process orders, communicate shipment tracking, and provide customer support.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">2. Payment Security & PCI Compliance</h2>
          <p>
            <strong>We do NOT store raw payment card numbers or CVV codes on our servers.</strong> All payment transactions are securely tokenized and handled directly through PCI-DSS Level 1 certified processors using 256-bit SSL encryption.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">3. California Consumer Privacy Act (CCPA)</h2>
          <p>
            Under the CCPA, California residents have the right to request disclosure of what personal information is collected, the right to request deletion of personal information, and the right not to be discriminated against. We never sell or rent your personal data to third-party data brokers.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Legal & Terms
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          RMA COMMERCE LLC · Sheridan, WY
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">1. Acceptance of Terms</h2>
          <p>
            By accessing or purchasing from www.rmacommercellc.com, you agree to be bound by these Terms and Conditions and all applicable domestic laws of the State of Wyoming and the United States.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">2. Product Pricing & Accuracy</h2>
          <p>
            Prices are listed in U.S. Dollars (USD). We strive for absolute accuracy in pricing, dimensions, and specifications. In the unlikely event of a typographical error, we reserve the right to cancel or amend orders before dispatch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">3. Multi-Channel Retail & Intellectual Property</h2>
          <p>
            All brand graphics, logos, product descriptions, and original website content are the property of RMA COMMERCE LLC. Products are prepared for multi-channel listing on authorized platforms including Walmart Marketplace, TikTok Shop, and Poshmark.
          </p>
        </section>
      </div>
    </div>
  );
};

export const AccessibilityView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          Inclusivity & Standards
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900 mt-1">
          Accessibility Statement (WCAG 2.2 AA)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Commitment to Universal Web Accessibility
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
        <p>
          RMA Commerce LLC is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards adhering to the Web Content Accessibility Guidelines (WCAG) 2.2 level AA.
        </p>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">Measures Taken</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Semantic HTML5 structure with logical heading hierarchies across all pages.</li>
            <li>High-contrast text complying with 4.5:1 minimum ratios for body copy.</li>
            <li>Full keyboard navigation support, visible focus rings, and skip-to-content logic.</li>
            <li>Descriptive alt text on all product photography and graphic iconography.</li>
            <li>Accessible form labels, explicit input descriptions, and screen-reader announcements.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-base">Feedback & Contact</h2>
          <p>
            If you encounter any accessibility barriers on our website, please contact our accessibility coordinator at <a href={`mailto:${STORE_CONFIG.email}`} className="text-sky-600 underline font-semibold">{STORE_CONFIG.email}</a> or telephone {STORE_CONFIG.phone}. We will promptly work to accommodate your needs.
          </p>
        </section>
      </div>
    </div>
  );
};
