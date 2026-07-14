import Facility from "../models/Facility.js";

// Create Facility
export const createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);

    res.status(201).json({
      success: true,
      message: "Facility created successfully.",
      facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Facilities
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();

    res.status(200).json({
      success: true,
      totalFacilities: facilities.length,
      facilities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Facility
export const getFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    res.status(200).json({
      success: true,
      facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Facility
export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Facility updated successfully.",
      facility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Facility
export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Facility deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
