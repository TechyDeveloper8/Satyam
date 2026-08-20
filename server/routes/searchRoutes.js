const express = require('express');
const router = express.Router();
const { getLiveSearch } = require('../controllers/searchController');

router.get('/', getLiveSearch);

module.exports = router;
