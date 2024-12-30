const SalesHistory = require("../models/salesHistoryModel");
const Product = require("../models/productModel");

// Add a new sale
exports.addSale = async (req, res) => {
  try {
    const { productId, productName, weight, sellingPrice, buyerName, buyerEmail, buyerMobileNumber, buyerAddress, modeOfPayment } = req.body;

    // Validate if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    // Check if the requested weight is available in stock
    if (weight > product.weight) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    // Create new sales history entry
    const newSale = new SalesHistory({
      productId: productId,
      productName : productName,
      weight: weight,
      sellingPrice: sellingPrice,
      buyerName : buyerName,
      buyerEmail : buyerEmail,
      buyerMobileNumber : buyerMobileNumber,
      buyerAddress : buyerAddress,
      modeOfPayment: modeOfPayment,
      orderDate: new Date(),
    });

    await newSale.save();

    // Deduct the stock in product table
    product.weight -= weight;
    await product.save();

    // Return success response
    res.status(201).json({ message: "Sales history added successfully", sale: newSale });
  } catch (error) {
    res.status(500).json({ message: "Error creating sales history", error });
  }
};




// Get all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await SalesHistory.find().populate("productId", "productName weight");
    res.status(200).json({ success: true, data: sales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const sale = await SalesHistory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.status(200).json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    const sale = await SalesHistory.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.status(200).json({ success: true, message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
