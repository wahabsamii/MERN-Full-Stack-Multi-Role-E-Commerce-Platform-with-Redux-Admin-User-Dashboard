// components/Login.jsx
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/lgn-img.png";
import {toast, ToastContainer} from 'react-toastify'
import { BASE_URL } from "../config";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const adminLogin = () => {
    setFormData({
      email: "admin@gmail.com",
      password: "admin945"
    })
  }
  const userLogin = () => {
    setFormData({
      email: "user@gmail.com",
      password: "USER"
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
    if (res.data.success) {
      // alert(res.data.message);
      toast.success(res.data.message)
      dispatch(signInSuccess(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    }else{
      toast.error("Invalid Details");
    }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-red-100 to-red-300 justify-center items-center">
      <ToastContainer />
        <img
          src={img}
          alt="Login Illustration"
          className="w-4/5 max-w-md drop-shadow-lg rounded-2xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 sm:px-10 lg:px-20 py-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Log in to Exclusive</h2>
            <p className="mt-2 text-gray-600">Enter your details below</p>
          </div>
          <div className="mb-4">
            <button onClick={adminLogin} className="bg-red-500 py-2 p-4 rounded-full text-white cursor-pointer">Admin</button>
            <button onClick={userLogin} className="bg-red-500 py-2 p-4 rounded-full text-white ml-4 cursor-pointer">User</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="email"
                placeholder="Email or Phone Number"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-transform duration-200 hover:scale-[1.02]"
            >
              Log in
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              Don't have an account?<Link
                to="/signup"
                className="text-sm pl-2 font-medium text-red-600 hover:text-red-500"
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
