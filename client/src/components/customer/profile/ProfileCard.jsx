import { UserCircle2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ProfileCard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-2xl shadow-md !p-8">
      <div className="flex items-center !gap-6">
        <UserCircle2 size={110} className="text-[#D4AF37]" />

        <div>
          <h2 className="text-3xl font-bold">{user?.fullName}</h2>

          <p className="text-gray-500 !mt-2">Customer ID</p>

          <h3 className="font-semibold">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Not Available"}
          </h3>

          <p className="text-gray-500 !mt-4">Member Since</p>

          <h3 className="font-semibold">
            {new Date(user?.createdAt).toLocaleDateString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
