import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import CusomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";
import RoomsDetails from "../pages/RoomsDetails";

import Home from "../pages/Home";
import About from "../pages/About";
import Rooms from "../pages/Rooms";
import Gallery from "../pages/Gallary";
import Rules from "../pages/Rules";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Contact from "../pages/Contact";
import Error404 from "../pages/Error404";
import CustomerRoutes from "./CustomerRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/gallery" element={<Gallery />} />
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

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
