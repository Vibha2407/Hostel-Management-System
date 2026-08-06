import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-r from-white via-gray-50 to-white !py-20">
      <div className="!max-w-7xl !mx-auto !px-6 grid lg:grid-cols-2 !gap-12 items-center">
        {/* Left */}
        <div>
          <p className="text-[#D4AF37] font-semibold uppercase tracking-widest !mb-4">
            About HostelHub
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Comfortable Living
            <br />
            for Students &<span className="text-[#D4AF37]"> Professionals</span>
          </h1>

          <p className="!mt-6 text-gray-600 leading-8">
            HostelHub provides modern accommodation with premium rooms, healthy
            food, high-speed WiFi, 24×7 security and everything required for a
            peaceful stay.
          </p>

          <div className="flex !gap-5 !mt-10">
            <Link
              to="/rooms"
              className="bg-[#D4AF37] text-white !px-8 !py-4 rounded-xl hover:bg-yellow-600 transition"
            >
              Explore Rooms
            </Link>

            <Link
              to="/contact"
              className="border border-[#D4AF37] text-[#D4AF37] !px-8 !py-4 rounded-xl hover:bg-[#D4AF37] hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1000"
            alt="Hostel"
            className="rounded-3xl shadow-2xl !w-full h-[550px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
