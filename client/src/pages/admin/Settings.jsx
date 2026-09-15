import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";

import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  User,
  ShieldCheck,
  Bell,
  LockKeyhole,
  LogOut,
  ChevronRight,
  Check,
  CalendarDays,
  Pencil,
  Save,
  X,
} from "lucide-react";

import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../services/authService";

const Settings = () => {
  const { mode, setMode } = useContext(ThemeContext);
  const { user, setUser } = useContext(AuthContext);

  // =====================================================
  // PROFILE STATE
  // =====================================================

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // =====================================================
  // THEME OPTIONS
  // =====================================================

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      description: "Clean and bright appearance",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Easy on the eyes",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Follow your device settings",
      icon: Monitor,
    },
  ];

  // =====================================================
  // LOAD USER DATA INTO FORM
  // =====================================================

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        gender: user.gender || "",
        dob: user.dob ? user.dob.substring(0, 10) : "",
        address: user.address || "",
      });
    }
  }, [user]);

  // =====================================================
  // HANDLE PROFILE INPUT
  // =====================================================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN EDIT MODE
  // =====================================================

  const handleEditProfile = () => {
    setProfileForm({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      dob: user?.dob ? user.dob.substring(0, 10) : "",
      address: user?.address || "",
    });

    setIsEditingProfile(true);
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {
    setProfileForm({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      dob: user?.dob ? user.dob.substring(0, 10) : "",
      address: user?.address || "",
    });

    setIsEditingProfile(false);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);

      const data = await updateProfile(profileForm);

      setUser(data.user);

      setIsEditingProfile(false);

      alert(data.message || "Profile updated successfully.");
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile. Please try again.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <section className="!relative !min-h-screen !overflow-hidden !bg-[var(--color-background)] !px-1 !text-[var(--color-text-primary)] !transition-colors !duration-500">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="!pointer-events-none !fixed !inset-0 !overflow-hidden">
        <div className="!absolute !-right-40 !-top-40 !h-[500px] !w-[500px] !rounded-full !bg-[var(--color-primary)]/[0.06] !blur-[120px]" />

        <div className="!absolute !-left-40 !top-[45%] !h-[450px] !w-[450px] !rounded-full !bg-[var(--color-primary)]/[0.03] !blur-[120px]" />

        <div className="!absolute !bottom-0 !right-[20%] !h-[300px] !w-[300px] !rounded-full !bg-[var(--color-text-primary)]/[0.015] !blur-[100px]" />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="!relative !z-10 !mx-auto !w-full !max-w-6xl !px-3 !py-6 sm:!px-6 sm:!py-8 lg:!px-8 lg:!py-10">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="!mb-8 sm:!mb-10"
        >
          <div className="!mb-4 !flex !items-center !gap-2">
            <SettingsIcon size={15} className="!text-[var(--color-primary)]" />

            <span className="!text-[10px] !font-semibold !uppercase !tracking-[0.3em] !text-[var(--color-primary)]">
              Account Settings
            </span>
          </div>

          <h1 className="!text-3xl !font-semibold !tracking-[-0.03em] !text-[var(--color-text-primary)] sm:!text-4xl lg:!text-5xl">
            Settings
          </h1>

          <p className="!mt-3 !max-w-xl !text-sm !leading-6 !text-[var(--color-text-secondary)] sm:!text-base">
            Manage your account, appearance and preferences.
          </p>
        </motion.div>

        {/* =====================================================
            PROFILE
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 0.6,
          }}
          className="!mb-6 !overflow-hidden !rounded-[1.5rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)]"
        >
          {/* PROFILE HEADER */}

          <div className="!border-b !border-[var(--color-border)] !px-5 !py-5 sm:!px-7">
            <div className="!flex !items-center !justify-between !gap-4">
              {/* LEFT */}

              <div className="!flex !min-w-0 !items-center !gap-3">
                <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.06]">
                  <User size={18} className="!text-[var(--color-primary)]" />
                </div>

                <div className="!min-w-0">
                  <h2 className="!text-sm !font-semibold !text-[var(--color-text-primary)]">
                    Profile
                  </h2>

                  <p className="!mt-0.5 !text-xs !text-[var(--color-text-secondary)]">
                    Your account information
                  </p>
                </div>
              </div>

              {/* RIGHT */}

              {!isEditingProfile ? (
                <motion.button
                  type="button"
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={handleEditProfile}
                  className="!flex !shrink-0 !items-center !gap-2 !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.06] !px-3 !py-2 !text-xs !font-medium !text-[var(--color-primary)] !transition-all hover:!border-[var(--color-primary)]/40 hover:!bg-[var(--color-primary)]/[0.12]"
                >
                  <Pencil size={14} />

                  <span className="hidden sm:!inline">Edit</span>
                </motion.button>
              ) : (
                <div className="!flex !items-center !gap-2">
                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={handleCancelEdit}
                    className="!flex !items-center !gap-2 !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-3 !py-2 !text-xs !font-medium !text-[var(--color-text-secondary)]"
                  >
                    <X size={14} />

                    <span className="hidden sm:!inline">Cancel</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className="!flex !items-center !gap-2 !rounded-xl !bg-[var(--color-primary)] !px-3 !py-2 !text-xs !font-semibold !text-[var(--color-surface)] disabled:!cursor-not-allowed disabled:!opacity-60"
                  >
                    <Save size={14} />

                    <span>{savingProfile ? "Saving..." : "Save"}</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* PROFILE CONTENT */}

          {!isEditingProfile ? (
            <div className="!grid !gap-4 !p-5 sm:!grid-cols-2 sm:!p-7">
              <ProfileItem label="Full Name" value={user?.fullName || "-"} />

              <ProfileItem label="Email" value={user?.email || "-"} />

              <ProfileItem label="Phone" value={user?.phone || "-"} />

              <ProfileItem label="Gender" value={user?.gender || "-"} />

              <ProfileItem
                label="Date of Birth"
                value={
                  user?.dob ? new Date(user.dob).toLocaleDateString() : "-"
                }
              />

              <ProfileItem label="Role" value={user?.role || "Customer"} />

              <div className="sm:!col-span-2">
                <ProfileItem label="Address" value={user?.address || "-"} />
              </div>
            </div>
          ) : (
            <div className="!grid !gap-5 !p-5 sm:!grid-cols-2 sm:!p-7">
              {/* FULL NAME */}

              <InputField
                label="Full Name"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
              />

              {/* EMAIL */}

              <InputField
                label="Email"
                value={user?.email || ""}
                disabled
                placeholder="Email"
              />

              {/* PHONE */}

              <InputField
                label="Phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                placeholder="Enter phone number"
              />

              {/* GENDER */}

              <div>
                <label className="!mb-2 !block !text-[10px] !font-semibold !uppercase !tracking-[0.15em] !text-[var(--color-text-secondary)]">
                  Gender
                </label>

                <select
                  name="gender"
                  value={profileForm.gender}
                  onChange={handleProfileChange}
                  className="!w-full !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-4 !py-3 !text-sm !text-[var(--color-text-primary)] !outline-none !transition-all focus:!border-[var(--color-primary)]/50"
                >
                  <option value="">Select gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </select>
              </div>

              {/* DOB */}

              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                value={profileForm.dob}
                onChange={handleProfileChange}
              />

              {/* ADDRESS */}

              <div className="sm:!col-span-2">
                <label className="!mb-2 !block !text-[10px] !font-semibold !uppercase !tracking-[0.15em] !text-[var(--color-text-secondary)]">
                  Address
                </label>

                <textarea
                  name="address"
                  value={profileForm.address}
                  onChange={handleProfileChange}
                  rows={4}
                  placeholder="Enter your address"
                  className="!w-full !resize-none !rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !px-4 !py-3 !text-sm !text-[var(--color-text-primary)] !outline-none !transition-all placeholder:!text-[var(--color-text-muted)] focus:!border-[var(--color-primary)]/50"
                />
              </div>
            </div>
          )}
        </motion.section>

        {/* =====================================================
            APPEARANCE
        ====================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
          }}
          className="!mb-6 !overflow-hidden !rounded-[1.5rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)]"
        >
          <div className="!border-b !border-[var(--color-border)] !px-5 !py-5 sm:!px-7">
            <div className="!flex !items-center !gap-3">
              <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.06]">
                <Moon size={18} className="!text-[var(--color-primary)]" />
              </div>

              <div>
                <h2 className="!text-sm !font-semibold !text-[var(--color-text-primary)]">
                  Appearance
                </h2>

                <p className="!mt-0.5 !text-xs !text-[var(--color-text-secondary)]">
                  Customize how HostelHub looks
                </p>
              </div>
            </div>
          </div>

          <div className="!p-5 sm:!p-7">
            <p className="!mb-4 !text-xs !font-medium !uppercase !tracking-[0.15em] !text-[var(--color-text-secondary)]">
              Theme
            </p>

            <div className="!grid !gap-3 md:!grid-cols-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const active = mode === option.value;

                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => setMode(option.value)}
                    className={`!relative !flex !items-center !gap-4 !rounded-2xl !border !p-4 !text-left !transition-all !duration-300 ${
                      active
                        ? "!border-[var(--color-primary)]/50 !bg-[var(--color-primary)]/[0.08]"
                        : "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)] hover:!border-[var(--color-primary)]/30"
                    }`}
                  >
                    <div
                      className={`!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-xl !border ${
                        active
                          ? "!border-[var(--color-primary)]/30 !bg-[var(--color-primary)]/10"
                          : "!border-[var(--color-border)] !bg-[var(--color-surface)]"
                      }`}
                    >
                      <Icon
                        size={19}
                        className={
                          active
                            ? "!text-[var(--color-primary)]"
                            : "!text-[var(--color-text-secondary)]"
                        }
                      />
                    </div>

                    <div className="!min-w-0">
                      <p
                        className={`!text-sm !font-semibold ${
                          active
                            ? "!text-[var(--color-primary-hover)]"
                            : "!text-[var(--color-text-primary)]"
                        }`}
                      >
                        {option.label}
                      </p>

                      <p className="!mt-1 !text-[11px] !leading-5 !text-[var(--color-text-secondary)]">
                        {option.description}
                      </p>
                    </div>

                    {active && (
                      <div className="!absolute !right-4 !top-4 !flex !h-5 !w-5 !items-center !justify-center !rounded-full !bg-[var(--color-primary)]">
                        <Check
                          size={12}
                          className="!text-[var(--color-surface)]"
                        />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            OTHER SETTINGS
        ====================================================== */}

        <div className="!grid !gap-6 lg:!grid-cols-2">
          {/* SECURITY */}

          <SettingsCard
            icon={<ShieldCheck size={18} />}
            title="Security"
            description="Manage your account security"
          >
            <SettingRow
              icon={<LockKeyhole size={17} />}
              title="Change Password"
              description="Update your account password"
            />

            <SettingRow
              icon={<ShieldCheck size={17} />}
              title="Account Protection"
              description="Your account is protected"
              status="Active"
            />
          </SettingsCard>

          {/* NOTIFICATIONS */}

          <SettingsCard
            icon={<Bell size={18} />}
            title="Notifications"
            description="Manage your notification preferences"
          >
            <SettingRow
              icon={<Bell size={17} />}
              title="Booking Updates"
              description="Receive important booking notifications"
              status="On"
            />

            <SettingRow
              icon={<CalendarDays size={17} />}
              title="Booking Reminders"
              description="Get reminders about upcoming stays"
              status="On"
            />
          </SettingsCard>
        </div>

        {/* =====================================================
            LOGOUT
        ====================================================== */}

        <motion.button
          type="button"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="!mt-6 !flex !w-full !items-center !justify-between !rounded-2xl !border !border-[var(--color-danger)]/15 !bg-[var(--color-danger)]/[0.035] !p-5 !text-left !transition-all !duration-300 hover:!border-[var(--color-danger)]/30 hover:!bg-[var(--color-danger)]/[0.06]"
        >
          <div className="!flex !items-center !gap-4">
            <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[var(--color-danger)]/15 !bg-[var(--color-danger)]/[0.05]">
              <LogOut size={17} className="!text-[var(--color-danger)]" />
            </div>

            <div>
              <p className="!text-sm !font-semibold !text-[var(--color-danger)]">
                Logout
              </p>

              <p className="!mt-1 !text-xs !text-[var(--color-danger)]/40">
                Sign out from your account
              </p>
            </div>
          </div>

          <ChevronRight size={18} className="!text-[var(--color-danger)]/50" />
        </motion.button>
      </div>
    </section>
  );
};

