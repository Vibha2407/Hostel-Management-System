import { useMemo, useState, useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Users,
  CreditCard,
  Sparkles,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  CircleDot,
  UserRound,
  LogOut,
  MessageSquare,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Rooms",
    path: "/admin/rooms",
    icon: BedDouble,
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    label: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
  // {
  //   label: "Facilities",
  //   path: "/admin/facilities",
  //   icon: Sparkles,
  // },
  {
    label: "Complaints",
    path: "/admin/complaints",
    icon: MessageSquare,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  /* =========================================================
     CURRENT PAGE
     Handles nested room routes as well
  ========================================================= */
  const currentPage = useMemo(() => {
    const pathname = location.pathname.replace(/\/+$/, "") || "/admin";

    // Exact match first
    const exactMatch = navigation.find((item) => item.path === pathname);

    if (exactMatch) {
      return exactMatch;
    }

    // Match nested routes.
    // Longest path first prevents a parent route
    // from matching before a more specific route.
    const nestedMatch = [...navigation]
      .sort((a, b) => b.path.length - a.path.length)
      .find((item) => {
        return pathname.startsWith(`${item.path}/`);
      });

    return nestedMatch || navigation[0];
  }, [location.pathname, navigation]);

  const CurrentIcon = currentPage?.icon;

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
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
    <div className="!relative !min-h-screen !w-full !overflow-x-hidden !bg-[#FAF8F4] !text-[#2B1720] dark:!bg-[#080808] dark:!text-white">
      {/* =========================================================
          MOBILE TOP BAR
      ========================================================= */}
      <header className="!fixed !inset-x-0 !top-0 !z-[60] !flex !h-16 !items-center !justify-between !border-b !border-[#E8DED2]/80 !bg-white/90 !px-4 !backdrop-blur-2xl dark:!border-[#292929] dark:!bg-[#0D0D0D]/90 lg:!hidden">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin navigation"
          className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[#E8DED2] !bg-[#FAF8F4] !text-[#4A1D2F] !shadow-sm !transition-all !duration-200 hover:!scale-105 hover:!border-[#D4AF37]/50 hover:!text-[#8B6914] dark:!border-[#292929] dark:!bg-[#171717] dark:!text-[#D4AF37]"
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>

        {/* Mobile brand */}
        <div className="!flex !items-center !gap-2.5">
          <div className="!relative !flex !h-9 !w-9 !items-center !justify-center !overflow-hidden !rounded-xl !bg-gradient-to-br !from-[#D4AF37] !via-[#C69A2B] !to-[#8E6717] !text-[#2B1720] !shadow-lg !shadow-[#D4AF37]/20">
            <div className="!absolute !-right-3 !-top-3 !h-7 !w-7 !rounded-full !bg-white/25 !blur-md" />

            <ShieldCheck size={18} strokeWidth={2.3} />
          </div>

          <div className="!text-center">
            <p className="!text-sm !font-black !tracking-tight">HMS Admin</p>

            <p className="!hidden !text-[8px] !font-bold !uppercase !tracking-[0.18em] !text-[#D4AF37] xs:!block">
              Control Center
            </p>
          </div>
        </div>

        {/* Right spacer */}
        <div className="!h-10 !w-10" />
      </header>

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileSidebar}
            className="!fixed !inset-0 !z-[70] !bg-black/60 !backdrop-blur-[3px] lg:!hidden"
          />
        )}
      </AnimatePresence>

      {/* =========================================================
          SIDEBAR
      ========================================================= */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 82 : 270,
          x: mobileOpen ? 0 : undefined,
        }}
        transition={{
          width: {
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1],
          },
          x: {
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        className={`
          !fixed !inset-y-0 !left-0 !z-[80]
          !flex !flex-col
          !overflow-hidden
          !border-r
          !border-[#E8DED2]
          !bg-white
          !shadow-[12px_0_45px_rgba(43,23,32,0.08)]
          dark:!border-[#292929]
          dark:!bg-[#0D0D0D]
          dark:!shadow-[12px_0_55px_rgba(0,0,0,0.4)]
          lg:!translate-x-0
          ${
            mobileOpen
              ? "!translate-x-0"
              : "!-translate-x-full lg:!translate-x-0"
          }
        `}
        style={{
          maxWidth: "100vw",
        }}
      >
        {/* =====================================================
            AMBIENT LIGHT
        ===================================================== */}
        <div className="!pointer-events-none !absolute !-left-28 !-top-28 !h-72 !w-72 !rounded-full !bg-[#D4AF37]/10 !blur-[110px]" />

        <div className="!pointer-events-none !absolute !-bottom-32 !-right-32 !h-72 !w-72 !rounded-full !bg-[#4A1D2F]/10 !blur-[110px] dark:!bg-[#D4AF37]/5" />

        {/* =====================================================
            LOGO HEADER
        ===================================================== */}
        <div className="!relative !flex !h-20 !shrink-0 !items-center !border-b !border-[#E8DED2] !px-4 dark:!border-[#292929]">
          <div
            className={`!flex !w-full !items-center !gap-3 ${
              collapsed ? "!justify-center" : ""
            }`}
          >
            {/* Logo */}
            <motion.div
              whileHover={{
                scale: 1.04,
                rotate: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="!relative !flex !h-11 !w-11 !shrink-0 !items-center !justify-center !overflow-hidden !rounded-2xl !bg-gradient-to-br !from-[#D4AF37] !via-[#C69A2B] !to-[#8E6717] !text-[#2B1720] !shadow-xl !shadow-[#D4AF37]/20"
            >
              <div className="!absolute !-right-4 !-top-4 !h-10 !w-10 !rounded-full !bg-white/25 !blur-lg" />

              <ShieldCheck size={22} strokeWidth={2.4} />
            </motion.div>

            {/* Brand text */}
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="!min-w-0"
                >
                  <h1 className="!truncate !text-base !font-black !tracking-tight">
                    HMS Admin
                  </h1>

                  <p className="!mt-0.5 !text-[9px] !font-bold !uppercase !tracking-[0.18em] !text-[#D4AF37]">
                    Control Center
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close admin navigation"
            className="!ml-auto !flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-lg !text-[#74656A] !transition-all !duration-200 hover:!bg-[#FAF8F4] hover:!text-[#4A1D2F] dark:!text-[#888888] dark:hover:!bg-[#171717] dark:hover:!text-white lg:!hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}
        <div className="!relative !min-h-0 !flex-1 !overflow-y-auto !overflow-x-hidden !px-3 !py-6 [scrollbar-width:thin]">
          {!collapsed && (
            <div className="!mb-4 !flex !items-center !justify-between !px-3">
              <p className="!text-[9px] !font-black !uppercase !tracking-[0.2em] !text-[#74656A] dark:!text-[#666666]">
                Management
              </p>

              <span className="!h-1.5 !w-1.5 !rounded-full !bg-[#D4AF37]/60" />
            </div>
          )}

          <nav className="!space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={closeMobileSidebar}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) => {
                    let active = isActive;

                    if (item.path === "/admin/rooms") {
                      active =
                        location.pathname === "/admin/rooms" ||
                        location.pathname === "/admin/add-room" ||
                        location.pathname.startsWith("/admin/rooms/edit/");
                    }

                    return `
                      !group
                      !relative
                      !flex
                      !h-12
                      !items-center
                      !gap-3
                      !rounded-xl
                      !px-3
                      !text-sm
                      !font-bold
                      !transition-all
                      !duration-200
                      ${collapsed ? "!justify-center" : ""}
                      ${
                        active
                          ? "!bg-gradient-to-r !from-[#D4AF37]/15 !via-[#D4AF37]/7 !to-transparent !text-[#8B6914] !shadow-sm dark:!text-[#D4AF37]"
                          : "!text-[#74656A] hover:!bg-[#FAF8F4] hover:!text-[#2B1720] dark:!text-[#888888] dark:hover:!bg-[#171717] dark:hover:!text-white"
                      }
                    `;
                  }}
                >
                  {({ isActive }) => {
                    let active = isActive;

                    if (item.path === "/admin/rooms") {
                      active =
                        location.pathname === "/admin/rooms" ||
                        location.pathname === "/admin/add-room" ||
                        location.pathname.startsWith("/admin/rooms/edit/");
                    }

                    return (
                      <>
                        {/* Active indicator */}
                        {active && (
                          <motion.div
                            layoutId="activeAdminNav"
                            transition={{
                              type: "spring",
                              stiffness: 450,
                              damping: 32,
                            }}
                            className="!absolute !left-0 !top-1/2 !h-7 !w-1 !-translate-y-1/2 !rounded-r-full !bg-[#D4AF37] !shadow-[0_0_12px_rgba(212,175,55,0.45)]"
                          />
                        )}

                        {/* Icon */}
                        <motion.span
                          whileHover={{
                            scale: 1.05,
                          }}
                          className={`
                            !flex
                            !h-9
                            !w-9
                            !shrink-0
                            !items-center
                            !justify-center
                            !rounded-lg
                            !transition-all
                            !duration-200
                            ${
                              active
                                ? "!bg-[#D4AF37]/15 !text-[#D4AF37] !shadow-sm"
                                : "group-hover:!bg-black/[0.035] dark:group-hover:!bg-white/[0.045]"
                            }
                          `}
                        >
                          <Icon size={18} strokeWidth={2.1} />
                        </motion.span>

                        {/* Label */}
                        {!collapsed && (
                          <span className="!min-w-0 !flex-1 !truncate">
                            {item.label}
                          </span>
                        )}

                        {/* Active arrow */}
                        {!collapsed && active && (
                          <ChevronRight
                            size={15}
                            strokeWidth={2.4}
                            className="!shrink-0 !text-[#D4AF37]"
                          />
                        )}
                      </>
                    );
                  }}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* =====================================================
            SIDEBAR FOOTER
        ===================================================== */}
        <div className="!relative !shrink-0 !border-t !border-[#E8DED2] !p-3 dark:!border-[#292929]">
          {/* Workspace card */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="!mb-3 !overflow-hidden !rounded-xl !border !border-[#D4AF37]/15 !bg-gradient-to-br !from-[#D4AF37]/10 !via-[#D4AF37]/5 !to-transparent !p-3"
              >
                <div className="!flex !items-center !gap-2">
                  <span className="!flex !h-7 !w-7 !items-center !justify-center !rounded-lg !bg-[#D4AF37]/10">
                    <Sparkles
                      size={14}
                      strokeWidth={2.2}
                      className="!text-[#D4AF37]"
                    />
                  </span>

                  <span className="!text-[10px] !font-black !uppercase !tracking-wider !text-[#D4AF37]">
                    Admin Workspace
                  </span>
                </div>

                <p className="!mt-2 !text-[10px] !leading-relaxed !text-[#74656A] dark:!text-[#777777]">
                  Manage your hostel operations from one place.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Admin Profile */}
          <NavLink
            to="/admin/profile"
            onClick={closeMobileSidebar}
            title={collapsed ? "Admin Profile" : undefined}
            className={({ isActive }) => `
              !mb-2
              !flex
              !h-10
              !w-full
              !items-center
              !gap-3
              !rounded-xl
              !px-3
              !text-xs
              !font-bold
              !transition-all
              !duration-200
              ${collapsed ? "!justify-center" : ""}
              ${
                isActive
                  ? "!bg-[#D4AF37]/10 !text-[#D4AF37]"
                  : "!text-[#74656A] hover:!bg-[#FAF8F4] hover:!text-[#2B1720] dark:!text-[#888888] dark:hover:!bg-[#171717] dark:hover:!text-white"
              }
            `}
          >
            <UserRound size={17} strokeWidth={2.2} />

            {!collapsed && <span>Admin Profile</span>}
          </NavLink>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`
              !mb-3
              !flex
              !h-10
              !w-full
              !items-center
              !gap-3
              !rounded-xl
              !px-3
              !text-xs
              !font-bold
              !text-rose-500
              !transition-all
              !duration-200
              hover:!bg-rose-500/10
              ${collapsed ? "!justify-center" : ""}
            `}
          >
            <LogOut size={17} strokeWidth={2.2} />

            {!collapsed && <span>Logout</span>}
          </button>

          {/* Collapse button */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`
              !hidden
              lg:!flex
              !h-10
              !w-full
              !items-center
              !gap-3
              !rounded-xl
              !border
              !border-[#E8DED2]
              !bg-[#FAF8F4]
              !px-3
              !text-xs
              !font-bold
              !text-[#74656A]
              !transition-all
              !duration-200
              hover:!border-[#D4AF37]/40
              hover:!bg-[#D4AF37]/5
              hover:!text-[#D4AF37]
              dark:!border-[#292929]
              dark:!bg-[#171717]
              dark:!text-[#888888]
              ${collapsed ? "!justify-center" : ""}
            `}
          >
            {collapsed ? (
              <PanelLeftOpen size={17} strokeWidth={2.2} />
            ) : (
              <>
                <PanelLeftClose size={17} strokeWidth={2.2} />

                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      {/* =========================================================
          MAIN APPLICATION AREA
      ========================================================= */}
      <div
        className={`
          !min-h-screen
          !min-w-0
          !w-full
          !transition-[padding-left]
          !duration-300
          !ease-[cubic-bezier(0.4,0,0.2,1)]
          lg:!pl-[270px]
          ${collapsed ? "lg:!pl-[82px]" : ""}
        `}
      >
        {/* =====================================================
            DESKTOP HEADER
        ===================================================== */}
        <header className="!sticky !top-0 !z-30 !hidden !h-20 !items-center !justify-between !border-b !border-[#E8DED2]/80 !bg-[#FAF8F4]/85 !px-5 !backdrop-blur-2xl dark:!border-[#292929] dark:!bg-[#080808]/85 lg:!flex xl:!px-8">
          {/* Page information */}
          <div className="!flex !min-w-0 !items-center !gap-3">
            <motion.div
              key={currentPage.path}
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !border !border-[#D4AF37]/10 !bg-[#D4AF37]/10 !text-[#D4AF37]"
            >
              <CurrentIcon size={18} strokeWidth={2.2} />
            </motion.div>

            <div className="!min-w-0">
              <div className="!flex !items-center !gap-2 !text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#666666]">
                <span>Admin</span>

                <ChevronRight size={11} />

                <span className="!truncate !text-[#D4AF37]">
                  {currentPage.label}
                </span>
              </div>

              <h2 className="!mt-0.5 !truncate !text-sm !font-black">
                {currentPage.label}
              </h2>
            </div>
          </div>

          {/* Right side */}
          <div className="!flex !items-center !gap-3">
            {/* System status */}
            <div className="!hidden !items-center !gap-2 !rounded-xl !border !border-[#E8DED2] !bg-white !px-3 !py-2 dark:!border-[#292929] dark:!bg-[#111111] xl:!flex">
              <span className="!relative !flex !h-2 !w-2">
                <span className="!absolute !inline-flex !h-full !w-full !animate-ping !rounded-full !bg-emerald-400 !opacity-75" />

                <CircleDot
                  size={8}
                  fill="currentColor"
                  className="!relative !text-emerald-500"
                />
              </span>

              <span className="!text-[10px] !font-bold !text-[#74656A] dark:!text-[#888888]">
                System Online
              </span>
            </div>

            {/* Admin profile */}
            <div className="!flex !items-center !gap-3 !rounded-xl !border !border-[#E8DED2] !bg-white !px-2.5 !py-2 !shadow-sm dark:!border-[#292929] dark:!bg-[#111111]">
              <div className="!flex !h-8 !w-8 !shrink-0 !items-center !justify-center !rounded-lg !bg-gradient-to-br !from-[#4A1D2F] !to-[#24101A] !text-[#D4AF37]">
                <ShieldCheck size={16} strokeWidth={2.2} />
              </div>

              <div className="!hidden !min-w-0 sm:!block">
                <p className="!truncate !text-xs !font-black">Administrator</p>

                <p className="!truncate !text-[9px] !font-bold !text-[#74656A] dark:!text-[#666666]">
                  Hostel Management
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}
        <main className="!min-h-[calc(100vh-4rem)] !min-w-0 !w-full !overflow-x-hidden !pt-16 lg:!min-h-[calc(100vh-5rem)] lg:!pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
