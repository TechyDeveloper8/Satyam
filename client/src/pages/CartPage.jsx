import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PriceDisplay } from '../components/common/Rating';

export const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'AETHER10') {
      applyCoupon('AETHER10', 10);
      setCouponCode('');
    } else if (couponCode.trim().toUpperCase() === 'GLASS20') {
      applyCoupon('GLASS20', 20);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try "AETHER10" or "GLASS20"');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-200/60 rounded-3xl flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your Bag is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our minimal acoustic, smartwatch, and architectural interior collections.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-slate-800"
        >
          Discover Catalog <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
        <p className="text-xs text-slate-500">Manage items before proceeding to secure checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-4 sm:p-6 rounded-3xl flex items-center gap-4 sm:gap-6 border border-slate-200/80"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-slate-100"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {item.product.brand}
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                  {item.product.name}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                </div>
                <PriceDisplay price={item.product.price} size="sm" />
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="p-1 rounded text-slate-700 hover:bg-white font-bold"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-bold px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="p-1 rounded text-slate-700 hover:bg-white font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(idx)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-xl"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-6 border border-white/90 sticky top-28">
          <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-3">
            Order Summary
          </h3>

          {/* Coupon Code Section */}
          {!appliedCoupon ? (
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 uppercase font-semibold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] text-red-500">{couponError}</p>}
            </form>
          ) : (
            <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <span>Code "{appliedCoupon.code}" (-{appliedCoupon.discountPercent}%)</span>
              <button onClick={removeCoupon} className="text-emerald-700 hover:underline text-[10px]">
                Remove
              </button>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon Discount</span>
                <span className="font-semibold">-${discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900">
                {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span className="font-semibold text-slate-900">${tax}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
