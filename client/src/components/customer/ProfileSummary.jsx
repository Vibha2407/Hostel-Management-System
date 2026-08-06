import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileSummary = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-2xl shadow-md !p-8 !mt-10">
      <h2 className="text-2xl font-bold !mb-6">Profile Information</h2>

      <div className="grid !md:grid-cols-2 !gap-5">
        <div>
          <p className="text-gray-500">Full Name</p>
          <h3 className="font-semibold">{user?.fullName}</h3>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h3 className="font-semibold">{user?.email}</h3>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <h3 className="font-semibold">{user?.phone}</h3>
        </div>

        <div>
          <p className="text-gray-500">Role</p>
          <h3 className="font-semibold">{user?.role}</h3>
        </div>
      </div>

      <button className="!mt-8 bg-[#D4AF37] text-white !px-6 !py-3 rounded-xl">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSummary;
