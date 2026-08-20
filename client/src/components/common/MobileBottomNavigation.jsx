import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Search, Heart, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNavigation = ({ onOpenSearch }) => {
  const location = useLocation();
  const { wishlistCount } = useWishlist();

  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/products', icon: Grid },
    { name: 'Search', action: onOpenSearch, icon: Search },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { name: 'Account', path: '/account', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 glass-nav rounded-2xl p-2 max-w-lg mx-auto shadow-2xl border border-white/80">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.path && location.pathname === tab.path;

          if (tab.action) {
            return (
              <button
                key={tab.name}
                onClick={tab.action}
                className="flex flex-col items-center gap-1 py-1 px-3 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{tab.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-slate-900 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
              <span className="text-[10px] font-medium">{tab.name}</span>
              {tab.badge > 0 && (
                <span className="absolute -top-0.5 right-2 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
