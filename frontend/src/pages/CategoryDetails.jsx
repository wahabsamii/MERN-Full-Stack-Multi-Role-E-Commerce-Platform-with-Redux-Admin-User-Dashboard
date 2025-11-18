import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { FaStar, FaHeart,FaRegHeart, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
// import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { addLike } from '../redux/like/likeSlice';
import bg from '../assets/banner-top.jpg';
function CategoryDetails() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const param = useParams();

  const name = param.name;
  
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/product/all`);
    //   setProducts(res.data.products || []);
      const filterProduct = res.data.products.filter((item,index, array) => item.category === name);
      setProducts(filterProduct)
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

   const dispatch = useDispatch();
      const addToCartPro = (product) => {
      dispatch(addToCart(product))
      };
    const toggleFavorite = (product) => {
      dispatch(addLike(product))
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
          <FaStar 
            key={index}
            className={index < rating ? "text-yellow-400" : "text-gray-300"}
            size={14}
          />
        ));
      };

  useEffect(() => {
    fetchProducts();
  }, []); // ✅ Only run once

  return (
    <div className="min-h-screen  text-black">
      {/* 🌟 Hero Section */}
      <section style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} className="w-full 600 to-purple-700 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Explore Our Products</h1>
        <p className="text-black max-w-2xl mx-auto">
          Discover high-quality products across all categories. More exciting
          features coming soon!
        </p>
      </section>

      {/* 🛍️ Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <Link to={`/product/${product.name}`}
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg p-4 relative group transition-all duration-300 hover:shadow-lg hover:border-red-500"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Image with Hover Actions */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img src={`${BASE_URL}/${product.image}`} alt="" />
              </div>
              
              {/* Hover Overlay with Actions */}
              <div className={`
                absolute inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-60 flex items-end justify-top 
                transition-all duration-300 ease-in-out
                ${hoveredProduct === product._id ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}>
                <div className="flex w-full h-full flex-col items-end space-y-2 pr-3 pt-4">
                  {/* Like Button */}
                  <button 
                    onClick={() => toggleFavorite(product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      // favorites.includes(product._id) 
                        // 'bg-red-500 text-white' 
                        // : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                        'bg-red-500 bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <FaRegHeart size={16} />
                  </button>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => addToCartPro(product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        'bg-white text-gray-600 hover:bg-green-50 hover:text-green-500'
                    }`}
                  >
                    <FaShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {product.name}
              </h3>
              
              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-bold text-lg">$ {product.price}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {renderStars(3)}
                </div>
                <span className="text-gray-500 text-sm">({product.reviews})</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
        )}
      </div>

      {/* 🧩 Related Products Section (Placeholder for later) */}
      
    </div>
  );
}

export default CategoryDetails;
