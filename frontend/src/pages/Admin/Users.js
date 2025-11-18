import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { FaRegUser } from "react-icons/fa";
import { BASE_URL } from '../../config';
function Users() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async() => {
        try {
            const res = await axios.get(`${BASE_URL}/api/auth/all`);
            setUsers(res.data.users);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);
  return (
      <div>
        
        <div className='flex justify-between'>
          <h4 className='text-2xl font-bold text-gray-800'>All Users</h4>
          <div>
            <NavLink className='bg-black p-2 rounded-md text-white text-sm' to='/admin/add-product'>Add User +</NavLink>
          </div>
        </div>

       <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
  <div className="grid grid-cols-4 bg-gray-200 font-semibold text-gray-700 border-b border-gray-300 py-3 px-4">
    <p>User</p>
    <p>Name</p>
    <p>Email</p>
    <p className="text-center">Actions</p>
  </div>

  {users.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-4 items-center border-b border-gray-300 py-3 px-4 hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-2">
        <FaRegUser className="text-gray-600" />
      </div>
      <p className="font-medium text-gray-800">{item.name}</p>
      <p className="text-gray-600">{item.email}</p>
      <div className="flex justify-center gap-2">
        <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
          Edit
        </button>
        <button className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
</div>
  )
}

export default Users
