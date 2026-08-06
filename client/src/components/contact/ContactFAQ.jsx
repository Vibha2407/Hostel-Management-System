const faqs = [
  {
    q: "Can I visit before booking?",
    a: "Yes, you can visit the hostel during working hours.",
  },
  {
    q: "Is parking available?",
    a: "Yes, bike and scooty parking are available.",
  },
  {
    q: "Do you provide meals?",
    a: "Yes, healthy vegetarian and non-vegetarian meals are available.",
  },
];

const ContactFAQ = () => {
  return (
    <section className="!max-w-5xl !mx-auto !px-6 !py-20">
      <h2 className="text-4xl font-bold text-center !mb-12">
        Frequently Asked Questions
      </h2>

      <div className="!space-y-6">
        {faqs.map((item, index) => (
          <div key={index} className="bg-white rounded-xl !shadow !p-6">
            <h3 className="font-semibold text-lg">{item.q}</h3>

            <p className="text-gray-600 !mt-3">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactFAQ;
