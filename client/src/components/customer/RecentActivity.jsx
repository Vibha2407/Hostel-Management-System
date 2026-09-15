import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  Receipt,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";

const RecentActivity = ({ bookings = [] }) => {
  const recentBookings = bookings.slice(0, 5);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        !group
        !relative
        !overflow-hidden
        !rounded-[1.5rem]
        !border
        !border-[var(--color-border)]
        !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
        !p-6
        !shadow-[var(--shadow-card)]
        !transition-all
        !duration-500
        sm:!p-7
      "
    >
      {/* =====================================================
          DECORATIVE GLOW
      ====================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-24
          !-top-24
          !h-60
          !w-60
          !rounded-full
          !bg-[var(--color-primary)]/[0.07]
          !blur-[90px]
          !transition-all
          !duration-700
          group-hover:!bg-[var(--color-primary)]/[0.12]
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !bottom-[-100px]
          !left-[35%]
          !h-48
          !w-48
          !rounded-full
          !bg-[var(--color-primary)]/[0.035]
          !blur-[80px]
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="!relative !mb-7 !flex !items-end !justify-between">
        <div>
          <div className="!mb-2 !flex !items-center !gap-2">
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Activity size={14} className="!text-[var(--color-primary)]" />
            </motion.div>

            <p
              className="
                !text-[10px]
                !font-semibold
                !uppercase
                !tracking-[0.22em]
                !text-[var(--color-primary)]
              "
            >
              Timeline
            </p>
          </div>

          <h2
            className="
              !text-xl
              !font-semibold
              !tracking-tight
              !text-[var(--color-text-primary)]
              sm:!text-2xl
            "
          >
            Recent Activity
          </h2>
        </div>

        <span
          className="
            !hidden
            !rounded-full
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]
            !px-3
            !py-1.5
            !text-[9px]
            !font-medium
            !uppercase
            !tracking-[0.14em]
            !text-[var(--color-text-muted)]
            sm:!block
          "
        >
          Latest reservations
        </span>
      </div>

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}

      {recentBookings.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            !relative
            !flex
            !min-h-[220px]
            !items-center
            !justify-center
            !rounded-2xl
            !border
            !border-dashed
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]/[0.5]
            !px-6
            !text-center
          "
        >
          <div>
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                !mx-auto
                !flex
                !h-14
                !w-14
                !items-center
                !justify-center
                !rounded-2xl
                !border
                !border-[var(--color-border)]
                !bg-[linear-gradient(135deg,var(--color-primary)/[0.08],transparent)]
              "
            >
              <Receipt size={24} className="!text-[var(--color-text-muted)]" />
            </motion.div>

            <p
              className="
                !mt-4
                !text-sm
                !font-medium
                !text-[var(--color-text-secondary)]
              "
            >
              No recent activity available.
            </p>

            <p
              className="
                !mt-1
                !text-[10px]
                !text-[var(--color-text-muted)]
              "
            >
              Your latest booking activity will appear here.
            </p>
          </div>
        </motion.div>
      ) : (
        /* =====================================================
           ACTIVITY LIST
        ====================================================== */

        <div className="!relative !space-y-3">
          {recentBookings.map((booking, index) => {
            const status = booking.bookingStatus;

            const Icon =
              status === "Confirmed"
                ? CheckCircle2
                : status === "Cancelled"
                  ? XCircle
                  : Clock3;

            const statusConfig =
              status === "Confirmed"
                ? {
                    color: "!text-[var(--color-success)]",
                    bg: "!bg-[var(--color-success)]/[0.08]",
                    border: "!border-[var(--color-success)]/15",
                  }
                : status === "Cancelled"
                  ? {
                      color: "!text-red-400",
                      bg: "!bg-red-500/[0.07]",
                      border: "!border-red-400/15",
                    }
                  : {
                      color: "!text-blue-400",
                      bg: "!bg-blue-500/[0.07]",
                      border: "!border-blue-400/15",
                    };

            return (
              <motion.div
                key={booking._id}
                initial={{
                  opacity: 0,
                  x: -18,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  x: 3,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="
                  !group/item
                  !relative
                  !flex
                  !items-center
                  !justify-between
                  !gap-4
                  !overflow-hidden
                  !rounded-xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[linear-gradient(135deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
                  !p-4
                  !transition-all
                  !duration-300
                  hover:!border-[var(--color-primary)]/25
                  hover:!shadow-[0_10px_30px_rgba(212,175,55,0.07)]
                "
              >
                {/* Hover glow */}

                <div
                  className="
                    !pointer-events-none
                    !absolute
                    !-right-10
                    !-top-10
                    !h-24
                    !w-24
                    !rounded-full
                    !bg-[var(--color-primary)]/[0.04]
                    !blur-2xl
                    !opacity-0
                    !transition-opacity
                    !duration-500
                    group-hover/item:!opacity-100
                  "
                />

                {/* LEFT */}

                <div className="!relative !flex !min-w-0 !items-center !gap-3">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    className={`
                      !flex
                      !h-10
                      !w-10
                      !shrink-0
                      !items-center
                      !justify-center
                      !rounded-xl
                      !border
                      ${statusConfig.border}
                      ${statusConfig.bg}
                    `}
                  >
                    <Icon size={17} className={statusConfig.color} />
                  </motion.div>

                  <div className="!min-w-0">
                    <h3
                      className="
                        !truncate
                        !text-sm
                        !font-semibold
                        !tracking-tight
                        !text-[var(--color-text-primary)]
                      "
                    >
                      Room {booking.room?.roomNumber || "N/A"}
                    </h3>

                    <div className="!mt-1 !flex !items-center !gap-1.5">
                      <span
                        className={`
                          !text-[10px]
                          !font-medium
                          ${statusConfig.color}
                        `}
                      >
                        {status}
                      </span>

                      <span className="!text-[var(--color-text-muted)]">•</span>

                      <span
                        className="
                          !text-[10px]
                          !text-[var(--color-text-muted)]
                        "
                      >
                        {formatDate(booking.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="!relative !flex !shrink-0 !items-center !gap-2">
                  <div className="!text-right">
                    <p
                      className="
                        !text-sm
                        !font-semibold
                        !tracking-tight
                        !text-[var(--color-primary)]
                      "
                    >
                      ₹{booking.totalAmount}
                    </p>

                    <p
                      className="
                        !mt-0.5
                        !text-[9px]
                        !uppercase
                        !tracking-[0.12em]
                        !text-[var(--color-text-muted)]
                      "
                    >
                      Total
                    </p>
                  </div>

                  <motion.div
                    whileHover={{
                      x: 2,
                      y: -2,
                    }}
                    className="
                      !flex
                      !h-7
                      !w-7
                      !items-center
                      !justify-center
                      !rounded-lg
                      !text-[var(--color-text-muted)]
                      !transition-colors
                      !duration-300
                      group-hover/item:!text-[var(--color-primary)]
                    "
                  >
                    <ArrowUpRight size={14} />
                  </motion.div>
                </div>

                {/* Bottom accent */}

                <div
                  className="
                    !absolute
                    !bottom-0
                    !left-0
                    !h-[1px]
                    !w-0
                    !bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]
                    !transition-all
                    !duration-700
                    group-hover/item:!w-full
                  "
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default RecentActivity;
