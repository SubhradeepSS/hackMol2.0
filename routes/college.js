const express = require("express");
const collegeController = require("../controllers/college");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /create-college
router.post("/create-college", isAuth, collegeController.createCollege);
router.post("/signupCollege", collegeController.collegeSignup);
router.post("/loginCollege", collegeController.collegeLogin);

module.exports = router;
