import { motion } from "framer-motion";
import {
  ReceiptText,
  CalendarDays,
  Users,
  BedDouble,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useMemo } from "react";

const BookingSummary = ({ room, bookingData, onProceed }) => {
  // =========================================================
  // TOTAL AMOUNT
  // =========================================================

  const totalAmount = useMemo(() => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0;

    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);

    const diff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (diff <= 0) return 0;

    switch (bookingData.bookingType) {
      case "Daily":
        return diff * room.pricePerDay * Number(bookingData.numberOfGuests);

      case "Weekly":
        return (
          Math.ceil(diff / 7) *
          room.pricePerWeek *
          Number(bookingData.numberOfGuests)
        );

      case "Monthly":
        return Math.ceil(diff / 30) * room.pricePerMonth;

      default:
        return 0;
    }
  }, [bookingData, room]);

  // =========================================================
  // TOTAL DAYS
  // =========================================================

  const totalDays =
    bookingData.checkInDate && bookingData.checkOutDate
      ? Math.ceil(
          (new Date(bookingData.checkOutDate) -
            new Date(bookingData.checkInDate)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  // =========================================================
  // ANIMATION
  // =========================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        !group
        !sticky
        !top-24
        !relative
        !overflow-hidden
        !rounded-[1.75rem]
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !shadow-[0_25px_80px_var(--color-shadow-glow)]
      "
    >
      {/* =====================================================
          AMBIENT GRADIENT GLOW
      ====================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-24
          !-top-24
          !h-64
          !w-64
          !rounded-full
          !bg-[var(--color-primary)]
          !opacity-[0.10]
          !blur-[90px]
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-bottom-32
          !-left-24
          !h-64
          !w-64
          !rounded-full
          !bg-[var(--color-primary)]
          !opacity-[0.05]
          !blur-[90px]
        "
      />

      {/* =====================================================
          ANIMATED SHINE
      ====================================================== */}

      <motion.div
        animate={{
          x: ["-120%", "220%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        className="
          !pointer-events-none
          !absolute
          !top-0
          !z-20
          !h-full
          !w-24
          !-skew-x-12
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-primary)]/10
          !to-transparent
          !blur-sm
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <motion.div
        variants={itemVariants}
        className="
          !relative
          !z-10
          !border-b
          !border-[var(--color-border)]
          !p-6
          sm:!p-7
        "
      >
        {/* Icon */}

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 3,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="
            !relative
            !mb-5
            !flex
            !h-12
            !w-12
            !items-center
            !justify-center
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-primary)]/25
            !bg-gradient-to-br
            !from-[var(--color-primary)]/20
            !to-[var(--color-primary)]/5
            !shadow-[0_10px_30px_rgba(212,175,55,0.08)]
          "
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              !absolute
              !inset-0
              !rounded-2xl
              !border
              !border-[var(--color-primary)]/10
            "
          />

          <ReceiptText
            size={21}
            className="
              !relative
              !z-10
              !text-[var(--color-primary)]
            "
          />
        </motion.div>

        {/* Label */}

        <div className="!mb-2 !flex !items-center !gap-2">
          <Sparkles size={13} className="!text-[var(--color-primary)]" />

          <span
            className="
              !text-[10px]
              !font-semibold
              !uppercase
              !tracking-[0.25em]
              !text-[var(--color-primary)]
            "
          >
            Reservation
          </span>
        </div>

        <h2
          className="
            !text-2xl
            !font-semibold
            !tracking-tight
            !text-[var(--color-text-primary)]
            sm:!text-3xl
          "
        >
          Booking Summary
        </h2>

        <p
          className="
            !mt-2
            !text-sm
            !leading-6
            !text-[var(--color-text-secondary)]
          "
        >
          Review your stay before proceeding.
        </p>

        {/* Gradient line */}

        <div
          className="
            !mt-5
            !h-px
            !w-full
            !bg-gradient-to-r
            !from-[var(--color-primary)]/60
            !via-[var(--color-border)]
            !to-transparent
          "
        />
      </motion.div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !z-10 !p-6 sm:!p-7">
        {/* ===================================================
            ROOM
        ==================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            !relative
            !mb-6
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-gradient-to-br
            !from-[var(--color-surface-secondary)]
            !to-[var(--color-surface)]
            !p-4
          "
        >
          {/* Small glow */}

          <div
            className="
              !pointer-events-none
              !absolute
              !-right-8
              !-top-8
              !h-24
              !w-24
              !rounded-full
              !bg-[var(--color-primary)]
              !opacity-[0.06]
              !blur-[35px]
            "
          />

          <div className="!relative">
            <div className="!flex !items-center !justify-between">
              <p
                className="
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.2em]
                  !text-[var(--color-primary)]
                "
              >
                Selected Room
              </p>

              <CheckCircle2
                size={15}
                className="!text-[var(--color-primary)]"
              />
            </div>

            <div className="!mt-3 !flex !items-center !justify-between !gap-4">
              <div>
                <span
                  className="
                    !text-base
                    !font-semibold
                    !text-[var(--color-text-primary)]
                  "
                >
                  Room {room.roomNumber}
                </span>

                <p
                  className="
                    !mt-1
                    !text-xs
                    !text-[var(--color-text-muted)]
                  "
                >
                  {room.sharingType}
                </p>
              </div>

              <span
                className="
                  !rounded-full
                  !border
                  !border-[var(--color-primary)]/20
                  !bg-[var(--color-primary)]/10
                  !px-3
                  !py-1.5
                  !text-xs
                  !font-medium
                  !text-[var(--color-primary)]
                "
              >
                {room.roomType}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            DETAILS
        ==================================================== */}

        <div className="!space-y-2">
          {/* Stay Type */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              x: 3,
            }}
            className="
              !flex
              !items-center
              !justify-between
              !rounded-xl
              !p-3
              !transition-all
              !duration-300
              hover:!bg-[var(--color-surface-secondary)]
            "
          >
            <div className="!flex !items-center !gap-3">
              <div
                className="
                  !flex
                  !h-9
                  !w-9
                  !items-center
                  !justify-center
                  !rounded-lg
                  !bg-[var(--color-primary)]/10
                "
              >
                <CalendarDays
                  size={17}
                  className="!text-[var(--color-primary)]"
                />
              </div>

              <span
                className="
                  !text-sm
                  !text-[var(--color-text-secondary)]
                "
              >
                Stay Type
              </span>
            </div>

            <span
              className="
                !rounded-full
                !border
                !border-[var(--color-border)]
                !px-3
                !py-1
                !text-xs
                !font-medium
                !text-[var(--color-text-primary)]
              "
            >
              {bookingData.bookingType}
            </span>
          </motion.div>

          {/* Guests */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              x: 3,
            }}
            className="
              !flex
              !items-center
              !justify-between
              !rounded-xl
              !p-3
              !transition-all
              !duration-300
              hover:!bg-[var(--color-surface-secondary)]
            "
          >
            <div className="!flex !items-center !gap-3">
              <div
                className="
                  !flex
                  !h-9
                  !w-9
                  !items-center
                  !justify-center
                  !rounded-lg
                  !bg-[var(--color-primary)]/10
                "
              >
                <Users size={17} className="!text-[var(--color-primary)]" />
              </div>

              <span
                className="
                  !text-sm
                  !text-[var(--color-text-secondary)]
                "
              >
                Guests
              </span>
            </div>

            <span
              className="
                !text-sm
                !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              {bookingData.numberOfGuests}
            </span>
          </motion.div>

          {/* Total Days */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              x: 3,
            }}
            className="
              !flex
              !items-center
              !justify-between
              !rounded-xl
              !p-3
              !transition-all
              !duration-300
              hover:!bg-[var(--color-surface-secondary)]
            "
          >
            <div className="!flex !items-center !gap-3">
              <div
                className="
                  !flex
                  !h-9
                  !w-9
                  !items-center
                  !justify-center
                  !rounded-lg
                  !bg-[var(--color-primary)]/10
                "
              >
                <BedDouble size={17} className="!text-[var(--color-primary)]" />
              </div>

              <span
                className="
                  !text-sm
                  !text-[var(--color-text-secondary)]
                "
              >
                Total Days
              </span>
            </div>

            <span
              className="
                !text-sm
                !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              {totalDays}
            </span>
          </motion.div>
        </div>

        {/* Divider */}

        <div
          className="
            !my-6
            !h-px
            !bg-gradient-to-r
            !from-transparent
            !via-[var(--color-border)]
            !to-transparent
          "
        />

        {/* ===================================================
            TOTAL
        ==================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            !relative
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-primary)]/25
            !bg-gradient-to-br
            !from-[var(--color-primary)]/12
            !via-[var(--color-primary)]/5
            !to-transparent
            !p-5
          "
        >
          {/* Animated glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.04, 0.09, 0.04],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              !pointer-events-none
              !absolute
              !-right-10
              !-top-10
              !h-28
              !w-28
              !rounded-full
              !bg-[var(--color-primary)]
              !blur-[40px]
            "
          />

          <div className="!relative !flex !items-end !justify-between !gap-4">
            <div>
              <p
                className="
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.18em]
                  !text-[var(--color-text-muted)]
                "
              >
                Total Amount
              </p>

              <p
                className="
                  !mt-1
                  !text-xs
                  !text-[var(--color-text-secondary)]
                "
              >
                Final booking price
              </p>
            </div>

            <motion.span
              key={totalAmount}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="
                !text-2xl
                !font-bold
                !tracking-tight
                !text-[var(--color-primary)]
                sm:!text-3xl
              "
            >
              ₹{totalAmount.toLocaleString("en-IN")}
            </motion.span>
          </div>
        </motion.div>

        {/* ===================================================
            BUTTON
        ==================================================== */}

        <motion.button
          whileHover={{
            scale: totalAmount === 0 ? 1 : 1.02,
          }}
          whileTap={{
            scale: totalAmount === 0 ? 1 : 0.97,
          }}
          onClick={() => onProceed(totalAmount)}
          disabled={totalAmount === 0}
          className="
            !group
            !relative
            !mt-6
            !flex
            !w-full
            !items-center
            !justify-center
            !gap-2
            !overflow-hidden
            !rounded-xl
            !bg-gradient-to-r
            !from-[var(--color-primary)]
            !via-[var(--color-primary)]
            !to-[var(--color-primary)]
            !py-4
            !font-semibold
            !text-[var(--color-surface)]
            !shadow-[0_10px_30px_rgba(212,175,55,0.12)]
            !transition-all
            !duration-300
            hover:!shadow-[0_15px_40px_rgba(212,175,55,0.25)]
            disabled:!cursor-not-allowed
            disabled:!bg-[var(--color-surface-tertiary)]
            disabled:!text-[var(--color-text-muted)]
            disabled:!shadow-none
          "
        >
          {/* Button shine */}

          {totalAmount > 0 && (
            <motion.span
              animate={{
                x: ["-120%", "220%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              className="
                !absolute
                !inset-y-0
                !w-20
                !-skew-x-12
                !bg-gradient-to-r
                !from-transparent
                !via-white/25
                !to-transparent
              "
            />
          )}

          <span className="!relative !z-10">Proceed To Payment</span>

          <ArrowRight
            size={17}
            className="
              !relative
              !z-10
              !transition-transform
              !duration-300
              group-hover:!translate-x-1
            "
          />
        </motion.button>

        {/* ===================================================
            FOOTER NOTE
        ==================================================== */}

        <motion.p
          variants={itemVariants}
          className="
            !mt-4
            !flex
            !items-center
            !justify-center
            !gap-1.5
            !text-center
            !text-[10px]
            !leading-5
            !text-[var(--color-text-muted)]
          "
        >
          <CheckCircle2 size={12} className="!text-[var(--color-primary)]" />
          You can review your booking details before completing payment.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
