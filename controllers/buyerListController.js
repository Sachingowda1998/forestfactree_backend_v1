const BuyerList = require('../models/buyerListModel');

// Add a new buyer
exports.addBuyer = async (req, res) => {
  try {
    const newBuyer = new BuyerList(req.body);
    await newBuyer.save();
    res.status(201).json({ message: 'Buyer added successfully', buyer: newBuyer });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation errors', errors });
    }
    if (error.code === 11000) {
      // Duplicate key error
      const duplicateField = Object.keys(error.keyPattern)[0];
      if (duplicateField === 'email') {
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }
      if (duplicateField === 'mobileNumber') {
        return res.status(400).json({ message: 'Mobile number already exists. Please use a different mobile number.' });
      }
    }
    res.status(500).json({ message: 'Failed to add buyer', error: error.message });
  }
};


// Edit an existing buyer
exports.editBuyer = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBuyer = await BuyerList.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedBuyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json({ message: 'Buyer updated successfully', buyer: updatedBuyer });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation errors', errors });
    }
    if (error.code === 11000) {
      // Duplicate key error
      if (error.keyPattern.email) {
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }
      if (error.keyPattern.mobileNumber) {
        return res.status(400).json({ message: 'Mobile number already exists. Please use a different mobile number.' });
      }
    }
    res.status(500).json({ message: 'Failed to update buyer', error: error.message });
  }
};

// Delete a buyer
exports.deleteBuyer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBuyer = await BuyerList.findByIdAndDelete(id);

    if (!deletedBuyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json({ message: 'Buyer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete buyer', error: error.message });
  }
};

// Get all buyers
exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await BuyerList.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buyers', error: error.message });
  }
};


// Get a buyer by ID
exports.getBuyerById = async (req, res) => {
  const { id } = req.params;

  try {
    const buyer = await BuyerList.findById(id);

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buyer', error: error.message });
  }
};

// Get all buyers with only name, email, and mobile number
exports.getBuyersBasicInfo = async (req, res) => {
  try {
    const buyers = await BuyerList.find({}, 'name email mobileNumber'); // Select only the required fields
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buyers', error: error.message });
  }
};

