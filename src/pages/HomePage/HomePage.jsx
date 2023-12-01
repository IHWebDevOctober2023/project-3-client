import "./HomePage.css";
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { useContext , useEffect} from "react";
import { AuthContext } from "../../context/auth.context";
import Task from "../../components/Task/Task";
import FamilyMember from "../../components/FamilyMember/FamilyMember";

function HomePage() {
  const { user, family } = useContext(AuthContext);
  // console.log("home page", user.family.familyName);
  const [task, setTask] = useState([])
  console.log(family);

  const getTasks = async (event) => {
    try {
      const getTasksResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/tasks`)
      const getTasks = await getTasksResponse.json()
      console.log(getTasks);
      setTask(getTasks)
    } catch (error) { console.log(error);}
  }
  useEffect(()=>{
    getTasks()
  },[])

  return (
    <>
      {(user.family || family) ?
        <div>

          <h1>welcome family:</h1>
          {/* <h3>{user.family.familyName}</h3> import the family name from backend */}
          <Link to='/createfamily'>create a Family</Link><br></br>
          <div className="task-container">{/* maybe we dont need this div if we keep the next one */}
            {task.map((eachTask, index) => {
              return (
                <Task
                  taskDescription={eachTask.taskDescription}
                  taskTime={eachTask.taskTime}
                  taskWeekDay={eachTask.taskWeekDay}
                  taskAssignedTo={eachTask.taskAssignedTo}
                  taskComments={eachTask.taskComments}
                />
              )
            })}
          </div>
          <Link to="/createtask">
            <button>New Task</button>
          </Link>
        </div >
        : <Navigate to="/createfamily" />

      }
    </>
  );
}

export default HomePage;