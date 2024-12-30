const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const purchaseHistorySchema = new mongoose.Schema({
  dateOfAdd: {
    type: Date,
    default: Date.now,
  },
  sellerName: {
    type: String,
    required: [true, "Seller name is required"],
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  category: {
    type: String,
    trim: true,
  },
  subcategory: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  units: {
    type: String,
    required: [true, "Units are required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});

// Add mongoose-sanitize plugin
purchaseHistorySchema.plugin(sanitize);

module.exports = mongoose.model("PurchaseHistory", purchaseHistorySchema);
