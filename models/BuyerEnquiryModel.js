const mongoose = require("mongoose");
const sanitize = require("mongoose-sanitize");

// Define the Buyer Enquiry Schema
const BuyerEnquirySchema = new mongoose.Schema({
  enquiryDate: { type: Date, default: Date.now },
  buyerName: { type: String, required: [true, 'Buyer name is required'] },
  buyerEmail: {
    type: String,
    required: [true, 'Buyer email is required'],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
  },
  buyerPhoneNumber: { 
    type: Number, 
    required: [true, 'Buyer phone number is required'], 
    validate: { 
      validator: function(v) { 
        return /\d{10}/.test(v); 
      }, 
      message: props => `${props.value} is not a valid 10-digit phone number!` 
    } 
  }, 
  buyerAlternatePhoneNumber: { 
    type: Number, 
    validate: { 
      validator: function(v) { 
        return !v || /\d{10}/.test(v); 
      }, 
      message: props => `${props.value} is not a valid 10-digit phone number!` 
    } 
  },
  buyerAddress: { type: String, required: [true, 'Buyer address is required'] },
  enquiryDetails: { type: String, required: [true, 'Enquiry details are required'] },
  enquiryStatus: { type: String, default: "Pending" }, // Default status is "Pending"
  buyerType: { type: String, required: [true, 'Buyer type is required'] } // New required field
});

BuyerEnquirySchema.plugin(sanitize);

module.exports = mongoose.model("BuyerEnquiry", BuyerEnquirySchema);
