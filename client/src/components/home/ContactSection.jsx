import { Email, Phone, LocationOn } from "@mui/icons-material";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="!py-20 bg-white">
      <div className="max-w-7xl !mx-auto !px-6">
        <div className="text-center !mb-14">
          <h2 className="text-4xl font-bold text-[#2C2C2C]">Contact Us</h2>

          <p className="text-gray-500 !mt-4">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 !gap-10">
          {/* Contact Info */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl !p-8 shadow-md"
          >
            <div className="flex items-center !gap-4 !mb-8">
              <Email className="text-[#D4AF37]" fontSize="large" />

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@hostelhub.com</p>
              </div>
            </div>

            <div className="flex items-center !gap-4 !mb-8">
              <Phone className="text-[#D4AF37]" fontSize="large" />

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-center !gap-4">
              <LocationOn className="text-[#D4AF37]" fontSize="large" />

              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">Bhilai, Chhattisgarh, India</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl !p-4 !mb-2 outline-none focus:border-[#D4AF37]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-xl !p-4 !mb-2 outline-none focus:border-[#D4AF37]"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-xl !p-4 !mb-2 outline-none focus:border-[#D4AF37]"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full border rounded-xl !p-4 outline-none resize-none focus:border-[#D4AF37]"
            />

            <button
              type="submit"
              className="bg-[#D4AF37] text-white !px-8 !py-4 rounded-xl hover:bg-yellow-600 transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
