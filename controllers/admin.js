const Student = require('../models/student')

const getDroppedStudents = async (req, res, next) => {
    let students = await Student.find({})
    let dropped_students = []
    const currYear = new Date().getFullYear()
    
    for(let student of students){
        let studHist = student.history
        if (studHist.length === 0){
            continue;
        }
        else {
            if(studHist[studHist.length - 1].year !== currYear){
                dropped_students.push({
                    student
                })
            }
        }
    }
    res.status(200).json({
        drops: dropped_students
    })
}

module.exports = {
    getDroppedStudents
}