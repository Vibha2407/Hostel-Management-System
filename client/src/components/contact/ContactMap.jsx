import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const ContactMap = () => {
  return (
    <section
      className="
        !relative
        !overflow-hidden
        !bg-[var(--color-background)]
        !px-5
        !py-16
        sm:!px-8
        sm:!py-20
        lg:!py-24
      "
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-32
          !-top-32
          !h-80
          !w-80
          !rounded-full
          !bg-[var(--color-primary)]/8
          !blur-3xl
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-bottom-40
          !-left-32
          !h-80
          !w-80
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-3xl
        "
      />

      <div className="!relative !z-10 !mx-auto !max-w-7xl">
        {/* ================= HEADER ================= */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            !mx-auto
            !mb-10
            !max-w-3xl
            !text-center
          "
        >
          {/* Eyebrow */}

          <div
            className="
              !mb-4
              !flex
              !items-center
              !justify-center
              !gap-3
            "
          >
            <span
              className="
                !h-px
                !w-8
                !bg-[var(--color-primary)]
              "
            />

            <p
              className="
                !text-[10px]
                !font-bold
                !uppercase
                !tracking-[0.3em]
                !text-[var(--color-primary)]
                sm:!text-xs
              "
            >
              Find us
            </p>

            <span
              className="
                !h-px
                !w-8
                !bg-[var(--color-primary)]
              "
            />
          </div>

          {/* Heading */}

          <h2
            className="
              !text-3xl
              !font-bold
              !leading-tight
              !tracking-tight
              !text-[var(--color-text-primary)]
              sm:!text-4xl
              lg:!text-5xl
            "
          >
            Come visit
            <span className="!text-[var(--color-primary)]"> HostelHub.</span>
          </h2>

          {/* Description */}

          <p
            className="
              !mx-auto
              !mt-4
              !max-w-xl
              !text-sm
              !leading-7
              !text-[var(--color-text-secondary)]
              sm:!text-base
            "
          >
            Find your way to HostelHub and discover a comfortable place designed
            to feel like home.
          </p>

          {/* Location */}

          <motion.div
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
              delay: 0.2,
              duration: 0.5,
            }}
            className="
              !mx-auto
              !mt-6
              !inline-flex
              !items-center
              !gap-2
              !rounded-full
              !border
              !border-[var(--color-primary)]/25
              !bg-[var(--color-surface)]
              !px-4
              !py-2
              !text-sm
              !font-medium
              !text-[var(--color-text-secondary)]
              !shadow-[var(--shadow-card)]
            "
          >
            <span
              className="
                !flex
                !h-7
                !w-7
                !items-center
                !justify-center
                !rounded-full
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
              "
            >
              <MapPin size={15} />
            </span>
            Bhilai, India
          </motion.div>
        </motion.div>

        {/* ================= MAP CARD ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -4,
            transition: {
              duration: 0.3,
            },
          }}
          className="
            !group
            !relative
            !overflow-hidden
            !rounded-[1.5rem]
            !border
            !border-[var(--color-primary)]/25
            !bg-[var(--color-surface)]
            !p-2
            !shadow-[var(--shadow-card)]
            !transition-all
            !duration-500
            hover:!border-[var(--color-primary)]/50
            sm:!rounded-[2rem]
            sm:!p-3
          "
        >
          {/* Map */}

          <div
            className="
              !relative
              !overflow-hidden
              !rounded-[1.1rem]
              sm:!rounded-[1.5rem]
            "
          >
            <iframe
              title="Hostel Location"
              src="https://www.google.com/maps?q=Bhilai&output=embed"
              className="
                !h-[320px]
                !w-full
                !border-0
                sm:!h-[400px]
                lg:!h-[500px]
              "
              loading="lazy"
            />

            {/* Map overlay */}

            <div
              className="
                !pointer-events-none
                !absolute
                !inset-0
                !rounded-[inherit]
                !border
                !border-black/10
              "
            />
          </div>

          {/* Floating location badge */}

          <motion.div
            initial={{
              opacity: 0,
              x: 15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="
              !absolute
              !right-5
              !top-5
              !hidden
              !items-center
              !gap-3
              !rounded-2xl
              !border
              !border-[var(--color-primary)]/25
              !bg-[var(--color-surface)]/95
              !px-4
              !py-3
              !shadow-[0_12px_35px_rgba(0,0,0,0.12)]
              !backdrop-blur-md
              sm:!flex
            "
          >
            <div
              className="
                !flex
                !h-9
                !w-9
                !items-center
                !justify-center
                !rounded-xl
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
              "
            >
              <Navigation size={16} />
            </div>

            <div>
              <p
                className="
                  !text-[10px]
                  !font-bold
                  !uppercase
                  !tracking-wider
                  !text-[var(--color-text-muted)]
                "
              >
                Our location
              </p>

              <p
                className="
                  !mt-0.5
                  !text-xs
                  !font-semibold
                  !text-[var(--color-text-primary)]
                "
              >
                Bhilai, India
              </p>
            </div>
          </motion.div>

          {/* Bottom accent */}

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
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
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;
