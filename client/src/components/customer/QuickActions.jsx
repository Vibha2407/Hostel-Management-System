import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CalendarPlus,
  Receipt,
  UserRound,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Browse Rooms",
      description: "Find your next stay",
      icon: Search,
      path: "/rooms",
      number: "01",
    },
    {
      title: "New Booking",
      description: "Reserve a room",
      icon: CalendarPlus,
      path: "/rooms",
      number: "02",
    },
    {
      title: "Receipts",
      description: "View your payments",
      icon: Receipt,
      path: "/customer/receipt",
      number: "03",
    },
    {
      title: "My Profile",
      description: "Manage your account",
      icon: UserRound,
      path: "/customer/profile",
      number: "04",
    },
  ];

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
        amount: 0.15,
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
          DECORATIVE GOLD GLOW
      ====================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-24
          !-top-24
          !h-56
          !w-56
          !rounded-full
          !bg-[var(--color-primary)]/[0.08]
          !blur-[80px]
          !transition-all
          !duration-700
          group-hover:!bg-[var(--color-primary)]/[0.14]
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-bottom-28
          !-left-20
          !h-48
          !w-48
          !rounded-full
          !bg-[var(--color-primary)]/[0.045]
          !blur-[75px]
        "
      />

      {/* Subtle grid */}

      <div
        className="
          !pointer-events-none
          !absolute
          !inset-0
          !opacity-[0.025]
          [background-image:linear-gradient(var(--color-text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)_1px,transparent_1px)]
          [background-size:32px_32px]
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="!relative !mb-6 !flex !items-end !justify-between">
        <div>
          <div className="!mb-2 !flex !items-center !gap-2">
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={14} className="!text-[var(--color-primary)]" />
            </motion.div>

            <p
              className="
                !text-[10px]
                !font-semibold
                !uppercase
                !tracking-[0.24em]
                !text-[var(--color-primary)]
              "
            >
              Shortcuts
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
            Quick Actions
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
            !tracking-[0.16em]
            !text-[var(--color-text-muted)]
            sm:!block
          "
        >
          Explore
        </span>
      </div>

      {/* =====================================================
          ACTION GRID
      ====================================================== */}

      <div className="!relative !grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
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
                y: -5,
              }}
              whileTap={{
                scale: 0.975,
              }}
              onClick={() => navigate(action.path)}
              className="
                !group/action
                !relative
                !overflow-hidden
                !rounded-2xl
                !border
                !border-[var(--color-border)]
                !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
                !p-4
                !text-left
                !shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                !transition-all
                !duration-500
                hover:!border-[var(--color-primary)]/30
                hover:!shadow-[0_15px_35px_rgba(212,175,55,0.10)]
                dark:!shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                dark:hover:!shadow-[0_15px_40px_rgba(212,175,55,0.10)]
              "
            >
              {/* Card glow */}

              <div
                className="
                  !pointer-events-none
                  !absolute
                  !-right-8
                  !-top-8
                  !h-24
                  !w-24
                  !rounded-full
                  !bg-[var(--color-primary)]/[0.06]
                  !blur-2xl
                  !transition-all
                  !duration-500
                  group-hover/action:!bg-[var(--color-primary)]/[0.13]
                "
              />

              {/* Top row */}

              <div className="!relative !flex !items-center !justify-between">
                <motion.div
                  whileHover={{
                    rotate: -4,
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    !flex
                    !h-10
                    !w-10
                    !items-center
                    !justify-center
                    !rounded-xl
                    !border
                    !border-[var(--color-primary)]/20
                    !bg-[linear-gradient(135deg,var(--color-primary)/[0.12],var(--color-primary)/[0.035])]
                    !shadow-[0_6px_20px_rgba(212,175,55,0.08)]
                    !transition-all
                    !duration-300
                    group-hover/action:!border-[var(--color-primary)]/35
                  "
                >
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className="!text-[var(--color-primary)]"
                  />
                </motion.div>

                <div className="!flex !items-center !gap-2">
                  <span
                    className="
                      !text-[9px]
                      !font-medium
                      !tracking-[0.15em]
                      !text-[var(--color-text-muted)]
                    "
                  >
                    {action.number}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      !text-[var(--color-text-muted)]
                      !transition-all
                      !duration-300
                      group-hover/action:!-translate-y-0.5
                      group-hover/action:!translate-x-0.5
                      group-hover/action:!text-[var(--color-primary)]
                    "
                  />
                </div>
              </div>

              {/* Text */}

              <div className="!relative !mt-5">
                <h3
                  className="
                    !text-sm
                    !font-semibold
                    !tracking-tight
                    !text-[var(--color-text-primary)]
                    !transition-colors
                    !duration-300
                    group-hover/action:!text-[var(--color-primary)]
                  "
                >
                  {action.title}
                </h3>

                <p
                  className="
                    !mt-1
                    !text-[10px]
                    !leading-4
                    !text-[var(--color-text-secondary)]
                  "
                >
                  {action.description}
                </p>
              </div>

              {/* Bottom progress line */}

              <div
                className="
                  !absolute
                  !bottom-0
                  !left-0
                  !h-[2px]
                  !w-0
                  !bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]
                  !transition-all
                  !duration-700
                  group-hover/action:!w-full
                "
              />
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};

export default QuickActions;
