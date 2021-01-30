const Student = require("../models/student");


exports.getAcadDetails = async(req, res, next) => {
    try {
        const details = req.body;
        const gender = details.gender
        const collegeId = details.collegeId


        //Todo :-sort the inner array based on aggregation 
        //       and Learn aggregration

        const list = await Student.find({
            "gender": gender,
            "history.collegeId": collegeId,
        })
        res.status(201).json({
            message: "Post created successfully!",
            list: list,
        });
    } catch (err) {
        if (err.message) return res.status(500).json({ message: err.message });
        else return res.status(500).json({ message: "Something Went Wrong!" });
    }
};