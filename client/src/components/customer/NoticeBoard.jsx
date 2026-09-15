import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Utensils,
  Wrench,
  Bell,
  ArrowUpRight,
  X,
  Sparkles,
  Clock3,
} from "lucide-react";

const NoticeBoard = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const notices = [
    {
      title: "Wi-Fi Maintenance",
      description:
        "Internet will be unavailable on Sunday from 10 AM to 12 PM.",
      icon: Wifi,
      category: "Facility Update",
      time: "Sunday • 10 AM - 12 PM",
    },
    {
      title: "Mess Timing Updated",
      description: "Dinner timing has been changed to 7:00 PM - 9:00 PM.",
      icon: Utensils,
      category: "Mess Update",
      time: "Daily • 7 PM - 9 PM",
    },
    {
      title: "Maintenance Work",
      description:
        "Room cleaning and plumbing inspection will be conducted on Saturday.",
      icon: Wrench,
      category: "Maintenance",
      time: "Saturday",
    },
    {
      title: "Hostel Notice",
      description: "Monthly hostel meeting will be held on Friday at 6 PM.",
      icon: Bell,
      category: "Important Notice",
      time: "Friday • 6 PM",
    },
  ];

  return (
    <>
      {/* =====================================================
          NOTICE BOARD
      ====================================================== */}

      <motion.section
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
          amount: 0.1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          !group
          !relative
          !overflow-hidden
          !rounded-[1.5rem]
          !border
          !border-[var(--color-border)]
          !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
          !p-6
          !shadow-[var(--shadow-card)]
          !transition-all
          !duration-500
          sm:!p-7
          hover:!border-[var(--color-primary)]/20
        "
      >
        {/* =====================================================
            AMBIENT GLOW
        ====================================================== */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            !pointer-events-none
            !absolute
            !-right-24
            !-top-24
            !h-64
            !w-64
            !rounded-full
            !bg-[var(--color-primary)]/[0.07]
            !blur-[90px]
          "
        />

        <div
          className="
            !pointer-events-none
            !absolute
            !bottom-[-100px]
            !left-[-70px]
            !h-52
            !w-52
            !rounded-full
            !bg-[var(--color-primary)]/[0.04]
            !blur-[80px]
          "
        />

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="!relative !mb-7 !flex !items-end !justify-between">
          <div>
            <div className="!mb-2 !flex !items-center !gap-2">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles size={14} className="!text-[var(--color-primary)]" />
              </motion.div>

              <p
                className="
                  !text-[10px]
                  !font-semibold
                  !uppercase
                  !tracking-[0.22em]
                  !text-[var(--color-primary)]
                "
              >
                Updates
              </p>
            </div>

            <h2
              className="
                !text-xl
                !font-semibold
                !tracking-tight
                !text-[var(--color-text-primary)]
                sm:!text-2xl
              "
            >
              Notice Board
            </h2>
          </div>

          {/* UPDATE COUNT */}

          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            className="
              !hidden
              !items-center
              !gap-2
              !rounded-full
              !border
              !border-[var(--color-border)]
              !bg-[var(--color-surface)]
              !px-3
              !py-1.5
              !shadow-sm
              sm:!flex
            "
          >
            <span className="!relative !flex !h-1.5 !w-1.5">
              <span
                className="
                  !absolute
                  !inline-flex
                  !h-full
                  !w-full
                  !animate-ping
                  !rounded-full
                  !bg-[var(--color-primary)]/50
                "
              />

              <span
                className="
                  !relative
                  !h-1.5
                  !w-1.5
                  !rounded-full
                  !bg-[var(--color-primary)]
                "
              />
            </span>

            <span
              className="
                !text-[9px]
                !font-medium
                !uppercase
                !tracking-[0.14em]
                !text-[var(--color-text-muted)]
              "
            >
              {notices.length} Updates
            </span>
          </motion.div>
        </div>

        {/* =====================================================
            NOTICES
        ====================================================== */}

        <div className="!relative !space-y-3">
          {notices.map((notice, index) => {
            const Icon = notice.icon;

            return (
              <motion.button
                key={notice.title}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.09,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -3,
                  x: 2,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                onClick={() => setSelectedNotice(notice)}
                className="
                  !group/notice
                  !relative
                  !w-full
                  !overflow-hidden
                  !rounded-2xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[linear-gradient(135deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
                  !p-4
                  !text-left
                  !shadow-[0_5px_20px_rgba(0,0,0,0.03)]
                  !transition-all
                  !duration-500
                  hover:!border-[var(--color-primary)]/30
                  hover:!shadow-[0_15px_35px_rgba(212,175,55,0.08)]
                "
              >
                {/* HOVER LIGHT */}

                <div
                  className="
                    !pointer-events-none
                    !absolute
                    !-right-12
                    !-top-12
                    !h-28
                    !w-28
                    !rounded-full
                    !bg-[var(--color-primary)]/[0.07]
                    !blur-2xl
                    !opacity-0
                    !transition-all
                    !duration-500
                    group-hover/notice:!opacity-100
                    group-hover/notice:!scale-125
                  "
                />

                {/* CONTENT */}

                <div className="!relative !flex !items-center !gap-3">
                  {/* ICON */}

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: -4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="
                      !relative
                      !flex
                      !h-11
                      !w-11
                      !shrink-0
                      !items-center
                      !justify-center
                      !overflow-hidden
                      !rounded-xl
                      !border
                      !border-[var(--color-primary)]/20
                      !bg-[linear-gradient(135deg,var(--color-primary)/[0.13],var(--color-primary)/[0.035])]
                      !shadow-[0_8px_25px_rgba(212,175,55,0.07)]
                    "
                  >
                    <div
                      className="
                        !absolute
                        !inset-0
                        !bg-[linear-gradient(135deg,transparent,var(--color-primary)/[0.08],transparent)]
                        !opacity-0
                        !transition-opacity
                        !duration-500
                        group-hover/notice:!opacity-100
                      "
                    />

                    <Icon
                      size={17}
                      className="
                        !relative
                        !z-10
                        !text-[var(--color-primary)]
                        !transition-transform
                        !duration-300
                        group-hover/notice:!scale-110
                      "
                    />
                  </motion.div>

                  {/* TEXT */}

                  <div className="!min-w-0 !flex-1">
                    <div className="!flex !items-center !justify-between !gap-3">
                      <div className="!min-w-0">
                        <h3
                          className="
                            !truncate
                            !text-xs
                            !font-semibold
                            !tracking-tight
                            !text-[var(--color-text-primary)]
                            !transition-colors
                            !duration-300
                            group-hover/notice:!text-[var(--color-primary)]
                          "
                        >
                          {notice.title}
                        </h3>

                        <span
                          className="
                            !mt-1
                            !inline-block
                            !text-[8px]
                            !font-semibold
                            !uppercase
                            !tracking-[0.13em]
                            !text-[var(--color-primary)]
                            !opacity-80
                          "
                        >
                          {notice.category}
                        </span>
                      </div>

                      {/* ARROW */}

                      <motion.div
                        className="
                          !flex
                          !h-8
                          !w-8
                          !shrink-0
                          !items-center
                          !justify-center
                          !rounded-lg
                          !border
                          !border-transparent
                          !text-[var(--color-text-muted)]
                          !transition-all
                          !duration-300
                          group-hover/notice:!border-[var(--color-primary)]/15
                          group-hover/notice:!bg-[var(--color-primary)]/[0.05]
                          group-hover/notice:!text-[var(--color-primary)]
                        "
                      >
                        <ArrowUpRight
                          size={14}
                          className="
                            !transition-transform
                            !duration-300
                            group-hover/notice:!translate-x-0.5
                            group-hover/notice:!-translate-y-0.5
                          "
                        />
                      </motion.div>
                    </div>

                    <p
                      className="
                        !mt-2
                        !line-clamp-2
                        !text-[10px]
                        !leading-4
                        !text-[var(--color-text-secondary)]
                        !transition-all
                        !duration-300
                        group-hover/notice:!text-[var(--color-text-primary)]
                      "
                    >
                      {notice.description}
                    </p>
                  </div>
                </div>

                {/* PREMIUM ACCENT LINE */}

                <div
                  className="
                    !absolute
                    !bottom-0
                    !left-1/2
                    !h-[1px]
                    !w-0
                    !-translate-x-1/2
                    !bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]
                    !transition-all
                    !duration-700
                    group-hover/notice:!w-[85%]
                  "
                />
              </motion.button>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            !relative
            !mt-5
            !flex
            !items-center
            !justify-center
            !gap-2
            !border-t
            !border-[var(--color-border)]
            !pt-4
          "
        >
          <Bell size={12} className="!text-[var(--color-text-muted)]" />

          <span
            className="
              !text-[9px]
              !text-[var(--color-text-muted)]
            "
          >
            Select a notice to view complete details
          </span>
        </div>
      </motion.section>

      {/* =====================================================
          MODAL
      ====================================================== */}

      <AnimatePresence>
        {selectedNotice && (
          <>
            {/* BACKDROP */}

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
              onClick={() => setSelectedNotice(null)}
              className="
                !fixed
                !inset-0
                !z-[100]
                !bg-black/45
                !backdrop-blur-md
                dark:!bg-black/70
              "
            />

            {/* MODAL */}

            <div
              className="
                !fixed
                !inset-0
                !z-[110]
                !flex
                !items-center
                !justify-center
                !overflow-y-auto
                !p-4
                sm:!p-6
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  y: 25,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(event) => event.stopPropagation()}
                className="
                  !relative
                  !my-auto
                  !w-full
                  !max-w-lg
                  !overflow-hidden
                  !rounded-[1.75rem]
                  !border
                  !border-[var(--color-border)]
                  !bg-[linear-gradient(145deg,var(--color-surface)_0%,var(--color-surface-secondary)_100%)]
                  !shadow-[0_30px_100px_rgba(0,0,0,0.3)]
                "
              >
                {/* MODAL GLOW */}

                <div
                  className="
                    !pointer-events-none
                    !absolute
                    !-right-24
                    !-top-24
                    !h-64
                    !w-64
                    !rounded-full
                    !bg-[var(--color-primary)]/[0.12]
                    !blur-[90px]
                  "
                />

                {/* CLOSE */}

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    rotate: 5,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  onClick={() => setSelectedNotice(null)}
                  className="
                    !absolute
                    !right-5
                    !top-5
                    !z-20
                    !flex
                    !h-9
                    !w-9
                    !items-center
                    !justify-center
                    !rounded-xl
                    !border
                    !border-[var(--color-border)]
                    !bg-[var(--color-surface)]
                    !text-[var(--color-text-secondary)]
                    !shadow-sm
                    !transition-all
                    !duration-300
                    hover:!border-[var(--color-primary)]/30
                    hover:!text-[var(--color-primary)]
                  "
                  aria-label="Close notice"
                >
                  <X size={16} />
                </motion.button>

                {/* MODAL CONTENT */}

                <div className="!relative !p-6 sm:!p-8">
                  {(() => {
                    const Icon = selectedNotice.icon;

                    return (
                      <>
                        <div className="!flex !items-start !gap-4">
                          {/* ICON */}

                          <motion.div
                            initial={{
                              scale: 0.8,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            transition={{
                              delay: 0.1,
                            }}
                            className="
                              !flex
                              !h-14
                              !w-14
                              !shrink-0
                              !items-center
                              !justify-center
                              !rounded-2xl
                              !border
                              !border-[var(--color-primary)]/25
                              !bg-[linear-gradient(135deg,var(--color-primary)/[0.14],var(--color-primary)/[0.035])]
                              !shadow-[0_10px_30px_rgba(212,175,55,0.10)]
                            "
                          >
                            <Icon
                              size={23}
                              className="!text-[var(--color-primary)]"
                            />
                          </motion.div>

                          {/* TITLE */}

                          <div className="!min-w-0 !pr-10">
                            <span
                              className="
                                !text-[9px]
                                !font-semibold
                                !uppercase
                                !tracking-[0.2em]
                                !text-[var(--color-primary)]
                              "
                            >
                              {selectedNotice.category}
                            </span>

                            <h3
                              className="
                                !mt-2
                                !text-xl
                                !font-semibold
                                !tracking-tight
                                !text-[var(--color-text-primary)]
                                sm:!text-2xl
                              "
                            >
                              {selectedNotice.title}
                            </h3>
                          </div>
                        </div>

                        {/* DESCRIPTION */}

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.15,
                          }}
                          className="
                            !mt-7
                            !rounded-2xl
                            !border
                            !border-[var(--color-border)]
                            !bg-[var(--color-surface)]
                            !p-5
                          "
                        >
                          <p
                            className="
                              !text-sm
                              !leading-6
                              !text-[var(--color-text-secondary)]
                            "
                          >
                            {selectedNotice.description}
                          </p>
                        </motion.div>

                        {/* SCHEDULE */}

                        <div
                          className="
                            !mt-4
                            !flex
                            !items-center
                            !gap-3
                            !rounded-xl
                            !border
                            !border-[var(--color-primary)]/15
                            !bg-[var(--color-primary)]/[0.05]
                            !px-4
                            !py-3
                          "
                        >
                          <Clock3
                            size={15}
                            className="!text-[var(--color-primary)]"
                          />

                          <div>
                            <p
                              className="
                                !text-[8px]
                                !font-semibold
                                !uppercase
                                !tracking-[0.16em]
                                !text-[var(--color-text-muted)]
                              "
                            >
                              Schedule
                            </p>

                            <p
                              className="
                                !mt-0.5
                                !text-xs
                                !font-medium
                                !text-[var(--color-text-primary)]
                              "
                            >
                              {selectedNotice.time}
                            </p>
                          </div>
                        </div>

                        {/* BUTTON */}

                        <motion.button
                          whileHover={{
                            y: -2,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          onClick={() => setSelectedNotice(null)}
                          className="
                            !mt-6
                            !w-full
                            !rounded-xl
                            !bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-hover))]
                            !px-5
                            !py-3
                            !text-sm
                            !font-semibold
                            !text-[#111111]
                            !shadow-[0_10px_30px_rgba(212,175,55,0.18)]
                            !transition-all
                            !duration-300
                            hover:!shadow-j
                            [0_15px_40px_rgba(212,175,55,0.25)]
                          "
                        >
                          Got it
                        </motion.button>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoticeBoard;
