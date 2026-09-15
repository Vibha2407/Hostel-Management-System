import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Images, Sparkles } from "lucide-react";
import { useState } from "react";
import GalleryGrid from "../components/gallary/GallaryGrid";
import { galleryData } from "../constants/galleryData";

const Gallary = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    "All",
    ...new Set(galleryData.map((item) => item.category)),
  ];

  const filteredData =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  return (
    <main className="!min-h-screen !bg-[#0B0C0E] !text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="!relative !overflow-hidden !border-b !border-[#242424]">
        {/* Ambient glow */}

        <div className="!pointer-events-none !absolute !-left-40 !top-20 !h-96 !w-96 !rounded-full !bg-[#D4AF37]/10 !blur-[140px]" />

        <div className="!pointer-events-none !absolute !-right-40 !bottom-0 !h-96 !w-96 !rounded-full !bg-[#D4AF37]/5 !blur-[150px]" />

        <div className="!relative !z-10 !mx-auto !max-w-7xl !px-6 !pb-16 !pt-20 sm:!px-8 lg:!px-10 lg:!pb-20 lg:!pt-28">
          <div className="!max-w-4xl">
            {/* Label */}

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!mb-6 !flex !items-center !gap-3"
            >
              <span className="!h-px !w-8 !bg-[#D4AF37]" />

              <span className="!text-xs !font-semibold !uppercase !tracking-[0.3em] !text-[#D4AF37]">
                Life at HostelHub
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                filter: "blur(12px)",
                y: 30,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!text-4xl !font-semibold !leading-[1.05] !tracking-[-0.04em] sm:!text-5xl md:!text-6xl lg:!text-7xl"
            >
              More than a room.
              <br />
              <span className="!text-[#D4AF37]">A place to belong.</span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!mt-6 !max-w-2xl !text-base !leading-7 !text-[#858585] sm:!text-lg"
            >
              Take a closer look at our rooms, facilities, food and everyday
              moments that make HostelHub feel like home.
            </motion.p>
          </div>

          {/* Stats */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            className="!mt-10 !flex !items-center !gap-4"
          >
            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !border !border-[#333333] !bg-[#151515]">
              <Images size={18} className="!text-[#D4AF37]" />
            </div>

            <div>
              <p className="!text-lg !font-semibold !text-white">
                {galleryData.length}+
              </p>

              <p className="!text-xs !text-[#777777]">Moments captured</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <section className="!mx-auto !max-w-7xl !px-6 !pt-10 sm:!px-8 lg:!px-10">
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
            duration: 0.6,
            delay: 0.2,
          }}
          className="!flex !flex-wrap !items-center !gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => setActiveCategory(category)}
                className={`!relative !overflow-hidden !rounded-full !border !px-5 !py-2.5 !text-xs !font-medium !transition-all !duration-300 ${
                  isActive
                    ? "!border-[#D4AF37] !bg-[#D4AF37] !text-[#111111]"
                    : "!border-[#303030] !bg-[#111111] !text-[#858585] hover:!border-[#D4AF37]/50 hover:!text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeGalleryFilter"
                    className="!absolute !inset-0 !-z-0 !bg-[#D4AF37]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span className="!relative !z-10">{category}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <GalleryGrid data={filteredData} onImageClick={setSelectedImage} />

      {/* =====================================================
          IMAGE MODAL
      ====================================================== */}

      <AnimatePresence>
        {selectedImage && (
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
            className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !bg-black/90 !p-5 !backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!relative !max-h-[90vh] !max-w-5xl !overflow-hidden !rounded-2xl !border !border-[#333333] !bg-[#111111] !shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="!max-h-[75vh] !w-full !object-contain"
              />

              <div className="!flex !items-center !justify-between !gap-5 !border-t !border-[#292929] !bg-[#111111] !px-5 !py-4 sm:!px-6">
                <div>
                  <p className="!text-[10px] !font-semibold !uppercase !tracking-[0.25em] !text-[#D4AF37]">
                    {selectedImage.category}
                  </p>

                  <h3 className="!mt-1 !text-lg !font-semibold !text-white">
                    {selectedImage.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !border !border-[#333333] !bg-[#181818] !text-[#999999] !transition-all !duration-300 hover:!border-[#D4AF37] hover:!text-[#D4AF37]"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallary;
