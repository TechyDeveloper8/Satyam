import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { EmptyState } from '../components/common/SkeletonLoader';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Saved Wishlist</h1>
        <p className="text-xs text-slate-500">Products saved for later consideration</p>
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save titanium acoustic headphones, watches, or ceramic lamps while browsing."
          actionText="Explore Catalog"
          onAction={() => navigate('/products')}
        />
      ) : (
        <ProductGrid products={wishlist} />
      )}
    </div>
  );
};
