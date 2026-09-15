import { motion } from "framer-motion";
import { CalendarDays, BedDouble, CreditCard, TrendingUp } from "lucide-react";

const BookingStats = ({ bookings = [], loading }) => {
  const totalBookings = bookings.length;

  const currentStay = bookings.filter(
    (booking) =>
      booking.bookingStatus === "Confirmed" ||
      booking.bookingStatus === "Checked-In",
  ).length;

  const pendingPayments = bookings.filter(
    (booking) => booking.paymentStatus !== "Paid",
  ).length;

  const cards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: CalendarDays,
      description: "All reservations",
    },
    {
      title: "Current Stay",
      value: currentStay,
      icon: BedDouble,
      description: "Active reservations",
    },
    {
      title: "Pending Payment",
      value: pendingPayments,
      icon: CreditCard,
      description: "Payment required",
    },
    {
      title: "Member Status",
      value: "Active",
      icon: TrendingUp,
      description: "Account in good standing",
    },
  ];

  return (
    <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2 xl:!grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{
              y: -6,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            className="
              !group
              !relative
              !overflow-hidden
              !rounded-[1.35rem]
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface)]
              !p-5
              !shadow-[var(--shadow-card)]
              !transition-all
              !duration-500
              hover:!shadow-[0_18px_50px_rgba(212,175,55,0.12)]
              dark:hover:!shadow-[0_18px_50px_rgba(0,0,0,0.35)]
            "
          >
            {/* ================================
                PREMIUM BACKGROUND GLOW
            ================================= */}

            <div
              className="
                !pointer-events-none
                !absolute
                !-right-12
                !-top-12
                !h-32
                !w-32
                !rounded-full
                !bg-[var(--color-primary)]/[0.08]
                !blur-3xl
                !transition-all
                !duration-700
                group-hover:!scale-125
                group-hover:!bg-[var(--color-primary)]/[0.14]
              "
            />

            <div
              className="
                !pointer-events-none
                !absolute
                !bottom-0
                !left-1/3
                !h-20
                !w-32
                !rounded-full
                !bg-[var(--color-primary)]/[0.025]
                !blur-2xl
                !opacity-0
                !transition-all
                !duration-700
                group-hover:!opacity-100
              "
            />

            {/* ================================
                TOP
            ================================= */}

            <div className="!relative !flex !items-start !justify-between">
              <motion.div
                whileHover={{
                  rotate: -4,
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.25,
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
                  !bg-[var(--color-primary)]/[0.08]
                  !shadow-[0_8px_25px_rgba(212,175,55,0.08)]
                  !transition-all
                  !duration-500
                  group-hover:!border-[var(--color-primary)]/40
                  group-hover:!bg-[var(--color-primary)]/[0.13]
                "
              >
                <Icon
                  size={19}
                  className="
                    !text-[var(--color-primary)]
                    !transition-transform
                    !duration-500
                    group-hover:!scale-110
                  "
                />
              </motion.div>

              <span
                className="
                  !rounded-full
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !px-2
                  !py-1
                  !text-[9px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.18em]
                  !text-[var(--color-text-muted)]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* ================================
                CONTENT
            ================================= */}

            <div className="!relative !mt-5">
              <p
                className="
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.18em]
                  !text-[var(--color-text-muted)]
                "
              >
                {card.title}
              </p>

              {loading ? (
                <div
                  className="
                    !mt-2
                    !h-9
                    !w-20
                    !animate-pulse
                    !rounded-lg
                    !bg-[var(--color-surface-secondary)]
                  "
                />
              ) : (
                <motion.h2
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="
                    !mt-1
                    !text-3xl
                    !font-semibold
                    !tracking-tight
                    !text-[var(--color-text-primary)]
                  "
                >
                  {card.value}
                </motion.h2>
              )}

              <p
                className="
                  !mt-2
                  !text-xs
                  !text-[var(--color-text-secondary)]
                "
              >
                {card.description}
              </p>
            </div>

            {/* ================================
                PREMIUM BOTTOM ACCENT
            ================================= */}

            <div
              className="
                !absolute
                !bottom-0
                !left-0
                !h-[2px]
                !w-0
                !bg-[var(--color-primary)]
                !transition-all
                !duration-700
                group-hover:!w-full
              "
            />

            {/* Subtle top shine */}

            <div
              className="
                !pointer-events-none
                !absolute
                !left-0
                !top-0
                !h-px
                !w-0
                !bg-gradient-to-r
                !from-transparent
                !via-[var(--color-primary)]/50
                !to-transparent
                !transition-all
                !duration-700
                group-hover:!w-full
              "
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default BookingStats;
