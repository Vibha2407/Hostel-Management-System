import React from "react";
import { Routes, Route } from "react-router-dom";
import CutomerLayout from "../layout/CustomerLayout";
import Dashboard from "../pages/customer/Dashboard";
import Profile from "../pages/customer/Profle";
import MyBookings from "../pages/customer/MyBookings";
// import { Routes } from "react-router-dom";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route element={<CutomerLayout />}>
        <Route index element={<Dashboard />} />
        <Route element={<Profile />} />
        <Route element={<MyBookings />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
