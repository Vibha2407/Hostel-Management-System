import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      phone,
      gender,
      address,
      password,
      confirmPassword,
    } = formData;

    if (
      !fullName ||
      !email ||
      !phone ||
      !gender ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all required fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const payload = {
        fullName,
        email,
        phone,
        gender,
        address,
        password,
      };

      const data = await registerUser(payload);

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed.");
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
    !pr-4
    !text-sm
    !text-[var(--color-text-primary)]
    !outline-none
    !transition-all
    !duration-300
    placeholder:!text-[var(--color-text-muted)]
    hover:!border-[var(--color-primary)]/30
    focus:!border-[var(--color-primary)]
    focus:!bg-[var(--color-surface)]
    focus:!shadow-[0_0_0_4px_rgba(212,175,55,0.08)]
  `;

  const fieldVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const iconClasses = `
    !pointer-events-none
    !absolute
    !left-4
    !top-1/2
    !-translate-y-1/2
    !text-[var(--color-text-muted)]
    !transition-colors
    !duration-300
  `;

  return (
    <section
      className="
        !relative
        !min-h-[calc(100svh-80px)]
        !overflow-hidden
        !bg-[var(--color-background)]
        !px-4
        !py-8
        !text-[var(--color-text-primary)]
        sm:!px-6
        sm:!py-12
        lg:!px-8
        lg:!py-16
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          !pointer-events-none
          !absolute
          !-left-40
          !top-10
          !h-[28rem]
          !w-[28rem]
          !rounded-full
          !bg-[var(--color-primary)]/10
          !blur-[130px]
        "
      />

      <div
        className="
          !pointer-events-none
          !absolute
          !-right-40
          !bottom-0
          !h-[30rem]
          !w-[30rem]
          !rounded-full
          !bg-[var(--color-primary)]/8
          !blur-[140px]
        "
      />

      {/* Decorative gradient orb */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          !pointer-events-none
          !absolute
          !left-[8%]
          !top-[15%]
          !h-24
          !w-24
          !rounded-full
          !bg-[var(--color-primary)]/5
          !blur-2xl
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          !relative
          !z-10
          !mx-auto
          !max-w-6xl
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.98,
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
            !relative
            !grid
            !overflow-hidden
            !rounded-[2rem]
            !border
            !border-[var(--color-border)]
            !bg-[var(--color-surface)]
            !shadow-[var(--shadow-card)]
            lg:!grid-cols-[0.82fr_1.18fr]
          "
        >
          {/* =================================================
              LEFT PREMIUM PANEL
          ================================================= */}

          <div
            className="
              !relative
              !hidden
              !min-h-[720px]
              !overflow-hidden
              !border-r
              !border-[var(--color-border)]
              !p-10
              lg:!flex
              lg:!flex-col
              lg:!justify-between
              xl:!p-12
            "
          >
            {/* Gradient background */}

            <div
              className="
                !pointer-events-none
                !absolute
                !inset-0
                !bg-gradient-to-br
                !from-[var(--color-primary)]/15
                !via-transparent
                !to-transparent
              "
            />

            {/* Decorative circles */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                !pointer-events-none
                !absolute
                !-right-28
                !top-20
                !h-80
                !w-80
                !rounded-full
                !border
                !border-[var(--color-primary)]/15
              "
            />

            <div
              className="
                !pointer-events-none
                !absolute
                !-bottom-32
                !-left-32
                !h-96
                !w-96
                !rounded-full
                !border
                !border-[var(--color-primary)]/10
              "
            />

            <div className="!relative !z-10">
              {/* Badge */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="
                  !mb-9
                  !inline-flex
                  !items-center
                  !gap-2.5
                  !rounded-full
                  !border
                  !border-[var(--color-primary)]/25
                  !bg-[var(--color-primary)]/5
                  !px-4
                  !py-2
                  !text-[var(--color-primary)]
                  !backdrop-blur-md
                "
              >
                <Sparkles size={15} />

                <span
                  className="
                    !text-[10px]
                    !font-bold
                    !uppercase
                    !tracking-[0.22em]
                  "
                >
                  Join HostelHub
                </span>
              </motion.div>

              {/* Heading */}

              <h1
                className="
                  !max-w-md
                  !text-5xl
                  !font-bold
                  !leading-[1.02]
                  !tracking-[-0.04em]
                  xl:!text-6xl
                "
              >
                Find your
                <br />
                <span className="!text-[var(--color-primary)]">
                  comfortable
                </span>
                <br />
                stay.
              </h1>

              <p
                className="
                  !mt-7
                  !max-w-sm
                  !text-sm
                  !leading-7
                  !text-[var(--color-text-secondary)]
                "
              >
                Create your account and discover comfortable, secure and
                professionally managed hostel spaces designed around your
                lifestyle.
              </p>

              {/* Feature list */}

              {/* <div className="!mt-10 !space-y-4">
                {[
                  "Easy room discovery",
                  "Secure booking experience",
                  "Comfortable living spaces",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.55 + index * 0.1,
                      duration: 0.5,
                    }}
                    className="!flex !items-center !gap-3"
                  >
                    <span
                      className="
                        !flex
                        !h-7
                        !w-7
                        !shrink-0
                        !items-center
                        !justify-center
                        !rounded-full
                        !bg-[var(--color-primary)]/10
                        !text-[var(--color-primary)]
                      "
                    >
                      <CheckCircle2 size={15} />
                    </span>

                    <span
                      className="
                        !text-sm
                        !text-[var(--color-text-secondary)]
                      "
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div> */}
            </div>

            {/* Bottom */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.9,
              }}
              className="
                !relative
                !z-10
                !flex
                !items-center
                !gap-3
                !border-t
                !border-[var(--color-border)]
                !pt-6
              "
            >
              <ShieldCheck size={19} className="!text-[var(--color-primary)]" />

              <span
                className="
                  !text-xs
                  !font-medium
                  !text-[var(--color-text-secondary)]
                "
              >
                Safe booking • Secure account
              </span>
            </motion.div>
          </div>

          {/* =================================================
              FORM PANEL
          ================================================= */}

          <div
            className="
              !relative
              !p-6
              sm:!p-9
              lg:!p-10
              xl:!p-12
            "
          >
            {/* Top accent */}

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
                delay: 0.25,
                duration: 0.6,
              }}
            >
              <p
                className="
                  !mb-2
                  !text-[10px]
                  !font-bold
                  !uppercase
                  !tracking-[0.25em]
                  !text-[var(--color-primary)]
                "
              >
                Get Started
              </p>

              <h2
                className="
                  !text-3xl
                  !font-bold
                  !tracking-tight
                  sm:!text-4xl
                "
              >
                Create your
                <span className="!text-[var(--color-primary)]"> account.</span>
              </h2>

              <p
                className="
                  !mt-3
                  !max-w-md
                  !text-sm
                  !leading-6
                  !text-[var(--color-text-secondary)]
                "
              >
                Join HostelHub and find a place that feels like home.
              </p>
            </motion.div>

            {/* =================================================
                FORM
            ================================================= */}

            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
              className="!mt-8 !space-y-4"
            >
              {/* Full Name */}

              <motion.div
                custom={0}
                variants={fieldVariants}
                className="!relative"
              >
                <User size={17} className={iconClasses} />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </motion.div>

              {/* Email */}

              <motion.div
                custom={1}
                variants={fieldVariants}
                className="!relative"
              >
                <Mail size={17} className={iconClasses} />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </motion.div>

              {/* Phone + Gender */}

              <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2">
                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  className="!relative"
                >
                  <Phone size={17} className={iconClasses} />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </motion.div>

                <motion.div custom={3} variants={fieldVariants}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="
                      !w-full
                      !rounded-xl
                      !border
                      !border-[var(--color-border)]
                      !bg-[var(--color-surface-secondary)]
                      !px-4
                      !py-3.5
                      !text-sm
                      !text-[var(--color-text-primary)]
                      !outline-none
                      !transition-all
                      !duration-300
                      focus:!border-[var(--color-primary)]
                      focus:!shadow-[0_0_0_4px_rgba(212,175,55,0.08)]
                    "
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </motion.div>
              </div>

              {/* Address */}

              <motion.div
                custom={4}
                variants={fieldVariants}
                className="!relative"
              >
                <MapPin
                  size={17}
                  className="
                    !pointer-events-none
                    !absolute
                    !left-4
                    !top-4
                    !text-[var(--color-text-muted)]
                  "
                />

                <textarea
                  rows={3}
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`
                    ${inputClasses}
                    !resize-none
                    !pl-11
                  `}
                />
              </motion.div>

              {/* Password */}

              <motion.div
                custom={5}
                variants={fieldVariants}
                className="!relative"
              >
                <Lock size={17} className={iconClasses} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClasses} !pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="
                    !absolute
                    !right-4
                    !top-1/2
                    !-translate-y-1/2
                    !text-[var(--color-text-muted)]
                    !transition-colors
                    hover:!text-[var(--color-primary)]
                  "
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={showPassword ? "hide" : "show"}
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </motion.div>

              {/* Confirm Password */}

              <motion.div
                custom={6}
                variants={fieldVariants}
                className="!relative"
              >
                <Lock size={17} className={iconClasses} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${inputClasses} !pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="
                    !absolute
                    !right-4
                    !top-1/2
                    !-translate-y-1/2
                    !text-[var(--color-text-muted)]
                    !transition-colors
                    hover:!text-[var(--color-primary)]
                  "
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={showConfirmPassword ? "hide" : "show"}
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </motion.div>

              {/* Submit */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  y: loading ? 0 : -2,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
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
                  !py-4
                  !font-semibold
                  !text-[var(--color-on-primary)]
                  !shadow-[0_12px_30px_rgba(212,175,55,0.15)]
                  !transition-all
                  !duration-300
                  hover:!shadow-[0_18px_40px_rgba(212,175,55,0.22)]
                  disabled:!cursor-not-allowed
                  disabled:!opacity-50
                "
              >
                {/* Shine */}

                <span
                  className="
                    !absolute
                    !inset-y-0
                    !-left-full
                    !w-1/2
                    !skew-x-[-20deg]
                    !bg-white/25
                    !transition-all
                    !duration-700
                    group-hover:!left-[130%]
                  "
                />

                <span className="!relative !z-10">
                  {loading ? "Creating Account..." : "Create Account"}
                </span>

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="
                      !relative
                      !z-10
                      !transition-transform
                      !duration-300
                      group-hover:!translate-x-1
                    "
                  />
                )}
              </motion.button>
            </motion.form>

            {/* Login */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.9,
              }}
              className="
                !mt-7
                !text-center
                !text-sm
                !text-[var(--color-text-secondary)]
              "
            >
              Already have an account?
              <Link
                to="/login"
                className="
                  !ml-2
                  !font-semibold
                  !text-[var(--color-primary)]
                  !transition-opacity
                  hover:!opacity-75
                "
              >
                Sign In
              </Link>
            </motion.p>

            {/* Mobile security text */}

            <div
              className="
                !mt-6
                !flex
                !items-center
                !justify-center
                !gap-2
                lg:!hidden
              "
            >
              <ShieldCheck size={15} className="!text-[var(--color-primary)]" />

              <span
                className="
                  !text-[10px]
                  !font-medium
                  !uppercase
                  !tracking-wider
                  !text-[var(--color-text-muted)]
                "
              >
                Secure registration
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
