import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="!py-20 bg-white">
      <div className="max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 !gap-14 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4AF37] font-semibold uppercase tracking-widest">
            About Us
          </span>

          <h2 className="text-4xl font-bold !mt-4 text-[#2C2C2C]">
            Comfortable Living for Students & Working Professionals
          </h2>

          <p className="text-gray-600 !mt-6 leading-8">
            Our hostel offers modern rooms, premium facilities, delicious meals,
            high-speed WiFi and a safe environment. Whether you're a student or
            a working professional, we provide a peaceful place that feels like
            home.
          </p>

          <div className="grid grid-cols-2 !gap-6 !mt-10">
            <div>
              <h3 className="text-3xl font-bold text-[#D4AF37]">500+</h3>
              <p className="text-gray-600">Happy Residents</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#D4AF37]">50+</h3>
              <p className="text-gray-600">Premium Rooms</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#D4AF37]">24×7</h3>
              <p className="text-gray-600">Security</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#D4AF37]">8+</h3>
              <p className="text-gray-600">Facilities</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="h-[500px] rounded-3xl bg-gray-200 flex items-center justify-center text-gray-500">
            <img
              className="h-[500px] rounded-3xl "
              src="https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
