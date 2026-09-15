import { motion } from "framer-motion";
import {
  Wifi,
  ParkingCircle,
  Utensils,
  ShieldCheck,
  WashingMachine,
  Bike,
} from "lucide-react";

const facilities = [
  {
    icon: Wifi,
    title: "High Speed WiFi",
  },
  {
    icon: Utensils,
    title: "Healthy Food",
  },
  {
    icon: Bike,
    title: "Bike Parking",
  },
  {
    icon: ParkingCircle,
    title: "Parking",
  },
  {
    icon: ShieldCheck,
    title: "24×7 Security",
  },
  {
    icon: WashingMachine,
    title: "Laundry",
  },
];

const Facilities = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-background)] !py-20 !text-[var(--color-text-primary)] !transition-colors !duration-500 sm:!py-24 lg:!py-28">
      {/* =====================================================
          PREMIUM AMBIENT GLOW
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-left-40 !top-20 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-right-40 !bottom-0 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]"
      />

      {/* =====================================================
          TOP GRADIENT LINE
      ====================================================== */}

      <div className="!pointer-events-none !absolute !left-0 !top-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/30 !to-transparent" />

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        {/* =================================================
            HEADING
        ================================================== */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="!mx-auto !max-w-2xl !text-center"
        >
          {/* Label */}

          <div className="!flex !items-center !justify-center !gap-3">
            <span className="!h-px !w-7 !bg-[var(--color-primary)]/60" />

            <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
              Everything You Need
            </span>

            <span className="!h-px !w-7 !bg-[var(--color-primary)]/60" />
          </div>

          {/* Heading */}

          <h2 className="!mt-4 !text-3xl !font-semibold !leading-tight !tracking-[-0.03em] sm:!text-4xl lg:!text-5xl">
            Facilities designed
            <br className="sm:!hidden" />
            <span className="!text-[var(--color-primary)]"> around you.</span>
          </h2>

          {/* Description */}

          <p className="!mt-5 !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base">
            Thoughtful amenities that make everyday hostel living easier, safer
            and more comfortable.
          </p>
        </motion.div>

        {/* =================================================
            FACILITY CARDS
        ================================================== */}

        <div className="!mt-12 !grid !grid-cols-1 !gap-4 sm:!grid-cols-2 lg:!grid-cols-3">
          {facilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -7,
                }}
                className="!group !relative !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-7 !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[var(--color-primary)]/30 hover:!shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:hover:!shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                {/* Card Glow */}

                <div className="!pointer-events-none !absolute !-right-10 !-top-10 !h-24 !w-24 !rounded-full !bg-[var(--color-primary)]/5 !blur-2xl !transition-all !duration-500 group-hover:!bg-[var(--color-primary)]/10" />

                {/* Top Row */}

                <div className="!relative !flex !items-center !justify-between">
                  {/* Icon */}

                  <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-xl !bg-[var(--color-primary)]/10 !text-[var(--color-primary)] !transition-all !duration-300 group-hover:!bg-[var(--color-primary)] group-hover:!text-[#17130A] group-hover:!shadow-[0_8px_25px_rgba(212,175,55,0.2)]">
                    <Icon size={23} strokeWidth={1.9} />
                  </div>

                  {/* Number */}

                  <span className="!text-xs !font-medium !tracking-widest !text-[var(--color-text-muted)] !transition-colors !duration-300 group-hover:!text-[var(--color-primary)]/60">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}

                <h3 className="!mt-6 !text-lg !font-semibold !tracking-tight !text-[var(--color-text-primary)]">
                  {item.title}
                </h3>

                {/* Animated Line */}

                <div className="!mt-5 !h-px !w-8 !bg-[var(--color-primary)] !transition-all !duration-300 group-hover:!w-16" />

                {/* Bottom subtle text */}

                <p className="!mt-4 !text-xs !leading-5 !text-[var(--color-text-muted)]">
                  Designed for a comfortable everyday stay.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          BOTTOM GRADIENT LINE
      ====================================================== */}

      <div className="!pointer-events-none !absolute !bottom-0 !left-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/20 !to-transparent" />
    </section>
  );
};

export default Facilities;
