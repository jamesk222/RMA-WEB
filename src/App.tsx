import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/product/QuickViewModal';
import { SearchModal } from './components/search/SearchModal';
import { ToastContainer } from './components/common/Toast';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductView } from './views/ProductView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AccountView } from './views/AccountView';
import { WishlistView } from './views/WishlistView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FaqView } from './views/FaqView';
import {
  ShippingPolicyView,
  ReturnsPolicyView,
  PrivacyPolicyView,
  TermsView,
  AccessibilityView,
} from './views/PolicyViews';
import { NotFoundView } from './views/NotFoundView';

const MainContent: React.FC = () => {
  const { pageView, setPageView } = useShop();

  // Synchronize hash with pageView for deep linking & back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (
        hash &&
        [
          'home',
          'shop',
          'cart',
          'checkout',
          'order-confirmation',
          'order-tracking',
          'account',
          'wishlist',
          'about',
          'contact',
          'faq',
          'shipping-policy',
          'returns-policy',
          'privacy-policy',
          'terms',
          'accessibility',
        ].includes(hash)
      ) {
        setPageView(hash as any);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setPageView]);

  // Update hash when pageView changes
  useEffect(() => {
    if (pageView) {
      window.location.hash = `#/${pageView}`;
    }
  }, [pageView]);

  const renderCurrentView = () => {
    switch (pageView) {
      case 'home':
        return <HomeView />;
      case 'shop':
      case 'category':
        return <ShopView />;
      case 'product':
        return <ProductView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'account':
        return <AccountView />;
      case 'wishlist':
        return <WishlistView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FaqView />;
      case 'shipping-policy':
        return <ShippingPolicyView />;
      case 'returns-policy':
        return <ReturnsPolicyView />;
      case 'privacy-policy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsView />;
      case 'accessibility':
        return <AccessibilityView />;
      default:
        return <NotFoundView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Announcement Ribbon */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Navbar />

      {/* Primary Page Canvas */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer />

      {/* Global Slide-Over Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
