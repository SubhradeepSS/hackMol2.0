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
        })
        list.sort(
            function(a, b) {
                var aSum = 0,
                    bSum = 0;
                var i = a.history.length;
                while (i--) {
                    var j = a.history[i].extraCurricular.length;
                    var aTemp = 0,
                        k = j;
                    while (j--) {
                        var levelFactor = 1
                        var strComp = a.history[i].extraCurricular[j].level.toLowerCase()
                        if (strComp == "national")
                            levelFactor = 8;
                        if (strComp == "state")
                            levelFactor = 4;
                        if (strComp == "district")
                            levelFactor = 2;
                        if (strComp == "school")
                            levelFactor = 1;
                        console.log(levelFactor);
                        aTemp += (a.history[i].extraCurricular[j].rating * levelFactor);
                    }
                    if (k > 0) {
                        aTemp /= k;
                    }
                    aSum += aTemp;
                }
                if (a.history.length > 0)
                    aSum /= a.history.length;
                i = b.history.length;
                while (i--) {
                    var j = b.history[i].extraCurricular.length;
                    var bTemp = 0,
                        k = j;
                    while (j--) {
                        var levelFactor = 1
                        var strComp = b.history[i].extraCurricular[j].level.toLowerCase()
                        if (strComp == "national")
                            levelFactor = 8;
                        if (strComp == "state")
                            levelFactor = 4;
                        if (strComp == "district")
                            levelFactor = 2;
                        if (strComp == "school")
                            levelFactor = 1;
                        bTemp += (b.history[i].extraCurricular[j].rating * levelFactor);
                    }
                    if (k > 0) {
                        bTemp /= k;
                    }
                    bSum += bTemp;
                }
                if (b.history.length > 0)
                    bSum /= b.history.length;
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