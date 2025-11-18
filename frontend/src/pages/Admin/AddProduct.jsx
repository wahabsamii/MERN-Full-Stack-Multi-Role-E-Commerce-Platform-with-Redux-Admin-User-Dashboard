import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify"
import { BASE_URL } from '../../config';
function AddProducts() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [file, setfile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setfile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const fetchCategories = async() => {
      try {
        const res = await axios.get(`${BASE_URL}/api/category/getAll`);
        setCategories(res.data.category)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchCategories()
    }, [])

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("reviews", reviews);
    formData.append("image", file);

    
    const response = await axios.post(`${BASE_URL}/api/product/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setfile(null);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Error uploading product");
  }
};


  return (
    <div className='flex'>
     
      <div>
        
        <div className='flex justify-between'>
          <h4 className='text-2xl font-bold text-gray-800'>Add Products</h4>
          <div>
            <NavLink className='bg-black p-2 rounded-md text-white text-sm' to='/'>Go Back -</NavLink>
          </div>
        </div>


        <div className='mt-10 w-[70%]'>
            <form  onSubmit={handleSubmit} className='bg-white p-4 rounded-md'>
                <input placeholder='name' onChange={(e) => setName(e.target.value)} className='p-2 border-black mb-2 border-2 rounded-sm w-full'/>
                <input placeholder='price' onChange={(e) => setPrice(e.target.value)} type='number' className='p-2 border-black mb-2 border-2 rounded-sm w-full'/>
                <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border-black mb-2 border-2 rounded-sm w-full"
            >
              <option value="">-- Select Category --</option>
              {categories.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
                <input placeholder='quantity' onChange={(e) => setQuantity(e.target.value)} className='p-2 border-black mb-2 border-2 rounded-sm w-full'/>
                <input placeholder='reviews' onChange={(e) => setReviews(e.target.value)} className='p-2 border-black mb-2 border-2 rounded-sm w-full'/>
                <input type="file" onChange={handleFileChange}/>
                {preview && (
                    <img src={preview} alt="" className='w-[150px] h-[150px] object-cover'/>
                )}
                <button type='submit' className='bg-black text-white w-full p-2 rounded mt-4 cursor-pointer'>Submit</button>
            </form>
        </div>

        

      </div>
    </div>
  )
}

export default AddProducts
