import GalleryCard from "./GallaryCard";
import { motion } from "framer-motion";

const GalleryGrid = ({ data, onImageClick }) => {
  return (
    <section className="!mx-auto !max-w-7xl !px-6 !pb-24 !pt-12 sm:!px-8 lg:!px-10">
      <motion.div
        layout
        className="!grid !grid-cols-1 !gap-5 sm:!grid-cols-2 lg:!grid-cols-3"
      >
        {data.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onClick={onImageClick}
          />
        ))}
      </motion.div>

      {data.length === 0 && (
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
            duration: 0.5,
          }}
          className="!py-20 !text-center"
        >
          <p className="!text-sm !font-medium !text-[var(--color-text-secondary)]">
            No images available in this category.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default GalleryGrid;
