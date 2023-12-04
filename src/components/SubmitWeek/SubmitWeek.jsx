import "./SubmitWeek.css";
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
import Task from "../../components/Task/Task";
import FamilyMember from "../../components/FamilyMember/FamilyMember";

function SubmitWeek() {
    const [familyMember, setFamilyMember] = useState([]);
    const { user, family, setUser } = useContext(AuthContext);
    const [superhero, setSuperhero] = useState(null);

// Calculate the score of the week according the role. 
    function ScoringWeek() {
        let weeklyKpi;

        if (user.role === 'parent') {
            // Step1: Calculate Family's KPI based on tasks assigned to the family
            const familyTasks = Task.taskfamily.filter(task => family.includes(task.family));
            const totalFamilyTasks = familyTasks.length;
            const totalFamilyTasksDone = familyTasks.filter(task => task.isDone).length;
            weeklyKpi = totalFamilyTasks > 0 ? (totalFamilyTasksDone / totalFamilyTasks) * 100 : 0;
        } else if (user.role === 'child') {
            // Step2: Calculate individual KPI for the child based on their assigned tasks
            const totalTasksAssignedChild = user.tasksAssigned.length;
            const totalTasksDoneChild = user.tasksDone.length;

            weeklyKpi = totalTasksAssignedChild > 0 ? (totalTasksDoneChild / totalTasksAssignedChild) * 100 : 0;

            // Step3: Check if family's KPI is more than 90% and update rewards
            if (weeklyKpi > 90) {
                setUser((prevUser) => ({ ...prevUser, rewards: prevUser.rewards + 1 }));
            }
        } else {
            // Step4: Handle other roles if needed
            weeklyKpi = 0;
        }

        // Step5: Update user's average kpi
        const updatedAverageKpi = (user.kpi + weeklyKpi) / 2;
        setUser((prevUser) => ({ ...prevUser, kpi: updatedAverageKpi }));

        // Step6: Get a superhero only if the KPI is greater than 90
        if (weeklyKpi > 90) {
            fetchSuperhero();
        }
    }

    
    useEffect(() => {
        ScoringWeek();
    }, []); 

// Function to fetch a random superhero
    const fetchSuperhero = async () => {
        try {
            const response = await fetch("https://www.superheroapi.com/api.php/your-api-key/random");
            const data = await response.json();
            setSuperhero(data);
        } catch (error) {
            console.error("Error fetching superhero:", error);
        }
    };

// Function to reset tasks.isDone to default value
    const resetWeek = () => {
        const resetTasks = Task.taskfamily.map(task => ({ ...task, isDone: false }));
    };



    return (
        <>
            <h1>🎓 Family Weekly Score </h1>
            
            <p>Family Score: {weeklyKpi.toFixed(2)}%</p>
            <p>Total Tasks: {user.role === 'parent' ? Task.taskfamily.length : user.tasksAssigned.length}</p>
            <p>Your %: {user.role === 'parent' ? weeklyKpi.toFixed(2) : (totalTasksDoneChild / totalTasksAssignedChild * 100).toFixed(2)}%</p>
            <p>Your Rewards: {user.rewards}</p>

            {weeklyKpi > 90 ? (
                <>
                    <p>Congratulations! This week you are like a {superhero.name}</p>
                    {superhero ? (
                        <div>
                            <img src={superhero.image.url} alt={superhero.name} />
                            <p>Powerstats: {JSON.stringify(superhero.powerstats)}</p>
                        </div>
                    ) : (
                        <p>Loading superhero...</p>
                    )}
                </>
            ) : (
                <p>Ooh... You need to improve to be a SuperHero! May be next week? 🚀  </p>
                
                
            )}

            {user.role === 'parent' && (
                // Button to reset the week visible only for users with role: parent
                <button onClick={resetWeek}>Reset Week</button>
            )}
        </>
    );
}

export default SubmitWeek;
