import "./Task.css";

function Task(props) {
    return(
    <div className="task">
    <p className="description">{props.taskDescription}</p>
    <p className="time">{props.taskTime}</p>
    <p className="weekday">{props.taskWeekDay}</p>
{/*     <p className="assinged-to">{props.taskAssignedTo}</p>
    <p className="comments">{props.taskComments}</p> */}
  </div>
  )
}
export default Task
