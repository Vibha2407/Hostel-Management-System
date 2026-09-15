import { useState } from "react";
import { X } from "lucide-react";
import { updateProfile } from "../../../services/customerService";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob ? user.dob.substring(0, 10) : "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(formData);

      alert(response.message);

      onSave(response.user);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl !w-full !max-w-2xl !p-8 relative">
        <button onClick={onClose} className="absolute !top-5 right-5">
          <X />
        </button>

        <h2 className="text-3xl font-bold !mb-8">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 !gap-6">
          <div>
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg !p-3 !mt-2"
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="!w-full border rounded-lg !p-3 !mt-2"
            />
          </div>

          <div>
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="!w-full border rounded-lg !p-3 !mt-2"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* <div>
            <label>Date of Birth</label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="!w-full border rounded-lg !p-3 !mt-2"
            />
          </div> */}

          <div className="md:col-span-2">
            <label>Address</label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="!w-full border rounded-lg !p-3 !mt-2"
            />
          </div>

          <div className="md:col-span-2 flex justify-end !gap-4">
            <button
              type="button"
              onClick={onClose}
              className="border !px-6 !py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#D4AF37] text-white !px-8 !py-3 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
