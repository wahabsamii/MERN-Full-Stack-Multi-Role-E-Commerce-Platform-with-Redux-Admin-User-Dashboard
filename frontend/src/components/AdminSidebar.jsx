import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineAppstore,
} from "react-icons/ai";
import { FaUsers, FaTags } from "react-icons/fa";
import { MdCategory, MdLogout } from "react-icons/md";
import { BsClipboardData } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const handleLogout = async() => {
    await dispatch(signOutSuccess());
    navigation('/');
  }
  return (
    <aside className="h-['100%'] md:h-screen w-40 md:w-64 bg-[#0b0f19]/90 backdrop-blur-xl text-gray-200 flex flex-col justify-between shadow-2xl">
      {/* Top Section */}
      <div>
        <div className="p-6 text-center text-2xl font-semibold tracking-wider border-b border-gray-700">
          <span className="text-indigo-400">Admin</span> Panel
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2 px-4">
          <SidebarLink icon={<AiOutlineDashboard />} text="Dashboard" to="/admin/dashboard" />
          <SidebarLink icon={<BsClipboardData />} text="All Orders" to="/admin/orders" />
          <SidebarLink icon={<AiOutlineAppstore />} text="All Products" to="/admin/products" />
          <SidebarLink icon={<FaUsers />} text="Users" to="/admin/users" />
          <SidebarLink icon={<MdCategory />} text="Categories" to="/admin/categories" />
          <SidebarLink icon={<FaTags />} text="Coupons" to="/admin/coupons" />
          <SidebarLink icon={<AiOutlineShoppingCart />} text="Reports" to="/admin/reports" />
        </nav>
      </div>

      {/* Footer / Logout Section */}
      <div className="border-t border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-400">Super User</p>
          </div>
        </div>
        <button
          onClick={() => handleLogout()}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <MdLogout size={18} />
        </button>
      </div>
    </aside>
  );
}

/* Sidebar Link Component */
function SidebarLink({ icon, text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
          isActive
            ? "bg-indigo-600/30 text-indigo-300"
            : "hover:bg-gray-700/50 text-gray-300"
        }`
      }
    >
      <div className="text-lg">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </NavLink>
  );
}

export default AdminSidebar;
