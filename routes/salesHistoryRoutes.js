const express = require("express");
const router = express.Router();
const salesHistoryController = require("../controllers/salesHistoryController");

router.post("/", salesHistoryController.addSale);
router.get("/", salesHistoryController.getSales);
router.put("/:id", salesHistoryController.updateSale);
router.delete("/:id", salesHistoryController.deleteSale);

module.exports = router;
