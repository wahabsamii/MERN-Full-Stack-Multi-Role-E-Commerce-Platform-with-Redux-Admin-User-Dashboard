import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import Modal from '../../components/Modal';
import { BASE_URL } from '../../config';

function Products() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [prId, setprId] = useState(null);

    const fetchProducts = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/api/product/all`);
            setProducts(res.data.products);
        } catch (error) {
            alert(error);
        }
    };

    const handleDelete = (id) => {
      setShowModal(true);
      setprId(id);
    }

    const toggleFlashSale = async (id, newValue) => {
  try {
    await axios.put(`${BASE_URL}/api/product/${id}`, { flashSale: newValue });
    // Update UI instantly without refetching all products
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, flashSale: newValue } : p
      )
    );
  } catch (error) {
    console.error("Error updating flash sale:", error);
    alert("Failed to update flash sale status");
  }
};


const toggleBestSale = async (id, newValue) => {
  try {
    await axios.put(`${BASE_URL}/api/product/best/${id}`, {bestSalling: newValue});
    setProducts((prev) => prev.map((p) => 
      p._id === id ? {...p, bestSalling: newValue}: p
    ));
  } catch (error) {
    console.error(error);
    alert('Failed to update best salling stauts')
  }
}


    useEffect(() => {
        fetchProducts();
    },[]);
    
  return (
      <div >
        <Modal isOpen={showModal} pr={prId} title={'Delete Product'} children={'Do you want to delete product'} onClose={() => setShowModal(false)}/>
        <div className='flex justify-between '>
          <h4 className='text-2xl font-bold text-gray-800'>Products</h4>
          <div>
            <NavLink className='bg-black p-2 rounded-md text-white text-sm' to='/admin/add-product'>Add Product +</NavLink>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2 pt-4'>
            {
                products.map((item, index) => (
                    <div key={index} className='border-black border-[1px] bg-white rounded-md p-2'>
                        <img
                            src={`http://localhost:5000/${item.image}`}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-md"
                            />
                        <div className='mt-2'>
                          <p className='font-bold'>{item.name}</p>
                          <p>$ {item.price}</p>

                          {/* Flash Sale Toggle */}
                              <div className="mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={item.flashSale} // show true/false state
                                    onChange={() => toggleFlashSale(item._id, !item.flashSale)} // toggle it
                                    className="accent-indigo-500 w-4 h-4"
                                  />
                                  <span className="text-gray-800 font-medium">Flash Sale</span>
                                </label>
                              </div>

                              {/* Best Salling  */}
                              <div className='mt-2'>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type='checkbox' checked={item.bestSalling} onChange={() => toggleBestSale(item._id, !item.bestSalling)} 
                                    className='accent-indigo-500 w-4 h-4'
                                    ></input>
                                    <span className="text-gray-800 font-medium">Best Salling</span>
                                  </label>
                              </div>


                          <div className='mt-3'>
                            <button className='bg-green-400 text-white p-[8px] rounded-sm px-4 text-sm cursor-pointer'>Edit</button>
                            <button onClick={() => handleDelete(item._id)} on className='ml-2 bg-red-400 text-white p-[8px] rounded-sm px-4 text-sm cursor-pointer'>Delete</button>
                          </div>

                        </div>
                    </div>
                ))
            }
        </div>

      </div>
  )
}

export default Products
