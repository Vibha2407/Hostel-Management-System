import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { updateProfile } from "../../services/authService";
import toast from "react-hot-toast";
import { changePassword } from "../../services/authService";
import {
  ShieldCheck,
  Mail,
  Phone,
  User,
  CalendarDays,
  Pencil,
  Save,
  X,
  LockKeyhole,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [changingPassword, setChangingPassword] = useState(false);

  //   admin data from api
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      ullName: user?.fullName || "",
      phone: user?.phone || "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const data = await updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
      });

      setUser(data.user);
      setIsEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("UPDATE PROFILE ERROR", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      setChangingPassword(true);

      const data = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(data.message || "Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordModal(false);
    } catch (error) {
      console.log("CHANGE PASSWORD ERROR", error);

      toast.error(
        error.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="!min-h-screen !bg-[#FAF8F4] !text-[#2B1720] dark:!bg-[#080808] dark:!text-white !p-4 sm:!p-6 lg:!p-8">
      <div className="!mx-auto !max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="!mb-8"
        >
          <div className="!mb-2 !inline-flex !items-center !gap-2 !rounded-full !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !px-3 !py-1">
            <ShieldCheck size={14} className="!text-[#D4AF37]" />

            <span className="!text-[11px] !font-bold !uppercase !tracking-[0.2em] !text-[#D4AF37]">
              Administrator
            </span>
          </div>

          <h1 className="!text-3xl sm:!text-4xl !font-extrabold !tracking-tight">
            Admin Profile
          </h1>

          <p className="!mt-1 !text-sm !text-[#74656A] dark:!text-[#777777]">
            Manage your administrator account and personal information.
          </p>
        </motion.div>

        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="!relative !mb-6 !overflow-hidden !rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-sm"
        >
          {/* Background glow */}
          <div className="!pointer-events-none !absolute !-right-20 !-top-24 !h-64 !w-64 !rounded-full !bg-[#D4AF37]/10 !blur-[90px]" />

          <div className="!relative !p-6 sm:!p-8">
            <div className="!flex !flex-col sm:!flex-row sm:!items-center !gap-5">
              {/* Avatar */}
              <div className="!relative !flex !h-24 !w-24 !shrink-0 !items-center !justify-center !rounded-3xl !bg-gradient-to-br !from-[#4A1D2F] !via-[#351522] !to-[#24101A] !text-[#D4AF37] !shadow-xl !shadow-[#4A1D2F]/20">
                <ShieldCheck size={42} strokeWidth={1.8} />

                <span className="!absolute !bottom-1.5 !right-1.5 !flex !h-6 !w-6 !items-center !justify-center !rounded-full !border-2 !border-white dark:!border-[#111111] !bg-emerald-500">
                  <CheckCircle2 size={13} className="!text-white" />
                </span>
              </div>

              {/* Info */}
              <div className="!min-w-0 !flex-1">
                <div className="!flex !flex-wrap !items-center !gap-2">
                  <h2 className="!text-2xl !font-black !tracking-tight">
                    {user?.fullName || "Administrator"}
                  </h2>

                  <span className="!rounded-full !border !border-[#D4AF37]/30 !bg-[#D4AF37]/10 !px-2.5 !py-1 !text-[10px] !font-black !uppercase !tracking-wider !text-[#D4AF37]">
                    Admin
                  </span>
                </div>

                <p className="!mt-1 !text-sm !text-[#74656A] dark:!text-[#777777]">
                  {user?.email}
                </p>

                <div className="!mt-3 !flex !flex-wrap !items-center !gap-3">
                  <span className="!inline-flex !items-center !gap-1.5 !text-xs !font-semibold !text-emerald-500">
                    <span className="!h-2 !w-2 !rounded-full !bg-emerald-500" />
                    Active Account
                  </span>

                  <span className="!text-[#E8DED2] dark:!text-[#333333]">
                    |
                  </span>

                  <span className="!text-xs !font-medium !text-[#74656A] dark:!text-[#777777]">
                    Hostel Management
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="!inline-flex !items-center !justify-center !gap-2 !rounded-xl !bg-[#4A1D2F] !px-5 !py-3 !text-sm !font-bold !text-white !shadow-lg !shadow-[#4A1D2F]/15 !transition-all hover:!bg-[#351522] hover:!scale-[1.02]"
                >
                  <Pencil size={15} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="!grid !grid-cols-1 lg:!grid-cols-[1fr_340px] !gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="!rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !shadow-sm !overflow-hidden"
          >
            <div className="!flex !items-center !justify-between !border-b !border-[#E8DED2] dark:!border-[#292929] !px-6 !py-5">
              <div>
                <h3 className="!text-base !font-black">Personal Information</h3>

                <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#777777]">
                  Your administrator account details
                </p>
              </div>

              <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                <User size={18} />
              </div>
            </div>

            <div className="!p-6 !space-y-5">
              {/* Full Name */}
              <div>
                <label className="!mb-2 !block !text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                  Full Name
                </label>

                {isEditing ? (
                  <div className="!relative">
                    <User
                      size={17}
                      className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="!w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#080808] !py-3 !pl-11 !pr-4 !text-sm !font-semibold !outline-none focus:!border-[#D4AF37]"
                    />
                  </div>
                ) : (
                  <div className="!flex !items-center !gap-3 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#171717] !px-4 !py-3">
                    <User size={17} className="!text-[#D4AF37]" />

                    <span className="!text-sm !font-semibold">
                      {user?.fullName || "Administrator"}
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="!mb-2 !block !text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                  Email Address
                </label>

                <div className="!flex !items-center !gap-3 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#171717] !px-4 !py-3">
                  <Mail size={17} className="!text-[#D4AF37]" />

                  <span className="!truncate !text-sm !font-semibold">
                    {user?.email}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="!mb-2 !block !text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                  Phone Number
                </label>

                {isEditing ? (
                  <div className="!relative">
                    <Phone
                      size={17}
                      className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="!w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#080808] !py-3 !pl-11 !pr-4 !text-sm !font-semibold !outline-none focus:!border-[#D4AF37]"
                    />
                  </div>
                ) : (
                  <div className="!flex !items-center !gap-3 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#171717] !px-4 !py-3">
                    <Phone size={17} className="!text-[#D4AF37]" />

                    <span className="!text-sm !font-semibold">
                      {user?.phone || "Not added"}
                    </span>
                  </div>
                )}
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="!flex !flex-wrap !justify-end !gap-3 !border-t !border-[#E8DED2] dark:!border-[#292929] !pt-5">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="!inline-flex !items-center !gap-2 !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#171717] !px-5 !py-2.5 !text-sm !font-bold hover:!border-rose-400 hover:!text-rose-500"
                  >
                    <X size={15} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="!inline-flex !items-center !gap-2 !rounded-xl !bg-[#4A1D2F] !px-5 !py-2.5 !text-sm !font-bold !text-white hover:!bg-[#351522]"
                  >
                    <Save size={15} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="!space-y-6"
          >
            <div className="!rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-6 !shadow-sm">
              <h3 className="!text-base !font-black">Account Information</h3>

              <div className="!mt-5 !space-y-4">
                <div className="!flex !items-center !gap-3">
                  <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#D4AF37]/10 !text-[#D4AF37]">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      Account Role
                    </p>

                    <p className="!mt-0.5 !text-sm !font-black">
                      Administrator
                    </p>
                  </div>
                </div>

                <div className="!h-px !bg-[#E8DED2] dark:!bg-[#292929]" />

                <div className="!flex !items-center !gap-3">
                  <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-emerald-500/10 !text-emerald-500">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <p className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      Account Status
                    </p>

                    <p className="!mt-0.5 !text-sm !font-black !text-emerald-500">
                      Active
                    </p>
                  </div>
                </div>

                <div className="!h-px !bg-[#E8DED2] dark:!bg-[#292929]" />

                <div className="!flex !items-center !gap-3">
                  <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#4A1D2F]/10 !text-[#4A1D2F] dark:!text-[#D4AF37]">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="!text-[10px] !font-bold !uppercase !tracking-wider !text-[#74656A] dark:!text-[#777777]">
                      Account Type
                    </p>

                    <p className="!mt-0.5 !text-sm !font-black">
                      Hostel Management
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="!rounded-2xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-white dark:!bg-[#111111] !p-6 !shadow-sm">
              <div className="!flex !items-start !gap-3">
                <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#4A1D2F]/10 !text-[#4A1D2F] dark:!text-[#D4AF37]">
                  <LockKeyhole size={18} />
                </div>

                <div>
                  <h3 className="!text-sm !font-black">Account Security</h3>

                  <p className="!mt-1 !text-xs !leading-relaxed !text-[#74656A] dark:!text-[#777777]">
                    Keep your administrator credentials secure and update your
                    password regularly.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="!mt-5 !w-full !rounded-xl !border !border-[#E8DED2] dark:!border-[#292929] !bg-[#FAF8F4] dark:!bg-[#171717] !px-4 !py-3 !text-xs !font-bold !transition-all hover:!border-[#D4AF37] hover:!text-[#D4AF37]"
              >
                Change Password
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="!fixed !inset-0 !z-[100] !flex !items-center !justify-center !bg-black/60 !p-4 !backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="!w-full !max-w-md !rounded-2xl !border !border-[#E8DED2] !bg-white !p-6 !shadow-2xl dark:!border-[#292929] dark:!bg-[#111111]"
          >
            <div className="!mb-6 !flex !items-start !justify-between">
              <div>
                <h3 className="!text-xl !font-black">Change Password</h3>

                <p className="!mt-1 !text-xs !text-[#74656A] dark:!text-[#777777]">
                  Update your administrator account password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !text-[#74656A] hover:!bg-[#FAF8F4] hover:!text-rose-500 dark:hover:!bg-[#171717]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="!space-y-4">
              {/* Current Password */}
              <div>
                <label className="!mb-2 !block !text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                  Current Password
                </label>

                <div className="!relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="!w-full !rounded-xl !border !border-[#E8DED2] !bg-[#FAF8F4] !px-4 !py-3 !pr-11 !text-sm !font-semibold !outline-none focus:!border-[#D4AF37] dark:!border-[#292929] dark:!bg-[#080808]"
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="!absolute !right-3 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="!mb-2 !block !text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                  New Password
                </label>

                <div className="!relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="!w-full !rounded-xl !border !border-[#E8DED2] !bg-[#FAF8F4] !px-4 !py-3 !pr-11 !text-sm !font-semibold !outline-none focus:!border-[#D4AF37] dark:!border-[#292929] dark:!bg-[#080808]"
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="!absolute !right-3 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="!mb-2 !block !text-xs !font-bold !text-[#74656A] dark:!text-[#888888]">
                  Confirm New Password
                </label>

                <div className="!relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="!w-full !rounded-xl !border !border-[#E8DED2] !bg-[#FAF8F4] !px-4 !py-3 !pr-11 !text-sm !font-semibold !outline-none focus:!border-[#D4AF37] dark:!border-[#292929] dark:!bg-[#080808]"
                    placeholder="Confirm new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="!absolute !right-3 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="!flex !justify-end !gap-3 !border-t !border-[#E8DED2] !pt-5 dark:!border-[#292929]">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="!rounded-xl !border !border-[#E8DED2] !px-5 !py-2.5 !text-sm !font-bold hover:!border-rose-400 hover:!text-rose-500 dark:!border-[#292929]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="!rounded-xl !bg-[#4A1D2F] !px-5 !py-2.5 !text-sm !font-bold !text-white hover:!bg-[#351522] disabled:!cursor-not-allowed disabled:!opacity-60"
                >
                  {changingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
