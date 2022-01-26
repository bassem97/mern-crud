const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require('./models/Student');


const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://bassem:mern-crud@mern-crud.hsd9a.mongodb.net/esprit-students?retryWrites=true&w=majority",
);


app.post("/addStudent", async (req, res) => {
    const student = new Student({
        studentName: req.body.studentName,
        studentCIN: req.body.studentCIN
    })
    try {
        await student.save();
        res.send('inserted Data '+student)
    } catch (e) {
        console.log(e);
    }
})

app.put("/updateStudent", async (req, res) => {
       const  studentName =  req.body.studentName
       const  studentCIN = req.body.studentCIN
       const  id = req.body.id
    console.log(studentName);

    try {
        await Student.findById(id, (e,updateStudent) => {
            updateStudent.studentName = studentName
            updateStudent.studentCIN = studentCIN
            updateStudent.save()
            res.send('updated Data '+studentName)
        })

    } catch (e) {
        console.log(e);
    }
})

app.get("/getAllStudents", async (req, res) => {
    Student.find({}, (error, result) => {
        error? res.send(error) : res.send(result)
    })
})

app.delete("/deleteStudent/:id", async (req, res) => {
    await Student.findByIdAndRemove(req.params.id).exec()
    res.send("deleted")
})

app.listen(3001, () => {
    console.log("SERVER RUNS 3001");
});
