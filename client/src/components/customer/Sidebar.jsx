import {
  LayoutDashboard,
  User,
  BookOpen,
  BedDouble,
  Receipt,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Profile",
      path: "/customer/profile",
      icon: <User size={20} />,
    },
    {
      name: "My Bookings",
      path: "/customer/my-bookings",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Browse Rooms",
      path: "/rooms",
      icon: <BedDouble size={20} />,
    },
    {
      name: "Receipts",
      path: "/customer/receipt",
      icon: <Receipt size={20} />,
    },
    {
      name: "Settings",
      path: "/customer/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="!w-72 bg-white shadow-lg !min-h-screen !p-6">
      <h1 className="text-3xl font-bold text-[#D4AF37] !mb-10">HostelHub</h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center !gap-3 !px-4 !py-3 rounded-xl transition
              ${isActive ? "bg-[#D4AF37] text-white" : "hover:bg-gray-100"}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      <button className="flex items-center !gap-3 !mt-12 text-red-500">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
