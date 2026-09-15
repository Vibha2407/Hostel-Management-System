import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

const GenderRestrictionModal = ({ isOpen, onClose, roomGender }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="!fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-black/70 !px-5 !backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              !relative
              !w-full
              !max-w-md
              !rounded-3xl
              !border !border-white/10
              !bg-[#111318]
              !p-7
              !text-center
              !shadow-[0_30px_100px_rgba(0,0,0,0.5)]
            "
          >
            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              className="
                !absolute
                !right-4
                !top-4
                !flex
                !h-9
                !w-9
                !items-center
                !justify-center
                !rounded-full
                !bg-white/5
                !text-white/50
                hover:!bg-white/10
                hover:!text-white
              "
            >
              <X size={17} />
            </button>

            {/* Icon */}

            <div
              className="
                !mx-auto
                !mb-5
                !flex
                !h-14
                !w-14
                !items-center
                !justify-center
                !rounded-2xl
                !bg-[#D4AF37]/10
                !text-[#D4AF37]
              "
            >
              <ShieldAlert size={26} />
            </div>

            {/* Title */}

            <h2 className="!text-xl !font-semibold !text-white">
              Room Not Available
            </h2>

            {/* Message */}

            <p className="!mt-3 !text-sm !leading-6 !text-[#858585]">
              This is a{" "}
              <span className="!font-semibold !text-[#D4AF37]">
                {roomGender}
              </span>{" "}
              room and cannot be booked with your account.
            </p>

            {/* Button */}

            <button
              type="button"
              onClick={onClose}
              className="
                !mt-6
                !w-full
                !rounded-xl
                !bg-[#D4AF37]
                !px-5
                !py-3
                !text-sm
                !font-semibold
                !text-[#111111]
                !transition-all
                !duration-300
                hover:!shadow-[0_10px_30px_rgba(212,175,55,0.2)]
              "
            >
              Okay
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GenderRestrictionModal;
