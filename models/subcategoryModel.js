const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

// Define the Subcategory schema
const subcategorySchema = new mongoose.Schema({
  sname: {
    type: String,
    required: [true, "Subcategory name is required"],
    trim: true,
  },
  categoryName: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
  },
});

// Add mongoose-sanitize plugin
subcategorySchema.plugin(sanitize);

module.exports = mongoose.model("Subcategory", subcategorySchema);
