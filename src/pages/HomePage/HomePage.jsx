import "./HomePage.css";
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import Task from "../../components/Task/Task";
import FamilyMember from "../../components/FamilyMember/FamilyMember";
import Navbar from "../../components/Navbar/Navbar";

function HomePage() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const { user, family } = useContext(AuthContext);
  const [task, setTask] = useState([])
  const [dayName, setDayName] = useState(daysOfWeek[dayOfWeek])
  const nextDay = () => {
    const indexOfTheDay = daysOfWeek.indexOf(dayName)
    setDayName(daysOfWeek[(indexOfTheDay + 1) % daysOfWeek.length])
  }

  const prevDay = () => {
    const indexOfTheDay = daysOfWeek.indexOf(dayName)
    setDayName(daysOfWeek[(indexOfTheDay - 1 + daysOfWeek.length) % daysOfWeek.length])
  }

  const getTasks = async (event) => {
    try {
      const getTasksResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/tasks/${family._id}/${dayName}`)
      const getTasks = await getTasksResponse.json()
      setTask(getTasks)
    } catch (error) { console.log(error); }
  }
  useEffect(() => {
    getTasks()
  }, [dayName])

  return (
    <>
      <Navbar />
      {(user.family || family) ?
        <div className="form-createtask-container">
          <div className="homepage-upper-container">
            <button onClick={prevDay} class="btn-icon"><i class="fa-solid fa-arrow-left-long"></i></button>
            <h2 className="text-h2"> {dayName} </h2>
            <button onClick={nextDay} class="btn-icon"><i class="fa-solid fa-arrow-right-long"></i></button>
          </div>

          <div className="task-container">
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
          {
            user.role === "Parent" &&
            <Link to="/createtask">
              <button className="add-task"><i class="fa-solid fa-circle-plus"></i></button>
            </Link>
          }
        </div >
        : <Navigate to="/createfamily" />
      }
    </>
  );
}

export default HomePage;

////
