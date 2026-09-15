import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createPayment } from "../services/paymentService";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Users,
  WalletCards,
  Sparkles,
} from "lucide-react";
import { createBooking } from "../services/bookingService";
import { format, isValid } from "date-fns";

/* =========================================================
   DESIGN TOKENS
========================================================= */

const COLORS = {
  gold: "#D4AF37",
  goldLight: "#E7C95C",
  goldDark: "#B08D20",

  darkBg: "#0B0B0B",
  darkCard: "#111111",
  darkSoft: "#151515",
  darkBorder: "#292929",

  lightBg: "#F8F7F3",
  lightCard: "#FFFFFF",
  lightSoft: "#F5F3EC",
  lightBorder: "#E8E3D5",

  success: "#4CB39B",
};

/* =========================================================
   BOOKING STEPS
========================================================= */

const BOOKING_STEPS = [
  {
    number: "01",
    title: "Room selected",
    description: "Room preference",
    icon: Check,
  },
  {
    number: "02",
    title: "Booking details",
    description: "Dates & preferences",
    icon: Check,
  },
  {
    number: "03",
    title: "Payment",
    description: "Secure checkout",
    icon: CreditCard,
  },
];

/* =========================================================
   PAYMENT METHODS
========================================================= */

const PAYMENT_METHODS = [
  {
    id: "UPI",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "Debit Card",
    label: "Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "Credit Card",
    label: "Credit Card",
    description: "Visa, Mastercard, Amex",
    icon: WalletCards,
  },
  {
    id: "Net Banking",
    label: "Net Banking",
    description: "All major banks supported",
    icon: Banknote,
  },
];

