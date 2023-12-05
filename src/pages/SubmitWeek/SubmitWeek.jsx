import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";

function SubmitWeek() {
  const { user, family, setUser } = useContext(AuthContext);   
    const[familyMember, setFamilyMember] = useState([]);
    const[tasksByFamily, setTasksByFamily] = useState(0);
    const[tasksDoneByFamily, setTasksDoneByFamily] = useState(0);
    const[tasksPendingByFamily, setTasksPendingByFamily] = useState(0);
    const[tasksDoneByUser, setTasksDoneByUser] = useState(0);
    const[tasksPendingByUser, setTasksPendingByUser] = useState(0);
    const[kpiByFamily, setkpiByFamily] = useState(0);
    const[kpiByUser, setkpiByUser] = useState(0);
    
    const [taskAssignedTo, setTaskAssignedTo] = useState("");
    const handleTaskAssignedTo = (e) => setTaskAssignedTo(e.target.value);
    
  ///////////////////// MANAGING FAMILY PERFORMANCE ////////////////////
// GET a route to calculate TASKS by Family  
const getTasksbyFamily = async () => {
  try {
    const familyTasksResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/tasks/${family._id}/tasksByFamily`);
    const familyTasksResponseJson = await familyTasksResponse.json()
    setTasksByFamily (familyTasksResponseJson.tasksByFamily)
    console.log(familyTasksResponseJson)
    setTasksDoneByFamily (familyTasksResponseJson.tasksDoneByFamily)
    setTasksPendingByFamily (familyTasksResponseJson.tasksPendingByFamily)
    
  } catch (error) {
    console.error(error);
  }
}

const CalculateKpiFamily = async () =>{
  try{
    const kpiFamily = (tasksDoneByFamily / tasksByFamily) * 100;
    const roundedKpiFamily = kpiFamily.toFixed(2);
    console.log("kpi", kpiFamily)
    setkpiByFamily(roundedKpiFamily)

  }
  catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  CalculateKpiFamily();
  getTasksbyFamily();
}, []);

    return (
        <>
            <h2>🎓 Weekly Score 🎓</h2>
           <br></br>
            {<img width="60px" src={family.familyPicture} alt="Family" />}
            <br></br>
            <p> <i class="fa-solid fa-chart-simple"></i> {family.familyName} family performance : </p>
            <br></br>
            <p> <i class="fa-solid fa-clipboard"></i> {tasksByFamily} Tasks weekly</p>
            <p> <i class="fa-solid fa-check"></i> {tasksDoneByFamily} tasks done</p>
            <p> <i class="fa-solid fa-hourglass"></i> {tasksPendingByFamily} tasks pending</p>
           <p> <i class="fa-solid fa-gauge"></i> Family KPI: {kpiByFamily} %</p>
           <br></br>
           <br></br>
           <img width="60px" src={user.userPicture} alt={user.name} />
            <p> <i class="fa-solid fa-chart-simple"></i> {user.name}, your personal score: </p>
            <br></br>
            <p> <i class="fa-solid fa-check"></i> {tasksDoneByUser} tasks done</p>
            <p> <i class="fa-solid fa-hourglass"></i> {tasksPendingByUser} tasks pending</p>
            <p> <i class="fa-solid fa-gauge"></i>  User KPI: {kpiByUser} %</p>

            {/*<button>Reset Week</button>*/}
        </>
    );
}

export default SubmitWeek;


 // GET the route to calculate TASKS DONE by Family  
 /*  const getTasksDonebyFamily = async () => {
    try {
      const tasksDoneResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${family._id}/tasksDoneByFamily`);
      const tasksDoneByFamily = await tasksDoneResponse.json();
      setTasksDoneByFamily(tasksDoneByFamily.length);
    } catch (error) {
      console.error(error);
    }
  }
   // GET the route to calculate TASKS PENDING by Family  
   const getTasksPendingbyFamily = async () => {
    try {
      const tasksPendingResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${family._id}/tasksPendingByFamily`);
      const tasksPendingByFamily = await tasksPendingResponse.json();
      setTasksPendingByFamily(tasksPendingByFamily.length);
    } catch (error) {
      console.error(error);
    }
  } */

  
//////////////////////// MANAGING USER PERFORMANCE ////////////////////////
  // GET the route to calculate TASKS DONE by User 
/*   const getTasksDonebyUser = async () => {
    try {
      const tasksDoneResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${user._id}/tasksByUserDone`);
      const tasksDoneByUser = await tasksDoneResponse.json();
      setTasksDoneByUser(tasksDoneByUser.length);
    } catch (error) {
      console.error(error);
    }
  }

   // GET the route to calculate TASKS PENDING by User  
   const getTasksPendingbyUser = async () => {
  try {
    const tasksPendingResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${user._id}/tasksByUserPending`);
    const tasksPendingByUser = await tasksPendingResponse.json();
    setTasksPendingByUser(tasksPendingByUser.length);
  } catch (error) {
    console.error(error);
  }
} */
