import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Display Image */}
      <div className="relative aspect-square w-full glass-card rounded-3xl overflow-hidden bg-slate-100/80 group">
        <img
          src={images[selectedImage]}
          alt="Product gallery main"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Zoom Trigger Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-3 rounded-2xl glass-panel text-slate-800 hover:text-slate-950 transition-colors shadow-sm"
          title="Toggle Zoom Preview"
        >
          <ZoomIn size={18} />
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative flex-none w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? 'border-slate-900 shadow-md scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={images[selectedImage]}
            alt="Product Zoomed"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
