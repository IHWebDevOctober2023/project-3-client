import "./Task.css";

function Task(props) {
    return(<div className="task">
    <p>{props.taskDescription}</p>
    <p>{props.taskTime}</p>
    <p>{props.taskWeekDay}</p>
    <p>{props.taskAssignedTo}</p>
    <p>{props.taskComments}</p>
  </div>)
}
export default Task
