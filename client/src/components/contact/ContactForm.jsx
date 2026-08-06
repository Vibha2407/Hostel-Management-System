const ContactForm = () => {
  return (
    <form className="bg-white shadow-lg rounded-2xl !p-8">
      <h2 className="text-3xl font-bold !mb-8">Send a Message</h2>

      <div className="!space-y-5">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg !p-3"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded-lg !p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border rounded-lg !p-3"
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full border rounded-lg !p-3"
        />

        <textarea
          rows={6}
          placeholder="Write your message..."
          className="w-full border rounded-lg !p-3"
        />

        <button className="!w-full bg-[#D4AF37] text-white !py-4 rounded-lg hover:bg-yellow-600 transition">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
