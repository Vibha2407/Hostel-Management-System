
import { motion } from "framer-motion";
import {
  BedDouble,
  CalendarDays,
  Clock3,
  Users,
  IndianRupee,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";

const CurrentBooking = ({ bookings = [], loading }) => {
  const currentBooking = bookings.find(
    (booking) =>
      booking.room &&
      (booking.bookingStatus === "Confirmed" ||
        booking.bookingStatus === "Checked-In"),
  );

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
      className="!group !relative !overflow-hidden !rounded-[1.5rem] !border !border-[var(--color-border)] !bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10)_0%,var(--color-surface-secondary)_38%,var(--color-surface)_100%)] !shadow-[0_18px_55px_rgba(0,0,0,0.12)] !transition-all !duration-500 hover:!border-[var(--color-primary)]/30"
    >
      {/* =========================================
          AMBIENT GLOW
      ========================================== */}

      <div className="!pointer-events-none !absolute !-right-24 !-top-24 !h-72 !w-72 !rounded-full !bg-[#D4AF37]/[0.09] !blur-[100px] !transition-all !duration-700 group-hover:!bg-[#D4AF37]/[0.15] group-hover:!scale-110" />

      <div className="!pointer-events-none !absolute !bottom-0 !left-[25%] !h-32 !w-72 !rounded-full !bg-[#D4AF37]/[0.025] !blur-[80px]" />

      {/* =========================================
          SUBTLE GRID
      ========================================== */}

      <div className="!pointer-events-none !absolute !inset-0 !opacity-[0.025] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* =========================================
          HEADER
      ========================================== */}

      <div className="!relative !flex !items-center !justify-between !border-b !border-[var(--color-border)] !p-6 sm:!p-7">
        <div>
          <div className="!mb-2 !flex !items-center !gap-2">
            <motion.div
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <BedDouble size={15} className="!text-[var(--color-primary)]" />
            </motion.div>

            <span className="!text-[10px] !font-semibold !uppercase !tracking-[0.22em] !text-[var(--color-primary)]">
              Your Stay
            </span>
          </div>

          <h2 className="!text-xl !font-semibold !tracking-tight !text-[var(--color-text-primary)] sm:!text-2xl">
            Current Booking
          </h2>
        </div>

        {currentBooking && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="!flex !items-center !gap-2 !rounded-full !border !border-[#4CB39B]/25 !bg-[#4CB39B]/[0.08] !px-3 !py-2"
          >
            <span className="!relative !flex !h-2 !w-2">
              <span className="!absolute !inline-flex !h-full !w-full !animate-ping !rounded-full !bg-[#4CB39B]/40" />

              <span className="!relative !h-2 !w-2 !rounded-full !bg-[#4CB39B]" />
            </span>

            <span className="!text-[10px] !font-semibold !text-[#4CB39B]">
              {currentBooking.bookingStatus}
            </span>
          </motion.div>
        )}
      </div>

      {/* =========================================
          LOADING
      ========================================== */}

      {loading ? (
        <div className="!space-y-4 !p-6 sm:!p-7">
          <div className="!h-8 !w-40 !animate-pulse !rounded-lg !bg-[var(--color-surface-secondary)]" />

          <div className="!grid !grid-cols-2 !gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="!h-20 !animate-pulse !rounded-xl !bg-[var(--color-surface-secondary)]"
              />
            ))}
          </div>
        </div>
      ) : !currentBooking ? (
        /* =========================================
            EMPTY STATE
        ========================================== */

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="!relative !flex !min-h-[280px] !flex-col !items-center !justify-center !px-6 !text-center"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="!mb-5 !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <BedDouble
              size={24}
              className="!text-[var(--color-text-muted)]"
            />
          </motion.div>

          <h3 className="!text-lg !font-semibold !text-[var(--color-text-primary)]">
            No active booking
          </h3>

          <p className="!mt-2 !max-w-sm !text-sm !leading-6 !text-[var(--color-text-secondary)]">
            You don't currently have an active stay. Explore available rooms
            and find your next stay.
          </p>
        </motion.div>
      ) : (
        <>
          {/* =========================================
              ROOM INFORMATION
          ========================================== */}

          <div className="!relative !p-6 sm:!p-7">
            <div className="!flex !flex-col !gap-5 sm:!flex-row sm:!items-end sm:!justify-between">
              <div>
                <p className="!text-[10px] !font-medium !uppercase !tracking-[0.18em] !text-[var(--color-text-muted)]">
                  Room
                </p>

                <motion.h3
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="!mt-1 !text-3xl !font-semibold !tracking-tight !text-[var(--color-text-primary)]"
                >
                  {currentBooking.room?.roomNumber || "-"}
                </motion.h3>

                <p className="!mt-2 !text-sm !text-[var(--color-text-secondary)]">
                  {currentBooking.room?.roomType || "-"}

                  <span className="!mx-2 !text-[var(--color-primary)]">
                    •
                  </span>

                  {currentBooking.room?.sharingType || "-"}
                </p>
              </div>

              {/* TOTAL */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="!relative !overflow-hidden !rounded-xl !border !border-[#D4AF37]/20 !bg-gradient-to-br !from-[#D4AF37]/[0.11] !to-[#D4AF37]/[0.025] !px-4 !py-3 !shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="!pointer-events-none !absolute !-right-6 !-top-6 !h-16 !w-16 !rounded-full !bg-[#D4AF37]/10 !blur-2xl" />

                <p className="!relative !text-[9px] !font-medium !uppercase !tracking-[0.18em] !text-[var(--color-text-muted)]">
                  Total
                </p>

                <p className="!relative !mt-1 !text-lg !font-semibold !text-[var(--color-primary)]">
                  ₹{currentBooking.totalAmount}
                </p>
              </motion.div>
            </div>

            {/* =========================================
                DETAILS
            ========================================== */}

            <div className="!mt-7 !grid !grid-cols-2 !gap-3 sm:!grid-cols-4">
              <Info
                icon={CalendarDays}
                label="Check In"
                value={formatDate(currentBooking.checkInDate)}
              />

              <Info
                icon={Clock3}
                label="Check Out"
                value={formatDate(currentBooking.checkOutDate)}
              />

              <Info
                icon={Users}
                label="Guests"
                value={`${currentBooking.numberOfGuests} ${
                  currentBooking.numberOfGuests === 1 ? "Guest" : "Guests"
                }`}
              />

              <Info
                icon={IndianRupee}
                label="Amount"
                value={`₹${currentBooking.totalAmount}`}
              />
            </div>
          </div>

          {/* =========================================
              FOOTER
          ========================================== */}

          <div className="!relative !flex !items-center !justify-between !border-t !border-[var(--color-border)] !px-6 !py-4 sm:!px-7">
            <div className="!flex !items-center !gap-2">
              <CheckCircle2 size={15} className="!text-[#4CB39B]" />

              <span className="!text-xs !text-[var(--color-text-secondary)]">
                Reservation confirmed
              </span>
            </div>

            <motion.button
              whileHover={{
                x: 4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="!flex !items-center !gap-2 !text-xs !font-semibold !text-[var(--color-primary)] !transition-all !duration-300"
            >
              View Details

              <ArrowUpRight
                size={15}
                className="!transition-transform !duration-300"
              />
            </motion.button>
          </div>

          {/* PREMIUM BOTTOM ACCENT */}

          <div className="!absolute !bottom-0 !left-0 !h-[2px] !w-0 !bg-gradient-to-r !from-transparent !via-[#D4AF37] !to-transparent !transition-all !duration-700 group-hover:!w-full" />
        </>
      )}
    </motion.section>
  );
};

const Info = ({ icon: Icon, label, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="!group/info !relative !overflow-hidden !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !p-3.5 !transition-all !duration-300 hover:!border-[#D4AF37]/25 hover:!shadow-[0_8px_25px_rgba(0,0,0,0.08)]"
    >
      <div className="!flex !items-center !gap-2">
        <Icon
          size={14}
          className="!text-[var(--color-primary)] !transition-transform !duration-300 group-hover/info:!scale-110"
        />

        <span className="!truncate !text-[9px] !font-medium !uppercase !tracking-[0.14em] !text-[var(--color-text-muted)]">
          {label}
        </span>
      </div>

      <p className="!mt-3 !truncate !text-xs !font-semibold !text-[var(--color-text-primary)]">
        {value}
      </p>

      <div className="!absolute !bottom-0 !left-0 !h-px !w-0 !bg-[#D4AF37] !transition-all !duration-500 group-hover/info:!w-full" />
    </motion.div>
  );
};

export default CurrentBooking;

