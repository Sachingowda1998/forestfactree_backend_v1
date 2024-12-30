const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

const sellerEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  alternateMobile: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  farmAddress: {
    type: String,
    required: [true, 'Farm address is required']
  },
  productName: {
    type: String,
    required: [true, 'Product name is required']
  },
  weight: {
    type: String,
    required: [true, 'Weight is required']
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required']
  },
  enquiryDetails: {
    type: String
  },
  enquiryDate: {                   // Added this field
    type: Date,
    default: Date.now
  },
  enquiryStatus: {                 // Added this field
    type: String,
    default: "Pending"
  }
});

// Add mongoose-sanitize plugin
sellerEnquirySchema.plugin(sanitize);

module.exports = mongoose.model("SellerEnquiry", sellerEnquirySchema);
