const express = require("express");
const moneyDetailsController = require("../controllers/moneyDetails");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /college/sort-details-money
router.post("/sort-details-money", isAuth, moneyDetailsController.getMoneyDetails);

module.exports = router;