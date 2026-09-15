import { motion } from "framer-motion";
import ProfileCard from "../../components/customer/profile/ProfileCard";
import PersonalInfo from "../../components/customer/profile/PersonalInfo";

const Profile = () => {
  return (
    <main
      className="
        !relative
        !min-h-screen
        !overflow-hidden
        !bg-[var(--color-background)]
        !px-4
        !py-8
        !transition-colors
        !duration-500
        sm:!px-6
        sm:!py-10
        lg:!px-8
        lg:!py-14
      "
    >
      {/* ───────────────── Decorative Background ───────────────── */}
      <div className="!pointer-events-none !absolute !inset-0 !overflow-hidden">
        {/* Gold glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="
            !absolute
            !-right-32
            !-top-32
            !h-80
            !w-80
            !rounded-full
            !bg-[#D6B36A]/10
            !blur-3xl
            dark:!bg-[#D6B36A]/8
          "
        />

        {/* Primary glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.15 }}
          className="
            !absolute
            !-left-40
            !top-1/3
            !h-96
            !w-96
            !rounded-full
            !bg-[#4A1D2F]/5
            !blur-3xl
            dark:!bg-[#D6B36A]/5
          "
        />

        {/* Bottom glow */}
        <div
          className="
            !absolute
            !bottom-[-180px]
            !right-1/4
            !h-96
            !w-96
            !rounded-full
            !bg-[#D6B36A]/5
            !blur-3xl
          "
        />

        {/* Subtle grid */}
        <div
          className="
            !absolute
            !inset-0
            !opacity-[0.025]
            dark:!opacity-[0.04]
            [background-image:linear-gradient(var(--color-text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)_1px,transparent_1px)]
            [background-size:40px_40px]
          "
        />
      </div>

      {/* ───────────────── Main Content ───────────────── */}
      <div className="!relative !z-10 !mx-auto !w-full !max-w-6xl">
        {/* ───────────────── Page Heading ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="!mb-8 sm:!mb-10"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="!mb-3 !flex !items-center !gap-3"
          >
            <span
              className="
                !h-px
                !w-8
                !bg-gradient-to-r
                !from-[#D6B36A]
                !to-transparent
              "
            />

            <p
              className="
                !text-[10px]
                !font-bold
                !uppercase
                !tracking-[0.3em]
                !text-[var(--color-primary)]
              "
            >
              My Account
            </p>
          </motion.div>

          {/* Heading */}
          <h1
            className="
              !bg-gradient-to-r
              !from-[var(--color-text-primary)]
              !via-[var(--color-text-primary)]
              !to-[var(--color-text-secondary)]
              !bg-clip-text
              !text-3xl
              !font-bold
              !tracking-[-0.03em]
              !text-transparent
              sm:!text-4xl
              lg:!text-[42px]
              lg:!leading-tight
            "
          >
            Your Profile
          </h1>

          {/* Description */}
          <p
            className="
              !mt-3
              !max-w-xl
              !text-sm
              !leading-6
              !text-[var(--color-text-secondary)]
              sm:!text-[15px]
              dark:!text-[var(--color-text-secondary)]
            "
          >
            Keep your personal information up to date and manage your account
            details from one place.
          </p>

          {/* Gold accent */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 72, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="
              !mt-5
              !h-[3px]
              !rounded-full
              !bg-gradient-to-r
              !from-[#D6B36A]
              !to-[#D6B36A]/10
            "
          />
        </motion.div>

        {/* ───────────────── Profile Section ───────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            !relative
            !mb-6
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]
            !shadow-[var(--shadow-card)]
            !transition-all
            !duration-500
            hover:!shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            dark:hover:!shadow-[0_12px_40px_rgba(0,0,0,0.35)]
          "
        >
          {/* Top gradient line */}
          <div
            className="
              !absolute
              !left-0
              !right-0
              !top-0
              !h-[2px]
              !bg-gradient-to-r
              !from-transparent
              !via-[#D6B36A]
              !to-transparent
              !opacity-70
            "
          />

          <ProfileCard />
        </motion.section>

        {/* ───────────────── Personal Information ───────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            !relative
            !overflow-hidden
            !rounded-2xl
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]
            !shadow-[var(--shadow-card)]
            !transition-all
            !duration-500
            hover:!shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            dark:hover:!shadow-[0_12px_40px_rgba(0,0,0,0.35)]
          "
        >
          {/* Soft gold glow */}
          <div
            className="
              !pointer-events-none
              !absolute
              !-right-20
              !-top-20
              !h-48
              !w-48
              !rounded-full
              !bg-[#D6B36A]/5
              !blur-3xl
            "
          />

          {/* Top gradient line */}
          <div
            className="
              !absolute
              !left-0
              !right-0
              !top-0
              !h-[2px]
              !bg-gradient-to-r
              !from-transparent
              !via-[var(--color-primary)]
              !to-transparent
              !opacity-40
            "
          />

          <PersonalInfo />
        </motion.section>
      </div>
    </main>
  );
};

export default Profile;
