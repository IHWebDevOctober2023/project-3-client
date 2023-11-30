import "./HomePage.css";
import { useState } from 'react'
import { Link } from "react-router-dom";
import tasksData from "./task.json"
const familyMembersData = [
  { _id: 1234, name: "Mario", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" },
  { _id: 2454, name: "Lisa", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" }
]
function HomePage() {
  const [familyMember, setfamilyMember] = useState(familyMembersData)
  const [task, setTask] = useState(tasksData)

  return (
    <div>
      <h1>FAMILY NAME</h1>
      <Link to='/createfamily'>create a Family</Link>
      <div className="family-member-container">
      {familyMember.map((eachFamilyMember, index) => {
        return (
          < div className="family-member-card" key={eachFamilyMember._id} >
            <img className="family-member-img" src={eachFamilyMember.img} alt={eachFamilyMember.name} />
            <h2>{eachFamilyMember.name}</h2>
          </div>)
      })
      }
      </div>
      <div className="task-container">
      {task.map((eachTask, index) => {
        return ( <div className="task">
          <p>{eachTask.taskDescription}</p>
          <p>{eachTask.taskTime}</p>
          <p>{eachTask.taskWeekDay}</p>
          <p>{eachTask.taskAssignedTo}</p>
          <p>{eachTask.taskComments}</p>
        </div>)})}
      </div>
      <Link to="/CreateTask">
        <button>New Task</button>
      </Link>
    </div >
  );
}

export default HomePage;
