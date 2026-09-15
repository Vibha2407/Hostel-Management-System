import { motion } from "framer-motion";

const stats = [
  {
    number: "500+",
    title: "Happy Residents",
  },
  {
    number: "120",
    title: "Premium Rooms",
  },
  {
    number: "10+",
    title: "Facilities",
  },
  {
    number: "24/7",
    title: "Security",
  },
];

const Statistics = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-surface-secondary)] !py-16 !text-[var(--color-text-primary)] transition-colors !duration-300 sm:!py-20 lg:!py-24">
      {/* =====================================================
          AMBIENT GOLD GLOW
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 30, 0],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !left-1/2 !top-0 !h-64 !w-64 !-translate-x-1/2 !rounded-full !bg-[var(--color-primary)]/10 !blur-[100px]"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        <div className="!grid !grid-cols-2 !divide-x !divide-[var(--color-border)] sm:!grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="!group !relative !px-4 !py-5 !text-center sm:!px-6 lg:!px-10"
            >
              {/* Number */}

              <motion.h2
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="!text-3xl !font-semibold !tracking-[-0.03em] !text-[var(--color-primary-hover)] sm:!text-4xl lg:!text-5xl"
              >
                {item.number}
              </motion.h2>

              {/* Title */}

              <p className="!mt-2 !text-xs !text-[var(--color-text-secondary)] transition-colors !duration-300 sm:!mt-3 sm:!text-sm lg:!text-base">
                {item.title}
              </p>

              {/* Accent Line */}

              <motion.div
                initial={{
                  width: "20px",
                }}
                whileInView={{
                  width: "20px",
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + index * 0.1,
                }}
                className="!mx-auto !mt-4 !h-px !bg-[var(--color-primary)]/40 !transition-all !duration-300 group-hover:!w-10"
              />

              {/* Hover Glow */}

              <div className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-24 !w-24 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !bg-[var(--color-primary)]/0 !blur-3xl !transition-all !duration-500 group-hover:!bg-[var(--color-primary)]/5" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* =====================================================
          BOTTOM EDGE
      ====================================================== */}

      <div className="!pointer-events-none !absolute !bottom-0 !left-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/20 !to-transparent" />
    </section>
  );
};

export default Statistics;
