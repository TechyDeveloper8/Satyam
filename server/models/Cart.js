const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
  color: { type: String, default: '' },
  size: { type: String, default: '' },
  price: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    couponCode: { type: String, default: '' },
    discountAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
