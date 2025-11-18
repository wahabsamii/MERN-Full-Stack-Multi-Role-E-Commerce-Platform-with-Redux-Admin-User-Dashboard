import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UserSidebar from "../../components/UserSidebar";
import { BASE_URL } from "../../config";

function MyOrders() {
  const { user } = useSelector((state) => state.auth);
  const id = user?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    Completed: "text-green-400 bg-green-400/10",
    Processing: "text-yellow-400 bg-yellow-400/10",
    Cancelled: "text-red-400 bg-red-400/10",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders/${id}`);
        setOrders(res.data.orders || []); // assuming backend sends { orders: [...] }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrders();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-[#090d16] text-white">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="w-[75%] p-8">
        <h1 className="text-xl md:text-3xl font-semibold mb-8 text-gray-100">
          My Orders 🧾
        </h1>

      <div className="bg-gray-800/80 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
  <div className="overflow-x-auto w-full">
    <table className="min-w-full table-auto text-sm">
      <thead className="bg-gray-900/70 text-gray-300 uppercase tracking-wider text-left">
        <tr>
          <th className="px-6 py-4">Order ID</th>
          <th className="px-6 py-4">Date</th>
          <th className="px-6 py-4">Items</th>
          <th className="px-6 py-4">Total</th>
          <th className="px-6 py-4">Status</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6" className="text-center py-10 text-gray-400 italic">
              Loading your orders...
            </td>
          </tr>
        ) : orders.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-10 text-gray-400 italic">
              No orders found.
            </td>
          </tr>
        ) : (
          orders.map((order, i) => (
            <tr
              key={order._id || i}
              className={`border-t border-gray-700 hover:bg-gray-700/40 transition ${
                i % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/30"
              }`}
            >
              <td className="px-6 py-4 font-medium">{i + 1}</td>
              <td className="px-6 py-4 text-gray-400">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">{order.items?.length || 0}</td>
              <td className="px-6 py-4 text-indigo-400 font-semibold">
                ${order.total?.toFixed(2) || "0.00"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    statusColors[order.status] ||
                    "text-gray-300 bg-gray-700/50"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
}

export default MyOrders;
