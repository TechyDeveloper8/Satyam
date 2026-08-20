import API from './api';
import { MOCK_PRODUCTS } from '../data/mockData';

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await API.get('/products', { params });
      if (response.data && response.data.products) {
        return response.data;
      }
    } catch (error) {
      console.warn('API connection unavailable, returning dynamic mock products:', error.message);
    }

    // Client-side filtering fallback for demo
    let filtered = [...MOCK_PRODUCTS];

    if (params.category) {
      filtered = filtered.filter((p) => p.category.toLowerCase().includes(params.category.toLowerCase()));
    }
    if (params.brand) {
      filtered = filtered.filter((p) => p.brand.toLowerCase().includes(params.brand.toLowerCase()));
    }
    if (params.minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(params.maxPrice));
    }
    if (params.rating) {
      filtered = filtered.filter((p) => p.ratings >= Number(params.rating));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (params.sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    if (params.sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    if (params.sort === 'rating') filtered.sort((a, b) => b.ratings - a.ratings);

    return {
      success: true,
      count: filtered.length,
      totalProducts: filtered.length,
      totalPages: 1,
      currentPage: 1,
      products: filtered
    };
  },

  getProductByIdOrSlug: async (idOrSlug) => {
    try {
      const response = await API.get(`/products/${idOrSlug}`);
      if (response.data && response.data.product) {
        return response.data.product;
      }
    } catch (error) {
      console.warn('API error, retrieving product from mock store...');
    }

    const product = MOCK_PRODUCTS.find((p) => p._id === idOrSlug || p.slug === idOrSlug);
    return product || MOCK_PRODUCTS[0];
  },

  getCollectionProducts: async (type) => {
    try {
      const response = await API.get(`/products/collections/${type}`);
      if (response.data && response.data.products) {
        return response.data.products;
      }
    } catch (error) {
      console.warn('API error, returning mock collection...');
    }

    if (type === 'featured') return MOCK_PRODUCTS.filter((p) => p.isFeatured);
    if (type === 'bestseller') return MOCK_PRODUCTS.filter((p) => p.isBestseller);
    if (type === 'new-arrival') return MOCK_PRODUCTS.filter((p) => p.isNewArrival);
    return MOCK_PRODUCTS.slice(0, 4);
  }
};
