import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_CONFIG } from '../data/storeConfig';
import { ShippingAddress } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowLeft,
  Info,
} from 'lucide-react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    calculatedShipping,
    finalTotal,
    user,
    placeOrder,
    setPageView,
    showToast,
  } = useShop();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1 & 2: Contact & Shipping Form
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: user?.firstName || 'Jessica',
    lastName: user?.lastName || 'Taylor',
    email: user?.email || 'jessica.taylor@example.com',
    phone: user?.phone || '(307) 555-0194',
    street: user?.savedAddresses[0]?.street || '1428 Maple Crest Way',
    apartment: user?.savedAddresses[0]?.apartment || 'Apt 4B',
    city: user?.savedAddresses[0]?.city || 'Cheyenne',
    state: user?.savedAddresses[0]?.state || 'WY',
    zipCode: user?.savedAddresses[0]?.zipCode || '82001',
    country: 'United States',
  });

  // Step 3: Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'expedited'>('standard');

  // Step 4: Payment Method (Secure token simulator)
  const [paymentType, setPaymentType] = useState<'card' | 'paypal' | 'apple_pay'>('card');
  const [cardHolder, setCardHolder] = useState('Jessica Taylor');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [saveInfoForNextTime, setSaveInfoForNextTime] = useState(true);

  // Form error state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Your cart is currently empty
        </h2>
        <p className="text-xs text-slate-500">
          Add items to your bag before heading to checkout.
        </p>
        <button
          onClick={() => setPageView('shop')}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validateStep1And2 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required for shipping tracking';
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zipCode.trim() || formData.zipCode.length < 5) errors.zipCode = 'Valid 5-digit ZIP is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (targetStep: number) => {
    if (targetStep > 2 && !validateStep1And2()) {
      showToast('Missing Details', 'Please complete all required shipping fields', 'error');
      return;
    }
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    if (!validateStep1And2()) {
      setCurrentStep(1);
      return;
    }

    placeOrder(formData, shippingMethod);
  };

  const activeShippingFee =
    shippingMethod === 'expedited'
      ? STORE_CONFIG.shipping.expeditedRate
      : calculatedShipping;

  const currentOrderTotal = Number(
    (cartSubtotal - discountAmount + activeShippingFee + (Math.max(0, cartSubtotal - discountAmount) * 0.065)).toFixed(2)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Secure U.S. Checkout
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted · Direct Dispatch from Sheridan, WY</span>
          </div>
        </div>

        <button
          onClick={() => setPageView('cart')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto text-center text-xs">
        {[
          { step: 1, title: 'Customer & Address' },
          { step: 3, title: 'Shipping Method' },
          { step: 4, title: 'Payment' },
          { step: 5, title: 'Review & Confirm' },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => handleNextStep(s.step)}
            className={`py-2 border-b-2 font-semibold transition-colors ${
              currentStep === s.step
                ? 'border-slate-900 text-slate-900'
                : currentStep > s.step
                ? 'border-emerald-600 text-emerald-700'
                : 'border-slate-200 text-slate-400'
            }`}
          >
            <span className="block text-[10px] uppercase text-slate-400">Step {s.step}</span>
            <span className="truncate block">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Two Column Layout: Main Step Form Left + Sticky Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Form Left (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
          {/* STEP 1 & 2: Contact & Shipping */}
          {(currentStep === 1 || currentStep === 2) && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  1. Contact Information
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  We'll send order confirmations and USPS/UPS tracking numbers here.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                  {formErrors.email && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number (for carrier updates) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                  {formErrors.phone && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  2. Shipping Address
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Deliveries to residential & business addresses across all 50 U.S. states.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                  {formErrors.firstName && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                  {formErrors.lastName && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.lastName}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                    placeholder="e.g. 1428 Maple Crest Way"
                  />
                  {formErrors.street && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.street}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Apartment, Suite, Unit (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.apartment || ''}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                  {formErrors.city && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-slate-900"
                  />
                  {formErrors.zipCode && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.zipCode}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleNextStep(3)}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                >
                  <span>Continue to Shipping Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Shipping Method */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  3. Select Shipping Method
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Shipment dispatches directly from our Sheridan, WY domestic fulfillment facility.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_opt"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-slate-900"
                    />
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-sky-600" />
                        <span>USPS Priority Mail (Standard Domestic)</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Estimated 3–5 business days transit time with door-to-door tracking.
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-slate-900 tabular-nums">
                    {calculatedShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `$${STORE_CONFIG.shipping.standardRate.toFixed(2)}`
                    )}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'expedited'
                      ? 'border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_opt"
                      checked={shippingMethod === 'expedited'}
                      onChange={() => setShippingMethod('expedited')}
                      className="accent-slate-900"
                    />
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-purple-600" />
                        <span>UPS Ground Expedited Express</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Estimated 1–2 business days transit time with prioritized queue handling.
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-slate-900 tabular-nums">
                    ${STORE_CONFIG.shipping.expeditedRate.toFixed(2)}
                  </span>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  ← Back to Address
                </button>

                <button
                  type="button"
                  onClick={() => handleNextStep(4)}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  4. Secure Payment Method
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  All transactions are encrypted and tokenized via PCI-DSS Level 1 compliant gateway.
                </p>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentType('card')}
                  className={`py-3 px-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    paymentType === 'card'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('apple_pay')}
                  className={`py-3 px-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    paymentType === 'apple_pay'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span className="font-bold">Apple / Google Pay</span>
                  <span className="text-[10px] opacity-80">1-Touch Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('paypal')}
                  className={`py-3 px-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                    paymentType === 'paypal'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span className="font-bold text-sky-400">PayPal</span>
                  <span className="text-[10px] opacity-80">Pay Later</span>
                </button>
              </div>

              {/* Tokenized Card Fields Simulation */}
              {paymentType === 'card' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-4 text-xs">
                  <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Encrypted Card Entry</span>
                    </span>
                    <div className="flex gap-1 text-[10px] font-mono">
                      <span>VISA</span> · <span>MC</span> · <span>AMEX</span> · <span>DISC</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Expiration (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="save_info"
                      checked={saveInfoForNextTime}
                      onChange={(e) => setSaveInfoForNextTime(e.target.checked)}
                      className="rounded accent-slate-900"
                    />
                    <label htmlFor="save_info" className="text-slate-600 cursor-pointer">
                      Save shipping address & token for faster checkout next time
                    </label>
                  </div>
                </div>
              )}

              {paymentType === 'apple_pay' && (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-slate-800 mx-auto" />
                  <p className="font-bold text-slate-900 text-sm">Apple / Google Pay Ready</p>
                  <p className="text-xs text-slate-500">
                    Click "Review & Place Order" below to authorize transaction via your device biometric authentication.
                  </p>
                </div>
              )}

              {paymentType === 'paypal' && (
                <div className="p-6 bg-sky-50/60 rounded-xl border border-sky-200 text-center space-y-2">
                  <p className="font-bold text-sky-900 text-sm">PayPal Checkout Integration</p>
                  <p className="text-xs text-slate-600">
                    You will be directed to PayPal's secure portal upon order placement to complete your purchase.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  ← Back to Shipping
                </button>

                <button
                  type="button"
                  onClick={() => handleNextStep(5)}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                >
                  <span>Review Final Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Confirmation */}
          {currentStep === 5 && (
            <div className="space-y-6 text-xs">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  5. Review & Confirm Order
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Please review your delivery destination, shipping method, and order breakdown.
                </p>
              </div>

              {/* Review summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-900 uppercase">Ship To</span>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sky-600 hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900 pt-1">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-slate-600">
                    {formData.street} {formData.apartment}
                  </p>
                  <p className="text-slate-600">
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                  <p className="text-slate-500">{formData.phone}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-900 uppercase">Method & Payment</span>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="text-sky-600 hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900 pt-1">
                    {shippingMethod === 'expedited'
                      ? 'UPS Ground Expedited Express (1-2 Days)'
                      : 'USPS Priority Mail Standard (3-5 Days)'}
                  </p>
                  <p className="text-slate-600 capitalize">
                    Payment: {paymentType === 'card' ? 'Credit Card (**** 4242)' : paymentType}
                  </p>
                  <p className="text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>30-Day Hassle-Free Returns Included</span>
                  </p>
                </div>
              </div>

              {/* Items List in Checkout */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-3 bg-slate-50 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Order Items ({cart.length})
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded bg-slate-100 border border-slate-200"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
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

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  ← Back to Payment
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order (${currentOrderTotal.toFixed(2)})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary Sidebar (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Summary ({cart.length} items)
          </h3>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Promotional Savings</span>
                <span className="font-semibold tabular-nums">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping ({shippingMethod === 'expedited' ? 'Expedited' : 'Standard'})</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {activeShippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${activeShippingFee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated U.S. Domestic Tax</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${(Math.max(0, cartSubtotal - discountAmount) * 0.065).toFixed(2)}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
              <span>Total USD</span>
              <span className="tabular-nums text-lg">${currentOrderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>RMA Commerce Guarantee</span>
            </p>
            <p>
              Direct dispatch from Sheridan, WY. Guaranteed tracking numbers issued within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
