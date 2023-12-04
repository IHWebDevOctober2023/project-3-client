import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
// Import Task or define it appropriately

function SubmitWeek(props) {
    const [familyMember, setFamilyMember] = useState([]);
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

    return (
        <>
            <h2>🎓 Weekly Score 🎓</h2>
            {<img width="60px" src={family.familyPicture} alt="Family" />}
            <p> User: {user.name}</p>
            <p> Your Family: {family.familyName} </p>
            <p> Weekly Tasks: {family.tasksWeekly}</p>
            <button>Reset Week</button>
        </>
    );
}

export default SubmitWeek;
