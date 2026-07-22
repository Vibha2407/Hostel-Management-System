import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div>
      <h1>Customer Layout</h1>

      <Outlet />
    </div>
  );
};

export default CustomerLayout;
