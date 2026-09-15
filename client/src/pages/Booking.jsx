import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CreditCard,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import { getRoomById } from "../services/roomService";

import RoomBookingInfo from "../components/booking/RoomBookingInfo";
import BookingForm from "../components/booking/BookingForm";
import BookingSummary from "../components/booking/BookingSummary";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    bookingType: "Daily",
    duration: 1,
    numberOfGuests: 1,
    specialRequest: "",
  });

  /* ============================================================
     FETCH ROOM
  ============================================================ */

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        setRoom(data.room);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [id]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (!room) {
    return (
      <main className="!relative !min-h-[calc(100svh-80px)] !overflow-hidden !bg-[var(--color-background)] !text-[var(--color-text-primary)]">
        <AmbientBackground />

        <div className="!relative !z-10 !flex !min-h-[calc(100svh-80px)] !items-center !justify-center !px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="!text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                !mx-auto
                !mb-5
                !h-11
                !w-11
                !rounded-full
                !border-2
                !border-[var(--color-border)]
                !border-t-[var(--color-primary)]
              "
            />

            <p className="!text-sm !text-[var(--color-text-muted)]">
              Preparing your booking experience...
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="!relative !min-h-screen !overflow-hidden !bg-[var(--color-background)] !text-[var(--color-text-primary)]">
      <AmbientBackground />

      <div
        className="
          !relative
          !z-10
          !mx-auto
          !max-w-[1500px]
          !px-5
          !py-7
          sm:!px-8
          sm:!py-9
          lg:!px-10
          xl:!px-12
        "
      >
        {/* ======================================================
            TOP BAR
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mb-10 !flex !items-center !justify-between"
        >
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/rooms/${room._id}`)}
            className="
              !group
              !inline-flex
              !items-center
              !gap-2
              !rounded-full
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface)]/80
              !px-4
              !py-2.5
              !text-sm
              !text-[var(--color-text-secondary)]
              !shadow-[var(--shadow-soft)]
              !backdrop-blur-xl
              !transition-all
              !duration-300
              hover:!border-[var(--color-primary)]/40
              hover:!text-[var(--color-primary)]
            "
          >
            <ArrowLeft
              size={16}
              className="!transition-transform !duration-300 group-hover:!-translate-x-1"
            />

            <span>Back to room</span>
          </motion.button>

          <div className="!hidden !items-center !gap-3 sm:!flex">
            <span className="!relative !flex !h-2 !w-2">
              <span className="!absolute !inline-flex !h-full !w-full !animate-ping !rounded-full !bg-[var(--color-primary)]/40" />

              <span className="!relative !inline-flex !h-2 !w-2 !rounded-full !bg-[var(--color-primary)]" />
            </span>

            <span
              className="
                !text-[10px]
                !font-semibold
                !uppercase
                !tracking-[0.25em]
                !text-[var(--color-text-muted)]
              "
            >
              Secure reservation
            </span>
          </div>
        </motion.div>

        {/* ======================================================
            HERO / PAGE HEADER
        ======================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mb-12"
        >
          <div className="!mx-auto !max-w-4xl !text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="
                !mb-5
                !inline-flex
                !items-center
                !gap-2
                !rounded-full
                !border
                !border-[var(--color-primary)]/25
                !bg-[var(--color-primary)]/8
                !px-4
                !py-2
              "
            >
              <Sparkles size={14} className="!text-[var(--color-primary)]" />

              <span
                className="
                  !text-[10px]
                  !font-bold
                  !uppercase
                  !tracking-[0.25em]
                  !text-[var(--color-primary)]
                "
              >
                Complete your reservation
              </span>
            </motion.div>

            <h1
              className="
                !text-4xl
                !font-bold
                !leading-[1.05]
                !tracking-[-0.04em]
                !text-[var(--color-text-primary)]
                sm:!text-5xl
                lg:!text-6xl
              "
            >
              Make your next stay
              <span className="!block !text-[var(--color-primary)]">
                feel like home.
              </span>
            </h1>

            <p
              className="
                !mx-auto
                !mt-5
                !max-w-2xl
                !text-sm
                !leading-7
                !text-[var(--color-text-secondary)]
                sm:!text-base
              "
            >
              Choose your dates, personalize your stay and review everything
              before confirming your reservation.
            </p>
          </div>
        </motion.section>

        {/* ======================================================
            BOOKING PROGRESS
        ======================================================= */}

        <BookingProgress room={room} />

        {/* ======================================================
            MAIN BOOKING AREA
        ======================================================= */}

        <div
          className="
            !grid
            !items-start
            !gap-6
            lg:!grid-cols-[0.82fr_1.35fr]
            xl:!grid-cols-[0.8fr_1.35fr_0.75fr]
          "
        >
          {/* ROOM */}

          <AnimatedCard delay={0.25}>
            <RoomBookingInfo room={room} />
          </AnimatedCard>

          {/* FORM */}

          <AnimatedCard delay={0.35}>
            <BookingForm
              room={room}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          </AnimatedCard>

          {/* SUMMARY */}

          <AnimatedCard delay={0.45} className="lg:!col-span-2 xl:!col-span-1">
            <div className="xl:!sticky xl:!top-6">
              <BookingSummary
                room={room}
                bookingData={bookingData}
                onProceed={(amount) => {
                  navigate("/payment", {
                    state: {
                      room,
                      bookingData,
                      totalAmount: amount,
                    },
                  });
                }}
              />
            </div>
          </AnimatedCard>
        </div>

        {/* ======================================================
            TRUST SECTION
        ======================================================= */}

        <TrustSection />

        {/* ======================================================
            FOOTNOTE
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.9,
          }}
          className="!mt-8 !text-center"
        >
          <p
            className="
              !text-[10px]
              !font-medium
              !uppercase
              !tracking-[0.2em]
              !text-[var(--color-text-muted)]
            "
          >
            Comfortable stays · Modern facilities · Secure living
          </p>
        </motion.div>
      </div>
    </main>
  );
};

/* ================================================================
   AMBIENT BACKGROUND
================================================================ */

const AmbientBackground = () => {
  return (
    <div className="!pointer-events-none !absolute !inset-0 !overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !absolute
          !-left-48
          !top-20
          !h-[420px]
          !w-[420px]
          !rounded-full
          !bg-[var(--color-primary)]/8
          !blur-[130px]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !absolute
          !-right-48
          !top-[35%]
          !h-[500px]
          !w-[500px]
          !rounded-full
          !bg-[var(--color-primary)]/6
          !blur-[150px]
        "
      />

      <div
        className="
          !absolute
          !inset-0
          !opacity-[0.025]
          [background-image:linear-gradient(var(--color-text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />
    </div>
  );
};

/* ================================================================
   BOOKING PROGRESS
================================================================ */

const BookingProgress = ({ room }) => {
  const steps = [
    {
      number: "01",
      title: "Room selected",
      subtitle: `Room ${room.roomNumber}`,
      completed: true,
    },
    {
      number: "02",
      title: "Booking details",
      subtitle: "Dates & preferences",
      active: true,
    },
    {
      number: "03",
      title: "Payment",
      subtitle: "Secure checkout",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      className="
        !mb-10
        !hidden
        !items-center
        !justify-center
        !gap-5
        md:!flex
      "
    >
      {steps.map((step, index) => (
        <div key={step.number} className="!flex !items-center !gap-5">
          <div className="!flex !items-center !gap-3">
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.35 + index * 0.12,
                type: "spring",
                stiffness: 180,
              }}
              className={`
                !flex
                !h-10
                !w-10
                !shrink-0
                !items-center
                !justify-center
                !rounded-full
                !border
                !text-xs
                !font-bold
                !transition-all
                ${
                  step.completed
                    ? "!border-[var(--color-primary)] !bg-[var(--color-primary)] !text-[var(--color-on-primary)]"
                    : step.active
                      ? "!border-[var(--color-primary)] !bg-[var(--color-primary)]/10 !text-[var(--color-primary)]"
                      : "!border-[var(--color-border)] !bg-[var(--color-surface)] !text-[var(--color-text-muted)]"
                }
              `}
            >
              {step.completed ? <CheckCircle2 size={17} /> : step.number}
            </motion.div>

            <div className="!hidden !text-left lg:!block">
              <p
                className={`
                  !text-xs
                  !font-semibold
                  ${
                    step.active || step.completed
                      ? "!text-[var(--color-text-primary)]"
                      : "!text-[var(--color-text-muted)]"
                  }
                `}
              >
                {step.title}
              </p>

              <p className="!mt-0.5 !text-[10px] !text-[var(--color-text-muted)]">
                {step.subtitle}
              </p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`
                !h-px
                !w-12
                ${
                  index === 0
                    ? "!bg-[var(--color-primary)]/60"
                    : "!bg-[var(--color-border)]"
                }
              `}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
};

/* ================================================================
   ANIMATED CARD
================================================================ */

const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ================================================================
   TRUST SECTION
================================================================ */

const TrustSection = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Secure booking",
      description: "Your details stay protected.",
    },
    {
      icon: CreditCard,
      title: "Safe payment",
      description: "Protected payment experience.",
    },
    {
      icon: CalendarDays,
      title: "Flexible stay",
      description: "Choose dates that work for you.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.7,
      }}
      className="!mt-8 !grid !gap-3 sm:!grid-cols-3"
    >
      {trustItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              !group
              !relative
              !overflow-hidden
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface)]/80
              !p-4
              !backdrop-blur-xl
              !transition-all
              !duration-300
              hover:!border-[var(--color-primary)]/30
              hover:!shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                !absolute
                !-right-10
                !-top-10
                !h-24
                !w-24
                !rounded-full
                !bg-[var(--color-primary)]/5
                !blur-2xl
                !transition-transform
                !duration-500
                group-hover:!scale-150
              "
            />

            <div className="!relative !flex !items-center !gap-3">
              <div
                className="
                  !flex
                  !h-10
                  !w-10
                  !shrink-0
                  !items-center
                  !justify-center
                  !rounded-xl
                  !border
                  !border-[var(--color-primary)]/15
                  !bg-[var(--color-primary)]/8
                  !text-[var(--color-primary)]
                "
              >
                <Icon size={18} />
              </div>

              <div>
                <p className="!text-xs !font-semibold !text-[var(--color-text-primary)]">
                  {item.title}
                </p>

                <p className="!mt-1 !text-[10px] !text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default Booking;
