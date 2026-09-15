import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

const members = [
  {
    name: "A.K. Sharma",
    role: "Founder",
  },
  {
    name: "N. V. Singh",
    role: "Manager",
  },
  {
    name: "N.K. Verma",
    role: "Support Head",
  },
];

const Team = () => {
  return (
    <section className="!relative !overflow-hidden !bg-[var(--color-background)] !py-20 !text-[var(--color-text-primary)] !transition-colors !duration-300 sm:!py-24 lg:!py-28">
      {/* =====================================================
          AMBIENT GLOW
      ====================================================== */}

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -20, 0],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-left-40 !top-20 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="!pointer-events-none !absolute !-right-40 !bottom-0 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]"
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="!mx-auto !max-w-2xl !text-center"
        >
          <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
            The People Behind HostelHub
          </span>

          <h2 className="!mt-4 !text-3xl !font-semibold !tracking-[-0.03em] sm:!text-4xl lg:!text-5xl">
            Meet the
            <span className="!text-[var(--color-primary-hover)]"> team.</span>
          </h2>

          <p className="!mx-auto !mt-4 !max-w-xl !text-sm !leading-7 !text-[var(--color-text-secondary)] sm:!text-base">
            The people working behind the scenes to make every stay comfortable,
            secure and hassle-free.
          </p>
        </motion.div>

        {/* =====================================================
            TEAM CARDS
        ====================================================== */}

        <div className="!mt-12 !grid !grid-cols-1 !gap-5 sm:!grid-cols-2 lg:!grid-cols-3">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{
                opacity: 0,
                y: 35,
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
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
              }}
              className="!group !overflow-hidden !rounded-[2rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)] !transition-all !duration-300 hover:!border-[var(--color-primary)]/30"
            >
              {/* =================================================
                  PROFILE AREA
              ================================================== */}

              <div className="!relative !flex !h-64 !items-center !justify-center !overflow-hidden !bg-gradient-to-br !from-[var(--color-surface-secondary)] !to-[var(--color-background)]">
                {/* Ambient Glow */}

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.06, 0.12, 0.06],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                  className="!absolute !h-40 !w-40 !rounded-full !bg-[var(--color-primary)]/10 !blur-3xl !transition-all !duration-500 group-hover:!bg-[var(--color-primary)]/20"
                />

                {/* Profile Icon */}

                <div className="!relative !flex !h-28 !w-28 !items-center !justify-center !rounded-full !border !border-[var(--color-primary)]/30 !bg-[var(--color-primary)]/10 !text-[var(--color-primary)] !shadow-[0_0_40px_rgba(212,175,55,0.08)] !transition-all !duration-500 group-hover:!scale-105 group-hover:!border-[var(--color-primary)]/60 group-hover:!shadow-[0_0_50px_rgba(212,175,55,0.14)]">
                  <UserRound size={42} strokeWidth={1.5} />
                </div>

                {/* Decorative Line */}

                <div className="!pointer-events-none !absolute !bottom-0 !left-1/2 !h-px !w-16 !-translate-x-1/2 !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/40 !to-transparent" />
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div className="!p-6 !text-center">
                <h3 className="!text-xl !font-semibold !tracking-tight !text-[var(--color-text-primary)]">
                  {member.name}
                </h3>

                <p className="!mt-2 !text-sm !font-medium !text-[var(--color-primary)]">
                  {member.role}
                </p>

                <div className="!mx-auto !mt-5 !h-px !w-8 !bg-[var(--color-border)] !transition-all !duration-300 group-hover:!w-14 group-hover:!bg-[var(--color-primary)]/50" />
              </div>
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

export default Team;
