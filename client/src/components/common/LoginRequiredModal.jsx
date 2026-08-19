import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !bg-black/70 !px-5 !backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="!relative !w-full !max-w-md !overflow-hidden !rounded-[1.75rem] !border !border-white/10 !bg-[#111111] !p-7 !text-white !shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
          >
            {/* Gold line */}

            <div className="!absolute !left-0 !top-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-[#D4AF37] !to-transparent" />

            {/* Close */}

            <button
              onClick={onClose}
              className="!absolute !right-5 !top-5 !flex !h-9 !w-9 !items-center !justify-center !rounded-full !border !border-white/10 !text-white/40 !transition-all hover:!border-[#D4AF37]/40 hover:!text-[#D4AF37]"
            >
              <X size={17} />
            </button>

            {/* Icon */}

            <motion.div
              initial={{ scale: 0.7, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
              className="!mb-6 !flex !h-14 !w-14 !items-center !justify-center !rounded-2xl !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10"
            >
              <LockKeyhole size={24} className="!text-[#D4AF37]" />
            </motion.div>

            <h2 className="!text-2xl !font-semibold">Login required</h2>

            <p className="!mt-3 !max-w-sm !text-sm !leading-6 !text-white/45">
              Please sign in to your account to continue with your booking.
            </p>

            {/* Buttons */}

            <div className="!mt-8 !grid !grid-cols-2 !gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="!group !flex !h-12 !items-center !justify-center !gap-2 !rounded-xl !bg-[#D4AF37] !text-sm !font-semibold !text-[#111111] !transition-all hover:!bg-[#E7C95C]"
              >
                Login
                <ArrowRight
                  size={16}
                  className="!transition-transform group-hover:!translate-x-1"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegister}
                className="!h-12 !rounded-xl !border !border-white/10 !bg-white/[0.03] !text-sm !font-medium !text-white/70 !transition-all hover:!border-[#D4AF37]/40 hover:!text-[#E7C95C]"
              >
                Register
              </motion.button>
            </div>

            <button
              onClick={onClose}
              className="!mt-5 !w-full !text-xs !text-white/30 !transition-colors hover:!text-white/60"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginRequiredModal;
