import React from 'react';
import { CategoryMeta, ProductCategory } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  category: CategoryMeta;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const { navigateToCategory } = useShop();

  const handleSubcategoryClick = (slug: string) => {
    navigateToCategory(category.id, slug);
    onClose();
  };

  const handleViewAllClick = () => {
    navigateToCategory(category.id);
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-40 transition-all duration-200 animate-in fade-in slide-in-from-top-1"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main columns for subcategory groups */}
          <div className="col-span-8 lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
            {category.groups.map((group, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                  {group.groupName}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSubcategoryClick(item.slug)}
                        className="text-sm text-slate-600 hover:text-slate-950 hover:translate-x-0.5 transition-all text-left block w-full truncate"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Spotlight Card */}
          <div className="col-span-4 lg:col-span-3 border-l border-slate-100 pl-6 flex flex-col justify-between">
            <div className="group relative rounded-lg overflow-hidden bg-slate-100 aspect-[4/3] mb-4">
              <img
                src={category.image}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  Curated Collection
                </span>
                <p className="text-sm font-semibold line-clamp-1">{category.tagline}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-3">
                All items inspected and shipped directly from our Sheridan, WY warehouse facility.
              </p>
              <button
                onClick={handleViewAllClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-sky-600 transition-colors uppercase tracking-wider group"
              >
                <span>Explore All {category.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
