const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentName:{
        type: String,
        required : true,
    },
    studentCIN: {
        type: String,
    }
})

module.exports = mongoose.model("students", studentSchema);
