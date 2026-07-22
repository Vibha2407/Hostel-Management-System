import { useState } from "react";
import { loginUser } from "../../services/authService";
// import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const data = await loginUser(formData);

      console.log(data);

      toast.success(data.message);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 !px-4">
      <div className="bg-white shadow-xl rounded-2xl !p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center !mb-8">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="!space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg !p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg !p-3"
          />

          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-white !p-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
