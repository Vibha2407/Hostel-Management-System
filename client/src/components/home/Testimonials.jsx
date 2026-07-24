import { motion } from "framer-motion";
import { Star } from "@mui/icons-material";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "The rooms are clean, food quality is excellent and the staff is very supportive. Highly recommended!",
  },
  {
    name: "Priya Verma",
    role: "College Student",
    review:
      "Very safe hostel for girls with CCTV, WiFi and comfortable rooms. I loved staying here.",
  },
  {
    name: "Amit Patel",
    role: "Working Professional",
    review:
      "Affordable pricing with premium facilities. Booking process was smooth and hassle-free.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#2C2C2C]">
            What Our Residents Say
          </h2>

          <p className="text-gray-500 mt-4">
            Trusted by students and working professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 border hover:border-[#D4AF37]"
            >
              <div className="flex text-[#D4AF37] mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fontSize="small" />
                ))}
              </div>

              <p className="text-gray-600 leading-7 mb-8">"{item.review}"</p>

              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>

                <p className="text-gray-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
