import { motion } from "framer-motion";
import {
  UserCircle2,
  ShieldCheck,
  CalendarDays,
  Copy,
  Check,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);

  const customerId = user?._id || user?.id || "Not Available";

  const handleCopy = async () => {
    if (!customerId || customerId === "Not Available") return;

    try {
      await navigator.clipboard.writeText(customerId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        !relative
        !overflow-hidden
        !rounded-[2rem]
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !p-5
        !shadow-[var(--shadow-card)]
        !transition-all
        !duration-500
        sm:!p-7
        lg:!p-8
      "
    >
      {/* ───────────────── Ambient Background ───────────────── */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-28
          !-top-28
          !h-72
          !w-72
          !rounded-full
          !bg-[#D6B36A]/10
          !blur-[100px]
          dark:!bg-[#D6B36A]/8
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-bottom-32
          !-left-20
          !h-64
          !w-64
          !rounded-full
          !bg-[#4A1D2F]/8
          !blur-[100px]
          dark:!bg-[#D6B36A]/5
        "
      />

      {/* Premium top gradient */}
      <div
        className="
          !pointer-events-none
          !absolute
          !left-0
          !right-0
          !top-0
          !h-[2px]
          !bg-gradient-to-r
          !from-transparent
          !via-[#D6B36A]
          !to-transparent
          !opacity-80
        "
      />

      {/* ───────────────── Top Content ───────────────── */}

      <div
        className="
          !relative
          !z-10
          !flex
          !flex-col
          !gap-6
          sm:!flex-row
          sm:!items-center
        "
      >
        {/* Avatar */}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            !relative
            !flex
            !h-24
            !w-24
            !shrink-0
            !items-center
            !justify-center
            !self-start
            !overflow-hidden
            !rounded-[1.75rem]
            !border
            !border-[#D6B36A]/30
            !bg-gradient-to-br
            !from-[#D6B36A]/20
            !via-[#D6B36A]/10
            !to-transparent
            !shadow-[0_10px_35px_rgba(214,179,106,0.12)]
            sm:!self-auto
          "
        >
          {/* Inner glow */}
          <div
            className="
              !pointer-events-none
              !absolute
              !inset-0
              !bg-gradient-to-br
              !from-[#D6B36A]/15
              !to-transparent
            "
          />

          <UserCircle2
            size={68}
            strokeWidth={1.25}
            className="
              !relative
              !z-10
              !text-[#D6B36A]
            "
          />

          {/* Online indicator */}
          <span
            className="
              !absolute
              !bottom-1.5
              !right-1.5
              !h-4
              !w-4
              !rounded-full
              !border-[3px]
              !border-[var(--color-surface)]
              !bg-[var(--color-success)]
              !shadow-[0_0_12px_rgba(76,179,155,0.45)]
            "
          />
        </motion.div>

        {/* User Details */}

        <div className="!min-w-0 !flex-1">
          {/* Badges */}

          <div className="!mb-3 !flex !flex-wrap !items-center !gap-2.5">
            <span
              className="
                !rounded-full
                !border
                !border-[#D6B36A]/30
                !bg-gradient-to-r
                !from-[#D6B36A]/15
                !to-[#D6B36A]/5
                !px-3
                !py-1.5
                !text-[10px]
                !font-bold
                !uppercase
                !tracking-[0.2em]
                !text-[#B89142]
                dark:!text-[#D6B36A]
              "
            >
              Customer
            </span>

            <span
              className="
                !flex
                !items-center
                !gap-1.5
                !text-xs
                !text-[var(--color-text-secondary)]
              "
            >
              <ShieldCheck size={14} className="!text-[var(--color-success)]" />
              Verified Account
            </span>
          </div>

          {/* Name */}

          <h1
            className="
              !truncate
              !text-2xl
              !font-bold
              !tracking-[-0.025em]
              !text-[var(--color-text-primary)]
              sm:!text-3xl
            "
          >
            {user?.fullName || "Guest User"}
          </h1>

          <p
            className="
              !mt-1.5
              !text-sm
              !leading-6
              !text-[var(--color-text-secondary)]
            "
          >
            Welcome to your personal account.
          </p>
        </div>
      </div>

      {/* ───────────────── Divider ───────────────── */}

      <div
        className="
          !relative
          !z-10
          !my-7
          !h-px
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-border)]
          !to-transparent
        "
      />

      {/* ───────────────── Information Cards ───────────────── */}

      <div
        className="
          !relative
          !z-10
          !grid
          !gap-4
          sm:!grid-cols-2
        "
      >
        {/* Customer ID */}

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="
            !group
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface-secondary)]
            !p-4
            !transition-all
            !duration-300
            hover:!border-[#D6B36A]/30
            hover:!shadow-[0_8px_25px_rgba(0,0,0,0.06)]
            dark:hover:!shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          "
        >
          <div className="!mb-2 !flex !items-center !justify-between !gap-3">
            <p
              className="
                !text-[10px]
                !font-bold
                !uppercase
                !tracking-[0.2em]
                !text-[var(--color-text-muted)]
              "
            >
              Customer ID
            </p>

            <button
              type="button"
              onClick={handleCopy}
              disabled={customerId === "Not Available"}
              className="
                !flex
                !h-8
                !w-8
                !shrink-0
                !items-center
                !justify-center
                !rounded-lg
                !border
                !border-transparent
                !text-[var(--color-text-secondary)]
                !transition-all
                !duration-300
                hover:!border-[#D6B36A]/20
                hover:!bg-[#D6B36A]/10
                hover:!text-[#D6B36A]
                disabled:!cursor-not-allowed
                disabled:!opacity-40
              "
              title={copied ? "Copied" : "Copy Customer ID"}
            >
              {copied ? (
                <Check size={15} className="!text-[var(--color-success)]" />
              ) : (
                <Copy size={15} />
              )}
            </button>
          </div>

          <p
            className="
              !truncate
              !font-mono
              !text-sm
              !font-medium
              !tracking-wide
              !text-[var(--color-text-primary)]
            "
            title={customerId}
          >
            {customerId}
          </p>

          {copied && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                !mt-2
                !text-[10px]
                !font-medium
                !text-[var(--color-success)]
              "
            >
              Customer ID copied
            </motion.p>
          )}
        </motion.div>

        {/* Member Since */}

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="
            !group
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface-secondary)]
            !p-4
            !transition-all
            !duration-300
            hover:!border-[#D6B36A]/30
            hover:!shadow-[0_8px_25px_rgba(0,0,0,0.06)]
            dark:hover:!shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          "
        >
          <p
            className="
              !mb-2
              !flex
              !items-center
              !gap-2
              !text-[10px]
              !font-bold
              !uppercase
              !tracking-[0.2em]
              !text-[var(--color-text-muted)]
            "
          >
            <CalendarDays size={14} className="!text-[#D6B36A]" />
            Member Since
          </p>

          <p
            className="
              !text-sm
              !font-semibold
              !text-[var(--color-text-primary)]
            "
          >
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Not Available"}
          </p>
        </motion.div>
      </div>

      {/* ───────────────── Bottom Accent ───────────────── */}

      <motion.div
        initial={{ width: "12%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="
          !absolute
          !bottom-0
          !left-0
          !h-[2px]
          !bg-gradient-to-r
          !from-[#4A1D2F]
          !via-[#D6B36A]
          !to-transparent
        "
      />
    </motion.div>
  );
};

export default ProfileCard;
