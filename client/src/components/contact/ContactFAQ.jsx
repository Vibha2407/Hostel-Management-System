import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Can I visit before booking?",
    a: "Yes, you can visit the hostel during working hours.",
  },
  {
    q: "Is parking available?",
    a: "Yes, bike and scooty parking are available.",
  },
  {
    q: "Do you provide meals?",
    a: "Yes, healthy vegetarian and non-vegetarian meals are available.",
  },
];

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      {/* Decorative background glow */}
      <div
        className="
          !pointer-events-none
          !absolute
          !-left-32
          !top-20
          !h-72
          !w-72
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-3xl
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-32
          !bottom-10
          !h-72
          !w-72
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-3xl
        "
      />

      <div className="!relative !z-10 !mx-auto !max-w-5xl">
        {/* ================= HEADING ================= */}

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
          }}
          transition={{
            duration: 0.7,
          }}
          className="!mb-12 !text-center"
        >
          {/* Label */}

          <div className="!mb-5 !flex !items-center !justify-center !gap-3">
            <span className="!h-px !w-10 !bg-[var(--color-primary)]" />

            <span
              className="
                !text-xs
                !font-semibold
                !uppercase
                !tracking-[0.28em]
                !text-[var(--color-primary)]
              "
            >
              Need to know?
            </span>

            <span className="!h-px !w-10 !bg-[var(--color-primary)]" />
          </div>

          {/* Icon */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="
              !mx-auto
              !mb-5
              !flex
              !h-12
              !w-12
              !items-center
              !justify-center
              !rounded-2xl
              !border
              !border-[var(--color-primary)]/25
              !bg-[var(--color-surface)]
              !text-[var(--color-primary)]
              !shadow-[var(--shadow-card)]
            "
          >
            <MessageCircle size={21} strokeWidth={1.7} />
          </motion.div>

          {/* Heading */}

          <h2
            className="
              !text-3xl
              !font-bold
              !tracking-tight
              !text-[var(--color-text-primary)]
              sm:!text-4xl
              lg:!text-5xl
            "
          >
            Frequently Asked
            <span className="!text-[var(--color-primary)]"> Questions.</span>
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
            A few quick answers to help you plan your stay with HostelHub.
          </p>
        </motion.div>

        {/* ================= FAQ ================= */}

        <div className="!space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.q}
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
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  !group
                  !relative
                  !overflow-hidden
                  !rounded-[1.35rem]
                  !border
                  !bg-[var(--color-surface)]
                  !transition-all
                  !duration-300

                  ${
                    isOpen
                      ? "!border-[var(--color-primary)]/50 !shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                      : "!border-[var(--color-border)] !shadow-[var(--shadow-card)]"
                  }
                `}
              >
                {/* Gold active line */}

                <motion.div
                  initial={false}
                  animate={{
                    scaleY: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    !absolute
                    !left-0
                    !top-0
                    !h-full
                    !w-1
                    !origin-top
                    !bg-[var(--color-primary)]
                  "
                />

                {/* ================= QUESTION ================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="
                    !flex
                    !w-full
                    !items-center
                    !gap-4
                    !px-5
                    !py-5
                    !text-left
                    sm:!px-6
                    sm:!py-6
                  "
                >
                  {/* Number */}

                  <span
                    className={`
                      !flex
                      !h-10
                      !w-10
                      !shrink-0
                      !items-center
                      !justify-center
                      !rounded-xl
                      !text-xs
                      !font-bold
                      !transition-all
                      !duration-300

                      ${
                        isOpen
                          ? "!bg-[var(--color-primary)] !text-[var(--color-background)]"
                          : "!bg-[var(--color-surface-secondary)] !text-[var(--color-text-secondary)]"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}

                  <span
                    className="
                      !min-w-0
                      !flex-1
                      !text-sm
                      !font-semibold
                      !text-[var(--color-text-primary)]
                      sm:!text-base
                    "
                  >
                    {item.q}
                  </span>

                  {/* Plus */}

                  <span
                    className={`
                      !flex
                      !h-9
                      !w-9
                      !shrink-0
                      !items-center
                      !justify-center
                      !rounded-full
                      !border
                      !transition-all
                      !duration-300

                      ${
                        isOpen
                          ? "!border-[var(--color-primary)] !bg-[var(--color-primary)] !text-[var(--color-background)]"
                          : "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !text-[var(--color-text-secondary)]"
                      }
                    `}
                  >
                    <Plus
                      size={17}
                      className={`
                        !transition-transform
                        !duration-300
                        ${isOpen ? "!rotate-45" : ""}
                      `}
                    />
                  </span>
                </button>

                {/* ================= ANSWER ================= */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div
                        className="
                          !border-t
                          !border-[var(--color-border)]
                          !px-5
                          !pb-6
                          !pt-4
                          sm:!px-6
                        "
                      >
                        <p
                          className="
                            !pl-14
                            !text-sm
                            !leading-7
                            !text-[var(--color-text-secondary)]
                            sm:!pl-14
                          "
                        >
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ================= BOTTOM NOTE ================= */}

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
            duration: 0.6,
            delay: 0.25,
          }}
          className="
            !mt-8
            !flex
            !items-center
            !justify-center
            !gap-2
            !text-center
          "
        >
          <span className="!h-1.5 !w-1.5 !rounded-full !bg-[var(--color-primary)]" />

          <span
            className="
              !text-xs
              !font-medium
              !text-[var(--color-text-muted)]
            "
          >
            Still have questions? We're happy to help.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;
