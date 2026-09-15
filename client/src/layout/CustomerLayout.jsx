import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "../components/customer/Sidebar";

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="!min-h-screen !w-full !overflow-x-hidden !bg-[radial-gradient(circle_at_top_right,#e9e2c9_0%,#f5f5f3_35%,#eeeeec_100%)]">
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="!fixed !left-0 !top-0 !z-50 !hidden !h-screen !w-72 lg:!block">
        <Sidebar />
      </aside>

      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}

      <header className="!sticky !top-0 !z-40 !flex !items-center !justify-between !border-b !border-[#292929] !bg-[#111111] !px-5 !py-4 lg:!hidden">
        <div>
          <p className="!text-[9px] !font-semibold !uppercase !tracking-[0.3em] !text-[#D4AF37]">
            Hostel Management
          </p>

          <h1 className="!mt-0.5 !text-xl !font-semibold !tracking-tight !text-white">
            Hostel<span className="!text-[#D4AF37]">Hub</span>
          </h1>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(true)}
          className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !border !border-[#333333] !bg-[#181818] !text-white"
        >
          <Menu size={21} />
        </motion.button>
      </header>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="!fixed !inset-0 !z-40 !bg-black/60 !backdrop-blur-sm lg:!hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!fixed !left-0 !top-0 !z-50 !h-screen !w-[280px] lg:!hidden"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          !min-h-screen
          !min-w-0
          !w-full
          !overflow-x-hidden
          lg:!ml-72
          lg:!w-[calc(100%-18rem)]
        "
      >
        <div
          className="
            !mx-auto
            !w-full
            !min-w-0
            !max-w-[1500px]
            !overflow-x-hidden
            
          "
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
