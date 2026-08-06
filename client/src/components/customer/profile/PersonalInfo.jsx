import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Mail, Phone, MapPin, User, Calendar } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "./EditProfileModel";

const PersonalInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md !p-8 !mt-8">
      <div className="flex justify-between items-center !mb-8">
        <h2 className="text-2xl font-bold">Personal Information</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#D4AF37] text-white !px-6 !py-2 rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-2 !gap-8">
        {/* Full Name */}
        <div>
          <label className="text-gray-500 flex items-center !gap-2">
            <User size={18} />
            Full Name
          </label>

          <p className="!mt-2 text-lg font-semibold">
            {user?.fullName || "Not Available"}
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-500 flex items-center !gap-2">
            <Mail size={18} />
            Email
          </label>

          <p className="!mt-2 text-lg font-semibold">
            {user?.email || "Not Available"}
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="text-gray-500 flex items-center !gap-2">
            <Phone size={18} />
            Phone
          </label>

          <p className="!mt-2 text-lg font-semibold">
            {user?.phone || "Not Available"}
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="text-gray-500">Gender</label>

          <p className="!mt-2 text-lg font-semibold">
            {user?.gender || "Not Added"}
          </p>
        </div>

        {/* DOB */}
        <div>
          <label className="text-gray-500 flex items-center !gap-2">
            <Calendar size={18} />
            Date of Birth
          </label>

          <p className="!mt-2 text-lg font-semibold">
            {user?.dob ? new Date(user.dob).toLocaleDateString() : "Not Added"}
          </p>
        </div>

        {/* Address */}
        <div>
          <label className="text-gray-500 flex items-center !gap-2">
            <MapPin size={18} />
            Address
          </label>

          <p className="!mt-2 text-lg font-semibold">
            {user?.address || "Not Added"}
          </p>
        </div>
      </div>
      {open && (
        <EditProfileModal
          user={user}
          onClose={() => setOpen(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PersonalInfo;
