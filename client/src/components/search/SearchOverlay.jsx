import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, ArrowRight, Package } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../data/mockData';
import { Rating, PriceDisplay } from '../common/Rating';

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ products: [], categories: [] });
  const navigate = useNavigate();

  const trendingQueries = ['Headphones', 'Titanium Watch', 'Ceramic Lamp', 'Hoodie', 'Keyboard'];

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [] });
      return;
    }

    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      const matchedProducts = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
      const matchedCategories = MOCK_CATEGORIES.filter((c) =>
        c.name.toLowerCase().includes(q)
      );

      setResults({ products: matchedProducts, categories: matchedCategories });
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectSearch = (term) => {
    setQuery(term);
  };

  const handleProductClick = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/40 backdrop-blur-md transition-all">
      <div className="w-full max-w-2xl glass-modal rounded-3xl p-6 shadow-2xl border border-white/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-6">
          <Search size={22} className="absolute left-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search audio, watches, lamps, tech..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/90 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-inner"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-12 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </form>

        {/* Default View: Trending Queries */}
        {!query && (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <TrendingUp size={14} /> Trending Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingQueries.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSelectSearch(term)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-900 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            
            {/* Matching Categories */}
            {results.categories.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Matching Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {results.categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => {
                        onClose();
                        navigate(`/products?category=${encodeURIComponent(cat.name)}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1 hover:bg-slate-800"
                    >
                      {cat.name} <ArrowRight size={12} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Products List */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Products ({results.products.length})
              </span>

              {results.products.length === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  <Package size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No products found matching "{query}"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.products.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product.slug || product._id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/90 border border-transparent hover:border-slate-200 cursor-pointer transition-all"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{product.brand}</p>
                      </div>
                      <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
