const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Satyam Market Glassmorphism E-Commerce API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const path = require('path');

// Serve frontend static assets in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.use(notFound);
  app.use(errorHandler);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡ Express server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
