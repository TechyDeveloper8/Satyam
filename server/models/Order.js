const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  color: { type: String, default: '' },
  size: { type: String, default: '' }
});

const trackingTimelineSchema = new mongoose.Schema({
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'United States' }
    },
    paymentInfo: {
      method: { type: String, enum: ['card', 'upi', 'netbanking', 'cod'], default: 'card' },
      status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'paid' },
      transactionId: { type: String, default: '' }
    },
    deliveryInfo: {
      carrier: { type: String, default: 'Express Logistics' },
      trackingNumber: { type: String, default: '' },
      estimatedDelivery: { type: String, default: '' }
    },
    orderStatus: {
      type: String,
      enum: ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Placed'
    },
    trackingTimeline: [trackingTimelineSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
