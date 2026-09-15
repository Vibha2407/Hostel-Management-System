import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    wifi: {
      type: Boolean,
      default: false,
    },

    parking: {
      type: Boolean,
      default: false,
    },

    laundry: {
      type: Boolean,
      default: false,
    },

    food: {
      type: Boolean,
      default: false,
    },

    juiceCorner: {
      type: Boolean,
      default: false,
    },

    bikeParking: {
      type: Boolean,
      default: false,
    },

    scootyParking: {
      type: Boolean,
      default: false,
    },

    powerBackup: {
      type: Boolean,
      default: false,
    },

    hotWater: {
      type: Boolean,
      default: false,
    },

    cctv: {
      type: Boolean,
      default: false,
    },

    icon: {
      type: String,
      default: "Sparkles",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Facility = mongoose.model("Facility", facilitySchema);

export default Facility;
