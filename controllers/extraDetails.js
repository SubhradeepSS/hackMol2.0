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
                "gender": gender
            }).sort({ "history.extraCurricular.rating": 1 })
            //await student.save();
        res.status(201).json({
            message: "Post created successfully!",
            list: list,
            details: details
        });
    } catch (err) {
        res.status(500).send("SOMETHING WENT WRONG!!");
    }
};