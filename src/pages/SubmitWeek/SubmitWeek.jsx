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
    const familyTasksResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${family._id}/taskByFamily`);
    const tasksByFamily = await familyTasksResponse.json();
    setTasksByFamily(tasksByFamily.length);
  } catch (error) {
    console.error(error);
  }
}
  // GET the route to calculate TASKS DONE by Family  
  const getTasksDonebyFamily = async () => {
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
  }

  
//////////////////////// MANAGING USER PERFORMANCE ////////////////////////
  // GET the route to calculate TASKS DONE by User 
  const getTasksDonebyUser = async () => {
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
}

useEffect(() => {
  getTasksbyFamily();
  getTasksDonebyFamily();
  getTasksPendingbyFamily();
  getTasksDonebyUser();
  getTasksPendingbyUser();
}, []);


    return (
        <>
            <h2>🎓 Weekly Score 🎓</h2>
            {<img width="60px" src={family.familyPicture} alt="Family" />}
            <p> Hello {family.familyName} family, this is your team score: </p>
            <p> {tasksByFamily} tasks weekly</p>
            <p> {tasksDoneByFamily} tasks done by Family</p>
            <p> {tasksPendingByFamily} tasks pending by Family</p>
            <p> Your team perfomance: {kpiByFamily} %</p>
            <p> Hello {user.name}, this is your personal score: </p>
            <p> {tasksDoneByUser} tasks done by User</p>
            <p> {tasksPendingByUser} tasks pending by User</p>
            <p> Your perfomance: {kpiByUser} %</p>

            {/*<button>Reset Week</button>*/}
        </>
    );
}

export default SubmitWeek;
