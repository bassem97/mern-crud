import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios";


function App() {

    const [studentName, setStudentName] = useState('')
    const [studentCIN, setStudentCIN] = useState(0)
    const [studentList, setStudentList] = useState([])

    const [newStudentName, setNewStudentName] = useState('')
    const [newStudentCIN, setNewStudentCIN] = useState(0)

    useEffect(() => {
        Axios.get('http://localhost:3001/getAllStudents').then(res => setStudentList(res.data))
    }, [])

    const addToList = () => {
        Axios.post("http://localhost:3001/addStudent", {
            studentName,
            studentCIN
        }).then(() => {
            console.log("ITEM ADDED !");

        })
    }

    function deleteStudent(_id) {
        Axios.delete(`http://localhost:3001/deleteStudent/${_id}`).then(() => console.log("ITEM DELETED !"))
    }

    function updateStudent(_id) {
        Axios.put("http://localhost:3001/updateStudent",{
            id: _id,
            studentName: newStudentName,
            studentCIN: newStudentCIN
        }).then(() => console.log("ITEM UPDATED !"))
    }

    return (
        <div className="App">
            <h1>CRUD with MERN</h1>

            <label>student name: < /label>
            <input type="text" onChange={(event) => {
                setStudentName(event.target.value)
            }}/>

            <label>student CIN: < /label>
            <input type="number" onChange={(event) => {
                setStudentCIN(event.target.value)
            }}/>

            <button onClick={addToList}>Add to list</button>

            <h1> Student List</h1>


            {studentList.map((val, key) => {
                return <div key={key} className="student">
                  <h3>{val.studentName}</h3> <h3> {val.studentCIN}</h3>
                    <input type="text" placeholder="New student name..." onChange={(event) => setNewStudentName(event.target.value)}/>
                    <input type="number" placeholder="New student CIN..." onChange={(event) => setNewStudentCIN(event.target.value)}/>
                    <button onClick={()=>updateStudent(val._id)}> Update</button>
                    <button onClick={()=>deleteStudent(val._id)}> delete</button>
                </div>
            })}


        </div>
    );
}

export default App;
