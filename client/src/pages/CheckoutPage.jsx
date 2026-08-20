import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, ShieldCheck, MapPin, Truck, Lock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/categoryService';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const { cartItems, subtotal, discountAmount, shippingFee, tax, grandTotal, clearCart } = useCart();
  const { addresses, addAddress } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddrId, setSelectedAddrId] = useState(addresses[0]?.id || 'addr-1');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  // New Address Form
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  });

  const handleCreateAddress = (e) => {
    e.preventDefault();
    addAddress(newAddr);
    setShowNewAddr(false);
    if (addToast) addToast('Shipping address added', 'success');
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    const chosenAddress = addresses.find((a) => a.id === selectedAddrId) || addresses[0];

    const orderData = {
      items: cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize
      })),
      shippingAddress: chosenAddress,
      paymentInfo: { method: paymentMethod, status: 'paid' },
      subtotal,
      discount: discountAmount,
      shippingFee,
      tax,
      totalAmount: grandTotal
    };

    try {
      const createdOrder = await orderService.createOrder(orderData);
      clearCart();
      if (addToast) addToast('Order submitted successfully!', 'success');
      navigate(`/account/orders/${createdOrder.orderNumber || createdOrder._id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Checkout</h1>
        <p className="text-xs text-slate-500">Complete your shipping and encrypted payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Multi-Step Accordion Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Shipping Address */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-extrabold text-slate-900">Shipping Address</h3>
              </div>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-xs font-bold text-blue-600">
                  Edit
                </button>
              )}
            </div>

            {step === 1 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddrId(addr.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedAddrId === addr.id
                          ? 'border-slate-900 bg-white/90 shadow-md'
                          : 'border-slate-200 bg-white/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-extrabold text-slate-900">{addr.fullName}</h4>
                        {selectedAddrId === addr.id && (
                          <Check size={16} className="text-slate-900" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">{addr.street}</p>
                      <p className="text-[11px] text-slate-600">
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                      <p className="text-[11px] text-slate-500 pt-1">{addr.phone}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowNewAddr(!showNewAddr)}
                  className="text-xs font-bold text-slate-800 underline"
                >
                  + Add New Address
                </button>

                {showNewAddr && (
                  <form onSubmit={handleCreateAddress} className="space-y-3 p-4 bg-slate-50 rounded-2xl border">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="p-2 text-xs rounded-xl bg-white border"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Phone"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="p-2 text-xs rounded-xl bg-white border"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Street Address"
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full p-2 text-xs rounded-xl bg-white border"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="p-2 text-xs rounded-xl bg-white border"
                      />
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="p-2 text-xs rounded-xl bg-white border"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Zip Code"
                        value={newAddr.zipCode}
                        onChange={(e) => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                        className="p-2 text-xs rounded-xl bg-white border"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
                      Save Address
                    </button>
                  </form>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-slate-900 text-white text-xs font-extrabold rounded-2xl shadow-md"
                >
                  Continue to Delivery →
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Delivery & Shipping */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-extrabold text-slate-900">Delivery Method</h3>
              </div>
              {step > 2 && (
                <button onClick={() => setStep(2)} className="text-xs font-bold text-blue-600">
                  Edit
                </button>
              )}
            </div>

            {step === 2 && (
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl border-2 border-slate-900 bg-white/90 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-slate-900" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">
                        Aether Express Courier (3-5 Days)
                      </h4>
                      <p className="text-[11px] text-slate-500">Tracked frosted packaging delivery</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                  </span>
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-3 bg-slate-900 text-white text-xs font-extrabold rounded-2xl shadow-md"
                >
                  Continue to Payment →
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Payment Selection */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200/80">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Encrypted Payment</h3>
            </div>

            {step >= 3 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI Instant', icon: Lock },
                    { id: 'netbanking', label: 'Net Banking', icon: Lock },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-2xl border-2 text-left flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === m.id
                            ? 'border-slate-900 bg-white font-extrabold text-slate-900 shadow-md'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-[11px] font-bold">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={loading}
                  onClick={handleCompleteOrder}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing Order...' : `Pay & Confirm Order ($${grandTotal})`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Mini Cart Summary */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4 border border-white/90 sticky top-28">
          <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-3">
            Items in Order ({cartItems.length})
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cartItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-slate-900">${item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900">
                {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
