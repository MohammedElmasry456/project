import React, { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../Components/ProductCard";


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("none");

  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, sortOption]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Electronics Store</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="none">Sort</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
