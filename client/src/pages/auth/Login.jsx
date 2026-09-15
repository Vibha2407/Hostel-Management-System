import { useState, useContext } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(formData);

      const profile = await fetchProfile();

      toast.success("Login Successful");

      if (profile.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `
    !w-full
    !rounded-xl
    !border
    !border-[var(--color-border)]
    !bg-[var(--color-surface-secondary)]
    !py-3.5
    !pl-11
    !pr-11
    !text-sm
    !text-[var(--color-text-primary)]
    !outline-none
    !transition-all
    !duration-300
    placeholder:!text-[var(--color-text-muted)]
    focus:!border-[var(--color-primary)]
    focus:!bg-[var(--color-surface)]
    focus:!ring-1
    focus:!ring-[var(--color-primary)]/30
  `;

  return (
    <section
      className="
        !relative
        !min-h-[calc(100svh-80px)]
        !overflow-hidden
        !bg-[var(--color-background)]
        !text-[var(--color-text-primary)]
      "
    >
      {/* ================= AMBIENT BACKGROUND ================= */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-left-40
          !top-20
          !h-96
          !w-96
          !rounded-full
          !bg-[var(--color-primary)]/10
          !blur-[140px]
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-40
          !bottom-0
          !h-96
          !w-96
          !rounded-full
          !bg-[var(--color-primary)]/10
          !blur-[140px]
        "
      />

      {/* Subtle center glow */}

      <div
        className="
          !pointer-events-none
          !absolute
          !left-1/2
          !top-1/2
          !h-80
          !w-80
          !-translate-x-1/2
          !-translate-y-1/2
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-[120px]
        "
      />

      {/* ================= MAIN CONTAINER ================= */}

      <div
        className="
          !relative
          !z-10
          !mx-auto
          !flex
          !min-h-[calc(100svh-80px)]
          !max-w-7xl
          !items-center
          !justify-center
          !px-5
          !py-12
          sm:!px-8
          lg:!py-16
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            !grid
            !w-full
            !max-w-5xl
            !overflow-hidden
            !rounded-[2rem]
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]
            !shadow-[var(--shadow-card)]
            lg:!grid-cols-2
          "
        >
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div
            className="
              !relative
              !hidden
              !overflow-hidden
              !p-12
              lg:!flex
              lg:!min-h-[620px]
              lg:!flex-col
              lg:!justify-between
            "
          >
            {/* Premium gradient */}

            <div
              className="
                !pointer-events-none
                !absolute
                !inset-0
                !bg-gradient-to-br
                !from-[var(--color-primary)]/20
                !via-[var(--color-surface-secondary)]
                !to-[var(--color-background)]
              "
            />

            {/* Decorative circles */}

            <div
              className="
                !pointer-events-none
                !absolute
                !right-[-110px]
                !top-[-110px]
                !h-80
                !w-80
                !rounded-full
                !border
                !border-[var(--color-primary)]/20
              "
            />

            <div
              className="
                !pointer-events-none
                !absolute
                !bottom-[-140px]
                !left-[-120px]
                !h-96
                !w-96
                !rounded-full
                !border
                !border-[var(--color-primary)]/10
              "
            />

            <div
              className="
                !pointer-events-none
                !absolute
                !right-16
                !top-1/2
                !h-32
                !w-32
                !rounded-full
                !bg-[var(--color-primary)]/10
                !blur-3xl
              "
            />

            {/* Content */}

            <div className="!relative !z-10">
              <div
                className="
                  !mb-8
                  !inline-flex
                  !items-center
                  !gap-2
                  !rounded-full
                  !border
                  !border-[var(--color-primary)]/30
                  !bg-[var(--color-primary)]/5
                  !px-4
                  !py-2
                "
              >
                <Sparkles size={15} className="!text-[var(--color-primary)]" />

                <span
                  className="
                    !text-xs
                    !font-semibold
                    !uppercase
                    !tracking-[0.2em]
                    !text-[var(--color-primary)]
                  "
                >
                  Welcome Back
                </span>
              </div>

              <h1
                className="
                  !max-w-md
                  !text-5xl
                  !font-bold
                  !leading-[1.08]
                  !tracking-[-0.04em]
                  !text-[var(--color-text-primary)]
                "
              >
                Your comfortable stay
                <br />
                <span className="!text-[var(--color-primary)]">
                  starts here.
                </span>
              </h1>

              <p
                className="
                  !mt-6
                  !max-w-md
                  !text-base
                  !leading-7
                  !text-[var(--color-text-secondary)]
                "
              >
                Sign in to manage your bookings, explore rooms and enjoy a
                seamless hostel experience.
              </p>
            </div>

            {/* Bottom */}

            <div
              className="
                !relative
                !z-10
                !flex
                !items-center
                !gap-3
                !text-sm
                !text-[var(--color-text-secondary)]
              "
            >
              <div
                className="
                  !flex
                  !h-9
                  !w-9
                  !items-center
                  !justify-center
                  !rounded-full
                  !border
                  !border-[var(--color-primary)]/20
                  !bg-[var(--color-primary)]/10
                "
              >
                <ShieldCheck
                  size={18}
                  className="!text-[var(--color-primary)]"
                />
              </div>

              <span>Secure & comfortable living</span>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div
            className="
              !relative
              !p-7
              sm:!p-10
              lg:!p-12
            "
          >
            {/* Small top accent */}

            <div
              className="
                !absolute
                !left-0
                !top-0
                !h-1
                !w-full
                !bg-gradient-to-r
                !from-transparent
                !via-[var(--color-primary)]
                !to-transparent
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
            >
              <p
                className="
                  !mb-2
                  !text-xs
                  !font-semibold
                  !uppercase
                  !tracking-[0.2em]
                  !text-[var(--color-primary)]
                "
              >
                Welcome Back
              </p>

              <h2
                className="
                  !text-3xl
                  !font-bold
                  !tracking-tight
                  !text-[var(--color-text-primary)]
                  sm:!text-4xl
                "
              >
                Sign in
              </h2>

              <p
                className="
                  !mt-3
                  !text-sm
                  !text-[var(--color-text-secondary)]
                "
              >
                Continue your journey with us.
              </p>
            </motion.div>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit} className="!mt-8 !space-y-5">
              {/* Email */}

              <div>
                <label
                  className="
                    !mb-2
                    !block
                    !text-sm
                    !font-medium
                    !text-[var(--color-text-secondary)]
                  "
                >
                  Email Address
                </label>

                <div className="!relative">
                  <Mail
                    size={18}
                    className="
                      !pointer-events-none
                      !absolute
                      !left-4
                      !top-1/2
                      !-translate-y-1/2
                      !text-[var(--color-text-muted)]
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  className="
                    !mb-2
                    !block
                    !text-sm
                    !font-medium
                    !text-[var(--color-text-secondary)]
                  "
                >
                  Password
                </label>

                <div className="!relative">
                  <Lock
                    size={18}
                    className="
                      !pointer-events-none
                      !absolute
                      !left-4
                      !top-1/2
                      !-translate-y-1/2
                      !text-[var(--color-text-muted)]
                    "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClasses}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="
                      !absolute
                      !right-3
                      !top-1/2
                      !-translate-y-1/2
                      !rounded-lg
                      !p-1.5
                      !text-[var(--color-text-muted)]
                      !transition-colors
                      hover:!text-[var(--color-primary)]
                    "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Button */}

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={loading}
                className="
                  !group
                  !relative
                  !mt-3
                  !flex
                  !w-full
                  !items-center
                  !justify-center
                  !gap-2
                  !overflow-hidden
                  !rounded-xl
                  !bg-[var(--color-primary)]
                  !py-3.5
                  !font-semibold
                  !text-[var(--color-background)]
                  !shadow-[0_10px_30px_rgba(212,175,55,0.15)]
                  !transition-all
                  !duration-300
                  hover:!bg-[var(--color-primary-hover)]
                  hover:!shadow-[0_16px_40px_rgba(212,175,55,0.22)]
                  disabled:!cursor-not-allowed
                  disabled:!opacity-60
                "
              >
                {/* Shine */}

                {!loading && (
                  <span
                    className="
                      !absolute
                      !inset-y-0
                      !-left-10
                      !w-8
                      !rotate-12
                      !bg-white/40
                      !blur-sm
                      !transition-all
                      !duration-700
                      group-hover:!left-[120%]
                    "
                  />
                )}

                {loading ? (
                  <>
                    <span
                      className="
                        !h-4
                        !w-4
                        !animate-spin
                        !rounded-full
                        !border-2
                        !border-current
                        !border-t-transparent
                      "
                    />

                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="!relative">Sign In</span>

                    <ArrowRight
                      size={18}
                      className="
                        !relative
                        !transition-transform
                        !duration-300
                        group-hover:!translate-x-1
                      "
                    />
                  </>
                )}
              </motion.button>
            </form>

            {/* Register */}

            <div
              className="
                !mt-8
                !text-center
                !text-sm
                !text-[var(--color-text-secondary)]
              "
            >
              Don't have an account?
              <Link
                to="/register"
                className="
                  !ml-2
                  !font-semibold
                  !text-[var(--color-primary)]
                  !transition-colors
                  hover:!text-[var(--color-primary-hover)]
                "
              >
                Create Account
              </Link>
            </div>

            {/* Bottom detail */}

            <div
              className="
                !mt-8
                !flex
                !items-center
                !justify-center
                !gap-2
                !border-t
                !border-[var(--color-border)]
                !pt-6
                !text-[10px]
                !font-medium
                !uppercase
                !tracking-[0.2em]
                !text-[var(--color-text-muted)]
              "
            >
              <span>HostelHub</span>

              <span
                className="
                  !h-1
                  !w-1
                  !rounded-full
                  !bg-[var(--color-primary)]
                "
              />

              <span>Secure Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
