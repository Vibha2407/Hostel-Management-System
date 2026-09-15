import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const GalleryHero = () => {
  return (
    <section className="!relative !flex !min-h-[45vh] !items-center !justify-center !overflow-hidden !bg-[var(--color-background)] !py-20 !text-[var(--color-text-primary)] sm:!min-h-[50vh]">
      {/* ================= AMBIENT GRADIENTS ================= */}

      <div className="!pointer-events-none !absolute !-left-32 !top-0 !h-72 !w-72 !rounded-full !bg-[var(--color-primary)]/10 !blur-[120px]" />

      <div className="!pointer-events-none !absolute !-right-32 !bottom-0 !h-80 !w-80 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]" />

      {/* Premium center glow */}
      <div className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-56 !w-56 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !bg-[var(--color-primary)]/5 !blur-[100px]" />

      {/* ================= CONTENT ================= */}

      <div className="!relative !mx-auto !flex !w-full !max-w-7xl !items-center !justify-center !px-5 !text-center sm:!px-8 lg:!px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mx-auto !max-w-3xl"
        >
          {/* Label */}

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
              delay: 0.15,
              duration: 0.6,
            }}
            className="!mb-5 !flex !items-center !justify-center !gap-3"
          >
            <span className="!h-px !w-8 !bg-[var(--color-primary)] sm:!w-12" />

            <div className="!flex !items-center !gap-2">
              <Sparkles size={14} className="!text-[var(--color-primary)]" />

              <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
                Hostel Moments
              </span>
            </div>

            <span className="!h-px !w-8 !bg-[var(--color-primary)] sm:!w-12" />
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="!text-4xl !font-semibold !leading-[1.08] !tracking-[-0.04em] !text-[var(--color-text-primary)] sm:!text-5xl md:!text-6xl lg:!text-7xl"
          >
            Our
            <span className="!bg-gradient-to-r !from-[var(--color-primary)] !via-[#E7C95C] !to-[var(--color-primary)] !bg-clip-text !text-transparent">
              {" "}
              Gallery.
            </span>
          </motion.h1>

          {/* Description */}

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
              delay: 0.5,
              duration: 0.7,
            }}
            className="!mx-auto !mt-6 !max-w-2xl !text-sm !font-medium !leading-7 !text-[var(--color-text-secondary)] sm:!text-base sm:!leading-8"
          >
            Explore our premium rooms, delicious meals, modern facilities,
            exciting events and comfortable living environment.
          </motion.p>

          {/* Bottom accent */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              delay: 0.7,
              duration: 0.8,
            }}
            className="!mx-auto !mt-8 !h-px !w-20 !origin-center !bg-gradient-to-r !from-transparent !via-[var(--color-primary)] !to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryHero;
