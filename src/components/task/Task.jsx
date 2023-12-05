import "./Task.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from "react";


function Task(props) {
  const { family, user } = useContext(AuthContext);
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
      props.getTasks()
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
      <input type="checkbox" checked={taskIsDone} name="taskisdone" onChange={(event) => handleChange(event)} />
      <span>|</span>
      <p className="text-p">{props.taskDescription}</p>
      <span>|</span>
      <p className="text-p">{props.taskTime}</p>
      <span>|</span>
      <p className="text-p">{props.taskWeekDay}</p>

      
      {user.role === "Parent" &&
      <>
      <span>|</span>
      <button class="btn-icon" onClick={() => findDeleteTask(props.taskId)}><span><i class="fa-regular fa-trash-can"></i></span></button>
      </>
      }




      <p>{props.taskComments}</p>
    </div>)
}
export default Task


