import { FaUsers, FaShoppingCart, FaDollarSign, FaStore, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img1 from '../assets/about.png';
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import Features from "../components/Features";
const About = () => {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 py-4 px-6">Home / About</div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center px-0 md:pl-20 py-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh.
            Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10 offices across Asia and
            3 million customers across the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment
            in categories ranging from consumer.
          </p>
        </div>
        <div>
          <img
            src={img1}
            alt="Our Story"
            className=" w-full object-cover"
          />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-6 md:px-20 py-10">
        <div className="text-center cursor-pointer border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition hover:bg-red-600 hover:text-white group">
          <FaStore
            className="mx-auto w-[70px] h-[70px] p-4 text-white bg-black rounded-full transition outline-black outline-2 outline-offset-4 
            group-hover:bg-white group-hover:text-black group-hover:outline group-hover:outline-2 group-hover:outline-white group-hover:outline-offset-4 mb-3"
          />
          <p className="text-xl font-bold">10.5k</p>
          <p className="text-gray-500 text-sm group-hover:text-white">Sellers active on our site</p>
        </div>

        <div className="text-center cursor-pointer border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition hover:bg-red-600 hover:text-white group">
          <FaShoppingCart
            className="mx-auto w-[70px] h-[70px] p-4 text-white bg-black rounded-full transition outline-black outline-2 outline-offset-4 
            group-hover:bg-white group-hover:text-black group-hover:outline group-hover:outline-2 group-hover:outline-white group-hover:outline-offset-4 mb-3"
          />
          <p className="text-xl font-bold">33k</p>
          <p className="text-gray-500 text-sm group-hover:text-white">Monthly Product Sale</p>
        </div>

        <div className="text-center cursor-pointer border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition hover:bg-red-600 hover:text-white group">
          <FaUsers
            className="mx-auto w-[70px] h-[70px] p-4 text-white bg-black rounded-full transition outline-black outline-2 outline-offset-4 
            group-hover:bg-white group-hover:text-black group-hover:outline group-hover:outline-2 group-hover:outline-white group-hover:outline-offset-4 mb-3"
          />
          <p className="text-xl font-bold">45.5k</p>
          <p className="text-gray-500 text-sm group-hover:text-white">Customer active on our site</p>
        </div>

        <div className="text-center cursor-pointer border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition hover:bg-red-600 hover:text-white group">
          <FaDollarSign
            className="mx-auto w-[70px] h-[70px] p-4 text-white bg-black rounded-full transition outline-black outline-2 outline-offset-4 
            group-hover:bg-white group-hover:text-black group-hover:outline group-hover:outline-2 group-hover:outline-white group-hover:outline-offset-4 mb-3"
          />
          <p className="text-xl font-bold">25k</p>
          <p className="text-gray-500 text-sm group-hover:text-white">Annual gross sale on our site</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-6 md:px-20 pb-20 mt-5 md:mt-16">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 2500 }}
        >
          {[
            {
              name: "Tom Cruise",
              role: "Founder & Chairman",
              img: t1,
            },
            {
              name: "Emma Watson",
              role: "Managing Director",
              img: t2,
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              img: t3,
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              img: t1,
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              img: t3,
            },
          ].map((member, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col border border-gray-200 rounded-lg bg-white hover:shadow-md transition">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-[100%] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{member.role}</p>
                <div className="flex gap-3 text-gray-600">
                  <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
                </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
        <Features />
    </div>
  );
};

export default About;
