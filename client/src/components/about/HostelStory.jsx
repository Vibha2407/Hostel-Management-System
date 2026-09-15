import { motion } from "framer-motion";
import {
  Home,
  ShieldCheck,
  Wifi,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Home size={22} />,
    title: "Comfortable Rooms",
    description:
      "Fully furnished AC & Non-AC rooms designed for different needs and budgets.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Safe Environment",
    description:
      "24×7 CCTV surveillance with secure entry systems for peace of mind.",
  },
  {
    icon: <Wifi size={22} />,
    title: "High-Speed WiFi",
    description:
      "Reliable internet for study, work, entertainment and staying connected.",
  },
  {
    icon: <UtensilsCrossed size={22} />,
    title: "Healthy Food",
    description:
      "Fresh meals prepared with comfort and everyday nutrition in mind.",
  },
];

const HostelStory = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-background)] !py-20 !text-[var(--color-text-primary)] !transition-colors !duration-500 sm:!py-24 lg:!py-32">
      {/* =====================================================
          AMBIENT GRADIENT
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-right-40 !top-1/4 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 25, 0],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-left-40 !bottom-0 !h-80 !w-80 !rounded-full !bg-[var(--color-primary)]/10 !blur-[120px]"
      />

      {/* Top Gradient Line */}

      <div className="!pointer-events-none !absolute !left-0 !top-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/25 !to-transparent" />

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        <div className="!grid !items-center !gap-14 lg:!grid-cols-2 lg:!gap-20">
          {/* =================================================
              IMAGE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="!relative"
          >
            {/* Decorative Frame */}

            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="!absolute !-bottom-4 !-left-4 !h-24 !w-24 !rounded-2xl !border !border-[var(--color-primary)]/25"
            />

            {/* Image Container */}

            <div className="!relative !overflow-hidden !rounded-[2rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)]">
              <motion.img
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.6,
                }}
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900"
                alt="Hostel Room"
                className="!h-[450px] !w-full !object-cover sm:!h-[550px]"
              />

              {/* Image Overlay */}

              <div className="!absolute !inset-0 !bg-gradient-to-t !from-black/55 !via-transparent !to-transparent" />

              {/* Image Badge */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
                className="!absolute !bottom-5 !left-5 !flex !items-center !gap-2 !rounded-full !border !border-white/15 !bg-black/35 !px-4 !py-2.5 !text-white !backdrop-blur-xl"
              >
                <Sparkles size={14} className="!text-[var(--color-primary)]" />

                <span className="!text-xs !font-medium !tracking-wide">
                  Designed to feel like home
                </span>
              </motion.div>
            </div>

            {/* Image Glow */}

            <div className="!pointer-events-none !absolute !-bottom-8 !-right-8 !h-32 !w-32 !rounded-full !bg-[var(--color-primary)]/10 !blur-[70px]" />
          </motion.div>

          {/* =================================================
              CONTENT
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Label */}

            <div className="!flex !items-center !gap-3">
              <span className="!h-px !w-8 !bg-[var(--color-primary)]/60" />

              <span className="!flex !items-center !gap-2 !text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
                <Sparkles size={13} />
                Our Story
              </span>
            </div>

            {/* Heading */}

            <h2 className="!mt-4 !text-3xl !font-semibold !leading-tight !tracking-[-0.035em] sm:!text-4xl lg:!text-5xl">
              A home away
              <br />
              from <span className="!text-[var(--color-primary)]">home.</span>
            </h2>

            {/* Description */}

            <p className="!mt-6 !text-base !leading-8 !text-[var(--color-text-secondary)]">
              HostelHub was created with one simple vision — to provide students
              and working professionals with a safe, affordable, comfortable and
              modern place to live.
            </p>

            <p className="!mt-4 !text-base !leading-8 !text-[var(--color-text-secondary)]">
              We believe accommodation should feel like home. That's why we
              focus on cleanliness, security, healthy food, premium facilities
              and a peaceful environment.
            </p>

            {/* =================================================
                FEATURE CARDS
            ================================================== */}

            <div className="!mt-9 !grid !grid-cols-1 !gap-3 sm:!grid-cols-2">
              {features.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 20,
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
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="!group !relative !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-5 !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[var(--color-primary)]/30 hover:!shadow-xl"
                >
                  {/* Card Glow */}

                  <div className="!pointer-events-none !absolute !-right-10 !-top-10 !h-24 !w-24 !rounded-full !bg-[var(--color-primary)]/10 !opacity-0 !blur-3xl !transition-opacity !duration-500 group-hover:!opacity-100" />

                  <div className="!relative">
                    {/* Icon */}

                    <div className="!mb-4 !flex !h-10 !w-10 !items-center !justify-center !rounded-xl !bg-[var(--color-primary)]/10 !text-[var(--color-primary)] !transition-all !duration-300 group-hover:!bg-[var(--color-primary)] group-hover:!text-[#17130A] group-hover:!shadow-[0_8px_25px_rgba(212,175,55,0.18)]">
                      {item.icon}
                    </div>

                    {/* Title */}

                    <h3 className="!font-semibold !text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>

                    {/* Description */}

                    <p className="!mt-2 !text-sm !leading-6 !text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}

      <div className="!pointer-events-none !absolute !bottom-0 !left-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/15 !to-transparent" />
    </section>
  );
};

export default HostelStory;
