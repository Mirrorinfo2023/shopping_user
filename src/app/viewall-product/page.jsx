'use client';

import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const products = [
  { id: 1, title: 'Sandable Body Repair', price: 15, category: 'Automotive', type: 'Tools', image: 'https://via.placeholder.com/100x100?text=Repair' },
  { id: 2, title: 'Garvee Shoe Bench', price: 200, category: 'Home & Kitchen', type: 'Furniture', image: 'https://via.placeholder.com/100x100?text=Bench' },
  { id: 3, title: 'Notebook Apple Laptop', price: 1200, category: 'Electronics', type: 'Laptop', image: 'https://via.placeholder.com/100x100?text=MacBook' },
  { id: 4, title: 'Cool Running Shoe', price: 80, category: "Men's Fashion", type: 'Shoes', image: 'https://via.placeholder.com/100x100?text=Running+Shoe' },
  { id: 5, title: 'Girls Casual Shoes', price: 22, category: "Women's Fashion", type: 'Shoes', image: 'https://via.placeholder.com/100x100?text=Girls+Shoe' },
  { id: 6, title: 'Smart Watch Bluetooth', price: 150, category: 'Electronics', type: 'Watch', image: 'https://via.placeholder.com/100x100?text=Smart+Watch' },
  { id: 7, title: 'Exquisite 18K White Gold...', price: 1680, oldPrice: 2400, discount: '30%', category: "Women's Fashion", type: 'Jewelry', image: 'https://via.placeholder.com/100x100?text=Necklace' },
  { id: 8, title: 'Trendy Sport Shoe', price: 60, category: "Men's Fashion", type: 'Shoes', image: 'https://via.placeholder.com/100x100?text=Sport+Shoe' },
];

const allCategories = [...new Set(products.map(p => p.category))];
const allTypes = [...new Set(products.map(p => p.type))];

const ViewAllProducts = () => {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sort, setSort] = useState('');

  const clearFilters = () => {
    setSearch('');
    setPriceRange([0, 4000]);
    setSelectedCategory('');
    setSelectedType('');
    setSort('');
  };

  const filtered = products
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .filter((p) => (selectedType ? p.type === selectedType : true))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-20">
      <div className="grid grid-cols-12 gap-6">
        {/* Filters Panel */}
        <div className="col-span-12 lg:col-span-3 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button onClick={clearFilters} className="text-sm text-blue-500 hover:underline flex items-center gap-1">
              <FaTimes size={12} /> Clear
            </button>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Search</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product"
                className="w-full border px-3 py-2 rounded pr-10"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Category</label>
            <select className="w-full border px-3 py-2 rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              {allCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Product Type</label>
            <select className="w-full border px-3 py-2 rounded" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">All</option>
              {allTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Price Range ($)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Sort By Price</label>
            <select className="w-full border px-3 py-2 rounded" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative"
                >
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {product.discount}
                    </span>
                  )}
                  <img src={product.image} alt={product.title} className="w-full h-28 object-contain mb-2" />
                  <h3 className="text-sm font-semibold">{product.title}</h3>
                  <div className="text-gray-700 font-bold">
                    {product.price.toFixed(2)}
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-20">No products match your filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllProducts;
