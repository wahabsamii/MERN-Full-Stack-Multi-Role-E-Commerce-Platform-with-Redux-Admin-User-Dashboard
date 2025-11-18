import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { FaStar, FaHeart,FaRegHeart, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
// import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { addLike } from '../redux/like/likeSlice';
import { Link } from 'react-router-dom';

function ProductDetails() {
  const { name } = useParams(); // product name from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

   const dispatch = useDispatch();
   const addToCartPro = (product) => {
      dispatch(addToCart(product))
    };
    const toggleFavorite = (product) => {
      dispatch(addLike(product))
    };

  // Fetch product details from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/product/${name}`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Product not found!");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [name, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-300">
        <div className="animate-spin border-4 border-gray-700 border-t-blue-500 rounded-full w-12 h-12"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Product not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 flex flex-row items-center">
        {/* Left: Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={`${BASE_URL}/${product.image}` || "/placeholder.png"}
            alt={product.name}
            className="w-full max-w-md rounded-2xl shadow-lg border border-gray-700"
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="text-2xl font-semibold mb-6 text-blue-400">
            ${product.price}
          </div>

         

          {/* Optional extra info */}
          {product.category && (
            <div className="mb-8">
              <span className="font-semibold text-gray-300">Category:</span>{" "}
              <span className="text-gray-400">{product.category}</span>
            </div>
          )}

           <button
            onClick={() => addToCartPro(product)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
