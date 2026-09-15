import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-background)] !py-20 !text-[var(--color-text-primary)] !transition-colors !duration-500 sm:!py-24 lg:!py-28">
      {/* =====================================================
          PREMIUM ANIMATED BACKGROUND
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-left-40 !top-20 !h-[420px] !w-[420px] !rounded-full !bg-[#D4AF37]/[0.06] !blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-right-40 !bottom-10 !h-[420px] !w-[420px] !rounded-full !bg-[#D4AF37]/[0.05] !blur-[120px]"
      />

      {/* Center Glow */}

      <div className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-[500px] !w-[500px] !-translate-x-1/2 !-translate-y-1/2 !rounded-full !bg-[#D4AF37]/[0.025] !blur-[140px]" />

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mx-auto !max-w-2xl !text-center"
        >
          <div className="!mb-5 !flex !items-center !justify-center !gap-3">
            <span className="!h-px !w-8 !bg-[#D4AF37]/60" />

            <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[#B99528] dark:!text-[#E7C95C]">
              What Drives Us
            </span>

            <span className="!h-px !w-8 !bg-[#D4AF37]/60" />
          </div>

          <h2 className="!text-3xl !font-semibold !leading-tight !tracking-[-0.035em] sm:!text-4xl lg:!text-5xl">
            Built with a
            <span className="!bg-gradient-to-r !from-[#B99528] !via-[#E7C95C] !to-[#C49A24] !bg-clip-text !text-transparent dark:!from-[#D4AF37] dark:!via-[#F2D675] dark:!to-[#D4AF37]">
              {" "}
              purpose.
            </span>
          </h2>

          <p className="!mt-5 !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base">
            Everything we do is guided by our commitment to create a better
            living experience for our residents.
          </p>
        </motion.div>

        {/* =====================================================
            CARDS
        ====================================================== */}

        <div className="!mt-12 grid !grid-cols-1 !gap-5 md:!grid-cols-2">
          {/* =================================================
              MISSION
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -7 }}
            className="!group !relative !overflow-hidden !rounded-[2rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-7 !shadow-[0_20px_60px_rgba(0,0,0,0.06)] !transition-all !duration-500 hover:!border-[#D4AF37]/35 hover:!shadow-[0_25px_70px_rgba(212,175,55,0.10)] dark:!bg-white/[0.025] dark:!shadow-none sm:!p-9 lg:!p-10"
          >
            {/* Animated Card Glow */}

            <motion.div
              animate={{
                x: [0, 25, 0],
                opacity: [0.04, 0.09, 0.04],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="!pointer-events-none !absolute !-right-24 !-top-24 !h-64 !w-64 !rounded-full !bg-[#D4AF37] !blur-[90px]"
            />

            {/* Number */}

            <span className="!absolute !right-7 !top-5 !text-7xl !font-bold !tracking-[-0.08em] !text-[var(--color-text-primary)]/[0.035] sm:!right-10 sm:!text-8xl">
              01
            </span>

            {/* Icon */}

            <div className="!relative !flex !h-14 !w-14 !items-center !justify-center !rounded-2xl !border !border-[#D4AF37]/20 !bg-[#D4AF37]/10 !text-[#B99528] !transition-all !duration-500 group-hover:!rotate-3 group-hover:!bg-[#D4AF37] group-hover:!text-[#17130A] group-hover:!shadow-[0_10px_30px_rgba(212,175,55,0.18)] dark:!text-[#E7C95C]">
              <Target size={28} strokeWidth={1.8} />
            </div>

            <h3 className="!relative !mt-7 !text-2xl !font-semibold !tracking-[-0.025em] sm:!text-3xl">
              Our Mission
            </h3>

            <p className="!relative !mt-5 !max-w-xl !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base sm:!leading-8">
              To provide students and working professionals with affordable,
              secure and premium hostel accommodation where they can focus on
              their studies and careers without worrying about comfort.
            </p>

            {/* Bottom Accent */}

            <div className="!relative !mt-8 !h-px !w-10 !bg-gradient-to-r !from-[#D4AF37] !to-transparent !transition-all !duration-500 group-hover:!w-24" />
          </motion.div>

          {/* =================================================
              VISION
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -7 }}
            className="!group !relative !overflow-hidden !rounded-[2rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-7 !shadow-[0_20px_60px_rgba(0,0,0,0.06)] !transition-all !duration-500 hover:!border-[#D4AF37]/35 hover:!shadow-[0_25px_70px_rgba(212,175,55,0.10)] dark:!bg-white/[0.025] dark:!shadow-none sm:!p-9 lg:!p-10"
          >
            {/* Animated Card Glow */}

            <motion.div
              animate={{
                x: [0, -25, 0],
                opacity: [0.04, 0.09, 0.04],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="!pointer-events-none !absolute !-bottom-24 !-left-24 !h-64 !w-64 !rounded-full !bg-[#D4AF37] !blur-[90px]"
            />

            {/* Number */}

            <span className="!absolute !right-7 !top-5 !text-7xl !font-bold !tracking-[-0.08em] !text-[var(--color-text-primary)]/[0.035] sm:!right-10 sm:!text-8xl">
              02
            </span>

            {/* Icon */}

            <div className="!relative !flex !h-14 !w-14 !items-center !justify-center !rounded-2xl !border !border-[#D4AF37]/20 !bg-[#D4AF37]/10 !text-[#B99528] !transition-all !duration-500 group-hover:!-rotate-3 group-hover:!bg-[#D4AF37] group-hover:!text-[#17130A] group-hover:!shadow-[0_10px_30px_rgba(212,175,55,0.18)] dark:!text-[#E7C95C]">
              <Eye size={28} strokeWidth={1.8} />
            </div>

            <h3 className="!relative !mt-7 !text-2xl !font-semibold !tracking-[-0.025em] sm:!text-3xl">
              Our Vision
            </h3>

            <p className="!relative !mt-5 !max-w-xl !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base sm:!leading-8">
              To become India's most trusted hostel brand by providing modern
              living spaces, excellent facilities and exceptional customer
              service.
            </p>

            {/* Bottom Accent */}

            <div className="!relative !mt-8 !h-px !w-10 !bg-gradient-to-r !from-[#D4AF37] !to-transparent !transition-all !duration-500 group-hover:!w-24" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
