import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 hover:border-indigo-500/50 transition transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <div className="text-indigo-400 text-lg">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-gray-100">{value}</p>
    </div>
  );
}

function AdminDashboard() {

  const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/orders/`);
          const response = await axios.get(`${BASE_URL}/api/auth/all`);
          const resp = await axios.get(`${BASE_URL}/api/product/all`);
          setOrders(res.data.orders || []);
          setUsers(response.data.users || []);
          setProducts(resp.data.products || []);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (user?._id) fetchOrders();
    }, [user]);
  
    // 🧮 Calculate stats
    const totalOrders = orders.length;
    // const completedOrders = orders.filter((o) => o.status === "approved").length;
    // const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "Processing").length;
    const totalSpend = orders.reduce((acc, order) => acc + (order.total || 0), 0);


  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <main className="flex-1 p- overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-8 text-black">
          Welcome, Admin 👋
        </h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Orders"
            value= {totalOrders}
            icon={<FaShoppingCart />}
          />
          <DashboardCard
            title="Total Users"
            value={users.length}
            icon={<FaUsers />}
          />
          <DashboardCard
            title="Total Products"
            value={products.length}
            icon={<FaBoxOpen />}
          />
          <DashboardCard
            title="Revenue"
            value={`$ ${totalSpend}`}
            icon={<FaDollarSign />}
          />
        </div>

       
      </main>
    </div>
  );
}

export default AdminDashboard;
