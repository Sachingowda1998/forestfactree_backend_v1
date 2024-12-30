const Subcategory = require("../models/subcategoryModel");

// Controller to get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// Controller to add a new subcategory
exports.addSubcategory = async (req, res) => {
  const { sname, categoryName } = req.body;

  try {
    const newSubcategory = new Subcategory({
      sname,
      categoryName,
    });

    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Error adding subcategory", error });
  }
};

// Controller to edit a subcategory
exports.editSubcategory = async (req, res) => {
  const { subcategoryId, sname, categoryName } = req.body;

  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { sname, categoryName },
      { new: true, runValidators: true } // Return updated document and run validators
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation errors", errors });
    }
    res.status(500).json({ message: "Error editing subcategory", error });
  }
};

// Controller to delete a subcategory
exports.deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.body;

  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);

    if (!deletedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};


// Controller to get a particular subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const subcategory = await Subcategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategory", error });
  }
};


// Controller to get all subcategories by category name
exports.getSubcategoriesByCategoryName = async (req, res) => {
  const { categoryName } = req.query;

  try {
    const subcategories = await Subcategory.find({ categoryName });

    if (subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found for this category" });
    }

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories by category name", error });
  }
};

