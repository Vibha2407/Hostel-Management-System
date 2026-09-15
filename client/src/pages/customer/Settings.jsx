import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  User,
  ShieldCheck,
  Bell,
  LockKeyhole,
  Check,
  CalendarDays,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

const Settings = () => {
  const { mode, setMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      description: "Warm, clean & elegant",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Rich, immersive & focused",
      icon: Moon,
    },
  ];

  return (
    <main
      className="
        !relative !min-h-screen !overflow-hidden
        !bg-[var(--color-background)]
        !text-[var(--color-text-primary)]
        !transition-colors !duration-700
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div className="!pointer-events-none !fixed !inset-0 !z-0 !overflow-hidden">
        {/* Primary gold orb */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute !-right-48 !-top-48
            !h-[600px] !w-[600px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.075]
            !blur-[130px]
          "
        />

        {/* Secondary orb */}

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !absolute !-left-52 !top-[38%]
            !h-[500px] !w-[500px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.045]
            !blur-[125px]
          "
        />

        {/* Bottom ambient light */}

        <div
          className="
            !absolute !bottom-[-180px] !right-[20%]
            !h-[420px] !w-[420px]
            !rounded-full
            !bg-[var(--color-primary)]/[0.035]
            !blur-[120px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            !absolute !inset-0
            !opacity-[0.025]
            dark:!opacity-[0.035]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                var(--color-text-primary) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                var(--color-text-primary) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      <div
        className="
          !relative !z-10
          !mx-auto !w-full !max-w-6xl
          !px-4 !py-7
          sm:!px-6 sm:!py-9
          lg:!px-8 lg:!py-12
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.header
          initial={{
            opacity: 0,
            y: 28,
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
          className="!mb-8 sm:!mb-10"
        >
          <div className="!mb-4 !flex !items-center !gap-2.5">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                !flex !h-8 !w-8
                !items-center !justify-center
                !rounded-lg
                !border !border-[var(--color-primary)]/25
                !bg-[var(--color-primary)]/[0.08]
                !text-[var(--color-primary)]
              "
            >
              <SettingsIcon size={15} />
            </motion.div>

            <span
              className="
                !text-[9px] !font-bold
                !uppercase !tracking-[0.32em]
                !text-[var(--color-primary)]
              "
            >
              Account Settings
            </span>
          </div>

          <div className="!flex !items-end !justify-between !gap-5">
            <div>
              <h1
                className="
                  !text-3xl !font-semibold
                  !tracking-[-0.04em]
                  !text-[var(--color-text-primary)]
                  sm:!text-4xl
                  lg:!text-5xl
                "
              >
                Settings
              </h1>

              <p
                className="
                  !mt-3 !max-w-xl
                  !text-sm !leading-6
                  !text-[var(--color-text-secondary)]
                  sm:!text-base
                "
              >
                Personalize your HostelHub experience and manage your account
                preferences.
              </p>
            </div>

            <div
              className="
                !hidden
                !items-center !gap-2
                !rounded-full
                !border !border-[var(--color-primary)]/15
                !bg-[var(--color-primary)]/[0.045]
                !px-3 !py-1.5
                sm:!flex
              "
            >
              <Sparkles size={13} className="!text-[var(--color-primary)]" />

              <span
                className="
                  !text-[9px] !font-semibold
                  !uppercase !tracking-[0.15em]
                  !text-[var(--color-text-secondary)]
                "
              >
                Personal Space
              </span>
            </div>
          </div>
        </motion.header>

        {/* =====================================================
            PROFILE CARD
        ====================================================== */}

        <PremiumSection
          delay={0.12}
          icon={<User size={18} />}
          title="Profile"
          description="Your account information"
        >
          <div className="!grid !gap-3 sm:!grid-cols-2 lg:!gap-4">
            <ProfileItem label="Full Name" value={user?.fullName || "-"} />

            <ProfileItem label="Email Address" value={user?.email || "-"} />

            <ProfileItem label="Phone Number" value={user?.phone || "-"} />

            <ProfileItem
              label="Account Role"
              value={user?.role || "Customer"}
            />
          </div>
        </PremiumSection>

        {/* =====================================================
            APPEARANCE
        ====================================================== */}

        <PremiumSection
          delay={0.22}
          icon={<Sun size={18} />}
          title="Appearance"
          description="Choose the visual style you prefer"
          className="!mt-6"
        >
          <div>
            <div className="!mb-5 !flex !items-end !justify-between !gap-4">
              <div>
                <p
                  className="
                    !text-xs !font-semibold
                    !uppercase !tracking-[0.16em]
                    !text-[var(--color-text-primary)]
                  "
                >
                  Interface Theme
                </p>

                <p
                  className="
                    !mt-1.5 !text-[11px]
                    !text-[var(--color-text-muted)]
                  "
                >
                  Your selection is saved automatically.
                </p>
              </div>

              <div
                className="
                  !hidden !rounded-full
                  !border !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !px-3 !py-1.5
                  sm:!block
                "
              >
                <span
                  className="
                    !text-[9px] !font-semibold
                    !uppercase !tracking-[0.12em]
                    !text-[var(--color-text-secondary)]
                  "
                >
                  {mode === "light" ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </div>

            <div className="!grid !gap-4 md:!grid-cols-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const active = mode === option.value;

                return (
                  <ThemeOption
                    key={option.value}
                    option={option}
                    Icon={Icon}
                    active={active}
                    onClick={() => setMode(option.value)}
                  />
                );
              })}
            </div>
          </div>
        </PremiumSection>

        {/* =====================================================
            SECURITY + NOTIFICATIONS
        ====================================================== */}

        <div className="!mt-6 !grid !gap-6 lg:!grid-cols-2">
          <SettingsCard
            icon={<ShieldCheck size={18} />}
            title="Security"
            description="Manage your account security"
          >
            <SettingRow
              icon={<LockKeyhole size={17} />}
              title="Change Password"
              description="Update your account password"
            />

            <SettingRow
              icon={<ShieldCheck size={17} />}
              title="Account Protection"
              description="Your account is protected"
              status="Active"
            />
          </SettingsCard>

          <SettingsCard
            icon={<Bell size={18} />}
            title="Notifications"
            description="Manage your notification preferences"
          >
            <SettingRow
              icon={<Bell size={17} />}
              title="Booking Updates"
              description="Receive important booking notifications"
              status="On"
            />

            <SettingRow
              icon={<CalendarDays size={17} />}
              title="Booking Reminders"
              description="Get reminders about upcoming stays"
              status="On"
            />
          </SettingsCard>
        </div>
      </div>
    </main>
  );
};

/* =========================================================
   PREMIUM SECTION
========================================================= */

const PremiumSection = ({
  icon,
  title,
  description,
  children,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        !group !relative !overflow-hidden
        !rounded-[1.5rem]
        !border !border-[var(--color-border)]
        !bg-gradient-to-br
        !from-[var(--color-surface)]
        !via-[var(--color-surface)]
        !to-[var(--color-primary)]/[0.045]
        !shadow-[var(--shadow-card)]
        !transition-all !duration-500
        hover:!border-[var(--color-primary)]/25
        ${className}
      `}
    >
      {/* Top luxury line */}

      <div
        className="
          !absolute !left-0 !top-0
          !h-px !w-full
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-primary)]
          !to-transparent
          !opacity-70
        "
      />

      {/* Corner glow */}

      <motion.div
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !pointer-events-none
          !absolute !-right-24 !-top-24
          !h-56 !w-56
          !rounded-full
          !bg-[var(--color-primary)]/[0.055]
          !blur-[85px]
        "
      />

      {/* Header */}

      <div
        className="
          !relative
          !border-b !border-[var(--color-border)]
          !px-5 !py-5
          sm:!px-7 sm:!py-6
        "
      >
        <div className="!flex !items-center !gap-3.5">
          <div
            className="
              !flex !h-11 !w-11
              !shrink-0 !items-center !justify-center
              !rounded-xl
              !border !border-[var(--color-primary)]/25
              !bg-gradient-to-br
              !from-[var(--color-primary)]/[0.12]
              !to-[var(--color-primary)]/[0.035]
              !text-[var(--color-primary)]
              !shadow-[0_8px_25px_rgba(212,175,55,0.08)]
            "
          >
            {icon}
          </div>

          <div className="!min-w-0">
            <h2
              className="
                !text-sm !font-semibold
                !text-[var(--color-text-primary)]
                sm:!text-[15px]
              "
            >
              {title}
            </h2>

            <p
              className="
                !mt-1 !text-[11px]
                !text-[var(--color-text-muted)]
                sm:!text-xs
              "
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="!relative !p-5 sm:!p-7">{children}</div>
    </motion.section>
  );
};

/* =========================================================
   THEME OPTION
========================================================= */

const ThemeOption = ({ option, Icon, active, onClick }) => {
  return (
    <motion.button
      type="button"
      aria-label={`Select ${option.label} theme`}
      aria-pressed={active}
      onClick={onClick}
      whileHover={{
        y: -5,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className={`
        !group !relative !overflow-hidden
        !flex !items-center !gap-4
        !rounded-2xl
        !border
        !p-4
        !text-left
        !transition-all !duration-500
        ${
          active
            ? `
              !border-[var(--color-primary)]/55
              !bg-gradient-to-br
              !from-[var(--color-primary)]/[0.13]
              !via-[var(--color-primary)]/[0.055]
              !to-transparent
              !shadow-[0_15px_45px_rgba(212,175,55,0.10)]
            `
            : `
              !border-[var(--color-border)]
              !bg-[var(--color-surface-secondary)]/[0.55]
              hover:!border-[var(--color-primary)]/30
              hover:!bg-[var(--color-primary)]/[0.035]
            `
        }
      `}
    >
      {/* Shine */}

      <span
        className="
          !pointer-events-none
          !absolute !inset-y-0 !-left-24
          !w-20 !rotate-12
          !bg-white/[0.12]
          !blur-md
          !transition-all !duration-1000
          group-hover:!left-[130%]
        "
      />

      {/* Glow */}

      <span
        className="
          !pointer-events-none
          !absolute !-right-10 !-top-10
          !h-28 !w-28
          !rounded-full
          !bg-[var(--color-primary)]/[0.08]
          !blur-3xl
          !opacity-0
          !transition-opacity !duration-500
          group-hover:!opacity-100
        "
      />

      {/* Icon */}

      <motion.div
        animate={
          active
            ? {
                scale: [1, 1.04, 1],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`
          !relative !flex
          !h-12 !w-12
          !shrink-0 !items-center !justify-center
          !rounded-xl
          !border
          !transition-all !duration-500
          ${
            active
              ? `
                !border-[var(--color-primary)]/35
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
                !shadow-[0_0_30px_rgba(212,175,55,0.12)]
              `
              : `
                !border-[var(--color-border)]
                !bg-[var(--color-surface)]
                !text-[var(--color-text-muted)]
              `
          }
        `}
      >
        <Icon size={20} />
      </motion.div>

      {/* Text */}

      <div className="!relative !min-w-0 !flex-1">
        <p
          className={`
            !text-sm !font-semibold
            ${
              active
                ? "!text-[var(--color-primary)]"
                : "!text-[var(--color-text-primary)]"
            }
          `}
        >
          {option.label}
        </p>

        <p
          className="
            !mt-1 !text-[11px]
            !leading-5
            !text-[var(--color-text-muted)]
          "
        >
          {option.description}
        </p>
      </div>

      {/* Check */}

      <div
        className={`
          !relative !flex
          !h-6 !w-6
          !shrink-0 !items-center !justify-center
          !rounded-full
          !border
          !transition-all !duration-500
          ${
            active
              ? `
                !border-[var(--color-primary)]
                !bg-[var(--color-primary)]
                !text-[var(--color-background)]
                !shadow-[0_0_20px_rgba(212,175,55,0.18)]
              `
              : `
                !border-[var(--color-border)]
                !bg-transparent
                !text-transparent
              `
          }
        `}
      >
        <Check size={13} strokeWidth={2.5} />
      </div>
    </motion.button>
  );
};

/* =========================================================
   PROFILE ITEM
========================================================= */

const ProfileItem = ({ label, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        !group !relative !overflow-hidden
        !rounded-xl
        !border !border-[var(--color-border)]
        !bg-[var(--color-surface-secondary)]/[0.55]
        !p-4
        !transition-all !duration-400
        hover:!border-[var(--color-primary)]/25
        hover:!shadow-[0_12px_35px_rgba(0,0,0,0.06)]
      "
    >
      {/* Hover glow */}

      <div
        className="
          !pointer-events-none
          !absolute !-right-8 !-top-8
          !h-20 !w-20
          !rounded-full
          !bg-[var(--color-primary)]/[0.07]
          !blur-2xl
          !opacity-0
          !transition-opacity !duration-500
          group-hover:!opacity-100
        "
      />

      <p
        className="
          !relative
          !text-[9px] !font-semibold
          !uppercase !tracking-[0.18em]
          !text-[var(--color-text-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          !relative !mt-2
          !truncate
          !text-sm !font-medium
          !text-[var(--color-text-primary)]
        "
      >
        {value}
      </p>
    </motion.div>
  );
};

/* =========================================================
   SETTINGS CARD
========================================================= */

const SettingsCard = ({ icon, title, description, children }) => {
  return (
    <motion.section
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        !group !relative !overflow-hidden
        !rounded-[1.5rem]
        !border !border-[var(--color-border)]
        !bg-gradient-to-br
        !from-[var(--color-surface)]
        !via-[var(--color-surface)]
        !to-[var(--color-primary)]/[0.045]
        !shadow-[var(--shadow-card)]
        !transition-all !duration-500
        hover:!border-[var(--color-primary)]/25
      "
    >
      {/* Top line */}

      <motion.div
        initial={{
          scaleX: 0.2,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          !absolute !left-0 !top-0
          !h-px !w-full
          !origin-left
          !bg-gradient-to-r
          !from-[var(--color-primary)]
          !via-[var(--color-primary)]/45
          !to-transparent
        "
      />

      {/* Glow */}

      <div
        className="
          !pointer-events-none
          !absolute !-right-20 !-top-20
          !h-44 !w-44
          !rounded-full
          !bg-[var(--color-primary)]/[0.055]
          !blur-[75px]
          !transition-all !duration-700
          group-hover:!scale-125
        "
      />

      {/* Header */}

      <div
        className="
          !relative
          !border-b !border-[var(--color-border)]
          !p-5
        "
      >
        <div className="!flex !items-center !gap-3">
          <div
            className="
              !flex !h-10 !w-10
              !shrink-0
              !items-center !justify-center
              !rounded-xl
              !border !border-[var(--color-primary)]/20
              !bg-[var(--color-primary)]/[0.06]
              !text-[var(--color-primary)]
            "
          >
            {icon}
          </div>

          <div className="!min-w-0">
            <h2
              className="
                !text-sm !font-semibold
                !text-[var(--color-text-primary)]
              "
            >
              {title}
            </h2>

            <p
              className="
                !mt-1 !truncate
                !text-[11px]
                !text-[var(--color-text-muted)]
              "
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Rows */}

      <div
        className="
          !relative
          !divide-y
          !divide-[var(--color-border)]
        "
      >
        {children}
      </div>
    </motion.section>
  );
};

/* =========================================================
   SETTING ROW
========================================================= */

const SettingRow = ({ icon, title, description, status }) => {
  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        !group/row
        !flex !items-center
        !justify-between
        !gap-3
        !p-5
        !transition-colors !duration-300
        hover:!bg-[var(--color-primary)]/[0.025]
      "
    >
      <div className="!flex !min-w-0 !items-center !gap-3">
        <div
          className="
            !flex !h-9 !w-9
            !shrink-0
            !items-center !justify-center
            !rounded-lg
            !border !border-[var(--color-border)]
            !bg-[var(--color-surface-secondary)]
            !text-[var(--color-text-muted)]
            !transition-all !duration-300
            group-hover/row:!border-[var(--color-primary)]/25
            group-hover/row:!bg-[var(--color-primary)]/[0.06]
            group-hover/row:!text-[var(--color-primary)]
          "
        >
          {icon}
        </div>

        <div className="!min-w-0">
          <p
            className="
              !truncate
              !text-xs !font-semibold
              !text-[var(--color-text-primary)]
            "
          >
            {title}
          </p>

          <p
            className="
              !mt-1 !truncate
              !text-[10px]
              !text-[var(--color-text-muted)]
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div className="!flex !shrink-0 !items-center !gap-2">
        {status && (
          <span
            className="
              !rounded-full
              !border !border-[var(--color-success)]/25
              !bg-[var(--color-success)]/[0.08]
              !px-2.5 !py-1
              !text-[9px] !font-bold
              !text-[var(--color-success)]
            "
          >
            {status}
          </span>
        )}

        <ChevronRight
          size={15}
          className="
            !text-[var(--color-text-muted)]/50
            !transition-all !duration-300
            group-hover/row:!translate-x-1
            group-hover/row:!text-[var(--color-primary)]
          "
        />
      </div>
    </motion.div>
  );
};

export default Settings;
