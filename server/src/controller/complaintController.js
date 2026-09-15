// import Complaint from "../models/Complaint.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";

// ==================================================
// CUSTOMER: CREATE COMPLAINT
// ==================================================

export const createComplaint = async (req, res) => {
  try {
    const { room, subject, category, description } = req.body;

    if (!room || !subject || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "All complaint fields are required.",
      });
    }

    // Check whether room exists
    const selectedRoom = await Room.findById(room);

    if (!selectedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    // ==================================================
    // SECURITY:
    // Customer can complain only about their own room
    // ==================================================

    const activeBooking = await Booking.findOne({
      user: req.user._id,
      room: room,
      bookingStatus: {
        $in: ["Confirmed", "Checked-In"],
      },
    });

    if (!activeBooking) {
      return res.status(403).json({
        success: false,
        message: "You can only raise a complaint for your assigned room.",
      });
    }

    // Create complaint
    const complaint = await Complaint.create({
      customer: req.user._id,
      room,
      subject: subject.trim(),
      category,
      description: description.trim(),
    });

    await complaint.populate([
      {
        path: "customer",
        select: "fullName email phone",
      },
      {
        path: "room",
        select: "roomNumber roomType sharingType",
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================================================
// CUSTOMER: GET MY COMPLAINTS
// ==================================================

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      customer: req.user._id,
    })
      .populate("room", "roomNumber roomType sharingType")
      .populate("resolvedBy", "fullName")

      .populate("assignedTo", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalComplaints: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==================================================
// ADMIN: GET ALL COMPLAINTS
// ==================================================

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("customer", "fullName email phone")
      .populate("room", "roomNumber roomType sharingType")
      .populate("resolvedBy", "fullName")
      .populate("assignedTo", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalComplaints: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================================================
// ADMIN: ASSIGN COMPLAINT / MARK IN PROGRESS
// ==================================================

export const assignComplaint = async (req, res) => {
  try {
    const { assignedTo, expectedDays, adminResponse } = req.body;

    // Validate assigned person
    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Please specify who is assigned to solve the complaint.",
      });
    }

    // Validate expected days
    if (
      expectedDays === undefined ||
      expectedDays === null ||
      Number(expectedDays) < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Expected resolution days must be at least 1 day.",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Resolved complaint cannot be assigned again.",
      });
    }

    const days = Number(expectedDays);

    // Calculate expected resolution date
    const expectedResolutionDate = new Date();
    expectedResolutionDate.setDate(expectedResolutionDate.getDate() + days);

    complaint.status = "In Progress";
    complaint.assignedTo = assignedTo.trim();
    complaint.expectedResolutionDate = expectedResolutionDate;
    complaint.assignedAt = new Date();

    if (adminResponse?.trim()) {
      complaint.adminResponse = adminResponse.trim();
    }

    await complaint.save();

    await complaint.populate([
      {
        path: "customer",
        select: "fullName email phone",
      },
      {
        path: "room",
        select: "roomNumber roomType sharingType",
      },
      {
        path: "resolvedBy",
        select: "fullName",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Complaint assigned successfully.",
      complaint,
    });
  } catch (error) {
    console.error("Assign complaint error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==================================================
// ADMIN: RESOLVE COMPLAINT
// ==================================================

export const resolveComplaint = async (req, res) => {
  try {
    const { adminResponse } = req.body;

    if (!adminResponse?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Admin response is required.",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Complaint is already resolved.",
      });
    }

    complaint.status = "Resolved";
    complaint.adminResponse = adminResponse.trim();
    complaint.resolvedAt = new Date();
    complaint.resolvedBy = req.user._id;

    await complaint.save();

    await complaint.populate([
      {
        path: "customer",
        select: "fullName email phone",
      },
      {
        path: "room",
        select: "roomNumber roomType sharingType",
      },
      {
        path: "resolvedBy",
        select: "fullName",
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Complaint marked as resolved.",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
