const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: { type: String, default: '' },
  colorHex: { type: String, default: '#000000' },
  size: { type: String, default: '' },
  price: { type: Number },
  stock: { type: Number, default: 10 },
  sku: { type: String, default: '' },
  image: { type: String, default: '' }
});

const specificationSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    brand: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    categoryRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true, min: 0, index: true },
    originalPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0 },
    ratings: { type: Number, default: 4.5, min: 0, max: 5, index: true },
    reviewCount: { type: Number, default: 0 },
    colors: [{ name: String, hex: String }],
    sizes: [{ type: String }],
    variants: [variantSchema],
    specifications: [specificationSchema],
    stock: { type: Number, required: true, default: 20 },
    sku: { type: String, unique: true, sparse: true },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false, index: true },
    isBestseller: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

// Search text index
productSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
