const members = [
  {
    name: "A.K. Sharma",
    role: "Founder",
  },
  {
    name: "N. V. Singh",
    role: "Manager",
  },
  {
    name: "N.K. Verma",
    role: "Support Head",
  },
];

const Team = () => {
  return (
    <section className="!py-20 bg-gray-50">
      <div className="max-w-7xl !mx-auto !px-6">
        <h2 className="text-4xl font-bold text-center !mb-12">Meet Our Team</h2>

        <div className="grid md:grid-cols-3 !gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow !p-8 text-center"
            >
              <div className="!w-28 !h-28 bg-gray-300 rounded-full !mx-auto !mb-6"></div>

              <h3 className="text-2xl font-semibold">{member.name}</h3>

              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
