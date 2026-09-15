import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  CheckCircle2,
  CircleAlert,
  DoorOpen,
  ShieldCheck,
  Sparkles,
  Users,
  MapPin,
  Star,
  LockKeyhole,
} from "lucide-react";

import { getRoomById } from "../services/roomService";
import LoginRequiredModal from "../components/common/LoginRequiredModal";
import { AuthContext } from "../context/AuthContext";
import GenderRestrictionModal from "../components/common/GenderRestrictionModal";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  /* =========================================================
     FETCH ROOM
     Existing API logic preserved
  ========================================================= */

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        setRoom(data.room);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
  }, [id]);

  /* =========================================================
     LOADING
     IMPORTANT:
     No hooks are used after this conditional return.
     This fixes the React hook-order error.
  ========================================================= */

  if (!room) {
    return (
      <main className="!min-h-screen !bg-[var(--color-background)] !px-6 !py-24 !text-[var(--color-text-primary)]">
        {/* Ambient background */}

        <div className="!pointer-events-none !fixed !inset-0 !overflow-hidden">
          <div className="!absolute !-left-40 !top-20 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]" />

          <div className="!absolute !-right-40 !bottom-0 !h-96 !w-96 !rounded-full !bg-[var(--color-primary)]/10 !blur-[130px]" />
        </div>

        <div className="!relative !mx-auto !flex !min-h-[60vh] !max-w-7xl !items-center !justify-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="!text-center"
          >
            <div className="!relative !mx-auto !mb-6 !flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)]">
              <div className="!absolute !inset-0 !rounded-2xl !bg-[var(--color-primary)]/10 !blur-xl" />

              <div className="!relative !h-7 !w-7 !animate-spin !rounded-full !border-2 !border-[var(--color-border)] !border-t-[var(--color-primary)]" />
            </div>

            <p className="!text-[10px] !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
              Please wait
            </p>

            <p className="!mt-2 !text-sm !text-[var(--color-text-muted)]">
              Loading room details
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  /* =========================================================
     EXISTING ROOM LOGIC
  ========================================================= */

  const isAvailable = room.availableBeds > 0;

  const images =
    room.roomImages?.length > 0 ? room.roomImages : ["/placeholder.jpg"];

  const facilities = Object.entries(room.facilities || {}).filter(
    ([, value]) => value,
  );

  /* =========================================================
     EXISTING BOOKING LOGIC
     PRESERVED
  ========================================================= */

  const handleBookNow = () => {
    // Logged out
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Male user trying to book Female room
    if (user.gender === "Male" && room.wingGender === "Female") {
      setShowGenderModal(true);
      return;
    }

    // Female user trying to book Male room
    if (user.gender === "Female" && room.wingGender === "Male") {
      setShowGenderModal(true);
      return;
    }

    // Matching gender
    navigate(`/booking/${room._id}`);
  };

  return (
    <>
      <main className="!relative !min-h-screen !overflow-hidden !bg-[var(--color-background)] !text-[var(--color-text-primary)]">
        {/* =====================================================
            PREMIUM AMBIENT BACKGROUND
        ====================================================== */}

        <div className="!pointer-events-none !fixed !inset-0 !z-0 !overflow-hidden">
          <motion.div
            animate={{
              x: [0, 35, 0],
              y: [0, 20, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="!absolute !-left-40 !top-20 !h-[28rem] !w-[28rem] !rounded-full !bg-[var(--color-primary)]/8 !blur-[130px]"
          />

          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="!absolute !-right-40 !bottom-0 !h-[30rem] !w-[30rem] !rounded-full !bg-[var(--color-primary)]/7 !blur-[140px]"
          />

          <div className="!absolute !inset-0 !bg-gradient-to-b !from-[var(--color-primary)]/[0.025] !via-transparent !to-transparent" />
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="!relative !z-10">
          {/* =====================================================
              TOP NAVIGATION
          ====================================================== */}

          <div className="!mx-auto !max-w-7xl !px-5 !pt-6 sm:!px-8 sm:!pt-8 lg:!px-10">
            <motion.button
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => navigate("/rooms")}
              className="!group !inline-flex !items-center !gap-2 !rounded-full !border !border-[var(--color-border)] !bg-[var(--color-surface)]/70 !px-4 !py-2.5 !text-sm !font-medium !text-[var(--color-text-secondary)] !shadow-sm !backdrop-blur-xl !transition-all !duration-300 hover:!-translate-x-0.5 hover:!border-[var(--color-primary)]/40 hover:!text-[var(--color-primary)]"
            >
              <ArrowLeft
                size={16}
                className="!transition-transform !duration-300 group-hover:!-translate-x-1"
              />

              <span>Back to rooms</span>
            </motion.button>
          </div>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <section className="!mx-auto !max-w-7xl !px-5 !py-8 sm:!px-8 sm:!py-12 lg:!px-10 lg:!py-14">
            <div className="!grid !gap-8 lg:!grid-cols-[1.45fr_0.8fr] lg:!gap-12 xl:!gap-16">
              {/* =================================================
                  LEFT SIDE
              ================================================== */}

              <div>
                {/* =================================================
                    IMAGE GALLERY
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="!relative"
                >
                  <div className="!absolute !-inset-3 !rounded-[2rem] !bg-[var(--color-primary)]/8 !blur-2xl" />

                  <div className="!group !relative !h-[330px] !overflow-hidden !rounded-[1.75rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[0_25px_80px_rgba(0,0,0,0.12)] sm:!h-[470px] lg:!h-[570px]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={images[activeImage]}
                        initial={{
                          opacity: 0,
                          scale: 1.06,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 1.02,
                        }}
                        transition={{
                          duration: 0.65,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        src={images[activeImage]}
                        alt={`Room ${room.roomNumber}`}
                        className="!h-full !w-full !object-cover !transition-transform !duration-700 group-hover:!scale-[1.015]"
                      />
                    </AnimatePresence>

                    {/* Image overlay */}

                    <div className="!pointer-events-none !absolute !inset-0 !bg-gradient-to-t !from-black/75 !via-black/10 !to-black/5" />

                    {/* Top glow */}

                    <div className="!pointer-events-none !absolute !-right-32 !-top-32 !h-80 !w-80 !rounded-full !bg-[var(--color-primary)]/15 !blur-[100px]" />

                    {/* =================================================
                        AVAILABILITY BADGE
                    ================================================== */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.35,
                        duration: 0.5,
                      }}
                      className={`!absolute !left-4 !top-4 !flex !items-center !gap-2 !rounded-full !border !px-4 !py-2.5 !text-xs !font-semibold !backdrop-blur-xl sm:!left-5 sm:!top-5 ${
                        isAvailable
                          ? "!border-[var(--color-success)]/30 !bg-black/35 !text-[var(--color-success)]"
                          : "!border-[var(--color-danger)]/30 !bg-black/40 !text-[var(--color-danger)]"
                      }`}
                    >
                      <motion.span
                        animate={
                          isAvailable
                            ? {
                                scale: [1, 1.35, 1],
                                opacity: [1, 0.65, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className={`!h-2 !w-2 !rounded-full ${
                          isAvailable
                            ? "!bg-[var(--color-success)]"
                            : "!bg-[var(--color-danger)]"
                        }`}
                      />

                      {isAvailable ? "Available now" : "Currently occupied"}
                    </motion.div>

                    {/* =================================================
                        ROOM TYPE
                    ================================================== */}

                    <div className="!absolute !bottom-5 !left-5 !right-5 !flex !items-end !justify-between">
                      <div className="!rounded-full !border !border-white/20 !bg-black/30 !px-4 !py-2 !text-xs !font-medium !text-white !backdrop-blur-xl">
                        {room.roomType}
                      </div>

                      {images.length > 1 && (
                        <div className="!rounded-full !border !border-white/20 !bg-black/30 !px-3 !py-2 !text-[11px] !font-medium !text-white !backdrop-blur-xl">
                          {activeImage + 1} / {images.length}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* =================================================
                    THUMBNAILS
                ================================================== */}

                {images.length > 1 && (
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
                      delay: 0.45,
                      duration: 0.6,
                    }}
                    className="!mt-4 !grid !grid-cols-4 !gap-2.5 sm:!grid-cols-5 sm:!gap-3"
                  >
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        whileHover={{
                          y: -4,
                          scale: 1.015,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        onClick={() => setActiveImage(index)}
                        className={`!group !relative !h-16 !overflow-hidden !rounded-xl !border !transition-all !duration-300 sm:!h-24 ${
                          activeImage === index
                            ? "!border-[var(--color-primary)] !shadow-[0_0_25px_rgba(212,175,55,0.18)]"
                            : "!border-[var(--color-border)] !opacity-65 hover:!border-[var(--color-primary)]/40 hover:!opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Room view ${index + 1}`}
                          className="!h-full !w-full !object-cover !transition-transform !duration-500 group-hover:!scale-110"
                        />

                        <div className="!absolute !inset-0 !bg-black/10 group-hover:!bg-transparent" />

                        {activeImage === index && (
                          <motion.div
                            layoutId="activeRoomImage"
                            className="!absolute !inset-0 !rounded-xl !border-2 !border-[var(--color-primary)]"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* =================================================
                    ROOM INFORMATION
                ================================================== */}

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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="!mt-10"
                >
                  {/* Label */}

                  <div className="!mb-4 !flex !items-center !gap-3">
                    <span className="!h-px !w-8 !bg-[var(--color-primary)]" />

                    <span className="!text-[10px] !font-bold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
                      Your private space
                    </span>
                  </div>

                  {/* Title */}

                  <div className="!flex !flex-col !gap-5 sm:!flex-row sm:!items-end sm:!justify-between">
                    <div>
                      <h1 className="!bg-gradient-to-r !from-[var(--color-text-primary)] !via-[var(--color-text-primary)] !to-[var(--color-primary)] !bg-clip-text !text-3xl !font-bold !tracking-tight !text-transparent sm:!text-4xl lg:!text-5xl">
                        Room {room.roomNumber}
                      </h1>

                      <div className="!mt-3 !flex !flex-wrap !items-center !gap-2 !text-sm !text-[var(--color-text-muted)]">
                        <span>{room.roomType}</span>

                        <span className="!text-[var(--color-primary)]">•</span>

                        <span>{room.sharingType}</span>

                        {room.wingGender && (
                          <>
                            <span className="!text-[var(--color-primary)]">
                              •
                            </span>

                            <span>{room.wingGender} wing</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="sm:!text-right">
                      <p className="!bg-gradient-to-r !from-[var(--color-primary)] !to-[var(--color-primary-hover)] !bg-clip-text !text-3xl !font-bold !text-transparent">
                        ₹{room.pricePerDay}
                      </p>

                      <p className="!mt-1 !text-[10px] !font-semibold !uppercase !tracking-[0.2em] !text-[var(--color-text-muted)]">
                        per day
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      QUICK INFO
                  ================================================== */}

                  <div className="!mt-7 !grid !grid-cols-2 !gap-3 sm:!grid-cols-3">
                    <InfoItem
                      icon={<BedDouble size={18} />}
                      label="Beds"
                      value={`${room.totalBeds}`}
                    />

                    <InfoItem
                      icon={<Users size={18} />}
                      label="Sharing"
                      value={room.sharingType}
                    />

                    <InfoItem
                      icon={<DoorOpen size={18} />}
                      label="Available"
                      value={`${room.availableBeds}`}
                    />
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}

                  <div className="!mt-10">
                    <SectionHeading
                      icon={<Sparkles size={17} />}
                      title="About this room"
                    />

                    <p className="!max-w-3xl !text-sm !leading-8 !text-[var(--color-text-secondary)] sm:!text-base">
                      {room.description ||
                        "A comfortable and thoughtfully designed room with everything you need for a peaceful and convenient stay."}
                    </p>
                  </div>

                  {/* =================================================
                      FACILITIES
                  ================================================== */}

                  <div className="!mt-10">
                    <SectionHeading
                      icon={<ShieldCheck size={18} />}
                      title="Room facilities"
                    />

                    {facilities.length > 0 ? (
                      <div className="!grid !grid-cols-2 !gap-3 sm:!grid-cols-3">
                        {facilities.map(([key], index) => (
                          <motion.div
                            key={key}
                            initial={{
                              opacity: 0,
                              y: 12,
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
                              delay: index * 0.05,
                              duration: 0.45,
                            }}
                            whileHover={{
                              y: -4,
                            }}
                            className="!group !relative !overflow-hidden !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !px-4 !py-4 !text-sm !text-[var(--color-text-secondary)] !shadow-sm !transition-all !duration-300 hover:!border-[var(--color-primary)]/40 hover:!shadow-[0_10px_30px_rgba(212,175,55,0.08)]"
                          >
                            <div className="!absolute !-right-8 !-top-8 !h-20 !w-20 !rounded-full !bg-[var(--color-primary)]/8 !blur-2xl !transition-all !duration-500 group-hover:!scale-150" />

                            <div className="!relative !flex !items-center !gap-3">
                              <div className="!flex !h-8 !w-8 !shrink-0 !items-center !justify-center !rounded-lg !bg-[var(--color-primary)]/10 !text-[var(--color-primary)]">
                                <CheckCircle2 size={16} />
                              </div>

                              <span className="!capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="!flex !items-center !gap-3 !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !px-4 !py-4 !text-sm !text-[var(--color-text-muted)]">
                        <CircleAlert size={17} />

                        <span>No specific facilities listed.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* =================================================
                  RIGHT BOOKING PANEL-CUSTOMER ONLY
              ================================================== */}
              {user?.role !== "admin" && (
                <motion.aside
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="lg:!sticky lg:!top-8 lg:!self-start"
                >
                  <div className="!relative !overflow-hidden !rounded-[1.75rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-5 !shadow-[0_25px_80px_rgba(0,0,0,0.10)] sm:!p-7">
                    {/* Card ambient glow */}

                    <div className="!pointer-events-none !absolute !-right-24 !-top-24 !h-64 !w-64 !rounded-full !bg-[var(--color-primary)]/12 !blur-[90px]" />

                    <div className="!pointer-events-none !absolute !-bottom-24 !-left-24 !h-48 !w-48 !rounded-full !bg-[var(--color-primary)]/6 !blur-[80px]" />

                    <div className="!relative">
                      {/* =================================================
                        CARD HEADER
                    ================================================== */}

                      <div>
                        <div className="!flex !items-center !justify-between !gap-3">
                          <p className="!text-[10px] !font-bold !uppercase !tracking-[0.25em] !text-[var(--color-primary)]">
                            Reserve your space
                          </p>

                          <div className="!flex !h-8 !w-8 !items-center !justify-center !rounded-lg !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !text-[var(--color-primary)]">
                            <LockKeyhole size={14} />
                          </div>
                        </div>

                        <h2 className="!mt-4 !text-2xl !font-bold !tracking-tight !text-[var(--color-text-primary)]">
                          Make this room yours.
                        </h2>

                        <p className="!mt-3 !text-sm !leading-7 !text-[var(--color-text-secondary)]">
                          Secure your stay in just a few steps. Choose your
                          dates and complete the booking.
                        </p>
                      </div>

                      {/* =================================================
                        ROOM MINI SUMMARY
                    ================================================== */}

                      <div className="!mt-6 !flex !items-center !gap-3 !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !p-3">
                        <div className="!h-14 !w-14 !shrink-0 !overflow-hidden !rounded-xl">
                          <img
                            src={images[0]}
                            alt={`Room ${room.roomNumber}`}
                            className="!h-full !w-full !object-cover"
                          />
                        </div>

                        <div className="!min-w-0 !flex-1">
                          <p className="!truncate !text-sm !font-semibold !text-[var(--color-text-primary)]">
                            Room {room.roomNumber}
                          </p>

                          <p className="!mt-1 !truncate !text-xs !text-[var(--color-text-muted)]">
                            {room.roomType} • {room.sharingType}
                          </p>
                        </div>

                        <Star
                          size={16}
                          className="!shrink-0 !fill-[var(--color-primary)] !text-[var(--color-primary)]"
                        />
                      </div>

                      {/* =================================================
                        PRICE CARD
                    ================================================== */}

                      <div className="!relative !mt-5 !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-gradient-to-br !from-[var(--color-surface-secondary)] !via-[var(--color-surface)] !to-[var(--color-primary)]/[0.07] !p-5">
                        <div className="!absolute !-right-10 !-top-10 !h-28 !w-28 !rounded-full !bg-[var(--color-primary)]/10 !blur-3xl" />

                        <div className="!relative !flex !items-end !justify-between">
                          <div>
                            <p className="!text-xs !font-medium !text-[var(--color-text-muted)]">
                              Room price
                            </p>

                            <p className="!mt-1 !bg-gradient-to-r !from-[var(--color-text-primary)] !to-[var(--color-primary)] !bg-clip-text !text-3xl !font-bold !text-transparent">
                              ₹{room.pricePerDay}
                            </p>
                          </div>

                          <span className="!pb-1 !text-xs !text-[var(--color-text-muted)]">
                            / day
                          </span>
                        </div>
                      </div>

                      {/* =================================================
                        AVAILABILITY
                    ================================================== */}

                      <div
                        className={`!mt-4 !flex !items-center !justify-between !rounded-xl !border !px-4 !py-3.5 ${
                          isAvailable
                            ? "!border-[var(--color-success)]/25 !bg-[var(--color-success)]/5"
                            : "!border-[var(--color-danger)]/20 !bg-[var(--color-danger)]/5"
                        }`}
                      >
                        <div className="!flex !items-center !gap-2.5">
                          <motion.span
                            animate={
                              isAvailable
                                ? {
                                    scale: [1, 1.3, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                            className={`!h-2 !w-2 !rounded-full ${
                              isAvailable
                                ? "!bg-[var(--color-success)]"
                                : "!bg-[var(--color-danger)]"
                            }`}
                          />

                          <span
                            className={`!text-sm !font-medium ${
                              isAvailable
                                ? "!text-[var(--color-success)]"
                                : "!text-[var(--color-danger)]"
                            }`}
                          >
                            {isAvailable
                              ? "Currently available"
                              : "Currently occupied"}
                          </span>
                        </div>

                        <span className="!text-xs !font-medium !text-[var(--color-text-muted)]">
                          {room.availableBeds} left
                        </span>
                      </div>

                      {/* =================================================
                        BOOK BUTTON
                    ================================================== */}

                      <motion.button
                        whileHover={{
                          scale: isAvailable ? 1.015 : 1,
                        }}
                        whileTap={{
                          scale: isAvailable ? 0.98 : 1,
                        }}
                        disabled={!isAvailable}
                        onClick={handleBookNow}
                        className={`!group !relative !mt-6 !flex !w-full !items-center !justify-center !gap-2 !overflow-hidden !rounded-xl !px-6 !py-4 !text-sm !font-bold !transition-all !duration-300 ${
                          isAvailable
                            ? "!bg-gradient-to-r !from-[var(--color-primary)] !to-[var(--color-primary-hover)] !text-[#17120a] !shadow-[0_12px_35px_rgba(212,175,55,0.16)] hover:!shadow-[0_16px_45px_rgba(212,175,55,0.25)]"
                            : "!cursor-not-allowed !bg-[var(--color-surface-secondary)] !text-[var(--color-text-muted)]"
                        }`}
                      >
                        {isAvailable && (
                          <>
                            <span className="!absolute !inset-0 !bg-gradient-to-r !from-transparent !via-white/25 !to-transparent !-translate-x-full !skew-x-[-15deg] !transition-transform !duration-1000 group-hover:!translate-x-full" />

                            <span className="!absolute !inset-0 !rounded-xl !ring-1 !ring-inset !ring-white/20" />
                          </>
                        )}

                        <span className="!relative">
                          {isAvailable
                            ? "Book This Room"
                            : "Currently Unavailable"}
                        </span>

                        {isAvailable && (
                          <ArrowUpRight
                            size={17}
                            className="!relative !transition-transform !duration-300 group-hover:!translate-x-0.5 group-hover:!-translate-y-0.5"
                          />
                        )}
                      </motion.button>

                      {/* =================================================
                        TRUST
                    ================================================== */}

                      <div className="!mt-5 !flex !items-center !justify-center !gap-2 !text-center !text-[11px] !text-[var(--color-text-muted)]">
                        <ShieldCheck
                          size={14}
                          className="!shrink-0 !text-[var(--color-primary)]"
                        />

                        <span>Secure booking • Managed accommodation</span>
                      </div>

                      {/* =================================================
                        BOTTOM FEATURES
                    ================================================== */}

                      <div className="!mt-6 !grid !grid-cols-2 !gap-2.5 !border-t !border-[var(--color-border)] !pt-5">
                        <MiniTrustItem
                          icon={<ShieldCheck size={14} />}
                          text="Secure booking"
                        />

                        <MiniTrustItem
                          icon={<LockKeyhole size={14} />}
                          text="Protected data"
                        />
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          LOGIN MODAL
      ====================================================== */}

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* =====================================================
          GENDER RESTRICTION MODAL
      ====================================================== */}

      <GenderRestrictionModal
        isOpen={showGenderModal}
        onClose={() => setShowGenderModal(false)}
        roomGender={room.wingGender}
      />
    </>
  );
};

/* ============================================================
   SECTION HEADING
============================================================ */

const SectionHeading = ({ icon, title }) => {
  return (
    <div className="!mb-5 !flex !items-center !gap-3">
      <div className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/10 !text-[var(--color-primary)]">
        {icon}
      </div>

      <h2 className="!text-xl !font-bold !text-[var(--color-text-primary)]">
        {title}
      </h2>
    </div>
  );
};

/* ============================================================
   SMALL INFO COMPONENT
============================================================ */

const InfoItem = ({ icon, label, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="!group !relative !overflow-hidden !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !px-4 !py-4 !shadow-sm !transition-all !duration-300 hover:!border-[var(--color-primary)]/35 hover:!shadow-[0_12px_30px_rgba(212,175,55,0.08)]"
    >
      <div className="!absolute !-right-8 !-top-8 !h-20 !w-20 !rounded-full !bg-[var(--color-primary)]/7 !blur-2xl !transition-transform !duration-500 group-hover:!scale-150" />

      <div className="!relative !flex !items-center !gap-2 !text-[var(--color-primary)]">
        {icon}

        <span className="!text-[10px] !font-bold !uppercase !tracking-[0.15em] !text-[var(--color-text-muted)]">
          {label}
        </span>
      </div>

      <p className="!relative !mt-2 !truncate !text-sm !font-semibold !capitalize !text-[var(--color-text-primary)]">
        {value}
      </p>
    </motion.div>
  );
};

/* ============================================================
   MINI TRUST ITEM
============================================================ */

const MiniTrustItem = ({ icon, text }) => {
  return (
    <div className="!flex !items-center !justify-center !gap-2 !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-3 !py-2.5 !text-[10px] !font-medium !text-[var(--color-text-muted)]">
      <span className="!text-[var(--color-primary)]">{icon}</span>

      <span>{text}</span>
    </div>
  );
};

export default RoomDetails;
