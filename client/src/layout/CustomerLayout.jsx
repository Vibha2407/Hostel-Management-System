import Sidebar from "../components/customer/Sidebar";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <main className="flex-1 !p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
