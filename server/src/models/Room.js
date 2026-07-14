import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required."],
      unique: true,
      trim: true,
    },

    floor: {
      type: Number,
      required: [true, "Floor number is required."],
      min: 0,
    },

    roomType: {
      type: String,
      enum: ["AC", "Non-AC"],
      required: true,
    },

    sharingType: {
      type: String,
      enum: ["2 Sharing", "3 Sharing", "4 Sharing"],
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerWeek: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerMonth: {
      type: Number,
      required: true,
      min: 0,
    },

    totalBeds: {
      type: Number,
      required: true,
      min: 1,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
      min: 0,
    },

    roomImages: [
      {
        type: String,
      },
    ],

    facilities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
    },

    rules: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rule",
    },

    status: {
      type: String,
      enum: ["Available", "Full", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.virtual("availableBeds").get(function () {
  return this.totalBeds - this.occupiedBeds;
});

roomSchema.set("toJSON", { virtuals: true });
roomSchema.set("toObject", { virtuals: true });

const Room = mongoose.model("Room", roomSchema);

export default Room;
