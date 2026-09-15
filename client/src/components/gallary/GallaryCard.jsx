import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GalleryCard = ({ item, index = 0, onClick }) => {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -7,
        transition: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      className="!group !relative !cursor-pointer !overflow-hidden !rounded-[1.5rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)] !transition-all !duration-500 hover:!border-[var(--color-primary)]/40 hover:!shadow-[0_20px_60px_rgba(212,175,55,0.12)]"
      onClick={() => onClick(item)}
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="!relative !h-[330px] !overflow-hidden sm:!h-[360px]">
        <motion.img
          src={item.image}
          alt={item.title}
          className="!h-full !w-full !object-cover"
          initial={{
            scale: 1.04,
          }}
          whileHover={{
            scale: 1.1,
            x: 5,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* =====================================================
            CINEMATIC GRADIENT
        ====================================================== */}

        <div className="!absolute !inset-0 !bg-gradient-to-t !from-black/90 !via-black/25 !to-transparent" />

        {/* =====================================================
            GOLD AMBIENT GRADIENT
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="!pointer-events-none !absolute !inset-0 !bg-gradient-to-tr !from-[#D4AF37]/25 !via-[#D4AF37]/5 !to-transparent"
        />

        {/* =====================================================
            SUBTLE IMAGE SHINE
        ====================================================== */}

        <motion.div
          initial={{
            x: "-120%",
          }}
          whileHover={{
            x: "120%",
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="!pointer-events-none !absolute !inset-y-0 !-left-1/2 !w-1/3 !skew-x-[-18deg] !bg-gradient-to-r !from-transparent !via-white/15 !to-transparent !blur-sm"
        />

        {/* =====================================================
            CATEGORY
        ====================================================== */}

        <div className="!absolute !left-5 !top-5">
          <span className="!inline-flex !rounded-full !border !border-white/25 !bg-black/45 !px-3.5 !py-2 !text-[10px] !font-bold !uppercase !tracking-[0.2em] !text-white !shadow-[0_5px_20px_rgba(0,0,0,0.18)] !backdrop-blur-xl">
            {item.category}
          </span>
        </div>

        {/* =====================================================
            VIEW BUTTON
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
            rotate: -15,
          }}
          whileHover={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!absolute !right-5 !top-5 !flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-white/25 !bg-black/45 !text-white !shadow-[0_5px_20px_rgba(0,0,0,0.18)] !backdrop-blur-xl !transition-all !duration-300 hover:!border-[#D4AF37]/70 hover:!bg-[#D4AF37] hover:!text-[#17130A]"
        >
          <ArrowUpRight size={18} />
        </motion.div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="!absolute !bottom-0 !left-0 !right-0 !p-5 sm:!p-6">
          <motion.div
            initial={{
              y: 12,
              opacity: 0.85,
            }}
            whileHover={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            {/* Gold accent */}

            <div className="!mb-2 !h-px !w-7 !bg-gradient-to-r !from-[#D4AF37] !to-[#E7C95C] !transition-all !duration-500 group-hover:!w-14" />

            {/* Title */}

            <h3 className="!text-xl !font-semibold !tracking-tight !text-white !drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              {item.title}
            </h3>

            {/* Small text */}

            <p className="!mt-1 !text-xs !font-medium !text-white/80 !drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)]">
              Explore this space
            </p>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default GalleryCard;
