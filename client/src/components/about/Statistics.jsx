const stats = [
  {
    number: "500+",
    title: "Happy Residents",
  },
  {
    number: "120",
    title: "Premium Rooms",
  },
  {
    number: "10+",
    title: "Facilities",
  },
  {
    number: "24/7",
    title: "Security",
  },
];

const Statistics = () => {
  return (
    <section className="!py-20 bg-[#D4AF37] text-white">
      <div className="max-w-7xl !mx-auto !px-6 grid md:grid-cols-4 !gap-8">
        {stats.map((item, index) => (
          <div key={index} className="text-center">
            <h2 className="text-5xl font-bold">{item.number}</h2>

            <p className="!mt-4 text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
