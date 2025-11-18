import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full bg-white text-gray-800 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 py-4 px-6">Home / Contact</div>

      <div className="grid md:grid-cols-2 gap-10 px-6 md:px-20 py-10">
        {/* Left Section */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
          {/* Call Us */}
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-red-500 text-white p-3 rounded-full">
              <FaPhoneAlt className="text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Call To Us</h4>
              <p className="text-gray-600 text-sm mb-2">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-gray-700 font-medium text-sm mb-2">Phone: +8801611112222</p>
            </div>
          </div>

          <hr className="border-gray-200 my-5" />

          {/* Write To Us */}
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white p-3 rounded-full">
              <FaEnvelope className="text-lg" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Write To Us</h4>
              <p className="text-gray-600 text-sm mb-2">
                Fill out our form and we will contact you<br/> within 24 hours.
              </p>
              <p className="text-gray-700 text-sm">
                Email: <span className="font-medium">customer@exclusive.com</span>
              </p>
              <p className="text-gray-700 text-sm">
                Email: <span className="font-medium">support@exclusive.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full border bg-gray-100 border-gray-100  px-4 py-2 text-sm focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full border bg-gray-100 border-gray-100  px-4 py-2 text-sm focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Your Phone *"
                className="w-full border bg-gray-100 border-gray-100  px-4 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full border bg-gray-100 border-gray-100  px-4 py-2 text-sm focus:outline-none focus:border-red-500"
            ></textarea>

            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition float-right"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
