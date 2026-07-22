import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashBoard";
import Rooms from "../pages/admin/Rooms";
import AddRoom from "../pages/admin/AddRooms";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="add-room" element={<AddRoom />} />
      </Route>
    </Routes>
  );
};

// export default AdminRoutes;
export default AdminRoutes;
