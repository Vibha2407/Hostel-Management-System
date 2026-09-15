import React from "react";
import { motion } from "framer-motion";
import { BedDouble } from "lucide-react";
import RoomCard from "./RoomCard";

const RoomGrid = ({ rooms }) => {
  return (
    <section className="!mx-auto !max-w-7xl !px-5 !py-10 sm:!px-8 sm:!py-14 lg:!px-10">
      {/* ================= SECTION HEADER ================= */}

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
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="!mb-8 !flex !items-center !justify-between !gap-4"
      >
        <div className="!flex !items-center !gap-3">
          <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[#D4AF37]/20 !bg-[#D4AF37]/10 !text-[#D4AF37]">
            <BedDouble size={19} />
          </div>

          <div>
            <p className="!text-[10px] !font-semibold !uppercase !tracking-[0.25em] !text-[#D4AF37]">
              Accommodation
            </p>

            <h2 className="!mt-1 !text-xl !font-semibold !text-white sm:!text-2xl">
              Available Rooms
            </h2>
          </div>
        </div>

        {/* Room count */}

        <div className="!hidden !rounded-full !border !border-[#292929] !bg-[#121212] !px-4 !py-2 sm:!block">
          <span className="!text-xs !text-[#777777]">
            {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
          </span>
        </div>
      </motion.div>

      {/* ================= ROOM GRID ================= */}

      {rooms.length > 0 ? (
        <div className="!grid !grid-cols-1 !gap-6 sm:!grid-cols-2 xl:!grid-cols-3">
          {rooms.map((room, index) => (
            <RoomCard key={room._id} room={room} index={index} />
          ))}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!flex !min-h-[280px] !items-center !justify-center !rounded-3xl !border !border-[#292929] !bg-[#111111]"
        >
          <div className="!text-center">
            <div className="!mx-auto !mb-5 !flex !h-14 !w-14 !items-center !justify-center !rounded-2xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
              <BedDouble size={25} />
            </div>

            <h3 className="!text-lg !font-semibold !text-white">
              No rooms available
            </h3>

            <p className="!mt-2 !text-sm !text-[#777777]">
              Please check again later for available rooms.
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default RoomGrid;
