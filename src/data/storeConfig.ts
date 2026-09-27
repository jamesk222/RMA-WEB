export interface Coupon {
  code: string;
  type: 'percent' | 'fixed' | 'free_shipping';
  value: number; // percentage or fixed dollar amount
  minOrder?: number;
  description: string;
}

export const STORE_CONFIG = {
  name: 'RMA Commerce LLC',
  legalName: 'RMA COMMERCE LLC',
  tagline: 'Modern U.S. Retail & Direct Everyday Essentials',
  domain: 'https://www.rmacommercellc.com',
  email: 'info@rmacommercellc.com',
  phone: '+44 7424 216486',
  address: {
    street: '30 N COULD ST 7848',
    city: 'SHERIDAN',
    state: 'WY',
    zip: '82801',
    country: 'United States',
  },
  shipping: {
    freeShippingThreshold: 35.0,
    standardRate: 4.99,
    expeditedRate: 9.99,
    standardDaysMin: 3,
    standardDaysMax: 5,
    expeditedDaysMin: 1,
    expeditedDaysMax: 2,
    dispatchHours: 24,
  },
  coupons: [
    {
      code: 'WELCOME10',
      type: 'percent',
      value: 10,
      description: '10% off your entire first purchase',
    },
    {
      code: 'SAVE15',
      type: 'percent',
      value: 15,
      minOrder: 50,
      description: '15% off qualifying orders over $50',
    },
    {
      code: 'FREESHIP',
      type: 'free_shipping',
      value: 0,
      description: 'Free standard shipping on any U.S. order',
    },
    {
      code: 'RMA20',
      type: 'percent',
      value: 20,
      minOrder: 75,
      description: '20% off VIP orders over $75',
    },
  ] as Coupon[],
  announcements: [
    '✨ Free U.S. Shipping on orders over $35 · 30-Day Hassle-Free Returns',
    '⚡ Direct Dispatch from Sheridan, WY Warehouse within 24 Hours',
    '💳 100% Secure Checkout with 256-bit SSL Encryption',
    '🔥 New Arrivals Dropping Weekly · Use code WELCOME10 for 10% Off',
  ],
};
