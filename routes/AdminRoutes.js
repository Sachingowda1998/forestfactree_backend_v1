// routes/adminRoutes.js
const express = require("express");
const { adminLogin,
    addAdmin,
    editAdmin,
 } = require("../controllers/AdminController");
const router = express.Router();

// POST /admin/login
router.post("/login", adminLogin);

// POST /admin/add
router.post("/add", addAdmin);

// PUT /admin/edit/:userId
router.put("/edit/:userId", editAdmin);

module.exports = router;
