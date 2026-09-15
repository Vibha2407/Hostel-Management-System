import { useState } from "react";
import { getRoomById, updateRoom } from "../../services/roomService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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

const EditRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: "",
    wingGender: "Male",
    roomType: "AC",
    sharingType: "2 Sharing",
    totalBeds: "",
    occupiedBeds: "",
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
  });

  const [roomImages, setRoomImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setRoomImages(files);
  };

  // Handle Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const data = await getRoomById(id);

      setFormData({
        roomNumber: data.room.roomNumber,
        floor: data.room.floor,
        roomType: data.room.roomType,
        wingGender: data.room.wingGender,
        sharingType: data.room.sharingType,
        totalBeds: data.room.totalBeds,
        availableBeds: data.room.availableBeds,
        occupiedBeds: data.room.occupiedBeds,
        pricePerDay: data.room.pricePerDay,
        pricePerWeek: data.room.pricePerWeek,
        pricePerMonth: data.room.pricePerMonth,
        status: data.room.status,
        description: data.room.description || "",
        facilities: data.room.facilities || {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove image
  const removeImage = (indexToRemove) => {
    setRoomImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Handle Facilities
  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility],
      },
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateRoom(id, formData);

      toast.success(data.message);

      navigate("/admin/rooms");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-5xl !mx-auto !p-8">
      <h1 className="text-3xl font-bold !mb-8">Edit Room</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 !gap-5">
        {/* Room Number */}
        <input
          name="roomNumber"
          value={formData.roomNumber}
          placeholder="Room Number"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        {/* Floor */}
        <input
          name="floor"
          type="number"
          value={formData.floor}
          placeholder="Floor"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        {/* Room Type */}
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        >
          <option>AC</option>
          <option>Non-AC</option>
        </select>

        {/* Sharing */}
        <select
          name="sharingType"
          value={formData.sharingType}
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        >
          <option>2 Sharing</option>
          <option>3 Sharing</option>
          <option>4 Sharing</option>
        </select>

        {/* Beds */}
        <input
          name="totalBeds"
          type="number"
          value={formData.totalBeds}
          placeholder="Total Beds"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        <input
          name="occupiedBeds"
          type="number"
          value={formData.occupiedBeds}
          placeholder="Occupied Beds"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        {/* Prices */}
        <input
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          placeholder="Price / Day"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        <input
          name="pricePerWeek"
          type="number"
          value={formData.pricePerWeek}
          placeholder="Price / Week"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        <input
          name="pricePerMonth"
          type="number"
          value={formData.pricePerMonth}
          placeholder="Price / Month"
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border !p-3 rounded-lg"
        >
          <option>Available</option>
          <option>Occupied</option>
          <option>Maintenance</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          rows={5}
          value={formData.description}
          placeholder="Room Description"
          onChange={handleChange}
          className="col-span-2 border !p-3 rounded-lg resize-none"
        />

        {/* Facilities */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold !mb-4">Facilities</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 !gap-4">
            {facilityOptions.map((facility) => (
              <label
                key={facility.value}
                className="flex items-center !gap-2 border rounded-lg !p-3 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={!!formData.facilities[facility.value]}
                  onChange={() => handleFacilityChange(facility.value)}
                />

                {facility.label}
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-semibold !mb-4">Room Images</h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border !p-3 rounded-lg w-full"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 !gap-4 !mt-5">
            {roomImages.map((image, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Room"
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white !w-8 !h-8 rounded-full hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="col-span-2 bg-[#D4AF37] text-white rounded-lg !py-3 hover:bg-yellow-600 transition"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default EditRoom;
