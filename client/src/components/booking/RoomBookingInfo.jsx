import { motion } from "framer-motion";
import {
  BedDouble,
  Users,
  CheckCircle2,
  CircleDollarSign,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const RoomBookingInfo = ({ room }) => {
  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
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

  const availablePercentage = room.totalBeds
    ? (room.availableBeds / room.totalBeds) * 100
    : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        !group
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
          AMBIENT BACKGROUND GLOW
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !pointer-events-none
          !absolute
          !-right-24
          !-top-24
          !h-64
          !w-64
          !rounded-full
          !bg-[var(--color-primary)]
          !blur-[90px]
        "
      />

      <motion.div
        animate={{
          x: [0, -15, 0],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !pointer-events-none
          !absolute
          !-bottom-32
          !-left-24
          !h-64
          !w-64
          !rounded-full
          !bg-[var(--color-primary)]
          !blur-[100px]
        "
      />

      {/* =====================================================
          IMAGE SECTION
      ====================================================== */}

      <motion.div
        variants={itemVariants}
        className="
          !relative
          !h-64
          !overflow-hidden
          sm:!h-72
        "
      >
        <motion.img
          src={
            room.roomImages?.length > 0
              ? room.roomImages[0]
              : "/placeholder.jpg"
          }
          alt={room.roomNumber}
          className="
            !h-full
            !w-full
            !object-cover
            !transition-transform
            !duration-700
            group-hover:!scale-110
          "
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Image gradient */}

        <div
          className="
            !absolute
            !inset-0
            !bg-gradient-to-t
            !from-black
            !via-black/25
            !to-transparent
          "
        />

        {/* Top glass gradient */}

        <div
          className="
            !absolute
            !inset-x-0
            !top-0
            !h-24
            !bg-gradient-to-b
            !from-black/40
            !to-transparent
          "
        />

        {/* =================================================
            SELECTED ROOM BADGE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="
            !absolute
            !left-4
            !top-4
            !flex
            !items-center
            !gap-2
            !rounded-full
            !border
            !border-white/15
            !bg-black/35
            !px-3.5
            !py-2
            !text-[10px]
            !font-semibold
            !uppercase
            !tracking-[0.18em]
            !text-[#E7C95C]
            !shadow-lg
            !backdrop-blur-xl
          "
        >
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              !h-1.5
              !w-1.5
              !rounded-full
              !bg-[var(--color-primary)]
            "
          />
          Selected Room
        </motion.div>

        {/* =================================================
            IMAGE TOP RIGHT ICON
        ================================================== */}

        <motion.div
          whileHover={{
            rotate: 45,
            scale: 1.1,
          }}
          className="
            !absolute
            !right-4
            !top-4
            !flex
            !h-10
            !w-10
            !items-center
            !justify-center
            !rounded-full
            !border
            !border-white/15
            !bg-black/30
            !text-white
            !backdrop-blur-xl
          "
        >
          <ArrowUpRight size={17} />
        </motion.div>

        {/* =================================================
            ROOM NUMBER
        ================================================== */}

        <div className="!absolute !bottom-5 !left-5">
          <p
            className="
              !text-[10px]
              !font-medium
              !uppercase
              !tracking-[0.25em]
              !text-white/50
            "
          >
            Room
          </p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="
              !mt-1
              !text-3xl
              !font-semibold
              !tracking-tight
              !text-white
            "
          >
            {room.roomNumber}
          </motion.h2>
        </div>

        {/* Bottom glow */}

        <div
          className="
            !pointer-events-none
            !absolute
            !bottom-0
            !left-1/2
            !h-20
            !w-3/4
            !-translate-x-1/2
            !rounded-full
            !bg-[var(--color-primary)]
            !opacity-10
            !blur-[50px]
          "
        />
      </motion.div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !p-5 sm:!p-6">
        {/* =================================================
            ROOM TYPE + PRICE
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            !flex
            !items-start
            !justify-between
            !gap-5
          "
        >
          <div className="!min-w-0">
            <div className="!flex !items-center !gap-2">
              <span
                className="
                  !h-1.5
                  !w-1.5
                  !rounded-full
                  !bg-[var(--color-primary)]
                  !shadow-[0_0_10px_var(--color-primary)]
                "
              />

              <p
                className="
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.22em]
                  !text-[var(--color-primary)]
                "
              >
                {room.roomType}
              </p>
            </div>

            <p
              className="
                !mt-2
                !text-sm
                !text-[var(--color-text-secondary)]
              "
            >
              {room.sharingType}
            </p>
          </div>

          <div className="!shrink-0 !text-right">
            <div
              className="
                !bg-gradient-to-r
                !from-[var(--color-primary)]
                !via-[#E7C95C]
                !to-[var(--color-primary)]
                !bg-clip-text
                !text-2xl
                !font-bold
                !text-transparent
              "
            >
              ₹{room.pricePerDay}
            </div>

            <p
              className="
                !mt-1
                !text-[9px]
                !font-medium
                !uppercase
                !tracking-[0.18em]
                !text-[var(--color-text-muted)]
              "
            >
              per day
            </p>
          </div>
        </motion.div>

        {/* =================================================
            PREMIUM DIVIDER
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            !my-6
            !h-px
            !w-full
            !bg-gradient-to-r
            !from-transparent
            !via-[var(--color-primary)]/30
            !to-transparent
          "
        />

        {/* =================================================
            AVAILABILITY
        ================================================== */}

        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -2,
          }}
          className="
            !relative
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface-secondary)]
            !p-4
          "
        >
          {/* Card glow */}

          <div
            className="
              !pointer-events-none
              !absolute
              !-right-10
              !-top-10
              !h-24
              !w-24
              !rounded-full
              !bg-[var(--color-primary)]
              !opacity-5
              !blur-[35px]
            "
          />

          <div className="!relative">
            <div className="!flex !items-center !justify-between">
              <div className="!flex !items-center !gap-2.5">
                <div
                  className="
                    !flex
                    !h-9
                    !w-9
                    !items-center
                    !justify-center
                    !rounded-xl
                    !border
                    !border-[var(--color-primary)]/20
                    !bg-[var(--color-primary)]/10
                  "
                >
                  <BedDouble
                    size={17}
                    className="!text-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <p
                    className="
                      !text-[10px]
                      !uppercase
                      !tracking-[0.15em]
                      !text-[var(--color-text-muted)]
                    "
                  >
                    Availability
                  </p>

                  <span
                    className="
                      !text-sm
                      !font-medium
                      !text-[var(--color-text-primary)]
                    "
                  >
                    Beds
                  </span>
                </div>
              </div>

              <span
                className="
                  !rounded-full
                  !border
                  !border-[var(--color-primary)]/20
                  !bg-[var(--color-primary)]/10
                  !px-3
                  !py-1
                  !text-xs
                  !font-semibold
                  !text-[var(--color-primary)]
                "
              >
                {room.availableBeds}/{room.totalBeds}
              </span>
            </div>

            {/* Progress */}

            <div
              className="
                !mt-4
                !h-2
                !overflow-hidden
                !rounded-full
                !bg-[var(--color-border)]
              "
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${availablePercentage}%`,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  !relative
                  !h-full
                  !rounded-full
                  !bg-gradient-to-r
                  !from-[var(--color-primary)]
                  !via-[#E7C95C]
                  !to-[var(--color-primary)]
                  !shadow-[0_0_14px_var(--color-primary)]
                "
              />
            </div>

            <div className="!mt-3 !flex !items-center !gap-2">
              <CheckCircle2 size={14} className="!text-emerald-400" />

              <span
                className="
                  !text-xs
                  !font-medium
                  !text-emerald-400
                "
              >
                {room.availableBeds} beds available
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            QUICK INFO
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="!mt-5 !grid !grid-cols-2 !gap-3"
        >
          {/* Sharing */}

          <motion.div
            whileHover={{
              y: -4,
              scale: 1.01,
            }}
            className="
              !group/info
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface-secondary)]
              !p-4
              !transition-all
              !duration-300
              hover:!border-[var(--color-primary)]/30
            "
          >
            <div
              className="
                !mb-3
                !flex
                !h-9
                !w-9
                !items-center
                !justify-center
                !rounded-xl
                !bg-gradient-to-br
                !from-[var(--color-primary)]/15
                !to-transparent
              "
            >
              <Users size={17} className="!text-[var(--color-primary)]" />
            </div>

            <p
              className="
                !text-[10px]
                !uppercase
                !tracking-[0.12em]
                !text-[var(--color-text-muted)]
              "
            >
              Sharing
            </p>

            <p
              className="
                !mt-1
                !text-sm
                !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              {room.sharingType}
            </p>
          </motion.div>

          {/* Pricing */}

          <motion.div
            whileHover={{
              y: -4,
              scale: 1.01,
            }}
            className="
              !group/info
              !rounded-2xl
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface-secondary)]
              !p-4
              !transition-all
              !duration-300
              hover:!border-[var(--color-primary)]/30
            "
          >
            <div
              className="
                !mb-3
                !flex
                !h-9
                !w-9
                !items-center
                !justify-center
                !rounded-xl
                !bg-gradient-to-br
                !from-[var(--color-primary)]/15
                !to-transparent
              "
            >
              <CircleDollarSign
                size={17}
                className="!text-[var(--color-primary)]"
              />
            </div>

            <p
              className="
                !text-[10px]
                !uppercase
                !tracking-[0.12em]
                !text-[var(--color-text-muted)]
              "
            >
              Pricing
            </p>

            <p
              className="
                !mt-1
                !text-sm
                !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              Flexible
            </p>
          </motion.div>
        </motion.div>

        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <motion.div variants={itemVariants} className="!mt-7">
          <div className="!mb-3 !flex !items-center !gap-2">
            <div
              className="
                !flex
                !h-7
                !w-7
                !items-center
                !justify-center
                !rounded-lg
                !bg-[var(--color-primary)]/10
              "
            >
              <Sparkles size={14} className="!text-[var(--color-primary)]" />
            </div>

            <h3
              className="
                !text-sm
                !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              About this room
            </h3>
          </div>

          <p
            className="
              !text-sm
              !leading-7
              !text-[var(--color-text-secondary)]
            "
          >
            {room.description ||
              "Comfortable hostel room with modern facilities designed for a pleasant and secure stay."}
          </p>
        </motion.div>

        {/* =================================================
            FACILITIES
        ================================================== */}

        <motion.div variants={itemVariants} className="!mt-7">
          <div className="!mb-4 !flex !items-center !justify-between">
            <h3
              className="
                !text-sm
                !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              Facilities
            </h3>

            <span
              className="
                !text-[9px]
                !font-semibold
                !uppercase
                !tracking-[0.15em]
                !text-[var(--color-primary)]
              "
            >
              Included
            </span>
          </div>

          <div className="!grid !grid-cols-2 !gap-2">
            {room.facilities &&
              Object.entries(room.facilities).map(
                ([key, value], index) =>
                  value && (
                    <motion.div
                      key={key}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.4 + index * 0.05,
                      }}
                      whileHover={{
                        x: 3,
                      }}
                      className="
                        !flex
                        !items-center
                        !rounded-xl
                        !border
                        !border-[var(--color-border)]
                        !bg-[var(--color-surface-secondary)]
                        !px-3
                        !py-2.5
                        !text-xs
                        !text-[var(--color-text-secondary)]
                        !transition-all
                        !duration-300
                        hover:!border-[var(--color-primary)]/30
                        hover:!bg-[var(--color-primary)]/5
                      "
                    >
                      <span
                        className="
                          !mr-2
                          !flex
                          !h-4
                          !w-4
                          !shrink-0
                          !items-center
                          !justify-center
                          !rounded-full
                          !bg-[var(--color-primary)]/10
                          !text-[9px]
                          !font-bold
                          !text-[var(--color-primary)]
                        "
                      >
                        ✓
                      </span>

                      <span className="!truncate">{key}</span>
                    </motion.div>
                  ),
              )}
          </div>
        </motion.div>

        {/* =================================================
            BOTTOM PREMIUM NOTE
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="
            !mt-7
            !relative
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-primary)]/15
            !bg-gradient-to-r
            !from-[var(--color-primary)]/10
            !via-[var(--color-primary)]/5
            !to-transparent
            !p-4
          "
        >
          <div
            className="
              !absolute
              !-right-8
              !-top-8
              !h-20
              !w-20
              !rounded-full
              !bg-[var(--color-primary)]
              !opacity-10
              !blur-[30px]
            "
          />

          <div className="!relative !flex !items-start !gap-3">
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
                !border-[var(--color-primary)]/20
                !bg-[var(--color-primary)]/10
              "
            >
              <CheckCircle2
                size={15}
                className="!text-[var(--color-primary)]"
              />
            </div>

            <div>
              <p
                className="
                  !text-xs
                  !font-semibold
                  !text-[var(--color-text-primary)]
                "
              >
                Ready for booking
              </p>

              <p
                className="
                  !mt-1
                  !text-[11px]
                  !leading-5
                  !text-[var(--color-text-secondary)]
                "
              >
                This room is currently available for your selected stay.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoomBookingInfo;
