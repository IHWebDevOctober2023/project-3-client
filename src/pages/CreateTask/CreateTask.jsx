import "./CreateTask.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

function CreateTask() {
    const { user, family, setUser } = useContext(AuthContext);
    const [familyMember, setfamilyMember] = useState([])
    const [task, setTask] = useState([])
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTime, setTaskTime] = useState("");
    const [taskWeekDay, setTaskWeekDay] = useState("");
    const [taskAssignedTo, setTaskAssignedTo] = useState("");

    const handleTaskDescription = (e) => setTaskDescription(e.target.value);
    const handleTaskTime = (e) => setTaskTime(e.target.value);
    const handleTaskWeekDay = (e) => setTaskWeekDay(e.target.value);
    const handleTaskAssignedTo = (e) => setTaskAssignedTo(e.target.value);

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

    const handleSubmitTask = async (e) => {
        e.preventDefault()
        try {
            const submitTask = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/task`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ taskDescription: taskDescription, taskTime: taskTime, taskWeekDay: taskWeekDay, taskAssignedTo: taskAssignedTo, taskFamily: family._id })
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
        <Navbar/>        <form className="form-createtask-container" onSubmit={handleSubmitTask}>
            <h2 className="text-h2">NEW TASK</h2>
            <input className="input-create-task" placeholder="Name of the task" name="description" required onChange={handleTaskDescription}>
            </input>

            <select className="input-create-task" name="timingInterval" onChange={handleTaskTime}>
                <option value="Time interval">Time interval</option>
                <option value="On Wake Up">On Wake Up</option>
                <option value="Before Breakfast">Before Breakfast</option>
                <option value="After Breakfast">After Breakfast</option>
                <option value="Before Lunch">Before Lunch</option>
                <option value="After Lunch">After Lunch</option>
                <option value="In the afternoon">In the Afternoon</option>
                <option value="Before Dinner">Before Dinner</option>
                <option value="After Dinner">After Dinner</option>
                <option value="Before Sleep">Before Sleep</option>
            </select>
            <select className="input-create-task" id="day-moment" name="dayMoment" onChange={handleTaskWeekDay}>
                <option value="Everyday">Day of the week</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <select className="input-create-task" name="personAssigned" onChange={handleTaskAssignedTo}>
                <option value="empty">Family member</option>
                {familyMember?.map((eachFamilyMember, index) => {
                    return (
                        <option value={eachFamilyMember._id}>
                            {eachFamilyMember.name}
                        </option>
                    )
                })
                }
            </select>
            <br></br>
            <button type="submit" className="add-task"><i class="fa-solid fa-circle-plus"></i></button>
        </form>
        </>
    );

}

export default CreateTask;





