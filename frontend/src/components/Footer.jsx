// components/Footer.jsx
import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaShoppingCart, FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Support Column */}
           {/* Exclusive Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Exclusive</h2>
          <h3 className="text-lg text-gray-300 mb-4">Subjective</h3>
          <p className="text-gray-400">Ask HRs off your first order.</p>
        </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>III Step: James D'Inria, SH IDE: Burghakshi, wahabsami.dev@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4" />
                <span>VBRDE-SRBB-2020</span>
              </div>
            </div>
          </div>


          {/* Quick Link Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Link</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <div>Privacy Policy</div>
              <div>James D'Inria</div>
              <div>FAQ</div>
              <div>Contact</div>
            </div>
          </div>

          {/* Download App Column */}
          <div className="">
            <h4 className="font-bold text-lg mb-4">Download App</h4>
            <div className="space-y-4">
              <div className="text-gray-400 text-sm mb-2">
                https://wahabsami.vercel.app/
              </div>
              <div className="flex space-x-3">
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <FaApple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <FaGooglePlay className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© Copyright 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;