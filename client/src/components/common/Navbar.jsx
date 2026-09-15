import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  UserRound,
  LayoutDashboard,
  ChevronDown,
  BedDouble,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
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
      // console.log(error);

      toast.error("Logout Failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 text-[var(--color-text-primary)] shadow-lg backdrop-blur-xl transition-colors duration-300">
      <div className="!mx-auto flex h-20 w-full !max-w-7xl items-center justify-between !px-5 sm:px-8 lg:px-10 xl:px-12">
        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link to="/" className="group flex items-center !gap-2.5">
          {/* Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-[#16130A] shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-transform duration-300 group-hover:scale-105">
            <BedDouble size={22} strokeWidth={2.2} />
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <div className="text-lg font-semibold tracking-tight sm:text-xl">
              Hostel<span className="text-[var(--color-primary)]">Hub</span>
            </div>

            <div className="!mt-1 hidden text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:block">
              Stay Easy • Live Better
            </div>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <div className="hidden items-center !gap-7 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative !py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[var(--color-primary)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* =====================================================
            DESKTOP AUTH + THEME TOGGLE
        ====================================================== */}
        <div className="flex items-center !gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              resolvedTheme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            title={
              resolvedTheme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-2.5 text-[var(--color-text-primary)] transition-colors duration-300 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-surface-secondary)]"
          >
            {resolvedTheme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="hidden items-center !gap-3 md:flex">
            {user ? (
              <div ref={dropdownRef} className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center !gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-secondary)] !py-1.5 pl-1.5 !pr-3 transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-surface-secondary)]"
                >
                  <div className="flex !h-9 !w-9 items-center justify-center rounded-full bg-[var(--color-primary)] font-semibold text-[#17130A]">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden text-left xl:block">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {user.fullName}
                    </p>

                    <p className="text-[11px] capitalize text-[var(--color-text-muted)]">
                      {user.role}
                    </p>
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[var(--color-text-secondary)] transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 !mt-3 !w-64 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 !p-2 shadow-2xl backdrop-blur-xl"
                    >
                      {/* Profile */}
                      <Link
                        to={
                          user.role === "admin"
                            ? "/admin/profile"
                            : "/customer/profile"
                        }
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center !gap-3 rounded-xl !px-4 !py-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                      >
                        <UserRound
                          size={17}
                          className="text-[var(--color-primary)]"
                        />

                        <span>My Profile</span>
                      </Link>

                      {/* Dashboard */}
                      <Link
                        to={user.role === "admin" ? "/admin" : "/customer"}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center !gap-3 rounded-xl !px-4 !py-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                      >
                        <LayoutDashboard
                          size={17}
                          className="text-[var(--color-primary)]"
                        />

                        <span>Dashboard</span>
                      </Link>

                      <div className="my-1 h-px bg-[var(--color-border)]" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center !gap-3 rounded-xl !px-4 !py-3 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <LogOut size={17} />

                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="rounded-lg !px-4 !py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  className="rounded-lg bg-[var(--color-primary)] !px-5 !py-2.5 text-sm font-semibold text-[#17130A] shadow-[0_8px_25px_rgba(212,175,55,0.15)] transition-all duration-300 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-2.5 text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-surface-secondary)] md:hidden"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] md:hidden transition-colors duration-300"
          >
            <div className="!px-5  sm:px-8">
              {/* Navigation */}
              <div className="space-y-1">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl !px-4 !py-3.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-hover)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* User Section */}
              {user ? (
                <div className="!mt-4 border-t border-[var(--color-border)] !pt-4">
                  {/* User */}
                  <div className="!mb-2 flex items-center gap-3 rounded-xl bg-[var(--color-surface-secondary)] !px-4 !py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] font-semibold text-[#17130A]">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {user.fullName}
                      </p>

                      <p className="text-xs capitalize text-[var(--color-text-muted)]">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {/* Profile */}
                  <Link
                    to={
                      user.role === "admin"
                        ? "/admin/profile"
                        : "/customer/profile"
                    }
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  {/* Dashboard */}
                  <Link
                    to={user.role === "admin" ? "/admin" : "/customer"}
                    onClick={() => setOpen(false)}
                    className="flex items-center !gap-3 rounded-xl !px-4 !py-3.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl !px-4 !py-3.5 text-left text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              ) : (
                /* Guest */
                <div className="!mt-4 grid grid-cols-2 !gap-3 border-t border-[var(--color-border)] !pt-4">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-xl border border-[var(--color-border)] !py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-[var(--color-primary)] !py-3 text-sm font-semibold text-[#17130A] transition-colors hover:bg-[var(--color-primary-hover)]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
