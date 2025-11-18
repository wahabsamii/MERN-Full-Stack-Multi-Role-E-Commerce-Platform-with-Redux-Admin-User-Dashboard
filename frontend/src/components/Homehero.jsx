import React, { useEffect, useState } from 'react';
import img1 from "../assets/hero.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';

const Hero = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/category/getAll`);
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="relative py-10 sm:py-16 md:py-20 bg-gradient-to-r from-red-600 via-red-500 to-pink-500">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Flex wrapper */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch gap-6 md:gap-10">
          
          {/* Categories Sidebar (shows below on mobile) */}
          <div className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Browse Categories
            </h3>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <Link
                  to={`/category/${category.name}`}
                  key={index}
                  className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-red-50 transition-all group"
                >
                  <span className="text-gray-700 group-hover:text-red-600 text-sm font-medium">
                    {category.name}
                  </span>
                  <span className="text-gray-400 group-hover:text-red-500 transition-all">
                    &gt;
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex-1 bg-black rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10 shadow-2xl">
            
            {/* Text Section */}
            <div className="text-center md:text-left text-white max-w-md space-y-4">
              <h1 className="text-lg sm:text-xl font-medium opacity-80">
                iPhone 14 Series
              </h1>
              <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                Up to 10% off Voucher
              </h2>
              <a href='#shownow' className="mt-4 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-transform duration-300 hover:-translate-y-1">
                Shop Now →
              </a>
            </div>

            {/* Image Section */}
            <div className="mt-6 md:mt-0 flex justify-center">
              <img
                src={img1}
                alt="Hero"
                className="w-60 sm:w-72 md:w-80 lg:w-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
