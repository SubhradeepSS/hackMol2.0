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
                var normalize = bSum + aSum;
                bSum /= normalize;
                aSum /= normalize;

                var incomeNormalize = a.FamilyIncome + b.FamilyIncome;
                var aIncome = a.FamilyIncome / incomeNormalize;
                var bIncome = b.FamilyIncome / incomeNormalize;

                return bSum * bIncome - aSum * aIncome;

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