import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';
import { MOCK_PRODUCTS } from '../data/mockData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aether_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Pre-populate demo item for instant user testing
    return [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 1,
        selectedColor: MOCK_PRODUCTS[0].colors ? MOCK_PRODUCTS[0].colors[0].name : '',
        selectedSize: MOCK_PRODUCTS[0].sizes ? MOCK_PRODUCTS[0].sizes[0] : ''
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('aether_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedColor = '', selectedSize = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    if (addToast) {
      addToast(`Added "${product.name}" to cart`, 'success');
    }
  };

  const removeFromCart = (index) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    if (addToast && item) {
      addToast(`Removed "${item.product.name}"`, 'info');
    }
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code, discountPercent) => {
    setAppliedCoupon({ code, discountPercent });
    if (addToast) {
      addToast(`Coupon "${code}" applied successfully!`, 'success');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }, [subtotal, appliedCoupon]);

  const shippingFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return subtotal > 200 ? 0 : 15;
  }, [subtotal, cartItems]);

  const tax = useMemo(() => {
    return Math.round((subtotal - discountAmount) * 0.08);
  }, [subtotal, discountAmount]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingFee + tax);
  }, [subtotal, discountAmount, shippingFee, tax]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        tax,
        grandTotal,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
