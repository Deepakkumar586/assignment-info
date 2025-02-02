import React, { useState } from "react";

const SearchFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilter(term, category, priceRange);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    onFilter(searchTerm, selectedCategory, priceRange);
  };

  const handlePriceRangeChange = (e) => {
    const selectedPriceRange = e.target.value;
    setPriceRange(selectedPriceRange);
    onFilter(searchTerm, category, selectedPriceRange);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        value={searchTerm}
        onChange={handleSearch}
        aria-label="Search products"
      />

      {/* Filters */}
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        {/* Category Dropdown */}
        <select
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          value={category}
          onChange={handleCategoryChange}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Price Range Dropdown */}
        <select
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          value={priceRange}
          onChange={handlePriceRangeChange}
          aria-label="Filter by price range"
        >
          <option value="">All Prices</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500+">$500+</option>
        </select>
      </div>

      {/* Applied Filters (Optional) */}
      {(searchTerm || category || priceRange) && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Applied Filters:</p>
          <ul className="list-disc list-inside">
            {searchTerm && <li>Search: "{searchTerm}"</li>}
            {category && <li>Category: {category}</li>}
            {priceRange && <li>Price: {priceRange}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;