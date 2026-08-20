const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentInfo, subtotal, discount, shippingFee, tax, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    const orderNumber = 'ATH-' + Math.floor(100000 + Math.random() * 900000);

    const trackingTimeline = [
      { status: 'Placed', title: 'Order Placed', description: 'Your order has been submitted successfully.', timestamp: new Date(), isCompleted: true },
      { status: 'Confirmed', title: 'Order Confirmed', description: 'Seller has accepted your order.', timestamp: new Date(), isCompleted: true },
      { status: 'Packed', title: 'Packed & Processing', description: 'Items are packaged and ready for dispatch.', timestamp: new Date(), isCompleted: false },
      { status: 'Shipped', title: 'Handed to Courier', description: 'Package is in transit with Express Courier.', timestamp: null, isCompleted: false },
      { status: 'Out for Delivery', title: 'Out for Delivery', description: 'Courier agent is delivering your package.', timestamp: null, isCompleted: false },
      { status: 'Delivered', title: 'Package Delivered', description: 'Delivered to your address.', timestamp: null, isCompleted: false }
    ];

    const order = new Order({
      orderNumber,
      user: req.user ? req.user._id : '60d0fe4f5311236168a109ca', // fallback for demo
      items,
      shippingAddress,
      paymentInfo,
      deliveryInfo: {
        carrier: 'Aether Express Logistics',
        trackingNumber: 'TRK' + Math.floor(10000000 + Math.random() * 90000000),
        estimatedDelivery: '3-5 Business Days'
      },
      orderStatus: 'Confirmed',
      trackingTimeline,
      subtotal,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      tax: tax || 0,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by ID or orderNumber
// @route   GET /api/orders/:id
// @access  Private/Public
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    } else {
      order = await Order.findOne({ orderNumber: id });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
