import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import { signOutSuccess } from "../redux/user/userSlice";

function UserSidebar() {
  const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  const navigation = useNavigate()
  const handleLogout = async() => {
    await dispatch(signOutSuccess());
    navigation('/');
  }
  return (
    <aside className="h-screen w-30 md:w-64 bg-[#0b0f19]/90 backdrop-blur-xl text-gray-200 flex flex-col justify-between shadow-2xl">
      {/* Logo / Title */}
      <div>
        <div className="p-6 text-center text-md md:text-2xl font-semibold tracking-wider border-b border-gray-700">
          <span className="text-indigo-400">User</span> Panel
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 px-4">
          <SidebarLink icon={<AiOutlineDashboard />} text="Dashboard" to="/user/dashboard" />
          <SidebarLink icon={<BsClipboardData />} text="My Orders" to="/user/orders" />
          <SidebarLink icon={<CiUser />} text="Profile" to="/user/profile" />
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-400">Member</p>
          </div>
        </div>
        <div
          onClick={() => handleLogout()}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <MdLogout size={18} />
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-1 md:gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
          isActive
            ? "bg-indigo-600/30 text-indigo-300"
            : "hover:bg-gray-700/50 text-gray-300"
        }`
      }
    >
      <div className="text-sm md:text-lg">{icon}</div>
      <span className="text-[10px] md:text-sm font-medium">{text}</span>
    </NavLink>
  );
}

export default UserSidebar;
