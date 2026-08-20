import React from 'react';
import { Star } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Rating = ({ value = 4.5, count, size = 14 }) => {
  return (
    <div className="flex items-center gap-1.5 text-slate-700">
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.round(value)
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300 fill-slate-200'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-slate-700">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-slate-600">({count})</span>
      )}
    </div>
  );
};

export const PriceDisplay = ({ price, originalPrice, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl font-extrabold'
  };

  return (
    <div className="flex items-baseline gap-2">
      <span className={`${sizeClasses[size]} text-slate-900 tracking-tight`}>
        ${price.toLocaleString()}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-xs text-slate-600 line-through">
          ${originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`pointer-events-auto p-4 rounded-xl shadow-glass backdrop-blur-md border flex items-center justify-between text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-slate-900/90 text-white border-slate-700'
                : toast.type === 'error'
                ? 'bg-red-900/90 text-white border-red-700'
                : 'bg-white/90 text-slate-800 border-slate-200'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-xs opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
