const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', getOrderById);

module.exports = router;
