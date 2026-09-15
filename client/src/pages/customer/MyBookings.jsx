import { motion } from "framer-motion";
import {
  CalendarDays,
  Sparkles,
  Plus,
  ArrowUpRight,
  Compass,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyBookings } from "../../services/bookingService";
import BookingCard from "../../components/customer/BookingCard";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data?.bookings || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleNewBooking = () => {
    navigate("/rooms");
  };

  return (
    <section
      className="
        !relative
        !min-h-screen
        !overflow-hidden
        !bg-[var(--color-background)]
        !text-[var(--color-text-primary)]
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="!pointer-events-none !absolute !inset-0 !overflow-hidden">
        {/* Top right animated glow */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute
            !-right-40
            !-top-40
            !h-[520px]
            !w-[520px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.08]
            !blur-[130px]
          "
        />

        {/* Left ambient glow */}

        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute
            !-left-48
            !top-[38%]
            !h-[420px]
            !w-[420px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.045]
            !blur-[120px]
          "
        />

        {/* Radial light */}

        <div
          className="
            !absolute
            !inset-0
            !bg-[radial-gradient(circle_at_85%_5%,var(--color-primary)/[0.07],transparent_30%)]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            !absolute
            !inset-0
            !bg-[linear-gradient(var(--color-text-primary)/[0.025]_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)/[0.025]_1px,transparent_1px)]
            !bg-[size:55px_55px]
            !opacity-40
          "
        />

        {/* Top fade */}

        <div
          className="
            !absolute
            !left-0
            !right-0
            !top-0
            !h-40
            !bg-gradient-to-b
            !from-[var(--color-background)]
            !to-transparent
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          !relative
          !z-10
          !mx-auto
          !max-w-7xl
          !px-5
          !py-8
          sm:!px-6
          sm:!py-10
          lg:!px-8
          lg:!py-14
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.header
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
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mb-9 sm:!mb-12"
        >
          {/* Eyebrow */}

          <div className="!mb-4 !flex !items-center !gap-2">
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={14} className="!text-[var(--color-primary)]" />
            </motion.div>

            <span
              className="
                !text-[9px]
                !font-semibold
                !uppercase
                !tracking-[0.3em]
                !text-[var(--color-primary)]
                sm:!text-[10px]
              "
            >
              Your Reservations
            </span>
          </div>

          {/* TITLE + ACTION */}

          <div
            className="
              !flex
              !flex-col
              !gap-7
              lg:!flex-row
              lg:!items-end
              lg:!justify-between
            "
          >
            {/* TITLE */}

            <div className="!max-w-2xl">
              <h1
                className="
                  !text-3xl
                  !font-semibold
                  !tracking-[-0.04em]
                  !text-[var(--color-text-primary)]
                  sm:!text-4xl
                  lg:!text-[3.2rem]
                  lg:!leading-[1.05]
                "
              >
                My Bookings
              </h1>

              <p
                className="
                  !mt-3
                  !max-w-xl
                  !text-sm
                  !leading-6
                  !text-[var(--color-text-secondary)]
                  sm:!mt-4
                  sm:!text-base
                "
              >
                Everything about your stays, reservations and upcoming hostel
                experiences — all in one place.
              </p>
            </div>

            {/* ACTION AREA */}

            <div className="!flex !w-full !items-center !gap-3 sm:!w-auto">
              {/* COUNT */}

              {bookings.length > 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.5,
                  }}
                  className="
                    !flex
                    !min-w-0
                    !flex-1
                    !items-center
                    !justify-center
                    !gap-2
                    !rounded-xl
                    !border
                    !border-[var(--color-primary)]/20
                    !bg-[linear-gradient(135deg,var(--color-primary)/[0.09],var(--color-primary)/[0.025])]
                    !px-3
                    !py-3
                    sm:!min-w-[145px]
                    sm:!flex-none
                    sm:!px-4
                  "
                >
                  <CalendarDays
                    size={15}
                    className="!shrink-0 !text-[var(--color-primary)]"
                  />

                  <span
                    className="
                      !truncate
                      !text-xs
                      !font-medium
                      !text-[var(--color-text-secondary)]
                    "
                  >
                    {bookings.length}{" "}
                    {bookings.length === 1 ? "Reservation" : "Reservations"}
                  </span>
                </motion.div>
              )}

              {/* NEW BOOKING */}

              <motion.button
                initial={{
                  opacity: 0,
                  x: 15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 15px 40px rgba(212,175,55,0.22)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleNewBooking}
                className="
                  !group
                  !relative
                  !flex
                  !shrink-0
                  !items-center
                  !justify-center
                  !gap-2
                  !overflow-hidden
                  !rounded-xl
                  !bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-hover))]
                  !px-4
                  !py-3
                  !text-xs
                  !font-semibold
                  !text-[#111111]
                  !shadow-[0_10px_30px_rgba(212,175,55,0.14)]
                  !transition-all
                  !duration-300
                  sm:!px-5
                "
              >
                {/* Shine */}

                <span
                  className="
                    !pointer-events-none
                    !absolute
                    !inset-y-0
                    !-left-full
                    !w-1/2
                    !skew-x-[-20deg]
                    !bg-white/20
                    !transition-all
                    !duration-700
                    group-hover:!left-[130%]
                  "
                />

                <Plus
                  size={16}
                  strokeWidth={2.5}
                  className="
                    !relative
                    !z-10
                    !transition-transform
                    !duration-300
                    group-hover:!rotate-90
                  "
                />

                <span className="!relative !z-10 !whitespace-nowrap">
                  New Booking
                </span>
              </motion.button>
            </div>
          </div>

          {/* HEADER DIVIDER */}

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
              delay: 0.55,
              duration: 0.8,
            }}
            className="
              !mt-8
              !h-px
              !origin-left
              !bg-[linear-gradient(90deg,var(--color-primary)/30%,var(--color-border),transparent)]
            "
          />
        </motion.header>

        {/* =====================================================
            BOOKING CONTENT
        ====================================================== */}

        <div className="!space-y-6 sm:!space-y-8">
          {/* EMPTY STATE */}

          {bookings.length === 0 ? (
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
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                !group
                !relative
                !overflow-hidden
                !rounded-[1.75rem]
                !border
                !border-[var(--color-border)]
                !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
                !px-6
                !py-20
                !text-center
                !shadow-[var(--shadow-card)]
                sm:!py-28
              "
            >
              {/* Animated Glow */}

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  !pointer-events-none
                  !absolute
                  !left-1/2
                  !top-0
                  !h-48
                  !w-48
                  !-translate-x-1/2
                  !rounded-full
                  !bg-[var(--color-primary)]/[0.08]
                  !blur-[90px]
                "
              />

              {/* Decorative Gradient */}

              <div
                className="
                  !pointer-events-none
                  !absolute
                  !inset-x-0
                  !bottom-0
                  !h-px
                  !bg-[linear-gradient(90deg,transparent,var(--color-primary)/40%,transparent)]
                "
              />

              <div className="!relative !mx-auto !max-w-md">
                {/* ICON */}

                <motion.div
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.5,
                    type: "spring",
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: -3,
                  }}
                  className="
                    !mx-auto
                    !mb-6
                    !flex
                    !h-20
                    !w-20
                    !items-center
                    !justify-center
                    !rounded-[1.5rem]
                    !border
                    !border-[var(--color-primary)]/20
                    !bg-[linear-gradient(135deg,var(--color-primary)/[0.13],var(--color-primary)/[0.035])]
                    !shadow-[0_15px_40px_rgba(212,175,55,0.10)]
                  "
                >
                  <CalendarDays
                    size={30}
                    className="!text-[var(--color-primary)]"
                  />
                </motion.div>

                <p
                  className="
                    !mb-2
                    !text-[9px]
                    !font-semibold
                    !uppercase
                    !tracking-[0.22em]
                    !text-[var(--color-primary)]
                  "
                >
                  Your journey starts here
                </p>

                <h2
                  className="
                    !text-xl
                    !font-semibold
                    !tracking-tight
                    !text-[var(--color-text-primary)]
                    sm:!text-2xl
                  "
                >
                  No bookings yet
                </h2>

                <p
                  className="
                    !mx-auto
                    !mt-3
                    !max-w-md
                    !text-sm
                    !leading-6
                    !text-[var(--color-text-secondary)]
                  "
                >
                  Discover comfortable rooms and create your first hostel
                  reservation whenever you're ready.
                </p>

                {/* CTA */}

                <motion.button
                  whileHover={{
                    y: -3,
                    boxShadow: "0 15px 40px rgba(212,175,55,0.2)",
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleNewBooking}
                  className="
                    !group
                    !relative
                    !mt-8
                    !inline-flex
                    !items-center
                    !gap-2
                    !overflow-hidden
                    !rounded-xl
                    !bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-hover))]
                    !px-5
                    !py-3
                    !text-xs
                    !font-semibold
                    !text-[#111111]
                    !shadow-[0_10px_30px_rgba(212,175,55,0.14)]
                    !transition-all
                    !duration-300
                  "
                >
                  <span
                    className="
                      !pointer-events-none
                      !absolute
                      !inset-y-0
                      !-left-full
                      !w-1/2
                      !skew-x-[-20deg]
                      !bg-white/20
                      !transition-all
                      !duration-700
                      group-hover:!left-[130%]
                    "
                  />

                  <Compass
                    size={15}
                    className="
                      !relative
                      !z-10
                      !transition-transform
                      !duration-300
                      group-hover:!rotate-12
                    "
                  />

                  <span className="!relative !z-10">Explore Rooms</span>

                  <ArrowUpRight
                    size={14}
                    className="
                      !relative
                      !z-10
                      !transition-transform
                      !duration-300
                      group-hover:!translate-x-0.5
                      group-hover:!-translate-y-0.5
                    "
                  />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* =================================================
               BOOKINGS LIST
            ================================================== */

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.5,
              }}
              className="!space-y-6 sm:!space-y-8"
            >
              {bookings.map((booking, index) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  fetchBookings={fetchBookings}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;
