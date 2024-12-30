const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  addCategory,
  editCategory,
  deleteCategory,
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
} = require("../controllers/categoryController");

// Route to get all categories
router.get("/", getAllCategories);

// Route to add a new category
router.post("/add", addCategory);

// Route to edit an existing category
router.put("/edit", editCategory);

// Route to delete a category by ID
router.delete("/delete", deleteCategory);

// Route to add a subcategory to a category
router.post("/addSubcategory", addSubcategory);

// Route to edit a subcategory within a category
router.put("/editSubcategory", editSubcategory);

// Route to delete a subcategory within a category
router.delete("/deleteSubcategory", deleteSubcategory);

module.exports = router;