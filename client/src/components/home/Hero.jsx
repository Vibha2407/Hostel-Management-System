import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero/hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8F9FA] !min-h-[90vh] flex items-center">
      <div className="!max-w-7xl !mx-auto! !px-6 grid lg:grid-cols-2 !gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] font-semibold !mb-4">
            Welcome to HostelHub
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Find Your
            <span className="text-[#D4AF37]"> Perfect Hostel</span>
          </h1>

          <p className="text-gray-600 !mt-5 text-lg leading-8">
            Comfortable rooms, affordable prices, modern facilities and secure
            accommodation for students and working professionals.
          </p>

          <div className="flex !gap-5 !mt-10">
            <button
              onClick={() => navigate("/rooms")}
              className="bg-[#D4AF37] text-white !px-8 !py-3 rounded-lg hover:scale-105 transition"
            >
              Explore Rooms
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-[#D4AF37] !px-8 !py-3 rounded-lg hover:bg-[#D4AF37] hover:text-white transition"
            >
              Book Now
            </button>
          </div>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={heroImage}
            alt="Hostel"
            className=" !mt-5 rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
