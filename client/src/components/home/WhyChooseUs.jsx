import {
  Wifi,
  Security,
  Restaurant,
  LocalParking,
  SupportAgent,
  Hotel,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Hotel fontSize="large" />,
    title: "Premium Rooms",
    description:
      "Clean, spacious and fully furnished rooms for a comfortable stay.",
  },
  {
    icon: <Security fontSize="large" />,
    title: "Safe & Secure",
    description: "24×7 security with CCTV surveillance and secure access.",
  },
  {
    icon: <Wifi fontSize="large" />,
    title: "High-Speed WiFi",
    description: "Unlimited internet connectivity for study and work.",
  },
  {
    icon: <Restaurant fontSize="large" />,
    title: "Healthy Food",
    description: "Fresh and hygienic breakfast, lunch and dinner every day.",
  },
  {
    icon: <LocalParking fontSize="large" />,
    title: "Parking",
    description: "Dedicated parking space for bikes and scooties.",
  },
  {
    icon: <SupportAgent fontSize="large" />,
    title: "24×7 Support",
    description: "Friendly management team available whenever you need help.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="!max-w-7xl !mx-auto !px-6 !py-20">
      <div className="text-center !mb-14">
        <h2 className="text-4xl font-bold text-[#2C2C2C]">Why Choose Us?</h2>

        <p className="text-gray-500 !mt-4 !max-w-2xl !mx-auto">
          We provide a comfortable, secure and affordable hostel experience with
          premium facilities designed for students and working professionals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 !gap-8">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md !p-8 text-center border hover:border-[#D4AF37]"
          >
            <div className="!w-16 !h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto text-[#D4AF37]">
              {item.icon}
            </div>

            <h3 className="text-2xl font-semibold !mt-6 !mb-3">{item.title}</h3>

            <p className="text-gray-500 leading-7">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
