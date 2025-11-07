// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminProtected from "../../components/AdminProtected";

const AdminLayout = () => {
  return (
    <div className="flex h-screen  overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
    
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
