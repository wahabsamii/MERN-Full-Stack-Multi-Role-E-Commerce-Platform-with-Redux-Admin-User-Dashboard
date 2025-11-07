// components/BrowseByCategory.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const BrowseByCategory = () => {

  const [categories, setCategories] = useState([]);

  const fetchCategories = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/api/category/getAll`);
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
       <p className="mb-4 text-red-500 border-l-8 border-red-500 pl-4">
  Categories
</p>
      <div className=" mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Browse By Category
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`border-gray-200
              border-2 p-6 text-center cursor-pointer 
              transition-all duration-300 hover:scale-105 hover:shadow-lg
              group
            `}
          >
            {/* Category Icon */}
            <div className={`color-black mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
              <img src={`${BASE_URL}/${category.image}`} alt="" width={50}/>
            </div>
            
            {/* Category Name */}
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategory;