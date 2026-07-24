import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import CusomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";
import RoomsDetails from "../pages/RoomsDetails";
import ManageBookings from "../pages/admin/ManageBooking";
import ManageCustomers from "../pages/admin/ManageCustomer";
import ManagePayments from "../pages/admin/ManagePayments";
import ManageFacilities from "../pages/admin/ManageFacilities";
import ManageReports from "../pages/admin/ManageReports";

import Home from "../pages/Home";
import About from "../pages/About";
import Rooms from "../pages/Rooms";
import Gallary from "../pages/Gallary";
import Rules from "../pages/Rules";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Contact from "../pages/Contact";
import Error404 from "../pages/Error404";
import CustomerRoutes from "./CustomerRoutes";
import Booking from "../pages/Booking";

// import EditRoom from "../pages/admin/EditRooms";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/gallery" element={<Gallary />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Route>
        {/* Customer Routes */}
        <Route path="/customer/*" element={<CustomerRoutes />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/rooms/:id" element={<RoomsDetails />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/customers" element={<ManageCustomers />} />
        <Route path="/admin/payments" element={<ManagePayments />} />
        <Route path="/admin/facilities" element={<ManageFacilities />} />
        <Route path="/admin/reports" element={<ManageReports />} />

        <Route path="/booking/:id" element={<Booking />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
