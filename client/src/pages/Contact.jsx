import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import ContactFAQ from "../components/contact/ContactFAQ";

const Contact = () => {
  return (
    <>
      <ContactHero />

      <section className="max-w-7xl !mx-auto !px-6 !py-20">
        <div className="grid lg:grid-cols-2 !gap-10">
          <ContactInfo />

          <ContactForm />
        </div>
      </section>

      <ContactMap />

      <ContactFAQ />
    </>
  );
};

export default Contact;
