const PurchaseHistory = require("../models/purchaseHistoryModel");

// Add a new purchase entry
exports.addPurchaseHistory = async (req, res) => {
  try {
    const newPurchase = await PurchaseHistory.create(req.body);
    res.status(201).json({ message: "Purchase added successfully", purchase: newPurchase });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Failed to add purchase", error: error.message });
  }
};

// Edit an existing purchase entry
exports.editPurchaseHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPurchase = await PurchaseHistory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase history not found" });
    }
    res.status(200).json({ message: "Purchase updated successfully", purchase: updatedPurchase });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Failed to update purchase", error: error.message });
  }
};

// Delete a purchase entry
exports.deletePurchaseHistory = async (req, res) => { 
  const { id } = req.params;
  try {
    const deletedPurchase = await PurchaseHistory.findByIdAndDelete(id);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase history not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete purchase", error: error.message });
  }
};

// Get all purchase history records
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await PurchaseHistory.find();
    res.status(200).json({ purchases });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchase history", error: error.message });
  }
};


// Updated Controller to fetch a particular purchase history by ID
exports.getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await PurchaseHistory.findById(id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase history not found" });
    }
    res.status(200).json({ purchase });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchase history", error: error.message });
  }
};
