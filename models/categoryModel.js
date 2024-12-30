const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

// Define the subcategory schema
const subcategorySchema = new mongoose.Schema({
  sname: { 
    type: String, 
    required: [true, "Subcategory name is required"], 
    trim: true
  },
});

// Define the main category schema
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Category name is required"], 
    trim: true
  },
  cdescp: { 
    type: String, 
    required: [true, "Category description is required"] 
  },
  cimage: { 
    type: String, 
    required: [true, "Category image is required"] 
  },
  subcategories: [subcategorySchema], // Array of subcategories
});

// Add mongoose-sanitize plugin
categorySchema.plugin(sanitize);

module.exports = mongoose.model("Category", categorySchema);