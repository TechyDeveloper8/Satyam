import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    sort: 'newest',
    search: '',
    inStockOnly: false
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 1000,
      rating: 0,
      sort: 'newest',
      search: '',
      inStockOnly: false
    });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
