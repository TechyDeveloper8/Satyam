import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ onOpenSearch }) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
    { name: 'Audio', path: '/products?category=Audio' },
    { name: 'Wearables', path: '/products?category=Wearables' },
    { name: 'Tech', path: '/products?category=Tech' },
    { name: 'Interiors', path: '/products?category=Living' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Button & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-200/50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black tracking-tighter text-sm group-hover:scale-105 transition-transform">
              Æ
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
              AETHER<span className="text-slate-600 font-normal">STORE</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-slate-900 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-slate-900 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions (Search, Wishlist, Cart, Account) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel hover:bg-white/90 text-xs text-slate-500 hover:text-slate-900 transition-all border border-slate-200/80 shadow-sm"
            aria-label="Search catalog"
          >
            <Search size={16} className="text-slate-600" />
            <span className="hidden sm:inline font-medium">Search items...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-600 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2.5 text-slate-700 hover:text-slate-900 hover:bg-white/60 rounded-full transition-colors"
            aria-label="View Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-slate-700 hover:text-slate-900 hover:bg-white/60 rounded-full transition-colors"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag size={20} />
            {totalItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Account Menu */}
          <div className="relative group">
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="flex items-center gap-2 p-2 text-slate-700 hover:text-slate-900 hover:bg-white/60 rounded-full transition-colors"
              aria-label="User Account"
            >
              <User size={20} />
              {isAuthenticated && (
                <span className="hidden lg:inline text-xs font-semibold text-slate-800">
                  {user?.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-glass border border-slate-200/80 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform origin-top-right z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                  <p className="text-[11px] text-slate-600 truncate">{user?.email}</p>
                </div>
                <Link to="/account" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">
                  My Orders & Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200/80 px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-800 hover:text-slate-900 flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/80"
              >
                {link.name}
                <ArrowRight size={14} className="text-slate-400" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
