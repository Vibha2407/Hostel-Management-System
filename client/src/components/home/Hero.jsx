import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarCheck,
  Sparkles,
  ShieldCheck,
  Wifi,
  BedDouble,
} from "lucide-react";
import heroImage from "../../assets/images/hero/hero.jpg";
import { useState, useContext } from "react";
import LoginRequiredModal from "../common/LoginRequiredModal";
import { AuthContext } from "../../context/AuthContext";
import useTheme from "../../hooks/useTheme";

const Hero = () => {
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useContext(AuthContext);

  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleBookNow = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate("/rooms");
    }
  };

  return (
    <>
      <section
        className={`!relative !h-[calc(100dvh-72px)] !min-h-0 !overflow-hidden !text-white ${
          isDark ? "!bg-[#0B0D12]" : "!bg-[#202124]"
        }`}
      >
        {/* =====================================================
            BACKGROUND IMAGE
        ====================================================== */}

        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!absolute !inset-0"
        >
          <img
            src={heroImage}
            alt="Hostel accommodation"
            className="!h-full !w-full !object-cover"
          />
        </motion.div>

        {/* =====================================================
            PREMIUM OVERLAYS
        ====================================================== */}

        <div
          className={`!absolute !inset-0 ${
            isDark ? "!bg-[#080A0F]/55" : "!bg-[#080A0F]/42"
          }`}
        />

        <div
          className={`!absolute !inset-0 !bg-gradient-to-r ${
            isDark
              ? "!from-[#080A0F] !via-[#080A0F]/85 !to-[#080A0F]/20"
              : "!from-[#15171B]/90 !via-[#15171B]/60 !to-[#15171B]/10"
          }`}
        />

        <div
          className={`!absolute !inset-0 !bg-gradient-to-t ${
            isDark
              ? "!from-[#080A0F] !via-transparent !to-[#080A0F]/30"
              : "!from-[#111318]/75 !via-transparent !to-transparent"
          }`}
        />

        {/* =====================================================
            GOLD AMBIENT LIGHT
        ====================================================== */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="!pointer-events-none !absolute !-left-40 !top-1/4 !h-[420px] !w-[420px] !rounded-full !bg-[var(--color-primary)]/15 !blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="!pointer-events-none !absolute !-right-40 !bottom-0 !h-[450px] !w-[450px] !rounded-full !bg-[var(--color-primary)]/10 !blur-[150px]"
        />

        {/* =====================================================
            TOP GOLD LINE
        ====================================================== */}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!absolute !left-0 !top-0 !h-[2px] !w-full !origin-left !bg-gradient-to-r !from-transparent !via-[var(--color-primary)] !to-transparent"
        />

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="!relative !z-10 !mx-auto !flex !h-full !w-full !max-w-[1440px] !items-center !px-6 !py-8 sm:!px-10 lg:!px-14 xl:!px-20">
          <div className="!grid !w-full !grid-cols-1 !items-center lg:!grid-cols-[1.15fr_0.85fr]">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="!max-w-4xl">
              {/* Label */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="!mb-7 !flex !items-center !gap-3"
              >
                <span className="!h-[1px] !w-9 !bg-[var(--color-primary)]" />

                <div className="!flex !items-center !gap-2">
                  <Sparkles
                    size={14}
                    className="!text-[var(--color-primary)]"
                    strokeWidth={1.8}
                  />

                  <span className="!text-[11px] !font-semibold !uppercase !tracking-[0.3em] !text-[#E7C95C]">
                    Hostel Management System
                  </span>
                </div>
              </motion.div>

              {/* =================================================
                  HEADING
              ================================================= */}

              <div className="!overflow-hidden">
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 70,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="!text-[48px] !font-semibold !leading-[0.98] !tracking-[-0.045em] sm:!text-[62px] md:!text-[76px] lg:!text-[82px] xl:!text-[92px]"
                >
                  Find a place
                  <br />
                  <span className="!text-white/95">that feels like</span>
                  <br />
                  <span className="!relative !inline-block !text-[#E7C95C]">
                    home.
                    <motion.span
                      initial={{
                        scaleX: 0,
                      }}
                      animate={{
                        scaleX: 1,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 1.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="!absolute !-bottom-2 !left-0 !h-[3px] !w-full !origin-left !bg-[var(--color-primary)]/70"
                    />
                  </span>
                </motion.h1>
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="!mt-8 !max-w-xl !text-[15px] !leading-7 !text-white/65 sm:!text-lg sm:!leading-8"
              >
                Discover thoughtfully designed spaces with modern facilities,
                secure living and everything you need to feel at home.
              </motion.p>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="!mt-9 !flex !flex-col !gap-3 sm:!flex-row"
              >
                {/* Explore */}

                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => navigate("/about")}
                  className="!group !flex !min-h-[52px] !items-center !justify-center !gap-3 !rounded-xl !bg-[var(--color-primary)] !px-7 !py-3.5 !font-semibold !text-[#12100A] !shadow-[0_15px_40px_rgba(212,175,55,0.18)] !transition-all !duration-300 hover:!bg-[var(--color-primary-hover)]"
                >
                  Explore
                  <ArrowUpRight
                    size={18}
                    className="!transition-transform !duration-300 group-hover:!translate-x-0.5 group-hover:!-translate-y-0.5"
                  />
                </motion.button>

                {/* Book */}

                {user?.role !== "admin" && (
                  <motion.button
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={handleBookNow}
                    className="!group !flex !min-h-[52px] !items-center !justify-center !gap-3 !rounded-xl !border !border-white/20 !bg-white/[0.07] !px-7 !py-3.5 !font-semibold !text-white !backdrop-blur-xl !transition-all !duration-300 hover:!border-[var(--color-primary)]/60 hover:!bg-white/[0.12]"
                  >
                    <CalendarCheck
                      size={18}
                      className="!text-[var(--color-primary-hover)]"
                    />
                    Book Now
                  </motion.button>
                )}
              </motion.div>

              {/* =================================================
                  TRUST LINE
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.15,
                }}
                className="!mt-8 !flex !flex-wrap !items-center !gap-x-5 !gap-y-2 !text-xs !text-white/50"
              >
                <span className="!flex !items-center !gap-2">
                  <ShieldCheck
                    size={14}
                    className="!text-[var(--color-primary)]"
                  />
                  Secure Living
                </span>

                <span className="!h-3 !w-px !bg-white/20" />

                <span className="!flex !items-center !gap-2">
                  <Wifi size={14} className="!text-[var(--color-primary)]" />
                  High-Speed WiFi
                </span>

                <span className="!h-3 !w-px !bg-white/20" />

                <span className="!flex !items-center !gap-2">
                  <BedDouble
                    size={14}
                    className="!text-[var(--color-primary)]"
                  />
                  Modern Rooms
                </span>
              </motion.div>
            </div>

            {/* =================================================
                RIGHT FLOATING CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!relative !hidden lg:!block"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="!ml-auto !w-[290px] !rounded-2xl !border !border-white/15 !bg-[#11141A]/65 !p-5 !shadow-[0_30px_80px_rgba(0,0,0,0.35)] !backdrop-blur-xl"
              >
                <div className="!mb-5 !flex !items-center !justify-between">
                  <div>
                    <p className="!text-[10px] !uppercase !tracking-[0.2em] !text-white/40">
                      Your next home
                    </p>

                    <p className="!mt-1 !text-sm !font-semibold !text-white">
                      Everything you need
                    </p>
                  </div>

                  <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-full !border !border-[var(--color-primary)]/30 !bg-[var(--color-primary)]/10">
                    <Sparkles
                      size={15}
                      className="!text-[var(--color-primary)]"
                    />
                  </div>
                </div>

                <div className="!space-y-2">
                  {[
                    "Comfortable Rooms",
                    "24/7 Security",
                    "Modern Facilities",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{
                        opacity: 0,
                        x: 15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 1.2 + index * 0.12,
                        duration: 0.5,
                      }}
                      className="!flex !items-center !gap-3 !rounded-xl !border !border-white/[0.06] !bg-white/[0.035] !px-3.5 !py-3"
                    >
                      <span className="!h-1.5 !w-1.5 !rounded-full !bg-[var(--color-primary)]" />

                      <span className="!text-xs !text-white/65">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="!mt-5 !border-t !border-white/10 !pt-4">
                  <div className="!flex !items-center !justify-between">
                    <span className="!text-[11px] !text-white/40">
                      Designed for
                    </span>

                    <span className="!text-xs !font-medium !text-[#E7C95C]">
                      Students & Professionals
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* =====================================================
            EDGE DECORATION
        ====================================================== */}

        <div className="!pointer-events-none !absolute !bottom-0 !left-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/30 !to-transparent" />
      </section>

      {/* =====================================================
          LOGIN MODAL
      ====================================================== */}

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Hero;
