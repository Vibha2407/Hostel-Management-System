import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useState } from "react";

import GalleryGrid from "../components/gallary/GallaryGrid";
import { galleryData } from "../constants/galleryData";

const categories = ["All", "Rooms", "Food", "Facilities", "Events"];

const Gallary = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredGallery =
    activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

  return (
    <main className="!relative !min-h-screen !overflow-hidden !bg-[var(--color-background)] !text-[var(--color-text-primary)]">
      {/* =====================================================
          HERO
      ====================================================== */}

      {/* =====================================================
    HERO
===================================================== */}

      <section className="!relative !overflow-hidden !border-b !border-[var(--color-border)] !bg-[var(--color-primary)] !text-[#17130A]">
        {/* Premium ambient gradients */}

        <div className="!pointer-events-none !absolute !-left-32 !-top-32 !h-80 !w-80 !rounded-full !bg-[#F6E7A5]/40 !blur-[110px]" />

        <div className="!pointer-events-none !absolute !-right-32 !-bottom-32 !h-96 !w-96 !rounded-full !bg-[#FFF3B8]/30 !blur-[130px]" />

        <div className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-72 !w-72 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !bg-white/10 !blur-[100px]" />

        {/* Center Container */}

        <div className="!relative !mx-auto !flex !min-h-[75vh] !w-full !max-w-7xl !items-center !justify-center !px-5 !py-20 !text-center sm:!px-8 lg:!px-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="!flex !w-full !max-w-4xl !flex-col !items-center !justify-center"
          >
            {/* ================= LABEL ================= */}

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
                delay: 0.15,
                duration: 0.6,
              }}
              className="!mb-6 !flex !items-center !justify-center !gap-3"
            >
              <span className="!h-px !w-8 !bg-[#17130A]/40 sm:!w-12" />

              <span className="!text-xs !font-bold !uppercase !tracking-[0.3em] !text-[#17130A]/70">
                Hostel Moments
              </span>

              <span className="!h-px !w-8 !bg-[#17130A]/40 sm:!w-12" />
            </motion.div>

            {/* ================= HEADING ================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="!m-0 !text-center !text-4xl !font-semibold !leading-[1.08] !tracking-[-0.04em] !text-[#17130A] sm:!text-5xl md:!text-6xl lg:!text-7xl"
            >
              A glimpse of
              <br />
              <span className="!text-[#17130A]">life at HostelHub.</span>
            </motion.h1>

            {/* ================= DESCRIPTION ================= */}

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
                delay: 0.5,
                duration: 0.7,
              }}
              className="!mx-auto !mt-6 !max-w-2xl !text-center !text-sm !font-medium !leading-7 !text-[#17130A]/75 sm:!text-base sm:!leading-8"
            >
              Explore our rooms, food, facilities and everyday moments designed
              to make your stay comfortable and memorable.
            </motion.p>

            {/* ================= FILTERS ================= */}

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
                delay: 0.7,
                duration: 0.7,
              }}
              className="!mt-10 !flex !w-full !flex-wrap !items-center !justify-center !gap-2.5"
            >
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className={`!rounded-full !border !px-5 !py-2.5 !text-sm !font-semibold !transition-all !duration-300 ${
                      active
                        ? "!border-[#17130A] !bg-[#17130A] !text-white !shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                        : "!border-[#17130A]/25 !bg-white/20 !text-[#17130A] !backdrop-blur-md hover:!border-[#17130A]/50 hover:!bg-white/30"
                    }`}
                  >
                    {category}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <section className="!relative !py-16 sm:!py-20">
        <div className="!mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
          {/* Section Heading */}

          <div className="!mb-10 !flex !items-end !justify-between !gap-6">
            <div>
              <p className="!mb-2 !text-[10px] !font-semibold !uppercase !tracking-[0.25em] !text-[var(--color-primary)]">
                Explore
              </p>

              <h2 className="!text-2xl !font-semibold !tracking-tight !text-[var(--color-text-primary)] sm:!text-3xl">
                Our space, your experience.
              </h2>
            </div>

            <div className="!hidden !items-center !gap-2 !text-xs !font-medium !text-[var(--color-text-secondary)] sm:!flex">
              <Sparkles size={14} className="!text-[var(--color-primary)]" />
              {filteredGallery.length} moments
            </div>
          </div>

          <GalleryGrid data={filteredGallery} onImageClick={setSelectedImage} />
        </div>
      </section>

      {/* =====================================================
          IMAGE MODAL
      ====================================================== */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !bg-black/90 !p-5 !backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
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
                y: 10,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="!relative !max-h-[90vh] !max-w-5xl !overflow-hidden !rounded-2xl !border !border-white/10 !bg-[#111111] !shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="!max-h-[78vh] !w-full !object-contain"
              />

              <div className="!flex !items-center !justify-between !border-t !border-white/10 !bg-[#111111] !px-5 !py-4">
                <div>
                  <p className="!text-[10px] !font-semibold !uppercase !tracking-[0.25em] !text-[#D4AF37]">
                    {selectedImage.category}
                  </p>

                  <h3 className="!mt-1 !text-lg !font-semibold !text-white">
                    {selectedImage.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="!flex !h-10 !w-10 !items-center !justify-center !rounded-full !border !border-white/10 !bg-white/5 !text-white/70 !transition-all !duration-300 hover:!border-[#D4AF37]/50 hover:!bg-[#D4AF37] hover:!text-black"
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
