const mongoose = require("mongoose");

const salesHistorySchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"],
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  weight: {
    type: Number,
    required: [true, "Weight is required"],
    // validate: {
    //   validator: async function (value) {
    //     const product = await mongoose.model("Product").findById(this.productId);
    //     if (!product) {
    //       throw new Error("Product not found schema side");
    //     }
    //     return value <= product.weight;
    //   },
    //   message: "Insufficient stock available schema side",
    // },
  },
  sellingPrice: {
    type: Number,
    required: [true, "Selling price is required"],
  },
  buyerName: {
    type: String,
    required: [true, "Buyer name is required"],
  },
  buyerEmail: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  buyerMobileNumber: {
    type: String,
    required: [true, "Buyer mobile number is required"],
  },
  buyerAddress: {
    type: String,
    required: [true, "City is required"],
  },
  modeOfPayment: {
    type: String,
    required: [true, "Mode of payment is required"],
  },
});

module.exports = mongoose.model("SalesHistory", salesHistorySchema);
