import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { MobileBottomNavigation } from '../components/common/MobileBottomNavigation';
import { Footer } from '../components/common/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { SearchOverlay } from '../components/search/SearchOverlay';
import { ToastContainer } from '../components/common/Rating';

export const MainLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F4F2] text-slate-900 font-sans relative">
      
      {/* Top Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Slide-out Drawer */}
      <CartDrawer />

      {/* Toast Notifications Stack */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};
