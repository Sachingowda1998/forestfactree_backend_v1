const express = require("express");
const router = express.Router();
const {
  getAllSubcategories,
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
  getSubcategoryById,
  getSubcategoriesByCategoryName
} = require("../controllers/subcategoryController");

// Route to get all subcategories
router.get("/", getAllSubcategories);

// Route to get subcategories by category name
router.get("/by-category", getSubcategoriesByCategoryName);

// Route to add a new subcategory
router.post("/add", addSubcategory);

// Route to edit an existing subcategory
router.put("/edit", editSubcategory);

// Route to delete a subcategory by ID
router.delete("/delete", deleteSubcategory);

// Route to get a particular subcategory by ID
router.get("/:subcategoryId", getSubcategoryById);




module.exports = router;
