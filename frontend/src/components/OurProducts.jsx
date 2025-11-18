// components/OurProducts.jsx
import React, { useEffect, useState } from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import axios from 'axios';
import { BASE_URL } from '../config';
import { addLike } from '../redux/like/likeSlice';
import { Link } from 'react-router-dom';

const OurProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
   const [products, setProducts] = useState([]);
    const fetchProducts = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/api/product/all`);
            setProducts(res.data.products);
        } catch (error) {
            alert(error);
        }
    };

  
    useEffect(() => {
        fetchProducts();
    },[products]);

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

  return (
    <section id='shownow' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <p className="mb-4 text-red-500 border-l-8 border-red-500 pl-4">
        Our Products
      </p>
      <div className=" mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
        <h3 className="text-xl text-gray-600">Explore Our Products</h3>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <div 
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
            <Link className="space-y-2" to={`/product/${product.name}`}>
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
            </Link>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="text-center">
        <button className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 mx-auto">
          <span>View All Products</span>
          <FaArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default OurProducts;