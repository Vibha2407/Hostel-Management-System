import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="!py-20 bg-white">
      <div className="!max-w-7xl !mx-auto !px-6 grid md:grid-cols-2 !gap-10">
        <div className="bg-gray-50 !p-10 rounded-3xl shadow">
          <Target className="text-[#D4AF37] !mb-5" size={45} />

          <h2 className="text-3xl font-bold !mb-4">Our Mission</h2>

          <p className="text-gray-600 !leading-8">
            To provide students and working professionals with affordable,
            secure and premium hostel accommodation where they can focus on
            their studies and careers without worrying about comfort.
          </p>
        </div>

        <div className="bg-gray-50 !p-10 rounded-3xl shadow">
          <Eye className="text-[#D4AF37] !mb-5" size={45} />

          <h2 className="text-3xl font-bold !mb-4">Our Vision</h2>

          <p className="text-gray-600 !leading-8">
            To become India's most trusted hostel brand by providing modern
            living spaces, excellent facilities and exceptional customer
            service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
