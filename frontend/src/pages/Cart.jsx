import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => {
    return acc + parseFloat(item.price.replace('$', '')) * (item.quantity || 1);
  }, 0);


  const handleCheckout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/checkout/create-checkout-session`, {
        cartItems,
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Checkout error', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Breadcrumb */}
      <section className="px-10 text-gray-600 text-sm mb-6">
        Home / <span className="text-gray-900 font-medium">Cart</span>
      </section>

      {/* Cart Table */}
      <section className="px-10">
        <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      $
                      {(
                        parseFloat(item.price.replace('$', '')) *
                        (item.quantity || 1)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500 italic"
                  >
                    Your cart is empty 🛒
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="flex justify-between mt-8">
            <div>
                <form action="">
                    <input type="text" placeholder='Coupen code' className='border-[1px] border-black p-2 outline-none rounded-sm'/>
                    <button className='bg-red-500 p-2 text-white rounded-sm ml-3 px-6'>Apply Coupen</button>
                </form>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm">
              <div className="flex justify-between text-gray-700 mb-4">
                <span className="font-medium text-lg">Total</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
