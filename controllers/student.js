const mongoose = require("mongoose");
const Student = require("../models/student");

exports.createStudent = async (req, res, next) => {
  try {
    const student = await new Student(req.body);
    await student.save();
    return res.status(201).json({
      success: true,
      message: "Post created successfully!",
      student: student,
    });
  } catch (err) {
    if (err.message) return res.status(500).json({ message: err.message });
    else return res.status(500).json({ message: "Something Went Wrong!" });
  }
};

exports.updateStudentHistory = async (req, res, next) => {
  try {
    const aadhar = req.body.aadhar;
    const present = req.body.present;
    const collegeId = req.body.present.collegeId;

    const student = await Student.findOne({ aadhar: aadhar });
    if (!student)
      throw new Error("No student with the aadhar number exists in db");

    present.collegeId = mongoose.Types.ObjectId(collegeId.toString());

    student.history.push(present);
    student.goingClass++;
    
    await student.save();

    return res.status(201).json({
      success: true,
      message: "Student db updated successfully!",
      student: student,
    });
  } catch (err) {
    console.log(err);
    if (err.message) return res.status(500).json({ message: err.message });
    else return res.status(500).json({ message: "Something Went Wrong!" });
  }
};
