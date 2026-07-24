import {
  Wifi,
  LocalLaundryService,
  Restaurant,
  LocalParking,
  LocalCafe,
  Security,
  ElectricBolt,
  HotTub,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const facilities = [
  {
    icon: <Wifi fontSize="large" />,
    title: "Free WiFi",
  },
  {
    icon: <Restaurant fontSize="large" />,
    title: "Healthy Food",
  },
  {
    icon: <LocalLaundryService fontSize="large" />,
    title: "Laundry",
  },
  {
    icon: <LocalParking fontSize="large" />,
    title: "Parking",
  },
  {
    icon: <LocalCafe fontSize="large" />,
    title: "Juice Corner",
  },
  {
    icon: <Security fontSize="large" />,
    title: "24×7 CCTV",
  },
  {
    icon: <ElectricBolt fontSize="large" />,
    title: "Power Backup",
  },
  {
    icon: <HotTub fontSize="large" />,
    title: "Hot Water",
  },
];

const Facilities = () => {
  return (
    <section className="bg-gray-50 !py-20">
      <div className="max-w-7xl !mx-auto !px-6">
        <div className="text-center !mb-14">
          <h2 className="text-4xl font-bold text-[#2C2C2C]">
            Premium Facilities
          </h2>

          <p className="text-gray-500 !mt-4">
            Everything you need for a comfortable hostel life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 !gap-8">
          {facilities.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md !p-8 text-center border hover:border-[#D4AF37]"
            >
              <div className="text-[#D4AF37] !mb-5">{item.icon}</div>

              <h3 className="font-semibold text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
