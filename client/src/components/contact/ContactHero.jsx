import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ContactHero = () => {
  const scrollToContact = () => {
    document.getElementById("contact-details")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        !relative
        !overflow-hidden
        !bg-[linear-gradient(135deg,var(--color-surface)_0%,var(--color-background)_55%,var(--color-surface-secondary)_100%)]
        !text-[var(--color-text-primary)]
      "
    >
      {/* ================= BACKGROUND GLOW ================= */}

      {/* Top Right Glow */}
      <div
        className="
          !pointer-events-none
          !absolute
          !-right-32
          !-top-32
          !h-96
          !w-96
          !rounded-full
          !bg-[radial-gradient(circle,var(--color-primary)/20%,transparent_70%)]
          !blur-2xl
        "
      />

      {/* Bottom Left Glow */}
      <div
        className="
          !pointer-events-none
          !absolute
          !-bottom-40
          !-left-20
          !h-96
          !w-96
          !rounded-full
          !bg-[radial-gradient(circle,var(--color-primary)/12%,transparent_70%)]
          !blur-2xl
        "
      />

      {/* Subtle Center Glow */}
      <div
        className="
          !pointer-events-none
          !absolute
          !left-1/2
          !top-1/2
          !h-72
          !w-72
          !-translate-x-1/2
          !-translate-y-1/2
          !rounded-full
          !bg-[radial-gradient(circle,var(--color-primary)/5%,transparent_70%)]
          !blur-3xl
        "
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          !relative
          !z-10
          !mx-auto
          !flex
          !max-w-7xl
          !justify-center
          !px-5
          !py-20
          !text-center
          sm:!px-8
          sm:!py-24
          lg:!px-10
          lg:!py-28
        "
      >
        <div className="!max-w-4xl">
          {/* Eyebrow */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="!mb-5 !flex !items-center !justify-center !gap-3"
          >
            <span className="!h-px !w-8 !bg-[var(--color-primary)]" />

            <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
              Get in touch
            </span>

            <span className="!h-px !w-8 !bg-[var(--color-primary)]" />
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              !text-4xl
              !font-bold
              !leading-[1.08]
              !tracking-tight
              !text-[var(--color-text-primary)]
              sm:!text-5xl
              lg:!text-6xl
              xl:!text-7xl
            "
          >
            Let's make your
            <span className="!block !text-[var(--color-primary)]">
              stay comfortable.
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              !mx-auto
              !mt-6
              !max-w-2xl
              !text-sm
              !leading-7
              !text-[var(--color-text-secondary)]
              sm:!text-base
              sm:!leading-8
            "
          >
            Have questions about rooms, bookings, or facilities? We're here to
            help you find the right space and make your hostel experience
            simple.
          </motion.p>

          {/* Bottom indicator */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.6,
            }}
            className="!mt-10 !flex !flex-col !items-center !gap-3"
          >
            <button
              type="button"
              onClick={scrollToContact}
              aria-label="Scroll to contact details"
              className="
                !flex
                !h-11
                !w-11
                !items-center
                !justify-center
                !rounded-full
                !border
                !border-[var(--color-primary)]/40
                !bg-[var(--color-surface)]/50
                !text-[var(--color-primary)]
                !shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                !backdrop-blur-sm
                !transition-all
                !duration-300
                hover:!border-[var(--color-primary)]
                hover:!bg-[var(--color-primary)]/10
                hover:!shadow-[0_8px_30px_rgba(212,175,55,0.15)]
              "
            >
              <ArrowDown
                size={18}
                className="!transition-transform !duration-300 hover:!translate-y-0.5"
              />
            </button>

            <span className="!text-sm !text-[var(--color-text-secondary)]">
              We'd love to hear from you
            </span>
          </motion.div>
        </div>
      </div>

      {/* ================= GOLD BOTTOM LINE ================= */}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          !absolute
          !bottom-0
          !left-0
          !h-[2px]
          !w-full
          !origin-left
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-primary)]
          !to-transparent
        "
      />
    </section>
  );
};

export default ContactHero;
