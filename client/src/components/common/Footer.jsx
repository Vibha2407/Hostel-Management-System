import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginRequiredModal from "./LoginRequiredModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const supportLinks = [
    {
      name: "My Bookings",
      action: "myBookings",
    },
    {
      name: "Facilities",
      path: "/about",
    },
    {
      name: "Hostel Rules",
      path: "/rules",
    },
    {
      name: "FAQs",
      path: "/contact",
    },
  ];

  const handleMyBookings = () => {
    if (loading) return;

    // User is not logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Admin
    if (user.role === "admin") {
      navigate("/admin/bookings");
      return;
    }

    // Customer
    if (user.role === "customer") {
      navigate("/customer/my-bookings");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="!relative !overflow-hidden !bg-[var(--color-surface)] !text-[var(--color-text-primary)] !transition-colors !duration-300">
      {/* ================= BACKGROUND ================= */}

      <div className="!pointer-events-none !absolute !inset-0 !overflow-hidden">
        {/* Ambient glow */}
        <div className="!absolute !-right-40 !-top-40 !h-[450px] !w-[450px] !rounded-full !bg-[var(--color-primary)]/[0.06] !blur-3xl" />

        <div className="!absolute !-left-40 !bottom-0 !h-[350px] !w-[350px] !rounded-full !bg-[var(--color-primary)]/[0.04] !blur-3xl" />

        {/* Top border glow */}
        <div className="!absolute !left-0 !right-0 !top-0 !h-px !bg-gradient-to-r !from-transparent !via-[var(--color-primary)]/50 !to-transparent" />
      </div>

      <div className="!relative !mx-auto !max-w-7xl !px-5 sm:!px-8 lg:!px-10">
        {/* ================= CTA ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="!border-b !border-[var(--color-border)] !py-14 sm:!py-16"
        >
          {/* CTA intentionally hidden for now */}
        </motion.div>

        {/* ================= MAIN ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="!grid !grid-cols-1 !gap-12 !py-14 sm:!py-16 md:!grid-cols-2 lg:!grid-cols-[1.5fr_1fr_1.2fr]"
        >
          {/* ================= BRAND ================= */}

          <div>
            <Link to="/" className="!group !inline-flex !items-center !gap-3">
              <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-[var(--color-primary)] !text-[#0B0D14] !shadow-[0_8px_25px_rgba(212,175,55,0.18)] !transition-transform !duration-300 group-hover:!rotate-3">
                <BedDouble size={22} strokeWidth={2.2} />
              </div>

              <div>
                <h3 className="!text-xl !font-bold !tracking-tight">
                  Hostel
                  <span className="!text-[var(--color-primary)]">Hub</span>
                </h3>

                <p className="!mt-0.5 !text-[10px] !uppercase !tracking-[0.2em] !text-[var(--color-text-muted)]">
                  Stay Easy • Live Better
                </p>
              </div>
            </Link>

            <p className="!mt-6 !max-w-sm !text-sm !leading-7 !text-[var(--color-text-secondary)]">
              A modern hostel management platform built to make finding, booking
              and managing your stay simple, secure and comfortable.
            </p>

            {/* Security */}

            <div className="!mt-7 !inline-flex !items-center !gap-3 !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-4 !py-3 !transition-colors !duration-300">
              <ShieldCheck size={19} className="!text-[var(--color-primary)]" />

              <div>
                <p className="!text-xs !font-semibold !text-[var(--color-text-primary)]">
                  Safe & Secure Stay
                </p>

                <p className="!mt-0.5 !text-[11px] !text-[var(--color-text-muted)]">
                  Designed for peace of mind
                </p>
              </div>
            </div>
          </div>

          {/* ================= SUPPORT ================= */}

          <div>
            <h3 className="!text-sm !font-semibold !uppercase !tracking-[0.18em] !text-[var(--color-text-primary)]">
              Support
            </h3>

            <ul className="!mt-6 !space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  {link.action === "myBookings" ? (
                    <button
                      type="button"
                      onClick={handleMyBookings}
                      className="!group !inline-flex !items-center !gap-1.5 !text-sm !text-[var(--color-text-secondary)] !transition-colors !duration-300 hover:!text-[var(--color-primary)]"
                    >
                      <span>{link.name}</span>

                      <ArrowUpRight
                        size={13}
                        className="!translate-y-1 !opacity-0 !transition-all !duration-300 group-hover:!translate-x-0.5 group-hover:!translate-y-0 group-hover:!opacity-100"
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className="!group !inline-flex !items-center !gap-1.5 !text-sm !text-[var(--color-text-secondary)] !transition-colors !duration-300 hover:!text-[var(--color-primary)]"
                    >
                      <span>{link.name}</span>

                      <ArrowUpRight
                        size={13}
                        className="!translate-y-1 !opacity-0 !transition-all !duration-300 group-hover:!translate-x-0.5 group-hover:!translate-y-0 group-hover:!opacity-100"
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT ================= */}

          <div>
            <h3 className="!text-sm !font-semibold !uppercase !tracking-[0.18em] !text-[var(--color-text-primary)]">
              Get in Touch
            </h3>

            <div className="!mt-6 !space-y-5">
              <div className="!flex !items-start !gap-3">
                <MapPin
                  size={18}
                  className="!mt-0.5 !shrink-0 !text-[var(--color-primary)]"
                />

                <p className="!text-sm !leading-6 !text-[var(--color-text-secondary)]">
                  123 Hostel Street,
                  <br />
                  Bhilai, Chhattisgarh, India
                </p>
              </div>

              <a
                href="tel:+919876543210"
                className="!flex !items-center !gap-3 !text-sm !text-[var(--color-text-secondary)] !transition-colors hover:!text-[var(--color-primary)]"
              >
                <Phone
                  size={17}
                  className="!shrink-0 !text-[var(--color-primary)]"
                />
                +91 98765 43210
              </a>

              <a
                href="mailto:info@hostelhub.com"
                className="!flex !items-center !gap-3 !text-sm !text-[var(--color-text-secondary)] !transition-colors hover:!text-[var(--color-primary)]"
              >
                <Mail
                  size={17}
                  className="!shrink-0 !text-[var(--color-primary)]"
                />
                info@hostelhub.com
              </a>

              <div className="!flex !items-start !gap-3">
                <Clock3
                  size={17}
                  className="!mt-0.5 !shrink-0 !text-[var(--color-primary)]"
                />

                <div>
                  <p className="!text-sm !text-[var(--color-text-primary)]">
                    Open Daily
                  </p>

                  <p className="!mt-1 !text-xs !text-[var(--color-text-muted)]">
                    8:00 AM — 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= BOTTOM ================= */}

        <div className="!flex !flex-col !gap-5 !border-t !border-[var(--color-border)] !py-7 sm:!flex-row sm:!items-center sm:!justify-between">
          <p className="!text-xs !text-[var(--color-text-muted)]">
            © {currentYear} HostelHub. All rights reserved.
          </p>

          <div className="!flex !items-center !gap-5">
            <Link
              to="/privacy-policy"
              className="!text-xs !text-[var(--color-text-muted)] !transition-colors hover:!text-[var(--color-primary)]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="!text-xs !text-[var(--color-text-muted)] !transition-colors hover:!text-[var(--color-primary)]"
            >
              Terms & Conditions
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-full !bg-[var(--color-primary)] !text-[#0B0D14] !transition-all !duration-300 hover:!-translate-y-1 !hover:bg-[var(--color-primary-hover)] hover:!shadow-[0_8px_25px_rgba(212,175,55,0.25)]"
          >
            <ChevronUp size={17} />
          </button>
        </div>
      </div>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </footer>
  );
};

export default Footer;
