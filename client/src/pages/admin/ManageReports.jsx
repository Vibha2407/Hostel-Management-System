import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  RefreshCw,
  TrendingUp,
  UserRound,
  Users,
  XCircle,
  Sparkles,
  ArrowUpRight,
  WalletCards,
} from "lucide-react";

import { getReports } from "../../services/reportServices";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   ANIMATED NUMBER
========================================================= */

const AnimatedNumber = ({
  value = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = Number(value) || 0;
    const duration = 900;
    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(numericValue * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <>
      {prefix}
      {displayValue.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ManageReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReports();

      setReports(data);
    } catch (err) {
      console.error("Reports Error:", err);

      setError(err.response?.data?.message || "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const formatCurrency = (value = 0) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const bookingTotal = useMemo(() => {
    if (!reports?.bookings) return 0;

    return Object.values(reports.bookings).reduce(
      (total, value) => total + value,
      0,
    );
  }, [reports]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="!relative !flex !min-h-screen !items-center !justify-center !overflow-hidden !bg-[#FAF8F4] dark:!bg-[#080808] !text-[#2B1720] dark:!text-white">
        <div className="!pointer-events-none !absolute !-left-40 !-top-40 !h-96 !w-96 !rounded-full !bg-[#D4AF37]/20 !blur-[130px]" />

        <div className="!pointer-events-none !absolute !-bottom-40 !-right-40 !h-96 !w-96 !rounded-full !bg-[#4A1D2F]/20 !blur-[130px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="!relative !z-10 !flex !flex-col !items-center !gap-4"
        >
          <div className="!relative !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <RefreshCw size={28} className="!text-[#D4AF37]" />
            </motion.div>
          </div>

          <p className="!text-sm !font-black">Loading reports...</p>

          <p className="!text-xs !text-[#74656A] dark:!text-[#777777]">
            Preparing your analytics dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !reports) {
    return (
      <div className="!relative !flex !min-h-screen !items-center !justify-center !overflow-hidden !bg-[#FAF8F4] dark:!bg-[#080808] !p-6 !text-[#2B1720] dark:!text-white">
        <div className="!pointer-events-none !absolute !-left-32 !-top-32 !h-96 !w-96 !rounded-full !bg-[#D4AF37]/10 !blur-[120px]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="!relative !z-10 !w-full !max-w-[650px] !rounded-3xl !border !border-rose-500/20 !bg-white dark:!bg-[#111111] !p-8 !text-center !shadow-2xl"
        >
          <div className="!mx-auto !mb-5 !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !bg-rose-500/10 !text-rose-500">
            <AlertCircle size={32} />
          </div>

          <h2 className="!text-xl !font-black">Reports Unavailable</h2>

          <p className="!mt-2 !text-sm !text-[#74656A] dark:!text-[#777777]">
            {error || "Unable to load report data."}
          </p>

          <button
            onClick={fetchReports}
            className="!mt-6 !inline-flex !items-center !gap-2 !rounded-xl !bg-[#D4AF37] !px-5 !py-3 !text-sm !font-black !text-black !shadow-lg !shadow-[#D4AF37]/20 !transition-all hover:!scale-105"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const { overview, bookings, payments, rooms, bookingTrend } = reports;

  /* =========================================================
     BOOKING STATUS
  ========================================================= */

  const bookingStatuses = [
    {
      label: "Pending",
      value: bookings.pending,
      icon: Clock3,
      color: "!text-amber-500",
      bg: "!bg-amber-500/10",
      glow: "!shadow-amber-500/10",
    },
    {
      label: "Confirmed",
      value: bookings.confirmed,
      icon: CheckCircle2,
      color: "!text-blue-500",
      bg: "!bg-blue-500/10",
      glow: "!shadow-blue-500/10",
    },
    {
      label: "Checked-In",
      value: bookings.checkedIn,
      icon: UserRound,
      color: "!text-violet-500",
      bg: "!bg-violet-500/10",
      glow: "!shadow-violet-500/10",
    },
    {
      label: "Checked-Out",
      value: bookings.checkedOut,
      icon: BedDouble,
      color: "!text-cyan-500",
      bg: "!bg-cyan-500/10",
      glow: "!shadow-cyan-500/10",
    },
    {
      label: "Completed",
      value: bookings.completed,
      icon: CheckCircle2,
      color: "!text-emerald-500",
      bg: "!bg-emerald-500/10",
      glow: "!shadow-emerald-500/10",
    },
    {
      label: "Cancelled",
      value: bookings.cancelled,
      icon: XCircle,
      color: "!text-rose-500",
      bg: "!bg-rose-500/10",
      glow: "!shadow-rose-500/10",
    },
  ];

  /* =========================================================
     PAYMENT STATUS
  ========================================================= */

  const paymentStatuses = [
    {
      label: "Successful",
      value: payments.success,
      icon: CheckCircle2,
      color: "!text-emerald-500",
      bg: "!bg-emerald-500/10",
    },
    {
      label: "Pending",
      value: payments.pending,
      icon: Clock3,
      color: "!text-amber-500",
      bg: "!bg-amber-500/10",
    },
    {
      label: "Failed",
      value: payments.failed,
      icon: XCircle,
      color: "!text-rose-500",
      bg: "!bg-rose-500/10",
    },
    {
      label: "Refunded",
      value: payments.refunded,
      icon: RefreshCw,
      color: "!text-violet-500",
      bg: "!bg-violet-500/10",
    },
  ];

  return (
    <div className="!relative !min-h-screen !overflow-hidden !bg-[#FAF8F4] dark:!bg-[#080808] !p-4 sm:!p-6 lg:!p-8 !text-[#2B1720] dark:!text-white">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-left-40 !-top-40 !h-[500px] !w-[500px] !rounded-full !bg-[#D4AF37]/10 dark:!bg-[#D4AF37]/[0.07] !blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-bottom-48 !-right-48 !h-[550px] !w-[550px] !rounded-full !bg-[#4A1D2F]/10 dark:!bg-[#4A1D2F]/20 !blur-[150px]"
      />

      <div className="!relative !z-10 !mx-auto !max-w-[1500px]">
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="show"
          className="!mb-8 !flex !flex-col !gap-5 lg:!flex-row lg:!items-end lg:!justify-between"
        >
          <div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="!mb-4 !inline-flex !items-center !gap-2 !rounded-full !border !border-[#D4AF37]/30 !bg-gradient-to-r !from-[#D4AF37]/15 !to-[#4A1D2F]/10 !px-3.5 !py-1.5 !shadow-lg !shadow-[#D4AF37]/5"
            >
              <Sparkles size={14} className="!text-[#D4AF37]" />

              <span className="!text-[10px] !font-black !uppercase !tracking-[0.2em] !text-[#D4AF37]">
                Business Intelligence
              </span>
            </motion.div>

            <h1 className="!text-3xl sm:!text-4xl lg:!text-5xl !font-black !tracking-tight">
              Reports{" "}
              <span className="!bg-gradient-to-r !from-[#D4AF37] !via-[#E2C45B] !to-[#8F6320] !bg-clip-text !text-transparent">
                & Analytics
              </span>
            </h1>

            <p className="!mt-3 !max-w-2xl !text-sm !leading-relaxed !text-[#74656A] dark:!text-[#777777]">
              Monitor hostel performance, bookings, payments and occupancy from
              one centralized dashboard.
            </p>
          </div>

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={fetchReports}
            disabled={loading}
            className="!inline-flex !items-center !justify-center !gap-2 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/80 dark:!bg-[#111111]/80 !px-5 !py-3 !text-sm !font-bold !backdrop-blur-xl !transition-all hover:!border-[#D4AF37]/50 hover:!shadow-lg hover:!shadow-[#D4AF37]/5 disabled:!opacity-50"
          >
            <RefreshCw size={16} className={loading ? "!animate-spin" : ""} />
            Refresh
          </motion.button>
        </motion.div>

        {/* ===================================================
            OVERVIEW CARDS
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="!mb-8 !grid !grid-cols-1 !gap-4 sm:!grid-cols-2 xl:!grid-cols-4"
        >
          <ReportCard
            title="Total Revenue"
            value={<AnimatedNumber value={overview.totalRevenue} prefix="₹" />}
            description="Successful payments"
            icon={CircleDollarSign}
            accent="gold"
            index={0}
          />

          <ReportCard
            title="Total Bookings"
            value={<AnimatedNumber value={overview.totalBookings} />}
            description="All booking records"
            icon={CalendarDays}
            accent="blue"
            index={1}
          />

          <ReportCard
            title="Total Customers"
            value={<AnimatedNumber value={overview.totalCustomers} />}
            description="Registered customers"
            icon={Users}
            accent="purple"
            index={2}
          />

          <ReportCard
            title="Occupancy Rate"
            value={
              <AnimatedNumber
                value={overview.occupancyRate}
                suffix="%"
                decimals={1}
              />
            }
            description={`${rooms.occupiedBeds} of ${rooms.totalBeds} beds occupied`}
            icon={Activity}
            accent="green"
            index={3}
          />
        </motion.div>

        {/* ===================================================
            REVENUE + OCCUPANCY
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="!mb-6 !grid !grid-cols-1 !gap-5 xl:!grid-cols-2"
        >
          {/* Revenue */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -4,
            }}
            className="!group !relative !overflow-hidden !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/90 dark:!bg-[#111111]/90 !p-5 sm:!p-6 !shadow-sm !backdrop-blur-xl"
          >
            <div className="!pointer-events-none !absolute !-right-20 !-top-20 !h-48 !w-48 !rounded-full !bg-[#D4AF37]/10 !blur-[70px] !transition-all !duration-500 group-hover:!bg-[#D4AF37]/20" />

            <div className="!relative !z-10">
              <div className="!flex !items-start !justify-between !gap-4">
                <div>
                  <p className="!text-[10px] !font-black !uppercase !tracking-[0.15em] !text-[#74656A] dark:!text-[#777777]">
                    Financial Overview
                  </p>

                  <h2 className="!mt-1 !text-xl !font-black">Revenue</h2>
                </div>

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !border !border-[#D4AF37]/20 !bg-gradient-to-br !from-[#D4AF37]/15 !to-[#D4AF37]/5 !text-[#D4AF37]"
                >
                  <WalletCards size={20} />
                </motion.div>
              </div>

              <div className="!mt-7">
                <p className="!text-3xl sm:!text-4xl !font-black !tracking-tight">
                  {formatCurrency(overview.totalRevenue)}
                </p>

                <div className="!mt-2 !flex !items-center !gap-2">
                  <span className="!flex !h-5 !w-5 !items-center !justify-center !rounded-full !bg-emerald-500/10 !text-emerald-500">
                    <TrendingUp size={12} />
                  </span>

                  <p className="!text-xs !text-[#74656A] dark:!text-[#777777]">
                    Revenue from successful payments
                  </p>
                </div>
              </div>

              <div className="!mt-7 !grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
                <MiniStat
                  label="Successful Payments"
                  value={<AnimatedNumber value={payments.success} />}
                  accent="!text-emerald-500"
                />

                <MiniStat
                  label="Refunded Amount"
                  value={formatCurrency(overview.totalRefunded)}
                  accent="!text-rose-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Occupancy */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -4,
            }}
            className="!group !relative !overflow-hidden !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/90 dark:!bg-[#111111]/90 !p-5 sm:!p-6 !shadow-sm !backdrop-blur-xl"
          >
            <div className="!pointer-events-none !absolute !-left-20 !-bottom-20 !h-48 !w-48 !rounded-full !bg-emerald-500/5 !blur-[70px] group-hover:!bg-emerald-500/10 !transition-all" />

            <div className="!relative !z-10">
              <div className="!flex !items-start !justify-between">
                <div>
                  <p className="!text-[10px] !font-black !uppercase !tracking-[0.15em] !text-[#74656A] dark:!text-[#777777]">
                    Room Analytics
                  </p>

                  <h2 className="!mt-1 !text-xl !font-black">Bed Occupancy</h2>
                </div>

                <BedDouble size={21} className="!text-[#D4AF37]" />
              </div>

              <div className="!mt-7 !flex !flex-col !items-center !gap-7 sm:!flex-row">
                <OccupancyRing percentage={rooms.occupancyRate} />

                <div className="!grid !w-full !grid-cols-2 !gap-3">
                  <MiniStat
                    label="Total Beds"
                    value={<AnimatedNumber value={rooms.totalBeds} />}
                  />

                  <MiniStat
                    label="Occupied"
                    value={<AnimatedNumber value={rooms.occupiedBeds} />}
                    accent="!text-emerald-500"
                  />

                  <MiniStat
                    label="Available"
                    value={<AnimatedNumber value={rooms.availableBeds} />}
                    accent="!text-blue-500"
                  />

                  <MiniStat
                    label="Rooms"
                    value={<AnimatedNumber value={rooms.totalRooms} />}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===================================================
            BOOKING ANALYTICS
        =================================================== */}

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="!mb-6 !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/90 dark:!bg-[#111111]/90 !p-5 sm:!p-6 !shadow-sm !backdrop-blur-xl"
        >
          <SectionHeader
            eyebrow="Booking Performance"
            title="Booking Analytics"
            icon={CalendarDays}
          />

          <motion.div
            variants={containerVariants}
            className="!grid !grid-cols-2 !gap-3 md:!grid-cols-3 xl:!grid-cols-6"
          >
            {bookingStatuses.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  className="!group !relative !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/50 dark:!bg-[#171717]/40 !p-4 !transition-all hover:!shadow-xl"
                >
                  <div
                    className={`!mb-4 !flex !h-10 !w-10 !items-center !justify-center !rounded-xl ${item.bg} ${item.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  <p className="!text-2xl !font-black">
                    <AnimatedNumber value={item.value} />
                  </p>

                  <p className="!mt-1 !text-[10px] !font-bold !text-[#74656A] dark:!text-[#777777]">
                    {item.label}
                  </p>

                  <div className="!mt-4 !h-1 !overflow-hidden !rounded-full !bg-[#E8DED2] dark:!bg-[#292929]">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: `${
                          bookingTotal
                            ? Math.max((item.value / bookingTotal) * 100, 3)
                            : 0
                        }%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.9,
                        delay: index * 0.05,
                      }}
                      className={`!h-full !rounded-full ${item.color.replace(
                        "!text-",
                        "!bg-",
                      )}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* ===================================================
            PAYMENT ANALYTICS
        =================================================== */}

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="!mb-6 !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/90 dark:!bg-[#111111]/90 !p-5 sm:!p-6 !shadow-sm !backdrop-blur-xl"
        >
          <SectionHeader
            eyebrow="Payment Performance"
            title="Payment Analytics"
            icon={CreditCard}
          />

          <motion.div
            variants={containerVariants}
            className="!grid !grid-cols-1 !gap-3 sm:!grid-cols-2 lg:!grid-cols-4"
          >
            {paymentStatuses.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                  }}
                  className="!flex !items-center !gap-4 !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/40 dark:!bg-[#171717]/30 !p-4 !transition-all hover:!shadow-lg"
                >
                  <div
                    className={`!flex !h-12 !w-12 !shrink-0 !items-center !justify-center !rounded-xl ${item.bg} ${item.color}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="!text-2xl !font-black">
                      <AnimatedNumber value={item.value} />
                    </p>

                    <p className="!mt-0.5 !text-[10px] !font-bold !text-[#74656A] dark:!text-[#777777]">
                      {item.label}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className={`!ml-auto !opacity-0 !transition-all group-hover:!opacity-100 ${item.color}`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* ===================================================
            BOOKING TREND
        =================================================== */}

        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="!mb-6 !rounded-3xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/90 dark:!bg-[#111111]/90 !p-5 sm:!p-6 !shadow-sm !backdrop-blur-xl"
        >
          <SectionHeader
            eyebrow="Recent Activity"
            title="Booking Trend"
            icon={TrendingUp}
          />

          {bookingTrend.length === 0 ? (
            <div className="!rounded-2xl !border !border-dashed !border-[#E8DED2] dark:!border-[#292929] !p-10 !text-center">
              <CalendarDays
                size={30}
                className="!mx-auto !mb-3 !text-[#D4AF37]"
              />

              <p className="!text-sm !font-bold">No recent booking activity</p>

              <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#777777]">
                Booking activity from the last 7 days will appear here.
              </p>
            </div>
          ) : (
            <div className="!space-y-5">
              {bookingTrend.map((item, index) => {
                const percentage =
                  bookingTotal > 0
                    ? Math.max((item.bookings / bookingTotal) * 100, 4)
                    : 0;

                return (
                  <motion.div
                    key={item._id}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                  >
                    <div className="!mb-2.5 !flex !items-center !justify-between !gap-4">
                      <div className="!flex !items-center !gap-3">
                        <div className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg !bg-[#D4AF37]/10 !text-[#D4AF37]">
                          <CalendarDays size={14} />
                        </div>

                        <span className="!text-xs !font-bold">
                          {new Date(item._id).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      </div>

                      <span className="!text-xs !font-black !text-[#D4AF37]">
                        {item.bookings}{" "}
                        {item.bookings === 1 ? "booking" : "bookings"}
                      </span>
                    </div>

                    <div className="!relative !h-3 !overflow-hidden !rounded-full !bg-[#E8DED2] dark:!bg-[#292929]">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: `${percentage}%`,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1,
                          delay: index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="!relative !h-full !rounded-full !bg-gradient-to-r !from-[#8F6320] !via-[#D4AF37] !to-[#E8D17A] !shadow-lg !shadow-[#D4AF37]/20"
                      >
                        <motion.div
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="!absolute !inset-y-0 !w-20 !bg-white/30 !blur-md"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ===================================================
            FOOTER INFO
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="!flex !items-start !gap-3 !rounded-2xl !border !border-[#D4AF37]/20 !bg-gradient-to-r !from-[#D4AF37]/5 !to-[#4A1D2F]/5 !p-4 !backdrop-blur-xl"
        >
          <Activity size={18} className="!mt-0.5 !shrink-0 !text-[#D4AF37]" />

          <p className="!text-xs !leading-relaxed !text-[#74656A] dark:!text-[#777777]">
            Reports are generated from the current booking, payment, customer
            and room data stored in the hostel management system.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({ eyebrow, title, icon: Icon }) => {
  return (
    <div className="!mb-6 !flex !items-start !justify-between !gap-4">
      <div>
        <p className="!text-[10px] !font-black !uppercase !tracking-[0.15em] !text-[#74656A] dark:!text-[#777777]">
          {eyebrow}
        </p>

        <h2 className="!mt-1 !text-xl !font-black">{title}</h2>
      </div>

      <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !border !border-[#D4AF37]/20 !bg-[#D4AF37]/10 !text-[#D4AF37]">
        <Icon size={19} />
      </div>
    </div>
  );
};

/* =========================================================
   REPORT CARD
========================================================= */

const ReportCard = ({ title, value, description, icon: Icon, accent }) => {
  const accentStyles = {
    gold: {
      icon: "!text-[#D4AF37]",
      bg: "!bg-[#D4AF37]/10",
      border: "hover:!border-[#D4AF37]/40",
      glow: "!bg-[#D4AF37]/10",
      gradient: "!from-[#D4AF37]/15 !to-transparent",
    },

    blue: {
      icon: "!text-blue-500",
      bg: "!bg-blue-500/10",
      border: "hover:!border-blue-500/30",
      glow: "!bg-blue-500/10",
      gradient: "!from-blue-500/10 !to-transparent",
    },

    purple: {
      icon: "!text-violet-500",
      bg: "!bg-violet-500/10",
      border: "hover:!border-violet-500/30",
      glow: "!bg-violet-500/10",
      gradient: "!from-violet-500/10 !to-transparent",
    },

    green: {
      icon: "!text-emerald-500",
      bg: "!bg-emerald-500/10",
      border: "hover:!border-emerald-500/30",
      glow: "!bg-emerald-500/10",
      gradient: "!from-emerald-500/10 !to-transparent",
    },
  };

  const style = accentStyles[accent] || accentStyles.gold;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className={`!group !relative !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white/90 dark:!bg-[#111111]/90 !p-5 !shadow-sm !backdrop-blur-xl !transition-all ${style.border}`}
    >
      {/* Gradient glow */}

      <div
        className={`!pointer-events-none !absolute !-right-16 !-top-16 !h-40 !w-40 !rounded-full !bg-gradient-to-br ${style.gradient} !blur-[60px] !transition-all !duration-500 group-hover:!scale-125`}
      />

      <div className="!relative !z-10 !flex !items-start !justify-between !gap-4">
        <div className="!min-w-0">
          <p className="!text-[10px] !font-bold !uppercase !tracking-[0.12em] !text-[#74656A] dark:!text-[#777777]">
            {title}
          </p>

          <h3 className="!mt-2 !truncate !text-2xl sm:!text-3xl !font-black !tracking-tight">
            {value}
          </h3>

          <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#666666]">
            {description}
          </p>
        </div>

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.1,
          }}
          className={`!flex !h-12 !w-12 !shrink-0 !items-center !justify-center !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] ${style.bg} ${style.icon}`}
        >
          <Icon size={21} />
        </motion.div>
      </div>

      {/* Bottom accent */}

      <div className="!absolute !bottom-0 !left-0 !h-[2px] !w-0 !bg-gradient-to-r !from-[#D4AF37] !to-transparent !transition-all !duration-500 group-hover:!w-full" />
    </motion.div>
  );
};

/* =========================================================
   OCCUPANCY RING
========================================================= */

const OccupancyRing = ({ percentage = 0 }) => {
  const safePercentage = Math.min(Math.max(Number(percentage) || 0, 0), 100);

  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="!relative !h-36 !w-36 !shrink-0">
      <svg viewBox="0 0 120 120" className="!h-full !w-full !-rotate-90">
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          className="!text-[#E8DED2] dark:!text-[#292929]"
        />

        <motion.circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="url(#occupancyGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{
            strokeDashoffset: circumference,
          }}
          whileInView={{
            strokeDashoffset: offset,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          strokeDasharray={circumference}
        />

        <defs>
          <linearGradient
            id="occupancyGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8F6320" />

            <stop offset="50%" stopColor="#D4AF37" />

            <stop offset="100%" stopColor="#E8D17A" />
          </linearGradient>
        </defs>
      </svg>

      <div className="!absolute !inset-0 !flex !flex-col !items-center !justify-center">
        <p className="!text-2xl !font-black">
          <AnimatedNumber value={safePercentage} suffix="%" decimals={1} />
        </p>

        <p className="!mt-0.5 !text-[9px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
          Occupied
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   MINI STAT
========================================================= */

const MiniStat = ({
  label,
  value,
  accent = "!text-[#2B1720] dark:!text-white",
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      className="!rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4]/60 dark:!bg-[#171717]/40 !p-3 !transition-all"
    >
      <p className="!text-[9px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
        {label}
      </p>

      <p className={`!mt-1 !text-lg !font-black ${accent}`}>{value}</p>
    </motion.div>
  );
};

export default ManageReports;
