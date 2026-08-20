const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getLiveSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.json({ success: true, products: [], categories: [], brands: [] });
    }

    const regex = new RegExp(q, 'i');

    const products = await Product.find({
      $or: [{ name: regex }, { category: regex }, { brand: regex }]
    })
      .select('name slug price images category brand ratings discount')
      .limit(6);

    const categories = await Category.find({ name: regex }).limit(3);
    const brands = await Product.distinct('brand', { brand: regex });

    res.json({
      success: true,
      products,
      categories,
      brands: brands.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
