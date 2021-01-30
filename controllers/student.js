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
    res.status(500).send("SOMETHING WENT WRONG!!");
  }
};
