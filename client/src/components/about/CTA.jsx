import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-primary)] !py-20 !text-[#17130A] sm:!py-24 lg:!py-28">
      {/* =====================================================
          DECORATIVE ELEMENTS
      ====================================================== */}

      <div className="!pointer-events-none !absolute !-right-20 !-top-20 !h-72 !w-72 !rounded-full !border !border-[#17130A]/10" />

      <div className="!pointer-events-none !absolute !-bottom-32 !-left-20 !h-80 !w-80 !rounded-full !border !border-[#17130A]/10" />

      {/* Soft ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-80 !w-80 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !bg-white/20 !blur-[100px]"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !z-10 !mx-auto !max-w-4xl !px-5 !text-center sm:!px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Eyebrow */}
          <motion.span
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
              duration: 0.6,
            }}
            className="!inline-block !text-xs !font-bold !uppercase !tracking-[0.3em] !text-[#17130A]/60"
          >
            Your next chapter starts here
          </motion.span>

          {/* Heading */}
          <h2 className="!mt-5 !text-4xl !font-semibold !leading-[1.05] !tracking-[-0.035em] sm:!text-5xl lg:!text-6xl">
            Ready to find your
            <br />
            perfect room?
          </h2>

          {/* Description */}
          <p className="!mx-auto !mt-6 !max-w-2xl !text-base !leading-7 !text-[#17130A]/65 sm:!text-lg sm:!leading-8">
            Book your stay today and experience comfortable, secure and
            affordable hostel living.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="!mt-9 !inline-block"
          >
            <Link
              to="/rooms"
              className="!group !inline-flex !items-center !justify-center !gap-2 !rounded-xl !bg-[#0B0C0E] !px-8 !py-4 !font-semibold !text-white !shadow-[0_12px_35px_rgba(0,0,0,0.18)] !transition-all !duration-300 hover:!bg-[#151619] hover:!shadow-[0_16px_45px_rgba(0,0,0,0.25)]"
            >
              Browse Rooms
              <ArrowRight
                size={19}
                className="!transition-transform !duration-300 group-hover:!translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          EDGE GRADIENT
      ====================================================== */}

      <div className="!pointer-events-none !absolute !bottom-0 !left-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[#17130A]/20 !to-transparent" />
    </section>
  );
};

export default CTA;
