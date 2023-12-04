import "./CreateTask.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context";
import { useEffect } from "react";



function CreateTask() {
    const { user, family, setUser } = useContext(AuthContext);
    const [familyMember, setfamilyMember] = useState([])
    const [task, setTask] = useState([])
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTime, setTaskTime] = useState("");
    const [taskWeekDay, setTaskWeekDay] = useState("");
    const [taskAssignedTo, setTaskAssignedTo] = useState("");
    /* const [taskFamily, setTaskFamily] = useState("");
    const [taskOwner, setTaskOwner] = useState("");
    const [taskIcon, setTaskIcon] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskIsDone, setTaskIsDone] = useState("");
    const [taskImgUploaded, setTaskImgUploaded] = useState("");
    const [taskComments, setTaskComments] = useState(""); */



    const handleTaskDescription = (e) => setTaskDescription(e.target.value);
    const handleTaskTime = (e) => setTaskTime(e.target.value);
    const handleTaskWeekDay = (e) => setTaskWeekDay(e.target.value);
    const handleTaskAssignedTo = (e) => setTaskAssignedTo(e.target.value);
    /* const handleTaskFamily = (e) => setTaskFamily(e.target.value);
    const handleTaskOwner = (e) => setTaskOwner(e.target.value);
    const handleTaskIcon = (e) => setTaskIcon(e.target.value);
    const handleTaskName = (e) => setTaskName(e.target.value); */

    const navigate = useNavigate();

    const getFamilyId = async (event) => {
        try {
          const familyMembersResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/familymembers/${family._id}`)
          const familyMembers = await familyMembersResponse.json()
          console.log(familyMembers);
          setfamilyMember(familyMembers)
        } catch (error) { console.log(error); }
      }
      useEffect(() => {
        getFamilyId()
      }, [])

    const handleSubmitTask = async (e) => {///after you create a task you will redirect to HomePage
        e.preventDefault()
        //console.log("working: ", taskDescription, taskTime, taskWeekDay);

        try {
            const submitTask = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/task`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ taskDescription: taskDescription, taskTime: taskTime, taskWeekDay: taskWeekDay, taskAssignedTo: taskAssignedTo })
            })
            setTaskDescription("");
            setTaskTime("");
            setTaskWeekDay("");
            setTaskAssignedTo("")
            navigate('/')
        }
        catch (error) { console.log(error) }
    }

    return (
        <>
<form className="form-createtask-container" onSubmit={handleSubmitTask}>
           {/*  falta and task icon, falta taskindone, falta assigned to, falta taskImgUploaded, falta task comments  */}
            <label className="label-createtask">To do:</label>
            <input id="content" name="description" required onChange={handleTaskDescription}></input>
            <br/>
            <label className="label-createtask" HtmlFor="dayMoment"><b>When? Choose a timing interval to finish the task</b></label>
            <select className="select-createtask" id="timing-interval" name="timingInterval" onChange={handleTaskTime}>
                <option value="On Wake Up">On Wake Up</option>
                <option value="Before Breakfast">Before Breakfast</option>
                <option value="After Breakfast">After Breakfast</option>
                <option value="Before Lunch">Before Lunch</option>
                <option value="After Lunch">After Lunch</option>
                <option value="In the afternoon">In the Afternoon</option>
                <option value="Before Dinner">In the Afternoon</option>
                <option value="After Dinner">In the Afternoon</option>
                <option value="Before Sleep">In the Afternoon</option>
            </select>
            <br/>
            <label className="label-createtask" htmlFor="dayMoment"><b>Choose a day of the week</b></label>
            <select className="select-createtask" id="day-moment" name="dayMoment" onChange={handleTaskWeekDay}>
                <option value="Everyday">Everyday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <br/>
            <label htmlFor="personAssigned"><b>Chose a person of the family to assign the task:</b></label>
                <select id="person-assigned" name="personAssigned" onChange={handleTaskAssignedTo}>
                    {familyMember.map((eachFamilyMember, index) => {
                        return (<option value={eachFamilyMember.name}>{eachFamilyMember.name}</option>)
                    })
                    }
                </select>

            <button type="submit" className="new-task"><i class="fa-solid fa-circle-plus"></i></button>

            </form>
        </>
    )
}
export default CreateTask;



/* 
 <label for="dayMoment"><b>Choose a day of the week</b></label>
<select id="day-moment" name="dayMoment">
    <option value="Everyday">Everyday</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
</select>
<br/>

const taskSubmit = async (event) =>{
        event.preventDefault()
        console.log("creating task: ", taskSubmit)
        try {
            const submitTask = await fetch(`${import.meta.env.VITE_SERVER_URL}/createtask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({taskName: taskName})
            })
            setTaskName()
            
        } catch (error) {
            
        }
    }
*/