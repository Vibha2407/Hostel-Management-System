import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashBoard";
import Rooms from "../pages/admin/Rooms";
import AddRoom from "../pages/admin/AddRooms";
// import ProtectedRoute from "../components/common/ProtectedRoute";
import EditRoom from "../pages/admin/EditRooms";
import ManageBookings from "../pages/admin/ManageBooking";
import ManageCustomers from "../pages/admin/ManageCustomer";
import ManagePayments from "../pages/admin/ManagePayments";
import ManageFacilities from "../pages/admin/ManageFacilities";
import ManageReports from "../pages/admin/ManageReports";
import AdminProfile from "../pages/admin/AdminProfile";
import ManageComplaints from "../pages/admin/ManageComplaints";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        // path="/"
        element={
          // <ProtectedRoute role="admin">
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="add-room" element={<AddRoom />} />
        <Route path="rooms/edit/:id" element={<EditRoom />} />

        <Route path="bookings" element={<ManageBookings />} />

        <Route path="customers" element={<ManageCustomers />} />

        <Route path="complaints" element={<ManageComplaints />} />

        <Route path="payments" element={<ManagePayments />} />

        <Route path="facilities" element={<ManageFacilities />} />

        <Route path="reports" element={<ManageReports />} />

        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

// export default AdminRoutes;
export default AdminRoutes;
