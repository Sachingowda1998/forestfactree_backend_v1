// controllers/adminController.js
const Admin = require("../models/AdminModel");

exports.adminLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const admin = await Admin.findOne({ userId });
    if (!admin) {
      return res.status(404).json({ message: "Username doesn't exist." });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect." });
    }

    const token = admin.generateToken();
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add new admin
exports.addAdmin = async (req, res) => {
  const { adminName, userId, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ userId });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this userId already exists." });
    }

    const newAdmin = new Admin({ adminName, userId, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add admin.", error: error.message });
  }
};

// Edit admin details
exports.editAdmin = async (req, res) => {
  const { userId } = req.params;
  const { adminName, password } = req.body;

  try {
    const admin = await Admin.findOne({ userId });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    if (adminName) admin.adminName = adminName;
    if (password) admin.password = password; // Pre-save hook will hash it

    await admin.save();

    res.status(200).json({ message: "Admin updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update admin.", error: error.message });
  }
};
