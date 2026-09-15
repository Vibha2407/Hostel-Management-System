import { motion } from "framer-motion";
import { BedDouble, ArrowUpRight, CheckCircle2, Layers3 } from "lucide-react";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginRequiredModal from "../common/LoginRequiredModal";
const RoomCard = ({ room, index = 0 }) => {
  const isAvailable = room.availableBeds > 0;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleViewDetails = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    navigate(`/rooms/${room._id}`);
  };

  return (
    <>
      <motion.article
        initial={{
          opacity: 0,
          filter: "blur(8px)",
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.8,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -8,
          transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className="
        !group !relative !overflow-hidden !rounded-[1.75rem]
        !border !border-black/10 dark:!border-white/10
        !bg-white dark:!bg-[#111318]
        !shadow-[0_15px_50px_rgba(0,0,0,0.08)]
        dark:!shadow-[0_20px_60px_rgba(0,0,0,0.28)]
        !transition-all !duration-500
        hover:!border-[#D4AF37]/40
      "
      >
        {/* =====================================================
          PREMIUM GRADIENT BORDER
      ====================================================== */}

        <div
          className="
          !pointer-events-none !absolute !inset-0 !z-0
          !rounded-[1.75rem]
          !bg-gradient-to-br
          !from-[#D4AF37]/0
          !via-[#D4AF37]/0
          !to-[#D4AF37]/0
          !transition-all !duration-700
          group-hover:!from-[#D4AF37]/20
          group-hover:!via-transparent
          group-hover:!to-[#E7C95C]/10
        "
        />

        {/* =====================================================
          IMAGE
      ====================================================== */}

        <div className="!relative !z-10 !h-[260px] !overflow-hidden sm:!h-[280px]">
          <motion.img
            src={room.roomImages?.[0] || "/placeholder.jpg"}
            alt={`Room ${room.roomNumber}`}
            className="!h-full !w-full !object-cover"
            whileHover={{
              scale: 1.07,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Cinematic gradient */}

          <div
            className="
            !absolute !inset-0
            !bg-gradient-to-t
            !from-black/80
            !via-black/10
            !to-transparent
          "
          />

          {/* Premium gold hover gradient */}

          <div
            className="
            !absolute !inset-0
            !bg-gradient-to-tr
            !from-[#D4AF37]/0
            !via-[#D4AF37]/5
            !to-[#E7C95C]/20
            !opacity-0
            !transition-opacity !duration-700
            group-hover:!opacity-100
          "
          />

          {/* =====================================================
            AVAILABLE BADGE
        ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.25 + index * 0.08,
              duration: 0.5,
            }}
            className={`
            !absolute !left-4 !top-4
            !flex !items-center !gap-2
            !rounded-full
            !border
            !px-4 !py-2
            !text-xs !font-semibold
            !backdrop-blur-xl
            !shadow-lg
            ${
              isAvailable
                ? "!border-white/30 !bg-white/90 !text-[#165C55]"
                : "!border-red-200/30 !bg-red-950/80 !text-red-200"
            }
          `}
          >
            <span className="!relative !flex !h-2 !w-2">
              {isAvailable && (
                <span
                  className="
                  !absolute !inline-flex
                  !h-full !w-full
                  !animate-ping
                  !rounded-full
                  !bg-[#1F8A70]
                  !opacity-60
                "
                />
              )}

              <span
                className={`
                !relative !inline-flex
                !h-2 !w-2
                !rounded-full
                ${isAvailable ? "!bg-[#1F8A70]" : "!bg-red-400"}
              `}
              />
            </span>

            {isAvailable ? "Available" : "Occupied"}
          </motion.div>

          {/* =====================================================
            ROOM TYPE
        ====================================================== */}

          <div
            className="
            !absolute !bottom-4 !left-5
            !rounded-full
            !border !border-white/20
            !bg-black/30
            !px-4 !py-1.5
            !text-xs !font-medium
            !text-white
            !backdrop-blur-md
          "
          >
            {room.roomType}
          </div>

          <div
            className={`
    !absolute !right-4 !top-4
    !flex !h-9 !w-9
    !items-center !justify-center
    !rounded-full
    !border
    !text-xs !font-bold
    !backdrop-blur-xl
    !shadow-lg
    !transition-all !duration-300
    ${
      room.wingGender === "Male"
        ? "!border-blue-300/30 !bg-blue-500/20 !text-blue-500"
        : "!border-pink-300/30 !bg-pink-500/20 !text-pink-500"
    }
  `}
          >
            {room.wingGender === "Male" ? "M" : "F"}
          </div>

          {/* =====================================================
            IMAGE ACTION
        ====================================================== */}

          <motion.div
            className="
            !absolute !bottom-4 !right-4
            !flex !h-11 !w-11
            !items-center !justify-center
            !rounded-full
            !border !border-white/20
            !bg-white/10
            !text-white
            !backdrop-blur-md
            !opacity-0
            !shadow-lg
            group-hover:!opacity-100
          "
            initial={{
              scale: 0.8,
              rotate: -20,
            }}
            whileHover={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <ArrowUpRight size={19} />
          </motion.div>
        </div>

        {/* =====================================================
          CONTENT
      ====================================================== */}

        <div className="!relative !z-10 !p-5 sm:!p-6">
          {/* Animated gold line */}

          <div
            className="
            !absolute !left-0 !top-0
            !h-[2px] !w-0
            !bg-gradient-to-r
            !from-[#D4AF37]
            !via-[#E7C95C]
            !to-transparent
            !transition-all !duration-700
            group-hover:!w-full
          "
          />

          {/* ROOM + PRICE */}

          <div className="!flex !items-start !justify-between !gap-4">
            <div>
              <p
                className="
                !mb-1
                !text-[10px]
                !font-semibold
                !uppercase
                !tracking-[0.25em]
                !text-[#B08D20]
                dark:!text-[#D4AF37]
              "
              >
                Private Stay
              </p>

              <h2
                className="
                !text-xl
                !font-semibold
                !tracking-tight
                !text-[#171717]
                dark:!text-white
                sm:!text-2xl
              "
              >
                Room {room.roomNumber}
              </h2>

              <p
                className="
                !mt-1
                !text-sm
                !text-black/50
                dark:!text-white/45
              "
              >
                {room.roomType}

                <span className="!px-1.5 !text-[#D4AF37]">•</span>

                {room.sharingType}
              </p>
            </div>

            <div className="!text-right">
              <p
                className="
                !text-lg
                !font-semibold
                !text-[#A78318]
                dark:!text-[#E7C95C]
                sm:!text-xl
              "
              >
                ₹{room.pricePerDay}
              </p>

              <p
                className="
                !text-[10px]
                !uppercase
                !tracking-[0.15em]
                !text-black/40
                dark:!text-white/35
              "
              >
                per day
              </p>
            </div>
          </div>

          {/* =====================================================
            ROOM INFO
        ====================================================== */}

          <div
            className="
            !mt-5
            !flex !items-center
            !rounded-xl
            !border
            !border-black/10
            !bg-black/[0.025]
            !px-4 !py-3.5
            dark:!border-white/10
            dark:!bg-white/[0.035]
          "
          >
            <div
              className="
              !flex !items-center !gap-2
              !text-sm
              !text-black/55
              dark:!text-white/55
            "
            >
              <BedDouble
                size={18}
                className="!text-[#C29F2F] dark:!text-[#D4AF37]"
              />

              <span>
                {room.availableBeds}/{room.totalBeds} beds
              </span>
            </div>

            <div
              className="
              !mx-3 !h-5 !w-px
              !bg-black/10
              dark:!bg-white/10
            "
            />

            <div className="!flex !items-center !gap-2 !text-sm">
              {isAvailable ? (
                <>
                  <CheckCircle2 size={16} className="!text-[#238A72]" />

                  <span className="!font-medium !text-[#238A72]">
                    Available
                  </span>
                </>
              ) : (
                <>
                  <span className="!h-2 !w-2 !rounded-full !bg-red-400" />

                  <span className="!font-medium !text-red-400">Occupied</span>
                </>
              )}
            </div>
          </div>

          {/* =====================================================
            TAGS
        ====================================================== */}

          <div className="!mt-5 !flex !flex-wrap !gap-2">
            <span
              className="
              !rounded-full
              !border !border-black/10
              !bg-black/[0.02]
              !px-3 !py-1.5
              !text-xs
              !text-black/55
              !transition-all !duration-300
              group-hover:!border-[#D4AF37]/40
              dark:!border-white/10
              dark:!bg-white/[0.02]
              dark:!text-white/50
            "
            >
              {room.sharingType}
            </span>

            <span
              className="
              !rounded-full
              !border !border-black/10
              !bg-black/[0.02]
              !px-3 !py-1.5
              !text-xs
              !text-black/55
              !transition-all !duration-300
              group-hover:!border-[#D4AF37]/40
              dark:!border-white/10
              dark:!bg-white/[0.02]
              dark:!text-white/50
            "
            >
              {room.roomType}
            </span>

            <span
              className="
              !rounded-full
              !border !border-black/10
              !bg-black/[0.02]
              !px-3 !py-1.5
              !text-xs
              !text-black/55
              !transition-all !duration-300
              group-hover:!border-[#D4AF37]/40
              dark:!border-white/10
              dark:!bg-white/[0.02]
              dark:!text-white/50
            "
            >
              {room.totalBeds}
              {room.totalBeds === 1 ? " Bed" : " Beds"}
            </span>
          </div>

          {/* =====================================================
            BOTTOM
        ====================================================== */}

          <div className="!mt-6 !flex !items-center !justify-between !gap-3">
            <div
              className="
              !flex !items-center !gap-2
              !text-xs
              !text-black/45
              dark:!text-white/40
            "
            >
              <Layers3 size={15} />

              <span>{room.availableBeds} available</span>
            </div>

            <button
              type="button"
              onClick={handleViewDetails}
              className="
              !group/btn !relative
              !inline-flex !items-center
              !gap-2
              !overflow-hidden
              !rounded-xl
              !bg-gradient-to-r
              !from-[#C9A227]
              !via-[#D4AF37]
              !to-[#E7C95C]
              !px-5 !py-3
              !text-sm
              !font-semibold
              !text-[#17130A]
              !shadow-[0_8px_25px_rgba(212,175,55,0.18)]
              !transition-all !duration-300
              hover:!-translate-y-0.5
              hover:!shadow-[0_12px_35px_rgba(212,175,55,0.3)]
            "
            >
              {/* Button shine */}

              <span
                className="
                !absolute !inset-y-0 !-left-10
                !w-8 !rotate-12
                !bg-white/50
                !blur-sm
                !transition-all !duration-700
                group-hover/btn:!left-[120%]
              "
              />

              <span className="!relative">View Details</span>

              <ArrowUpRight
                size={16}
                className="
                !relative
                !transition-transform !duration-300
                group-hover/btn:!translate-x-0.5
                group-hover/btn:!-translate-y-0.5
              "
              />
            </button>
          </div>
        </div>
      </motion.article>
      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default RoomCard;
