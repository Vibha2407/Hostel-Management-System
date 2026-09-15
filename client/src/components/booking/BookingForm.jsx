import { DayPicker } from "react-day-picker";
import { format, addDays, addMonths } from "date-fns";
import { useState, useRef, useEffect } from "react";
import "react-day-picker/dist/style.css";
import toast from "react-hot-toast";

import {
  CalendarDays,
  Users,
  Clock3,
  FileText,
  ChevronDown,
  Minus,
  Plus,
  Sparkles,
  Check,
  WandSparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const BookingForm = ({ room, bookingData, setBookingData }) => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const checkInRef = useRef();
  const checkOutRef = useRef();

  const today = new Date();

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    const availableBeds = room.totalBeds - room.occupiedBeds;

    if (name === "numberOfGuests" && Number(value) > availableBeds) {
      toast.error(`Only ${availableBeds} beds available`);
      return;
    }

    setBookingData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (
        name === "checkInDate" &&
        updated.checkOutDate &&
        updated.checkOutDate < value
      ) {
        updated.checkOutDate = "";
      }

      return updated;
    });
  };

  // =========================================================
  // CLOSE CALENDAR WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    function handleClickOutside(e) {
      if (checkInRef.current && !checkInRef.current.contains(e.target)) {
        setShowCheckIn(false);
      }

      if (checkOutRef.current && !checkOutRef.current.contains(e.target)) {
        setShowCheckOut(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================================================
  // AUTO CALCULATE CHECKOUT DATE
  // =========================================================

  useEffect(() => {
    if (!bookingData.checkInDate) return;

    const checkIn = new Date(bookingData.checkInDate);

    let checkOutDate;

    if (bookingData.bookingType === "Daily") {
      checkOutDate = addDays(checkIn, bookingData.duration);
    }

    if (bookingData.bookingType === "Weekly") {
      checkOutDate = addDays(checkIn, bookingData.duration * 7);
    }

    if (bookingData.bookingType === "Monthly") {
      checkOutDate = addMonths(checkIn, bookingData.duration);
    }

    setBookingData((prev) => ({
      ...prev,
      checkOutDate,
    }));
  }, [bookingData.checkInDate, bookingData.bookingType, bookingData.duration]);

  // =========================================================
  // ANIMATION
  // =========================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.985,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.075,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        group
        !relative
        !overflow-visible
        !rounded-[2rem]
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !p-5
        !shadow-[0_25px_90px_var(--color-shadow-glow)]
        sm:!p-7
      "
    >
      {/* =====================================================
          AMBIENT GRADIENT BACKGROUND
      ====================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !inset-0
          !overflow-hidden
          !rounded-[2rem]
        "
      >
        <div
          className="
            !absolute
            !-right-24
            !-top-24
            !h-72
            !w-72
            !rounded-full
            !bg-[var(--color-primary)]
            !opacity-[0.075]
            !blur-[90px]
            transition-all
            duration-1000
            group-hover:!scale-125
            group-hover:!opacity-[0.12]
          "
        />

        <div
          className="
            !absolute
            !-bottom-28
            !-left-24
            !h-64
            !w-64
            !rounded-full
            !bg-[var(--color-primary)]
            !opacity-[0.035]
            !blur-[100px]
            transition-all
            duration-1000
            group-hover:!scale-110
          "
        />

        <div
          className="
            !absolute
            !left-1/2
            !top-1/3
            !h-40
            !w-40
            !-translate-x-1/2
            !rounded-full
            !bg-[var(--color-primary)]
            !opacity-[0.018]
            !blur-[80px]
          "
        />
      </div>

      {/* =====================================================
          PREMIUM TOP LINE
      ====================================================== */}

      <motion.div
        initial={{
          scaleX: 0,
          transformOrigin: "left",
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          !absolute
          !left-8
          !right-8
          !top-0
          !h-[2px]
          !origin-left
          !rounded-full
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-primary)]
          !to-transparent
          !opacity-80
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <motion.div variants={itemVariants} className="!relative !mb-8">
        <div className="!mb-4 !flex !items-center !justify-between">
          <div className="!flex !items-center !gap-3">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                !relative
                !flex
                !h-10
                !w-10
                !items-center
                !justify-center
                !overflow-hidden
                !rounded-xl
                !border
                !border-[var(--color-primary)]/25
                !bg-gradient-to-br
                !from-[var(--color-primary)]/20
                !to-[var(--color-primary)]/[0.04]
                !shadow-[0_8px_30px_var(--color-primary)]/10
              "
            >
              <Sparkles
                size={17}
                className="!relative !z-10 !text-[var(--color-primary)]"
              />

              <motion.span
                animate={{
                  x: ["-120%", "120%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="
                  !absolute
                  !inset-y-0
                  !left-0
                  !w-1/2
                  !rotate-12
                  !bg-white/10
                  !blur-md
                "
              />
            </motion.div>

            <div>
              <span
                className="
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.28em]
                  !text-[var(--color-primary)]
                "
              >
                Reservation
              </span>

              <div className="!mt-1 !flex !items-center !gap-1.5">
                <span className="!h-1 !w-1 !rounded-full !bg-[var(--color-primary)]" />

                <span
                  className="
                    !text-[9px]
                    !uppercase
                    !tracking-[0.15em]
                    !text-[var(--color-text-muted)]
                  "
                >
                  Secure stay
                </span>
              </div>
            </div>
          </div>

          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              !hidden
              !rounded-full
              !border
              !border-[var(--color-primary)]/15
              !bg-[var(--color-primary)]/[0.05]
              !px-3
              !py-1.5
              sm:!flex
              sm:!items-center
              sm:!gap-2
            "
          >
            <WandSparkles size={12} className="!text-[var(--color-primary)]" />

            <span
              className="
                !text-[9px]
                !font-medium
                !uppercase
                !tracking-[0.15em]
                !text-[var(--color-text-muted)]
              "
            >
              Easy booking
            </span>
          </motion.div>
        </div>

        <h2
          className="
            !bg-gradient-to-r
            !from-[var(--color-text-primary)]
            !via-[var(--color-text-primary)]
            !to-[var(--color-primary)]
            !bg-clip-text
            !text-2xl
            !font-bold
            !tracking-[-0.035em]
            !text-transparent
            sm:!text-3xl
          "
        >
          Booking Details
        </h2>

        <p
          className="
            !mt-2
            !max-w-md
            !text-sm
            !leading-6
            !text-[var(--color-text-secondary)]
          "
        >
          Select your dates and stay preferences to continue.
        </p>

        <div className="!relative !mt-6 !h-px !w-full !overflow-hidden !bg-[var(--color-border)]">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              !absolute
              !inset-y-0
              !w-1/3
              !bg-gradient-to-r
              !from-transparent
              !via-[var(--color-primary)]
              !to-transparent
              !opacity-80
            "
          />
        </div>
      </motion.div>

      {/* =====================================================
          FORM
      ====================================================== */}

      <div className="!relative !space-y-6">
        {/* ===================================================
            CHECK IN
        ==================================================== */}

        <motion.div
          variants={itemVariants}
          className="!relative"
          ref={checkInRef}
        >
          <FormLabel icon={<CalendarDays size={15} />} text="Check In" />

          <motion.div
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.995,
            }}
            className={`
              !relative
              !flex
              !items-center
              !overflow-hidden
              !rounded-2xl
              !border
              !bg-gradient-to-br
              !from-[var(--color-surface-secondary)]
              !to-[var(--color-surface)]
              !transition-all
              !duration-300
              ${
                showCheckIn
                  ? "!border-[var(--color-primary)]/60 !shadow-[0_0_0_4px_var(--color-primary)]/8,0_12px_35px_var(--color-primary)/8"
                  : "!border-[var(--color-border)] hover:!border-[var(--color-primary)]/30"
              }
            `}
          >
            <div
              className="
                !ml-3
                !flex
                !h-9
                !w-9
                !shrink-0
                !items-center
                !justify-center
                !rounded-xl
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
              "
            >
              <CalendarDays size={17} />
            </div>

            <input
              type="text"
              readOnly
              placeholder="Select check-in date"
              value={
                bookingData.checkInDate
                  ? format(new Date(bookingData.checkInDate), "dd MMM yyyy")
                  : ""
              }
              onClick={() => {
                setShowCheckIn(!showCheckIn);
                setShowCheckOut(false);
              }}
              className="
                !w-full
                !cursor-pointer
                !border-none
                !bg-transparent
                !px-3
                !py-4
                !text-sm
                !font-medium
                !text-[var(--color-text-primary)]
                !outline-none
                !ring-0
                placeholder:!font-normal
                placeholder:!text-[var(--color-text-muted)]
              "
            />

            <motion.div
              animate={{
                rotate: showCheckIn ? 180 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="!mr-4 !text-[var(--color-text-secondary)]"
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showCheckIn && (
              <CalendarPopup>
                <DayPicker
                  mode="single"
                  selected={
                    bookingData.checkInDate
                      ? new Date(bookingData.checkInDate)
                      : undefined
                  }
                  disabled={{
                    before: today,
                  }}
                  onSelect={(date) => {
                    if (!date) return;

                    setBookingData((prev) => ({
                      ...prev,
                      checkInDate: date,
                      checkOutDate:
                        prev.checkOutDate && new Date(prev.checkOutDate) < date
                          ? ""
                          : prev.checkOutDate,
                    }));

                    setShowCheckIn(false);
                  }}
                />
              </CalendarPopup>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===================================================
            CHECK OUT
        ==================================================== */}

        <motion.div
          variants={itemVariants}
          className="!relative"
          ref={checkOutRef}
        >
          <FormLabel icon={<CalendarDays size={15} />} text="Check Out" />

          <motion.div
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.995,
            }}
            className={`
              !relative
              !flex
              !items-center
              !overflow-hidden
              !rounded-2xl
              !border
              !bg-gradient-to-br
              !from-[var(--color-surface-secondary)]
              !to-[var(--color-surface)]
              !transition-all
              !duration-300
              ${
                showCheckOut
                  ? "!border-[var(--color-primary)]/60 !shadow-[0_0_0_4px_var(--color-primary)]/8,0_12px_35px_var(--color-primary)/8"
                  : "!border-[var(--color-border)] hover:!border-[var(--color-primary)]/30"
              }
            `}
          >
            <div
              className="
                !ml-3
                !flex
                !h-9
                !w-9
                !shrink-0
                !items-center
                !justify-center
                !rounded-xl
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
              "
            >
              <CalendarDays size={17} />
            </div>

            <input
              type="text"
              readOnly
              placeholder="Select check-out date"
              value={
                bookingData.checkOutDate
                  ? format(new Date(bookingData.checkOutDate), "dd MMM yyyy")
                  : ""
              }
              onClick={() => {
                setShowCheckOut(!showCheckOut);
                setShowCheckIn(false);
              }}
              className="
                !w-full
                !cursor-pointer
                !border-none
                !bg-transparent
                !px-3
                !py-4
                !text-sm
                !font-medium
                !text-[var(--color-text-primary)]
                !outline-none
                !ring-0
                placeholder:!font-normal
                placeholder:!text-[var(--color-text-muted)]
              "
            />

            <motion.div
              animate={{
                rotate: showCheckOut ? 180 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="!mr-4 !text-[var(--color-text-secondary)]"
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showCheckOut && (
              <CalendarPopup>
                <DayPicker
                  mode="single"
                  selected={
                    bookingData.checkOutDate
                      ? new Date(bookingData.checkOutDate)
                      : undefined
                  }
                  disabled={{
                    before: bookingData.checkInDate
                      ? new Date(bookingData.checkInDate)
                      : today,
                  }}
                  onSelect={(date) => {
                    if (!date || !bookingData.checkInDate) return;

                    const checkIn = new Date(bookingData.checkInDate);
                    const checkOut = new Date(date);

                    const diffDays = Math.ceil(
                      (checkOut - checkIn) / (1000 * 60 * 60 * 24),
                    );

                    if (diffDays <= 0) return;

                    let duration = diffDays;

                    if (bookingData.bookingType === "Weekly") {
                      duration = Math.max(1, Math.ceil(diffDays / 7));
                    }

                    if (bookingData.bookingType === "Monthly") {
                      duration = Math.max(1, Math.ceil(diffDays / 30));
                    }

                    setBookingData((prev) => ({
                      ...prev,
                      checkOutDate: date,
                      duration,
                    }));

                    setShowCheckOut(false);
                  }}
                />
              </CalendarPopup>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===================================================
            GUESTS
        ==================================================== */}

        <motion.div variants={itemVariants}>
          <FormLabel icon={<Users size={15} />} text="Number of Guests" />

          <div
            className="
              !relative
              !flex
              !items-center
              !justify-between
              !overflow-hidden
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-gradient-to-r
              !from-[var(--color-surface-secondary)]
              !via-[var(--color-surface)]
              !to-[var(--color-surface-secondary)]
              !p-2
            "
          >
            <CounterButton
              disabled={bookingData.numberOfGuests <= 1}
              onClick={() =>
                setBookingData((prev) => ({
                  ...prev,
                  numberOfGuests: Math.max(1, Number(prev.numberOfGuests) - 1),
                }))
              }
            >
              <Minus size={16} />
            </CounterButton>

            <AnimatePresence mode="wait">
              <motion.div
                key={bookingData.numberOfGuests}
                initial={{
                  opacity: 0,
                  y: 8,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.8,
                }}
                className="!flex !items-center !gap-2"
              >
                <span
                  className="
                    !bg-gradient-to-r
                    !from-[var(--color-text-primary)]
                    !to-[var(--color-primary)]
                    !bg-clip-text
                    !text-2xl
                    !font-bold
                    !text-transparent
                  "
                >
                  {bookingData.numberOfGuests}
                </span>

                <span className="!text-xs !text-[var(--color-text-secondary)]">
                  {Number(bookingData.numberOfGuests) === 1
                    ? "Guest"
                    : "Guests"}
                </span>
              </motion.div>
            </AnimatePresence>

            <CounterButton
              disabled={
                Number(bookingData.numberOfGuests) >= room.availableBeds
              }
              onClick={() => {
                if (Number(bookingData.numberOfGuests) >= room.availableBeds) {
                  toast.error(`Only ${room.availableBeds} beds available`);
                  return;
                }

                setBookingData((prev) => ({
                  ...prev,
                  numberOfGuests: Number(prev.numberOfGuests) + 1,
                }));
              }}
            >
              <Plus size={16} />
            </CounterButton>
          </div>

          <div className="!mt-2 !flex !items-center !gap-2">
            <span className="!h-1.5 !w-1.5 !rounded-full !bg-[var(--color-success)] !shadow-[0_0_8px_var(--color-success)]" />

            <p className="!text-xs !text-[var(--color-text-muted)]">
              {room.availableBeds} beds currently available
            </p>
          </div>
        </motion.div>

        {/* ===================================================
            STAY DURATION
        ==================================================== */}

        <motion.div variants={itemVariants}>
          <FormLabel icon={<Clock3 size={15} />} text="Stay Duration" />

          <div className="!grid !grid-cols-3 !gap-2.5">
            {[
              {
                type: "Daily",
                title: "Daily",
                subtitle: "Per day",
              },
              {
                type: "Weekly",
                title: "Weekly",
                subtitle: "7 days",
              },
              {
                type: "Monthly",
                title: "Monthly",
                subtitle: "30 days",
              },
            ].map((option) => {
              const selected = bookingData.bookingType === option.type;

              return (
                <motion.button
                  key={option.type}
                  type="button"
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    setBookingData((prev) => ({
                      ...prev,
                      bookingType: option.type,
                    }))
                  }
                  className={`
                    !relative
                    !overflow-hidden
                    !rounded-2xl
                    !border
                    !p-3.5
                    !text-left
                    !transition-all
                    !duration-300
                    ${
                      selected
                        ? "!border-[var(--color-primary)]/60 !bg-gradient-to-br !from-[var(--color-primary)]/15 !via-[var(--color-primary)]/[0.06] !to-transparent !shadow-[0_12px_35px_var(--color-primary)]/10"
                        : "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)] hover:!border-[var(--color-primary)]/30 hover:!bg-[var(--color-surface)]"
                    }
                  `}
                >
                  {selected && (
                    <>
                      <motion.div
                        layoutId="selectedDuration"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="
                          !absolute
                          !inset-0
                          !rounded-2xl
                          !border
                          !border-[var(--color-primary)]/20
                        "
                      />

                      <motion.div
                        initial={{
                          x: "-100%",
                        }}
                        animate={{
                          x: "100%",
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut",
                        }}
                        className="
                          !absolute
                          !inset-y-0
                          !w-1/2
                          !bg-gradient-to-r
                          !from-transparent
                          !via-[var(--color-primary)]/10
                          !to-transparent
                          !skew-x-12
                        "
                      />
                    </>
                  )}

                  <div className="!relative !z-10">
                    <div className="!flex !items-center !justify-between">
                      <p
                        className={`
                          !text-sm
                          !font-semibold
                          ${
                            selected
                              ? "!text-[var(--color-primary)]"
                              : "!text-[var(--color-text-primary)]"
                          }
                        `}
                      >
                        {option.title}
                      </p>

                      <AnimatePresence>
                        {selected && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              scale: 0.5,
                              rotate: -30,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                            }}
                            className="
                              !flex
                              !h-5
                              !w-5
                              !items-center
                              !justify-center
                              !rounded-full
                              !bg-[var(--color-primary)]
                              !text-[var(--color-surface)]
                            "
                          >
                            <Check size={12} strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <p className="!mt-1 !text-[11px] !text-[var(--color-text-muted)]">
                      {option.subtitle}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ===================================================
            DURATION COUNTER
        ==================================================== */}

        <motion.div variants={itemVariants}>
          <FormLabel
            text={
              bookingData.bookingType === "Daily"
                ? "Number of Days"
                : bookingData.bookingType === "Weekly"
                  ? "Number of Weeks"
                  : "Number of Months"
            }
          />

          <div
            className="
              !relative
              !flex
              !items-center
              !justify-between
              !overflow-hidden
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-gradient-to-r
              !from-[var(--color-surface-secondary)]
              !via-[var(--color-surface)]
              !to-[var(--color-surface-secondary)]
              !p-2
            "
          >
            <CounterButton
              disabled={bookingData.duration <= 1}
              onClick={() =>
                setBookingData((prev) => ({
                  ...prev,
                  duration: Math.max(1, prev.duration - 1),
                }))
              }
            >
              <Minus size={17} />
            </CounterButton>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${bookingData.bookingType}-${bookingData.duration}`}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  y: -8,
                }}
                className="!text-center"
              >
                <span
                  className="
                    !bg-gradient-to-r
                    !from-[var(--color-text-primary)]
                    !to-[var(--color-primary)]
                    !bg-clip-text
                    !text-xl
                    !font-bold
                    !text-transparent
                  "
                >
                  {bookingData.duration}
                </span>

                <span className="!ml-2 !text-xs !text-[var(--color-text-secondary)]">
                  {bookingData.bookingType === "Daily"
                    ? bookingData.duration === 1
                      ? "Day"
                      : "Days"
                    : bookingData.bookingType === "Weekly"
                      ? bookingData.duration === 1
                        ? "Week"
                        : "Weeks"
                      : bookingData.duration === 1
                        ? "Month"
                        : "Months"}
                </span>
              </motion.div>
            </AnimatePresence>

            <CounterButton
              onClick={() =>
                setBookingData((prev) => ({
                  ...prev,
                  duration: prev.duration + 1,
                }))
              }
            >
              <Plus size={17} />
            </CounterButton>
          </div>
        </motion.div>

        {/* ===================================================
            SPECIAL REQUEST
        ==================================================== */}

        <motion.div variants={itemVariants}>
          <FormLabel icon={<FileText size={15} />} text="Special Request" />

          <motion.div
            whileFocus={{
              scale: 1.005,
            }}
            className="
              !relative
              !overflow-hidden
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-gradient-to-br
              !from-[var(--color-surface-secondary)]
              !to-[var(--color-surface)]
              !transition-all
              !duration-300
              focus-within:!border-[var(--color-primary)]/50
              focus-within:!shadow-[0_0_0_4px_var(--color-primary)]/8
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
                !via-transparent
                !to-[var(--color-primary)]
                !opacity-50
              "
            />

            <textarea
              rows="4"
              name="specialRequest"
              value={bookingData.specialRequest}
              onChange={handleChange}
              placeholder="Anything you'd like us to know?"
              className="
                !w-full
                !resize-none
                !border-none
                !bg-transparent
                !p-4
                !text-sm
                !leading-6
                !text-[var(--color-text-primary)]
                !outline-none
                !ring-0
                placeholder:!text-[var(--color-text-muted)]
              "
            />
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM NOTE
      ====================================================== */}

      <motion.div
        variants={itemVariants}
        whileHover={{
          y: -2,
        }}
        className="
          !relative
          !mt-7
          !flex
          !items-start
          !gap-3
          !overflow-hidden
          !rounded-2xl
          !border
          !border-[var(--color-primary)]/15
          !bg-gradient-to-r
          !from-[var(--color-primary)]/[0.07]
          !via-[var(--color-surface-secondary)]
          !to-transparent
          !p-4
          !transition-all
          !duration-300
          hover:!border-[var(--color-primary)]/25
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            !mt-1
            !h-2
            !w-2
            !shrink-0
            !rounded-full
            !bg-[var(--color-primary)]
            !shadow-[0_0_14px_var(--color-primary)]
          "
        />

        <p
          className="
            !text-xs
            !leading-5
            !text-[var(--color-text-secondary)]
          "
        >
          Your selected dates and stay duration will be reflected automatically
          in the booking summary.
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   FORM LABEL
============================================================ */

const FormLabel = ({ icon, text }) => {
  return (
    <label
      className="
        !mb-2.5
        !flex
        !items-center
        !gap-2
        !text-sm
        !font-semibold
        !text-[var(--color-text-primary)]
      "
    >
      <span className="!text-[var(--color-primary)]">{icon}</span>

      {text}
    </label>
  );
};

/* ============================================================
   COUNTER BUTTON
============================================================ */

const CounterButton = ({ children, disabled, onClick }) => {
  return (
    <motion.button
      type="button"
      whileHover={{
        scale: disabled ? 1 : 1.06,
        y: disabled ? 0 : -1,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.9,
      }}
      disabled={disabled}
      onClick={onClick}
      className="
        !relative
        !flex
        !h-10
        !w-10
        !items-center
        !justify-center
        !overflow-hidden
        !rounded-xl
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface-tertiary)]
        !text-[var(--color-text-secondary)]
        !transition-all
        !duration-300
        hover:!border-[var(--color-primary)]/40
        hover:!bg-[var(--color-primary)]/10
        hover:!text-[var(--color-primary)]
        disabled:!cursor-not-allowed
        disabled:!opacity-30
      "
    >
      {children}
    </motion.button>
  );
};

/* ============================================================
   CALENDAR POPUP
============================================================ */

const CalendarPopup = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.96,
      }}
      transition={{
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        !absolute
        !left-0
        !top-full
        !z-[100]
        !mt-3
        !rounded-2xl
        !border
        !border-[var(--color-primary)]/20
        !bg-[var(--color-surface-elevated)]
        !p-3
        !shadow-[0_25px_80px_var(--color-shadow-glow)]
        !backdrop-blur-2xl
      "
    >
      <div
        className="
          !pointer-events-none
          !absolute
          !-right-5
          !-top-5
          !h-20
          !w-20
          !rounded-full
          !bg-[var(--color-primary)]
          !opacity-[0.08]
          !blur-[35px]
        "
      />

      <div className="!relative">{children}</div>
    </motion.div>
  );
};

export default BookingForm;
