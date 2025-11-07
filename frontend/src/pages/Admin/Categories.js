import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../../config';

function Categories() {
    const [categories, setCategories] = useState([]);
    const fetchProducts = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/api/category/getAll`);
            setCategories(res.data.category);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    },[]);
  return (
      <div>
        
        <div className='flex justify-between'>
          <h4 className='text-2xl font-bold text-gray-800'>Categories</h4>
          <div>
            <NavLink className='bg-black p-2 rounded-md text-white text-sm' to='/admin/add-category'>Add Category +</NavLink>
          </div>
        </div>

        <div className='grid grid-cols-4 gap-2 pt-4'>
            {
                categories.map((item, index) => (
                    <div key={index} className='border-black border-[1px] rounded-md p-2'>
                        <img 
                            src={`${BASE_URL}/${item.image}`}
                            alt={item.name}
                              className="w-[100px] h-[100px] object-cover rounded-md mx-auto"
                            />
                        <p className='font-bold'>{item.name}</p>
                    </div>
                ))
            }
        </div>

      </div>
  )
}

export default Categories;
