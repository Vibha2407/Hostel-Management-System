import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Search,
  ReceiptText,
  IndianRupee,
  Clock3,
  CheckCircle2,
  Eye,
  Download,
  X,
  User,
  Phone,
  BedDouble,
  CalendarDays,
  Users,
  CreditCard,
  MapPin,
  ArrowLeft,
  Sparkles,
  FileText,
  WalletCards,
  ArrowUpRight,
  ShieldCheck,
  Hash,
} from "lucide-react";

import { getMyBookings } from "../../services/bookingService";
import ReceiptPDF from "../../components/booking/ReceiptPDF";
import { formatDate } from "../../utils/formatDate";

/* =========================================================
   ANIMATION CONFIG
========================================================= */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   RECEIPT
========================================================= */

const Receipt = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  /* =========================================================
     FETCH RECEIPTS
  ========================================================= */

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setLoading(true);

        const data = await getMyBookings();

        setBookings(data?.bookings || []);
      } catch (error) {
        console.error("Failed to fetch receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeReceipt = () => {
    setSelectedBooking(null);
  };

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeReceipt();
      }
    };

    if (selectedBooking) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedBooking]);

  /* =========================================================
     STATS
  ========================================================= */

  const paidAmount = bookings.reduce((total, booking) => {
    if (booking.paymentStatus === "Paid") {
      return total + Number(booking.totalAmount || 0);
    }

    return total;
  }, 0);

  const pendingAmount = bookings.reduce((total, booking) => {
    if (booking.paymentStatus !== "Paid") {
      return total + Number(booking.totalAmount || 0);
    }

    return total;
  }, 0);

  const totalAmount = bookings.reduce(
    (total, booking) => total + Number(booking.totalAmount || 0),
    0,
  );

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const receiptNumber = `HH-${booking._id?.slice(-6).toUpperCase()}`;

      const roomNumber = String(booking.room?.roomNumber || "");

      const matchesSearch =
        !normalizedSearch ||
        receiptNumber.toLowerCase().includes(normalizedSearch) ||
        roomNumber.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || booking.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  /* =========================================================
     PAYMENT STATUS
  ========================================================= */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return {
          wrapper:
            "!border-[var(--color-success-border)] !bg-[var(--color-success-soft)] !text-[var(--color-success)]",
          icon: <CheckCircle2 size={13} />,
        };

      case "Pending":
        return {
          wrapper:
            "!border-[var(--color-warning-border)] !bg-[var(--color-warning-soft)] !text-[var(--color-warning)]",
          icon: <Clock3 size={13} />,
        };

      case "Failed":
        return {
          wrapper:
            "!border-[var(--color-danger-border)] !bg-[var(--color-danger-soft)] !text-[var(--color-danger)]",
          icon: <X size={13} />,
        };

      default:
        return {
          wrapper:
            "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !text-[var(--color-text-secondary)]",
          icon: <CreditCard size={13} />,
        };
    }
  };

  /* =========================================================
     BOOKING STATUS
  ========================================================= */

  const getBookingStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "!border-[var(--color-success-border)] !bg-[var(--color-success-soft)] !text-[var(--color-success)]";

      case "Checked-In":
        return "!border-[var(--color-info-border)] !bg-[var(--color-info-soft)] !text-[var(--color-info)]";

      case "Checked-Out":
        return "!border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.07] !text-[var(--color-primary)]";

      case "Cancelled":
        return "!border-[var(--color-danger-border)] !bg-[var(--color-danger-soft)] !text-[var(--color-danger)]";

      default:
        return "!border-[var(--color-warning-border)] !bg-[var(--color-warning-soft)] !text-[var(--color-warning)]";
    }
  };

  return (
    <section
      className="
        !relative
        !min-h-screen
        !overflow-hidden
        !bg-[var(--color-background)]
        !text-[var(--color-text-primary)]
        !transition-colors
        !duration-500
      "
    >
      {/* =====================================================
          PREMIUM AMBIENT BACKGROUND
      ====================================================== */}

      <div className="!pointer-events-none !absolute !inset-0 !overflow-hidden">
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute
            !-right-48
            !-top-48
            !h-[600px]
            !w-[600px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.075]
            !blur-[130px]
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute
            !-left-48
            !top-[42%]
            !h-[500px]
            !w-[500px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.045]
            !blur-[120px]
          "
        />

        <div
          className="
            !absolute
            !inset-0
            !bg-[radial-gradient(circle_at_80%_0%,var(--color-primary-soft),transparent_34%)]
          "
        />

        <div
          className="
            !absolute
            !inset-0
            !opacity-[0.018]
            !bg-[linear-gradient(var(--color-text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)_1px,transparent_1px)]
            !bg-[size:52px_52px]
          "
        />
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div
        className="
          !relative
          !z-10
          !mx-auto
          !max-w-7xl
          !px-4
          !py-6
          sm:!px-6
          sm:!py-9
          lg:!px-8
          lg:!py-12
        "
      >
        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
          className="
            !group
            !mb-8
            !inline-flex
            !items-center
            !gap-2
            !rounded-xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]/75
            !px-3.5
            !py-2.5
            !text-xs
            !font-semibold
            !text-[var(--color-text-secondary)]
            !shadow-[var(--shadow-soft)]
            !backdrop-blur-xl
            !transition-all
            !duration-300
            hover:!border-[var(--color-primary)]/35
            hover:!bg-[var(--color-primary)]/[0.05]
            hover:!text-[var(--color-primary)]
            hover:!shadow-[var(--shadow-glow)]
          "
        >
          <ArrowLeft
            size={15}
            className="
              !transition-transform
              !duration-300
              group-hover:!-translate-x-1
            "
          />

          <span>Back</span>
        </motion.button>

        {/* =================================================
            HERO HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mb-10"
        >
          <div className="!mb-5 !flex !flex-wrap !items-center !gap-2">
            <div
              className="
                !inline-flex
                !items-center
                !gap-2
                !rounded-full
                !border
                !border-[var(--color-primary)]/20
                !bg-gradient-to-r
                !from-[var(--color-primary)]/[0.10]
                !to-[var(--color-primary)]/[0.035]
                !px-3
                !py-1.5
                !shadow-[var(--shadow-soft)]
              "
            >
              <Sparkles size={12} className="!text-[var(--color-primary)]" />

              <span
                className="
                  !text-[9px]
                  !font-bold
                  !uppercase
                  !tracking-[0.25em]
                  !text-[var(--color-primary)]
                "
              >
                Your Transactions
              </span>
            </div>

            <div
              className="
                !inline-flex
                !items-center
                !gap-1.5
                !rounded-full
                !border
                !border-[var(--color-success-border)]
                !bg-[var(--color-success-soft)]
                !px-3
                !py-1.5
                !text-[9px]
                !font-semibold
                !uppercase
                !tracking-wider
                !text-[var(--color-success)]
              "
            >
              <ShieldCheck size={12} />
              Secure Records
            </div>
          </div>

          <div
            className="
              !flex
              !flex-col
              !gap-6
              lg:!flex-row
              lg:!items-end
              lg:!justify-between
            "
          >
            <div>
              <h1
                className="
                  !bg-gradient-to-r
                  !from-[var(--color-text-primary)]
                  !via-[var(--color-text-primary)]
                  !to-[var(--color-primary)]
                  !bg-clip-text
                  !text-4xl
                  !font-bold
                  !tracking-[-0.045em]
                  !text-transparent
                  sm:!text-5xl
                  lg:!text-6xl
                "
              >
                Receipts
              </h1>

              <p
                className="
                  !mt-4
                  !max-w-2xl
                  !text-sm
                  !leading-6
                  !text-[var(--color-text-secondary)]
                  sm:!text-base
                "
              >
                Your payments, booking transactions and official receipts —
                beautifully organized in one secure place.
              </p>
            </div>

            <motion.div
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              className="
                !group
                !relative
                !w-fit
                !overflow-hidden
                !rounded-2xl
                !border
                !border-[var(--color-primary)]/20
                !bg-gradient-to-br
                !from-[var(--color-surface)]
                !to-[var(--color-primary)]/[0.045]
                !px-5
                !py-3.5
                !shadow-[var(--shadow-soft)]
                !backdrop-blur-xl
              "
            >
              <div
                className="
                  !absolute
                  !inset-x-0
                  !top-0
                  !h-px
                  !bg-gradient-to-r
                  !from-transparent
                  !via-[var(--color-primary)]
                  !to-transparent
                "
              />

              <div className="!relative !flex !items-center !gap-3">
                <div
                  className="
                    !flex
                    !h-9
                    !w-9
                    !items-center
                    !justify-center
                    !rounded-xl
                    !bg-[var(--color-primary)]/[0.08]
                    !text-[var(--color-primary)]
                  "
                >
                  <ReceiptText size={16} />
                </div>

                <div>
                  <p className="!text-[9px] !uppercase !tracking-[0.16em] !text-[var(--color-text-muted)]">
                    Total Receipts
                  </p>

                  <p className="!mt-0.5 !text-sm !font-bold !text-[var(--color-text-primary)]">
                    {bookings.length}{" "}
                    {bookings.length === 1 ? "Receipt" : "Receipts"}
                  </p>
                </div>

                <ArrowUpRight
                  size={14}
                  className="
                    !ml-2
                    !text-[var(--color-primary)]
                    !transition-transform
                    !duration-300
                    group-hover:!translate-x-0.5
                    group-hover:!-translate-y-0.5
                  "
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* =================================================
            STATS
        ================================================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
            !mb-8
            !grid
            !grid-cols-1
            !gap-4
            sm:!grid-cols-2
            lg:!grid-cols-3
          "
        >
          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Paid"
            value={`₹${paidAmount.toLocaleString("en-IN")}`}
            description="Total amount successfully paid"
            accent="success"
            variants={itemVariants}
          />

          <StatCard
            icon={<Clock3 size={19} />}
            label="Pending"
            value={`₹${pendingAmount.toLocaleString("en-IN")}`}
            description="Amount awaiting payment"
            accent="warning"
            variants={itemVariants}
          />

          <StatCard
            icon={<WalletCards size={19} />}
            label="Total Value"
            value={`₹${totalAmount.toLocaleString("en-IN")}`}
            description="Combined booking transactions"
            accent="primary"
            variants={itemVariants}
          />
        </motion.div>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.55,
          }}
          className="
            !mb-7
            !flex
            !flex-col
            !gap-3
            sm:!flex-row
            sm:!items-center
          "
        >
          {/* SEARCH */}

          <div
            className="
              !group
              !relative
              !flex
              !min-h-13
              !flex-1
              !items-center
              !overflow-hidden
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface)]/80
              !shadow-[var(--shadow-soft)]
              !backdrop-blur-xl
              !transition-all
              !duration-300
              focus-within:!border-[var(--color-primary)]/40
              focus-within:!shadow-[var(--shadow-glow)]
            "
          >
            <div
              className="
                !absolute
                !left-0
                !top-0
                !h-full
                !w-px
                !bg-gradient-to-b
                !from-transparent
                !via-[var(--color-primary)]
                !to-transparent
                !opacity-0
                !transition-opacity
                group-focus-within:!opacity-100
              "
            />

            <Search
              size={17}
              className="
                !ml-4
                !shrink-0
                !text-[var(--color-text-muted)]
                !transition-colors
                group-focus-within:!text-[var(--color-primary)]
              "
            />

            <label htmlFor="receipt-search" className="!sr-only">
              Search receipts
            </label>

            <input
              id="receipt-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by receipt ID or room number..."
              className="
                !w-full
                !border-0
                !bg-transparent
                !px-3
                !py-4
                !text-sm
                !text-[var(--color-text-primary)]
                !outline-none
                placeholder:!text-[var(--color-text-muted)]
              "
            />
          </div>

          {/* FILTER */}

          <label className="!sr-only" htmlFor="receipt-status-filter">
            Filter receipts by payment status
          </label>

          <div className="!relative sm:!w-44">
            <select
              id="receipt-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="
                !min-h-13
                !w-full
                !cursor-pointer
                !appearance-none
                !rounded-2xl
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface)]
                !px-4
                !pr-10
                !text-sm
                !font-medium
                !text-[var(--color-text-primary)]
                !outline-none
                !shadow-[var(--shadow-soft)]
                !transition-all
                !duration-300
                focus:!border-[var(--color-primary)]/40
                focus:!shadow-[var(--shadow-glow)]
              "
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <div
              className="
                !pointer-events-none
                !absolute
                !right-4
                !top-1/2
                !-translate-y-1/2
                !text-[var(--color-text-muted)]
              "
            >
              <ArrowUpRight size={14} className="!rotate-45" />
            </div>
          </div>
        </motion.div>

        {/* =================================================
            RECEIPT TABLE / CARDS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          className="
            !relative
            !overflow-hidden
            !rounded-[1.75rem]
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]/85
            !shadow-[var(--shadow-card)]
            !backdrop-blur-2xl
          "
        >
          {/* PREMIUM TOP LINE */}

          <div
            className="
              !absolute
              !left-0
              !right-0
              !top-0
              !h-[2px]
              !bg-gradient-to-r
              !from-transparent
              !via-[var(--color-primary)]
              !to-transparent
            "
          />

          {/* TABLE */}

          <div className="!hidden !overflow-x-auto md:!block">
            <table className="!w-full">
              <thead>
                <tr className="!border-b !border-[var(--color-border)]">
                  <TableHeader>Reference</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader align="right">Amount</TableHeader>
                  <TableHeader align="right">Action</TableHeader>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <LoadingRow />
                ) : filteredBookings.length === 0 ? (
                  <EmptyRow />
                ) : (
                  filteredBookings.map((booking, index) => {
                    const receiptNumber = `HH-${booking._id
                      ?.slice(-6)
                      .toUpperCase()}`;

                    const statusStyle = getStatusStyle(booking.paymentStatus);

                    return (
                      <motion.tr
                        key={booking._id}
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.055,
                        }}
                        className="
                          !group
                          !relative
                          !border-b
                          !border-[var(--color-border)]
                          !transition-all
                          !duration-300
                          hover:!bg-[var(--color-primary)]/[0.025]
                        "
                      >
                        <td className="!px-6 !py-5">
                          <ReceiptReference receiptNumber={receiptNumber} />
                        </td>

                        <td className="!px-6 !py-5">
                          <p className="!text-sm !font-semibold !text-[var(--color-text-primary)]">
                            Hostel booking — Room{" "}
                            {booking.room?.roomNumber || "N/A"}
                          </p>

                          <p className="!mt-1 !text-xs !text-[var(--color-text-muted)]">
                            {booking.room?.roomType || "Room"} •{" "}
                            {booking.room?.sharingType || "N/A"}
                          </p>
                        </td>

                        <td className="!px-6 !py-5 !text-sm !text-[var(--color-text-secondary)]">
                          {formatDate(booking.createdAt)}
                        </td>

                        <td className="!px-6 !py-5">
                          <StatusBadge
                            status={booking.paymentStatus || "Pending"}
                            style={statusStyle}
                          />
                        </td>

                        <td className="!px-6 !py-5 !text-right">
                          <span
                            className="
                              !text-sm
                              !font-bold
                              !text-[var(--color-primary)]
                            "
                          >
                            ₹
                            {Number(booking.totalAmount || 0).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </td>

                        <td className="!px-6 !py-5">
                          <ReceiptActions
                            booking={booking}
                            onView={() => setSelectedBooking(booking)}
                          />
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="!block md:!hidden">
            {loading ? (
              <div className="!px-5 !py-20">
                <LoadingState />
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState />
            ) : (
              filteredBookings.map((booking, index) => {
                const receiptNumber = `HH-${booking._id
                  ?.slice(-6)
                  .toUpperCase()}`;

                const statusStyle = getStatusStyle(booking.paymentStatus);

                return (
                  <motion.article
                    key={booking._id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      !relative
                      !overflow-hidden
                      !border-b
                      !border-[var(--color-border)]
                      !p-5
                      last:!border-b-0
                    "
                  >
                    <div
                      className="
                        !pointer-events-none
                        !absolute
                        !-right-10
                        !-top-10
                        !h-36
                        !w-36
                        !rounded-full
                        !bg-[var(--color-primary)]/[0.055]
                        !blur-3xl
                      "
                    />

                    <div className="!relative">
                      <div className="!flex !items-start !justify-between !gap-3">
                        <ReceiptReference receiptNumber={receiptNumber} />

                        <StatusBadge
                          status={booking.paymentStatus || "Pending"}
                          style={statusStyle}
                          compact
                        />
                      </div>

                      <p className="!mt-5 !text-sm !font-semibold !text-[var(--color-text-primary)]">
                        Hostel booking — Room{" "}
                        {booking.room?.roomNumber || "N/A"}
                      </p>

                      <p className="!mt-1 !text-xs !text-[var(--color-text-muted)]">
                        {booking.room?.roomType || "Room"} •{" "}
                        {booking.room?.sharingType || "N/A"}
                      </p>

                      <div
                        className="
                          !mt-5
                          !grid
                          !grid-cols-2
                          !gap-3
                        "
                      >
                        <MobileInfo
                          icon={<BedDouble size={14} />}
                          label="Room"
                          value={booking.room?.roomNumber || "N/A"}
                        />

                        <MobileInfo
                          icon={<CalendarDays size={14} />}
                          label="Date"
                          value={formatDate(booking.createdAt)}
                        />

                        <MobileInfo
                          icon={<CreditCard size={14} />}
                          label="Payment"
                          value={booking.paymentStatus || "Pending"}
                        />

                        <MobileInfo
                          icon={<IndianRupee size={14} />}
                          label="Amount"
                          value={`₹${Number(
                            booking.totalAmount || 0,
                          ).toLocaleString("en-IN")}`}
                          highlight
                        />
                      </div>

                      <div className="!mt-5">
                        <ReceiptActions
                          booking={booking}
                          onView={() => setSelectedBooking(booking)}
                          mobile
                        />
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}

      <AnimatePresence>
        {selectedBooking && (
          <ReceiptModal
            booking={selectedBooking}
            onClose={closeReceipt}
            getStatusStyle={getStatusStyle}
            getBookingStatusStyle={getBookingStatusStyle}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({ icon, label, value, description, accent, variants }) => {
  const accentMap = {
    success: {
      icon: "!text-[var(--color-success)]",
      soft: "!bg-[var(--color-success-soft)]",
      border: "hover:!border-[var(--color-success-border)]",
      gradient: "!from-[var(--color-success)]/[0.12] !to-transparent",
    },

    warning: {
      icon: "!text-[var(--color-warning)]",
      soft: "!bg-[var(--color-warning-soft)]",
      border: "hover:!border-[var(--color-warning-border)]",
      gradient: "!from-[var(--color-warning)]/[0.12] !to-transparent",
    },

    primary: {
      icon: "!text-[var(--color-primary)]",
      soft: "!bg-[var(--color-primary)]/[0.07]",
      border: "hover:!border-[var(--color-primary)]/30",
      gradient: "!from-[var(--color-primary)]/[0.13] !to-transparent",
    },
  };

  const styles = accentMap[accent];

  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -6,
        scale: 1.012,
      }}
      className={`
        !group
        !relative
        !overflow-hidden
        !rounded-[1.4rem]
        !border
        !border-[var(--color-border)]
        !bg-gradient-to-br
        ${styles.gradient}
        !via-[var(--color-surface)]
        !p-5
        !shadow-[var(--shadow-soft)]
        !backdrop-blur-xl
        !transition-all
        !duration-500
        ${styles.border}
        hover:!shadow-[var(--shadow-card)]
      `}
    >
      <div
        className={`
          !absolute
          !-right-12
          !-top-12
          !h-36
          !w-36
          !rounded-full
          ${styles.soft}
          !blur-3xl
          !opacity-60
          !transition-all
          !duration-700
          group-hover:!scale-150
          group-hover:!opacity-90
        `}
      />

      <div
        className="
          !absolute
          !inset-x-5
          !top-0
          !h-px
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-primary)]/25
          !to-transparent
        "
      />

      <div className="!relative">
        <div className="!flex !items-center !justify-between">
          <span
            className="
              !text-[9px]
              !font-bold
              !uppercase
              !tracking-[0.2em]
              !text-[var(--color-text-muted)]
            "
          >
            {label}
          </span>

          <div
            className={`
              !flex
              !h-9
              !w-9
              !items-center
              !justify-center
              !rounded-xl
              ${styles.soft}
              ${styles.icon}
              !transition-transform
              !duration-500
              group-hover:!rotate-6
              group-hover:!scale-110
            `}
          >
            {icon}
          </div>
        </div>

        <p
          className="
            !mt-5
            !text-2xl
            !font-bold
            !tracking-[-0.025em]
            !text-[var(--color-text-primary)]
          "
        >
          {value}
        </p>

        <p className="!mt-1.5 !text-xs !text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

/* =========================================================
   TABLE HEADER
========================================================= */

const TableHeader = ({ children, align = "left" }) => {
  const alignment = align === "right" ? "!text-right" : "!text-left";

  return (
    <th
      className={`
        !px-6
        !py-4
        ${alignment}
        !text-[9px]
        !font-bold
        !uppercase
        !tracking-[0.18em]
        !text-[var(--color-text-muted)]
      `}
    >
      {children}
    </th>
  );
};

/* =========================================================
   RECEIPT REFERENCE
========================================================= */

const ReceiptReference = ({ receiptNumber }) => {
  return (
    <div className="!flex !min-w-0 !items-center !gap-3">
      <motion.div
        whileHover={{
          rotate: -4,
          scale: 1.05,
        }}
        className="
          !relative
          !flex
          !h-10
          !w-10
          !shrink-0
          !items-center
          !justify-center
          !overflow-hidden
          !rounded-xl
          !border
          !border-[var(--color-primary)]/20
          !bg-gradient-to-br
          !from-[var(--color-primary)]/[0.12]
          !to-[var(--color-primary)]/[0.025]
          !text-[var(--color-primary)]
          !shadow-[var(--shadow-soft)]
        "
      >
        <div
          className="
            !absolute
            !inset-0
            !bg-gradient-to-tr
            !from-transparent
            !via-[var(--color-primary)]/[0.08]
            !to-transparent
          "
        />

        <ReceiptText size={16} className="!relative !z-10" />
      </motion.div>

      <div className="!min-w-0">
        <p
          className="
            !font-mono
            !text-sm
            !font-bold
            !tracking-[0.06em]
            !text-[var(--color-text-primary)]
          "
        >
          {receiptNumber}
        </p>

        <p
          className="
            !mt-1
            !text-[8px]
            !font-semibold
            !uppercase
            !tracking-[0.16em]
            !text-[var(--color-text-muted)]
          "
        >
          Receipt Reference
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({ status, style, compact = false }) => {
  return (
    <span
      className={`
        !inline-flex
        !items-center
        !gap-1.5
        !rounded-full
        !border
        !font-semibold
        !shadow-[var(--shadow-soft)]
        ${
          compact ? "!px-2.5 !py-1.5 !text-[9px]" : "!px-3 !py-1.5 !text-[10px]"
        }
        ${style.wrapper}
      `}
    >
      {style.icon}

      {status}
    </span>
  );
};

/* =========================================================
   RECEIPT ACTIONS
========================================================= */

const ReceiptActions = ({ booking, onView, mobile = false }) => {
  return (
    <div
      className={`
        !flex
        !items-center
        !gap-2
        ${mobile ? "!w-full" : "!justify-end"}
      `}
    >
      {/* VIEW */}

      <motion.button
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={onView}
        aria-label={`View receipt for room ${
          booking.room?.roomNumber || "N/A"
        }`}
        className={`
          !group
          !relative
          !flex
          !items-center
          !justify-center
          !gap-2
          !overflow-hidden
          !rounded-xl
          !border
          !border-[var(--color-border)]
          !bg-[var(--color-surface-secondary)]
          !px-3.5
          !py-2.5
          !text-xs
          !font-semibold
          !text-[#17130A]
          !shadow-[var(--shadow-soft)]
          !transition-all
          !duration-300
          hover:!border-[var(--color-primary)]/35
          hover:!bg-[var(--color-primary)]/[0.05]
          hover:!text-[var(--color-primary)]
          hover:!shadow-[var(--shadow-glow)]
          ${mobile ? "!flex-1" : ""}
        `}
      >
        <Eye
          size={14}
          className="
            !transition-transform
            !duration-300
            group-hover:!scale-110
          "
        />

        <span>View</span>
      </motion.button>

      {/* DOWNLOAD */}

      <PDFDownloadLink
        document={<ReceiptPDF booking={booking} />}
        fileName={`HostelHub-Receipt-${booking.room?.roomNumber || "ROOM"}.pdf`}
        className={mobile ? "!flex-1" : ""}
      >
        {({ loading }) => (
          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            disabled={loading}
            aria-label={
              loading ? "Preparing receipt PDF" : "Download receipt PDF"
            }
            title={loading ? "Preparing PDF..." : "Download Receipt"}
            className={`
              !group
              !relative
              !flex
              !items-center
              !justify-center
              !gap-2
              !overflow-hidden
              !rounded-xl
              !border
              !border-[var(--color-primary)]/20
              !bg-gradient-to-br
              !from-[var(--color-primary)]/[0.10]
              !to-[var(--color-primary)]/[0.035]
              !px-3.5
              !py-2.5
              !text-xs
              !font-semibold
              !text-[var(--color-primary)]
              !shadow-[var(--shadow-soft)]
              !transition-all
              !duration-300
              hover:!border-[var(--color-primary)]/40
              hover:!shadow-[var(--shadow-glow)]
              ${mobile ? "!w-full" : ""}
            `}
          >
            {/* SHINE */}

            <span
              className="
                !pointer-events-none
                !absolute
                !inset-y-[-20%]
                !-left-12
                !w-8
                !rotate-12
                !bg-[var(--color-surface)]/50
                !blur-sm
                !transition-all
                !duration-700
                group-hover:!left-[130%]
              "
            />

            <Download
              size={14}
              className="
                !relative
                !z-10
                !transition-transform
                !duration-300
                group-hover:!translate-y-[-1px]
              "
            />

            {mobile && (
              <span className="!relative !z-10">
                {loading ? "Preparing..." : "Download"}
              </span>
            )}
          </motion.button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

/* =========================================================
   MOBILE INFO
========================================================= */

const MobileInfo = ({ icon, label, value, highlight = false }) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className={`
        !relative
        !overflow-hidden
        !rounded-xl
        !border
        !p-3
        !transition-all
        !duration-300
        ${
          highlight
            ? "!border-[var(--color-primary)]/20 !bg-gradient-to-br !from-[var(--color-primary)]/[0.09] !to-transparent"
            : "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)]"
        }
      `}
    >
      <div className="!mb-2 !flex !items-center !gap-1.5">
        <span className="!text-[var(--color-primary)]">{icon}</span>

        <span
          className="
            !text-[8px]
            !font-bold
            !uppercase
            !tracking-[0.13em]
            !text-[var(--color-text-muted)]
          "
        >
          {label}
        </span>
      </div>

      <p
        className={`
          !truncate
          !text-xs
          !font-bold
          ${
            highlight
              ? "!text-[var(--color-primary)]"
              : "!text-[var(--color-text-primary)]"
          }
        `}
      >
        {value}
      </p>
    </motion.div>
  );
};

/* =========================================================
   LOADING STATE
========================================================= */

const LoadingState = () => {
  return (
    <div className="!flex !flex-col !items-center !justify-center">
      <div className="!relative !h-11 !w-11">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            !absolute
            !inset-0
            !rounded-full
            !border-2
            !border-[var(--color-border)]
            !border-t-[var(--color-primary)]
          "
        />

        <div
          className="
            !absolute
            !inset-2
            !rounded-full
            !bg-[var(--color-primary)]/[0.06]
          "
        >
          <ReceiptText
            size={15}
            className="
              !absolute
              !left-1/2
              !top-1/2
              !-translate-x-1/2
              !-translate-y-1/2
              !text-[var(--color-primary)]
            "
          />
        </div>
      </div>

      <p className="!mt-4 !text-sm !font-medium !text-[var(--color-text-muted)]">
        Loading your receipts...
      </p>
    </div>
  );
};

/* =========================================================
   LOADING ROW
========================================================= */

const LoadingRow = () => {
  return (
    <tr>
      <td colSpan="6" className="!px-6 !py-20">
        <LoadingState />
      </td>
    </tr>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = () => {
  return (
    <div className="!px-5 !py-20 !text-center">
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="
          !mx-auto
          !flex
          !h-16
          !w-16
          !items-center
          !justify-center
          !rounded-2xl
          !border
          !border-[var(--color-border)]
          !bg-gradient-to-br
          !from-[var(--color-primary)]/[0.08]
          !to-transparent
          !text-[var(--color-text-muted)]
        "
      >
        <FileText size={25} />
      </motion.div>

      <p className="!mt-5 !text-sm !font-bold !text-[var(--color-text-primary)]">
        No receipts found
      </p>

      <p className="!mx-auto !mt-1.5 !max-w-xs !text-xs !leading-5 !text-[var(--color-text-muted)]">
        Try changing your search term or payment filter.
      </p>
    </div>
  );
};

/* =========================================================
   EMPTY ROW
========================================================= */

const EmptyRow = () => {
  return (
    <tr>
      <td colSpan="6" className="!px-6 !py-20">
        <EmptyState />
      </td>
    </tr>
  );
};

/* =========================================================
   RECEIPT MODAL
========================================================= */

const ReceiptModal = ({
  booking,
  onClose,
  getStatusStyle,
  getBookingStatusStyle,
}) => {
  const statusStyle = getStatusStyle(booking.paymentStatus);

  const receiptNumber = `HH-${booking._id?.slice(-6).toUpperCase()}`;

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
      className="
        !fixed
        !inset-0
        !z-[999]
        !flex
        !items-center
        !justify-center
        !bg-[var(--color-overlay)]
        !p-3
        !backdrop-blur-lg
        sm:!p-5
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-modal-title"
    >
      {/* BACKDROP */}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-label="Close receipt"
        className="
          !absolute
          !inset-0
          !cursor-default
          !border-0
          !bg-transparent
        "
      />

      {/* MODAL */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 35,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={(event) => event.stopPropagation()}
        className="
          !relative
          !z-10
          !max-h-[94vh]
          !w-full
          !max-w-3xl
          !overflow-hidden
          !rounded-[2rem]
          !border
          !border-[var(--color-border)]
          !bg-[var(--color-surface)]
          !shadow-[var(--shadow-modal)]
        "
      >
        {/* TOP GRADIENT */}

        <div
          className="
            !absolute
            !left-0
            !right-0
            !top-0
            !h-[2px]
            !bg-gradient-to-r
            !from-transparent
            !via-[var(--color-primary)]
            !to-transparent
          "
        />

        {/* GLOW */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !pointer-events-none
            !absolute
            !-right-36
            !-top-36
            !h-96
            !w-96
            !rounded-full
            !bg-[var(--color-primary)]/[0.08]
            !blur-[110px]
          "
        />

        <div
          className="
            !pointer-events-none
            !absolute
            !-bottom-32
            !-left-24
            !h-72
            !w-72
            !rounded-full
            !bg-[var(--color-primary)]/[0.045]
            !blur-[100px]
          "
        />

        {/* CLOSE */}

        <motion.button
          whileHover={{
            rotate: 90,
            scale: 1.06,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={onClose}
          aria-label="Close receipt details"
          className="
            !absolute
            !right-4
            !top-4
            !z-30
            !flex
            !h-10
            !w-10
            !items-center
            !justify-center
            !rounded-xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]/90
            !text-[var(--color-text-secondary)]
            !shadow-[var(--shadow-soft)]
            !backdrop-blur-xl
            !transition-all
            !duration-300
            hover:!border-[var(--color-primary)]/35
            hover:!bg-[var(--color-primary)]/[0.05]
            hover:!text-[var(--color-primary)]
          "
        >
          <X size={17} />
        </motion.button>

        {/* SCROLL */}

        <div className="!relative !max-h-[94vh] !overflow-y-auto">
          <div className="!p-5 sm:!p-8 lg:!p-10">
            {/* =================================================
                HEADER
            ================================================== */}

            <div className="!text-center">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.65,
                  rotate: -8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  !relative
                  !mx-auto
                  !mb-5
                  !flex
                  !h-[68px]
                  !w-[68px]
                  !items-center
                  !justify-center
                  !overflow-hidden
                  !rounded-[1.35rem]
                  !border
                  !border-[var(--color-primary)]/25
                  !bg-gradient-to-br
                  !from-[var(--color-primary)]/[0.15]
                  !via-[var(--color-primary)]/[0.07]
                  !to-transparent
                  !text-[var(--color-primary)]
                  !shadow-[var(--shadow-glow)]
                "
              >
                <motion.div
                  animate={{
                    x: ["-130%", "130%"],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="
                    !absolute
                    !inset-y-[-30%]
                    !w-5
                    !rotate-12
                    !bg-[var(--color-surface)]/50
                    !blur-sm
                  "
                />

                <ReceiptText size={28} className="!relative !z-10" />
              </motion.div>

              <p
                className="
                  !text-[9px]
                  !font-bold
                  !uppercase
                  !tracking-[0.35em]
                  !text-[var(--color-primary)]
                "
              >
                HostelHub
              </p>

              <h2
                id="receipt-modal-title"
                className="
                  !mt-2
                  !bg-gradient-to-r
                  !from-[var(--color-text-primary)]
                  !to-[var(--color-primary)]
                  !bg-clip-text
                  !text-2xl
                  !font-bold
                  !tracking-[-0.035em]
                  !text-transparent
                  sm:!text-3xl
                "
              >
                Booking Receipt
              </h2>

              <p className="!mt-2 !text-xs !text-[var(--color-text-secondary)] sm:!text-sm">
                Official booking transaction receipt
              </p>

              {/* RECEIPT ID */}

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="
                  !mt-5
                  !inline-flex
                  !items-center
                  !gap-2.5
                  !rounded-full
                  !border
                  !border-[var(--color-primary)]/20
                  !bg-gradient-to-r
                  !from-[var(--color-primary)]/[0.09]
                  !to-transparent
                  !px-4
                  !py-2.5
                  !shadow-[var(--shadow-soft)]
                "
              >
                <Hash size={12} className="!text-[var(--color-primary)]" />

                <span
                  className="
                    !font-mono
                    !text-[11px]
                    !font-bold
                    !tracking-[0.08em]
                    !text-[var(--color-primary)]
                  "
                >
                  {receiptNumber}
                </span>
              </motion.div>
            </div>

            {/* DIVIDER */}

            <div className="!my-8 !flex !items-center !gap-3">
              <div className="!h-px !flex-1 !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/25 !to-transparent" />

              <div
                className="
                  !h-1.5
                  !w-1.5
                  !rounded-full
                  !bg-[var(--color-primary)]
                  !shadow-[var(--shadow-glow)]
                "
              />

              <div className="!h-px !flex-1 !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/25 !to-transparent" />
            </div>

            {/* =================================================
                PAYMENT STATUS
            ================================================== */}

            <motion.div
              whileHover={{
                y: -2,
              }}
              className="
                !relative
                !overflow-hidden
                !rounded-2xl
                !border
                !border-[var(--color-border)]
                !bg-gradient-to-br
                !from-[var(--color-surface-secondary)]
                !to-[var(--color-primary)]/[0.025]
                !p-4
                !shadow-[var(--shadow-soft)]
              "
            >
              <div
                className="
                  !absolute
                  !left-0
                  !top-0
                  !h-full
                  !w-[2px]
                  !bg-gradient-to-b
                  !from-[var(--color-primary)]
                  !to-transparent
                "
              />

              <div className="!relative !flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
                <div className="!flex !items-center !gap-3">
                  <div
                    className="
                      !flex
                      !h-10
                      !w-10
                      !items-center
                      !justify-center
                      !rounded-xl
                      !bg-[var(--color-primary)]/[0.08]
                      !text-[var(--color-primary)]
                    "
                  >
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <p className="!text-[8px] !font-bold !uppercase !tracking-[0.2em] !text-[var(--color-text-muted)]">
                      Payment Status
                    </p>

                    <p className="!mt-1 !text-sm !font-bold !text-[var(--color-text-primary)]">
                      {booking.paymentStatus || "Pending"}
                    </p>
                  </div>
                </div>

                <StatusBadge
                  status={booking.paymentStatus || "Pending"}
                  style={statusStyle}
                  compact
                />
              </div>
            </motion.div>

            {/* CUSTOMER */}

            <ReceiptSection
              icon={<User size={15} />}
              title="Customer"
              subtitle="Guest information"
            >
              <div className="!grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
                <DetailCard
                  icon={<User size={14} />}
                  label="Customer Name"
                  value={booking.user?.fullName || "NA"}
                />

                <DetailCard
                  icon={<Phone size={14} />}
                  label="Phone"
                  value={booking.user?.phone || "NA"}
                />
              </div>
            </ReceiptSection>

            {/* BOOKING */}

            <ReceiptSection
              icon={<BedDouble size={15} />}
              title="Booking Details"
              subtitle="Stay information"
            >
              <div className="!grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
                <DetailCard
                  icon={<BedDouble size={14} />}
                  label="Room"
                  value={`Room ${booking.room?.roomNumber || "N/A"}`}
                />

                <DetailCard
                  icon={<Users size={14} />}
                  label="Guests"
                  value={`${booking.numberOfGuests || 0} ${
                    booking.numberOfGuests === 1 ? "Guest" : "Guests"
                  }`}
                />

                <DetailCard
                  icon={<CalendarDays size={14} />}
                  label="Check In"
                  value={formatDate(booking.checkInDate)}
                />

                <DetailCard
                  icon={<Clock3 size={14} />}
                  label="Check Out"
                  value={formatDate(booking.checkOutDate)}
                />

                <DetailCard
                  icon={<ReceiptText size={14} />}
                  label="Room Type"
                  value={booking.room?.roomType || "N/A"}
                />

                <DetailCard
                  icon={<Users size={14} />}
                  label="Sharing"
                  value={booking.room?.sharingType || "N/A"}
                />
              </div>
            </ReceiptSection>

            {/* HOSTEL */}

            {booking.room?.hostel && (
              <ReceiptSection
                icon={<MapPin size={15} />}
                title="Hostel"
                subtitle="Property information"
              >
                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    !relative
                    !overflow-hidden
                    !rounded-2xl
                    !border
                    !border-[var(--color-border)]
                    !bg-gradient-to-br
                    !from-[var(--color-surface-secondary)]
                    !to-[var(--color-primary)]/[0.025]
                    !p-4
                    !shadow-[var(--shadow-soft)]
                  "
                >
                  <div
                    className="
                      !absolute
                      !right-0
                      !top-0
                      !h-24
                      !w-24
                      !rounded-full
                      !bg-[var(--color-primary)]/[0.05]
                      !blur-2xl
                    "
                  />

                  <div className="!relative !flex !items-start !gap-3">
                    <div
                      className="
                        !flex
                        !h-9
                        !w-9
                        !shrink-0
                        !items-center
                        !justify-center
                        !rounded-xl
                        !bg-[var(--color-primary)]/[0.08]
                        !text-[var(--color-primary)]
                      "
                    >
                      <MapPin size={16} />
                    </div>

                    <div>
                      <p className="!text-sm !font-bold !text-[var(--color-text-primary)]">
                        {booking.room.hostel.name || "HostelHub"}
                      </p>

                      {booking.room.hostel.address && (
                        <p className="!mt-1 !text-xs !leading-5 !text-[var(--color-text-secondary)]">
                          {booking.room.hostel.address}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ReceiptSection>
            )}

            {/* RESERVATION STATUS */}

            <ReceiptSection
              icon={<ReceiptText size={15} />}
              title="Reservation Status"
              subtitle="Current booking state"
            >
              <motion.div
                whileHover={{
                  y: -2,
                }}
                className="
                  !flex
                  !flex-col
                  !gap-3
                  !rounded-2xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !p-4
                  sm:!flex-row
                  sm:!items-center
                  sm:!justify-between
                "
              >
                <div>
                  <p className="!text-[8px] !font-bold !uppercase !tracking-[0.17em] !text-[var(--color-text-muted)]">
                    Booking
                  </p>

                  <p className="!mt-1 !text-xs !font-medium !text-[var(--color-text-primary)]">
                    Reservation status
                  </p>
                </div>

                <span
                  className={`
                    !w-fit
                    !rounded-full
                    !border
                    !px-3
                    !py-1.5
                    !text-[9px]
                    !font-bold
                    ${getBookingStatusStyle(booking.bookingStatus)}
                  `}
                >
                  {booking.bookingStatus || "Pending"}
                </span>
              </motion.div>
            </ReceiptSection>

            {/* TOTAL */}

            <motion.div
              whileHover={{
                scale: 1.012,
                y: -2,
              }}
              className="
                !relative
                !mt-8
                !overflow-hidden
                !rounded-[1.5rem]
                !border
                !border-[var(--color-primary)]/25
                !bg-gradient-to-br
                !from-[var(--color-primary)]/[0.13]
                !via-[var(--color-primary)]/[0.045]
                !to-transparent
                !p-5
                !shadow-[var(--shadow-soft)]
              "
            >
              <motion.div
                animate={{
                  x: [0, 30, 0],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  !pointer-events-none
                  !absolute
                  !-right-16
                  !-top-16
                  !h-40
                  !w-40
                  !rounded-full
                  !bg-[var(--color-primary)]/[0.10]
                  !blur-3xl
                "
              />

              <div className="!relative !flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
                <div>
                  <p
                    className="
                      !text-[9px]
                      !font-bold
                      !uppercase
                      !tracking-[0.22em]
                      !text-[var(--color-text-muted)]
                    "
                  >
                    Total Amount
                  </p>

                  <p className="!mt-1.5 !text-xs !text-[var(--color-text-secondary)]">
                    Final booking amount
                  </p>
                </div>

                <p
                  className="
                    !bg-gradient-to-r
                    !from-[var(--color-primary)]
                    !to-[var(--color-primary-hover)]
                    !bg-clip-text
                    !text-3xl
                    !font-bold
                    !tracking-tight
                    !text-transparent
                    sm:!text-4xl
                  "
                >
                  ₹{Number(booking.totalAmount || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </motion.div>

            {/* ACTIONS */}

            <div className="!mt-7 !flex !flex-col !gap-3 sm:!flex-row">
              <PDFDownloadLink
                document={<ReceiptPDF booking={booking} />}
                fileName={`HostelHub-Receipt-${
                  booking.room?.roomNumber || "ROOM"
                }.pdf`}
                className="!flex-1"
              >
                {({ loading: pdfLoading }) => (
                  <motion.button
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    disabled={pdfLoading}
                    aria-label={
                      pdfLoading ? "Preparing receipt PDF" : "Download receipt"
                    }
                    className="
                      !group
                      !relative
                      !flex
                      !w-full
                      !items-center
                      !justify-center
                      !gap-2
                      !overflow-hidden
                      !rounded-xl
                      !bg-gradient-to-r
                      !from-[var(--color-primary)]
                      !to-[var(--color-primary-hover)]
                      !px-5
                      !py-3.5
                      !text-sm
                      !font-bold
                      !text-[var(--color-primary-contrast)]
                      !shadow-[var(--shadow-glow)]
                      !transition-all
                      !duration-300
                      hover:!shadow-[var(--shadow-glow-strong)]
                    "
                  >
                    <span
                      className="
                        !pointer-events-none
                        !absolute
                        !inset-y-[-30%]
                        !-left-12
                        !w-10
                        !rotate-12
                        !bg-white/35
                        !blur-sm
                        !transition-all
                        !duration-700
                        group-hover:!left-[125%]
                      "
                    />

                    <Download
                      size={16}
                      className="
                        !relative
                        !z-10
                      "
                    />

                    <span className="!relative !z-10">
                      {pdfLoading ? "Preparing PDF..." : "Download Receipt"}
                    </span>
                  </motion.button>
                )}
              </PDFDownloadLink>

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={onClose}
                className="
                  !flex
                  !flex-1
                  !items-center
                  !justify-center
                  !gap-2
                  !rounded-xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !px-5
                  !py-3.5
                  !text-sm
                  !font-semibold
                  !text-[var(--color-text-primary)]
                  !transition-all
                  !duration-300
                  hover:!border-[var(--color-primary)]/30
                  hover:!bg-[var(--color-primary)]/[0.04]
                  hover:!text-[var(--color-primary)]
                "
              >
                <X size={16} />
                Close
              </motion.button>
            </div>

            <p className="!mt-5 !text-center !text-[10px] !leading-5 !text-[var(--color-text-muted)]">
              Thank you for choosing{" "}
              <span className="!font-bold !text-[var(--color-primary)]">
                HostelHub
              </span>
              . We hope you enjoy your stay.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   RECEIPT SECTION
========================================================= */

const ReceiptSection = ({ icon, title, subtitle, children }) => {
  return (
    <section className="!mt-8">
      <div className="!mb-4 !flex !items-center !gap-2.5">
        <div
          className="
            !relative
            !flex
            !h-9
            !w-9
            !items-center
            !justify-center
            !overflow-hidden
            !rounded-xl
            !border
            !border-[var(--color-primary)]/15
            !bg-gradient-to-br
            !from-[var(--color-primary)]/[0.10]
            !to-transparent
            !text-[var(--color-primary)]
          "
        >
          {icon}
        </div>

        <div>
          <p
            className="
              !text-[9px]
              !font-bold
              !uppercase
              !tracking-[0.22em]
              !text-[var(--color-primary)]
            "
          >
            {title}
          </p>

          <p className="!mt-0.5 !text-[10px] !text-[var(--color-text-muted)]">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
};

/* =========================================================
   DETAIL CARD
========================================================= */

const DetailCard = ({ icon, label, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        !group
        !relative
        !overflow-hidden
        !rounded-2xl
        !border
        !border-[var(--color-border)]
        !bg-gradient-to-br
        !from-[var(--color-surface-secondary)]
        !to-transparent
        !p-4
        !shadow-[var(--shadow-soft)]
        !transition-all
        !duration-300
        hover:!border-[var(--color-primary)]/20
        hover:!shadow-[var(--shadow-card)]
      "
    >
      <div
        className="
          !absolute
          !-right-8
          !-top-8
          !h-20
          !w-20
          !rounded-full
          !bg-[var(--color-primary)]/[0.035]
          !blur-2xl
          !transition-transform
          !duration-500
          group-hover:!scale-150
        "
      />

      <div className="!relative !flex !items-center !gap-2">
        <span className="!text-[var(--color-primary)]">{icon}</span>

        <p
          className="
            !text-[8px]
            !font-bold
            !uppercase
            !tracking-[0.16em]
            !text-[var(--color-text-muted)]
          "
        >
          {label}
        </p>
      </div>

      <p
        className="
          !relative
          !mt-2.5
          !truncate
          !text-sm
          !font-semibold
          !text-[var(--color-text-primary)]
        "
      >
        {value}
      </p>
    </motion.div>
  );
};

export default Receipt;
