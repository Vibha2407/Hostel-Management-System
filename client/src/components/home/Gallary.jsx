import { motion } from "framer-motion";

const images = [1, 2, 3, 4, 5, 6];

const Gallary = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl !mx-auto !px-6">
        <div className="text-center !mb-14">
          <h2 className="text-4xl font-bold text-[#2C2C2C]">Gallery</h2>

          <p className="text-gray-500 !mt-4">
            Take a glimpse of our beautiful hostel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 !gap-6">
          {images.map((item) => (
            <motion.div
              key={item}
              whileHover={{
                scale: 1.04,
              }}
              className="h-72 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center"
            >
              Hostel Image
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallary;
