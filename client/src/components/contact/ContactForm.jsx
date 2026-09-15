import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const ContactForm = () => {
  const inputClasses = `
    !w-full
    !rounded-xl
    !border
    !border-[var(--color-border)]
    !bg-[var(--color-surface-secondary)]
    !py-3.5
    !pl-11
    !pr-4
    !text-sm
    !text-[var(--color-text-primary)]
    !outline-none
    !transition-all
    !duration-300
    placeholder:!text-[var(--color-text-muted)]
    focus:!border-[var(--color-primary)]
    focus:!bg-[var(--color-surface)]
    focus:!shadow-[0_0_0_4px_rgba(212,175,55,0.08)]
  `;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 35,
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
      className="
        !group
        !relative
        !overflow-hidden
        !rounded-[2rem]
        !border
        !border-[var(--color-border)]
        !bg-[var(--color-surface)]
        !p-6
        !shadow-[var(--shadow-card)]
        !transition-all
        !duration-500
        hover:!shadow-[0_25px_70px_rgba(0,0,0,0.10)]
        sm:!p-8
        lg:!p-10
      "
    >
      {/* ================= DECORATIVE GLOW ================= */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-28
          !-top-28
          !h-72
          !w-72
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
          !-bottom-32
          !-left-28
          !h-64
          !w-64
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-3xl
        "
      />

      {/* ================= TOP ACCENT ================= */}

      <div
        className="
          !absolute
          !left-0
          !top-0
          !h-1
          !w-full
          !bg-gradient-to-r
          !from-transparent
          !via-[var(--color-primary)]
          !to-transparent
        "
      />

      <div className="!relative !z-10">
        {/* ================= HEADER ================= */}

        <div className="!mb-9">
          <div className="!mb-5 !flex !items-center !gap-3">
            <div
              className="
                !flex
                !h-10
                !w-10
                !items-center
                !justify-center
                !rounded-xl
                !border
                !border-[var(--color-primary)]/20
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
              "
            >
              <Sparkles size={18} strokeWidth={1.8} />
            </div>

            <div>
              <p
                className="
                  !text-[10px]
                  !font-bold
                  !uppercase
                  !tracking-[0.25em]
                  !text-[var(--color-primary)]
                "
              >
                Get in touch
              </p>

              <span
                className="
                  !text-xs
                  !text-[var(--color-text-muted)]
                "
              >
                We'd love to hear from you
              </span>
            </div>
          </div>

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
            Let's start a
            <span className="!block !text-[var(--color-primary)]">
              conversation.
            </span>
          </h2>

          <p
            className="
              !mt-4
              !max-w-lg
              !text-sm
              !leading-7
              !text-[var(--color-text-secondary)]
            "
          >
            Have a question about rooms, bookings or facilities? Send us a
            message and our team will be happy to help.
          </p>
        </div>

        {/* ================= FORM ================= */}

        <form className="!space-y-5">
          {/* Name */}
          <div className="!relative">
            <User
              size={18}
              className="
                !pointer-events-none
                !absolute
                !left-4
                !top-1/2
                !-translate-y-1/2
                !text-[var(--color-text-muted)]
                !transition-colors
                !duration-300
              "
            />

            <input
              type="text"
              placeholder="Your Name"
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div className="!relative">
            <Mail
              size={18}
              className="
                !pointer-events-none
                !absolute
                !left-4
                !top-1/2
                !-translate-y-1/2
                !text-[var(--color-text-muted)]
              "
            />

            <input
              type="email"
              placeholder="Your Email"
              className={inputClasses}
            />
          </div>

          {/* Phone + Subject */}

          <div className="!grid !grid-cols-1 !gap-5 sm:!grid-cols-2">
            <div className="!relative">
              <Phone
                size={18}
                className="
                  !pointer-events-none
                  !absolute
                  !left-4
                  !top-1/2
                  !-translate-y-1/2
                  !text-[var(--color-text-muted)]
                "
              />

              <input
                type="text"
                placeholder="Phone Number"
                className={inputClasses}
              />
            </div>

            <div className="!relative">
              <FileText
                size={18}
                className="
                  !pointer-events-none
                  !absolute
                  !left-4
                  !top-1/2
                  !-translate-y-1/2
                  !text-[var(--color-text-muted)]
                "
              />

              <input
                type="text"
                placeholder="Subject"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Message */}

          <div className="!relative">
            <MessageSquare
              size={18}
              className="
                !pointer-events-none
                !absolute
                !left-4
                !top-4
                !text-[var(--color-text-muted)]
              "
            />

            <textarea
              rows={6}
              placeholder="Write your message..."
              className="
                !w-full
                !resize-none
                !rounded-xl
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface-secondary)]
                !py-3.5
                !pl-11
                !pr-4
                !text-sm
                !leading-6
                !text-[var(--color-text-primary)]
                !outline-none
                !transition-all
                !duration-300
                placeholder:!text-[var(--color-text-muted)]
                focus:!border-[var(--color-primary)]
                focus:!bg-[var(--color-surface)]
                focus:!shadow-[0_0_0_4px_rgba(212,175,55,0.08)]
              "
            />
          </div>

          {/* ================= BUTTON ================= */}

          {/* ================= BUTTON ================= */}

          {/* ================= BUTTON ================= */}

          <motion.button
            type="submit"
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
    !group/button
    !relative
    !flex
    !w-full
    !items-center
    !justify-center
    !gap-3
    !overflow-hidden
    !rounded-xl

    /* Light Mode */
    !bg-[#0D0D0D]
    !text-white
    !shadow-[0_10px_30px_rgba(0,0,0,0.12)]

    /* Dark Mode */
    dark:!bg-[var(--color-primary)]
    dark:!text-[#080808]
    dark:!shadow-[0_10px_30px_rgba(212,175,55,0.18)]

    !py-4
    !text-sm
    !font-semibold
    !transition-all
    !duration-300

    /* Light Hover */
    hover:!bg-[#171717]
    hover:!shadow-[0_16px_40px_rgba(0,0,0,0.20)]

    /* Dark Hover */
    dark:hover:!bg-[var(--color-primary-hover)]
    dark:hover:!shadow-[0_16px_40px_rgba(212,175,55,0.28)]
  "
          >
            {/* Button shine */}

            <span
              className="
      !absolute
      !inset-y-0
      !-left-full
      !w-1/2
      !skew-x-[-20deg]
      !bg-gradient-to-r
      !from-transparent
      !via-white/10
      !to-transparent
      !transition-all
      !duration-700
      group-hover/button:!left-[130%]
    "
            />

            <span className="!relative !z-10">Send Message</span>

            <span
              className="
      !relative
      !z-10
      !flex
      !h-7
      !w-7
      !items-center
      !justify-center
      !rounded-full
      !border

      /* Light */
      !border-white/15
      !bg-white/5

      /* Dark */
      dark:!border-black/15
      dark:!bg-black/10

      !transition-all
      !duration-300

      group-hover/button:!translate-x-1

      /* Light hover */
      group-hover/button:!border-[var(--color-primary)]/40
      group-hover/button:!bg-[var(--color-primary)]/10

      /* Dark hover */
      dark:group-hover/button:!border-black/20
      dark:group-hover/button:!bg-black/10
    "
            >
              <ArrowUpRight size={15} />
            </span>
          </motion.button>
        </form>

        {/* ================= BOTTOM DETAIL ================= */}

        <div
          className="
            !mt-7
            !flex
            !items-center
            !justify-between
            !border-t
            !border-[var(--color-border)]
            !pt-5
          "
        >
          <span
            className="
              !text-[10px]
              !font-semibold
              !uppercase
              !tracking-[0.2em]
              !text-[var(--color-text-muted)]
            "
          >
            HostelHub Support
          </span>

          <span
            className="
              !h-1.5
              !w-1.5
              !rounded-full
              !bg-[var(--color-primary)]
              !shadow-[0_0_10px_rgba(212,175,55,0.5)]
            "
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
