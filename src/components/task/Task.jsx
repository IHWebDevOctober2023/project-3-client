import "./Task.css";

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

  try {
    const changeOnCharge = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/task/changeOncharge`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ taskAssignedTo: taskAssignedTo })
    })
    setTaskAssignedTo("")
    
}
catch (error) { console.log(error) }
}

  useEffect(() => {
    getFamilyId()
  }, [])

  return (<div className="task">
    <p>{props.taskDescription}</p>
    <p>{props.taskTime}</p>
    <p>{props.taskWeekDay}</p>
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
