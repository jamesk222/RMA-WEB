import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCategory, Product, CategoryMeta } from '../types';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Flame,
  Star,
  Quote,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setPageView, navigateToCategory, showToast } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const trendingProducts = PRODUCTS.filter((p: Product) => p.badge === 'TRENDING' || p.badge === 'BEST SELLER').slice(0, 8);
  const bestSellers = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.filter((p: Product) => p.category === 'bags-accessories' || p.category === 'womens-fashion' || p.category === 'shoes').slice(0, 4);
  const socialTrends = PRODUCTS.filter((p: Product) => p.marketplace.tikTokTrend).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', '', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed!', 'Use coupon code WELCOME10 at checkout for 10% off.', 'success');
  };

  const lifestyleThemes = [
    {
      title: 'Everyday Essentials',
      desc: 'Minimalist EDC wallets, insulated tumblers & clean basics.',
      category: 'mens-fashion' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Weekend Ready',
      desc: 'Effortless knitwear, parachute cargos & cloud recovery slides.',
      category: 'womens-fashion' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Home Refresh',
      desc: 'Clear pantry storage bins, minimalist ceramic vases & tidy caddies.',
      category: 'home-lifestyle' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Fitness & Wellness',
      desc: 'Seamless workout sets, non-slip loop bands & recovery gear.',
      category: 'sports-fitness' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Tech & Workstation',
      desc: 'Foldable MagSafe charging docks, aluminum stands & desk mats.',
      category: 'electronics-accessories' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Viral Pet Care',
      desc: 'Self-cleaning grooming brushes & reflective no-pull harnesses.',
      category: 'pet-supplies' as ProductCategory,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const verifiedCustomerReviews = [
    {
      name: 'Hannah S.',
      location: 'Phoenix, AZ',
      rating: 5,
      date: 'Sep 21, 2026',
      productName: "Women's Ribbed Everyday Cardigan",
      review:
        'The fabric is shockingly soft and lightweight. Dispatched from Wyoming super quickly and arrived in 3 days. Definitely ordering the mocha color next.',
    },
    {
      name: 'Marcus T.',
      location: 'Charlotte, NC',
      rating: 5,
      date: 'Sep 18, 2026',
      productName: 'Everywhere Crossbody Belt Bag',
      review:
        'Holds my iPhone Pro Max, keys, wallet, and sunglasses with room to spare. Clean hardware and sturdy zipper. Best $20 I have spent in a long time.',
    },
    {
      name: 'Danielle K.',
      location: 'Columbus, OH',
      rating: 5,
      date: 'Sep 12, 2026',
      productName: 'Cloud Pillow Recovery Slides',
      review:
        'I wear these around the house on hard tile floors all day. The arch cushion feels like memory foam clouds. 10/10 comfort.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* SECTION 3: Hero Banner */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Subtle background ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
          alt="RMA Commerce Storefront Lifestyle"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-sky-300 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct U.S. Retail · Sheridan, WY</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Discover Your Next Favorite Find
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Trending styles, smart essentials, and everyday products selected for modern life. Curated for durability, value, and fast domestic shipping across the USA.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setPageView('shop')}
                className="px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2 transition-all hover:translate-x-0.5"
              >
                <span>Shop All Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToCategory('deals')}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-700 shadow-md flex items-center gap-2 transition-colors"
              >
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Explore Trending Deals</span>
              </button>
            </div>

            {/* Quick feature callouts under hero */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-xs text-slate-400">
              <div>
                <p className="font-bold text-white tabular-nums">$35+</p>
                <p className="text-[11px] mt-0.5">Free U.S. Shipping</p>
              </div>
              <div>
                <p className="font-bold text-white tabular-nums">24-Hour</p>
                <p className="text-[11px] mt-0.5">Domestic Dispatch</p>
              </div>
              <div>
                <p className="font-bold text-white tabular-nums">30-Day</p>
                <p className="text-[11px] mt-0.5">Hassle-Free Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Department Directory
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => setPageView('shop')}
            className="text-xs font-bold text-slate-900 hover:text-sky-600 uppercase tracking-wider flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.filter((c: CategoryMeta) => c.id !== 'deals').slice(0, 8).map((cat: CategoryMeta) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.id)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer shadow-xs hover:shadow-md transition-all border border-slate-200/80"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="font-display text-base font-bold group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                  <span>Explore items</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Trending Now */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>High Demand Right Now</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Trending Now
            </h2>
          </div>
          <button
            onClick={() => setPageView('shop')}
            className="text-xs font-bold text-slate-900 hover:text-sky-600 uppercase tracking-wider flex items-center gap-1 group"
          >
            <span>See All Products ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 8: TikTok & Social Viral Trends Section */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                #ViralFinds & Social Commerce
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Trending on Social
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-lg">
                Viral lifestyle, beauty, and desk essentials that took TikTok and Instagram by storm. Compact, photogenic, and under $40.
              </p>
            </div>
            <button
              onClick={() => navigateToCategory('deals')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs self-start md:self-auto"
            >
              Shop The Trend
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {socialTrends.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: Best Sellers & New Arrivals Split Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Customer Favorites
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                Best Sellers
              </h2>
            </div>
            <button
              onClick={() => setPageView('shop')}
              className="text-xs font-bold text-slate-900 hover:text-sky-600 uppercase tracking-wider"
            >
              View More →
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Fresh Inventory
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => setPageView('shop')}
              className="text-xs font-bold text-slate-900 hover:text-sky-600 uppercase tracking-wider"
            >
              View More →
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Shop By Lifestyle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Curated For How You Live
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Shop By Lifestyle
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            Hand-selected product edits tailored to your daily routines, fitness habits, and home environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleThemes.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigateToCategory(item.category)}
              className="group relative rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span>Explore Edit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Limited Time Seasonal Event
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              More to Love. More to Discover.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore our latest collections and everyday favorites. Enter coupon code <strong className="text-white underline">WELCOME10</strong> at checkout for 10% off your entire order with free domestic U.S. delivery over $35.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => setPageView('shop')}
                className="px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors"
              >
                Shop All Collections
              </button>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto flex justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center space-y-2 max-w-xs">
              <span className="text-xs text-slate-300 uppercase tracking-wider">Promo Code</span>
              <div className="p-3 bg-white text-slate-900 font-mono font-bold text-lg rounded tracking-widest border border-slate-300 select-all">
                WELCOME10
              </div>
              <p className="text-[11px] text-slate-400">
                10% Off · Valid on All Catalog Items
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Why Shop With Us (Trust Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            The RMA Commerce Difference
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Why Shop With Us
          </h2>
          <p className="text-xs text-slate-600 mt-1.5">
            Registered U.S. retail operations committed to verified product quality, fast dispatch, and direct customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Direct U.S. Fulfillment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We dispatch orders directly from our domestic warehouse facility at 30 N Could St in Sheridan, Wyoming. Enjoy fast 3–5 day delivery via USPS Priority Mail and UPS Ground.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Vetted & Inspected Quality
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every item is tested for durability, compact shipping footprint, and consumer satisfaction before being listed. No flimsy knockoffs or fragile unverified items.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              30-Day Hassle-Free Returns
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If an item doesn't fit your lifestyle, return it within 30 days of receipt in original condition. Transparent refunds processed promptly back to your payment method.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 12: Customer Reviews */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Shopper Feedback
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              What Customers Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedCustomerReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{rev.name}</p>
                      <p className="text-[11px] text-slate-500">{rev.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Order
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-700 font-medium mt-1 truncate">
                    Purchased: {rev.productName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 text-center max-w-3xl mx-auto border border-slate-800 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Join The RMA Retail Circle
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Get The Latest Finds & Exclusive Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Sign up for weekly product drops, marketplace clearance alerts, and immediate 10% coupon codes delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-950/50 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-semibold max-w-md mx-auto">
              ✓ You are subscribed! Check your inbox for your 10% discount code: <strong className="text-white">WELCOME10</strong>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 text-xs text-slate-900 bg-white rounded-lg focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400 pt-1">
            We respect your privacy. No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};
