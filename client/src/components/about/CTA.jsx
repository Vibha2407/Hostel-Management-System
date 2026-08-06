import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="!py-20 bg-[#D4AF37] text-white">
      <div className="!max-w-5xl !mx-auto text-center !px-6">
        <h2 className="text-4xl font-bold !mb-6">
          Ready to Find Your Perfect Room?
        </h2>

        <p className="text-lg !mb-8">
          Book your stay today and enjoy a comfortable, secure, and affordable
          hostel experience.
        </p>

        <Link
          to="/rooms"
          className="bg-white !text-[#D4AF37] !px-8 !py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Browse Rooms
        </Link>
      </div>
    </section>
  );
};

export default CTA;
