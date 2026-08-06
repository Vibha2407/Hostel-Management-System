const faq = [
  {
    q: "Can visitors stay overnight?",
    a: "No. Overnight visitors are not allowed.",
  },
  {
    q: "Can I change my room?",
    a: "Yes, with management approval.",
  },
  {
    q: "What if rent is delayed?",
    a: "Late payment charges may apply.",
  },
];

const RulesFAQ = () => {
  return (
    <section className="!max-w-5xl !mx-auto !px-6 !py-20">
      <h2 className="text-4xl font-bold text-center !mb-12">
        Frequently Asked Questions
      </h2>

      <div className="!space-y-6">
        {faq.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-xl !p-6">
            <h3 className="font-semibold text-lg">{item.q}</h3>

            <p className="text-gray-600 !mt-3">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RulesFAQ;
