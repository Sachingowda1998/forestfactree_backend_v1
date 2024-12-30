const express = require("express");
const router = express.Router();
const {
  addSeller,
  editSeller,
  deleteSeller,
  getAllSellers,
} = require("../controllers/sellerListController");

// Route to add a new seller
router.post("/add", addSeller);

// Route to edit an existing seller
router.put("/edit/:id", editSeller);

// Route to delete a seller by ID
router.delete("/delete/:id", deleteSeller);

// Route to get all sellers
router.get("/all", getAllSellers);

module.exports = router;
