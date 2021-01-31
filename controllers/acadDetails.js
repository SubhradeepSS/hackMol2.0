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

        list.sort(
            function(a, b) {
                var aSum = 0,
                    bSum = 0;
                var i = a.history.length;
                while (i--) aSum += a.history[i].academicResult.cgpa
                if (a.history.length > 0)
                    aSum /= a.history.length;
                i = b.history.length;
                while (i--) bSum += b.history[i].academicResult.cgpa
                if (b.history.length > 0)
                    bSum /= b.history.length;
                if (bSum == aSum) {
                    return a.FamilyIncome - b.FamilyIncome
                }
                return bSum - aSum;

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