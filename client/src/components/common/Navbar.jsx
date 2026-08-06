import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Gallery", path: "/gallery" },
    { name: "Rules", path: "/rules" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logout Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Logout Failed");
    }
  };

  return (
    <nav className="sticky !top-0 !z-50 bg-white shadow-md">
      <div className="!max-w-7xl !mx-auto !h-20 flex items-center justify-between !px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#D4AF37]">
          HostelHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex !gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#D4AF37] font-semibold"
                  : "text-gray-700 hover:text-[#D4AF37] transition"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        {/* <div className="hidden md:flex !gap-3">
          <Link
            to="/login"
            className="!px-5 !py-2 border rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="!px-5 !py-2 rounded-lg bg-[#D4AF37] text-white hover:bg-yellow-600 transition"
          >
            Register
          </Link>
        </div> */}

        <div className="hidden md:flex items-center !gap-4">
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center !gap-3"
              >
                <div className="!w-10 !h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center font-bold shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>

                <div className="text-left">
                  <p className="font-semibold">{user.fullName}</p>

                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 !mt-3 !w-56 bg-white rounded-xl shadow-xl border overflow-hidden animate-in fade-in zoom-in duration-200">
                  <Link
                    to={
                      user.role === "admin"
                        ? "/admin/profile"
                        : "/customer/profile"
                    }
                    className="block !px-5 !py-3 hover:bg-gray-100"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to={user.role === "admin" ? "/admin" : "/customer"}
                    className="block !px-5 !py-3 hover:bg-gray-100"
                  >
                    📋 Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="!w-full text-left !px-5 !py-3 text-red-600 hover:bg-red-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="!px-5 !py-2 border rounded-lg">
                Login
              </Link>

              <Link
                to="/register"
                className="!px-5 !py-2 rounded-lg bg-[#D4AF37] text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col !py-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="!px-6 !py-3 hover:bg-gray-100"
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin/profile"
                      : "/customer/profile"
                  }
                  onClick={() => setOpen(false)}
                  className="!px-6 !py-3 hover:bg-gray-100"
                >
                  👤 My Profile
                </Link>

                <Link
                  to={user.role === "admin" ? "/admin" : "/customer"}
                  onClick={() => setOpen(false)}
                  className="!px-6 !py-3 hover:bg-gray-100"
                >
                  📋 Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left !px-6 !py-3 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="!px-6 !py-3"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="!px-6 !py-3"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
