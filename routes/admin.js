const express = require("express");
const isAuth = require("../middleware/is-auth");
const { getDroppedStudents } = require('../controllers/admin')

const router = express.Router();

// GET /admin/check-drop
router.get("/check-drop", isAuth, getDroppedStudents);


module.exports = router;
