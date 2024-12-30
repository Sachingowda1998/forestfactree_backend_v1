const express = require('express');
const router = express.Router();
const {
  addBuyer,
  editBuyer,
  deleteBuyer,
  getAllBuyers,
  getBuyerById,
  getBuyersBasicInfo,  // Add the new controller function
} = require('../controllers/buyerListController');

// Route to add a new buyer
router.post('/add', addBuyer);

// Route to get basic information (name, email, mobile number) of all buyers
router.get('/basic-info', getBuyersBasicInfo);  // New route for basic info

// Route to edit an existing buyer
router.put('/edit/:id', editBuyer);

// Route to delete a buyer by ID
router.delete('/delete/:id', deleteBuyer);

// Route to get all buyers
router.get('/all', getAllBuyers);

// Route to get a buyer by ID
router.get('/buyer/:id', getBuyerById);  // New route

module.exports = router;
