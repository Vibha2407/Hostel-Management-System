import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <section className="!min-h-screen !bg-[var(--color-background)] !px-4 !py-10 !text-[var(--color-text-primary)] sm:!px-6 sm:!py-14 lg:!px-8">
      <div className="!mx-auto !w-full !max-w-4xl">
        {/* BACK */}

        <Link
          to="/"
          className="!mb-8 !inline-flex !items-center !gap-2 !text-sm !text-[var(--color-text-secondary)] !transition-colors hover:!text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="!mb-10"
        >
          <div className="!mb-4 !flex !items-center !gap-3">
            <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.06]">
              <ShieldCheck size={19} className="!text-[var(--color-primary)]" />
            </div>

            <span className="!text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--color-primary)]">
              Legal
            </span>
          </div>

          <h1 className="!text-3xl !font-semibold !tracking-tight sm:!text-4xl lg:!text-5xl">
            Privacy Policy
          </h1>

          <p className="!mt-4 !text-sm !leading-7 !text-[var(--color-text-secondary)]">
            Your privacy matters to us. This Privacy Policy explains how
            HostelHub collects, uses, and protects your information when you use
            our platform.
          </p>

          <p className="!mt-3 !text-xs !text-[var(--color-text-muted)]">
            Last updated: August 2026
          </p>
        </motion.div>

        {/* CONTENT */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="!space-y-8 !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-[var(--shadow-card)] sm:!p-8 lg:!p-10"
        >
          <PolicySection title="1. Introduction">
            <p>
              HostelHub is a hostel management platform designed to help users
              explore hostel information, view available rooms, and manage their
              bookings. By using HostelHub, you agree to the practices described
              in this Privacy Policy.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p>
              When you create an account or use our services, we may collect
              information such as your name, email address, phone number,
              gender, date of birth, address, and information related to your
              hostel bookings.
            </p>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p>
              We use the information we collect to provide and manage our
              services, process and manage bookings, maintain your account,
              communicate important service-related information, and improve the
              functionality and user experience of HostelHub.
            </p>
          </PolicySection>

          <PolicySection title="4. Booking Information">
            <p>
              Information associated with your bookings may be stored to help
              manage reservations, room allocation, check-in, check-out, and
              other hostel-related services.
            </p>
          </PolicySection>

          <PolicySection title="5. Cookies and Similar Technologies">
            <p>
              HostelHub may use browser storage or similar technologies to
              remember preferences and maintain essential application
              functionality. These technologies help provide a smoother user
              experience.
            </p>
          </PolicySection>

          <PolicySection title="6. Data Security">
            <p>
              We take reasonable measures to protect user information against
              unauthorized access, alteration, disclosure, or destruction.
              However, no method of storing or transmitting information over the
              internet can be guaranteed to be completely secure.
            </p>
          </PolicySection>

          <PolicySection title="7. Sharing of Information">
            <p>
              We do not sell your personal information. Information may be
              accessed or shared when necessary to provide HostelHub services,
              manage bookings, comply with applicable legal requirements, or
              protect the security and rights of users and the platform.
            </p>
          </PolicySection>

          <PolicySection title="8. Your Information and Choices">
            <p>
              You may review and update certain account information through your
              account settings. If you have questions about your personal
              information or want to request changes, you can contact us using
              the contact information provided on our website.
            </p>
          </PolicySection>

          <PolicySection title="9. Data Retention">
            <p>
              We retain account and booking information for as long as
              reasonably necessary to provide our services, maintain records,
              resolve disputes, and meet applicable legal or operational
              requirements.
            </p>
          </PolicySection>

          <PolicySection title="10. Third-Party Services">
            <p>
              HostelHub may use third-party services or technologies to support
              certain application features. Where applicable, those services may
              process information according to their own privacy policies and
              terms.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our services, technology, or legal requirements. Any
              changes will be reflected on this page along with an updated
              revision date.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact Us">
            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy, you can contact HostelHub through the contact
              information provided on our website.
            </p>
          </PolicySection>
        </motion.div>
      </div>
    </section>
  );
};

const PolicySection = ({ title, children }) => {
  return (
    <section>
      <h2 className="!text-base !font-semibold !text-[var(--color-text-primary)] sm:!text-lg">
        {title}
      </h2>

      <div className="!mt-3 !text-sm !leading-7 !text-[var(--color-text-secondary)]">
        {children}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
