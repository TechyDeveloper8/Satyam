import React, { useRef } from 'react';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductGrid = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">
        <p className="text-sm">No products found matching criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export const ProductCarousel = ({ title, subtitle, products = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-end justify-between px-1">
        <div>
          {subtitle && (
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 block">
              {subtitle}
            </span>
          )}
          {title && <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{title}</h3>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full glass-card hover:bg-slate-900 hover:text-white transition-colors"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full glass-card hover:bg-slate-900 hover:text-white transition-colors"
            aria-label="Scroll Right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Touch Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-none w-[220px] sm:w-[260px] md:w-[280px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
