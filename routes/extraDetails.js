const express = require("express");
const extraDetailsController = require("../controllers/extraDetails");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /college/create-student
router.post("/sort-details-extra", isAuth, extraDetailsController.getExtraDetails);

module.exports = router;