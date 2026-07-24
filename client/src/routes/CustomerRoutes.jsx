import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layout/CustomerLayout";

import Dashboard from "../pages/customer/Dashboard";
import Profile from "../pages/customer/Profle";
import MyBookings from "../pages/customer/MyBookings";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />

        <Route path="bookings" element={<MyBookings />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
