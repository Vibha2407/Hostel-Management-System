import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  IndianRupee,
  ArrowUpRight,
  XCircle,
  BedDouble,
  Clock3,
  Hash,
  ShieldCheck,
} from "lucide-react";

import { cancelBooking } from "../../services/bookingService";
import { formatDate } from "../../utils/formatDate";

const BookingCard = ({ booking, fetchBookings, index = 0 }) => {
  const navigate = useNavigate();

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
     STATUS
  ========================================================= */

  const statusConfig = {
    Confirmed: {
      text: "Confirmed",
      color: "var(--color-success)",
      background: "var(--color-success-soft)",
      border: "var(--color-success-border)",
    },

    Cancelled: {
      text: "Cancelled",
      color: "var(--color-danger)",
      background: "var(--color-danger-soft)",
      border: "var(--color-danger-border)",
    },

    "Checked-In": {
      text: "Checked-In",
      color: "var(--color-info)",
      background: "var(--color-info-soft)",
      border: "var(--color-info-border)",
    },

    default: {
      text: booking.bookingStatus || "Pending",
      color: "var(--color-warning)",
      background: "var(--color-warning-soft)",
      border: "var(--color-warning-border)",
    },
  };

  const status = statusConfig[booking.bookingStatus] || statusConfig.default;

  const isCancelled = booking.bookingStatus === "Cancelled";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.7,
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
        group
        relative
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-[var(--shadow-card)]
        transition-all
        duration-500
        hover:shadow-[var(--shadow-card-hover)]
      "
    >
      {/* =====================================================
          AMBIENT GOLD EFFECT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-[var(--color-primary)]
          opacity-[0.045]
          blur-[90px]
          transition-all
          duration-700
          group-hover:scale-125
          group-hover:opacity-[0.09]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-24
          h-64
          w-64
          rounded-full
          bg-[var(--color-primary)]
          opacity-[0.025]
          blur-[100px]
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
          duration: 0.9,
          delay: index * 0.08 + 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          left-0
          top-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-[var(--color-primary)]
          to-transparent
          opacity-70
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative flex items-start justify-between gap-5 p-5 sm:p-7">
        <div className="min-w-0">
          {/* Small label */}

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
            className="mb-3 flex items-center gap-2"
          >
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--color-primary)]/20
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
              "
            >
              <BedDouble size={14} />
            </span>

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[var(--color-primary)]
              "
            >
              Your Stay
            </span>
          </motion.div>

          {/* Room */}

          <h2
            className="
              truncate
              text-2xl
              font-semibold
              tracking-[-0.025em]
              text-[var(--color-text-primary)]
              sm:text-3xl
            "
          >
            Room {booking.room?.roomNumber || "Deleted"}
          </h2>

          <p
            className="
              mt-2
              text-xs
              text-[var(--color-text-muted)]
              sm:text-sm
            "
          >
            {booking.room?.roomType || "Room"}

            <span className="mx-2 text-[var(--color-primary)]">•</span>

            {booking.room?.sharingType || "Standard"}
          </p>
        </div>

        {/* =====================================================
            STATUS
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: index * 0.08 + 0.3,
            duration: 0.5,
          }}
          style={{
            color: status.color,
            backgroundColor: status.background,
            borderColor: status.border,
          }}
          className="
            flex
            shrink-0
            items-center
            gap-2
            rounded-full
            border
            px-3
            py-2
            text-[10px]
            font-semibold
            backdrop-blur-xl
            sm:px-3.5
          "
        >
          <span className="relative flex h-2 w-2">
            {booking.bookingStatus === "Confirmed" && (
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  opacity-40
                "
                style={{
                  backgroundColor: status.color,
                }}
              />
            )}

            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{
                backgroundColor: status.color,
              }}
            />
          </span>

          <span className="hidden sm:inline">{status.text}</span>

          <span className="sm:hidden">
            {booking.bookingStatus === "Checked-In"
              ? "In"
              : booking.bookingStatus}
          </span>
        </motion.div>
      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div
        className="
          mx-5
          h-px
          bg-[var(--color-border)]
          sm:mx-7
        "
      />

      {/* =====================================================
          BOOKING INFORMATION
      ====================================================== */}

      <div
        className="
          relative
          grid
          grid-cols-2
          gap-3
          p-5
          sm:grid-cols-4
          sm:gap-4
          sm:p-7
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
          value={`${booking.numberOfGuests} ${
            booking.numberOfGuests === 1 ? "Guest" : "Guests"
          }`}
        />

        {/* Total */}

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="
            group/price
            rounded-xl
            border
            border-[var(--color-primary)]/20
            bg-[var(--color-primary)]/[0.06]
            p-4
            transition-all
            duration-500
            hover:border-[var(--color-primary)]/40
            hover:bg-[var(--color-primary)]/[0.09]
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-[var(--color-primary)]/10
                text-[var(--color-primary)]
              "
            >
              <IndianRupee size={14} />
            </span>

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[var(--color-text-muted)]
              "
            >
              Total
            </span>
          </div>

          <p
            className="
              text-base
              font-semibold
              text-[var(--color-primary)]
              sm:text-lg
            "
          >
            ₹{booking.totalAmount}
          </p>
        </motion.div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          gap-5
          border-t
          border-[var(--color-border)]
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
          sm:py-5
        "
      >
        {/* Booking ID */}

        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]
              text-[var(--color-text-muted)]
              transition-all
              duration-300
              group-hover:border-[var(--color-primary)]/20
              group-hover:text-[var(--color-primary)]
            "
          >
            <Hash size={14} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[var(--color-text-muted)]
              "
            >
              Booking ID
            </p>

            <p
              className="
                mt-1
                max-w-[220px]
                truncate
                text-[10px]
                font-medium
                text-[var(--color-text-secondary)]
              "
            >
              {booking._id}
            </p>
          </div>
        </div>

        {/* Actions */}

        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          {/* View Details */}

          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              navigate("/customer/receipt", {
                state: {
                  booking,
                },
              })
            }
            className="
              group/btn
              relative
              flex
              flex-1
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface-secondary)]
              px-4
              py-3
              text-xs
              font-medium
              text-[var(--color-text-primary)]
              transition-all
              duration-300
              hover:border-[var(--color-primary)]/40
              hover:bg-[var(--color-primary)]/[0.06]
              sm:flex-none
              sm:px-5
            "
          >
            {/* Shine */}

            <span
              className="
                absolute
                inset-y-0
                -left-10
                w-8
                rotate-12
                bg-white/10
                blur-sm
                transition-all
                duration-700
                group-hover/btn:left-[120%]
              "
            />

            <span className="relative">View Details</span>

            <ArrowUpRight
              size={15}
              className="
                relative
                transition-transform
                duration-300
                group-hover/btn:translate-x-0.5
                group-hover/btn:-translate-y-0.5
              "
            />
          </motion.button>

          {/* Cancel */}

          {!booking.room && !isCancelled
            ? null
            : !isCancelled &&
              booking.room && (
                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() => handleCancelBooking(booking._id)}
                  className="
                  group/cancel
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--color-danger-border)]
                  bg-[var(--color-danger-soft)]
                  px-4
                  py-3
                  text-xs
                  font-medium
                  text-[var(--color-danger)]
                  transition-all
                  duration-300
                  hover:border-[var(--color-danger)]
                  sm:flex-none
                  sm:px-5
                "
                >
                  <XCircle
                    size={15}
                    className="
                    transition-transform
                    duration-300
                    group-hover/cancel:rotate-90
                  "
                  />

                  <span>Cancel</span>
                </motion.button>
              )}
        </div>
      </div>

      {/* =====================================================
          BOTTOM TRUST LINE
      ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          border-t
          border-[var(--color-border)]
          px-5
          py-3
          text-[9px]
          uppercase
          tracking-[0.16em]
          text-[var(--color-text-muted)]
        "
      >
        <ShieldCheck size={12} className="text-[var(--color-primary)]" />

        <span>Secure booking · HostelHub</span>
      </div>
    </motion.article>
  );
};

/* ============================================================
   REUSABLE INFO BOX
============================================================ */

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
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface-secondary)]
        p-3.5
        transition-all
        duration-300
        hover:border-[var(--color-primary)]/25
        hover:bg-[var(--color-surface)]
        sm:p-4
      "
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[var(--color-primary)]">{icon}</span>

        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-[var(--color-text-muted)]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          truncate
          text-xs
          font-semibold
          text-[var(--color-text-primary)]
          sm:text-sm
        "
      >
        {value}
      </p>
    </motion.div>
  );
};

export default BookingCard;
