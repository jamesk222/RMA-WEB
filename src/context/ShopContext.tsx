import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  ShippingAddress,
  UserAccount,
  PageView,
  ProductCategory,
} from '../types';
import { PRODUCTS } from '../data/products';
import { STORE_CONFIG, Coupon } from '../data/storeConfig';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ShopContextType {
  // Navigation
  pageView: PageView;
  setPageView: (view: PageView) => void;
  selectedCategory: ProductCategory | null;
  setSelectedCategory: (cat: ProductCategory | null) => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (sub: string | null) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (cat: ProductCategory, subcat?: string) => void;
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingProgress: number; // 0 - 100
  amountNeededForFreeShipping: number;

  // Drawer & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  calculatedShipping: number;
  calculatedTax: number;
  finalTotal: number;

  // Customer & Auth
  user: UserAccount | null;
  orders: Order[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  saveAddress: (addr: ShippingAddress) => void;
  placeOrder: (shippingAddress: ShippingAddress, shippingMethod: 'standard' | 'expedited') => Order;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial demo order for rich tracking experience
const INITIAL_DEMO_ORDER: Order = {
  id: 'RMA-US-784892',
  date: '2026-09-25',
  items: [
    {
      id: 'demo-item-1',
      productId: 'wf-001',
      product: PRODUCTS[0],
      selectedColor: 'Oatmeal Heather',
      selectedSize: 'M',
      quantity: 1,
      unitPrice: 29.99,
    },
    {
      id: 'demo-item-2',
      productId: 'bg-001',
      product: PRODUCTS[5],
      selectedColor: 'Matte Black',
      selectedSize: '1L',
      quantity: 1,
      unitPrice: 19.99,
    },
  ],
  subtotal: 49.98,
  shippingFee: 0,
  tax: 3.5,
  discount: 5.0,
  couponCode: 'WELCOME10',
  total: 48.48,
  status: 'In Transit',
  carrier: 'USPS Priority Mail',
  trackingNumber: '9400111899562537829104',
  shippingAddress: {
    firstName: 'Jessica',
    lastName: 'Taylor',
    email: 'jessica.taylor@example.com',
    phone: '(307) 555-0194',
    street: '1428 Maple Crest Way',
    city: 'Cheyenne',
    state: 'WY',
    zipCode: '82001',
    country: 'United States',
  },
  estimatedDelivery: 'Sep 29, 2026',
  timeline: [
    {
      status: 'Order Placed & Confirmed',
      timestamp: 'Sep 25, 2026 · 10:15 AM',
      location: 'RMA Commerce Online',
      completed: true,
    },
    {
      status: 'Fulfilled & Packed at Fulfillment Center',
      timestamp: 'Sep 25, 2026 · 02:40 PM',
      location: 'Sheridan, WY 82801',
      completed: true,
    },
    {
      status: 'Picked up by USPS Priority Mail',
      timestamp: 'Sep 26, 2026 · 09:30 AM',
      location: 'USPS Regional Facility · Sheridan, WY',
      completed: true,
    },
    {
      status: 'In Transit to Regional Distribution Hub',
      timestamp: 'Sep 27, 2026 · 04:12 AM',
      location: 'Denver Distribution Center, CO',
      completed: true,
    },
    {
      status: 'Out for Delivery',
      timestamp: 'Estimated Sep 29, 2026',
      location: 'Local Post Office · Cheyenne, WY',
      completed: false,
    },
    {
      status: 'Delivered to Front Door',
      timestamp: 'Pending Delivery',
      location: 'Cheyenne, WY 82001',
      completed: false,
    },
  ],
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageView, setPageView] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>('RMA-US-784892');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart state with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rma_wishlist');
      return saved ? JSON.parse(saved) : ['wf-001', 'bg-001', 'sh-001'];
    } catch {
      return ['wf-001', 'bg-001', 'sh-001'];
    }
  });

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // User auth state
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('rma_user');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'usr_demo_1',
            email: 'jessica.taylor@example.com',
            firstName: 'Jessica',
            lastName: 'Taylor',
            phone: '(307) 555-0194',
            savedAddresses: [
              {
                firstName: 'Jessica',
                lastName: 'Taylor',
                email: 'jessica.taylor@example.com',
                phone: '(307) 555-0194',
                street: '1428 Maple Crest Way',
                city: 'Cheyenne',
                state: 'WY',
                zipCode: '82001',
                country: 'United States',
                isDefault: true,
              },
            ],
            orders: [INITIAL_DEMO_ORDER],
          };
    } catch {
      return null;
    }
  });

  // Orders list
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('rma_orders');
      return saved ? JSON.parse(saved) : [INITIAL_DEMO_ORDER];
    } catch {
      return [INITIAL_DEMO_ORDER];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('rma_cart', JSON.stringify(cart));
    } catch {
      // Ignore write errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('rma_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore write errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('rma_user', JSON.stringify(user));
    } catch {
      // Ignore write errors
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('rma_orders', JSON.stringify(orders));
    } catch {
      // Ignore write errors
    }
  }, [orders]);

  // Scroll to top on pageView transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageView]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateToProduct = (product: Product) => {
    setActiveProduct(product);
    setPageView('product');
  };

  const navigateToCategory = (cat: ProductCategory, subcat?: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(subcat || null);
    setPageView(cat === 'deals' ? 'shop' : 'category');
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string
  ) => {
    const defaultColor = color || product.variants[0]?.colorName || 'Default';
    const defaultSize = size || product.variants[0]?.size || 'One Size';
    const instanceId = `${product.id}-${defaultColor}-${defaultSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === instanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === instanceId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: instanceId,
          productId: product.id,
          product,
          selectedColor: defaultColor,
          selectedSize: defaultSize,
          quantity,
          unitPrice: product.price,
        },
      ];
    });

    showToast('Added to Cart', `${product.name} (${defaultColor}, ${defaultSize})`, 'success');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item Removed', 'The item was removed from your cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item has been removed from saved items', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Item added to your saved favorites', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Cart financial calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const threshold = STORE_CONFIG.shipping.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, threshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / threshold) * 100));

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = STORE_CONFIG.coupons.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { success: false, message: 'Invalid promo code. Please try WELCOME10 or SAVE15.' };
    }

    if (coupon.minOrder && cartSubtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Promo code ${coupon.code} requires a minimum order of $${coupon.minOrder.toFixed(2)}.`,
      };
    }

    setAppliedCoupon(coupon);
    showToast('Coupon Applied!', `${coupon.code}: ${coupon.description}`, 'success');
    return { success: true, message: `Applied: ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Discount code has been cleared', 'info');
  };

  // Discount calculation
  let discountAmount = 0;
  let hasFreeShippingCoupon = false;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = (cartSubtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    } else if (appliedCoupon.type === 'free_shipping') {
      hasFreeShippingCoupon = true;
    }
  }

  // Standard shipping is free if subtotal >= $35 or free shipping promo applies
  const calculatedShipping =
    cartSubtotal >= threshold || hasFreeShippingCoupon || cartSubtotal === 0
      ? 0
      : STORE_CONFIG.shipping.standardRate;

  // Estimated domestic sales tax (estimated average 6.5%)
  const taxableSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const calculatedTax = taxableSubtotal > 0 ? Number((taxableSubtotal * 0.065).toFixed(2)) : 0;
  const finalTotal = Math.max(0, Number((taxableSubtotal + calculatedShipping + calculatedTax).toFixed(2)));

  const login = (email: string, name?: string) => {
    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      email,
      firstName: name || email.split('@')[0],
      lastName: '',
      savedAddresses: [],
      orders: [],
    };
    setUser(newUser);
    showToast('Signed In', `Welcome back, ${newUser.firstName}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed Out', 'You have been logged out.');
  };

  const saveAddress = (addr: ShippingAddress) => {
    if (!user) return;
    const updated = {
      ...user,
      savedAddresses: [...user.savedAddresses, addr],
    };
    setUser(updated);
    showToast('Address Saved', 'Shipping address added to your address book.');
  };

  const placeOrder = (
    shippingAddress: ShippingAddress,
    shippingMethod: 'standard' | 'expedited'
  ): Order => {
    const shippingCost =
      shippingMethod === 'expedited'
        ? STORE_CONFIG.shipping.expeditedRate
        : calculatedShipping;

    const orderId = `RMA-US-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(
      today.getDate() +
        (shippingMethod === 'expedited'
          ? STORE_CONFIG.shipping.expeditedDaysMax
          : STORE_CONFIG.shipping.standardDaysMax)
    );

    const newOrder: Order = {
      id: orderId,
      date: today.toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: shippingCost,
      tax: calculatedTax,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      total: Number((cartSubtotal - discountAmount + shippingCost + calculatedTax).toFixed(2)),
      status: 'Processing',
      carrier: shippingMethod === 'expedited' ? 'UPS Ground' : 'USPS Priority Mail',
      trackingNumber: `9400111${Math.floor(100000000000000 + Math.random() * 900000000000000)}`,
      shippingAddress,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      timeline: [
        {
          status: 'Order Placed & Authorized',
          timestamp: 'Just now',
          location: 'RMA Commerce LLC · Order Management',
          completed: true,
        },
        {
          status: 'Sent to Fulfillment Warehouse',
          timestamp: 'In progress',
          location: 'Sheridan, WY 82801',
          completed: false,
        },
        {
          status: 'Handed to Shipping Carrier',
          timestamp: 'Estimated within 24h',
          location: 'Sheridan, WY Hub',
          completed: false,
        },
        {
          status: 'Delivered',
          timestamp: `Estimated by ${deliveryDate.toLocaleDateString()}`,
          location: `${shippingAddress.city}, ${shippingAddress.state}`,
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    if (user) {
      setUser({
        ...user,
        orders: [newOrder, ...user.orders],
      });
    }

    clearCart();
    setAppliedCoupon(null);
    setActiveOrderId(orderId);
    setPageView('order-confirmation');
    showToast('Order Placed Successfully!', `Order #${orderId} is confirmed.`);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        pageView,
        setPageView,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        activeProduct,
        setActiveProduct,
        navigateToProduct,
        navigateToCategory,
        activeOrderId,
        setActiveOrderId,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingProgress,
        amountNeededForFreeShipping,

        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,

        wishlist,
        toggleWishlist,
        isWishlisted,

        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        calculatedShipping,
        calculatedTax,
        finalTotal,

        user,
        orders,
        login,
        logout,
        saveAddress,
        placeOrder,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
