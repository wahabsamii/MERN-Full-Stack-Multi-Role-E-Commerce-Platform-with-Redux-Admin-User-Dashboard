// components/MusicExperience.jsx
import React, { useEffect, useState } from 'react';
import m1 from "../assets/m1.png";
const MusicExperience = () => {
  const targetDate="2029-04-01T00:00:00";
      const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    
  
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="bg-black p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="text-white text-center lg:text-left mb-8 lg:mb-0 lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Enhance Your
              <br />
              Music Experience
            </h2>
            
            {/* Timer Section */}
            <div className="flex justify-center lg:justify-start space-x-3 mb-8">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white text-gray-900 rounded-lg py-3  mb-2 w-[60px] shadow-lg">
                    <span className="text-2xl font-bold">{item.value}</span>
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Buy Now Button */}
            <button className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
              Buy Now
            </button>
          </div>

          {/* Right Image - Speaker */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Speaker Body */}
              <img src={m1}/>
              
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicExperience;