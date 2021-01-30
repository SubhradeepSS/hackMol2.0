const express = require("express");
const studentController = require("../controllers/student");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /college/create-student
router.post("/create-student", isAuth, studentController.createStudent);

module.exports = router;
