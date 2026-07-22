import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Gallery", path: "/gallery" },
    { name: "Rules", path: "/rules" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl !mx-auto h-20 flex items-center justify-between !px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#D4AF37]">HostelHub</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#D4AF37] font-semibold"
                  : "text-gray-700 hover:text-[#D4AF37]"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="!px-5 !py-2 border rounded-lg">Login</button>

          <button className="!px-5 !py-2 rounded-lg bg-[#D4AF37] text-white">
            Register
          </button>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden flex flex-col px-6 pb-5 gap-4 bg-white">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          <button className="border-none rounded-lg">Login</button>

          <button className="bg-[#D4AF37] text-white py-3 rounded-lg">
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
