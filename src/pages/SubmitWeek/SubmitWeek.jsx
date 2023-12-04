import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
// Import Task or define it appropriately

function SubmitWeek(props) {
    const [familyMember, setFamilyMember] = useState([]);
    const[tasksFamily, settaskFamily] = useState(0);
    const[tasksDoneFamily, settaskDoneFamily] = useState(0);
    const { user, family, setUser } = useContext(AuthContext);   
    const [taskAssignedTo, setTaskAssignedTo] = useState("");
    const handleTaskAssignedTo = (e) => setTaskAssignedTo(e.target.value);
    
    const getFamilyId = async (event) => {
    try {
      const familyMembersResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/familymembers/${family._id}`)
      const familyMembers = await familyMembersResponse.json()
      console.log(familyMembers);
      setfamilyMember(familyMembers)
    } catch (error) { console.log(error); }
  }

// here we have to connect with backend, find all tasks and filter by family._id and setTaskFamily in the variable with the number rendered.
// the same with taskFamily and the taskisDone as true.

useEffect(()=> {
}, [])

    return (
        <>
            <h2>🎓 Weekly Score 🎓</h2>
            {<img width="60px" src={family.familyPicture} alt="Family" />}
            {/* <p> User: {user.name}</p>
            <p> Your Family: {family.familyName} </p> */}
            <p> {tasksFamily} tasks created</p>
            <p> {tasksDoneFamily} tasks done </p>
            <button>Reset Week</button>
        </>
    );
}

export default SubmitWeek;
