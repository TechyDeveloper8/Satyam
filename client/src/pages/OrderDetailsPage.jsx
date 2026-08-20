import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ArrowLeft, ShieldCheck, MapPin, Package, CheckCircle } from 'lucide-react';
import { orderService } from '../services/categoryService';
import { OrderTimeline } from '../components/common/SkeletonLoader';
import { PriceDisplay } from '../components/common/Rating';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-bold">Loading order tracking...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-bold">Order not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 glass-panel p-6 rounded-3xl border border-white/80">
        <div>
          <Link to="/account" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 mb-2">
            <ArrowLeft size={14} /> Back to My Orders
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Order #{order.orderNumber}</h1>
          <p className="text-xs text-slate-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-extrabold shadow-sm">
            Status: {order.orderStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tracking Timeline & Order Items */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tracking Timeline Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Truck size={18} /> Live Package Tracking Timeline
            </h3>

            <OrderTimeline timeline={order.trackingTimeline} />
          </div>

          {/* Purchased Items List */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-3">
              Items in Package
            </h3>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b border-slate-100 pb-3 last:border-none">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">Quantity: {item.quantity}</p>
                  </div>
                  <PriceDisplay price={item.price * item.quantity} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Address & Payment Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/90 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <MapPin size={16} /> Delivery Address
            </h3>

            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-extrabold text-slate-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p className="text-slate-500 pt-1">{order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/90 space-y-3 text-xs text-slate-600">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-3">
              Payment & Breakdown
            </h3>
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-bold text-slate-900 uppercase">{order.paymentInfo.method}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900">
                {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
              <span>Total Paid</span>
              <span>${order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
