import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { BASE_URL } from "../config";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch only best selling products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/product/all`);
      const bestSellingProducts = res.data.products.filter(
        (item) => item.bestSalling === true
      );
      setProducts(bestSellingProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className="text-yellow-400"
        size={14}
      />
    ));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <p className="mb-4 text-red-500 border-l-8 border-red-500 pl-4">
        Best Selling Products
      </p>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Best Selling Products</h2>

        
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                <img
                  src={`${BASE_URL}/${product.image}`}
                  alt={product.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 font-bold text-lg">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 text-sm line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {renderStars(product.rating || 5)}
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({product.reviews || 0})
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full py-8">
            No best selling products available.
          </p>
        )}
      </div>
    </section>
  );
};

export default BestSellingProducts;
