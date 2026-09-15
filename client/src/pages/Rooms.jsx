import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllRooms, filterRooms } from "../services/roomService";
import RoomGrid from "../components/room/RoomGrid";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // ==============================
  // FILTER STATE
  // ==============================
  const [filters, setFilters] = useState({
    roomType: "All",
    sharingType: "All",
    wingGender: "All",
    status: "All",
  });

  // ==============================
  // FETCH ALL ROOMS
  // ==============================
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data.rooms || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  // ==============================
  // HANDLE FILTER CHANGE
  // ==============================
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==============================
  // APPLY FILTERS
  // ==============================
  const handleApplyFilters = async () => {
    try {
      setIsFiltering(true);

      // Remove "All" values before sending to backend
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "All"),
      );

      // If no filter is selected
      if (Object.keys(activeFilters).length === 0) {
        const data = await getAllRooms();
        setRooms(data.rooms || []);
        return;
      }

      const data = await filterRooms(activeFilters);

      setRooms(data.rooms || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFiltering(false);
    }
  };

  // ==============================
  // CLEAR FILTERS
  // ==============================
  const handleClearFilters = async () => {
    const defaultFilters = {
      roomType: "All",
      sharingType: "All",
      wingGender: "All",
      status: "All",
    };

    setFilters(defaultFilters);

    try {
      setIsFiltering(true);

      const data = await getAllRooms();

      setRooms(data.rooms || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFiltering(false);
    }
  };

  return (
    <main className="!relative !min-h-screen !overflow-hidden !bg-[var(--color-background)] !py-12 !text-[var(--color-text-primary)] transition-colors !duration-300 sm:!py-16 lg:!py-20">
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-right-40 !top-20 !h-[450px] !w-[450px] !rounded-full !bg-[var(--color-primary)]/10 !blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-left-40 !top-[45%] !h-[400px] !w-[400px] !rounded-full !bg-[var(--color-primary)]/10 !blur-[120px]"
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!flex !flex-col !gap-8 lg:!flex-row lg:!items-end lg:!justify-between"
        >
          {/* LEFT CONTENT */}

          <div className="!max-w-3xl">
            <div className="!mb-4 !flex !items-center !gap-3">
              <span className="!h-px !w-8 !bg-[var(--color-primary)]" />

              <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
                HostelHub
              </span>

              <span className="!h-px !w-8 !bg-[var(--color-primary)]" />
            </div>

            <h1 className="!text-4xl !font-semibold !leading-[1.08] !tracking-[-0.035em] !text-[var(--color-text-primary)] sm:!text-5xl lg:!text-6xl">
              Find a room that
              <span className="!block !text-[var(--color-primary-hover)]">
                feels like home.
              </span>
            </h1>

            <p className="!mt-5 !max-w-2xl !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base">
              Discover thoughtfully designed rooms with modern facilities,
              comfortable living spaces and a secure environment.
            </p>
          </div>

          {/* ROOM COUNT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.25,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -3,
            }}
            className="!flex !w-fit !items-center !gap-4 !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !px-5 !py-4 !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[var(--color-primary)]/30"
          >
            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-[var(--color-primary)]/10 !text-[var(--color-primary)]">
              <Search size={19} strokeWidth={2} />
            </div>

            <div>
              <p className="!text-[10px] !font-medium !uppercase !tracking-[0.2em] !text-[var(--color-text-muted)]">
                Available options
              </p>

              <p className="!mt-1 !text-lg !font-semibold !text-[var(--color-text-primary)]">
                {rooms.length} Rooms
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* DIVIDER */}

        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mt-10 !h-px !origin-left !bg-gradient-to-r !from-[var(--color-primary)]/50 !via-[var(--color-border)] !to-transparent"
        />

        {/* =====================================================
            PREMIUM FILTER SECTION
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.55,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !relative
            !mt-8
            !overflow-hidden
            !rounded-[1.75rem]
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]
            !shadow-[var(--shadow-card)]
          "
        >
          {/* Ambient glow */}

          <motion.div
            animate={{
              x: [0, 25, 0],
              y: [0, -10, 0],
              opacity: [0.08, 0.14, 0.08],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              !pointer-events-none
              !absolute
              !-right-20
              !-top-24
              !h-56
              !w-56
              !rounded-full
              !bg-[var(--color-primary)]
              !blur-[90px]
            "
          />

          <motion.div
            animate={{
              x: [0, -20, 0],
              opacity: [0.04, 0.09, 0.04],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              !pointer-events-none
              !absolute
              !-bottom-28
              !left-20
              !h-52
              !w-52
              !rounded-full
              !bg-[var(--color-primary)]
              !blur-[100px]
            "
          />

          {/* Top gold line */}

          <div
            className="
              !absolute
              !left-0
              !right-0
              !top-0
              !h-px
              !bg-gradient-to-r
              !from-transparent
              !via-[var(--color-primary)]
              !to-transparent
              !opacity-60
            "
          />

          <div className="!relative !z-10 !p-5 sm:!p-6 lg:!p-7">
            {/* Header */}

            <div className="!flex !flex-col !gap-5 sm:!flex-row sm:!items-center sm:!justify-between">
              <div className="!flex !items-center !gap-3">
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    !flex
                    !h-11
                    !w-11
                    !items-center
                    !justify-center
                    !rounded-xl
                    !border
                    !border-[var(--color-primary)]/20
                    !bg-[var(--color-primary)]/10
                    !text-[var(--color-primary)]
                  "
                >
                  <SlidersHorizontal size={19} />
                </motion.div>

                <div>
                  <div className="!flex !items-center !gap-2">
                    <h2
                      className="
                        !text-sm
                        !font-semibold
                        !tracking-tight
                        !text-[var(--color-text-primary)]
                      "
                    >
                      Find Your Perfect Room
                    </h2>

                    <Sparkles
                      size={13}
                      className="!text-[var(--color-primary)]"
                    />
                  </div>

                  <p
                    className="
                      !mt-1
                      !text-xs
                      !text-[var(--color-text-muted)]
                    "
                  >
                    Refine your stay with your preferences
                  </p>
                </div>
              </div>

              {/* Clear */}

              <motion.button
                type="button"
                onClick={handleClearFilters}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  !flex
                  !w-fit
                  !items-center
                  !gap-2
                  !rounded-xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-background)]
                  !px-4
                  !py-2.5
                  !text-xs
                  !font-medium
                  !text-[var(--color-text-secondary)]
                  !transition-all
                  !duration-300
                  hover:!border-[var(--color-primary)]/30
                  hover:!text-[var(--color-primary)]
                "
              >
                <RotateCcw size={14} />
                Clear Filters
              </motion.button>
            </div>

            {/* Divider */}

            <div
              className="
                !my-6
                !h-px
                !bg-gradient-to-r
                !from-[var(--color-border)]
                !via-[var(--color-primary)]/20
                !to-transparent
              "
            />

            {/* Filter controls */}

            <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2 lg:!grid-cols-4">
              {/* ROOM TYPE */}

              <FilterSelect
                label="Room Type"
                value={filters.roomType}
                options={["All", "AC", "Non-AC"]}
                onChange={(value) => handleFilterChange("roomType", value)}
              />

              {/* SHARING TYPE */}

              <FilterSelect
                label="Sharing Type"
                value={filters.sharingType}
                options={["All", "2 Sharing", "3 Sharing", "4 Sharing"]}
                onChange={(value) => handleFilterChange("sharingType", value)}
              />

              {/* WING */}

              <FilterSelect
                label="Wing"
                value={filters.wingGender}
                options={["All", "Male", "Female"]}
                onChange={(value) => handleFilterChange("wingGender", value)}
              />

              {/* STATUS */}

              <FilterSelect
                label="Status"
                value={filters.status}
                options={["All", "Available", "Full", "Maintenance"]}
                onChange={(value) => handleFilterChange("status", value)}
              />
            </div>

            {/* Apply button */}

            <div className="!mt-6 !flex !justify-end">
              <motion.button
                type="button"
                onClick={handleApplyFilters}
                disabled={isFiltering}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  !relative
                  !flex
                  !w-full
                  !items-center
                  !justify-center
                  !gap-2
                  !overflow-hidden
                  !rounded-xl
                  !bg-gradient-to-r
                  !from-[#C9A227]
                  !via-[#D4AF37]
                  !to-[#E7C95C]
                  !px-6
                  !py-3
                  !text-sm
                  !font-semibold
                  !text-[#17130A]
                  !shadow-[0_8px_25px_rgba(212,175,55,0.18)]
                  !transition-all
                  !duration-300
                  hover:!shadow-[0_12px_35px_rgba(212,175,55,0.30)]
                  disabled:!cursor-not-allowed
                  disabled:!opacity-70
                  sm:!w-auto
                "
              >
                {/* Shine */}

                <motion.span
                  animate={{
                    x: ["-120%", "180%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="
                    !pointer-events-none
                    !absolute
                    !inset-y-0
                    !w-10
                    !rotate-12
                    !bg-white/40
                    !blur-sm
                  "
                />

                {isFiltering ? (
                  <>
                    <span
                      className="
                        !h-4
                        !w-4
                        !animate-spin
                        !rounded-full
                        !border-2
                        !border-[#17130A]/30
                        !border-t-[#17130A]
                      "
                    />
                    Applying...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Apply Filters
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          ROOMS
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="!relative !mt-10"
      >
        <RoomGrid rooms={rooms} />
      </motion.div>

      {/* =====================================================
          BOTTOM DECORATION
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
        }}
        className="!pointer-events-none !relative !mx-auto !mt-16 !flex !items-center !justify-center !gap-3"
      >
        <span className="!h-px !w-12 !bg-[var(--color-border)]" />

        <Sparkles
          size={14}
          strokeWidth={1.8}
          className="!text-[var(--color-primary)]"
        />

        <span className="!text-[10px] !font-medium !uppercase !tracking-[0.3em] !text-[var(--color-text-muted)]">
          Stay comfortably
        </span>

        <span className="!h-px !w-12 !bg-[var(--color-border)]" />
      </motion.div>
    </main>
  );
};

/* =========================================================
   FILTER SELECT
========================================================= */

const FilterSelect = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className="!mb-2 !block !text-[10px] !font-semibold !uppercase !tracking-[0.18em] !text-[var(--color-text-muted)]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          !w-full
          !rounded-xl
          !border
          !border-[var(--color-border)]
          !bg-[var(--color-background)]
          !px-4
          !py-3
          !text-sm
          !font-medium
          !text-[var(--color-text-primary)]
          !outline-none
          !transition-all
          !duration-300
          focus:!border-[var(--color-primary)]
          focus:!ring-2
          focus:!ring-[var(--color-primary)]/10
        "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Rooms;
