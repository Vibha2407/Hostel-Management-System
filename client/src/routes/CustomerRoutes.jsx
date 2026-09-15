import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layout/CustomerLayout";
import Dashboard from "../pages/customer/Dashboard";
import Profile from "../pages/customer/Profle";
import MyBookings from "../pages/customer/MyBookings";
import Receipt from "../pages/customer/Receipt";
import Settings from "../pages/customer/Settings";
import Complaints from "../pages/customer/Complaint";
import Error404 from "../pages/NotFound";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />

        <Route path="my-bookings" element={<MyBookings />} />

        <Route path="receipt" element={<Receipt />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      {/* Unknown customer route */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default CustomerRoutes;
