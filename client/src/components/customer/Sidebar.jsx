import {
  LayoutDashboard,
  User,
  BookOpen,
  BedDouble,
  Receipt,
  Settings,
  LogOut,
  X,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Sidebar = ({ onClose }) => {
  const menu = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: <LayoutDashboard size={18} strokeWidth={1.9} />,
    },
    {
      name: "My Profile",
      path: "/customer/profile",
      icon: <User size={18} strokeWidth={1.9} />,
    },
    {
      name: "My Bookings",
      path: "/customer/my-bookings",
      icon: <BookOpen size={18} strokeWidth={1.9} />,
    },
    {
      name: "Browse Rooms",
      path: "/rooms",
      icon: <BedDouble size={18} strokeWidth={1.9} />,
    },
    {
      name: "Receipts",
      path: "/customer/receipt",
      icon: <Receipt size={18} strokeWidth={1.9} />,
    },
    {
      name: "My Complaints",
      path: "/customer/complaints",
      icon: <MessageSquare size={18} strokeWidth={1.9} />,
    },
    {
      name: "Settings",
      path: "/customer/settings",
      icon: <Settings size={18} strokeWidth={1.9} />,
    },
  ];

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      await logoutUser();

      setUser(null);

      toast.success("Logout Successfully");

      navigate("/");

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.log(error);

      toast.error("Logout Failed");

      setLoggingOut(false);
    }
  };

  return (
    <aside
      className="
        !relative
        !flex
        !h-full
        !min-h-screen
        !w-[280px]
        !flex-col
        !overflow-hidden
        !border-r
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !px-5
        !py-6
        !text-[var(--color-text-primary)]
        !shadow-[10px_0_40px_rgba(0,0,0,0.06)]
        dark:!shadow-[10px_0_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="!pointer-events-none !absolute !-right-28 !-top-28 !h-64 !w-64 !rounded-full !bg-[var(--color-primary)]/[0.07] !blur-[80px]" />

      <div className="!pointer-events-none !absolute !-bottom-32 !-left-32 !h-72 !w-72 !rounded-full !bg-[var(--color-primary)]/[0.035] !blur-[90px]" />

      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="!relative !z-10 !mb-10 !flex !items-start !justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="!flex !items-center !gap-2"
          >
            <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !bg-[var(--color-primary)] !text-[#17130A] !shadow-[0_8px_25px_rgba(212,175,55,0.18)]">
              <BedDouble size={19} strokeWidth={2.1} />
            </div>

            <div className="!leading-none">
              <h1 className="!text-xl !font-black !tracking-tight">
                Hostel<span className="!text-[var(--color-primary)]">Hub</span>
              </h1>

              <p className="!mt-1.5 !text-[8px] !font-semibold !uppercase !tracking-[0.22em] !text-[var(--color-text-muted)]">
                Stay Easy • Live Better
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Close */}

        {onClose && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Close menu"
            className="
              !flex
              !h-9
              !w-9
              !items-center
              !justify-center
              !rounded-xl
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface-secondary)]
              !text-[var(--color-text-secondary)]
              !transition-all
              hover:!border-[var(--color-primary)]/40
              hover:!bg-[var(--color-primary)]/[0.08]
              hover:!text-[var(--color-primary)]
            "
          >
            <X size={17} />
          </motion.button>
        )}
      </div>

      {/* =====================================================
          NAVIGATION LABEL
      ====================================================== */}

      <div className="!relative !z-10 !mb-3 !flex !items-center !justify-between !px-3">
        <span className="!text-[9px] !font-bold !uppercase !tracking-[0.25em] !text-[var(--color-text-muted)]">
          Navigation
        </span>

        <span className="!h-px !w-12 !bg-[var(--color-border)]" />
      </div>

      {/* =====================================================
          MENU
      ====================================================== */}

      <nav className="!relative !z-10 !space-y-1.5">
        {menu.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.045,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `
                !group
                !relative
                !flex
                !items-center
                !gap-3
                !overflow-hidden
                !rounded-xl
                !px-3.5
                !py-3
                !text-sm
                !transition-all
                !duration-300
                ${
                  isActive
                    ? "!bg-[var(--color-primary)] !text-[#17130A] !shadow-[0_8px_25px_rgba(212,175,55,0.16)]"
                    : "!text-[var(--color-text-secondary)] hover:!translate-x-0.5 hover:!bg-[var(--color-surface-secondary)] hover:!text-[var(--color-text-primary)]"
                }
              `
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active glow */}

                  {isActive && (
                    <motion.div
                      layoutId="customerSidebarActive"
                      className="!absolute !inset-0 !rounded-xl !bg-[var(--color-primary)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Left active indicator */}

                  {isActive && (
                    <motion.span
                      layoutId="customerSidebarIndicator"
                      className="!absolute !left-0 !top-1/2 !h-6 !w-[3px] !-translate-y-1/2 !rounded-r-full !bg-[#4A1D2F]"
                    />
                  )}

                  {/* Icon */}

                  <span
                    className={`
                      !relative
                      !z-10
                      !flex
                      !h-8
                      !w-8
                      !shrink-0
                      !items-center
                      !justify-center
                      !rounded-lg
                      !transition-all
                      !duration-300
                      ${
                        isActive
                          ? "!bg-white/20"
                          : "group-hover:!bg-[var(--color-primary)]/[0.08] group-hover:!text-[var(--color-primary)]"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {/* Name */}

                  <span className="!relative !z-10 !font-semibold">
                    {item.name}
                  </span>

                  {/* Active indicator */}

                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="!relative !z-10 !ml-auto !h-1.5 !w-1.5 !rounded-full !bg-[#4A1D2F]"
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* =====================================================
          SPACER
      ====================================================== */}

      <div className="!flex-1" />

      {/* =====================================================
          MEMBER CARD
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="
          !relative
          !mb-5
          !overflow-hidden
          !rounded-2xl
          !border
          !border-[var(--color-border)]
          !bg-[var(--color-surface-secondary)]
          !p-4
        "
      >
        {/* Gold glow */}

        <div className="!pointer-events-none !absolute !-right-8 !-top-8 !h-20 !w-20 !rounded-full !bg-[var(--color-primary)]/[0.12] !blur-[25px]" />

        <div className="!relative !z-10 !mb-2.5 !flex !items-center !gap-2">
          <span className="!relative !flex !h-2 !w-2">
            <span className="!absolute !inline-flex !h-full !w-full !animate-ping !rounded-full !bg-[var(--color-primary)] !opacity-50" />

            <span className="!relative !inline-flex !h-2 !w-2 !rounded-full !bg-[var(--color-primary)]" />
          </span>

          <span className="!text-[9px] !font-bold !uppercase !tracking-[0.2em] !text-[var(--color-primary)]">
            Member Area
          </span>
        </div>

        <p className="!relative !z-10 !text-[11px] !leading-relaxed !text-[var(--color-text-muted)]">
          Manage your bookings, profile and hostel stays from one place.
        </p>

        <div className="!relative !z-10 !mt-3 !flex !items-center !gap-1.5 !text-[9px] !font-semibold !text-[var(--color-text-secondary)]">
          <Sparkles size={11} className="!text-[var(--color-primary)]" />
          <span>Everything in one place</span>
        </div>
      </motion.div>

      {/* =====================================================
          LOGOUT
      ====================================================== */}

      <motion.button
        whileHover={{
          x: 3,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onClick={handleLogout}
        disabled={loggingOut}
        className="
          !group
          !relative
          !flex
          !w-full
          !items-center
          !gap-3
          !overflow-hidden
          !rounded-xl
          !border
          !border-transparent
          !px-3.5
          !py-3
          !text-left
          !text-sm
          !font-semibold
          !text-[var(--color-danger)]
          !transition-all
          !duration-300
          hover:!border-[var(--color-danger)]/15
          hover:!bg-[var(--color-danger)]/[0.06]
          disabled:!cursor-not-allowed
          disabled:!opacity-50
        "
      >
        <span className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg !transition-colors group-hover:!bg-[var(--color-danger)]/10">
          <LogOut
            size={18}
            className="!transition-transform !duration-300 group-hover:!translate-x-0.5"
          />
        </span>

        <span>{loggingOut ? "Logging out..." : "Logout"}</span>

        {!loggingOut && (
          <span className="!ml-auto !text-[10px] !text-[var(--color-text-muted)] !opacity-0 !transition-opacity group-hover:!opacity-100">
            →
          </span>
        )}
      </motion.button>
    </aside>
  );
};

export default Sidebar;
