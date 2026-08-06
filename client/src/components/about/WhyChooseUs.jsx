const reasons = [
  "Affordable Pricing",
  "Premium Rooms",
  "Safe Environment",
  "24x7 CCTV",
  "Healthy Meals",
  "Professional Staff",
];

const WhyChooseUs = () => {
  return (
    <section className="!py-20">
      <div className="!max-w-7xl !mx-auto !px-6">
        <h2 className="text-4xl font-bold text-center !mb-14">
          Why Choose HostelHub?
        </h2>

        <div className="grid md:grid-cols-2 !gap-6">
          {reasons.map((item, index) => (
            <div key={index} className="bg-gray-50 !p-6 rounded-xl shadow">
              ✅ {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
