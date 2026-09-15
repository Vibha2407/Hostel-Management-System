import { motion } from "framer-motion";
import { ShieldCheck, ArrowDown } from "lucide-react";

const RulesHero = () => {
  return (
    <section
      className="
        !relative
        !overflow-hidden
        !bg-[var(--color-surface)]
        !py-24
        sm:!py-28
        lg:!py-36
        dark:!bg-[#0B0B0B]
      "
    >
      {/* =====================================================
          PREMIUM BACKGROUND
      ====================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-40
          !-top-40
          !h-[500px]
          !w-[500px]
          !rounded-full
          !bg-[#D4AF37]/[0.12]
          !blur-[140px]
          dark:!bg-[#D4AF37]/10
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-left-40
          !bottom-0
          !h-[350px]
          !w-[350px]
          !rounded-full
          !bg-[#D4AF37]/[0.07]
          !blur-[120px]
          dark:!bg-[#D4AF37]/5
        "
      />

      {/* Subtle center glow */}

      <div
        className="
          !pointer-events-none
          !absolute
          !left-1/2
          !top-1/2
          !h-[300px]
          !w-[500px]
          !-translate-x-1/2
          !-translate-y-1/2
          !rounded-full
          !bg-[#D4AF37]/[0.035]
          !blur-[100px]
          dark:!bg-[#D4AF37]/[0.025]
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          !relative
          !mx-auto
          !max-w-4xl
          !px-5
          !text-center
          sm:!px-8
        "
      >
        {/* =====================================================
            ICON
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !mx-auto
            !mb-7
            !flex
            !h-14
            !w-14
            !items-center
            !justify-center
            !rounded-2xl
            !border
            !border-[#D4AF37]/30
            !bg-[#D4AF37]/10
            !text-[#D4AF37]
            !shadow-[0_10px_35px_rgba(212,175,55,0.08)]
          "
        >
          <ShieldCheck size={27} />
        </motion.div>

        {/* =====================================================
            LABEL
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="
            !mb-5
            !flex
            !items-center
            !justify-center
            !gap-3
          "
        >
          <span className="!h-px !w-8 !bg-[#D4AF37]" />

          <span
            className="
              !text-xs
              !font-semibold
              !uppercase
              !tracking-[0.3em]
              !text-[#B8941F]
              dark:!text-[#D4AF37]
            "
          >
            Resident Guide
          </span>

          <span className="!h-px !w-8 !bg-[#D4AF37]" />
        </motion.div>

        {/* =====================================================
            HEADING
        ====================================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !text-4xl
            !font-semibold
            !leading-[1.05]
            !tracking-tight
            !text-[var(--color-text-primary)]

            sm:!text-5xl
            lg:!text-7xl

            dark:!text-white
          "
        >
          Stay respectful.
          <span
            className="
              !block
              !text-[#B8941F]
              dark:!text-[#D4AF37]
            "
          >
            Live comfortably.
          </span>
        </motion.h1>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="
            !mx-auto
            !mt-6
            !max-w-2xl
            !text-sm
            !leading-7
            !text-[var(--color-text-secondary)]
            sm:!text-base
            dark:!text-[#858585]
          "
        >
          Our guidelines are designed to maintain a safe, peaceful and
          respectful environment for every HostelHub resident.
        </motion.p>

        {/* =====================================================
            BOTTOM INDICATOR
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.6,
          }}
          className="
            !mx-auto
            !mt-12
            !flex
            !w-fit
            !items-center
            !gap-2
            !text-[var(--color-text-secondary)]
            dark:!text-[#666666]
          "
        >
          <span
            className="
              !text-xs
              !uppercase
              !tracking-[0.2em]
            "
          >
            Read our guidelines
          </span>

          <ArrowDown
            size={15}
            className="!text-[#B8941F] dark:!text-[#D4AF37]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default RulesHero;
