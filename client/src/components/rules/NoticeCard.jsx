const NoticeCard = () => {
  return (
    <section className="max-w-5xl !mx-auto !px-6 !py-14">
      <div className="bg-yellow-100 border-l-8 border-[#D4AF37] rounded-xl !p-8">
        <h2 className="text-2xl font-bold !mb-3">Important Notice</h2>

        <p className="text-gray-700 !leading-8">
          Hostel management reserves the right to cancel hostel accommodation if
          any resident violates hostel rules, damages hostel property or creates
          inconvenience for other residents.
        </p>
      </div>
    </section>
  );
};

export default NoticeCard;
