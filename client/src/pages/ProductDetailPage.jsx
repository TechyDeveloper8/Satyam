import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, ChevronDown, Check, Star } from 'lucide-react';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/product/ProductGallery';
import { Rating, PriceDisplay } from '../components/common/Rating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { MOCK_REVIEWS } from '../data/mockData';

export const ProductDetailPage = () => {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductByIdOrSlug(idOrSlug);
        setProduct(data);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0].name);
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idOrSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-bold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-bold">Product not found</p>
      </div>
    );
  }

  const isSaved = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewTitle || !newReviewComment) return;
    const rev = {
      _id: 'rev-' + Date.now(),
      userName: 'You (Verified Buyer)',
      rating: newReviewRating,
      title: newReviewTitle,
      comment: newReviewComment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews([rev, ...reviews]);
    setShowReviewModal(false);
    setNewReviewTitle('');
    setNewReviewComment('');
    if (addToast) addToast('Thank you for submitting your review!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Product Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} />
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block">
              {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <Rating value={product.ratings} count={product.reviewCount} size={16} />
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl glass-card flex items-center justify-between border border-slate-200/80">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="xl" />
            {product.discount > 0 && (
              <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-xs">
                Save ${product.originalPrice - product.price} ({product.discount}%)
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.shortDescription || product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Selected Color: <span className="font-normal text-slate-600">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor === color.name
                        ? 'border-slate-900 scale-110 shadow-md'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check size={14} className="text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Size Option
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedSize === size
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Wishlist */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="text-sm font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              <Heart size={20} className={isSaved ? 'fill-current' : ''} />
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              className="py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl transition-transform active:scale-95"
            >
              Buy Now
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-slate-900" />
              <span>Free Shipping Over $200</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-slate-900" />
              <span>2-Year International Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Accordions Section (Description, Specs, Reviews) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 space-y-6">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-4 overflow-x-auto">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider py-1 border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab} {tab === 'reviews' && `(${reviews.length})`}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {product.specifications?.map((spec, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/70 border border-slate-200 flex justify-between">
                <span className="text-xs font-bold text-slate-700">{spec.label}</span>
                <span className="text-xs text-slate-900 font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Customer Ratings & Reviews</h3>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Write a Review
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                    <span className="text-[10px] text-slate-400">{rev.createdAt}</span>
                  </div>
                  <Rating value={rev.rating} size={12} />
                  <h5 className="text-xs font-bold text-slate-800">{rev.title}</h5>
                  <p className="text-xs text-slate-600">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="w-full max-w-md glass-modal p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Write a Review</h3>
            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full p-2 text-xs rounded-xl bg-white border border-slate-200"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Review Headline..."
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-white border border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Comment</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed feedback..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-white border border-slate-200"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2 text-xs font-bold border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
