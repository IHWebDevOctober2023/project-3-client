import "./Task.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect} from "react";

function Task(props) {
  const { family } = useContext(AuthContext);
  const [familyMember, setfamilyMember] = useState([])
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

  //try {
    //const changeOnCharge = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/task/changeOncharge`, {
      //method: 'PUT',
      //headers: {
        //'Content-type': 'application/json'
      //},
      //body: JSON.stringify({ taskAssignedTo: taskAssignedTo })
    //})
    //setTaskAssignedTo("")

  //}
  //catch (error) { console.log(error) }
  useEffect(() => {
    getFamilyId()
  }, [])

  return (<div className="task">
    <p className="description">{props.taskDescription}</p>
    <p className="time">{props.taskTime}</p>
    <p className="weekday">{props.taskWeekDay}</p>
    {/*     <p className="assinged-to">{props.taskAssignedTo}</p>
  <p className="comments">{props.taskComments}</p> */}
    <p>{props.taskAssignedTo}</p>
    <p>Change the persona in charge</p>
    <select id="person-assigned" name="personAssigned" onChange={handleTaskAssignedTo}>
      {familyMember.map((eachFamilyMember, index) => {
        return (<option value={eachFamilyMember.name}>{eachFamilyMember.name}</option>)
      })
      }
    </select>
    <p>{props.taskComments}</p>
  </div>)
}
export default Task
