const express = require('express');
const router = express.Router();
const { getProducts, getProductByIdOrSlug, getCollectionProducts } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/collections/:type', getCollectionProducts);
router.get('/:idOrSlug', getProductByIdOrSlug);

module.exports = router;