/* =========================================================
   PAYMENT PAGE
========================================================= */

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);

  /* =======================================================
     INVALID PAYMENT STATE
  ======================================================= */

  if (!state) {
    return (
      <main
        className="
          !relative !min-h-screen !overflow-hidden
          !bg-[#F8F7F3] !px-6 !py-20 !text-[#171717]
          dark:!bg-[#0B0B0B] dark:!text-white
        "
      >
        {/* Ambient background */}

        <div
          className="
            !pointer-events-none !absolute !-left-40 !top-20
            !h-96 !w-96 !rounded-full
            !bg-[#D4AF37]/10
            !blur-[130px]
          "
        />

        <div
          className="
            !pointer-events-none !absolute !-right-40 !bottom-0
            !h-96 !w-96 !rounded-full
            !bg-[#E7C95C]/10
            !blur-[130px]
          "
        />

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !relative !z-10 !mx-auto !max-w-xl
            !rounded-[2rem]
            !border !border-black/10
            !bg-white/80
            !p-8 !text-center
            !shadow-[0_30px_80px_rgba(0,0,0,0.08)]
            !backdrop-blur-2xl
            dark:!border-white/10
            dark:!bg-[#111111]/80
            dark:!shadow-[0_30px_80px_rgba(0,0,0,0.35)]
          "
        >
          <div
            className="
              !mx-auto !mb-6 !flex !h-16 !w-16
              !items-center !justify-center
              !rounded-2xl
              !border !border-[#D4AF37]/30
              !bg-gradient-to-br
              !from-[#D4AF37]/20
              !to-[#E7C95C]/5
            "
          >
            <CreditCard
              size={28}
              className="!text-[#B08D20] dark:!text-[#D4AF37]"
            />
          </div>

          <h1
            className="
              !text-3xl !font-semibold
              !text-[#171717]
              dark:!text-white
            "
          >
            Invalid Payment Request
          </h1>

          <p
            className="
              !mt-3 !text-sm !leading-6
              !text-black/50
              dark:!text-white/45
            "
          >
            We couldn't find the booking information required to continue.
          </p>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/rooms")}
            className="
              !mt-8 !inline-flex !items-center !gap-2
              !rounded-xl
              !bg-gradient-to-r
              !from-[#C9A227]
              !via-[#D4AF37]
              !to-[#E7C95C]
              !px-6 !py-3
              !font-semibold
              !text-[#17130A]
              !shadow-[0_10px_30px_rgba(212,175,55,0.2)]
            "
          >
            Browse Rooms
            <ArrowRight size={17} />
          </motion.button>
        </motion.div>
      </main>
    );
  }

  const { room, bookingData, totalAmount } = state;

  /* =======================================================
     DATE FORMATTER
  ======================================================= */

  const formatBookingDate = (date) => {
    if (!date) return "Not Available";

    const parsedDate = new Date(date);

    if (!isValid(parsedDate)) {
      return "Invalid Date";
    }

    return format(parsedDate, "dd MMM yyyy");
  };

  /* =======================================================
     PAYMENT HANDLER
  ======================================================= */

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const booking = {
        room: room._id,

        checkInDate: bookingData.checkInDate
          ? format(new Date(bookingData.checkInDate), "yyyy-MM-dd")
          : null,

        checkOutDate: bookingData.checkOutDate
          ? format(new Date(bookingData.checkOutDate), "yyyy-MM-dd")
          : null,

        bookingType: bookingData.bookingType,

        numberOfGuests: Number(bookingData.numberOfGuests),

        specialRequest: bookingData.specialRequest,
      };

      console.log("Sending Booking:", booking);

      const bookingResponse = await createBooking(booking);

      const paymentResponse = await createPayment(
        bookingResponse.booking._id,
        paymentMethod,
      );

      alert("Payment Successful!");

      navigate("/customer/receipt", {
        state: {
          booking: paymentResponse.booking || bookingResponse.booking,
          payment: paymentResponse.payment,
        },
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main
      className="
        !relative !min-h-screen !overflow-hidden
        !bg-[#F8F7F3]
        dark:!bg-[#0B0B0B]
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="!pointer-events-none !fixed !inset-0 !overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute !-left-40 !top-10
            !h-[500px] !w-[500px]
            !rounded-full
            !bg-[#D4AF37]/[0.07]
            !blur-[140px]
          "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute !-right-40 !bottom-0
            !h-[500px] !w-[500px]
            !rounded-full
            !bg-[#E7C95C]/[0.06]
            !blur-[150px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            !absolute !inset-0 !opacity-[0.025]
            dark:!opacity-[0.035]
            !bg-[linear-gradient(rgba(212,175,55,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.4)_1px,transparent_1px)]
            !bg-[size:60px_60px]
          "
        />
      </div>

      <div
        className="
          !relative !z-10
          !mx-auto !max-w-7xl
          !px-5 !py-8
          sm:!px-8 sm:!py-12
          lg:!px-10 lg:!py-16
        "
      >
        {/* =====================================================
            BACK BUTTON
        ====================================================== */}

        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="
            !mb-8 !flex !items-center !gap-2
            !text-sm
            !text-black/45
            !transition-all !duration-300
            hover:!-translate-x-1
            hover:!text-[#B08D20]
            dark:!text-white/40
            dark:hover:!text-[#D4AF37]
          "
        >
          <ArrowLeft size={17} />
          Back to booking
        </motion.button>

        {/* =====================================================
            BOOKING STEPPER
        ====================================================== */}

        <BookingStepper />

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mb-10 !mt-10"
        >
          <div className="!mb-3 !flex !items-center !gap-3">
            <span
              className="
                !h-px !w-8
                !bg-gradient-to-r
                !from-[#D4AF37]
                !to-[#E7C95C]
              "
            />

            <span
              className="
                !text-xs !font-semibold
                !uppercase !tracking-[0.25em]
                !text-[#B08D20]
                dark:!text-[#D4AF37]
              "
            >
              Secure Checkout
            </span>
          </div>

          <div
            className="
              !flex !flex-col !gap-5
              sm:!flex-row sm:!items-end sm:!justify-between
            "
          >
            <div>
              <h1
                className="
                  !text-3xl !font-semibold !tracking-tight
                  !text-[#171717]
                  sm:!text-4xl
                  lg:!text-5xl
                  dark:!text-white
                "
              >
                Complete your{" "}
                <span
                  className="
                    !bg-gradient-to-r
                    !from-[#B08D20]
                    !via-[#D4AF37]
                    !to-[#E7C95C]
                    !bg-clip-text
                    !text-transparent
                  "
                >
                  booking.
                </span>
              </h1>

              <p
                className="
                  !mt-3 !max-w-2xl
                  !text-sm !leading-7
                  !text-black/45
                  sm:!text-base
                  dark:!text-white/40
                "
              >
                Review your stay details and choose your preferred payment
                method.
              </p>
            </div>

            <div
              className="
                !flex !w-fit !items-center !gap-2
                !rounded-full
                !border !border-[#D4AF37]/20
                !bg-white/70
                !px-4 !py-2.5
                !text-xs
                !text-black/50
                !shadow-sm
                !backdrop-blur-xl
                dark:!border-[#D4AF37]/20
                dark:!bg-[#111111]/70
                dark:!text-white/45
              "
            >
              <LockKeyhole
                size={14}
                className="!text-[#B08D20] dark:!text-[#D4AF37]"
              />
              Secure checkout
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="!grid !gap-7 lg:!grid-cols-[1.05fr_0.95fr]">
          {/* =================================================
              BOOKING SUMMARY
          ================================================== */}

          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4 }}
            className="
              !group !relative !overflow-hidden
              !rounded-[1.75rem]
              !border
              !border-black/10
              !bg-white/85
              !shadow-[0_25px_70px_rgba(0,0,0,0.07)]
              !backdrop-blur-2xl
              dark:!border-white/10
              dark:!bg-[#111111]/90
              dark:!shadow-[0_25px_70px_rgba(0,0,0,0.28)]
            "
          >
            {/* Gold glow */}

            <div
              className="
                !pointer-events-none !absolute
                !-right-24 !-top-24
                !h-72 !w-72
                !rounded-full
                !bg-[#D4AF37]/10
                !blur-[100px]
              "
            />

            {/* Room Image */}

            <div
              className="
                !relative !h-[260px]
                !overflow-hidden
                sm:!h-[320px]
              "
            >
              <motion.img
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.04 }}
                src={room.roomImages?.[0] || "/placeholder.jpg"}
                alt={`Room ${room.roomNumber}`}
                className="!h-full !w-full !object-cover"
              />

              {/* Cinematic gradient */}

              <div
                className="
                  !absolute !inset-0
                  !bg-gradient-to-t
                  !from-black/85
                  !via-black/25
                  !to-transparent
                "
              />

              {/* Gold cinematic glow */}

              <div
                className="
                  !absolute !inset-0
                  !bg-gradient-to-tr
                  !from-[#D4AF37]/10
                  !via-transparent
                  !to-[#E7C95C]/15
                "
              />

              <div className="!absolute !bottom-5 !left-5">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="
                    !mb-1 !text-[10px]
                    !font-semibold !uppercase
                    !tracking-[0.25em]
                    !text-[#E7C95C]
                  "
                >
                  Your Stay
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="!text-2xl !font-semibold !text-white"
                >
                  Room {room.roomNumber}
                </motion.h2>

                <p className="!mt-1 !text-sm !text-white/60">
                  {room.roomType}
                  <span className="!px-2 !text-[#D4AF37]">•</span>
                  {room.sharingType}
                </p>
              </div>

              {/* Selected badge */}

              <div
                className="
                  !absolute !right-5 !top-5
                  !flex !items-center !gap-2
                  !rounded-full
                  !border !border-white/20
                  !bg-black/30
                  !px-3 !py-2
                  !text-[10px]
                  !font-semibold
                  !uppercase !tracking-[0.15em]
                  !text-white
                  !backdrop-blur-xl
                "
              >
                <CheckCircle2 size={13} className="!text-[#D4AF37]" />
                Selected
              </div>
            </div>

            {/* Details */}

            <div className="!relative !p-5 sm:!p-7">
              <div className="!grid !grid-cols-2 !gap-3">
                <InfoItem
                  icon={CalendarDays}
                  label="Check-in"
                  value={formatBookingDate(bookingData.checkInDate)}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Check-out"
                  value={formatBookingDate(bookingData.checkOutDate)}
                />

                <InfoItem
                  icon={Users}
                  label="Guests"
                  value={`${bookingData.numberOfGuests} ${
                    Number(bookingData.numberOfGuests) === 1
                      ? "Guest"
                      : "Guests"
                  }`}
                />

                <InfoItem
                  icon={BadgeCheck}
                  label="Booking"
                  value={bookingData.bookingType}
                />
              </div>

              {/* Price */}

              <div
                className="
                  !relative !mt-6
                  !overflow-hidden
                  !rounded-2xl
                  !border
                  !border-[#D4AF37]/20
                  !bg-gradient-to-br
                  !from-[#D4AF37]/10
                  !via-[#D4AF37]/[0.04]
                  !to-transparent
                  !p-5
                "
              >
                <div
                  className="
                    !pointer-events-none !absolute
                    !-right-10 !-top-10
                    !h-32 !w-32
                    !rounded-full
                    !bg-[#D4AF37]/10
                    !blur-[50px]
                  "
                />

                <div className="!relative !flex !items-end !justify-between">
                  <div>
                    <div className="!flex !items-center !gap-2">
                      <Sparkles size={14} className="!text-[#D4AF37]" />

                      <p
                        className="
                          !text-xs !uppercase
                          !tracking-[0.2em]
                          !text-black/45
                          dark:!text-white/40
                        "
                      >
                        Total amount
                      </p>
                    </div>

                    <p
                      className="
                        !mt-1 !text-sm
                        !text-black/45
                        dark:!text-white/40
                      "
                    >
                      Final booking amount
                    </p>
                  </div>

                  <motion.p
                    key={totalAmount}
                    initial={{ opacity: 0, scale: 0.85, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="
                      !text-3xl !font-bold
                      !bg-gradient-to-r
                      !from-[#A78318]
                      !via-[#D4AF37]
                      !to-[#E7C95C]
                      !bg-clip-text
                      !text-transparent
                    "
                  >
                    ₹{totalAmount}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* =================================================
              PAYMENT METHOD
          ================================================== */}

          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              !relative !overflow-hidden
              !rounded-[1.75rem]
              !border
              !border-black/10
              !bg-white/85
              !p-5
              !shadow-[0_25px_70px_rgba(0,0,0,0.07)]
              !backdrop-blur-2xl
              sm:!p-7
              dark:!border-white/10
              dark:!bg-[#111111]/90
              dark:!shadow-[0_25px_70px_rgba(0,0,0,0.28)]
            "
          >
            {/* Top glow */}

            <div
              className="
                !pointer-events-none !absolute
                !-right-20 !-top-20
                !h-52 !w-52
                !rounded-full
                !bg-[#D4AF37]/10
                !blur-[80px]
              "
            />

            <div className="!relative">
              <p
                className="
                  !text-xs !font-semibold
                  !uppercase !tracking-[0.22em]
                  !text-[#B08D20]
                  dark:!text-[#D4AF37]
                "
              >
                Payment method
              </p>

              <h2
                className="
                  !mt-2 !text-2xl
                  !font-semibold
                  !text-[#171717]
                  dark:!text-white
                "
              >
                How would you like to pay?
              </h2>

              <p
                className="
                  !mt-2 !text-sm
                  !text-black/45
                  dark:!text-white/40
                "
              >
                Choose your preferred payment option.
              </p>
            </div>

            {/* Methods */}

            <div className="!relative !mt-7 !space-y-3">
              {PAYMENT_METHODS.map((method, index) => {
                const Icon = method.icon;
                const selected = paymentMethod === method.id;

                return (
                  <motion.button
                    key={method.id}
                    type="button"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.35 + index * 0.06,
                    }}
                    whileHover={{
                      x: 4,
                    }}
                    whileTap={{
                      scale: 0.99,
                    }}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`
                      !relative !flex !w-full
                      !items-center !gap-4
                      !overflow-hidden
                      !rounded-2xl
                      !border
                      !p-4
                      !text-left
                      !transition-all !duration-300

                      ${
                        selected
                          ? "!border-[#D4AF37]/60 !bg-gradient-to-r !from-[#D4AF37]/10 !to-transparent !shadow-[0_10px_30px_rgba(212,175,55,0.08)]"
                          : "!border-black/10 !bg-black/[0.025] hover:!border-[#D4AF37]/30 dark:!border-white/10 dark:!bg-white/[0.025]"
                      }
                    `}
                  >
                    {/* Selected glow */}

                    {selected && (
                      <motion.div
                        layoutId="selectedPayment"
                        className="
                          !absolute !inset-y-0 !left-0
                          !w-1
                          !rounded-full
                          !bg-gradient-to-b
                          !from-[#B08D20]
                          !via-[#D4AF37]
                          !to-[#E7C95C]
                        "
                      />
                    )}

                    <div
                      className={`
                        !flex !h-11 !w-11
                        !shrink-0 !items-center
                        !justify-center
                        !rounded-xl
                        !border
                        ${
                          selected
                            ? "!border-[#D4AF37]/40 !bg-[#D4AF37]/10 !text-[#B08D20] dark:!text-[#D4AF37]"
                            : "!border-black/10 !bg-black/[0.03] !text-black/40 dark:!border-white/10 dark:!bg-white/[0.03] dark:!text-white/40"
                        }
                      `}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="!min-w-0 !flex-1">
                      <p
                        className="
                          !font-medium
                          !text-[#171717]
                          dark:!text-white
                        "
                      >
                        {method.label}
                      </p>

                      <p
                        className="
                          !mt-0.5 !text-xs
                          !text-black/40
                          dark:!text-white/35
                        "
                      >
                        {method.description}
                      </p>
                    </div>

                    <motion.div
                      animate={{
                        scale: selected ? 1 : 0.9,
                      }}
                      className={`
                        !flex !h-5 !w-5
                        !shrink-0 !items-center
                        !justify-center
                        !rounded-full
                        !border
                        ${
                          selected
                            ? "!border-[#D4AF37] !bg-[#D4AF37]"
                            : "!border-black/20 dark:!border-white/15"
                        }
                      `}
                    >
                      {selected && (
                        <Check
                          size={13}
                          strokeWidth={3}
                          className="!text-[#171717]"
                        />
                      )}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected method */}

            <AnimatePresence mode="wait">
              <motion.div
                key={paymentMethod}
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="!overflow-hidden"
              >
                <div
                  className="
                    !mt-5
                    !rounded-2xl
                    !border !border-[#4CB39B]/20
                    !bg-gradient-to-r
                    !from-[#4CB39B]/[0.07]
                    !to-transparent
                    !p-4
                  "
                >
                  <div className="!flex !items-center !gap-3">
                    <ShieldCheck
                      size={19}
                      className="!shrink-0 !text-[#4CB39B]"
                    />

                    <p
                      className="
                        !text-xs !leading-5
                        !text-black/50
                        dark:!text-white/45
                      "
                    >
                      Your payment information is protected with secure
                      encryption.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pay Button */}

            <motion.button
              whileHover={!isProcessing ? { scale: 1.015, y: -2 } : {}}
              whileTap={!isProcessing ? { scale: 0.98 } : {}}
              onClick={handlePayment}
              disabled={isProcessing}
              className="
                !group !relative !mt-7
                !flex !w-full
                !items-center !justify-center
                !gap-2
                !overflow-hidden
                !rounded-2xl
                !bg-gradient-to-r
                !from-[#C9A227]
                !via-[#D4AF37]
                !to-[#E7C95C]
                !px-6 !py-4
                !font-semibold
                !text-[#17130A]
                !shadow-[0_12px_35px_rgba(212,175,55,0.2)]
                !transition-all !duration-300
                hover:!shadow-[0_18px_45px_rgba(212,175,55,0.32)]
                disabled:!cursor-not-allowed
                disabled:!opacity-70
              "
            >
              {!isProcessing && (
                <span
                  className="
                    !absolute !inset-y-0 !-left-10
                    !w-8 !rotate-12
                    !bg-white/50
                    !blur-sm
                    !transition-all !duration-700
                    group-hover:!left-[120%]
                  "
                />
              )}

              {isProcessing ? (
                <>
                  <span
                    className="
                      !h-5 !w-5
                      !animate-spin
                      !rounded-full
                      !border-2
                      !border-[#17130A]/30
                      !border-t-[#17130A]
                    "
                  />
                  Processing...
                </>
              ) : (
                <>
                  <LockKeyhole size={17} />
                  Pay ₹{totalAmount}
                  <ArrowRight
                    size={17}
                    className="
                      !transition-transform !duration-300
                      group-hover:!translate-x-1
                    "
                  />
                </>
              )}
            </motion.button>

            {/* Security */}

            <div
              className="
                !mt-5 !flex
                !flex-wrap !items-center
                !justify-center !gap-2
                !text-xs
                !text-black/35
                dark:!text-white/25
              "
            >
              <LockKeyhole size={13} />

              <span>Secure & encrypted payment</span>

              <span>•</span>

              <span>Safe checkout</span>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

/* =========================================================
   BOOKING STEPPER
========================================================= */

const BookingStepper = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        !relative
        !rounded-[1.5rem]
        !border !border-black/10
        !bg-white/70
        !p-4
        !shadow-[0_15px_45px_rgba(0,0,0,0.04)]
        !backdrop-blur-2xl
        sm:!p-5
        dark:!border-white/10
        dark:!bg-[#111111]/70
      "
    >
      <div
        className="
          !flex !items-center
          !justify-between
          !gap-2
          sm:!gap-4
        "
      >
        {BOOKING_STEPS.map((step, index) => {
          const Icon = step.icon;

          const isCompleted = index < 2;
          const isActive = index === 2;

          return (
            <div
              key={step.number}
              className="!flex !min-w-0 !flex-1 !items-center"
            >
              {/* Step */}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15 + index * 0.12,
                }}
                className="!flex !min-w-0 !items-center !gap-2 sm:!gap-3"
              >
                {/* Number */}

                <div
                  className={`
                    !relative !flex
                    !h-9 !w-9
                    !shrink-0
                    !items-center !justify-center
                    !rounded-full
                    !border
                    !text-xs !font-semibold
                    !transition-all !duration-500
                    sm:!h-11 sm:!w-11

                    ${
                      isCompleted
                        ? "!border-[#D4AF37] !bg-gradient-to-br !from-[#C9A227] !to-[#E7C95C] !text-[#17130A] !shadow-[0_6px_20px_rgba(212,175,55,0.18)]"
                        : isActive
                          ? "!border-[#D4AF37] !bg-[#D4AF37]/10 !text-[#B08D20] dark:!text-[#E7C95C]"
                          : "!border-black/10 !bg-black/[0.02] !text-black/30 dark:!border-white/10 dark:!bg-white/[0.02] dark:!text-white/25"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Icon size={15} strokeWidth={3} />
                  ) : (
                    step.number
                  )}

                  {/* Active pulse */}

                  {isActive && (
                    <motion.span
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.35, 0, 0.35],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="
                        !absolute !inset-[-5px]
                        !rounded-full
                        !border !border-[#D4AF37]/40
                      "
                    />
                  )}
                </div>

                {/* Text */}

                <div className="!hidden !min-w-0 sm:!block">
                  <p
                    className={`
                      !truncate !text-xs !font-medium
                      ${
                        isActive
                          ? "!text-[#171717] dark:!text-white"
                          : isCompleted
                            ? "!text-black/65 dark:!text-white/60"
                            : "!text-black/30 dark:!text-white/25"
                      }
                    `}
                  >
                    {step.title}
                  </p>

                  <p
                    className="
                      !mt-0.5 !truncate
                      !text-[10px]
                      !text-black/35
                      dark:!text-white/25
                    "
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Connector */}

              {index < BOOKING_STEPS.length - 1 && (
                <div className="!relative !mx-2 !h-px !flex-1 !overflow-hidden sm:!mx-4">
                  <div
                    className="
                      !absolute !inset-0
                      !bg-black/10
                      dark:!bg-white/10
                    "
                  />

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: index < 2 ? "100%" : "0%",
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                      !absolute !left-0 !top-0
                      !h-full
                      !bg-gradient-to-r
                      !from-[#C9A227]
                      !via-[#D4AF37]
                      !to-[#E7C95C]
                    "
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="
        !group
        !rounded-2xl
        !border
        !border-black/10
        !bg-black/[0.025]
        !p-4
        !transition-all !duration-300
        hover:!border-[#D4AF37]/30
        hover:!shadow-[0_8px_25px_rgba(212,175,55,0.05)]
        dark:!border-white/10
        dark:!bg-white/[0.025]
      "
    >
      <div className="!flex !items-center !gap-2">
        <div
          className="
            !flex !h-7 !w-7
            !items-center !justify-center
            !rounded-lg
            !bg-[#D4AF37]/10
          "
        >
          <Icon size={14} className="!text-[#B08D20] dark:!text-[#D4AF37]" />
        </div>

        <span
          className="
            !text-[10px]
            !font-semibold
            !uppercase
            !tracking-[0.15em]
            !text-black/40
            dark:!text-white/35
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          !mt-3 !text-sm
          !font-medium
          !text-[#171717]
          dark:!text-white
        "
      >
        {value}
      </p>
    </motion.div>
  );
};

export default Payment;
