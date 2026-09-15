import { useContext } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowUpRight, Sparkles, Clock3 } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

const WelcomeCard = () => {
  const { user } = useContext(AuthContext);

  const today = new Date();

  const greeting =
    today.getHours() < 12
      ? "Good Morning"
      : today.getHours() < 17
        ? "Good Afternoon"
        : "Good Evening";

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = today.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        !group
        !relative
        !overflow-hidden
        !rounded-[1.75rem]
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !shadow-[var(--shadow-card)]
      "
    >
      {/* =====================================================
          PREMIUM GRADIENT BACKGROUND
      ====================================================== */}

      <div className="!pointer-events-none !absolute !inset-0 !bg-[radial-gradient(circle_at_90%_0%,rgba(212,175,55,0.13),transparent_38%)]" />

      <div className="!pointer-events-none !absolute !inset-0 !bg-[radial-gradient(circle_at_0%_100%,rgba(212,175,55,0.06),transparent_35%)]" />

      {/* =====================================================
          ANIMATED GOLD ORB
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 18, 0],
          y: [0, -12, 0],
          scale: [1, 1.08, 1],
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
          !-top-28
          !h-[360px]
          !w-[360px]
          !rounded-full
          !bg-[var(--color-primary)]/[0.09]
          !blur-[100px]
        "
      />

      <motion.div
        animate={{
          x: [0, -12, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !pointer-events-none
          !absolute
          !-bottom-32
          !left-[28%]
          !h-[260px]
          !w-[260px]
          !rounded-full
          !bg-[var(--color-primary)]/[0.045]
          !blur-[90px]
        "
      />

      {/* =====================================================
          SUBTLE GRID
      ====================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !inset-0
          !opacity-[0.035]
          [background-image:linear-gradient(var(--color-text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      {/* =====================================================
          TOP SHINE
      ====================================================== */}

      <div className="!pointer-events-none !absolute !left-0 !right-0 !top-0 !h-px !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/40 !to-transparent" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !flex !flex-col !gap-8 !p-6 sm:!p-8 lg:!flex-row lg:!items-center lg:!justify-between lg:!p-10">
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <div className="!max-w-2xl">
          {/* LABEL */}

          <motion.div
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="!mb-5 !flex !items-center !gap-2.5"
          >
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                !flex
                !h-7
                !w-7
                !items-center
                !justify-center
                !rounded-lg
                !border
                !border-[var(--color-primary)]/20
                !bg-[var(--color-primary)]/[0.08]
              "
            >
              <Sparkles size={14} className="!text-[var(--color-primary)]" />
            </motion.div>

            <span className="!text-[10px] !font-semibold !uppercase !tracking-[0.28em] !text-[var(--color-primary)]">
              Member Dashboard
            </span>
          </motion.div>

          {/* HEADING */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="
              !text-3xl
              !font-semibold
              !leading-tight
              !tracking-[-0.035em]
              !text-[var(--color-text-primary)]
              sm:!text-4xl
              lg:!text-5xl
            "
          >
            {greeting},{" "}
            <span className="!relative !inline-block !text-[var(--color-primary)]">
              {user?.fullName?.split(" ")[0] || "Guest"}

              {/* Underline glow */}

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  !absolute
                  !-bottom-1
                  !left-0
                  !h-[2px]
                  !w-full
                  !origin-left
                  !rounded-full
                  !bg-[var(--color-primary)]/40
                "
              />
            </span>
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.42,
              duration: 0.55,
            }}
            className="
              !mt-5
              !max-w-xl
              !text-sm
              !leading-6
              !text-[var(--color-text-secondary)]
              sm:!text-base
            "
          >
            Welcome back to HostelHub. Manage your stays, bookings and hostel
            experience from one place.
          </motion.p>

          {/* STATUS */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
              duration: 0.5,
            }}
            className="!mt-6 !flex !items-center !gap-2"
          >
            <span className="!relative !flex !h-2 !w-2">
              <span className="!absolute !inline-flex !h-full !w-full !animate-ping !rounded-full !bg-[var(--color-success)]/40" />

              <span className="!relative !h-2 !w-2 !rounded-full !bg-[var(--color-success)]" />
            </span>

            <span className="!text-[10px] !font-medium !uppercase !tracking-[0.16em] !text-[var(--color-text-muted)]">
              Your account is active
            </span>
          </motion.div>
        </div>

        {/* =====================================================
            DATE / TIME CARD
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            y: -5,
          }}
          className="
            !group/date
            !relative
            !w-full
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface-secondary)]/75
            !p-4
            !backdrop-blur-xl
            !transition-all
            !duration-500
            hover:!border-[var(--color-primary)]/25
            sm:!w-auto
            sm:!min-w-[285px]
          "
        >
          {/* Card glow */}

          <div className="!pointer-events-none !absolute !-right-10 !-top-10 !h-28 !w-28 !rounded-full !bg-[var(--color-primary)]/[0.08] !blur-3xl" />

          {/* Card shine */}

          <div className="!pointer-events-none !absolute !inset-x-0 !top-0 !h-px !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/30 !to-transparent" />

          <div className="!relative !flex !items-center !justify-between !gap-5">
            {/* DATE */}

            <div className="!flex !items-center !gap-3">
              <motion.div
                whileHover={{
                  rotate: -5,
                  scale: 1.05,
                }}
                className="
                  !flex
                  !h-12
                  !w-12
                  !shrink-0
                  !items-center
                  !justify-center
                  !rounded-xl
                  !border
                  !border-[var(--color-primary)]/20
                  !bg-[var(--color-primary)]/[0.08]
                "
              >
                <CalendarDays
                  size={19}
                  className="!text-[var(--color-primary)]"
                />
              </motion.div>

              <div>
                <p className="!text-[9px] !font-medium !uppercase !tracking-[0.2em] !text-[var(--color-text-muted)]">
                  Today
                </p>

                <p className="!mt-1.5 !text-sm !font-semibold !text-[var(--color-text-primary)]">
                  {formattedDate}
                </p>

                <div className="!mt-1.5 !flex !items-center !gap-1.5">
                  <Clock3 size={11} className="!text-[var(--color-primary)]" />

                  <span className="!text-[10px] !text-[var(--color-text-secondary)]">
                    {formattedTime}
                  </span>
                </div>
              </div>
            </div>

            {/* ARROW */}

            <motion.div
              animate={{
                x: [0, 4, 0],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                !hidden
                !text-[var(--color-primary)]
                sm:!block
              "
            >
              <ArrowUpRight size={19} />
            </motion.div>
          </div>

          {/* Bottom progress line */}

          <div className="!absolute !bottom-0 !left-0 !h-[2px] !w-0 !bg-[var(--color-primary)] !transition-all !duration-700 group-hover/date:!w-full" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WelcomeCard;
