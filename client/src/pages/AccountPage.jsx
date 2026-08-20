import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AccountPage = () => {
  const { user, addresses, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  const mockUserOrders = [
    {
      _id: 'ord-1001',
      orderNumber: 'ATH-984210',
      createdAt: '2026-08-18',
      totalAmount: 323,
      orderStatus: 'Packed',
      itemsCount: 1
    },
    {
      _id: 'ord-1002',
      orderNumber: 'ATH-441920',
      createdAt: '2026-07-29',
      totalAmount: 449,
      orderStatus: 'Delivered',
      itemsCount: 1
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile Summary */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-extrabold text-xl flex items-center justify-center">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{user?.name || 'Customer'}</h1>
            <p className="text-xs text-slate-500">{user?.email || 'customer@aether.io'}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 flex items-center gap-1.5"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 glass-panel p-4 rounded-3xl space-y-2 border border-white/80">
          {[
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'profile', label: 'Profile Details', icon: User },
            { id: 'settings', label: 'Account Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-white/80'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Your Orders ({mockUserOrders.length})</h3>

              <div className="space-y-3">
                {mockUserOrders.map((ord) => (
                  <div
                    key={ord._id}
                    className="glass-card p-5 rounded-3xl flex items-center justify-between flex-wrap gap-4 border border-slate-200"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{ord.orderNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">Placed on {ord.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-extrabold text-slate-900">${ord.totalAmount}</span>
                      <Link
                        to={`/account/orders/${ord.orderNumber}`}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1 hover:bg-slate-800"
                      >
                        <Truck size={14} /> Track Order <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Saved Shipping Addresses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((a) => (
                  <div key={a.id} className="glass-card p-4 rounded-2xl border border-slate-200 space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-900">{a.fullName}</h4>
                    <p className="text-xs text-slate-600">{a.street}</p>
                    <p className="text-xs text-slate-600">{a.city}, {a.state} {a.zipCode}</p>
                    <p className="text-xs text-slate-500 pt-1">{a.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/80">
              <h3 className="text-base font-extrabold text-slate-900">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block">Full Name</span>
                  <span className="text-slate-900 font-semibold">{user?.name || 'Alexandre Mercer'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Email Address</span>
                  <span className="text-slate-900 font-semibold">{user?.email || 'alex@aether.io'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Phone Number</span>
                  <span className="text-slate-900 font-semibold">{user?.phone || '+1 (555) 234-5678'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
