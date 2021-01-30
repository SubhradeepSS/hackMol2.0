const Student = require("../models/student");

exports.createStudent = async (req, res, next) => {
  try {
    const student = await new Student(req.body);
    await student.save();
    res.status(201).json({
      message: "Post created successfully!",
      student: student,
    });
  } catch (err) {
    if (err.message) res.status(500).json({ message: err.message });
    else res.status(500).json({ message: "Something Went Wrong!" });
  }
};

exports.updateStudentHistory = async (req, res, next) => {
  try {
    const aadhar = req.body.aadhar;
    const collegeId = req.body.collegeId;
    const collegeName = req.body.collegeName;
    const present = req.body.present;

    const student = await Student.findOne({ aadhar: aadhar });
    if (!student)
      throw new Error("No student with the aadhar number exists in db");

    // present.collegeId = Schema.Types.ObjectId(collegeId.toString());
    // present.collegeName = Schema.Types.ObjectId(collegeName.toString());

    student.history.push(present);
    await student.save();

    res.status(201).json({
      message: "Student db updated successfully!",
      student: student,
    });
  } catch (err) {
    if (err.message) res.status(500).json({ message: err.message });
    else res.status(500).json({ message: "Something Went Wrong!" });
  }
};
