import { CategoryMeta } from '../types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'womens-fashion',
    name: "Women's Fashion",
    slug: 'womens-fashion',
    tagline: 'Effortless styles, elevated basics & everyday silhouettes',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Tops',
        items: [
          { id: 't-shirts', name: 'T-Shirts & Basics', slug: 't-shirts' },
          { id: 'crop-tops', name: 'Crop Tops', slug: 'crop-tops' },
          { id: 'tank-tops', name: 'Tank Tops', slug: 'tank-tops' },
          { id: 'blouses', name: 'Blouses & Shirts', slug: 'blouses' },
          { id: 'bodysuits', name: 'Bodysuits', slug: 'bodysuits' },
        ],
      },
      {
        groupName: 'Dresses',
        items: [
          { id: 'casual-dresses', name: 'Casual Dresses', slug: 'casual-dresses' },
          { id: 'maxi-dresses', name: 'Maxi Dresses', slug: 'maxi-dresses' },
          { id: 'midi-dresses', name: 'Midi Dresses', slug: 'midi-dresses' },
          { id: 'mini-dresses', name: 'Mini Dresses', slug: 'mini-dresses' },
        ],
      },
      {
        groupName: 'Bottoms',
        items: [
          { id: 'jeans', name: 'Denim & Jeans', slug: 'jeans' },
          { id: 'cargo-pants', name: 'Cargo Pants', slug: 'cargo-pants' },
          { id: 'wide-leg', name: 'Wide-Leg Trousers', slug: 'wide-leg' },
          { id: 'leggings', name: 'Leggings & Tights', slug: 'leggings' },
          { id: 'skirts', name: 'Skirts & Shorts', slug: 'skirts' },
        ],
      },
      {
        groupName: 'Active & Lounge',
        items: [
          { id: 'matching-sets', name: 'Matching Workout Sets', slug: 'matching-sets' },
          { id: 'sports-bras', name: 'Sports Bras', slug: 'sports-bras' },
          { id: 'lounge-sets', name: 'Lounge Sets', slug: 'lounge-sets' },
          { id: 'pajamas', name: 'Pajamas & Robes', slug: 'pajamas' },
          { id: 'cardigans', name: 'Cardigans & Shackets', slug: 'cardigans' },
        ],
      },
    ],
  },
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    slug: 'mens-fashion',
    tagline: 'Modern streetwear, versatile layers & everyday wardrobe essentials',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Tops & Shirts',
        items: [
          { id: 'mens-tees', name: 'Crewneck T-Shirts', slug: 'mens-tees' },
          { id: 'graphic-tees', name: 'Graphic Tees', slug: 'graphic-tees' },
          { id: 'polos', name: 'Polo Shirts', slug: 'polos' },
          { id: 'button-downs', name: 'Button-Down Oxford Shirts', slug: 'button-downs' },
        ],
      },
      {
        groupName: 'Hoodies & Outerwear',
        items: [
          { id: 'hoodies', name: 'Heavyweight Hoodies', slug: 'hoodies' },
          { id: 'sweatshirts', name: 'Crewneck Sweatshirts', slug: 'sweatshirts' },
          { id: 'jackets', name: 'Bomber & Utility Jackets', slug: 'jackets' },
        ],
      },
      {
        groupName: 'Pants & Shorts',
        items: [
          { id: 'mens-jeans', name: 'Slim & Straight Jeans', slug: 'mens-jeans' },
          { id: 'joggers', name: 'Tailored Joggers', slug: 'joggers' },
          { id: 'mens-cargos', name: 'Tactical Cargo Pants', slug: 'mens-cargos' },
          { id: 'mens-shorts', name: 'Everyday Shorts', slug: 'mens-shorts' },
        ],
      },
      {
        groupName: 'Accessories',
        items: [
          { id: 'wallets', name: 'Minimalist Wallets', slug: 'wallets' },
          { id: 'belts', name: 'Leather & Webbing Belts', slug: 'belts' },
          { id: 'mens-caps', name: 'Dad Hats & Beanies', slug: 'mens-caps' },
          { id: 'mens-crossbody', name: 'Crossbody Sling Bags', slug: 'mens-crossbody' },
        ],
      },
    ],
  },
  {
    id: 'shoes',
    name: 'Shoes',
    slug: 'shoes',
    tagline: 'Cloud-comfort sneakers, everyday slides & versatile footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: "Women's Shoes",
        items: [
          { id: 'womens-sneakers', name: 'Lifestyle Sneakers', slug: 'womens-sneakers' },
          { id: 'womens-slides', name: 'Cloud Pillow Slides', slug: 'womens-slides' },
          { id: 'womens-boots', name: 'Chelsea & Ankle Boots', slug: 'womens-boots' },
          { id: 'loafers-flats', name: 'Loafers & Ballet Flats', slug: 'loafers-flats' },
        ],
      },
      {
        groupName: "Men's Shoes",
        items: [
          { id: 'mens-sneakers', name: 'Running & Casual Sneakers', slug: 'mens-sneakers' },
          { id: 'mens-slides', name: 'Recovery Slides', slug: 'mens-slides' },
          { id: 'mens-boots', name: 'Work & Chukka Boots', slug: 'mens-boots' },
          { id: 'mens-loafers', name: 'Slip-On Loafers', slug: 'mens-loafers' },
        ],
      },
      {
        groupName: 'Kids Shoes',
        items: [
          { id: 'kids-sneakers', name: 'Kids Slip-On Sneakers', slug: 'kids-sneakers' },
          { id: 'kids-sandals', name: 'Lightweight Sandals', slug: 'kids-sandals' },
        ],
      },
    ],
  },
  {
    id: 'bags-accessories',
    name: 'Bags & Accessories',
    slug: 'bags-accessories',
    tagline: 'Carry essentials, viral claw clips, polarized eyewear & sling bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Bags & Packs',
        items: [
          { id: 'crossbody-bags', name: 'Everyday Crossbody Bags', slug: 'crossbody-bags' },
          { id: 'belt-bags', name: 'Everywhere Belt Bags', slug: 'belt-bags' },
          { id: 'totes', name: 'Canvas & Leather Totes', slug: 'totes' },
          { id: 'backpacks', name: 'Urban Laptop Backpacks', slug: 'backpacks' },
          { id: 'duffels', name: 'Gym & Travel Duffels', slug: 'duffels' },
        ],
      },
      {
        groupName: 'Hair & Fashion',
        items: [
          { id: 'claw-clips', name: 'Matte French Claw Clips', slug: 'claw-clips' },
          { id: 'scrunchies', name: 'Silk & Satin Scrunchies', slug: 'scrunchies' },
          { id: 'sunglasses', name: 'Polarized Retro Sunglasses', slug: 'sunglasses' },
          { id: 'bucket-hats', name: 'Caps & Bucket Hats', slug: 'bucket-hats' },
        ],
      },
    ],
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    slug: 'jewelry',
    tagline: '18K gold-plated vermeil, tarnish-free chains & subtle sparkle',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Necklaces & Chains',
        items: [
          { id: 'layered-necklaces', name: 'Layered Herringbone Chains', slug: 'layered-necklaces' },
          { id: 'pendants', name: 'Coin & Initial Pendants', slug: 'pendants' },
          { id: 'chokers', name: 'Delicate Chokers', slug: 'chokers' },
        ],
      },
      {
        groupName: 'Earrings',
        items: [
          { id: 'hoop-earrings', name: 'Chunky Huggie Hoops', slug: 'hoop-earrings' },
          { id: 'stud-earrings', name: 'Pavé Zirconia Studs', slug: 'stud-earrings' },
          { id: 'drop-earrings', name: 'Threader & Drop Earrings', slug: 'drop-earrings' },
        ],
      },
      {
        groupName: 'Rings & Bracelets',
        items: [
          { id: 'stackable-rings', name: 'Stackable Band Rings', slug: 'stackable-rings' },
          { id: 'cuff-bracelets', name: 'Open Cuff Bracelets', slug: 'cuff-bracelets' },
          { id: 'jewelry-sets', name: 'Curated 3-Piece Sets', slug: 'jewelry-sets' },
        ],
      },
    ],
  },
  {
    id: 'beauty-hair',
    name: 'Beauty & Hair',
    slug: 'beauty-hair',
    tagline: 'Viral heatless curlers, soft makeup tools & salon-grade organizers',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Hair Styling',
        items: [
          { id: 'heatless-curlers', name: 'Silk Heatless Curlers', slug: 'heatless-curlers' },
          { id: 'detangling-brushes', name: 'Wet & Dry Flex Brushes', slug: 'detangling-brushes' },
          { id: 'satin-bonnets', name: 'Double-Layer Satin Bonnets', slug: 'satin-bonnets' },
          { id: 'hair-oil-applicators', name: 'Scalp Massagers & Dispensers', slug: 'hair-oil-applicators' },
        ],
      },
      {
        groupName: 'Makeup & Skincare Tools',
        items: [
          { id: 'brush-sets', name: 'Professional 12-Piece Brush Sets', slug: 'brush-sets' },
          { id: 'beauty-sponges', name: 'Microfiber Blender Sponges', slug: 'beauty-sponges' },
          { id: 'lash-curlers', name: 'Heated & Precision Lash Curlers', slug: 'lash-curlers' },
          { id: 'cosmetic-bags', name: 'Travel Vanity Cases', slug: 'cosmetic-bags' },
        ],
      },
    ],
  },
  {
    id: 'home-lifestyle',
    name: 'Home & Lifestyle',
    slug: 'home-lifestyle',
    tagline: 'Tidy organizers, aesthetic drinkware & clever space-savers',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Organization & Storage',
        items: [
          { id: 'storage-bins', name: 'Clear Stackable Bins', slug: 'storage-bins' },
          { id: 'drawer-dividers', name: 'Expandable Bamboo Dividers', slug: 'drawer-dividers' },
          { id: 'closet-hangers', name: 'Space-Saving Velvet Hangers', slug: 'closet-hangers' },
          { id: 'shoe-slots', name: 'Adjustable Shoe Organizers', slug: 'shoe-slots' },
        ],
      },
      {
        groupName: 'Kitchen & Dining',
        items: [
          { id: 'airtight-containers', name: 'Glass Food Storage Set', slug: 'airtight-containers' },
          { id: 'kitchen-gadgets', name: 'Multi-Choppers & Oil Sprayers', slug: 'kitchen-gadgets' },
          { id: 'tumblers', name: 'Insulated 40oz Tumblers', slug: 'tumblers' },
        ],
      },
      {
        groupName: 'Bath & Living',
        items: [
          { id: 'shower-caddies', name: 'Adhesive Corner Caddies', slug: 'shower-caddies' },
          { id: 'soap-dispensers', name: 'Automatic Foam Dispensers', slug: 'soap-dispensers' },
          { id: 'minimal-decor', name: 'Ceramic Donut Vases', slug: 'minimal-decor' },
        ],
      },
    ],
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    tagline: 'Home gym mobility, resistance training & active recovery essentials',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Strength & Conditioning',
        items: [
          { id: 'resistance-bands', name: 'Fabric Booty & Loop Bands', slug: 'resistance-bands' },
          { id: 'speed-ropes', name: 'Bearing Jump Ropes', slug: 'speed-ropes' },
          { id: 'workout-gloves', name: 'Grip & Wrist Wrap Gloves', slug: 'workout-gloves' },
        ],
      },
      {
        groupName: 'Yoga & Recovery',
        items: [
          { id: 'yoga-mats', name: 'Non-Slip Alignment Mats', slug: 'yoga-mats' },
          { id: 'massage-balls', name: 'Trigger Point Massage Balls', slug: 'massage-balls' },
          { id: 'sports-towels', name: 'Fast-Dry Microfiber Towels', slug: 'sports-towels' },
        ],
      },
      {
        groupName: 'Hydration & Gear',
        items: [
          { id: 'shaker-bottles', name: 'Tritan Protein Shakers', slug: 'shaker-bottles' },
          { id: 'running-belts', name: 'Slim Running Waistpacks', slug: 'running-belts' },
        ],
      },
    ],
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    tagline: 'No-pull dog harnesses, shedding grooming brushes & travel gear',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Dog Essentials',
        items: [
          { id: 'no-pull-harness', name: 'Reflective No-Pull Harness', slug: 'no-pull-harness' },
          { id: 'leashes', name: 'Bungee Shock Absorbing Leash', slug: 'leashes' },
          { id: 'dog-toys', name: 'Tough Squeaker Chew Toys', slug: 'dog-toys' },
          { id: 'slow-feeders', name: 'Non-Skid Slow Feeder Bowls', slug: 'slow-feeders' },
        ],
      },
      {
        groupName: 'Cat Care',
        items: [
          { id: 'cat-toys', name: 'Interactive Laser & Feather Toys', slug: 'cat-toys' },
          { id: 'cat-scratchers', name: 'Sisal Wall & Floor Scratchers', slug: 'cat-scratchers' },
        ],
      },
      {
        groupName: 'Grooming & Travel',
        items: [
          { id: 'deshedding-brush', name: 'One-Click Pet Grooming Brush', slug: 'deshedding-brush' },
          { id: 'travel-bottles', name: 'Portable Pet Water Dispenser', slug: 'travel-bottles' },
          { id: 'car-seat-covers', name: 'Waterproof Pet Car Seat Hammock', slug: 'car-seat-covers' },
        ],
      },
    ],
  },
  {
    id: 'electronics-accessories',
    name: 'Electronics Accessories',
    slug: 'electronics-accessories',
    tagline: 'MagSafe stands, 3-in-1 charging hubs & desk wire organizers',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Power & Charging',
        items: [
          { id: 'charging-stations', name: '3-in-1 Foldable MagSafe Dock', slug: 'charging-stations' },
          { id: 'cables', name: 'Braided Fast-Charging Cables', slug: 'cables' },
          { id: 'car-mounts', name: 'Magnetic Auto-Clamping Car Mount', slug: 'car-mounts' },
        ],
      },
      {
        groupName: 'Desk & Workstation',
        items: [
          { id: 'laptop-stands', name: 'Ergonomic Aluminum Laptop Risers', slug: 'laptop-stands' },
          { id: 'desk-pads', name: 'Water-Resistant Vegan Leather Desk Mat', slug: 'desk-pads' },
          { id: 'cable-management', name: 'Magnetic Silicone Cable Clips', slug: 'cable-management' },
          { id: 'webcam-covers', name: 'Ultra-Thin Slider Webcam Covers', slug: 'webcam-covers' },
        ],
      },
      {
        groupName: 'Device Protection',
        items: [
          { id: 'phone-cases', name: 'Matte Shockproof Bumper Cases', slug: 'phone-cases' },
          { id: 'screen-protectors', name: '9H Tempered Glass 2-Pack', slug: 'screen-protectors' },
        ],
      },
    ],
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    slug: 'kids-baby',
    tagline: 'Food-grade silicone feeding, durable toddler packs & travel essentials',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Feeding & Teething',
        items: [
          { id: 'silicone-bibs', name: 'Catch-All Silicone Bibs 2-Pack', slug: 'silicone-bibs' },
          { id: 'suction-plates', name: 'BPA-Free Silicone Suction Plates', slug: 'suction-plates' },
          { id: 'snack-cups', name: 'Spill-Proof Collapsible Cups', slug: 'snack-cups' },
        ],
      },
      {
        groupName: 'On The Go',
        items: [
          { id: 'stroller-organizers', name: 'Universal Stroller Caddy Bag', slug: 'stroller-organizers' },
          { id: 'kids-backpacks', name: 'Lightweight Toddler Backpack', slug: 'kids-backpacks' },
          { id: 'car-organizers', name: 'Backseat Kick Mat Organizers', slug: 'car-organizers' },
        ],
      },
    ],
  },
  {
    id: 'deals',
    name: 'Deals & Clearance',
    slug: 'deals',
    tagline: 'Under $15 steals, TikTok viral price drops & multi-buy offers',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    groups: [
      {
        groupName: 'Price Tiers',
        items: [
          { id: 'under-15', name: 'Finds Under $15', slug: 'under-15' },
          { id: 'under-25', name: 'Bestsellers Under $25', slug: 'under-25' },
          { id: 'bundle-deals', name: 'Bundle & Save 20%', slug: 'bundle-deals' },
        ],
      },
      {
        groupName: 'Collections',
        items: [
          { id: 'tiktok-viral', name: 'Trending on TikTok', slug: 'tiktok-viral' },
          { id: 'clearance', name: 'Warehouse Clearance', slug: 'clearance' },
        ],
      },
    ],
  },
];
