import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName}</h1>

      <p className="text-gray-600 mb-8">Admin Dashboard</p>

      <Link
        to="/admin/rooms"
        className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg"
      >
        Manage Rooms
      </Link>
    </div>
  );
};

export default AdminDashboard;
