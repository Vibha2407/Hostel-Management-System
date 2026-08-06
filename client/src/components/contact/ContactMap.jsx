const ContactMap = () => {
  return (
    <section className="!max-w-7xl !mx-auto !px-6 !py-16">
      <h2 className="text-4xl font-bold text-center !mb-10">Find Us</h2>

      <div className="rounded-2xl overflow-hidden shadow-lg">
        <iframe
          title="Hostel Location"
          src="https://www.google.com/maps?q=Bhilai&output=embed"
          className="!w-full h-[500px]"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ContactMap;
