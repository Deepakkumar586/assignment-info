import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";
// import ProductDetails from "./components/ProductDetails"; // New detailed product page

const products = [
  {
    id: 1,
    name: "Laptop X1",
    description: "High-performance laptop for professionals.",
    price: 1200,
    category: "Laptops",
    image: "laptop.jpeg",
  },
  {
    id: 2,
    name: "Smartphone Y2",
    description: "Latest smartphone with advanced features.",
    price: 800,
    category: "Smartphones",
    image: "smartphone.jpeg",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "Noise-cancelling wireless earbuds.",
    price: 150,
    category: "Accessories",
    image: "earbuds.jpeg",
  },
  {
    id: 4,
    name: "Gaming Laptop",
    description: "High-end gaming laptop with RTX 3080.",
    price: 2000,
    category: "Televisions",
    image: "televesion.jpeg",
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category ? product.category === category : true;

    let matchesPriceRange = true;
    if (priceRange === "0-100") {
      matchesPriceRange = product.price >= 0 && product.price <= 100;
    } else if (priceRange === "100-500") {
      matchesPriceRange = product.price > 100 && product.price <= 500;
    } else if (priceRange === "500+") {
      matchesPriceRange = product.price > 500;
    }

    return matchesSearchTerm && matchesCategory && matchesPriceRange;
  });

  return (
    <div>
      <Header />

      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center text-2xl flex flex-col gap-3">
                <h2>Welcome to Our Store</h2>
                <p>
                  We sell a wide range of products from various categories. Feel
                  free to explore!
                </p>
                <Link to="/products">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md 
             hover:bg-blue-700 transition duration-300 
             active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    🛍️ All Products
                  </button>
                </Link>
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <SearchFilter
                  onFilter={(term, category, priceRange) => {
                    setSearchTerm(term);
                    setCategory(category);
                    setPriceRange(priceRange);
                  }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                  {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-600">
                      No products found.
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  )}
                </div>
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
