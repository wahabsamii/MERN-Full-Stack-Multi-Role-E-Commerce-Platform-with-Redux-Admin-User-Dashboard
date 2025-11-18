import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import UserSidebar from "../../components/UserSidebar";
import { UpdateUser } from "../../redux/user/userSlice";
import { BASE_URL } from "../../config";

function MyProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    id: user?._id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/auth/update`, updatedUser, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(UpdateUser(res.data.user));

      toast.success(res.data.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#090d16] text-white">
      <UserSidebar />

      <div className=" md:w-[75%] p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-100">My Profile 👤</h1>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-medium"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className={`${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } transition text-white px-4 py-2 rounded-lg font-medium`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-lg space-y-5">
          {/* Name */}
          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg font-medium">{user?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg font-medium">{user?.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg font-medium">{user?.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-400 text-sm">Address</p>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
                className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg font-medium">{user?.address}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
