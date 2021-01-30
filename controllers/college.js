const College = require("../models/college");

exports.createCollege = async (req, res, next) => {
  try {
    const name = req.body.name;
    const address = req.body.address;

    const college = await new College({ name, address });
    await college.save();

    console.log(college);

    return res.status(201).json({
      success: true,
      message: "College created successfully!",
      college: college,
    });
  } catch (err) {
    if (err.message) return res.status(500).json({ message: err.message });
    else return res.status(500).json({ message: "Something Went Wrong!" });
  }
};
