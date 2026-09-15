import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import ContactFAQ from "../components/contact/ContactFAQ";

const Contact = () => {
  return (
    <main className="!min-h-screen !bg-[var(--color-background)]">
      <ContactHero />

      <section
        className="
          !mx-auto
          !max-w-7xl
          !px-5
          !py-16
          sm:!px-8
          sm:!py-20
          lg:!px-10
          lg:!py-24
        "
      >
        <div
          className="
            !grid
            !grid-cols-1
            !gap-8
            lg:!grid-cols-[0.85fr_1.15fr]
            lg:!gap-10
          "
        >
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <ContactMap />

      <ContactFAQ />
    </main>
  );
};

export default Contact;
