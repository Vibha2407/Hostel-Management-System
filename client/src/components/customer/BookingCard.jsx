import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  CalendarDays,
  Users,
  IndianRupee,
  ArrowUpRight,
  XCircle,
  BedDouble,
  Clock3,
  Hash,
  X,
  MapPin,
  CheckCircle2,
  ReceiptText,
  User,
  Phone,
  Mail,
  Sparkles,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

import { cancelBooking } from "../../services/bookingService";
import { formatDate } from "../../utils/formatDate";

const BookingCard = ({ booking, fetchBookings, index = 0 }) => {
  const [showDetails, setShowDetails] = useState(false);

  /* =========================================================
      CANCEL BOOKING
  ========================================================= */

  const handleCancelBooking = async (id) => {
    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?",
      );

      if (!confirmCancel) return;

      const response = await cancelBooking(id);

      alert(response.message);

      if (fetchBookings) {
        fetchBookings();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  /* =========================================================
      STATUS STYLE
  ========================================================= */

  const getStatusStyle = () => {
    switch (booking.bookingStatus) {
      case "Confirmed":
        return {
          container:
            "!border-emerald-500/20 !bg-emerald-500/[0.07] !text-emerald-600 dark:!text-emerald-300",
          dot: "!bg-emerald-500",
          glow: "!bg-emerald-500/[0.05]",
          icon: CheckCircle2,
        };

      case "Cancelled":
        return {
          container:
            "!border-red-500/20 !bg-red-500/[0.06] !text-red-600 dark:!text-red-300",
          dot: "!bg-red-500",
          glow: "!bg-red-500/[0.04]",
          icon: XCircle,
        };

      case "Checked-In":
        return {
          container:
            "!border-blue-500/20 !bg-blue-500/[0.06] !text-blue-600 dark:!text-blue-300",
          dot: "!bg-blue-500",
          glow: "!bg-blue-500/[0.04]",
          icon: ShieldCheck,
        };

      case "Checked-Out":
        return {
          container:
            "!border-purple-500/20 !bg-purple-500/[0.06] !text-purple-600 dark:!text-purple-300",
          dot: "!bg-purple-500",
          glow: "!bg-purple-500/[0.04]",
          icon: CheckCircle2,
        };

      default:
        return {
          container:
            "!border-amber-500/20 !bg-amber-500/[0.06] !text-amber-600 dark:!text-amber-300",
          dot: "!bg-amber-500",
          glow: "!bg-amber-500/[0.04]",
          icon: Clock3,
        };
    }
  };

  const statusStyle = getStatusStyle();
  const StatusIcon = statusStyle.icon;

  return (
    <>
      {/* =====================================================
          BOOKING CARD
      ====================================================== */}

      <motion.article
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.975,
          filter: "blur(6px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.75,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -6,
          transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className="
          !group
          !relative
          !overflow-hidden
          !rounded-[1.75rem]
          !border
          !border-[var(--color-border)]
          !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
          !shadow-[var(--shadow-card)]
          !transition-all
          !duration-500
          hover:!border-[var(--color-primary)]/25
          hover:!shadow-[0_25px_70px_rgba(0,0,0,0.10)]
          dark:hover:!shadow-[0_25px_70px_rgba(0,0,0,0.45)]
        "
      >
        {/* =====================================================
            AMBIENT GLOW
        ====================================================== */}

        <div
          className={`
            !pointer-events-none
            !absolute
            !-right-24
            !-top-24
            !h-72
            !w-72
            !rounded-full
            ${statusStyle.glow}
            !blur-[100px]
            !transition-all
            !duration-700
            group-hover:!scale-125
          `}
        />

        <div
          className="
            !pointer-events-none
            !absolute
            !bottom-[-120px]
            !left-[-100px]
            !h-64
            !w-64
            !rounded-full
            !bg-[var(--color-primary)]/[0.025]
            !blur-[90px]
            !transition-all
            !duration-700
            group-hover:!bg-[var(--color-primary)]/[0.05]
          "
        />

        {/* =====================================================
            PREMIUM TOP ACCENT
        ====================================================== */}

        <motion.div
          initial={{
            scaleX: 0,
            transformOrigin: "left",
          }}
          whileInView={{
            scaleX: 1,
          }}
          transition={{
            duration: 1,
            delay: index * 0.08 + 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !absolute
            !left-0
            !top-0
            !h-[2px]
            !w-full
            !origin-left
            !bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-hover),transparent)]
            !opacity-80
          "
        />

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="!relative !flex !flex-col !gap-5 !p-5 sm:!p-7 lg:!flex-row lg:!items-start lg:!justify-between">
          {/* LEFT */}

          <div className="!min-w-0">
            <motion.div
              initial={{
                opacity: 0,
                x: -12,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08 + 0.15,
                duration: 0.5,
              }}
              className="!mb-3 !flex !items-center !gap-2"
            >
              <div
                className="
                  !flex
                  !h-7
                  !w-7
                  !items-center
                  !justify-center
                  !rounded-lg
                  !border
                  !border-[var(--color-primary)]/15
                  !bg-[var(--color-primary)]/[0.06]
                "
              >
                <Sparkles size={13} className="!text-[var(--color-primary)]" />
              </div>

              <span
                className="
                  !text-[9px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.3em]
                  !text-[var(--color-primary)]
                "
              >
                Your Stay
              </span>
            </motion.div>

            <div className="!flex !items-center !gap-3">
              <h2
                className="
                  !truncate
                  !text-2xl
                  !font-semibold
                  !tracking-[-0.03em]
                  !text-[var(--color-text-primary)]
                  sm:!text-3xl
                "
              >
                Room {booking.room?.roomNumber || "Deleted"}
              </h2>

              <motion.div
                animate={{
                  x: [0, 3, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="!hidden !text-[var(--color-primary)] sm:!block"
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </div>

            <div className="!mt-2.5 !flex !flex-wrap !items-center !gap-2">
              <span
                className="
                  !rounded-full
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface)]
                  !px-2.5
                  !py-1
                  !text-[9px]
                  !font-medium
                  !text-[var(--color-text-secondary)]
                "
              >
                {booking.room?.roomType || "-"}
              </span>

              <span className="!text-[var(--color-primary)]">•</span>

              <span className="!text-xs !text-[var(--color-text-muted)]">
                {booking.room?.sharingType || "-"}
              </span>
            </div>
          </div>

          {/* STATUS */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: index * 0.08 + 0.3,
              duration: 0.5,
            }}
            className={`
              !flex
              !w-fit
              !shrink-0
              !items-center
              !gap-2
              !rounded-full
              !border
              !px-3.5
              !py-2
              !text-[10px]
              !font-semibold
              !backdrop-blur-xl
              ${statusStyle.container}
            `}
          >
            <span className="!relative !flex !h-2 !w-2">
              {booking.bookingStatus === "Confirmed" && (
                <span
                  className="
                    !absolute
                    !inline-flex
                    !h-full
                    !w-full
                    !animate-ping
                    !rounded-full
                    !bg-emerald-500
                    !opacity-50
                  "
                />
              )}

              <span
                className={`
                  !relative
                  !inline-flex
                  !h-2
                  !w-2
                  !rounded-full
                  ${statusStyle.dot}
                `}
              />
            </span>

            <StatusIcon size={13} />

            <span>{booking.bookingStatus}</span>
          </motion.div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div className="!mx-5 !h-px !bg-[var(--color-border)] sm:!mx-7" />

        {/* =====================================================
            BOOKING INFORMATION
        ====================================================== */}

        <div
          className="
            !relative
            !grid
            !grid-cols-2
            !gap-3
            !p-5
            sm:!grid-cols-4
            sm:!gap-4
            sm:!p-7
          "
        >
          <InfoBox
            icon={<CalendarDays size={15} />}
            label="Check In"
            value={formatDate(booking.checkInDate)}
          />

          <InfoBox
            icon={<Clock3 size={15} />}
            label="Check Out"
            value={formatDate(booking.checkOutDate)}
          />

          <InfoBox
            icon={<Users size={15} />}
            label="Guests"
            value={`${booking.numberOfGuests || 0} ${
              booking.numberOfGuests === 1 ? "Guest" : "Guests"
            }`}
          />

          {/* PRICE */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="
              !group/price
              !relative
              !overflow-hidden
              !rounded-xl
              !border
              !border-[var(--color-primary)]/20
              !bg-[linear-gradient(135deg,var(--color-primary)/[0.10],transparent)]
              !p-4
              !transition-all
              !duration-500
              hover:!border-[var(--color-primary)]/40
              hover:!shadow-[0_12px_35px_rgba(212,175,55,0.08)]
            "
          >
            <div
              className="
                !pointer-events-none
                !absolute
                !-right-8
                !-top-8
                !h-20
                !w-20
                !rounded-full
                !bg-[var(--color-primary)]/[0.08]
                !blur-2xl
              "
            />

            <div className="!relative !mb-3 !flex !items-center !gap-2">
              <IndianRupee size={15} className="!text-[var(--color-primary)]" />

              <span
                className="
                  !text-[9px]
                  !font-medium
                  !uppercase
                  !tracking-[0.18em]
                  !text-[var(--color-text-muted)]
                "
              >
                Total
              </span>
            </div>

            <p
              className="
                !relative
                !text-base
                !font-semibold
                !text-[var(--color-primary)]
                sm:!text-lg
              "
            >
              ₹{booking.totalAmount || 0}
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            !relative
            !flex
            !flex-col
            !gap-5
            !border-t
            !border-[var(--color-border)]
            !p-5
            sm:!flex-row
            sm:!items-center
            sm:!justify-between
            sm:!px-7
            sm:!py-5
          "
        >
          {/* BOOKING ID */}

          <div className="!flex !min-w-0 !items-center !gap-3">
            <motion.div
              whileHover={{
                rotate: 8,
              }}
              className="
                !flex
                !h-9
                !w-9
                !shrink-0
                !items-center
                !justify-center
                !rounded-lg
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface-secondary)]
                !transition-colors
                hover:!border-[var(--color-primary)]/25
              "
            >
              <Hash size={14} className="!text-[var(--color-text-muted)]" />
            </motion.div>

            <div className="!min-w-0">
              <p
                className="
                  !text-[9px]
                  !uppercase
                  !tracking-[0.2em]
                  !text-[var(--color-text-muted)]
                "
              >
                Booking ID
              </p>

              <p
                className="
                  !mt-1
                  !max-w-[260px]
                  !truncate
                  !text-[10px]
                  !font-medium
                  !text-[var(--color-text-secondary)]
                "
                title={booking._id}
              >
                {booking._id}
              </p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="!flex !w-full !items-center !gap-2 sm:!w-auto sm:!gap-3">
            {/* VIEW DETAILS */}

            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => setShowDetails(true)}
              className="
                !group/btn
                !relative
                !flex
                !flex-1
                !items-center
                !justify-center
                !gap-2
                !overflow-hidden
                !rounded-xl
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface-secondary)]
                !px-4
                !py-3
                !text-xs
                !font-medium
                !text-[var(--color-text-primary)]
                !transition-all
                !duration-300
                hover:!border-[var(--color-primary)]/40
                hover:!bg-[var(--color-primary)]/[0.05]
                sm:!flex-none
                sm:!px-5
              "
            >
              <span
                className="
                  !absolute
                  !inset-y-0
                  !-left-12
                  !w-8
                  !rotate-12
                  !bg-white/10
                  !blur-sm
                  !transition-all
                  !duration-700
                  group-hover/btn:!left-[130%]
                "
              />

              <ReceiptText
                size={15}
                className="!relative !text-[var(--color-primary)]"
              />

              <span className="!relative">View Details</span>

              <ArrowUpRight
                size={14}
                className="
                  !relative
                  !transition-transform
                  !duration-300
                  group-hover/btn:!translate-x-0.5
                  group-hover/btn:!-translate-y-0.5
                "
              />
            </motion.button>

            {/* CANCEL */}

            {booking.room && booking.bookingStatus !== "Cancelled" && (
              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => handleCancelBooking(booking._id)}
                className="
                  !group/cancel
                  !flex
                  !flex-1
                  !items-center
                  !justify-center
                  !gap-2
                  !rounded-xl
                  !border
                  !border-red-500/15
                  !bg-red-500/[0.04]
                  !px-4
                  !py-3
                  !text-xs
                  !font-medium
                  !text-red-500
                  !transition-all
                  !duration-300
                  hover:!border-red-500/30
                  hover:!bg-red-500/[0.07]
                  dark:!text-red-300
                  sm:!flex-none
                  sm:!px-5
                "
              >
                <XCircle
                  size={15}
                  className="
                    !transition-transform
                    !duration-300
                    group-hover/cancel:!rotate-90
                  "
                />

                <span>Cancel</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.article>

      {/* =====================================================
          DETAILS MODAL
      ====================================================== */}

      <AnimatePresence>
        {showDetails && (
          <ReceiptModal
            booking={booking}
            onClose={() => setShowDetails(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* =========================================================
   RECEIPT MODAL
========================================================= */

const ReceiptModal = ({ booking, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
    !fixed
    !inset-0
    !z-[9999]
    !flex
    !items-start
    !justify-center
    !overflow-y-auto
    !px-3
    !py-6
    sm:!px-6
    sm:!py-8
    lg:!py-10
  "
    >
      {/* BACKDROP */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="
          !absolute
          !inset-0
          !bg-black/45
          !backdrop-blur-xl
          dark:!bg-black/75
        "
      />

      {/* MODAL */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
  !relative
  !z-10
  !my-auto
  !w-full
  !max-w-2xl
  !max-h-[calc(100vh-3rem)]
  !overflow-hidden
  !rounded-[1.75rem]
  !border
  !border-[var(--color-border)]
  !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
  !shadow-[0_40px_120px_rgba(0,0,0,0.25)]
  dark:!shadow-[0_40px_120px_rgba(0,0,0,0.65)]
  sm:!max-h-[calc(100vh-4rem)]
"
      >
        {/* MODAL GLOWS */}

        <div
          className="
            !pointer-events-none
            !absolute
            !-right-32
            !-top-32
            !h-80
            !w-80
            !rounded-full
            !bg-[var(--color-primary)]/[0.10]
            !blur-[100px]
          "
        />

        <div
          className="
            !pointer-events-none
            !absolute
            !bottom-[-120px]
            !left-[-100px]
            !h-64
            !w-64
            !rounded-full
            !bg-[var(--color-primary)]/[0.035]
            !blur-[90px]
          "
        />

        {/* TOP ACCENT */}

        <div
          className="
            !absolute
            !left-0
            !top-0
            !h-[2px]
            !w-full
            !bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]
          "
        />

        {/* SCROLL */}

        <div className="!relative !max-h-[92vh] !overflow-y-auto">
          {/* HEADER */}

          <div
            className="
              !flex
              !items-start
              !justify-between
              !gap-5
              !border-b
              !border-[var(--color-border)]
              !p-5
              sm:!p-7
            "
          >
            <div>
              <div className="!mb-3 !flex !items-center !gap-2">
                <div
                  className="
                    !flex
                    !h-7
                    !w-7
                    !items-center
                    !justify-center
                    !rounded-lg
                    !bg-[var(--color-primary)]/[0.08]
                  "
                >
                  <ReceiptText
                    size={14}
                    className="!text-[var(--color-primary)]"
                  />
                </div>

                <span
                  className="
                    !text-[9px]
                    !font-semibold
                    !uppercase
                    !tracking-[0.3em]
                    !text-[var(--color-primary)]
                  "
                >
                  Reservation Receipt
                </span>
              </div>

              <h2
                className="
                  !text-2xl
                  !font-semibold
                  !tracking-[-0.03em]
                  !text-[var(--color-text-primary)]
                  sm:!text-3xl
                "
              >
                Booking Details
              </h2>

              <p className="!mt-2 !text-xs !text-[var(--color-text-muted)]">
                Your complete reservation information
              </p>
            </div>

            <motion.button
              whileHover={{
                rotate: 90,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={onClose}
              className="
                !flex
                !h-10
                !w-10
                !shrink-0
                !items-center
                !justify-center
                !rounded-xl
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface-secondary)]
                !text-[var(--color-text-muted)]
                !transition-all
                !duration-300
                hover:!border-[var(--color-primary)]/35
                hover:!text-[var(--color-primary)]
              "
              aria-label="Close booking details"
            >
              <X size={18} />
            </motion.button>
          </div>

          {/* CONTENT */}

          <div className="!p-5 sm:!p-7">
            {/* STATUS */}

            <div
              className="
                !relative
                !overflow-hidden
                !rounded-2xl
                !border
                !border-[var(--color-primary)]/15
                !bg-[linear-gradient(135deg,var(--color-primary)/[0.08],transparent)]
                !p-4
                sm:!p-5
              "
            >
              <div
                className="
                  !pointer-events-none
                  !absolute
                  !-right-10
                  !-top-10
                  !h-24
                  !w-24
                  !rounded-full
                  !bg-[var(--color-primary)]/[0.08]
                  !blur-2xl
                "
              />

              <div className="!relative !flex !flex-col !gap-4 sm:!flex-row sm:!items-center sm:!justify-between">
                <div className="!flex !items-center !gap-3">
                  <div
                    className="
                      !flex
                      !h-11
                      !w-11
                      !shrink-0
                      !items-center
                      !justify-center
                      !rounded-xl
                      !border
                      !border-[var(--color-primary)]/15
                      !bg-[var(--color-primary)]/[0.08]
                    "
                  >
                    <CheckCircle2
                      size={20}
                      className="!text-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        !text-[9px]
                        !uppercase
                        !tracking-[0.2em]
                        !text-[var(--color-text-muted)]
                      "
                    >
                      Booking Status
                    </p>

                    <p className="!mt-1 !text-sm !font-semibold !text-[var(--color-text-primary)]">
                      {booking.bookingStatus}
                    </p>
                  </div>
                </div>

                <div className="!sm:text-right">
                  <p
                    className="
                      !text-[9px]
                      !uppercase
                      !tracking-[0.2em]
                      !text-[var(--color-text-muted)]
                    "
                  >
                    Booking ID
                  </p>

                  <p
                    className="
                      !mt-1
                      !max-w-[220px]
                      !truncate
                      !text-[10px]
                      !font-medium
                      !text-[var(--color-text-secondary)]
                    "
                    title={booking._id}
                  >
                    {booking._id}
                  </p>
                </div>
              </div>
            </div>

            {/* PAYMENT INFORMATION */}

            {booking.payment && (
              <div
                className="
      !mt-5
      !rounded-2xl
      !border
      !border-[var(--color-border)]
      !bg-[var(--color-surface-secondary)]
      !p-5
    "
              >
                <div className="!mb-5 !flex !items-center !gap-2">
                  <ReceiptText
                    size={17}
                    className="!text-[var(--color-primary)]"
                  />

                  <span
                    className="
          !text-[10px]
          !font-semibold
          !uppercase
          !tracking-[0.2em]
          !text-[var(--color-text-muted)]
        "
                  >
                    Payment Information
                  </span>
                </div>

                <div className="!grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
                  <ModalInfo
                    icon={<Hash size={16} />}
                    label="Transaction ID"
                    value={booking.payment.transactionId || "-"}
                  />

                  <ModalInfo
                    icon={<ReceiptText size={16} />}
                    label="Receipt Number"
                    value={booking.payment.receiptNumber || "-"}
                  />

                  <ModalInfo
                    icon={<IndianRupee size={16} />}
                    label="Payment Amount"
                    value={`₹${booking.payment.amount || 0}`}
                    highlight
                  />

                  <ModalInfo
                    icon={<CheckCircle2 size={16} />}
                    label="Payment Status"
                    value={booking.payment.paymentStatus || "-"}
                  />

                  <ModalInfo
                    icon={<CreditCard size={16} />}
                    label="Payment Method"
                    value={booking.payment.paymentMethod || "-"}
                  />

                  <ModalInfo
                    icon={<CalendarDays size={16} />}
                    label="Payment Date"
                    value={
                      booking.payment.paymentDate
                        ? formatDate(booking.payment.paymentDate)
                        : "-"
                    }
                  />
                </div>
              </div>
            )}

            {/* ROOM INFORMATION */}

            <div
              className="
                !mt-5
                !rounded-2xl
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface-secondary)]
                !p-5
              "
            >
              <div className="!mb-5 !flex !items-center !gap-2">
                <BedDouble size={17} className="!text-[var(--color-primary)]" />

                <span
                  className="
                    !text-[10px]
                    !font-semibold
                    !uppercase
                    !tracking-[0.2em]
                    !text-[var(--color-text-muted)]
                  "
                >
                  Room Information
                </span>
              </div>

              <div className="!flex !flex-col !justify-between !gap-4 sm:!flex-row sm:!items-end">
                <div>
                  <p
                    className="
                      !text-[9px]
                      !uppercase
                      !tracking-[0.15em]
                      !text-[var(--color-text-muted)]
                    "
                  >
                    Room Number
                  </p>

                  <h3
                    className="
                      !mt-1
                      !text-2xl
                      !font-semibold
                      !text-[var(--color-text-primary)]
                    "
                  >
                    Room {booking.room?.roomNumber || "Deleted"}
                  </h3>
                </div>

                <div className="sm:!text-right">
                  <p className="!text-sm !font-medium !text-[var(--color-primary)]">
                    {booking.room?.roomType || "-"}
                  </p>

                  <p className="!mt-1 !text-xs !text-[var(--color-text-muted)]">
                    {booking.room?.sharingType || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* STAY DETAILS */}

            <div className="!mt-5 !grid !grid-cols-2 !gap-3">
              <ModalInfo
                icon={<CalendarDays size={16} />}
                label="Check In"
                value={formatDate(booking.checkInDate)}
              />

              <ModalInfo
                icon={<Clock3 size={16} />}
                label="Check Out"
                value={formatDate(booking.checkOutDate)}
              />

              <ModalInfo
                icon={<Users size={16} />}
                label="Guests"
                value={`${booking.numberOfGuests || 0} ${
                  booking.numberOfGuests === 1 ? "Guest" : "Guests"
                }`}
              />

              <ModalInfo
                icon={<IndianRupee size={16} />}
                label="Total Amount"
                value={`₹${booking.totalAmount || 0}`}
                highlight
              />
            </div>

            {/* CUSTOMER */}

            {(booking.user || booking.customer) && (
              <div
                className="
                  !mt-5
                  !rounded-2xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !p-5
                "
              >
                <div className="!mb-5 !flex !items-center !gap-2">
                  <User size={17} className="!text-[var(--color-primary)]" />

                  <span
                    className="
                      !text-[10px]
                      !font-semibold
                      !uppercase
                      !tracking-[0.2em]
                      !text-[var(--color-text-muted)]
                    "
                  >
                    Guest Information
                  </span>
                </div>

                <div className="!grid !gap-3 sm:!grid-cols-2">
                  {(booking.user?.fullName || booking.customer?.fullName) && (
                    <CustomerInfo
                      icon={<User size={15} />}
                      label="Name"
                      value={
                        booking.user?.fullName || booking.customer?.fullName
                      }
                    />
                  )}

                  {(booking.user?.email || booking.customer?.email) && (
                    <CustomerInfo
                      icon={<Mail size={15} />}
                      label="Email"
                      value={booking.user?.email || booking.customer?.email}
                    />
                  )}

                  {(booking.user?.phone || booking.customer?.phone) && (
                    <CustomerInfo
                      icon={<Phone size={15} />}
                      label="Phone"
                      value={booking.user?.phone || booking.customer?.phone}
                    />
                  )}
                </div>
              </div>
            )}

            {/* LOCATION */}

            {booking.room?.hostel?.name && (
              <div
                className="
                  !mt-5
                  !rounded-2xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !p-5
                "
              >
                <div className="!flex !items-start !gap-3">
                  <MapPin
                    size={17}
                    className="!mt-0.5 !shrink-0 !text-[var(--color-primary)]"
                  />

                  <div>
                    <p
                      className="
                        !text-[9px]
                        !uppercase
                        !tracking-[0.2em]
                        !text-[var(--color-text-muted)]
                      "
                    >
                      Hostel
                    </p>

                    <p
                      className="
                        !mt-1
                        !text-sm
                        !font-semibold
                        !text-[var(--color-text-primary)]
                      "
                    >
                      {booking.room.hostel.name}
                    </p>

                    {booking.room.hostel.address && (
                      <p
                        className="
                          !mt-1
                          !text-xs
                          !leading-5
                          !text-[var(--color-text-muted)]
                        "
                      >
                        {booking.room.hostel.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TOTAL */}

            <div
              className="
                !mt-5
                !flex
                !items-center
                !justify-between
                !gap-4
                !rounded-2xl
                !border
                !border-[var(--color-primary)]/20
                !bg-[linear-gradient(100deg,var(--color-primary)/[0.10],transparent)]
                !p-5
              "
            >
              <div>
                <p
                  className="
                    !text-[9px]
                    !uppercase
                    !tracking-[0.2em]
                    !text-[var(--color-text-muted)]
                  "
                >
                  Total Payable
                </p>

                <p className="!mt-1 !text-xs !text-[var(--color-text-secondary)]">
                  Reservation amount
                </p>
              </div>

              <p
                className="
                  !text-2xl
                  !font-semibold
                  !text-[var(--color-primary)]
                "
              >
                ₹{booking.totalAmount || 0}
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
              !border-t
              !border-[var(--color-border)]
              !px-5
              !py-4
              sm:!px-7
            "
          >
            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={onClose}
              className="
                !w-full
                !rounded-xl
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface-secondary)]
                !px-5
                !py-3.5
                !text-xs
                !font-medium
                !text-[var(--color-text-primary)]
                !transition-all
                !duration-300
                hover:!border-[var(--color-primary)]/35
                hover:!bg-[var(--color-primary)]/[0.05]
              "
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   INFO BOX
========================================================= */

const InfoBox = ({ icon, label, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        !group/info
        !rounded-xl
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface-secondary)]
        !p-3.5
        !transition-all
        !duration-300
        hover:!border-[var(--color-primary)]/20
        hover:!shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        sm:!p-4
      "
    >
      <div className="!mb-3 !flex !items-center !gap-2">
        <span
          className="
            !text-[var(--color-primary)]
            !transition-transform
            !duration-300
            group-hover/info:!scale-110
          "
        >
          {icon}
        </span>

        <span
          className="
            !text-[9px]
            !font-medium
            !uppercase
            !tracking-[0.15em]
            !text-[var(--color-text-muted)]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          !truncate
          !text-xs
          !font-semibold
          !text-[var(--color-text-primary)]
          sm:!text-sm
        "
      >
        {value}
      </p>
    </motion.div>
  );
};

/* =========================================================
   MODAL INFO
========================================================= */

const ModalInfo = ({ icon, label, value, highlight = false }) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className={`
        !rounded-xl
        !border
        !p-4
        !transition-all
        !duration-300
        ${
          highlight
            ? "!border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.05]"
            : "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)] hover:!border-[var(--color-primary)]/15"
        }
      `}
    >
      <div className="!mb-3 !flex !items-center !gap-2">
        <span className="!text-[var(--color-primary)]">{icon}</span>

        <span
          className="
            !text-[9px]
            !uppercase
            !tracking-[0.15em]
            !text-[var(--color-text-muted)]
          "
        >
          {label}
        </span>
      </div>

      <p
        className={`
          !truncate
          !text-sm
          !font-semibold
          ${highlight ? "!text-[var(--color-primary)]" : "!text-[var(--color-text-primary)]"}
        `}
      >
        {value}
      </p>
    </motion.div>
  );
};

/* =========================================================
   CUSTOMER INFO
========================================================= */

const CustomerInfo = ({ icon, label, value }) => {
  return (
    <div
      className="
        !flex
        !items-center
        !gap-3
        !rounded-xl
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !p-3
      "
    >
      <div
        className="
          !flex
          !h-8
          !w-8
          !shrink-0
          !items-center
          !justify-center
          !rounded-lg
          !border
          !border-[var(--color-primary)]/10
          !bg-[var(--color-primary)]/[0.06]
          !text-[var(--color-primary)]
        "
      >
        {icon}
      </div>

      <div className="!min-w-0">
        <p
          className="
            !text-[9px]
            !uppercase
            !tracking-[0.15em]
            !text-[var(--color-text-muted)]
          "
        >
          {label}
        </p>

        <p
          className="
            !mt-0.5
            !truncate
            !text-xs
            !text-[var(--color-text-secondary)]
          "
          title={value}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
