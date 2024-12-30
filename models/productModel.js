const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const productSchema = new mongoose.Schema({
  productName: { 
    type: String, 
    required: [true, "Product name is required"],
    trim: true 
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
    maxlength: [25, "Short description cannot exceed 25 characters"],
  },
  longDescription: { 
    type: String, 
    required: [true, "Long description is required"] 
  },
  images: {
    type: [String],
    validate: {
      validator: (v) => v.length === 4,
      message: "Exactly four images are required",
    },
    required: [true, "Four images are required"],
  },
  weight: { 
    type: Number, 
    required: [true, "Weight is required"] 
  },
  units: { 
    type: String, 
    required: [true, "Units are required"] 
  },
  treeMeasure: { 
    type: String 
  },
  category: { 
    type: String, 
    required: [true, "Category is required"], 
    trim: true 
  },
  subcategory: { 
    type: String, 
    trim: true 
  },
  productAddedDate: { 
    type: Date, 
    default: Date.now 
  },
});

// Add mongoose-sanitize plugin
productSchema.plugin(sanitize);

module.exports = mongoose.model("Product", productSchema);
