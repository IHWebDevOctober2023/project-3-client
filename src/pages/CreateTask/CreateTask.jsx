import "./CreateTask.css";
import { Link } from "react-router-dom";
function CreateTask() {
    return (
        <form className="form-conteiner">
            {/*falta and task icon, falta taskindone, falta assigned to, falta taskImgUploaded, falta task comments */}
            <label>Description:</label>
            <textarea id="content" name="description" required></textarea>
            <br/>
            <label for="dayMoment"><b>When? Choose a timing interval to finish the task</b></label>
            <select id="timing-interval" name="timingInterval">
                <option value="On Wake Up">On Wake Up</option>
                <option value="Before Breakfast">Before Breakfast</option>
                <option value="After Breakfast">After Breakfast</option>
                <option value="Before Lunch">Before Lunch</option>
                <option value="After Lunch">After Lunch</option>
                <option value="In the afternoon">In the Afternoon</option>
                <option value="Before Dinner">In the Afternoon</option>
                <option value="After Dinner">In the Afternoon</option>
                <option value="Before Sleep">In the Afternoon</option>
            </select>
            <br/>
            <label for="dayMoment"><b>Choose a day of the week</b></label>
            <select id="day-moment" name="dayMoment">
                <option value="Everyday">Everyday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <br/>
            <label for="dayMoment"><b>Choose a day of the week</b></label>
            <select id="day-moment" name="dayMoment">
                <option value="Everyday">Everyday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <br/>
            <Link to="/">
            <button type="submit">Create task</button>
            </Link>
        </form>
    )
}
export default CreateTask;

