const Category = require("../models/categoryModel");
const upload = require("../middleware/multerConfig");
const path = require("path");

// Controller for getting all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Controller for adding a new category
exports.addCategory = (req, res) => {
  upload.single('cimage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { name, cdescp, subcategories } = req.body;
    let cimage = req.file.path;

    // Ensure the path uses forward slashes for cross-platform compatibility
    cimage = cimage.replace(/\\/g, "/");

    try {
      const newCategory = new Category({
        name,
        cdescp,
        cimage,
        subcategories,
      });

      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Error adding category", error });
    }
  });
};

// Controller for editing a category
exports.editCategory = async (req, res) => {
  upload.single('cimage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { categoryId, name, cdescp, subcategories } = req.body;
    let cimage = req.file ? req.file.path : undefined;

    // Ensure the path uses forward slashes for cross-platform compatibility
    if (cimage) {
      cimage = cimage.replace(/\\/g, "/");
    }

    const updatedCategoryData = { name, cdescp, subcategories };
    if (cimage) {
      updatedCategoryData.cimage = cimage;
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updatedCategoryData,
        { new: true, runValidators: true } // Return the updated document and run validators
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation errors", errors });
      }
      res.status(500).json({ message: "Error editing category", error });
    }
  });
};

// Controller for deleting a category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.body;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Controller to add a subcategory
exports.addSubcategory = async (req, res) => {
  const { categoryId, subcategory } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.subcategories.push(subcategory);
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Error adding subcategory", error });
  }
};

// Controller to edit a subcategory
exports.editSubcategory = async (req, res) => {
  const { categoryId, subcategoryId, updatedSubcategory } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategory = category.subcategories.id(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    Object.assign(subcategory, updatedSubcategory);

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Error editing subcategory", error });
  }
};

// Controller for deleting a subcategory
exports.deleteSubcategory = async (req, res) => {
  const { categoryId, subcategoryId } = req.body;

  try {
    if (!categoryId || !subcategoryId) {
      return res.status(400).json({ message: "categoryId and subcategoryId are required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const initialLength = category.subcategories.length;
    category.subcategories = category.subcategories.filter(
      (subcategory) => subcategory._id.toString() !== subcategoryId
    );

    if (category.subcategories.length === initialLength) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};