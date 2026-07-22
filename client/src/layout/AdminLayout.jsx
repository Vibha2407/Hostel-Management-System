import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2C2C2C] text-white !p-6">
        <h1 className="text-2xl font-bold !mb-10">HMS Admin</h1>

        <nav className="space-y-4">
          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg ${
                  isActive ? "bg-[#D4AF37] text-white" : "hover:bg-gray-700"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/rooms"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg ${
                  isActive ? "bg-[#D4AF37] text-white" : "hover:bg-gray-700"
                }`
              }
            >
              Rooms
            </NavLink>

            <NavLink
              to="/admin/bookings"
              className="block px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              Bookings
            </NavLink>

            <NavLink
              to="/admin/customers"
              className="block px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              Customers
            </NavLink>

            <NavLink
              to="/admin/payments"
              className="block px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              Payments
            </NavLink>

            <NavLink
              to="/admin/facilities"
              className="block px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              Facilities
            </NavLink>

            <NavLink
              to="/admin/reports"
              className="block px-4 py-3 rounded-lg hover:bg-gray-700"
            >
              Reports
            </NavLink>
          </nav>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 !p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
