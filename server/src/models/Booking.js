import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
    },
    actualCheckIn: {
      type: Date,
      default: null,
    },

    actualCheckOut: {
      type: Date,
      default: null,
    },

    bookingType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    bedsReleased: {
      type: Boolean,
      default: false,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Checked-In",
        "Checked-Out",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    confirmationDeadline: {
      type: Date,
      default: null,
    },

    refundAmount: {
      type: Number,
      default: 0,
    },

    refundDate: {
      type: Date,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refund Initiated", "Refunded"],
      default: "Pending",
    },

    refundStatus: {
      type: String,
      enum: ["Not Required", "Initiated", "Completed"],
      default: "Not Required",
    },

    specialRequest: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
