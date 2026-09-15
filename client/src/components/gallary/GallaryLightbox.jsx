import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const GalleryLightbox = ({ selectedImage, setSelectedImage, images }) => {
  if (!selectedImage) return null;

  const currentIndex = images.findIndex((img) => img.id === selectedImage.id);

  const prevImage = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setSelectedImage(images[index]);
  };

  const nextImage = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(images[index]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !overflow-hidden !bg-[#050505]/95 !p-5 !backdrop-blur-xl sm:!p-8"
        onClick={() => setSelectedImage(null)}
      >
        {/* ================= AMBIENT GLOW ================= */}

        <div className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-[500px] !w-[500px] !-translate-x-1/2 !-translate-y-1/2 !rounded-full !bg-[#D4AF37]/5 !blur-[140px]" />

        {/* ================= CLOSE ================= */}

        <motion.button
          type="button"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          aria-label="Close gallery"
          className="!absolute !right-5 !top-5 !z-20 !flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-white/15 !bg-white/10 !text-white/80 !backdrop-blur-xl !transition-all !duration-300 hover:!border-[#D4AF37]/60 hover:!bg-[#D4AF37] hover:!text-[#111111] sm:!right-8 sm:!top-8"
        >
          <X size={20} />
        </motion.button>

        {/* ================= IMAGE CONTAINER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
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
            y: 15,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!relative !z-10 !flex !max-h-[88vh] !max-w-6xl !flex-col !overflow-hidden !rounded-[1.5rem] !border !border-white/10 !bg-[#101010] !shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}

          <div className="!relative !flex !items-center !justify-center !overflow-hidden !bg-black">
            <motion.img
              key={selectedImage.id}
              initial={{
                opacity: 0,
                scale: 1.03,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              src={selectedImage.image}
              alt={selectedImage.title}
              className="!max-h-[72vh] !w-auto !max-w-[90vw] !object-contain sm:!max-h-[76vh]"
            />

            {/* Image gradient */}

            <div className="!pointer-events-none !absolute !inset-x-0 !bottom-0 !h-32 !bg-gradient-to-t !from-black/60 !to-transparent" />
          </div>

          {/* ================= INFO ================= */}

          <div className="!flex !items-center !justify-between !gap-4 !border-t !border-white/10 !bg-[#101010] !px-5 !py-4 sm:!px-6">
            <div className="!min-w-0">
              <p className="!text-[10px] !font-semibold !uppercase !tracking-[0.25em] !text-[#D4AF37]">
                {selectedImage.category}
              </p>

              <h2 className="!mt-1 !truncate !text-base !font-semibold !text-white sm:!text-lg">
                {selectedImage.title}
              </h2>
            </div>

            <div className="!shrink-0 !rounded-full !border !border-white/10 !bg-white/5 !px-3 !py-1.5 !text-[10px] !font-medium !text-white/50">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>

        {/* ================= PREVIOUS ================= */}

        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          aria-label="Previous image"
          className="!absolute !left-3 !z-20 !flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-white/15 !bg-white/10 !text-white/80 !backdrop-blur-xl !transition-all !duration-300 hover:!-translate-x-1 hover:!border-[#D4AF37]/60 hover:!bg-[#D4AF37] hover:!text-[#111111] sm:!left-6 sm:!h-12 sm:!w-12"
        >
          <ChevronLeft size={23} />
        </motion.button>

        {/* ================= NEXT ================= */}

        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          aria-label="Next image"
          className="!absolute !right-3 !z-20 !flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-white/15 !bg-white/10 !text-white/80 !backdrop-blur-xl !transition-all !duration-300 hover:!translate-x-1 hover:!border-[#D4AF37]/60 hover:!bg-[#D4AF37] hover:!text-[#111111] sm:!right-6 sm:!h-12 sm:!w-12"
        >
          <ChevronRight size={23} />
        </motion.button>

        {/* ================= TOP DECORATION ================= */}

        <div className="!pointer-events-none !absolute !left-1/2 !top-6 !flex !-translate-x-1/2 !items-center !gap-2 !text-[9px] !font-semibold !uppercase !tracking-[0.3em] !text-white/30 sm:!top-8">
          <Maximize2 size={11} />
          Gallery
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
