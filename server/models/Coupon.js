const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercentage: { type: Number, required: true, min: 1, max: 100 },
    maxDiscount: { type: Number, default: 500 },
    minOrderValue: { type: Number, default: 0 },
    validUntil: { type: Date },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
