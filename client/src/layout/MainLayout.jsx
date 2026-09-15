import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </>
  );
};

export default MainLayout;
