import React from 'react';
import { SlidersHorizontal, X, RotateCcw, Check } from 'lucide-react';
import { useFilter } from '../../context/FilterContext';

export const FilterPanel = ({ isOpenMobile, onCloseMobile }) => {
  const { filters, updateFilter, resetFilters } = useFilter();

  const categories = [
    'All Categories',
    'Audio & Acoustics',
    'Wearables & Timepieces',
    'Minimalist Tech',
    'Living & Interiors',
    'Apparel & Accessories'
  ];

  const brands = ['Aether Acoustic', 'Monolith', 'Kjaer Living', 'Minimalist Studio'];

  const ratings = [4, 3, 2];

  const renderContent = () => (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-slate-800" />
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Refine Catalog
          </h4>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 hover:underline"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Category</h5>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected =
              cat === 'All Categories' ? !filters.category : filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => updateFilter('category', cat === 'All Categories' ? '' : cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Price Range</h5>
          <span className="text-xs font-semibold text-slate-700">
            ${filters.minPrice} - ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="20"
          value={filters.maxPrice}
          onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full accent-slate-900 cursor-pointer"
        />
      </div>

      {/* Brands Filter */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Brand</h5>
        <div className="space-y-1.5">
          {brands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.brand === b}
                onChange={(e) => updateFilter('brand', e.target.checked ? b : '')}
                className="rounded accent-slate-900"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Rating</h5>
        <div className="space-y-1">
          {ratings.map((r) => (
            <button
              key={r}
              onClick={() => updateFilter('rating', filters.rating === r ? 0 : r)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between ${
                filters.rating === r
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              <span>{r} Stars & Above</span>
              {filters.rating === r && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <aside className="hidden lg:block w-64 glass-panel rounded-3xl p-6 h-fit border border-white/80 shadow-sm sticky top-28">
        {renderContent()}
      </aside>

      {/* Mobile Filter Bottom Sheet Modal */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 backdrop-blur-sm">
          <div className="w-full glass-modal bg-white/95 backdrop-blur-2xl rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-end mb-2">
              <button
                onClick={onCloseMobile}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            {renderContent()}
            <button
              onClick={onCloseMobile}
              className="w-full mt-6 py-3 bg-slate-900 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};
