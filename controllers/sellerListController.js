const SellerList = require("../models/sellerListModel");

// Add a new seller
exports.addSeller = async (req, res) => {
  try {
    const newSeller = new SellerList(req.body);
    await newSeller.save();
    res.status(201).json({ message: "Seller added successfully", seller: newSeller });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists. Please use a different email." });
      }
      if (error.keyPattern.mobileNumber) {
        return res.status(400).json({ message: "Mobile number already exists. Please use a different mobile number." });
      }
    }
    res.status(500).json({ message: "Failed to add seller", error: error.message });
  }
};

// Edit an existing seller
exports.editSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSeller = await SellerList.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ message: "Seller updated successfully", seller: updatedSeller });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists. Please use a different email." });
      }
      if (error.keyPattern.mobileNumber) {
        return res.status(400).json({ message: "Mobile number already exists. Please use a different mobile number." });
      }
    }
    res.status(500).json({ message: "Failed to update seller", error: error.message });
  }
};

// Delete a seller
exports.deleteSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeller = await SellerList.findByIdAndDelete(id);

    if (!deletedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete seller", error: error.message });
  }
};

// Get all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await SellerList.find();
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers", error: error.message });
  }
};
