const Product = require('../models/Product');

// @desc    Get all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, rating, sort, search, page = 1, limit = 12 } = req.query;

    const query = {};

    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    if (brand) {
      query.brand = { $regex: new RegExp(brand, 'i') };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (rating) {
      query.ratings = { $gte: Number(rating) };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'rating') sortOptions = { ratings: -1 };
    if (sort === 'newest') sortOptions = { createdAt: -1 };
    if (sort === 'popularity') sortOptions = { reviewCount: -1 };

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages,
      currentPage: Number(page),
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by slug or ID
// @route   GET /api/products/:idOrSlug
// @access  Public
exports.getProductByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let product;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug);
    } else {
      product = await Product.findOne({ slug: idOrSlug });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured, bestseller, new arrival products
// @route   GET /api/products/collections/:type
// @access  Public
exports.getCollectionProducts = async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};

    if (type === 'featured') query.isFeatured = true;
    if (type === 'bestseller') query.isBestseller = true;
    if (type === 'new-arrival') query.isNewArrival = true;

    const products = await Product.find(query).limit(8);
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
