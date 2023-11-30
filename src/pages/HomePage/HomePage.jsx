import "./HomePage.css";
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import tasksData from "./task.json"


const familyMembersData = [
  { _id: 1234, name: "Mario", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" },
  { _id: 2454, name: "Lisa", img: "https://gravatar.com/avatar/865fdc42701e4d2f15599a6f1d34df6e?s=400&d=robohash&r=x" }
]
function HomePage() {
  const { user, family } = useContext(AuthContext);
  console.log("home page",user.family.familyName);
  const [familyMember, setfamilyMember] = useState(familyMembersData)
  const [task, setTask] = useState(tasksData)

  return (
  <>
      { user.family || family? <div>
     
      <h1>welcome family:</h1>
      <h3>{user.family.familyName}</h3>{/* import the family name from backend */}
      <Link to='/createfamily'>create a Family</Link><br></br>
      
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
      <div className="task-container">{/* maybe we dont need this div if we keep the next one */}
      {task.map((eachTask, index) => {
        return ( <div className="task">{/* maybe we dont need this div if we keep the prev one */}
          <p>{eachTask.taskDescription}</p>
          <p>{eachTask.taskTime}</p>
          <p>{eachTask.taskWeekDay}</p>
          <p>{eachTask.taskAssignedTo}</p>
          <p>{eachTask.taskComments}</p>
        </div>)})}
      </div>
      <Link to="/createtask">
        <button>New Task</button>
      </Link>
    </div >
      : <Navigate to="/createfamily"/>
      
    }
    </>
  );
}

export default HomePage;
