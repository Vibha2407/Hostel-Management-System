import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const NoticeCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="
        !bg-[var(--color-background)]
        !px-5
        !py-14
        sm:!px-8
        lg:!py-20
      "
    >
      <div className="!mx-auto !max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
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
              ease: "easeOut",
            },
          }}
          className="
            !group
            !relative
            !overflow-hidden
            !rounded-[1.5rem]
            !border
            !border-[var(--color-primary)]/40
            !bg-[var(--color-surface)]
            !px-6
            !py-7
            !shadow-[var(--shadow-card)]
            !transition-all
            !duration-500
            sm:!rounded-[1.75rem]
            sm:!px-8
            sm:!py-9
            lg:!px-10
            lg:!py-10
          "
        >
          {/* ================= BACKGROUND GLOW ================= */}

          <div
            className="
              !pointer-events-none
              !absolute
              !-right-24
              !-top-24
              !h-64
              !w-64
              !rounded-full
              !bg-[var(--color-primary)]/10
              !blur-3xl
            "
          />

          <div
            className="
              !pointer-events-none
              !absolute
              !-bottom-32
              !-left-20
              !h-56
              !w-56
              !rounded-full
              !bg-[var(--color-primary)]/5
              !blur-3xl
            "
          />

          {/* ================= CONTENT ================= */}

          <div
            className="
              !relative
              !z-10
              !flex
              !flex-col
              !gap-7
              sm:!flex-row
              sm:!items-center
            "
          >
            {/* ================= ICON ================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                !flex
                !h-14
                !w-14
                !shrink-0
                !items-center
                !justify-center
                !rounded-xl
                !border
                !border-[var(--color-primary)]/30
                !bg-[var(--color-primary)]/10
                !text-[var(--color-primary)]
                sm:!h-16
                sm:!w-16
              "
            >
              <AlertTriangle size={27} strokeWidth={1.7} />
            </motion.div>

            {/* ================= TEXT ================= */}

            <div className="!min-w-0 !flex-1">
              {/* Label */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.5,
                }}
                className="
                  !mb-2
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.25em]
                  !text-[var(--color-primary)]
                  sm:!text-xs
                "
              >
                Important Notice
              </motion.div>

              {/* Heading */}

              <motion.h2
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.32,
                  duration: 0.55,
                }}
                className="
                  !text-2xl
                  !font-bold
                  !leading-tight
                  !tracking-tight
                  !text-[var(--color-text-primary)]
                  sm:!text-3xl
                  lg:!text-[2rem]
                "
              >
                Your stay,{" "}
                <span className="!text-[var(--color-primary)]">
                  your responsibility.
                </span>
              </motion.h2>

              {/* Description */}

              <motion.p
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
                  delay: 0.4,
                  duration: 0.6,
                }}
                className="
                  !mt-3
                  !max-w-4xl
                  !text-sm
                  !leading-7
                  !text-[var(--color-text-secondary)]
                  sm:!text-[15px]
                  sm:!leading-7
                "
              >
                Hostel management reserves the right to cancel hostel
                accommodation if any resident violates hostel rules, damages
                hostel property or creates inconvenience for other residents.
              </motion.p>

              {/* ================= EXPANDABLE CONTENT ================= */}

              <AnimatePresence initial={false}>
                {isExpanded && (
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
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      className="
                        !mt-6
                        !border-t
                        !border-[var(--color-border)]
                        !pt-5
                      "
                    >
                      <p
                        className="
                          !text-sm
                          !font-medium
                          !leading-7
                          !text-[var(--color-text-secondary)]
                        "
                      >
                        Residents are expected to take responsibility for their
                        conduct throughout their stay. Any violation of hostel
                        rules may result in warnings, additional charges,
                        suspension of accommodation or cancellation of the stay,
                        depending on the seriousness of the violation.
                      </p>

                      <p
                        className="
                          !mt-3
                          !text-sm
                          !font-medium
                          !leading-7
                          !text-[var(--color-text-secondary)]
                        "
                      >
                        Residents are also responsible for keeping their rooms
                        and shared spaces clean, respecting other residents and
                        reporting any damage or safety concern to management
                        promptly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= ARROW ================= */}

            <motion.button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse notice" : "Expand notice"}
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
                delay: 0.5,
                duration: 0.5,
              }}
              className="
                !flex
                !h-11
                !w-11
                !shrink-0
                !items-center
                !justify-center
                !rounded-full
                !border
                !border-[var(--color-primary)]/30
                !text-[var(--color-primary)]
                !transition-all
                !duration-300
                hover:!border-[var(--color-primary)]
                hover:!bg-[var(--color-primary)]/10
              "
            >
              <motion.span
                animate={{
                  rotate: isExpanded ? 90 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <ArrowUpRight size={19} />
              </motion.span>
            </motion.button>
          </div>

          {/* ================= BOTTOM GOLD LINE ================= */}

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
              delay: 0.55,
              duration: 0.9,
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

export default NoticeCard;
