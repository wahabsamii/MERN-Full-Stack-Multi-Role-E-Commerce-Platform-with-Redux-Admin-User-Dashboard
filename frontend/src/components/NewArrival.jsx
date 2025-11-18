// components/NewArrival.jsx
import React from 'react';
import Img1 from '../assets/rn1.png'
import Img2 from '../assets/rn2.png'
import Img3 from '../assets/r3.png'
import Img4 from '../assets/r4.png'
const NewArrival = () => {

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrival</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Large Left Column */}
        <div
          className="space-y-6 text-white flex items- justify-end p-6 flex-col"
          style={{
            backgroundImage: `url(${Img1})`,
            height: '500px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h3 className='font-bold text-xl'>Play Station 5</h3>
          <p>Black and White version of the PS5<br/> coming out on sale.</p>
        </div>


        {/* Right Column - Two Small Cards */}
        <div className="space-y-6">
          <div
          className="space-y-6 text-white flex items- justify-end p-6 flex-col"
          style={{
            backgroundImage: `url(${Img2})`,
            height: '250px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h3 className='font-bold text-xl'>Play Station 5</h3>
          <p>Black and White version of the PS5<br/> coming out on sale.</p>
        </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'> 

                  <div className="space-y-6">
                    <div
                    className="space-y-6 text-white flex items- justify-end p-6 flex-col"
                    style={{
                      backgroundImage: `url(${Img3})`,
                      height: '225px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <h3 className='font-bold text-xl'>Play Station 5</h3>
                    <p>Black and White version of the PS5<br/> coming out on sale.</p>
                  </div>
                  </div>
                  <div className="space-y-6">
                    <div
                    className="space-y-6 text-white flex items- justify-end p-6 flex-col"
                    style={{
                      backgroundImage: `url(${Img4})`,
                      height: '225px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <h3 className='font-bold text-xl'>Play Station 5</h3>
                    <p>Black and White version of the PS5<br/> coming out on sale.</p>
                  </div>
                  </div>

            </div>

        </div>
      </div>
    </section>
  );
};

export default NewArrival;