import { useState } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Building2,
  Check,
  ImagePlus,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Trash2,
  Upload,
  Wifi,
} from "lucide-react";
import { createRoom } from "../../services/roomService";
import { openCloudinaryWidget } from "../../utils/cloudinary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const facilityOptions = [
  { label: "WiFi", value: "wifi" },
  { label: "Parking", value: "parking" },
  { label: "Laundry", value: "laundry" },
  { label: "Food", value: "food" },
  { label: "Juice Corner", value: "juiceCorner" },
  { label: "Bike Parking", value: "bikeParking" },
  { label: "Scooty Parking", value: "scootyParking" },
  { label: "Power Backup", value: "powerBackup" },
  { label: "Hot Water", value: "hotWater" },
  { label: "CCTV", value: "cctv" },
];

const initialFormData = {
  roomNumber: "",
  floor: "",
  roomType: "AC",
  sharingType: "2 Sharing",
  wingGender: "",
  totalBeds: "2",
  occupiedBeds: "0",
  pricePerDay: "",
  pricePerWeek: "",
  pricePerMonth: "",
  status: "Available",
  description: "",

  facilities: {
    wifi: false,
    parking: false,
    laundry: false,
    food: false,
    juiceCorner: false,
    bikeParking: false,
    scootyParking: false,
    powerBackup: false,
    hotWater: false,
    cctv: false,
  },
};

const getBedsFromSharing = (sharingType) => {
  const match = sharingType.match(/\d+/);
  return match ? Number(match[0]) : 2;
};

