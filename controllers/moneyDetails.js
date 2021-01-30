const Student = require("../models/student");


exports.getMoneyDetails = async(req, res, next) => {
    try {
        const details = req.body;
        const gender = details.gender
        const collegeId = details.collegeId
        const lessThan = details.lessThan

        // add sorting based on marks using aggregate here also
        const list = await Student.find({
            "gender": gender,
            "history.collegeId": collegeId,
            "FamilyIncome": { $lt: lessThan },
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