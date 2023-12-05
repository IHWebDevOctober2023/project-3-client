import "./HomePage.css";
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import Task from "../../components/Task/Task";
import FamilyMember from "../../components/FamilyMember/FamilyMember";

function HomePage() {
  const currentDate = new Date();
  console.log(currentDate);
  const dayOfWeek = currentDate.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const { user, family } = useContext(AuthContext);
  // console.log("home page", user.family.familyName);
  const [task, setTask] = useState([])
  const [dayName, setDayName] = useState(daysOfWeek[dayOfWeek])
  console.log(family);
  const nextday = () => { const indexOfTheDay=daysOfWeek.indexOf(dayName)
    setDayName(daysOfWeek[(indexOfTheDay+1)% daysOfWeek.length]) 
  }
  const getTasks = async (event) => {
    try {
      const getTasksResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/tasks/${family._id}/${dayName}`)
      const getTasks = await getTasksResponse.json()
      console.log(getTasks);
      setTask(getTasks)
    } catch (error) { console.log(error); }
  }
  useEffect(() => {
    getTasks()
  }, [dayName])

  return (
    <>
      {(user.family || family) ?
        <div className="body-homepage">

          <h2>Today is: {dayName} </h2>
          <button onClick={nextday}>tomorrow</button>
          {/* <h3>{user.family.familyName}</h3> import the family name from backend */}
          <div className="task-container">{/* maybe we dont need this div if we keep the next one */}
            {task?.map((eachTask, index) => {
              return (
                <Task
                key={eachTask.taskId}
                  taskDescription={eachTask.taskDescription}
                  taskTime={eachTask.taskTime}
                  taskWeekDay={eachTask.taskWeekDay}
                  taskAssignedTo={eachTask.taskAssignedTo}
                  taskComments={eachTask.taskComments}
                  taskIsDone={eachTask.taskIsDone}
                  taskId={eachTask._id}
                  getTasks={getTasks}
                />
              )
            })}
          </div>
          <Link to="/createtask">
            <button className="new-task"><i class="fa-solid fa-circle-plus"></i></button>
          </Link>
        </div >
        : <Navigate to="/createfamily" />

      }
    </>
  );
}

export default HomePage;