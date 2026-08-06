import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

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

  return (
    <section className="!min-h-screen bg-gray-100 flex items-center justify-center !px-6 !py-12">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex bg-[#D4AF37] items-center justify-center text-white !p-12 ">
          <div>
            <h1 className="text-5xl font-bold !mb-6">
              Hostel Management System
            </h1>

            <p className="text-lg">
              Find your perfect hostel room with modern facilities, secure
              booking and hassle-free management.
            </p>
          </div>
        </div>

        <div className="!p-10">
          <h2 className="text-4xl font-bold !mb-2">Create Account</h2>

          <p className="text-gray-500 !mb-8">Register to continue</p>

          <form onSubmit={handleSubmit} className="!space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="!w-full border rounded-xl !p-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl !p-3"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-xl !p-3"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-xl !p-3"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <textarea
              rows={3}
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-xl !p-3"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl !p-3"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 !top-4"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-xl !p-3"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute !right-4 !top-4"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#D4AF37] text-white rounded-xl !py-3 font-semibold hover:bg-yellow-600 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center !mt-6">
            Already have an account?
            <Link to="/login" className="text-[#D4AF37] font-semibold !ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