/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) => {
  return (
    <div>
      <label className="!mb-2 !block !text-[10px] !font-semibold !uppercase !tracking-[0.15em] !text-[var(--color-text-secondary)]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`!w-full !rounded-xl !border !px-4 !py-3 !text-sm !outline-none !transition-all ${
          disabled
            ? "!cursor-not-allowed !border-[var(--color-border)] !bg-[var(--color-surface)] !text-[var(--color-text-muted)]"
            : "!border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !text-[var(--color-text-primary)] placeholder:!text-[var(--color-text-muted)] focus:!border-[var(--color-primary)]/50"
        }`}
      />
    </div>
  );
};

/* =========================================================
   PROFILE ITEM
========================================================= */

const ProfileItem = ({ label, value }) => {
  return (
    <div className="!rounded-xl !border !border-[var(--color-border)] !bg-[var(--color-surface-secondary)] !p-4">
      <p className="!text-[9px] !font-medium !uppercase !tracking-[0.18em] !text-[var(--color-text-muted)]">
        {label}
      </p>

      <p className="!mt-2 !truncate !text-sm !font-medium !text-[var(--color-text-primary)]">
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   SETTINGS CARD
========================================================= */

const SettingsCard = ({ icon, title, description, children }) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.3,
      }}
      className="!overflow-hidden !rounded-[1.5rem] !border !border-[var(--color-border)] !bg-[var(--color-surface)] !shadow-[var(--shadow-card)]"
    >
      <div className="!border-b !border-[var(--color-border)] !p-5">
        <div className="!flex !items-center !gap-3">
          <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[var(--color-primary)]/20 !bg-[var(--color-primary)]/[0.06] !text-[var(--color-primary)]">
            {icon}
          </div>

          <div>
            <h2 className="!text-sm !font-semibold !text-[var(--color-text-primary)]">
              {title}
            </h2>

            <p className="!mt-0.5 !text-xs !text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="!divide-y !divide-[var(--color-border)]">{children}</div>
    </motion.div>
  );
};

/* =========================================================
   SETTING ROW
========================================================= */

const SettingRow = ({ icon, title, description, status }) => {
  return (
    <div className="!flex !items-center !justify-between !gap-4 !p-5">
      <div className="!flex !min-w-0 !items-center !gap-3">
        <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-lg !bg-[var(--color-surface-secondary)] !text-[var(--color-text-secondary)]">
          {icon}
        </div>

        <div className="!min-w-0">
          <p className="!truncate !text-xs !font-medium !text-[var(--color-text-primary)]">
            {title}
          </p>

          <p className="!mt-1 !truncate !text-[10px] !text-[var(--color-text-muted)]">
            {description}
          </p>
        </div>
      </div>

      {status && (
        <span className="!shrink-0 !rounded-full !border !border-[var(--color-success)]/20 !bg-[var(--color-success)]/[0.07] !px-3 !py-1 !text-[9px] !font-semibold !text-[var(--color-success)]">
          {status}
        </span>
      )}
    </div>
  );
};

export default Settings;
