const express = require("express");
const router = express.Router();
const {
  addPurchaseHistory,
  editPurchaseHistory,
  deletePurchaseHistory,
  getAllPurchases,
  getPurchaseById,
} = require("../controllers/purchaseHistoryController");

// Add a new purchase
router.post("/add", addPurchaseHistory);

// Edit an existing purchase
router.put("/edit/:id", editPurchaseHistory);

// Delete a purchase
router.delete("/delete/:id", deletePurchaseHistory);

// View all purchase history records
router.get("/all", getAllPurchases);

// To get a particular purchase history.
router.get("/:id", getPurchaseById);

module.exports = router;

