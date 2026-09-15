import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="!min-h-screen !bg-[#FAF8F4] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="!text-8xl !font-bold !text-[#080808] !mb-4">404</div>

        <h1 className="!text-2xl !font-bold !text-[#080808] !mb-3">
          Page Not Found
        </h1>

        <p className="!text-[#74656A] !mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="!px-5 !py-3 !rounded-xl !border !border-[#E8DED2] !bg-white !text-[#080808] !font-semibold hover:!bg-[#F5F0EA] transition-all flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          {/* <button
            onClick={() => navigate("/")}
            className="!px-5 !py-3 !rounded-xl !bg-[#080808] !text-white !font-semibold hover:!opacity-90 transition-all flex items-center gap-2"
          >
            <Home size={18} />
            Home
          </button> */}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
