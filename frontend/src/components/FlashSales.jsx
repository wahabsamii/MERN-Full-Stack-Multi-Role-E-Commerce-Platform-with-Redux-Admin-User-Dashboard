import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BASE_URL } from "../config";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const targetDate="2026-01-01T00:00:00";
    const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  console.log("FLASH", products)
  

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance <= 0) {
        clearInterval(countdown);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);


  // Fetch products where flashSale === true
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/product/all`);
      const flashSaleProducts = res.data.products.filter(
        (item) => item.flashSale === true
      );
      setProducts(flashSaleProducts);
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
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with Timer */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <h2 className="text-2xl font-bold text-gray-900">Flash Sales</h2>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Days</div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.days}</div>
            </div>
            <div className="text-gray-400 text-xl">:</div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Hours</div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.hours}</div>
            </div>
            <div className="text-gray-400 text-xl">:</div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Minutes</div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.minutes}</div>
            </div>
            <div className="text-gray-400 text-xl">:</div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Seconds</div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.seconds}</div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Products Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={4}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 22 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-red-500">
                  <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={`${BASE_URL}/${product.image}`}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold text-lg">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {renderStars(product.rating || 4)}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full py-8">
              No Flash Sale products available.
            </p>
          )}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute top-1/2 -left-4 z-10 -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div className="swiper-button-next-custom absolute top-1/2 -right-4 z-10 -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <div className="swiper-pagination-custom flex justify-center space-x-2 mt-8"></div>
      </div>
    </section>
  );
};

export default FlashSales;
