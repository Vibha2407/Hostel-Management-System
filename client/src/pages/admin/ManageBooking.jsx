import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  CalendarDays,
  Users,
  IndianRupee,
  Clock3,
  CheckCircle2,
  XCircle,
  LogIn,
  LogOut,
  Eye,
  ChevronDown,
  BedDouble,
  X,
  Loader2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  Filter,
  Check,
} from "lucide-react";

import {
  getAllBookings,
  confirmBooking,
  checkInBooking,
  checkOutBooking,
  cancelBooking,
} from "../../services/bookingService";

const statusConfig = {
  Pending: {
    label: "Pending",
    icon: Clock3,
    badge:
      "!bg-amber-500/10 !text-amber-500 dark:!text-amber-400 !border-amber-500/20 !shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  },

  Confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    badge:
      "!bg-emerald-500/10 !text-emerald-600 dark:!text-emerald-400 !border-emerald-500/20 !shadow-[0_0_12px_rgba(16,185,129,0.15)]",
  },

  "Checked-In": {
    label: "Checked-In",
    icon: LogIn,
    badge:
      "!bg-blue-500/10 !text-blue-600 dark:!text-blue-400 !border-blue-500/20 !shadow-[0_0_12px_rgba(59,130,246,0.15)]",
  },

  "Checked-Out": {
    label: "Checked-Out",
    icon: LogOut,
    badge:
      "!bg-purple-500/10 !text-purple-600 dark:!text-purple-400 !border-purple-500/20 !shadow-[0_0_12px_rgba(168,85,247,0.15)]",
  },

  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    badge:
      "!bg-rose-500/10 !text-rose-600 dark:!text-rose-400 !border-rose-500/20 !shadow-[0_0_12px_rgba(244,63,94,0.15)]",
  },
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Initial page loading
  const [loading, setLoading] = useState(true);

  // Manual Sync loading
  const [syncing, setSyncing] = useState(false);

  // Booking action loading
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookingTypeFilter, setBookingTypeFilter] = useState("All");

  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [lastSynced, setLastSynced] = useState(null);
  const [syncSuccess, setSyncSuccess] = useState(false);

  /* =========================================================
     FETCH BOOKINGS
  ========================================================= */

  const fetchBookings = async ({ manual = false } = {}) => {
    if (manual) {
      setSyncing(true);
      setSyncSuccess(false);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const data = await getAllBookings();

      const bookingRecords = Array.isArray(data?.bookings) ? data.bookings : [];

      setBookings(bookingRecords);

      setLastSynced(new Date());

      if (manual) {
        setSyncSuccess(true);

        window.setTimeout(() => {
          setSyncSuccess(false);
        }, 1800);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to sync booking records from server.",
      );
    } finally {
      if (manual) {
        setSyncing(false);
      } else {
        setLoading(false);
      }
    }
  };

  /* =========================================================
     INITIAL FETCH
  ========================================================= */

  useEffect(() => {
    fetchBookings();
  }, []);

  /* =========================================================
     MANUAL SYNC
  ========================================================= */

  const handleSync = () => {
    if (syncing || actionLoading) return;

    fetchBookings({ manual: true });
  };

  /* =========================================================
     BOOKING ACTIONS
  ========================================================= */

  const handleStatusAction = async (actionType, bookingId) => {
    if (!bookingId || actionLoading) return;

    try {
      setActionLoading(true);

      if (actionType === "confirm") {
        await confirmBooking(bookingId);
      }

      if (actionType === "checkIn") {
        await checkInBooking(bookingId);
      }

      if (actionType === "checkOut") {
        await checkOutBooking(bookingId);
      }

      if (actionType === "cancel") {
        await cancelBooking(bookingId);
      }

      setSelectedBooking(null);

      // Refresh records after action
      await fetchBookings();
    } catch (err) {
      console.error("Booking action failed:", err);

      window.alert(
        err?.response?.data?.message ||
          err?.message ||
          "Operation failed. Please try again.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const bookingId = booking?._id ? booking._id.toLowerCase() : "";

      const shortBookingId = booking?._id
        ? booking._id.slice(-6).toLowerCase()
        : "";

      const customerName = (booking?.user?.fullName || "").toLowerCase();

      const customerEmail = (booking?.user?.email || "").toLowerCase();

      const roomNumber = booking?.room?.roomNumber
        ? String(booking.room.roomNumber).toLowerCase()
        : "";

      const matchesSearch =
        !searchValue ||
        bookingId.includes(searchValue) ||
        shortBookingId.includes(searchValue) ||
        customerName.includes(searchValue) ||
        customerEmail.includes(searchValue) ||
        roomNumber.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || booking?.bookingStatus === statusFilter;

      const matchesBookingType =
        bookingTypeFilter === "All" ||
        booking?.bookingType === bookingTypeFilter;

      return matchesSearch && matchesStatus && matchesBookingType;
    });
  }, [bookings, search, statusFilter, bookingTypeFilter]);

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, booking) => {
      if (booking?.bookingStatus === "Cancelled") {
        return sum;
      }

      return sum + Number(booking?.totalAmount || 0);
    }, 0);

    return [
      {
        title: "Total Reservations",
        value: bookings.length,
        icon: CalendarDays,
        description: "Cumulative bookings count",
        accent: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent",
        iconColor: "!text-[#D4AF37]",
      },

      {
        title: "Action Needed",
        value: bookings.filter(
          (booking) => booking?.bookingStatus === "Pending",
        ).length,
        icon: Clock3,
        description: "Awaiting confirmation",
        accent: "from-amber-500/20 via-amber-500/5 to-transparent",
        iconColor: "!text-amber-500",
      },

      {
        title: "Active Occupants",
        value: bookings.filter(
          (booking) => booking?.bookingStatus === "Checked-In",
        ).length,
        icon: Users,
        description: "Guests in-house right now",
        accent: "from-blue-500/20 via-blue-500/5 to-transparent",
        iconColor: "!text-blue-500",
      },

      {
        title: "Gross Revenue",
        value: `₹${totalRevenue.toLocaleString("en-IN")}`,
        icon: IndianRupee,
        description: "Generated from active stays",
        accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        iconColor: "!text-emerald-500",
      },
    ];
  }, [bookings]);

  /* =========================================================
     LAST SYNC LABEL
  ========================================================= */

  const lastSyncedText = lastSynced
    ? lastSynced.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Not synced yet";

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setBookingTypeFilter("All");
  };

  return (
    <div className="!min-h-screen !w-full !min-w-0 !overflow-x-hidden !bg-[#FAF8F4] dark:!bg-[#080808] !text-[#2B1720] dark:!text-white !p-3 sm:!p-5 lg:!p-8 !transition-colors !duration-300">
      <div className="!mx-auto !w-full !max-w-[1600px] !min-w-0">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="!mb-6 sm:!mb-8 !flex !min-w-0 !flex-col lg:!flex-row lg:!items-center lg:!justify-between !gap-5"
        >
          <div className="!min-w-0">
            <div className="!mb-2 !inline-flex !max-w-full !items-center !gap-2 !rounded-full !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !px-3 !py-1">
              <Sparkles
                size={14}
                className="!shrink-0 !text-[#D4AF37] !animate-pulse"
              />

              <span className="!truncate !text-[10px] sm:!text-[11px] !font-bold !uppercase !tracking-[0.15em] sm:!tracking-[0.2em] !text-[#D4AF37]">
                Management Console
              </span>
            </div>

            <h1 className="!text-2xl sm:!text-3xl lg:!text-4xl !font-extrabold !tracking-tight">
              Manage Bookings
            </h1>

            <p className="!mt-1 !max-w-3xl !text-sm sm:!text-base !leading-relaxed !text-[#74656A] dark:!text-[#777777]">
              Monitor reservations, confirm stays, and manage check-in and
              check-out workflows.
            </p>
          </div>

          {/* Sync Area */}

          <div className="!flex !w-full sm:!w-auto !flex-col sm:!flex-row !items-stretch sm:!items-center !gap-3">
            <AnimatePresence mode="wait">
              {syncSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="!flex !items-center !justify-center !gap-2 !rounded-xl !border !border-emerald-500/20 !bg-emerald-500/10 !px-4 !py-3 !text-xs !font-bold !text-emerald-600 dark:!text-emerald-400"
                >
                  <Check size={15} />
                  Records Synced
                </motion.div>
              ) : (
                <div className="!hidden sm:!block !text-right">
                  <p className="!text-[9px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555]">
                    Last Synced
                  </p>

                  <p className="!mt-0.5 !text-xs !font-bold !text-[#D4AF37]">
                    {lastSyncedText}
                  </p>
                </div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={
                !syncing && !actionLoading
                  ? {
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                    }
                  : {}
              }
              whileTap={!syncing && !actionLoading ? { scale: 0.97 } : {}}
              type="button"
              onClick={handleSync}
              disabled={syncing || actionLoading}
              className={`!inline-flex !w-full sm:!w-auto !items-center !justify-center !gap-2.5 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !px-5 !py-3 !text-sm !font-semibold !shadow-sm !transition-all ${
                syncing || actionLoading
                  ? "!cursor-not-allowed !opacity-70"
                  : "hover:!border-[#D4AF37]"
              }`}
            >
              <RefreshCw
                size={16}
                className={
                  syncing ? "!animate-spin !text-[#D4AF37]" : "!text-[#D4AF37]"
                }
              />

              <span>{syncing ? "Syncing Records..." : "Sync Records"}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* =====================================================
            MOBILE LAST SYNC
        ===================================================== */}

        <div className="!mb-5 !flex sm:!hidden !items-center !justify-between !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !px-4 !py-3">
          <span className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555]">
            Last Synced
          </span>

          <span className="!text-xs !font-bold !text-[#D4AF37]">
            {lastSyncedText}
          </span>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="!mb-6 sm:!mb-8 !grid !grid-cols-1 sm:!grid-cols-2 xl:!grid-cols-4 !gap-3 sm:!gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="!relative !min-w-0 !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-4 sm:!p-6 !shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:!shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                <div
                  className={`!pointer-events-none !absolute !inset-0 !bg-gradient-to-br ${stat.accent}`}
                />

                <div className="!relative !z-10 !flex !items-start !justify-between !gap-3">
                  <div className="!min-w-0">
                    <span className="!text-[10px] sm:!text-xs !font-semibold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      {stat.title}
                    </span>

                    <h3 className="!mt-1 sm:!mt-2 !truncate !text-2xl sm:!text-3xl !font-black !tracking-tight">
                      {stat.value}
                    </h3>

                    <p className="!mt-1 !text-[10px] sm:!text-xs !text-[#74656A] dark:!text-[#555555]">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`!flex !h-10 sm:!h-12 !w-10 sm:!w-12 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] !border !border-[#E8DED2] dark:!border-[#292929] ${stat.iconColor}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =====================================================
            MAIN PANEL
        ===================================================== */}

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
            duration: 0.5,
            delay: 0.2,
          }}
          className="!w-full !min-w-0 !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:!shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        >
          {/* ===================================================
              CONTROLS
          =================================================== */}

          <div className="!border-b !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/50 dark:!bg-[#171717]/30 !p-3 sm:!p-5">
            <div className="!flex !min-w-0 !flex-col xl:!flex-row !gap-3 xl:!items-center xl:!justify-between">
              {/* Search */}

              <div className="!relative !w-full xl:!max-w-md">
                <Search
                  size={18}
                  className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A] dark:!text-[#555555]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Guest, ID or Room..."
                  className="!w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !py-3 !pl-11 !pr-4 !text-sm !outline-none focus:!border-[#D4AF37] focus:!ring-1 focus:!ring-[#D4AF37] !transition-all"
                />
              </div>

              {/* Filters */}

              <div className="!grid !w-full sm:!flex sm:!w-auto !grid-cols-1 !gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className={`!flex !items-center !justify-center !gap-2 !rounded-xl !border !px-4 !py-3 !text-sm !font-semibold !transition-all ${
                    showFilters || bookingTypeFilter !== "All"
                      ? "!border-[#D4AF37] !bg-[#D4AF37]/10 !text-[#D4AF37]"
                      : "!border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] hover:!border-[#D4AF37]"
                  }`}
                >
                  <SlidersHorizontal size={16} />

                  <span>Filters</span>

                  <ChevronDown
                    size={14}
                    className={`!transition-transform !duration-300 ${
                      showFilters ? "!rotate-180" : ""
                    }`}
                  />
                </button>

                <div className="!relative !w-full sm:!w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="!w-full !appearance-none !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-4 !py-3 !pr-10 !text-sm !font-medium !outline-none focus:!border-[#D4AF37]"
                  >
                    <option value="All">All Statuses</option>

                    <option value="Pending">Pending</option>

                    <option value="Confirmed">Confirmed</option>

                    <option value="Checked-In">Checked-In</option>

                    <option value="Checked-Out">Checked-Out</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="!pointer-events-none !absolute !right-3.5 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                FILTER DRAWER
            ================================================= */}

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="!overflow-hidden"
                >
                  <div className="!mt-4 !flex !flex-wrap !items-center !gap-2 sm:!gap-3 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !p-3 sm:!p-4">
                    <span className="!w-full sm:!w-auto !text-xs !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555]">
                      Tenure Type:
                    </span>

                    <div className="!flex !flex-wrap !gap-2">
                      {["All", "Daily", "Weekly", "Monthly"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setBookingTypeFilter(type)}
                          className={`!rounded-lg !px-3.5 !py-1.5 !text-xs !font-bold !transition-all ${
                            bookingTypeFilter === type
                              ? "!bg-[#D4AF37] !text-black !shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                              : "!bg-[#FAF8F4] dark:!bg-[#171717] !text-[#74656A] dark:!text-[#777777] hover:!text-[#D4AF37]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {(statusFilter !== "All" ||
                      bookingTypeFilter !== "All" ||
                      search) && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="!ml-0 sm:!ml-auto !flex !items-center !gap-1 !text-xs !font-bold !text-rose-500 hover:!underline"
                      >
                        <X size={14} />
                        Reset All
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===================================================
              LOADING
          =================================================== */}

          {loading ? (
            <div className="!flex !min-h-[350px] !flex-col !items-center !justify-center !px-5">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <RefreshCw size={36} className="!text-[#D4AF37]" />
              </motion.div>

              <p className="!mt-4 !text-sm !font-semibold !text-[#74656A] dark:!text-[#777777]">
                Fetching booking records...
              </p>
            </div>
          ) : error ? (
            /* =================================================
               ERROR
            ================================================= */

            <div className="!flex !min-h-[350px] !flex-col !items-center !justify-center !px-5 !text-center !text-rose-500">
              <AlertCircle size={36} className="!mb-3" />

              <p className="!max-w-md !text-sm !font-bold">{error}</p>

              <button
                type="button"
                onClick={() => fetchBookings()}
                className="!mt-4 !rounded-xl !bg-rose-500/10 !px-5 !py-2.5 !text-xs !font-bold !text-rose-500 hover:!bg-rose-500/20 !transition-colors"
              >
                Retry Request
              </button>
            </div>
          ) : filteredBookings.length === 0 ? (
            /* =================================================
               EMPTY
            ================================================= */

            <div className="!px-5 !py-20 !text-center">
              <div className="!mx-auto !mb-4 !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                <Filter size={28} />
              </div>

              <h3 className="!text-lg !font-bold">No Records Match Query</h3>

              <p className="!mt-1 !text-sm !text-[#74656A] dark:!text-[#777777]">
                Adjust your filters or search phrase.
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div className="!hidden lg:!block !w-full !overflow-x-auto">
                <table className="!w-full !min-w-[1050px] !text-left">
                  <thead>
                    <tr className="!border-b !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/80 dark:!bg-[#171717]/50 !text-[11px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      <th className="!px-6 !py-4">ID / Created</th>

                      <th className="!px-6 !py-4">Guest Info</th>

                      <th className="!px-6 !py-4">Assigned Room</th>

                      <th className="!px-6 !py-4">Tenure Range</th>

                      <th className="!px-6 !py-4">Amount</th>

                      <th className="!px-6 !py-4">Status</th>

                      <th className="!px-6 !py-4 !text-right">Manage</th>
                    </tr>
                  </thead>

                  <tbody className="!divide-y !divide-[#E8DED2] dark:!divide-[#292929]">
                    {filteredBookings.map((booking, index) => (
                      <BookingTableRow
                        key={booking._id}
                        booking={booking}
                        index={index}
                        onView={setSelectedBooking}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =================================================
                  MOBILE / TABLET CARDS
              ================================================= */}

              <div className="lg:!hidden !divide-y !divide-[#E8DED2] dark:!divide-[#292929]">
                {filteredBookings.map((booking, index) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    index={index}
                    onView={setSelectedBooking}
                  />
                ))}
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="!flex !flex-col sm:!flex-row !items-start sm:!items-center !justify-between !gap-2 !border-t !border-[#E8DED2] dark:!border-[#292929] !px-4 sm:!px-6 !py-4 !bg-[#FAF8F4]/30 dark:!bg-[#171717]/20 !text-xs !text-[#74656A] dark:!text-[#777777]">
                <span>
                  Showing <b>{filteredBookings.length}</b> of{" "}
                  <b>{bookings.length}</b> entries
                </span>

                <span className="!font-semibold !text-[#D4AF37]">
                  HMS Booking Engine
                </span>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* =======================================================
          BOOKING DETAILS MODAL
      ======================================================= */}

      <AnimatePresence>
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onAction={handleStatusAction}
            actionLoading={actionLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* =============================================================
   TABLE ROW
============================================================= */

const BookingTableRow = ({ booking, index, onView }) => {
  const statusKey = booking?.bookingStatus || "Pending";

  const status = statusConfig[statusKey] || statusConfig.Pending;

  const StatusIcon = status.icon;

  const shortId = booking?._id
    ? `#${booking._id.slice(-6).toUpperCase()}`
    : "#N/A";

  const formattedDate = booking?.createdAt
    ? new Date(booking.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
    : "N/A";

  return (
    <motion.tr
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.03,
      }}
      className="!transition-colors hover:!bg-[#FAF8F4] dark:hover:!bg-[#171717]/40 group"
    >
      <td className="!px-6 !py-4">
        <span className="!font-bold !text-sm !text-black dark:!text-white group-hover:!text-[#D4AF37] !transition-colors">
          {shortId}
        </span>

        <p className="!text-xs !text-[#74656A] dark:!text-[#555555]">
          {formattedDate}
        </p>
      </td>

      <td className="!px-6 !py-4">
        <div className="!flex !items-center !gap-3">
          <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-[#D4AF37]/10 !text-[#D4AF37] !font-bold !text-xs !border !border-[#D4AF37]/20">
            {(booking?.user?.fullName || "Guest")
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="!min-w-0">
            <p className="!truncate !text-sm !font-bold !text-black dark:!text-white">
              {booking?.user?.fullName || "Guest User"}
            </p>

            <p className="!max-w-[180px] !truncate !text-xs !text-[#74656A] dark:!text-[#777777]">
              {booking?.user?.email || "N/A"}
            </p>
          </div>
        </div>
      </td>

      <td className="!px-6 !py-4">
        <p className="!text-sm !font-bold !text-black dark:!text-white">
          Room {booking?.room?.roomNumber || "N/A"}
        </p>

        <p className="!text-xs !text-[#74656A] dark:!text-[#777777]">
          {booking?.room?.roomType || "Standard"} ·{" "}
          {booking?.room?.sharingType || "N/A"}
        </p>
      </td>

      <td className="!px-6 !py-4">
        <p className="!text-xs !font-semibold">
          {booking?.checkInDate
            ? new Date(booking.checkInDate).toLocaleDateString("en-IN")
            : "N/A"}
        </p>

        <p className="!text-xs !text-[#74656A] dark:!text-[#555555]">
          to{" "}
          {booking?.checkOutDate
            ? new Date(booking.checkOutDate).toLocaleDateString("en-IN")
            : "N/A"}
        </p>
      </td>

      <td className="!px-6 !py-4">
        <p className="!text-sm !font-extrabold !text-black dark:!text-white">
          ₹{Number(booking?.totalAmount || 0).toLocaleString("en-IN")}
        </p>

        <p className="!text-[11px] !font-bold !uppercase !text-[#D4AF37]">
          {booking?.bookingType || "N/A"}
        </p>
      </td>

      <td className="!px-6 !py-4">
        <span
          className={`!inline-flex !items-center !gap-1.5 !rounded-full !border !px-3 !py-1 !text-xs !font-bold ${status.badge}`}
        >
          <StatusIcon size={12} />
          {status.label}
        </span>
      </td>

      <td className="!px-6 !py-4 !text-right">
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          type="button"
          onClick={() => onView(booking)}
          className="!inline-flex !items-center !gap-1.5 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#080808] !px-3.5 !py-2 !text-xs !font-bold hover:!border-[#D4AF37] hover:!text-[#D4AF37] !transition-all"
        >
          <Eye size={14} />
          Details
        </motion.button>
      </td>
    </motion.tr>
  );
};

/* =============================================================
   MOBILE BOOKING CARD
============================================================= */

const BookingCard = ({ booking, index, onView }) => {
  const statusKey = booking?.bookingStatus || "Pending";

  const status = statusConfig[statusKey] || statusConfig.Pending;

  const StatusIcon = status.icon;

  const shortId = booking?._id
    ? `#${booking._id.slice(-6).toUpperCase()}`
    : "#N/A";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      className="!p-4 sm:!p-5"
    >
      <div className="!flex !min-w-0 !items-center !justify-between !gap-3">
        <div className="!flex !min-w-0 !items-center !gap-3">
          <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#D4AF37]/10 !text-[#D4AF37] !border !border-[#D4AF37]/20">
            <BedDouble size={18} />
          </div>

          <div className="!min-w-0">
            <span className="!font-bold !text-sm !text-black dark:!text-white">
              {shortId}
            </span>

            <p className="!text-xs !text-[#74656A] dark:!text-[#555555]">
              {booking?.createdAt
                ? new Date(booking.createdAt).toLocaleDateString("en-IN")
                : "N/A"}
            </p>
          </div>
        </div>

        <span
          className={`!inline-flex !shrink-0 !items-center !gap-1 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-bold ${status.badge}`}
        >
          <StatusIcon size={10} />
          {status.label}
        </span>
      </div>

      <div className="!mt-4 !grid !grid-cols-2 !gap-3 !rounded-xl !border !border-[#E8DED2]/50 dark:!border-[#292929]/50 !bg-[#FAF8F4] dark:!bg-[#171717]/50 !p-3.5">
        <div className="!min-w-0">
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Guest
          </span>

          <p className="!truncate !text-xs !font-bold">
            {booking?.user?.fullName || "Guest User"}
          </p>
        </div>

        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Room
          </span>

          <p className="!text-xs !font-bold">
            Room {booking?.room?.roomNumber || "N/A"}
          </p>
        </div>

        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Check In
          </span>

          <p className="!text-xs !font-medium">
            {booking?.checkInDate
              ? new Date(booking.checkInDate).toLocaleDateString("en-IN")
              : "N/A"}
          </p>
        </div>

        <div>
          <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
            Total Fee
          </span>

          <p className="!text-xs !font-black !text-[#D4AF37]">
            ₹{Number(booking?.totalAmount || 0).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <motion.button
        whileTap={{
          scale: 0.98,
        }}
        type="button"
        onClick={() => onView(booking)}
        className="!mt-4 !flex !w-full !items-center !justify-center !gap-2 !rounded-xl !bg-[#D4AF37] !py-2.5 !text-xs !font-bold !text-black !shadow-[0_0_12px_rgba(212,175,55,0.2)] hover:!bg-[#E7C95C] !transition-colors"
      >
        <Eye size={14} />
        Inspect Booking
      </motion.button>
    </motion.div>
  );
};

/* =============================================================
   BOOKING DETAILS MODAL
============================================================= */

const BookingDetailsModal = ({ booking, onClose, onAction, actionLoading }) => {
  const bookingId = booking?._id ? `#${booking._id}` : "#N/A";

  const statusKey = booking?.bookingStatus || "Pending";

  const status = statusConfig[statusKey] || statusConfig.Pending;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !overflow-y-auto !p-3 sm:!p-4 !bg-black/80 !backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
        className="!my-auto !w-full !max-w-xl !max-h-[92vh] !overflow-y-auto !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-2xl"
      >
        {/* Modal Header */}

        <div className="!flex !items-start !justify-between !gap-3 !border-b !border-[#E8DED2] dark:!border-[#292929] !p-4 sm:!p-6">
          <div className="!min-w-0">
            <div className="!flex !flex-wrap !items-center !gap-2">
              <span className="!text-[10px] sm:!text-xs !font-bold !uppercase !tracking-wider !text-[#D4AF37]">
                Reservation Sheet
              </span>

              <span
                className={`!rounded-full !border !px-2 !py-0.5 !text-[10px] !font-bold ${status.badge}`}
              >
                {status.label}
              </span>
            </div>

            <h2 className="!mt-1 !break-all !text-lg sm:!text-2xl !font-extrabold">
              {bookingId}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#FAF8F4] dark:!bg-[#171717] hover:!bg-[#D4AF37]/10 !transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="!space-y-5 !p-4 sm:!p-6">
          {/* Guest */}

          <div className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/50 dark:!bg-[#171717]/30 !p-4">
            <span className="!text-[11px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#555555]">
              Guest Particulars
            </span>

            <div className="!mt-2 !flex !items-start !gap-3">
              <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !bg-[#D4AF37] !text-black !font-black !text-sm">
                {(booking?.user?.fullName || "G")[0].toUpperCase()}
              </div>

              <div className="!min-w-0">
                <h4 className="!font-bold !text-base">
                  {booking?.user?.fullName || "Guest User"}
                </h4>

                <div className="!mt-1 !flex !flex-col !gap-1.5 !text-xs !text-[#74656A] dark:!text-[#777777]">
                  <span className="!flex !items-center !gap-1 !break-all">
                    <Mail size={12} className="!shrink-0" />
                    {booking?.user?.email || "N/A"}
                  </span>

                  <span className="!flex !items-center !gap-1">
                    <Phone size={12} className="!shrink-0" />
                    {booking?.user?.phone || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Allocation */}

          <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-3">
            <DetailTile
              icon={BedDouble}
              label="Allocated Room"
              value={`Room ${booking?.room?.roomNumber || "N/A"}`}
              subValue={`${booking?.room?.roomType || "Standard"} (${
                booking?.room?.wingGender || "N/A"
              } Wing)`}
            />

            <DetailTile
              icon={Users}
              label="Pax Occupancy"
              value={`${booking?.numberOfGuests || 1} Guest(s)`}
              subValue={`Type: ${booking?.bookingType || "Standard"}`}
            />

            <DetailTile
              icon={CalendarDays}
              label="Check-In Date"
              value={
                booking?.checkInDate
                  ? new Date(booking.checkInDate).toLocaleDateString("en-IN")
                  : "N/A"
              }
            />

            <DetailTile
              icon={CalendarDays}
              label="Check-Out Date"
              value={
                booking?.checkOutDate
                  ? new Date(booking.checkOutDate).toLocaleDateString("en-IN")
                  : "N/A"
              }
            />
          </div>

          {/* Special Request */}

          {booking?.specialRequest && (
            <div className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !p-4">
              <span className="!text-[10px] !font-bold !uppercase !text-[#74656A] dark:!text-[#555555]">
                Guest Note
              </span>

              <p className="!mt-1 !text-xs !italic !text-[#74656A] dark:!text-[#777777]">
                "{booking.specialRequest}"
              </p>
            </div>
          )}

          {/* Financial */}

          <div className="!flex !flex-col sm:!flex-row !items-start sm:!items-center !justify-between !gap-3 !rounded-xl !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !p-4">
            <div>
              <span className="!text-xs !font-bold !uppercase !text-[#D4AF37]">
                Total Billable
              </span>

              <p className="!text-xs !text-[#74656A] dark:!text-[#777777]">
                Payment Status: {booking?.paymentStatus || "N/A"}
              </p>
            </div>

            <span className="!text-2xl !font-black !text-[#D4AF37]">
              ₹{Number(booking?.totalAmount || 0).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Actions */}

          <div className="!flex !flex-col-reverse sm:!flex-row !items-stretch sm:!items-center !justify-end !gap-3 !pt-2">
            {actionLoading ? (
              <div className="!flex !items-center !justify-center !gap-2 !rounded-xl !bg-[#D4AF37]/10 !px-5 !py-3 !text-xs !font-bold !text-[#D4AF37]">
                <Loader2 size={16} className="!animate-spin" />
                Committing Changes...
              </div>
            ) : (
              <>
                {statusKey === "Pending" && (
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={() => onAction("confirm", booking._id)}
                    className="!rounded-xl !bg-emerald-500 !px-5 !py-3 !text-xs !font-bold !text-white hover:!bg-emerald-600 !shadow-[0_0_12px_rgba(16,185,129,0.2)] !transition-all"
                  >
                    Confirm Booking
                  </motion.button>
                )}

                {statusKey === "Confirmed" && (
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={() => onAction("checkIn", booking._id)}
                    className="!rounded-xl !bg-blue-500 !px-5 !py-3 !text-xs !font-bold !text-white hover:!bg-blue-600 !shadow-[0_0_12px_rgba(59,130,246,0.2)] !transition-all"
                  >
                    Check-In Guest
                  </motion.button>
                )}

                {statusKey === "Checked-In" && (
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={() => onAction("checkOut", booking._id)}
                    className="!rounded-xl !bg-purple-500 !px-5 !py-3 !text-xs !font-bold !text-white hover:!bg-purple-600 !shadow-[0_0_12px_rgba(168,85,247,0.2)] !transition-all"
                  >
                    Check-Out Guest
                  </motion.button>
                )}

                {!["Cancelled", "Checked-Out"].includes(statusKey) && (
                  <button
                    type="button"
                    onClick={() => onAction("cancel", booking._id)}
                    className="!rounded-xl !border !border-rose-500/30 !px-4 !py-3 !text-xs !font-bold !text-rose-500 hover:!bg-rose-500/10 !transition-colors"
                  >
                    Revoke Stay
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =============================================================
   DETAIL TILE
============================================================= */

const DetailTile = ({ icon: Icon, label, value, subValue }) => (
  <div className="!min-w-0 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !p-3.5">
    <div className="!mb-1 !flex !items-center !gap-1.5 !text-[#74656A] dark:!text-[#555555]">
      <Icon size={14} />

      <span className="!text-[10px] !font-bold !uppercase">{label}</span>
    </div>

    <p className="!truncate !text-xs !font-bold !text-black dark:!text-white">
      {value}
    </p>

    {subValue && (
      <p className="!mt-0.5 !truncate !text-[10px] !text-[#74656A] dark:!text-[#555555]">
        {subValue}
      </p>
    )}
  </div>
);

export default ManageBookings;
