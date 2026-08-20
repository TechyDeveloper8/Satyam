import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PriceDisplay } from '../common/Rating';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md h-full glass-modal bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col justify-between border-l border-white/80 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-slate-900" />
            <h3 className="text-lg font-extrabold text-slate-900">Your Shopping Bag</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
              <ShoppingBag size={48} className="mb-3 opacity-30 text-slate-400" />
              <p className="text-sm font-bold text-slate-800">Your bag is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore our minimal architectural catalog and discover premium acoustics & design.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-2xl glass-card border border-slate-100"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>
                  <div className="mt-1">
                    <PriceDisplay price={item.product.price} size="sm" />
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="p-1 rounded text-slate-700 hover:bg-white text-xs font-bold"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="p-1 rounded text-slate-700 hover:bg-white text-xs font-bold"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-slate-200/80 bg-slate-50/50 space-y-4">
            
            {/* Coupon Code Section */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. AETHER10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none uppercase font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[10px] text-red-500 pl-1">{couponError}</p>}
              </form>
            ) : (
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span>Code "{appliedCoupon.code}" applied (-{appliedCoupon.discountPercent}%)</span>
                <button onClick={removeCoupon} className="text-emerald-700 hover:underline text-[10px]">
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-semibold">-${discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-900">${tax}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
            >
              Checkout Now <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
