import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Pencil,
  VenusAndMars,
} from "lucide-react";
import { motion } from "framer-motion";
import EditProfileModal from "./EditProfileModel";
import { formatDate } from "../../../utils/formatDate";

const PersonalInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const information = [
    {
      label: "Full Name",
      value: user?.fullName || "Not Available",
      icon: User,
    },
    {
      label: "Email Address",
      value: user?.email || "Not Available",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: user?.phone || "Not Available",
      icon: Phone,
    },
    {
      label: "Gender",
      value: user?.gender || "Not Added",
      icon: VenusAndMars,
    },
    // {
    //   label: "Date of Birth",
    //   value: user?.dob ? formatDate(user.dob) : "Not Added",
    //   icon: Calendar,
    // },
    {
      label: "Address",
      value: user?.address || "Not Added",
      icon: MapPin,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          !relative
          !mt-6
          !overflow-hidden
          !rounded-[2rem]
          !border
          !border-[var(--color-border)]
          !bg-[var(--color-surface)]
          !p-5
          !shadow-[var(--shadow-card)]
          !transition-all
          !duration-500
          sm:!p-7
          lg:!p-8
        "
      >
        {/* ───────────────── Ambient Background ───────────────── */}

        <div
          className="
            !pointer-events-none
            !absolute
            !-right-24
            !-top-24
            !h-64
            !w-64
            !rounded-full
            !bg-[#D6B36A]/6
            !blur-[100px]
            dark:!bg-[#D6B36A]/5
          "
        />

        <div
          className="
            !pointer-events-none
            !absolute
            !-bottom-32
            !left-1/3
            !h-56
            !w-56
            !rounded-full
            !bg-[#4A1D2F]/5
            !blur-[100px]
            dark:!bg-[#D6B36A]/4
          "
        />

        {/* ───────────────── Top Accent ───────────────── */}

        <div
          className="
            !pointer-events-none
            !absolute
            !left-0
            !right-0
            !top-0
            !h-[2px]
            !bg-gradient-to-r
            !from-transparent
            !via-[#D6B36A]
            !to-transparent
            !opacity-80
          "
        />

        {/* ───────────────── Header ───────────────── */}

        <div
          className="
            !relative
            !z-10
            !flex
            !flex-col
            !gap-5
            sm:!flex-row
            sm:!items-center
            sm:!justify-between
          "
        >
          <div>
            <div className="!mb-2 !flex !items-center !gap-3">
              <span
                className="
                  !h-px
                  !w-7
                  !bg-gradient-to-r
                  !from-[#D6B36A]
                  !to-transparent
                "
              />

              <p
                className="
                  !text-[10px]
                  !font-bold
                  !uppercase
                  !tracking-[0.25em]
                  !text-[#B89142]
                  dark:!text-[#D6B36A]
                "
              >
                Account Details
              </p>
            </div>

            <h2
              className="
                !text-2xl
                !font-bold
                !tracking-[-0.025em]
                !text-[var(--color-text-primary)]
                sm:!text-3xl
              "
            >
              Personal Information
            </h2>

            <p
              className="
                !mt-1.5
                !text-sm
                !leading-6
                !text-[var(--color-text-secondary)]
              "
            >
              Manage your personal account information.
            </p>
          </div>

          {/* Edit Button */}

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="
              !group
              !inline-flex
              !w-full
              !items-center
              !justify-center
              !gap-2
              !rounded-xl
              !bg-gradient-to-r
              !from-[#D6B36A]
              !to-[#C69E4F]
              !px-5
              !py-3
              !text-sm
              !font-bold
              !text-[#241A0B]
              !shadow-[0_8px_25px_rgba(214,179,106,0.20)]
              !transition-all
              !duration-300
              hover:!from-[#E3C47D]
              hover:!to-[#D6B36A]
              hover:!shadow-[0_10px_30px_rgba(214,179,106,0.28)]
              sm:!w-auto
            "
          >
            <Pencil
              size={16}
              strokeWidth={2}
              className="
                !transition-transform
                !duration-300
                group-hover:!-rotate-6
              "
            />
            Edit Profile
          </motion.button>
        </div>

        {/* ───────────────── Divider ───────────────── */}

        <div
          className="
            !relative
            !z-10
            !my-7
            !h-px
            !bg-gradient-to-r
            !from-transparent
            !via-[var(--color-border)]
            !to-transparent
          "
        />

        {/* ───────────────── Information Grid ───────────────── */}

        <div
          className="
            !relative
            !z-10
            !grid
            !gap-4
            sm:!grid-cols-2
            lg:!grid-cols-3
          "
        >
          {information.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -4 }}
                className="
                  !group
                  !relative
                  !overflow-hidden
                  !rounded-2xl
                  !border
                  !border-[var(--color-border)]
                  !bg-[var(--color-surface-secondary)]
                  !p-5
                  !transition-all
                  !duration-300
                  hover:!border-[#D6B36A]/30
                  hover:!shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  dark:hover:!shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                "
              >
                {/* Card glow */}

                <div
                  className="
                    !pointer-events-none
                    !absolute
                    !-right-10
                    !-top-10
                    !h-24
                    !w-24
                    !rounded-full
                    !bg-[#D6B36A]/0
                    !blur-2xl
                    !transition-all
                    !duration-500
                    group-hover:!bg-[#D6B36A]/10
                  "
                />

                {/* Icon */}

                <div
                  className="
                    !relative
                    !mb-4
                    !flex
                    !h-11
                    !w-11
                    !items-center
                    !justify-center
                    !rounded-xl
                    !border
                    !border-[#D6B36A]/15
                    !bg-gradient-to-br
                    !from-[#D6B36A]/15
                    !to-[#D6B36A]/5
                    !text-[#B89142]
                    !transition-all
                    !duration-300
                    group-hover:!border-[#D6B36A]/30
                    group-hover:!bg-[#D6B36A]
                    group-hover:!text-[#241A0B]
                    dark:!text-[#D6B36A]
                    dark:group-hover:!text-[#241A0B]
                  "
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                {/* Label */}

                <p
                  className="
                    !text-[10px]
                    !font-bold
                    !uppercase
                    !tracking-[0.2em]
                    !text-[var(--color-text-muted)]
                  "
                >
                  {item.label}
                </p>

                {/* Value */}

                <p
                  className="
                    !mt-2
                    !break-words
                    !text-sm
                    !font-semibold
                    !leading-6
                    !text-[var(--color-text-primary)]
                  "
                >
                  {item.value}
                </p>

                {/* Hover accent */}

                <div
                  className="
                    !absolute
                    !bottom-0
                    !left-0
                    !h-[2px]
                    !w-0
                    !bg-gradient-to-r
                    !from-[#D6B36A]
                    !to-transparent
                    !transition-all
                    !duration-500
                    group-hover:!w-full
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* ───────────────── Bottom Accent ───────────────── */}

        <div
          className="
            !absolute
            !bottom-0
            !left-0
            !h-[2px]
            !w-full
            !bg-gradient-to-r
            !from-[#4A1D2F]
            !via-[#D6B36A]
            !to-transparent
          "
        />
      </motion.div>

      {/* ───────────────── Edit Modal ───────────────── */}

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
    </>
  );
};

export default PersonalInfo;
