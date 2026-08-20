import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Rating, PriceDisplay } from '../common/Rating';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const isSaved = isInWishlist(product._id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      1,
      product.colors ? product.colors[0]?.name : '',
      product.sizes ? product.sizes[0] : ''
    );
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative glass-card rounded-2xl p-3 flex flex-col justify-between h-full">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100/60 mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-slate-900 text-white rounded-md shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-600 text-white rounded-md shadow-sm">
              NEW
            </span>
          )}
          {product.isBestseller && !product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-600 text-white rounded-md shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isSaved
              ? 'bg-red-500 text-white fill-red-500'
              : 'bg-white/70 hover:bg-white text-slate-700 hover:text-slate-900'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart size={16} className={isSaved ? 'fill-current' : ''} />
        </button>

        {/* Desktop Hover Quick Action Buttons Overlay */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-glass flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
          <Link
            to={`/product/${product.slug || product._id}`}
            className="p-2 bg-white/90 hover:bg-white text-slate-900 rounded-lg shadow-glass flex items-center justify-center transition-colors"
            title="View Details"
          >
            <Eye size={14} />
          </Link>
        </div>
      </div>

      {/* Product Details & Pricing */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            {product.brand}
          </span>
          <Link
            to={`/product/${product.slug || product._id}`}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Rating value={product.ratings} count={product.reviewCount} size={12} />
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
        </div>

        {/* Mobile Touch Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="md:hidden w-full mt-2 py-2 px-3 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
};
