import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../config';
import { addToCart } from '../redux/cart/cartSlice';
import { FaStar, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { removeLike } from '../redux/like/likeSlice'; // <-- optional if you have removeLike action

function Wishlist() {
  const dispatch = useDispatch();
  const { likeProducts } = useSelector((state) => state.like);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const addToCartPro = (product) => {
    dispatch(addToCart(product));
  };
  const removeLikePr = (product) => {
    dispatch(removeLike(product));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        size={14}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {likeProducts && likeProducts.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h2>
            <p className="text-gray-600">
              You have <span className="text-red-500 font-semibold">{likeProducts.length}</span> items in your wishlist
            </p>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {likeProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg p-4 relative group transition-all duration-300 hover:shadow-lg hover:border-red-500"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={`${BASE_URL}/${product.image}`}
                      alt={product.name}
                      className="h-full object-contain"
                    />
                  </div>

                  {/* Hover Buttons */}
                  <div
                    className={`absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-end justify-end p-3 transition-all duration-300 ${
                      hoveredProduct === product._id
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <button
                      onClick={() => removeLikePr(product._id)}
                      className="w-9 h-9 rounded-full bg-white text-gray-600 hover:text-red-500 flex items-center justify-center"
                    >
                      <FaTrash size={14} />
                    </button>
                    <button
                      onClick={() => addToCartPro(product)}
                      className="w-9 h-9 rounded-full ml-2 bg-white text-gray-600 hover:text-green-500 flex items-center justify-center"
                    >
                      <FaShoppingCart size={14} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-red-500 font-bold text-lg">
                    ${product.price}
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(4)}
                    <span className="text-gray-500 text-sm">(23)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">Your wishlist is empty</h2>
          <p className="text-gray-500">Start adding products you love!</p>
        </section>
      )}
    </div>
  );
}

export default Wishlist;
