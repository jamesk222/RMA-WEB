export type ProductCategory =
  | 'womens-fashion'
  | 'mens-fashion'
  | 'shoes'
  | 'bags-accessories'
  | 'jewelry'
  | 'beauty-hair'
  | 'home-lifestyle'
  | 'sports-fitness'
  | 'pet-supplies'
  | 'electronics-accessories'
  | 'kids-baby'
  | 'deals';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  colorName?: string;
  colorHex?: string;
  size?: string;
  priceModifier?: number;
  inStock: boolean;
  inventory: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  location?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  badge?: 'TRENDING' | 'BEST SELLER' | 'NEW' | 'SALE' | 'LIMITED' | 'POPULAR';
  specifications: {
    material?: string;
    dimensions?: string;
    weight?: string;
    care?: string;
    origin?: string;
    warranty?: string;
    resistance?: string;
    output?: string;
    compatibility?: string;
    [key: string]: any;
  };
  marketplace: {
    walmartReady: boolean;
    tikTokTrend: boolean;
    poshmarkEligible: boolean;
    gtin?: string;
    shippingClass: 'lightweight' | 'compact' | 'standard';
  };
  reviews?: ProductReview[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryGroup {
  groupName: string;
  items: SubCategory[];
}

export interface CategoryMeta {
  id: ProductCategory;
  name: string;
  slug: string;
  tagline: string;
  image: string;
  groups: CategoryGroup[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string; // RMA-US-XXXXXX
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  carrier: 'USPS Priority Mail' | 'UPS Ground';
  trackingNumber: string;
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
  timeline: {
    status: string;
    timestamp: string;
    location: string;
    completed: boolean;
  }[];
}

export interface UserAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  savedAddresses: ShippingAddress[];
  orders: Order[];
}

export type PageView =
  | 'home'
  | 'shop'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'wishlist'
  | 'order-tracking'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping-policy'
  | 'returns-policy'
  | 'privacy-policy'
  | 'terms'
  | 'accessibility';