const AddRoom = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [roomImages, setRoomImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // --------------------------------------------------
  // Handle normal inputs
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Room number
    if (name === "roomNumber") {
      setFormData((prev) => ({
        ...prev,
        roomNumber: value,
      }));
      return;
    }

    // Floor - only positive whole numbers
    if (name === "floor") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          floor: value,
        }));
      }
      return;
    }

    // Sharing type
    if (name === "sharingType") {
      const beds = getBedsFromSharing(value);

      setFormData((prev) => ({
        ...prev,
        sharingType: value,
        totalBeds: String(beds),
        occupiedBeds: Math.min(Number(prev.occupiedBeds) || 0, beds).toString(),
      }));

      return;
    }

    // Occupied beds
    if (name === "occupiedBeds") {
      const totalBeds = Number(formData.totalBeds);

      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          occupiedBeds: "",
        }));
        return;
      }

      const numericValue = Number(value);

      if (
        Number.isInteger(numericValue) &&
        numericValue >= 0 &&
        numericValue <= totalBeds
      ) {
        setFormData((prev) => ({
          ...prev,
          occupiedBeds: value,
        }));
      }

      return;
    }

    // Prices - only positive numbers
    // Price - Admin enters only Price Per Day
    if (name === "pricePerDay") {
      if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
        const dailyPrice = value === "" ? "" : Number(value);

        setFormData((prev) => ({
          ...prev,
          pricePerDay: value,
          pricePerWeek: value === "" ? "" : (dailyPrice * 7).toFixed(2),
          pricePerMonth: value === "" ? "" : (dailyPrice * 30).toFixed(2),
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Facilities
  // --------------------------------------------------

  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility],
      },
    }));
  };

  // --------------------------------------------------
  // Cloudinary image upload
  // --------------------------------------------------

  const uploadImages = () => {
    openCloudinaryWidget((imageUrl) => {
      setRoomImages((prev) => [...prev, imageUrl]);
    });
  };

  const removeImage = (indexToRemove) => {
    setRoomImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // --------------------------------------------------
  // Validation
  // --------------------------------------------------

  const validateForm = () => {
    const totalBeds = Number(formData.totalBeds);
    const occupiedBeds = Number(formData.occupiedBeds);

    const expectedBeds = getBedsFromSharing(formData.sharingType);

    // Room number
    if (!formData.roomNumber.trim()) {
      toast.error("Please enter a room number.");
      return false;
    }

    // Floor
    if (
      formData.floor === "" ||
      Number(formData.floor) < 0 ||
      !Number.isInteger(Number(formData.floor))
    ) {
      toast.error("Please enter a valid floor number.");
      return false;
    }

    // Wing
    if (!formData.wingGender) {
      toast.error("Please select a wing.");
      return false;
    }

    // Total beds
    if (totalBeds !== expectedBeds) {
      toast.error(
        `${formData.sharingType} room must have exactly ${expectedBeds} beds.`,
      );
      return false;
    }

    // Occupied beds
    if (!Number.isInteger(occupiedBeds) || occupiedBeds < 0) {
      toast.error("Occupied beds cannot be negative.");
      return false;
    }

    if (occupiedBeds > totalBeds) {
      toast.error("Occupied beds cannot be greater than total beds.");
      return false;
    }

    // Prices
    const prices = [
      {
        value: formData.pricePerDay,
        label: "daily",
      },
      {
        value: formData.pricePerWeek,
        label: "weekly",
      },
      {
        value: formData.pricePerMonth,
        label: "monthly",
      },
    ];

    for (const price of prices) {
      if (price.value === "" || Number(price.value) <= 0) {
        toast.error(`Please enter a valid ${price.label} price.`);
        return false;
      }
    }

    // Images
    if (roomImages.length === 0) {
      toast.error("Please upload at least one room image.");
      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const totalBeds = Number(formData.totalBeds);
      const occupiedBeds = Number(formData.occupiedBeds);

      // Automatically calculate room status
      let roomStatus = "Available";

      if (occupiedBeds === totalBeds) {
        roomStatus = "Full";
      }

      const roomData = {
        ...formData,

        floor: Number(formData.floor),
        totalBeds,
        occupiedBeds,

        pricePerDay: Number(formData.pricePerDay),
        pricePerWeek: Number(formData.pricePerWeek),
        pricePerMonth: Number(formData.pricePerMonth),

        status: roomStatus,

        roomImages,
      };

      console.log("Sending Room Data:", roomData);

      const data = await createRoom(roomData);

      toast.success(data.message || "Room created successfully.");

      navigate("/admin/rooms");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create room.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // Derived values
  // --------------------------------------------------

  const totalBeds = Number(formData.totalBeds) || 0;
  const occupiedBeds = Number(formData.occupiedBeds) || 0;
  const availableBeds = Math.max(totalBeds - occupiedBeds, 0);

  return (
    <main className="!min-h-screen !bg-[#F6F6F4] !px-4 !py-6 sm:!px-6 lg:!px-8 lg:!py-10">
      <div className="!mx-auto !max-w-6xl">
        {/* --------------------------------------------------
            Header
        -------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="!mb-8"
        >
          <div className="!mb-3 !flex !items-center !gap-3">
            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-2xl !bg-[#4A1D2F] !text-white !shadow-md">
              <Building2 size={22} />
            </div>

            <div>
              <p className="!text-xs !font-semibold !uppercase !tracking-[0.18em] !text-[#D4AF37]">
                Hostel Management
              </p>

              <h1 className="!text-2xl !font-bold !text-[#2B1720] sm:!text-3xl">
                Add New Room
              </h1>
            </div>
          </div>

          <p className="!max-w-2xl !text-sm !leading-6 !text-[#74656A]">
            Add complete room details, pricing, facilities and images. Bed
            availability will be calculated automatically.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* --------------------------------------------------
              Basic Information
          -------------------------------------------------- */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="!mb-6 !rounded-3xl !border !border-[#E8DED2] !bg-white !p-5 !shadow-[0_10px_35px_rgba(43,23,32,0.06)] sm:!p-7"
          >
            <SectionHeader
              icon={<Building2 size={20} />}
              title="Room Information"
              description="Basic details about the room."
            />

            <div className="!grid !grid-cols-1 !gap-5 md:!grid-cols-2">
              {/* Room Number */}
              <InputField
                label="Room Number"
                name="roomNumber"
                value={formData.roomNumber}
                placeholder="e.g. 101"
                onChange={handleChange}
                required
              />

              {/* Floor */}
              <InputField
                label="Floor"
                name="floor"
                type="number"
                min="0"
                step="1"
                value={formData.floor}
                placeholder="e.g. 1"
                onChange={handleChange}
                required
              />

              {/* Room Type */}
              <SelectField
                label="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                options={["AC", "Non-AC"]}
              />

              {/* Sharing */}
              <SelectField
                label="Sharing Type"
                name="sharingType"
                value={formData.sharingType}
                onChange={handleChange}
                options={["2 Sharing", "3 Sharing", "4 Sharing"]}
              />

              {/* Wing */}
              <SelectField
                label="Wing"
                name="wingGender"
                value={formData.wingGender}
                onChange={handleChange}
                placeholder="Select Wing"
                options={["Male", "Female"]}
                required
              />
            </div>
          </motion.section>

          {/* --------------------------------------------------
              Beds
          -------------------------------------------------- */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="!mb-6 !rounded-3xl !border !border-[#E8DED2] !bg-white !p-5 !shadow-[0_10px_35px_rgba(43,23,32,0.06)] sm:!p-7"
          >
            <SectionHeader
              icon={<BedDouble size={20} />}
              title="Bed Capacity"
              description="Beds are automatically controlled according to sharing type."
            />

            <div className="!grid !grid-cols-1 !gap-5 md:!grid-cols-2">
              {/* Total Beds */}
              <div>
                <label className="!mb-2 !block !text-sm !font-semibold !text-[#2B1720]">
                  Total Beds
                </label>

                <div className="!relative">
                  <BedDouble
                    size={18}
                    className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
                  />

                  <input
                    name="totalBeds"
                    type="number"
                    value={formData.totalBeds}
                    readOnly
                    className="!w-full !cursor-not-allowed !rounded-xl !border !border-[#E8DED2] !bg-[#F6F6F4] !py-3 !pl-11 !pr-4 !text-sm !font-semibold !text-[#2B1720] !outline-none"
                  />
                </div>

                <p className="!mt-2 !text-xs !text-[#74656A]">
                  Automatically set according to sharing type.
                </p>
              </div>

              {/* Occupied Beds */}
              <InputField
                label="Occupied Beds"
                name="occupiedBeds"
                type="number"
                min="0"
                max={totalBeds}
                step="1"
                value={formData.occupiedBeds}
                placeholder="0"
                onChange={handleChange}
                required
              />
            </div>

            {/* Bed Summary */}
            <div className="!mt-6 !grid !grid-cols-1 !gap-3 sm:!grid-cols-3">
              <BedSummary label="Total Beds" value={totalBeds} />

              <BedSummary label="Occupied" value={occupiedBeds} />

              <BedSummary label="Available" value={availableBeds} highlight />
            </div>
          </motion.section>

          {/* --------------------------------------------------
              Pricing
          -------------------------------------------------- */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="!mb-6 !rounded-3xl !border !border-[#E8DED2] !bg-white !p-5 !shadow-[0_10px_35px_rgba(43,23,32,0.06)] sm:!p-7"
          >
            <SectionHeader
              icon={<IndianRupee size={20} />}
              title="Pricing"
              description="Set positive pricing for daily, weekly and monthly stays."
            />

            <div className="!grid !grid-cols-1 !gap-5 md:!grid-cols-3">
              <PriceField
                label="Price / Day"
                name="pricePerDay"
                value={formData.pricePerDay}
                placeholder="e.g. 800"
                onChange={handleChange}
              />

              <PriceField
                label="Price / Week"
                name="pricePerWeek"
                value={formData.pricePerWeek}
                placeholder="e.g. 5000"
                onChange={handleChange}
              />

              <PriceField
                label="Price / Month"
                name="pricePerMonth"
                value={formData.pricePerMonth}
                placeholder="e.g. 15000"
                onChange={handleChange}
              />
            </div>
          </motion.section>

          {/* --------------------------------------------------
              Description
          -------------------------------------------------- */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="!mb-6 !rounded-3xl !border !border-[#E8DED2] !bg-white !p-5 !shadow-[0_10px_35px_rgba(43,23,32,0.06)] sm:!p-7"
          >
            <SectionHeader
              icon={<MapPin size={20} />}
              title="Room Description"
              description="Add useful information that customers should know."
            />

            <textarea
              name="description"
              rows={5}
              value={formData.description}
              placeholder="Describe the room, facilities, view, rules or other useful information..."
              onChange={handleChange}
              className="!w-full !resize-none !rounded-2xl !border !border-[#E8DED2] !bg-[#FCFBF9] !px-4 !py-3 !text-sm !leading-6 !text-[#2B1720] !outline-none !transition-all placeholder:!text-[#A69A9E] focus:!border-[#D4AF37] focus:!ring-4 focus:!ring-[#D4AF37]/10"
            />
          </motion.section>

          {/* --------------------------------------------------
              Facilities
          -------------------------------------------------- */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="!mb-6 !rounded-3xl !border !border-[#E8DED2] !bg-white !p-5 !shadow-[0_10px_35px_rgba(43,23,32,0.06)] sm:!p-7"
          >
            <SectionHeader
              icon={<Wifi size={20} />}
              title="Facilities"
              description="Select the facilities available in this room."
            />

            <div className="!grid !grid-cols-2 !gap-3 sm:!grid-cols-3 lg:!grid-cols-4">
              {facilityOptions.map((facility, index) => {
                const selected = formData.facilities[facility.value];

                return (
                  <motion.label
                    key={facility.value}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.03 * index,
                    }}
                    className={`!flex !cursor-pointer !items-center !gap-3 !rounded-2xl !border !p-3.5 !transition-all ${
                      selected
                        ? "!border-[#D4AF37] !bg-[#FFF9E8]"
                        : "!border-[#E8DED2] !bg-white hover:!border-[#D4AF37]/60 hover:!bg-[#FCFBF9]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleFacilityChange(facility.value)}
                      className="!sr-only"
                    />

                    <span
                      className={`!flex !h-5 !w-5 !shrink-0 !items-center !justify-center !rounded-md !border !transition-all ${
                        selected
                          ? "!border-[#4A1D2F] !bg-[#4A1D2F] !text-white"
                          : "!border-[#D5C8C0] !bg-white"
                      }`}
                    >
                      {selected && <Check size={13} />}
                    </span>

                    <span className="!text-sm !font-medium !text-[#2B1720]">
                      {facility.label}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </motion.section>

          {/* --------------------------------------------------
              Images
          -------------------------------------------------- */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="!mb-6 !rounded-3xl !border !border-[#E8DED2] !bg-white !p-5 !shadow-[0_10px_35px_rgba(43,23,32,0.06)] sm:!p-7"
          >
            <SectionHeader
              icon={<ImagePlus size={20} />}
              title="Room Images"
              description="Upload clear images of the room using Cloudinary."
            />

            <button
              type="button"
              onClick={uploadImages}
              className="!inline-flex !w-full !items-center !justify-center !gap-2 !rounded-2xl !border !border-dashed !border-[#D4AF37] !bg-[#FFFDF7] !px-5 !py-5 !text-sm !font-semibold !text-[#4A1D2F] !transition-all hover:!bg-[#FFF9E8] sm:!w-auto sm:!px-8"
            >
              <Upload size={18} />
              Upload Room Images
            </button>

            {roomImages.length === 0 && (
              <div className="!mt-5 !rounded-2xl !border !border-[#E8DED2] !bg-[#FCFBF9] !p-6 !text-center">
                <ImagePlus
                  size={30}
                  className="!mx-auto !mb-2 !text-[#B5A8AC]"
                />

                <p className="!text-sm !font-medium !text-[#74656A]">
                  No images uploaded yet
                </p>

                <p className="!mt-1 !text-xs !text-[#9A8C91]">
                  Add at least one image before saving the room.
                </p>
              </div>
            )}

            {roomImages.length > 0 && (
              <div className="!mt-6 !grid !grid-cols-2 !gap-4 sm:!grid-cols-3 lg:!grid-cols-4">
                {roomImages.map((image, index) => (
                  <motion.div
                    key={`${image}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="!group !relative !overflow-hidden !rounded-2xl !border !border-[#E8DED2] !bg-white"
                  >
                    <img
                      src={image}
                      alt={`Room ${index + 1}`}
                      className="!h-36 !w-full !object-cover !transition-transform !duration-500 group-hover:!scale-105 sm:!h-44"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="!absolute !right-2 !top-2 !flex !h-9 !w-9 !items-center !justify-center !rounded-full !bg-white/95 !text-red-600 !shadow-md !transition-all hover:!scale-105 hover:!bg-red-50"
                      aria-label="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>

                    {index === 0 && (
                      <span className="!absolute !bottom-2 !left-2 !rounded-full !bg-[#4A1D2F]/90 !px-3 !py-1 !text-[10px] !font-semibold !uppercase !tracking-wide !text-white">
                        Cover Image
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* --------------------------------------------------
              Security / validation note
          -------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="!mb-6 !flex !items-start !gap-3 !rounded-2xl !border !border-[#E8DED2] !bg-[#FFFDF7] !p-4"
          >
            <ShieldCheck
              size={20}
              className="!mt-0.5 !shrink-0 !text-[#4A1D2F]"
            />

            <div>
              <p className="!text-sm !font-semibold !text-[#2B1720]">
                Room data validation enabled
              </p>

              <p className="!mt-1 !text-xs !leading-5 !text-[#74656A]">
                Bed capacity, occupied beds and pricing are validated before the
                room is created.
              </p>
            </div>
          </motion.div>

          {/* --------------------------------------------------
              Submit
          -------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="!flex !flex-col-reverse !gap-3 sm:!flex-row sm:!justify-end"
          >
            <button
              type="button"
              onClick={() => navigate("/admin/rooms")}
              className="!rounded-2xl !border !border-[#E8DED2] !bg-white !px-7 !py-3.5 !text-sm !font-semibold !text-[#4A1D2F] !transition-all hover:!border-[#4A1D2F] hover:!bg-[#FCFBF9]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="!inline-flex !items-center !justify-center !gap-2 !rounded-2xl !bg-[#4A1D2F] !px-8 !py-3.5 !text-sm !font-semibold !text-white !shadow-lg !shadow-[#4A1D2F]/15 !transition-all hover:!-translate-y-0.5 hover:!bg-[#5A263A] disabled:!cursor-not-allowed disabled:!opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="!h-4 !w-4 !animate-spin !rounded-full !border-2 !border-white/40 !border-t-white" />
                  Saving Room...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Save Room
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </main>
  );
};

// ======================================================
// Reusable Components
// ======================================================

const SectionHeader = ({ icon, title, description }) => {
  return (
    <div className="!mb-6 !flex !items-start !gap-3">
      <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#F7F0E7] !text-[#4A1D2F]">
        {icon}
      </div>

      <div>
        <h2 className="!text-lg !font-bold !text-[#2B1720]">{title}</h2>

        <p className="!mt-1 !text-xs !leading-5 !text-[#74656A]">
          {description}
        </p>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  min,
  max,
  step,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="!mb-2 !block !text-sm !font-semibold !text-[#2B1720]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        step={step}
        className="!w-full !rounded-xl !border !border-[#E8DED2] !bg-[#FCFBF9] !px-4 !py-3 !text-sm !text-[#2B1720] !outline-none !transition-all placeholder:!text-[#A69A9E] focus:!border-[#D4AF37] focus:!bg-white focus:!ring-4 focus:!ring-[#D4AF37]/10"
      />
    </div>
  );
};

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="!mb-2 !block !text-sm !font-semibold !text-[#2B1720]"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="!w-full !rounded-xl !border !border-[#E8DED2] !bg-[#FCFBF9] !px-4 !py-3 !text-sm !text-[#2B1720] !outline-none !transition-all focus:!border-[#D4AF37] focus:!bg-white focus:!ring-4 focus:!ring-[#D4AF37]/10"
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const PriceField = ({ label, name, value, placeholder, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="!mb-2 !block !text-sm !font-semibold !text-[#2B1720]"
      >
        {label}
      </label>

      <div className="!relative">
        <IndianRupee
          size={17}
          className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-[#74656A]"
        />

        <input
          id={name}
          name={name}
          type="number"
          min="1"
          step="0.01"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required
          className="!w-full !rounded-xl !border !border-[#E8DED2] !bg-[#FCFBF9] !py-3 !pl-10 !pr-4 !text-sm !text-[#2B1720] !outline-none !transition-all placeholder:!text-[#A69A9E] focus:!border-[#D4AF37] focus:!bg-white focus:!ring-4 focus:!ring-[#D4AF37]/10"
        />
      </div>
    </div>
  );
};

const BedSummary = ({ label, value, highlight = false }) => {
  return (
    <div
      className={`!rounded-2xl !border !p-4 ${
        highlight
          ? "!border-[#D4AF37]/40 !bg-[#FFF9E8]"
          : "!border-[#E8DED2] !bg-[#FCFBF9]"
      }`}
    >
      <p className="!text-xs !font-medium !text-[#74656A]">{label}</p>

      <p className="!mt-1 !text-2xl !font-bold !text-[#2B1720]">{value}</p>
    </div>
  );
};

export default AddRoom;
