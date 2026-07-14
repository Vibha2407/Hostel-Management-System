import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    wifi: {
      type: Boolean,
      default: true,
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
      default: true,
    },

    juiceCorner: {
      type: Boolean,
      default: false,
    },

    bikeParking: {
      type: Boolean,
      default: true,
    },

    scootyParking: {
      type: Boolean,
      default: true,
    },

    powerBackup: {
      type: Boolean,
      default: true,
    },

    hotWater: {
      type: Boolean,
      default: true,
    },

    cctv: {
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
