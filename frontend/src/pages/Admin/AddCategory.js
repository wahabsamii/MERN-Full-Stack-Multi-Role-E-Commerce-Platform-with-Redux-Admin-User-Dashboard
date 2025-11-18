import React, { useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

function AddCategory() {
    const [name, setName] = useState('');
    const [file, setfile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setfile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };


   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file)

    
    const response = await axios.post(`${BASE_URL}/api/category/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setfile(null);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Error uploading product");
  }
};


  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='p-6 w-[75%] bg-gray-100'>
        
        <div className='flex justify-between'>
          <h4 className='text-2xl font-bold text-gray-800'>Add Category</h4>
          <div>
            <NavLink className='bg-black p-2 rounded-md text-white text-sm' to='/'>Go Back -</NavLink>
          </div>
        </div>


        <div className='mt-10 w-[70%]'>
            <form  onSubmit={handleSubmit} className='bg-white p-4 rounded-md'>
                <input placeholder='name' onChange={(e) => setName(e.target.value)} className='p-2 border-black mb-2 border-2 rounded-sm w-full'/>
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

export default AddCategory
