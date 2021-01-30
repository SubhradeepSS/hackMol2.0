const Student = require("../models/student");


exports.getExtraDetails = async(req, res, next) => {
    try {
        const details = req.body;
        const gender = details.gender
        const collegeId = details.collegeId
        const tag = details.tag
        const title = details.title

        const list = await Student.find({
            "history.extraCurricular.tag": tag,
            "history.extraCurricular.title": title,
            "gender": gender,
            "history.collegeId": collegeId,
        }).sort({ "history.extraCurricular.rating": 1 })
        res.status(201).json({
            message: "Post created successfully!",
            list: list,
        });
    } catch (err) {
        if (err.message) return res.status(500).json({ message: err.message });
        else return res.status(500).json({ message: "Something Went Wrong!" });
    }
};