import Rule from "../models/Rule.js";

// Create Rule
export const createRule = async (req, res) => {
  try {
    const rule = await Rule.create(req.body);

    res.status(201).json({
      success: true,
      message: "Rule created successfully.",
      rule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Rules
export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find();

    res.status(200).json({
      success: true,
      totalRules: rules.length,
      rules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Rule
export const getRule = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Rule not found.",
      });
    }

    res.status(200).json({
      success: true,
      rule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Rule
export const updateRule = async (req, res) => {
  try {
    const rule = await Rule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Rule not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rule updated successfully.",
      rule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Rule
export const deleteRule = async (req, res) => {
  try {
    const rule = await Rule.findByIdAndDelete(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Rule not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rule deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
