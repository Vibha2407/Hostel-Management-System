import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

const RuleCategory = ({ title, rules, index = 0 }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.article
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
          amount: 0.15,
        }}
        transition={{
          duration: 0.65,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -5,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className="
          !group
          !relative
          !overflow-hidden
          !rounded-[1.5rem]
          !border
          !border-[var(--color-border)]
          !bg-[var(--color-surface)]
          !p-6
          !shadow-[var(--shadow-card)]
          !transition-shadow
          !duration-500
          hover:!shadow-[0_20px_45px_rgba(0,0,0,0.12)]
          sm:!p-8
        "
      >
        {/* Decorative Line */}

        <div
          className="
            !absolute
            !left-0
            !top-0
            !h-full
            !w-1
            !origin-top
            !scale-y-0
            !bg-[var(--color-primary)]
            !transition-transform
            !duration-500
            group-hover:!scale-y-100
          "
        />

        {/* ================= HEADER ================= */}

        <div className="!flex !items-start !justify-between !gap-4">
          <div>
            <p
              className="
                !mb-2
                !text-xs
                !font-semibold
                !uppercase
                !tracking-[0.2em]
                !text-[var(--color-primary)]
              "
            >
              Hostel guideline
            </p>

            <h2
              className="
                !text-xl
                !font-bold
                !tracking-tight
                !text-[var(--color-text-primary)]
                sm:!text-2xl
              "
            >
              {title}
            </h2>
          </div>

          {/* Arrow */}

          <button
            type="button"
            onClick={() => setShowModal(true)}
            aria-label={`View ${title} rules`}
            className="
              !flex
              !h-10
              !w-10
              !shrink-0
              !items-center
              !justify-center
              !rounded-xl
              !bg-[var(--color-surface-secondary)]
              !text-[var(--color-primary)]
              !transition-all
              !duration-300
              group-hover:!bg-[var(--color-primary)]
              group-hover:!text-[var(--color-background)]
            "
          >
            <ArrowUpRight
              size={18}
              className="
                !transition-transform
                !duration-300
                group-hover:!translate-x-0.5
                group-hover:!-translate-y-0.5
              "
            />
          </button>
        </div>

        {/* Divider */}

        <div
          className="
            !my-6
            !h-px
            !bg-[var(--color-border)]
          "
        />

        {/* ================= RULES PREVIEW ================= */}

        <ul className="!space-y-4">
          {rules.map((rule, ruleIndex) => (
            <motion.li
              key={ruleIndex}
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
                duration: 0.4,
                delay: index * 0.08 + ruleIndex * 0.05,
              }}
              className="!flex !items-start !gap-3"
            >
              <CheckCircle2
                size={18}
                strokeWidth={1.8}
                className="
                  !mt-0.5
                  !shrink-0
                  !text-[var(--color-primary)]
                "
              />

              <span
                className="
                  !text-sm
                  !leading-6
                  !text-[var(--color-text-secondary)]
                "
              >
                {rule}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom Accent */}

        <div className="!mt-7 !flex !items-center !gap-2">
          <span
            className="
              !h-1.5
              !w-1.5
              !rounded-full
              !bg-[var(--color-primary)]
            "
          />

          <span
            className="
              !text-xs
              !text-[var(--color-text-muted)]
            "
          >
            Please follow responsibly
          </span>
        </div>
      </motion.article>

      {/* ================================================= */}
      {/* ===================== MODAL ==================== */}
      {/* ================================================= */}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setShowModal(false)}
            className="
              !fixed
              !inset-0
              !z-[999]
              !flex
              !items-center
              !justify-center
              !bg-black/60
              !px-5
              !py-8
              !backdrop-blur-sm
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                !relative
                !w-full
                !max-w-2xl
                !max-h-[85vh]
                !overflow-y-auto
                !rounded-[1.5rem]
                !border
                !border-[var(--color-border)]
                !bg-[var(--color-surface)]
                !p-6
                !shadow-2xl
                sm:!p-8
              "
            >
              {/* Close */}

              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close rules"
                className="
                  !absolute
                  !right-5
                  !top-5
                  !flex
                  !h-9
                  !w-9
                  !items-center
                  !justify-center
                  !rounded-full
                  !bg-[var(--color-surface-secondary)]
                  !text-[var(--color-text-secondary)]
                  !transition-all
                  !duration-300
                  hover:!bg-[var(--color-primary)]
                  hover:!text-[var(--color-background)]
                "
              >
                <X size={18} />
              </button>

              {/* Modal Header */}

              <div className="!pr-12">
                <p
                  className="
                    !mb-2
                    !text-xs
                    !font-semibold
                    !uppercase
                    !tracking-[0.2em]
                    !text-[var(--color-primary)]
                  "
                >
                  Hostel guideline
                </p>

                <h2
                  className="
                    !text-2xl
                    !font-bold
                    !tracking-tight
                    !text-[var(--color-text-primary)]
                    sm:!text-3xl
                  "
                >
                  {title}
                </h2>
              </div>

              {/* Divider */}

              <div
                className="
                  !my-6
                  !h-px
                  !bg-[var(--color-border)]
                "
              />

              {/* Modal Rules */}

              <ul className="!space-y-5">
                {rules.map((rule, ruleIndex) => (
                  <motion.li
                    key={ruleIndex}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: ruleIndex * 0.06,
                    }}
                    className="!flex !items-start !gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      strokeWidth={1.8}
                      className="
                        !mt-0.5
                        !shrink-0
                        !text-[var(--color-primary)]
                      "
                    />

                    <span
                      className="
                        !text-sm
                        !leading-7
                        !text-[var(--color-text-secondary)]
                        sm:!text-[15px]
                      "
                    >
                      {rule}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom */}

              <div
                className="
                  !mt-7
                  !border-t
                  !border-[var(--color-border)]
                  !pt-5
                "
              >
                <p
                  className="
                    !text-xs
                    !text-[var(--color-text-muted)]
                  "
                >
                  Please follow responsibly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RuleCategory;
