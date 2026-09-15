import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "Affordable Pricing",
  "Premium Rooms",
  "Safe Environment",
  "24×7 CCTV",
  "Healthy Meals",
  "Professional Staff",
];

const WhyChooseUs = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-background)] !py-20 !text-[var(--color-text-primary)] sm:!py-24 lg:!py-28">
      {/* =====================================================
          DECORATIVE CENTER LINE
      ====================================================== */}

      <div className="pointer-events-none !absolute !left-1/2 !top-0 !h-full !w-px !-translate-x-1/2 !bg-gradient-to-b !from-transparent !via-[var(--color-primary)]/10 !to-transparent" />

      {/* =====================================================
          PREMIUM AMBIENT GLOW
      ====================================================== */}

      <motion.div
        animate={{
          opacity: [0.08, 0.14, 0.08],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none !absolute !left-1/2 !top-10 !h-72 !w-72 !-translate-x-1/2 !rounded-full !bg-[var(--color-primary)]/10 !blur-[110px]"
      />

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        {/* =====================================================
            HEADING
        ====================================================== */}

        <motion.div
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
          }}
          transition={{
            duration: 0.7,
          }}
          className="!mx-auto !max-w-2xl !text-center"
        >
          <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
            Why HostelHub
          </span>

          <h2 className="!mt-4 !text-3xl !font-semibold !tracking-tight !text-[var(--color-text-primary)] sm:!text-4xl lg:!text-5xl">
            Everything you need.
            <br />
            <span className="!text-[var(--color-primary-hover)]">
              Nothing you don't.
            </span>
          </h2>

          <p className="!mx-auto !mt-5 !max-w-xl !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base">
            Thoughtfully designed spaces, reliable facilities and a secure
            environment — everything that makes hostel living comfortable.
          </p>
        </motion.div>

        {/* =====================================================
            REASONS GRID
        ====================================================== */}

        <div className="!mx-auto !mt-12 !grid !max-w-4xl !grid-cols-1 !gap-3 sm:!grid-cols-2">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
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
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                x: 5,
              }}
              className="!group !relative !flex !items-center !gap-4 !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-5 !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[var(--color-primary)]/30 hover:!shadow-[0_12px_35px_rgba(212,175,55,0.08)]"
            >
              {/* Hover Glow */}

              <div className="pointer-events-none !absolute !-right-10 !-top-10 !h-24 !w-24 !rounded-full !bg-[var(--color-primary)]/10 !opacity-0 !blur-2xl !transition-opacity !duration-500 group-hover:!opacity-100" />

              {/* Check Icon */}

              <div className="!relative !flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[var(--color-primary)]/10 !text-[var(--color-primary)] !transition-all !duration-300 group-hover:!bg-[var(--color-primary)] group-hover:!text-[#17130A] group-hover:!shadow-[0_6px_20px_rgba(212,175,55,0.18)]">
                <Check size={19} strokeWidth={2.2} />
              </div>

              {/* Text */}

              <span className="!relative !font-medium !text-[var(--color-text-secondary)] !transition-colors !duration-300 group-hover:!text-[var(--color-text-primary)]">
                {item}
              </span>

              {/* Number */}

              <span className="!relative !ml-auto !text-xs !font-medium !text-[var(--color-text-muted)] !transition-colors !duration-300 group-hover:!text-[var(--color-primary)]">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
