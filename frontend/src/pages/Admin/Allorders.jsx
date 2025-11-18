import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import { BASE_URL } from "../../config";
function Allorders() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders/`);
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

 const handleOrderStatus = async (id, newValue) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/orders/update/${id}`, { status: newValue });
    if (res.data.success) {
      toast.success("Order Status updated!");
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newValue } : order
        )
      );
    } else {
      toast.error("Failed to update status");
    }
  } catch (error) {
    toast.error("Error updating order");
    console.error(error);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-2xl font-bold text-gray-800">All Orders</h4>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {orders.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm font-semibold text-gray-700">#</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Customer</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Total</th>
                  <th className="p-3 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">{order.name}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm text-gray-700">${order.total}</td>
                    <td className="p-3 text-sm">
                      <select value={order.status} onChange={(e) => handleOrderStatus(order._id, e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="cancelled">Cancelled</option>
                 
                      </select>
                      {/* <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status} 
                      </span> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No orders found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allorders;
