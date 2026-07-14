import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    checkInTime: {
      type: String,
      required: true,
      default: "12:00 PM",
    },

    checkOutTime: {
      type: String,
      required: true,
      default: "11:00 AM",
    },

    idProofRequired: {
      type: Boolean,
      default: true,
    },

    smokingAllowed: {
      type: Boolean,
      default: false,
    },

    alcoholAllowed: {
      type: Boolean,
      default: false,
    },

    petsAllowed: {
      type: Boolean,
      default: false,
    },

    visitorsAllowed: {
      type: Boolean,
      default: true,
    },

    quietHours: {
      type: String,
      default: "10:00 PM - 6:00 AM",
    },

    advancePaymentRequired: {
      type: Boolean,
      default: true,
    },

    refundPolicy: {
      type: String,
      default: "Refund according to hostel policy.",
    },
  },
  {
    timestamps: true,
  },
);

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;
