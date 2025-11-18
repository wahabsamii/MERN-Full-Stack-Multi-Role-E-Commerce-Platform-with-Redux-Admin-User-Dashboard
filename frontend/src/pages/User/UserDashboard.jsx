import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaTasks, FaChartLine, FaUserCog, FaDollarSign } from "react-icons/fa";
import UserSidebar from "../../components/UserSidebar";
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

function UserDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders/${user._id}`);
        setOrders(res.data.orders || []);
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
  const completedOrders = orders.filter((o) => o.status === "approved").length;
  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "Processing"
  ).length;
  const totalSpend = orders.reduce((acc, order) => acc + (order.total || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-[#090d16] min-h-screen text-white">
      <UserSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-xl md:text-3xl font-semibold mb-8 text-gray-100">
          Welcome Back, {user?.name?.split(" ")[0]} 👋
        </h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Orders"
            value={totalOrders}
            icon={<FaTasks />}
          />
          <DashboardCard
            title="Completed Orders"
            value={completedOrders}
            icon={<FaChartLine />}
          />
          <DashboardCard
            title="Pending Orders"
            value={pendingOrders}
            icon={<FaUserCog />}
          />
          <DashboardCard
            title="Total Spend"
            value={`$${totalSpend.toFixed(2)}`}
            icon={<FaDollarSign />}
          />
        </div>

        {/* Analytics Placeholder */}
        {/* <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-8 text-gray-400 text-center">
          <p className="text-gray-300 text-lg">📊 Analytics Overview</p>
          <p className="text-sm text-gray-500 mt-2">
            Your chart or graph will appear here.
          </p>
        </div> */}
      </main>
    </div>
  );
}

export default UserDashboard;
