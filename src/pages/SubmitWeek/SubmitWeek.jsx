import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
// Import Task or define it appropriately

function SubmitWeek() {
    const [familyMember, setFamilyMember] = useState([]);
    const { user, family, setUser } = useContext(AuthContext);   

    // Calculate the score of the week according to the role.
    function ScoringWeek() {
        // Step1: Calculate Family's KPI based on tasks assigned to the family
        // Step2: Calculate individual KPI for the child based on their assigned tasks
        // Step3: Check if family's KPI is more than 90% and update rewards
        // Step4: Handle other roles if needed
        // Step5: Update user's average kpi
        // Step6: Get a superhero only if the KPI is greater than 90
        // Step7:  Function to fetch a random superhero
    }

    // Function to reset tasks.isDone to the default value
    const resetWeek = () => {
        const resetTasks = Task.taskfamily.map(task => ({ ...task, isDone: false }));
        // Logic to apply the resetTasks if needed
    };

    return (
        <>
            <h2>🎓 Family Weekly Score </h2>
            {/* <img src={family.familyPicture} alt="Family" /> */}
            <p> User: {user.name}</p>
            <p> Your Family: {family.familyName} </p>
            <p> Weekly Tasks: {family.tasksWeekly}</p>
            <button>Reset Week</button>
        </>
    );
}

export default SubmitWeek;
