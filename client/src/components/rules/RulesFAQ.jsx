import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faq = [
  {
    q: "Can visitors stay overnight?",
    a: "No. Overnight visitors are not allowed. Visitors may meet residents during the permitted visiting hours.",
  },
  {
    q: "Can I change my room?",
    a: "Yes. Room changes can be requested, but they are subject to room availability and management approval.",
  },
  {
    q: "What if rent is delayed?",
    a: "Late payment charges may apply. Residents are expected to complete their payments within the specified due date.",
  },
];

const RulesFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="
        !bg-[var(--color-background)]
        !px-5
        !py-20
        sm:!px-8
        sm:!py-24
        lg:!py-28
      "
    >
      <div className="!mx-auto !max-w-4xl">
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
          className="!mb-12 !text-center"
        >
          {/* Label */}

          <div className="!mb-4 !flex !items-center !justify-center !gap-3">
            <span className="!h-px !w-8 !bg-[var(--color-primary)]" />

            <span
              className="
                !text-xs
                !font-bold
                !uppercase
                !tracking-[0.25em]
                !text-[var(--color-primary)]
              "
            >
              Common Questions
            </span>

            <span className="!h-px !w-8 !bg-[var(--color-primary)]" />
          </div>

          {/* Icon */}

          <div
            className="
              !mx-auto
              !mb-5
              !flex
              !h-12
              !w-12
              !items-center
              !justify-center
              !rounded-xl
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface)]
              !text-[var(--color-primary)]
              !shadow-[var(--shadow-card)]
            "
          >
            <HelpCircle size={23} />
          </div>

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
            Frequently Asked{" "}
            <span className="!text-[var(--color-primary)]">Questions</span>
          </h2>

          {/* Description */}

          <p
            className="
              !mx-auto
              !mt-4
              !max-w-xl
              !text-sm
              !font-medium
              !leading-7
              !text-[var(--color-text-secondary)]
              sm:!text-base
            "
          >
            Everything you need to know about staying at HostelHub.
          </p>
        </motion.div>

        {/* ================= FAQ LIST ================= */}

        <div className="!space-y-3">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  !overflow-hidden
                  !rounded-2xl
                  !border
                  !bg-[var(--color-surface)]
                  !transition-all
                  !duration-300

                  ${
                    isOpen
                      ? "!border-[var(--color-primary)]/60 !shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:!shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
                      : "!border-[var(--color-border)] !shadow-[var(--shadow-card)]"
                  }
                `}
              >
                {/* ================= QUESTION ================= */}

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="
                    !flex
                    !w-full
                    !items-center
                    !justify-between
                    !gap-4
                    !px-5
                    !py-5
                    !text-left
                    sm:!px-6
                    sm:!py-6
                  "
                >
                  <div className="!flex !items-center !gap-4">
                    {/* Number */}

                    <span
                      className={`
                        !flex
                        !h-9
                        !w-9
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
                        !text-sm
                        !font-bold
                        !text-[var(--color-text-primary)]
                        sm:!text-base
                      "
                    >
                      {item.q}
                    </span>
                  </div>

                  {/* Arrow */}

                  <span
                    className={`
                      !flex
                      !h-9
                      !w-9
                      !shrink-0
                      !items-center
                      !justify-center
                      !rounded-full
                      !transition-all
                      !duration-300

                      ${
                        isOpen
                          ? "!bg-[var(--color-primary)] !text-[var(--color-background)]"
                          : "!bg-[var(--color-surface-secondary)] !text-[var(--color-text-secondary)]"
                      }
                    `}
                  >
                    <ChevronDown
                      size={18}
                      className={`
                        !transition-transform
                        !duration-300
                        ${isOpen ? "!rotate-180" : ""}
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
                            !pl-[3.25rem]
                            !text-sm
                            !font-medium
                            !leading-7
                            !text-[var(--color-text-secondary)]
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
      </div>
    </section>
  );
};

export default RulesFAQ;
