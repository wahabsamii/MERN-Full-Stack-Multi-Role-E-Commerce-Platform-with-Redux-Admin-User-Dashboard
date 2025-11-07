import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import Drawer from './Drawer';
import Searchbar from './Searchbar';
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { likeProducts } = useSelector((state) => state.like)
  const [mob, setMob] = useState(false) 
  const navigate = useNavigate()
  
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // console.log(cartItems);
  const handleLogout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("user");
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link to='/'>
          <h3 className="text-3xl font-bold text-gray-800">Exclusive</h3>
        </Link >

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" onClick={() => setMob(false)} className="text-gray-800 hover:text-red-600 text-sm font-medium">
            Home
          </NavLink>

          <NavLink to="/about" onClick={() => setMob(false)} className="text-gray-800 hover:text-red-600 text-sm font-medium">
            About
          </NavLink>

          <NavLink to="/contact" onClick={() => setMob(false)} className="text-gray-800 hover:text-red-600 text-sm font-medium">
            Contact
          </NavLink>
          
          {user ? (<button 
              onClick={handleLogout}
              className="text-gray-800 hover:text-blue-600 text-sm font-medium"
            >
              Logout
            </button>) : null}


          {!isAuth && (
            <>
              <NavLink to="/signup" onClick={() => setMob(false)} className="text-gray-800 hover:text-red-600 text-sm font-medium">
                Sign Up
              </NavLink>
              <NavLink to="/login" onClick={() => setMob(false)} className="text-gray-800 hover:text-red-600 text-sm font-medium">
                Sign In
              </NavLink>
            </>
          )}
        </div>

        {/* Nav Links Mob*/}
        {
          mob && (
            <div className="flex flex-col absolute bg-white top-20 w-[90%] rounded-md gap-4 py-10 shadow-md uppercase md:hidden space-x-8 items-center">
          <NavLink to="/" className="text-gray-800 hover:text-red-600 text-sm font-medium">
            Home
          </NavLink>

          <NavLink to="/about" className="text-gray-800 hover:text-red-600 text-sm font-medium">
            About
          </NavLink>

          <NavLink to="/contact" className="text-gray-800 hover:text-red-600 text-sm font-medium">
            Contact
          </NavLink>
          
         {user ? (<button
              onClick={handleLogout}
              className="text-gray-800 hover:text-blue-600 text-sm font-medium"
            >
              Logout
            </button>) : null }


          {!user && (
            <>
              <NavLink to="/signup" className="text-gray-800 hover:text-red-600 text-sm font-medium">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="text-gray-800 hover:text-red-600 text-sm font-medium">
                Sign In
              </NavLink>
            </>
          )}
        </div>
          )
        }

        {/* Right Side Icons */}
        <div className="flex gap-3 items-center ml-8 relative">
          <div className='hidden md:block'><Searchbar /></div>
          
          {/* 🛒 Like Icon with Badge */}
          <div className="relative cursor-pointer" onClick={() => navigate('/wishlist')}>
            <CiHeart className="text-3xl text-gray-700 cursor-pointer hover:text-red-500 transition" />
            {likeProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {likeProducts.length}
              </span>
            )}
          </div>
          {/* 🛒 Cart Icon with Badge */}
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <IoBagHandleOutline className="text-3xl text-gray-700 hover:text-blue-500 transition" />
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}

            
          </div>
          <FaBars className='block md:hidden' size={25} onClick={() => setMob(!mob)}/>
          {/* User Dropdown */}
          {isAuth && (
            <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="relative group">
              <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-red-500 transition" />

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
                <ul className="flex flex-col text-sm text-gray-700">
                  <NavLink
                    to={user.role == "user" ? "/user/dashboard" : "/admin/dashboard"}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to={user.role == "user" ? "/user/profile" : "/admin/profile"}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Profile
                  </NavLink>
                  {
                    user.role == "admin" && (
                      <NavLink
                    to="/orders"
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Orders
                  </NavLink>
                    )
                  }
                  <button
                    onClick={handleLogout}
                    className="text-left w-full px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </Link>
          )}
        </div>
      </div>
      <Drawer open={open} setOpen={setOpen}/>
    </nav>
  );
};

export default Header;
