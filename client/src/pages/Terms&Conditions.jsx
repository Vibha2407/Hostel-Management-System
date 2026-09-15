import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <section className="!min-h-screen !bg-[var(--color-background)] !px-4 !py-10 !text-[var(--color-text-primary)] sm:!px-6 sm:!py-14 lg:!px-8">
      <div className="!mx-auto !w-full !max-w-4xl">
        {/* BACK TO HOME */}

        <Link
          to="/"
          className="!mb-8 !inline-flex !items-center !gap-2 !text-sm !text-[var(--color-text-secondary)] !transition-colors hover:!text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="!mb-10"
        >
          <div className="!mb-4 !flex !items-center !gap-3">
            <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.06]">
              <FileText size={19} className="!text-[var(--color-primary)]" />
            </div>

            <span className="!text-xs !font-semibold !uppercase !tracking-[0.2em] !text-[var(--color-primary)]">
              Legal
            </span>
          </div>

          <h1 className="!text-3xl !font-semibold !tracking-tight sm:!text-4xl lg:!text-5xl">
            Terms & Conditions
          </h1>

          <p className="!mt-4 !text-sm !leading-7 !text-[var(--color-text-secondary)]">
            These Terms & Conditions explain the rules and conditions that apply
            when you use HostelHub and its hostel management services.
          </p>

          <p className="!mt-3 !text-xs !text-[var(--color-text-muted)]">
            Last updated: August 2026
          </p>
        </motion.div>

        {/* CONTENT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.6,
          }}
          className="!space-y-8 !rounded-2xl !border !border-[var(--color-border)] !bg-[var(--color-surface)] !p-6 !shadow-[var(--shadow-card)] sm:!p-8 lg:!p-10"
        >
          <TermsSection title="1. Acceptance of Terms">
            <p>
              By accessing or using HostelHub, you agree to comply with these
              Terms & Conditions. If you do not agree with any part of these
              terms, please do not use the platform.
            </p>
          </TermsSection>

          <TermsSection title="2. About HostelHub">
            <p>
              HostelHub is a hostel management platform that allows users to
              explore hostel information, view available rooms, create bookings,
              and manage information related to their stays.
            </p>
          </TermsSection>

          <TermsSection title="3. User Account">
            <p>
              Users may need to create an account to access certain features of
              HostelHub. You are responsible for providing accurate information
              and keeping your account information up to date.
            </p>

            <p className="!mt-3">
              You are also responsible for maintaining the confidentiality of
              your account credentials and for activities carried out through
              your account.
            </p>
          </TermsSection>

          <TermsSection title="4. Eligibility">
            <p>
              You must provide accurate information when registering for an
              account. HostelHub may restrict or refuse access where the
              information provided is inaccurate, misleading, or violates
              applicable requirements.
            </p>
          </TermsSection>

          <TermsSection title="5. Hostel and Room Bookings">
            <p>
              Users may select available hostel rooms and submit booking
              requests through the platform. A booking is subject to
              availability and confirmation through HostelHub.
            </p>

            <p className="!mt-3">
              Users are responsible for reviewing the selected hostel, room
              type, dates, and other booking information before confirming a
              reservation.
            </p>
          </TermsSection>

          <TermsSection title="6. Booking Confirmation">
            <p>
              A booking is considered confirmed only when the platform indicates
              that the reservation has been successfully confirmed. Availability
              may change before a booking is confirmed.
            </p>
          </TermsSection>

          <TermsSection title="7. Cancellation">
            <p>
              Cancellation of a booking is subject to the cancellation rules
              applicable to that booking. Users should review the relevant
              booking information before cancelling a reservation.
            </p>
          </TermsSection>

          <TermsSection title="8. Check-In and Check-Out">
            <p>
              Users must follow the applicable check-in and check-out procedures
              provided by the hostel. Users may be required to provide valid
              information or identification when checking in.
            </p>
          </TermsSection>

          <TermsSection title="9. Hostel Rules and Responsibilities">
            <p>
              Users must follow the rules and regulations of the hostel during
              their stay. This includes respecting hostel property, staff, other
              residents, and applicable safety requirements.
            </p>

            <p className="!mt-3">
              Users must not engage in activities that may cause damage,
              disturbance, or harm to the hostel, its residents, staff, or
              property.
            </p>
          </TermsSection>

          <TermsSection title="10. Property Damage">
            <p>
              Users may be responsible for damage caused to hostel property,
              facilities, furniture, equipment, or other assets due to their
              actions or negligence, subject to applicable hostel policies.
            </p>
          </TermsSection>

          <TermsSection title="11. Payments and Charges">
            <p>
              Where payment is required for a booking or service, the user is
              responsible for completing the applicable payment according to the
              information provided during the booking process.
            </p>

            <p className="!mt-3">
              Any applicable charges, refunds, or payment conditions may depend
              on the specific booking and the policies associated with it.
            </p>
          </TermsSection>

          <TermsSection title="12. Prohibited Activities">
            <p>
              Users must not use HostelHub for unlawful activities, fraudulent
              bookings, unauthorized access, misuse of another person's account,
              or activities that may harm the platform or other users.
            </p>
          </TermsSection>

          <TermsSection title="13. Platform Availability">
            <p>
              We aim to keep HostelHub available and functional, but we cannot
              guarantee uninterrupted access at all times. The platform may
              occasionally be unavailable because of maintenance, technical
              issues, updates, or circumstances beyond our control.
            </p>
          </TermsSection>

          <TermsSection title="14. User Information">
            <p>
              Users are responsible for ensuring that information submitted to
              HostelHub is accurate and belongs to them or that they have the
              appropriate permission to provide it.
            </p>
          </TermsSection>

          <TermsSection title="15. Privacy">
            <p>
              Your use of HostelHub is also subject to our Privacy Policy, which
              explains how information is collected, used, and protected.
            </p>

            <Link
              to="/privacy-policy"
              className="!mt-3 !inline-flex !text-sm !font-medium !text-[var(--color-primary)] hover:!underline"
            >
              Read our Privacy Policy
            </Link>
          </TermsSection>

          <TermsSection title="16. Account Suspension or Termination">
            <p>
              HostelHub may restrict, suspend, or terminate access to an account
              if the user violates these Terms & Conditions, misuses the
              platform, or engages in activities that may harm the platform or
              other users.
            </p>
          </TermsSection>

          <TermsSection title="17. Limitation of Liability">
            <p>
              HostelHub is not responsible for losses or damages resulting from
              circumstances outside its reasonable control, interruptions to the
              platform, or actions of users or third parties.
            </p>
          </TermsSection>

          <TermsSection title="18. Changes to These Terms">
            <p>
              We may update these Terms & Conditions from time to time. Changes
              will be reflected on this page along with an updated revision
              date. Continued use of HostelHub after changes are published
              indicates acceptance of the updated terms.
            </p>
          </TermsSection>

          <TermsSection title="19. Contact Us">
            <p>
              If you have questions regarding these Terms & Conditions, you can
              contact HostelHub through the contact information provided on our
              website.
            </p>
          </TermsSection>
        </motion.div>
      </div>
    </section>
  );
};

const TermsSection = ({ title, children }) => {
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

export default TermsAndConditions;
