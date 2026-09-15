import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative !min-h-[calc(100svh-80px)] !overflow-hidden bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-500">
      {/* ================= BACKGROUND GLOW ================= */}

      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none !absolute !-left-40 !top-20 !h-96 !w-96 !rounded-full bg-[var(--color-primary)]/10 !blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none !absolute !-right-40 !bottom-0 !h-96 !w-96 !rounded-full bg-[var(--color-primary)]/10 !blur-[130px]"
      />

      {/* ================= SUBTLE TOP GRADIENT ================= */}

      <div className="pointer-events-none !absolute !inset-x-0 !top-0 !h-40 !bg-gradient-to-b !from-[var(--color-primary)]/[0.04] !to-transparent" />

      <div className="relative !mx-auto !flex !min-h-[calc(100svh-80px)] !w-full !max-w-7xl !items-center !px-5 !py-16 sm:!px-8 lg:!px-10 xl:!px-12">
        <div className="grid !w-full !items-center lg:!grid-cols-[1fr_0.9fr] !gap-12 lg:!gap-16 xl:!gap-20">
          {/* ================= LEFT CONTENT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Label */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="!mb-6 !inline-flex !items-center !gap-2 !rounded-full !border !border-[var(--color-primary)]/30 !bg-[var(--color-surface)]/70 !px-4 !py-2 !backdrop-blur-md !transition-colors !duration-300"
            >
              <Sparkles size={15} className="!text-[var(--color-primary)]" />

              <span className="!text-xs !font-semibold !uppercase !tracking-[0.22em] !text-[var(--color-primary)] sm:!text-sm">
                About HostelHub
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="!text-4xl !font-semibold !leading-[1.08] !tracking-[-0.03em] !text-[var(--color-text-primary)] sm:!text-5xl md:!text-6xl lg:!text-[62px] xl:!text-[70px]"
            >
              More than a room.
              <br />
              <span className="!bg-gradient-to-r !from-[var(--color-primary)] !via-[var(--color-primary-hover)] !to-[var(--color-primary)] !bg-clip-text !text-transparent">
                It's your home.
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="!mt-7 !max-w-2xl !text-base !leading-7 !text-[var(--color-text-secondary)] sm:!text-lg sm:!leading-8"
            >
              HostelHub provides modern accommodation with comfortable rooms,
              essential facilities, reliable security and a welcoming
              environment for students and working professionals.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="!mt-9 !flex !flex-col !gap-3 sm:!flex-row"
            >
              {/* Explore Rooms */}

              <Link
                to="/rooms"
                className="group !inline-flex !min-h-12 !items-center !justify-center !gap-2 !rounded-xl !bg-[var(--color-primary)] !px-7 !py-3.5 !font-semibold !text-[#17130A] !shadow-[0_10px_35px_rgba(212,175,55,0.15)] !transition-all !duration-300 hover:!-translate-y-0.5 hover:!bg-[var(--color-primary-hover)] hover:!shadow-[0_12px_40px_rgba(212,175,55,0.25)]"
              >
                Explore Rooms
                <ArrowRight
                  size={18}
                  className="!transition-transform !duration-300 group-hover:!translate-x-1"
                />
              </Link>

              {/* Contact */}

              <Link
                to="/contact"
                className="!inline-flex !min-h-12 !items-center !justify-center !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface)]/70 !px-7 !py-3.5 !font-semibold !text-[var(--color-text-primary)] !backdrop-blur-md !transition-all !duration-300 hover:!-translate-y-0.5 hover:!border-[var(--color-primary)]/50 hover:!bg-[var(--color-surface-secondary)]"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="relative !mx-auto !w-full !max-w-xl"
          >
            {/* Gold Frame */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="!absolute !-right-3 !-top-3 !h-full !w-full !rounded-[2rem] !border !border-[var(--color-primary)]/30 sm:!-right-5 sm:!-top-5"
            />

            {/* Image */}

            <div className="relative !overflow-hidden !rounded-[2rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-2xl">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1000"
                alt="Hostel"
                className="!h-[400px] !w-full !object-cover sm:!h-[500px] lg:!h-[580px]"
              />

              {/* Image Overlay */}

              <div className="!absolute !inset-0 !bg-gradient-to-t !from-black/80 !via-black/15 !to-transparent" />

              {/* Floating Card */}

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="!absolute !bottom-5 !left-5 !right-5 !rounded-2xl !border !border-white/15 !bg-black/55 !p-5 !backdrop-blur-xl sm:!bottom-7 sm:!left-7 sm:!right-auto sm:!max-w-xs"
              >
                <p className="!text-xs !font-medium !uppercase !tracking-[0.2em] !text-[var(--color-primary-hover)]">
                  Our Philosophy
                </p>

                <p className="!mt-2 !text-base !font-medium !leading-6 !text-white">
                  Comfortable living. Meaningful experiences.
                </p>
              </motion.div>
            </div>

            {/* Gold Glow */}

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none !absolute !-bottom-10 !-right-10 !h-32 !w-32 !rounded-full bg-[var(--color-primary)]/15 !blur-[70px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
