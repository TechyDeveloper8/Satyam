import API from './api';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mockData';

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await API.get('/categories');
      if (response.data && response.data.categories) {
        return response.data.categories;
      }
    } catch (error) {
      console.warn('API error, returning mock categories');
    }
    return MOCK_CATEGORIES;
  }
};

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await API.post('/orders', orderData);
      if (response.data && response.data.order) {
        return response.data.order;
      }
    } catch (error) {
      console.warn('API error, creating offline demo order');
    }

    const orderNumber = 'ATH-' + Math.floor(100000 + Math.random() * 900000);
    return {
      _id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentInfo: orderData.paymentInfo,
      deliveryInfo: {
        carrier: 'Aether Express Logistics',
        trackingNumber: 'TRK' + Math.floor(10000000 + Math.random() * 90000000),
        estimatedDelivery: '3-5 Business Days'
      },
      orderStatus: 'Confirmed',
      trackingTimeline: [
        { status: 'Placed', title: 'Order Placed', description: 'Your order has been submitted successfully.', timestamp: new Date().toISOString(), isCompleted: true },
        { status: 'Confirmed', title: 'Order Confirmed', description: 'Seller has accepted your order.', timestamp: new Date().toISOString(), isCompleted: true },
        { status: 'Packed', title: 'Packed & Processing', description: 'Items are packaged and ready for dispatch.', timestamp: null, isCompleted: false },
        { status: 'Shipped', title: 'Handed to Courier', description: 'Package is in transit with Express Courier.', timestamp: null, isCompleted: false },
        { status: 'Out for Delivery', title: 'Out for Delivery', description: 'Courier agent is delivering your package.', timestamp: null, isCompleted: false },
        { status: 'Delivered', title: 'Package Delivered', description: 'Delivered to your address.', timestamp: null, isCompleted: false }
      ],
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shippingFee: orderData.shippingFee || 0,
      tax: orderData.tax || 0,
      totalAmount: orderData.totalAmount
    };
  },

  getOrderById: async (id) => {
    try {
      const response = await API.get(`/orders/${id}`);
      if (response.data && response.data.order) {
        return response.data.order;
      }
    } catch (error) {
      console.warn('API error, retrieving mock order details');
    }
    return {
      _id: 'ord-1001',
      orderNumber: id || 'ATH-984210',
      createdAt: '2026-08-18T10:30:00.000Z',
      items: [
        {
          product: MOCK_PRODUCTS[0]._id,
          name: MOCK_PRODUCTS[0].name,
          image: MOCK_PRODUCTS[0].images[0],
          price: MOCK_PRODUCTS[0].price,
          quantity: 1,
          color: 'Slate Grey'
        }
      ],
      shippingAddress: {
        fullName: 'Alexandre Mercer',
        phone: '+1 (555) 234-5678',
        street: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94107',
        country: 'United States'
      },
      paymentInfo: { method: 'card', status: 'paid', transactionId: 'TXN_99881122' },
      deliveryInfo: { carrier: 'Aether Express Logistics', trackingNumber: 'TRK987654321', estimatedDelivery: 'Aug 24, 2026' },
      orderStatus: 'Packed',
      trackingTimeline: [
        { status: 'Placed', title: 'Order Placed', description: 'Order submitted successfully.', timestamp: '2026-08-18T10:30:00.000Z', isCompleted: true },
        { status: 'Confirmed', title: 'Order Confirmed', description: 'Payment verified & order accepted.', timestamp: '2026-08-18T11:00:00.000Z', isCompleted: true },
        { status: 'Packed', title: 'Packed & Processing', description: 'Items securely packaged in frosted glassbox.', timestamp: '2026-08-19T09:15:00.000Z', isCompleted: true },
        { status: 'Shipped', title: 'Handed to Courier', description: 'In transit to local logistics hub.', timestamp: null, isCompleted: false },
        { status: 'Out for Delivery', title: 'Out for Delivery', description: 'Courier agent scheduled for delivery.', timestamp: null, isCompleted: false },
        { status: 'Delivered', title: 'Package Delivered', description: 'Signature collected on delivery.', timestamp: null, isCompleted: false }
      ],
      subtotal: 299,
      discount: 0,
      shippingFee: 0,
      tax: 24,
      totalAmount: 323
    };
  }
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data && response.data.user) {
        return response.data.user;
      }
    } catch (error) {
      console.warn('API connection offline, conducting client auth fallback');
    }
    // Fallback demo user
    return {
      _id: 'usr-99',
      name: credentials.email ? credentials.email.split('@')[0] : 'Demo User',
      email: credentials.email || 'demo@aether.io',
      phone: '+1 (555) 987-6543',
      role: 'customer',
      token: 'demo_jwt_token_2026'
    };
  },

  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      if (response.data && response.data.user) {
        return response.data.user;
      }
    } catch (error) {
      console.warn('API offline, conducting client register fallback');
    }
    return {
      _id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      role: 'customer',
      token: 'demo_jwt_token_2026'
    };
  }
};
