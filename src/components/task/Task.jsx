import "./Task.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from "react";

function Task(props) {
  const { family } = useContext(AuthContext);
  const [taskIsDone, setTaskIsDone] = useState(props.taskIsDone)
  const [deleteTask, setDeleteTask] = useState([])
  const [familyMember, setfamilyMember] = useState([])
  const [taskAssignedTo, setTaskAssignedTo] = useState("");
  const handleTaskAssignedTo = (e) => setTaskAssignedTo(e.target.value);

  const getFamilyId = async (event) => {
    try {
      const familyMembersResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/familymembers/${family._id}`)
      const familyMembers = await familyMembersResponse.json()
      setfamilyMember(familyMembers)
    } catch (error) { console.log(error); }
  }
  useEffect(() => {
    getFamilyId()
  }, [])
  useEffect(() => {
    checkbox()
  }, [taskIsDone])
  useEffect(() =>{
    findDeleteTask()
  },[])
  /* DELETE PART */
  const findDeleteTask = async (event) => {
    try {
      const deleteTaskResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/deletetask/${props.taskId}`, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const deleteTask = await deleteTaskResponse.json()

      setDeleteTask(deleteTask)
    } catch (error) { console.log("this is the error : ", error); }
  }
  /*checkBox */

  const checkbox = async (event) => {
    try {
      const taskIsDoneResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/taskisdone/${props.taskId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ taskIsDone })
      })
      const getTaskIsDone = await taskIsDoneResponse.json()
      //setTaskIsDone(getTaskIsDone)
    } catch (error) { console.log("this is the error taskIsDone: ", error); }
  }

  const handleChange = (event) => {
    setTaskIsDone(!taskIsDone)
    console.log(event.target.checked);
  }


  return (
    <div className="task">
      <p className="description">{props.taskDescription}</p>
      <p className="time">{props.taskTime}</p>
      <p className="weekday">{props.taskWeekDay}</p>
      <input type="checkbox" checked={taskIsDone} name="taskisdone" onChange={(event) => handleChange(event)} />

      <button onClick={() => findDeleteTask(props.taskId)}><span><i class="fa-regular fa-trash-can"></i></span></button>




      <p>{props.taskComments}</p>
    </div>)
}
export default Task


{/*     <p className="assinged-to">{props.taskAssignedTo}</p>
  <p className="comments">{props.taskComments}</p> */}


{/* <p>{props.taskAssignedTo}</p>
    <p>Change the persona in charge</p>
    <select id="person-assigned" name="personAssigned" onChange={handleTaskAssignedTo}>
      {familyMember.map((eachFamilyMember, index) => {
        return (
        
                  <option value={eachFamilyMember.name}>{eachFamilyMember.name}</option>
                  )
      })
      }
    </select> */}

//try {
//const changeOnCharge = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/task/changeOncharge`, {
//method: 'PUT',
//headers: {
//'Content-type': 'application/json'
//},
//body: JSON.stringify({ taskAssignedTo: taskAssignedTo })
//})
//setTaskAssignedTo("")

//}
//catch (error) { console.log(error) }