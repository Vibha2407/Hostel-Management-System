import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    content: (
      <>
        123 Hostel Street,
        <br />
        Green City, India
      </>
    ),
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@hostelhub.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: (
      <>
        Monday - Sunday
        <br />
        8:00 AM - 10:00 PM
      </>
    ),
  },
];

const ContactInfo = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -35,
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
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="
        !group
        !relative
        !overflow-hidden
        !rounded-[1.75rem]
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !p-6
        !text-[var(--color-text-primary)]
        !shadow-[var(--shadow-card)]
        !transition-all
        !duration-500
        hover:!border-[var(--color-primary)]/40
        sm:!p-8
        lg:!p-10
      "
    >
      {/* ================= PREMIUM BACKGROUND ================= */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-32
          !-top-32
          !h-80
          !w-80
          !rounded-full
          !bg-[var(--color-primary)]/10
          !blur-3xl
          !transition-transform
          !duration-700
          group-hover:!scale-125
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-bottom-40
          !-left-32
          !h-72
          !w-72
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-3xl
        "
      />

      {/* Subtle gradient overlay */}

      <div
        className="
          !pointer-events-none
          !absolute
          !inset-0
          !bg-gradient-to-br
          !from-[var(--color-primary)]/[0.035]
          !via-transparent
          !to-transparent
        "
      />

      <div className="!relative !z-10">
        {/* ================= HEADER ================= */}

        <div className="!mb-9">
          {/* Eyebrow */}

          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              !mb-4
              !flex
              !items-center
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
              Contact HostelHub
            </p>
          </motion.div>

          {/* Heading */}

          <h2
            className="
              !text-3xl
              !font-bold
              !leading-tight
              !tracking-tight
              !text-[var(--color-text-primary)]
              sm:!text-4xl
            "
          >
            We're here
            <span className="!text-[var(--color-primary)]"> for you.</span>
          </h2>

          <p
            className="
              !mt-4
              !max-w-md
              !text-sm
              !leading-7
              !text-[var(--color-text-secondary)]
            "
          >
            Whether you're looking for a room or need help with your booking,
            our team is ready to assist.
          </p>
        </div>

        {/* ================= CONTACT ITEMS ================= */}

        <div className="!space-y-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  x: 5,
                  transition: {
                    duration: 0.25,
                  },
                }}
                className="
                  !group/item
                  !relative
                  !overflow-hidden
                  !flex
                  !items-start
                  !gap-4
                  !rounded-2xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !p-4
                  !transition-all
                  !duration-300
                  hover:!border-[var(--color-primary)]/40
                  hover:!bg-[var(--color-primary)]/[0.06]
                  hover:!shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                "
              >
                {/* Hover accent */}

                <div
                  className="
                    !absolute
                    !bottom-0
                    !left-0
                    !top-0
                    !w-[2px]
                    !origin-bottom
                    !scale-y-0
                    !bg-[var(--color-primary)]
                    !transition-transform
                    !duration-300
                    group-hover/item:!scale-y-100
                  "
                />

                {/* Icon */}

                <div
                  className="
                    !relative
                    !flex
                    !h-12
                    !w-12
                    !shrink-0
                    !items-center
                    !justify-center
                    !rounded-xl
                    !border
                    !border-[var(--color-primary)]/20
                    !bg-[var(--color-primary)]/10
                    !text-[var(--color-primary)]
                    !transition-all
                    !duration-300
                    group-hover/item:!scale-105
                    group-hover/item:!border-[var(--color-primary)]/40
                    group-hover/item:!shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                  "
                >
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                {/* Content */}

                <div className="!min-w-0 !flex-1">
                  <div className="!flex !items-center !justify-between !gap-3">
                    <h3
                      className="
                        !text-sm
                        !font-bold
                        !text-[var(--color-text-primary)]
                      "
                    >
                      {item.title}
                    </h3>

                    <ArrowUpRight
                      size={14}
                      className="
                        !shrink-0
                        !text-[var(--color-text-muted)]
                        !opacity-0
                        !transition-all
                        !duration-300
                        group-hover/item:!translate-x-0.5
                        group-hover/item:!-translate-y-0.5
                        group-hover/item:!text-[var(--color-primary)]
                        group-hover/item:!opacity-100
                      "
                    />
                  </div>

                  <p
                    className="
                      !mt-1
                      !text-sm
                      !leading-6
                      !text-[var(--color-text-secondary)]
                    "
                  >
                    {item.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM DETAIL ================= */}

        <div
          className="
            !mt-8
            !flex
            !items-center
            !justify-between
            !border-t
            !border-[var(--color-border)]
            !pt-6
          "
        >
          <div>
            <span
              className="
                !block
                !text-[10px]
                !font-semibold
                !uppercase
                !tracking-[0.25em]
                !text-[var(--color-text-muted)]
              "
            >
              HostelHub
            </span>

            <span
              className="
                !mt-1
                !block
                !text-xs
                !text-[var(--color-text-secondary)]
              "
            >
              Always happy to help
            </span>
          </div>

          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.08,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              !flex
              !h-11
              !w-11
              !items-center
              !justify-center
              !rounded-full
              !border
              !border-[var(--color-primary)]/30
              !bg-[var(--color-primary)]/5
              !text-[var(--color-primary)]
              !transition-all
              !duration-300
              hover:!border-[var(--color-primary)]
              hover:!bg-[var(--color-primary)]/10
            "
          >
            <ArrowUpRight size={17} />
          </motion.div>
        </div>
      </div>

      {/* ================= BOTTOM ACCENT ================= */}

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
          delay: 0.45,
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
  );
};

export default ContactInfo;
