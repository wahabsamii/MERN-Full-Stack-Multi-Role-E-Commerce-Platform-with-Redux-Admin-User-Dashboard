// components/Features.jsx
import React from 'react';
import { FaTruck, FaHeadset, FaMoneyBillWave } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "FREE AND FAST DELIVERY",
      description: "Your delivery is at a close cost USD.",
      color: "text-white"
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 CUSTOMER SERVICE",
      description: "I know 24/7 customer service.",
      color: "text-white"
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8" />,
      title: "MONEY BACK GUARANTEE",
      description: "We were money within the day.",
      color: "text-white"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className='flex justify-center item-center'>
                <div className={`${feature.color} mb-4 bg-black p-4 rounded-full outline outline-2 outline-black outline-offset-4`}>
                    {feature.icon}
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;