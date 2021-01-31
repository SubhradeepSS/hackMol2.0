const express = require("express");
const extraDetailsController = require("../controllers/extraDetails");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /college/sort-details-extra
router.post("/sort-details-extra", isAuth, extraDetailsController.getExtraDetails);

module.exports = router;