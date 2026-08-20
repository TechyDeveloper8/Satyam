import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Grid, RotateCcw } from 'lucide-react';
import { productService } from '../services/productService';
import { useFilter } from '../context/FilterContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterPanel } from '../components/product/FilterPanel';
import { SkeletonLoader } from '../components/common/SkeletonLoader';

export const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const { filters, updateFilter, resetFilters, setFilters } = useFilter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL search parameters into FilterContext
  useEffect(() => {
    const cat = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    if (cat) updateFilter('category', cat);
    if (brand) updateFilter('brand', brand);
    if (search) updateFilter('search', search);
  }, [searchParams]);

  // Fetch products based on active filters
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts(filters);
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [filters]);

  const activeFilterChips = [];
  if (filters.category) activeFilterChips.push({ key: 'category', label: `Category: ${filters.category}` });
  if (filters.brand) activeFilterChips.push({ key: 'brand', label: `Brand: ${filters.brand}` });
  if (filters.search) activeFilterChips.push({ key: 'search', label: `Search: "${filters.search}"` });
  if (filters.maxPrice < 1000) activeFilterChips.push({ key: 'maxPrice', label: `Under $${filters.maxPrice}` });
  if (filters.rating > 0) activeFilterChips.push({ key: 'rating', label: `${filters.rating}+ Stars` });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 space-y-2">
        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block">
          Aether Catalog
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          {filters.category || 'All Products & Objects'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Showing {products.length} minimal architectural products crafted with titanium, aluminum, and ceramic stoneware.
        </p>
      </div>

      {/* Control Bar: Filters Trigger, Active Chips, Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-4 rounded-2xl">
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <SlidersHorizontal size={14} /> Filters ({activeFilterChips.length})
        </button>

        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {activeFilterChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold"
            >
              {chip.label}
              <button
                onClick={() => updateFilter(chip.key, chip.key === 'maxPrice' ? 1000 : chip.key === 'rating' ? 0 : '')}
                className="hover:text-slate-950"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {activeFilterChips.length > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 underline ml-2"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 ml-auto">
          <span>Sort By:</span>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Filter Panel Layout */}
      <div className="flex gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <FilterPanel
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Product Catalog Grid */}
        <div className="flex-1">
          {loading ? <SkeletonLoader count={8} /> : <ProductGrid products={products} />}
        </div>
      </div>
    </div>
  );
};
