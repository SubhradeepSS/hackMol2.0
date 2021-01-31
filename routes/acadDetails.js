const express = require("express");
const acadDetailsController = require("../controllers/acadDetails");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /college/sort-details-acad
router.post("/sort-details-acad", isAuth, acadDetailsController.getAcadDetails);

module.exports = router;